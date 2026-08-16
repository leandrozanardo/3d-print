import type { RawMesh } from "@fix-my-print/formats";

import type { RepairPolicy } from "./repairPolicy";

export interface FaceCleanupResult {
  mesh: RawMesh;
  removedDegenerate: number;
  removedDuplicate: number;
  removedOppositeDuplicate: number;
}

function triangleArea(vertices: Float64Array, a: number, b: number, c: number): number {
  const ax = vertices[a * 3]!;
  const ay = vertices[a * 3 + 1]!;
  const az = vertices[a * 3 + 2]!;
  const bx = vertices[b * 3]!;
  const by = vertices[b * 3 + 1]!;
  const bz = vertices[b * 3 + 2]!;
  const cx = vertices[c * 3]!;
  const cy = vertices[c * 3 + 1]!;
  const cz = vertices[c * 3 + 2]!;
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

/** Canonical undirected key for a triangle (sorted indices). */
function undirectedKey(a: number, b: number, c: number): string {
  const s = [a, b, c].sort((x, y) => x - y);
  return `${s[0]}|${s[1]}|${s[2]}`;
}

/** Oriented key preserving winding. */
function orientedKey(a: number, b: number, c: number): string {
  // Rotate so the minimum index is first for stable orientation identity.
  if (a <= b && a <= c) return `${a}>${b}>${c}`;
  if (b <= a && b <= c) return `${b}>${c}>${a}`;
  return `${c}>${a}>${b}`;
}

/**
 * Remove degenerate and duplicate faces (RPR-007).
 * Opposite-winding duplicates are removed with an explicit counter.
 */
export function cleanFaces(mesh: RawMesh, policy: RepairPolicy): FaceCleanupResult {
  const vertices = mesh.vertices;
  const kept: number[][] = [];
  let removedDegenerate = 0;
  let removedDuplicate = 0;
  let removedOppositeDuplicate = 0;

  const seenOriented = new Set<string>();
  const seenUndirected = new Map<string, string>(); // undirected -> first oriented

  for (const face of mesh.faces) {
    if (face.length < 3) {
      removedDegenerate++;
      continue;
    }
    const a = face[0]!;
    const b = face[1]!;
    const c = face[2]!;
    if (a === b || b === c || a === c) {
      removedDegenerate++;
      continue;
    }
    const area = triangleArea(vertices, a, b, c);
    if (!(area > policy.areaToleranceMm2)) {
      removedDegenerate++;
      continue;
    }

    const oKey = orientedKey(a, b, c);
    if (seenOriented.has(oKey)) {
      removedDuplicate++;
      continue;
    }

    const uKey = undirectedKey(a, b, c);
    const prior = seenUndirected.get(uKey);
    if (prior !== undefined && prior !== oKey) {
      // Opposite winding duplicate — drop the later face explicitly.
      removedOppositeDuplicate++;
      continue;
    }

    seenOriented.add(oKey);
    if (prior === undefined) seenUndirected.set(uKey, oKey);
    kept.push([a, b, c]);
  }

  return {
    mesh: { vertices: new Float64Array(vertices), faces: kept },
    removedDegenerate,
    removedDuplicate,
    removedOppositeDuplicate,
  };
}

/** Drop vertices not referenced by any face and remap indices. */
export function removeUnreferencedVertices(mesh: RawMesh): {
  mesh: RawMesh;
  removed: number;
} {
  const n = Math.floor(mesh.vertices.length / 3);
  const used = new Uint8Array(n);
  for (const f of mesh.faces) {
    for (const idx of f) {
      if (idx >= 0 && idx < n) used[idx] = 1;
    }
  }
  const remap = new Int32Array(n);
  const compacted: number[] = [];
  let removed = 0;
  for (let i = 0; i < n; i++) {
    if (!used[i]) {
      remap[i] = -1;
      removed++;
      continue;
    }
    remap[i] = compacted.length / 3;
    const o = i * 3;
    compacted.push(mesh.vertices[o]!, mesh.vertices[o + 1]!, mesh.vertices[o + 2]!);
  }
  const faces = mesh.faces.map((f) => f.map((i) => remap[i]!));
  return {
    mesh: { vertices: Float64Array.from(compacted), faces },
    removed,
  };
}
