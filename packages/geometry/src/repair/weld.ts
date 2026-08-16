import type { RawMesh } from "@fix-my-print/formats";

import type { RepairPolicy } from "./repairPolicy";

export interface WeldResult {
  mesh: RawMesh;
  vertexCountBefore: number;
  vertexCountAfter: number;
  weldedCount: number;
}

function undirectedPair(a: number, b: number): [number, number] {
  return a < b ? [a, b] : [b, a];
}

class UnionFind {
  private readonly parent: Int32Array;
  private readonly rank: Uint8Array;

  constructor(n: number) {
    this.parent = new Int32Array(n);
    this.rank = new Uint8Array(n);
    for (let i = 0; i < n; i++) this.parent[i] = i;
  }

  find(i: number): number {
    let x = i;
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]!]!;
      x = this.parent[x]!;
    }
    return x;
  }

  /** Union keeping the lower index as the lasting root when ranks tie. */
  union(a: number, b: number): void {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return;
    // Prefer lower index as representative for determinism.
    if (ra > rb) {
      const tmp = ra;
      ra = rb;
      rb = tmp;
    }
    const rankA = this.rank[ra]!;
    const rankB = this.rank[rb]!;
    if (rankA < rankB) {
      this.parent[ra] = rb;
      // Re-root so min index remains representative when possible.
      if (ra < rb) {
        this.parent[rb] = ra;
        this.parent[ra] = ra;
        this.rank[ra] = Math.max(rankA, rankB) + (rankA === rankB ? 1 : 0);
      }
    } else {
      this.parent[rb] = ra;
      if (rankA === rankB) this.rank[ra] = rankA + 1;
    }
  }
}

function cellKey(cx: number, cy: number, cz: number): string {
  return `${cx}|${cy}|${cz}`;
}

/**
 * Spatial-hash vertex weld within a single part (RPR-006).
 * Uses real distance checks and the minimum original index as representative.
 */
export function weldVertices(mesh: RawMesh, policy: RepairPolicy): WeldResult {
  const tol = policy.weldToleranceMm;
  const n = Math.floor(mesh.vertices.length / 3);
  const vertexCountBefore = n;
  if (n === 0) {
    return {
      mesh: { vertices: new Float64Array(0), faces: [] },
      vertexCountBefore: 0,
      vertexCountAfter: 0,
      weldedCount: 0,
    };
  }

  const cellSize = tol > 0 ? tol : 1e-9;
  const buckets = new Map<string, number[]>();
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    const x = mesh.vertices[o]!;
    const y = mesh.vertices[o + 1]!;
    const z = mesh.vertices[o + 2]!;
    const cx = Math.floor(x / cellSize);
    const cy = Math.floor(y / cellSize);
    const cz = Math.floor(z / cellSize);
    const key = cellKey(cx, cy, cz);
    const list = buckets.get(key);
    if (list) list.push(i);
    else buckets.set(key, [i]);
  }

  const uf = new UnionFind(n);
  const tol2 = tol * tol;
  const neighborOffsets: [number, number, number][] = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) neighborOffsets.push([dx, dy, dz]);
    }
  }

  // Deterministic candidate edge order: ascending (min,max) index pairs.
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    const x = mesh.vertices[o]!;
    const y = mesh.vertices[o + 1]!;
    const z = mesh.vertices[o + 2]!;
    const cx = Math.floor(x / cellSize);
    const cy = Math.floor(y / cellSize);
    const cz = Math.floor(z / cellSize);
    for (const [dx, dy, dz] of neighborOffsets) {
      const others = buckets.get(cellKey(cx + dx, cy + dy, cz + dz));
      if (!others) continue;
      for (const j of others) {
        if (j <= i) continue;
        const oj = j * 3;
        const ddx = x - mesh.vertices[oj]!;
        const ddy = y - mesh.vertices[oj + 1]!;
        const ddz = z - mesh.vertices[oj + 2]!;
        if (ddx * ddx + ddy * ddy + ddz * ddz <= tol2) {
          pairs.push(undirectedPair(i, j));
        }
      }
    }
  }
  pairs.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
  for (const [a, b] of pairs) uf.union(a, b);

  // Representative = minimum index in each weld cluster.
  const repOf = new Int32Array(n);
  const clusterMin = new Int32Array(n);
  clusterMin.fill(-1);
  for (let i = 0; i < n; i++) {
    const root = uf.find(i);
    const prev = clusterMin[root]!;
    if (prev < 0 || i < prev) clusterMin[root] = i;
  }
  for (let i = 0; i < n; i++) {
    repOf[i] = clusterMin[uf.find(i)]!;
  }

  const usedRep = new Map<number, number>();
  const compacted: number[] = [];
  const remap = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    const rep = repOf[i]!;
    let ni = usedRep.get(rep);
    if (ni === undefined) {
      ni = compacted.length / 3;
      usedRep.set(rep, ni);
      const o = rep * 3;
      compacted.push(mesh.vertices[o]!, mesh.vertices[o + 1]!, mesh.vertices[o + 2]!);
    }
    remap[i] = ni;
  }

  const faces = mesh.faces.map((f) => f.map((idx) => remap[idx]!));
  const vertexCountAfter = compacted.length / 3;
  return {
    mesh: { vertices: Float64Array.from(compacted), faces },
    vertexCountBefore,
    vertexCountAfter,
    weldedCount: vertexCountBefore - vertexCountAfter,
  };
}
