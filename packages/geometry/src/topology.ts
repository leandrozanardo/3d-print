import type { RawMesh } from "@fix-my-print/formats";

import { computeBounds, type Bounds } from "./bounds";

const AREA_EPS = 1e-18;
const VOLUME_EPS = 1e-12;

export interface TopologyMetrics {
  vertexCount: number;
  faceCount: number;
  bounds: Bounds;
  componentCount: number;
  degenerateFaceCount: number;
  boundaryEdgeCount: number;
  nonManifoldEdgeCount: number;
  windingConsistent: boolean | null;
  watertight: boolean;
  area: number | null;
  volume: number | null;
  validityFlags: string[];
  limitations: string[];
  issues: string[];
}

function undirectedKey(a: number, b: number): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function triangleArea(
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  cx: number,
  cy: number,
  cz: number,
): number {
  const ux = bx - ax;
  const uy = by - ay;
  const uz = bz - az;
  const vx = cx - ax;
  const vy = cy - ay;
  const vz = cz - az;
  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const nz = ux * vy - uy * vx;
  return 0.5 * Math.hypot(nx, ny, nz);
}

function signedTetraVolume(
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  cx: number,
  cy: number,
  cz: number,
): number {
  return (
    (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6
  );
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

  union(a: number, b: number): void {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra === rb) return;
    const rankA = this.rank[ra]!;
    const rankB = this.rank[rb]!;
    if (rankA < rankB) this.parent[ra] = rb;
    else if (rankA > rankB) this.parent[rb] = ra;
    else {
      this.parent[rb] = ra;
      this.rank[ra] = rankA + 1;
    }
  }

  countRoots(used: boolean[]): number {
    const seen = new Set<number>();
    for (let i = 0; i < used.length; i++) {
      if (!used[i]) continue;
      seen.add(this.find(i));
    }
    return seen.size;
  }
}

/**
 * Real topology analysis via undirected edge map + winding adjacency checks.
 * Used by all GeometryPort adapters for inspect metrics.
 */
export function analyzeTopology(mesh: RawMesh): TopologyMetrics {
  const vertexCount = Math.floor(mesh.vertices.length / 3);
  const faceCount = mesh.faces.length;
  const bounds = computeBounds(mesh);
  const issues: string[] = [];
  const validityFlags: string[] = ["index_topology"];
  const limitations: string[] = [];
  // Limitations are filled only when metrics are unavailable (see below).

  if (vertexCount === 0 || faceCount === 0) {
    issues.push("empty mesh");
    limitations.push("volume_requires_watertight");
    return {
      vertexCount,
      faceCount,
      bounds,
      componentCount: 0,
      degenerateFaceCount: 0,
      boundaryEdgeCount: 0,
      nonManifoldEdgeCount: 0,
      windingConsistent: null,
      watertight: false,
      area: null,
      volume: null,
      validityFlags,
      limitations,
      issues,
    };
  }

  /** undirected edge -> list of directed orientations (a->b as +1 when a<b stored as sign) */
  const edgeFaces = new Map<string, number[]>();
  const uf = new UnionFind(vertexCount);
  const usedVert = new Array<boolean>(vertexCount).fill(false);

  let degenerateFaceCount = 0;
  let areaSum = 0;
  let signedVolume = 0;
  let validFaceCount = 0;

  for (let fi = 0; fi < faceCount; fi++) {
    const face = mesh.faces[fi]!;
    if (face.length < 3) {
      degenerateFaceCount++;
      continue;
    }
    const i0 = face[0]!;
    const i1 = face[1]!;
    const i2 = face[2]!;
    if (
      !Number.isInteger(i0) ||
      !Number.isInteger(i1) ||
      !Number.isInteger(i2) ||
      i0 < 0 ||
      i1 < 0 ||
      i2 < 0 ||
      i0 >= vertexCount ||
      i1 >= vertexCount ||
      i2 >= vertexCount ||
      i0 === i1 ||
      i1 === i2 ||
      i0 === i2
    ) {
      degenerateFaceCount++;
      continue;
    }

    const o0 = i0 * 3;
    const o1 = i1 * 3;
    const o2 = i2 * 3;
    const ax = mesh.vertices[o0]!;
    const ay = mesh.vertices[o0 + 1]!;
    const az = mesh.vertices[o0 + 2]!;
    const bx = mesh.vertices[o1]!;
    const by = mesh.vertices[o1 + 1]!;
    const bz = mesh.vertices[o1 + 2]!;
    const cx = mesh.vertices[o2]!;
    const cy = mesh.vertices[o2 + 1]!;
    const cz = mesh.vertices[o2 + 2]!;

    const area = triangleArea(ax, ay, az, bx, by, bz, cx, cy, cz);
    if (!(area > AREA_EPS)) {
      degenerateFaceCount++;
      continue;
    }

    areaSum += area;
    signedVolume += signedTetraVolume(ax, ay, az, bx, by, bz, cx, cy, cz);
    validFaceCount++;

    usedVert[i0] = true;
    usedVert[i1] = true;
    usedVert[i2] = true;
    uf.union(i0, i1);
    uf.union(i1, i2);

    const edges: [number, number][] = [
      [i0, i1],
      [i1, i2],
      [i2, i0],
    ];
    for (const [a, b] of edges) {
      const uk = undirectedKey(a, b);
      // +1 if directed low->high matches face traversal a->b when a<b, else -1
      const orient = a < b ? 1 : -1;
      const list = edgeFaces.get(uk);
      if (list) list.push(orient);
      else edgeFaces.set(uk, [orient]);
    }
  }

  let boundaryEdgeCount = 0;
  let nonManifoldEdgeCount = 0;
  let sharedManifoldEdges = 0;
  let windingConflicts = 0;

  for (const orients of edgeFaces.values()) {
    const count = orients.length;
    if (count === 1) boundaryEdgeCount++;
    else if (count > 2) nonManifoldEdgeCount++;
    else if (count === 2) {
      sharedManifoldEdges++;
      // Consistent winding: opposite orientations (+1 and -1)
      if (orients[0]! + orients[1]! !== 0) windingConflicts++;
    }
  }

  const componentCount = validFaceCount === 0 ? 0 : uf.countRoots(usedVert);

  const windingConsistent: boolean | null =
    sharedManifoldEdges === 0 ? null : windingConflicts === 0;

  const watertight =
    validFaceCount > 0 &&
    boundaryEdgeCount === 0 &&
    nonManifoldEdgeCount === 0 &&
    windingConsistent !== false &&
    degenerateFaceCount === 0;

  const area = validFaceCount > 0 ? areaSum : null;
  const volume = watertight
    ? Math.abs(signedVolume) > VOLUME_EPS
      ? Math.abs(signedVolume)
      : 0
    : null;

  if (degenerateFaceCount > 0) {
    issues.push(`degenerate faces: ${degenerateFaceCount}`);
  }
  if (boundaryEdgeCount > 0) {
    issues.push("not watertight");
    issues.push(`boundary edges: ${boundaryEdgeCount}`);
  }
  if (nonManifoldEdgeCount > 0) {
    issues.push(`non-manifold edges: ${nonManifoldEdgeCount}`);
  }
  if (windingConsistent === false) {
    issues.push("inconsistent winding");
  }
  if (watertight && volume === 0) {
    issues.push("zero volume");
  }
  if (!watertight) {
    limitations.push("volume_requires_watertight");
  }
  if (windingConsistent === null) {
    limitations.push("winding_null_when_no_shared_edges");
  }

  return {
    vertexCount,
    faceCount,
    bounds,
    componentCount,
    degenerateFaceCount,
    boundaryEdgeCount,
    nonManifoldEdgeCount,
    windingConsistent,
    watertight,
    area,
    volume,
    validityFlags,
    limitations,
    issues,
  };
}
