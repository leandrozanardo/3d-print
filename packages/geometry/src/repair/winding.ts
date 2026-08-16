import type { RawMesh } from "@fix-my-print/formats";

function undirectedKey(a: number, b: number): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
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

function faceEdges(f: number[]): [number, number][] {
  return [
    [f[0]!, f[1]!],
    [f[1]!, f[2]!],
    [f[2]!, f[0]!],
  ];
}

function directedMatches(face: number[], a: number, b: number): boolean {
  for (const [u, v] of faceEdges(face)) {
    if (u === a && v === b) return true;
  }
  return false;
}

export interface WindingFixResult {
  mesh: RawMesh;
  flippedForConsistency: number;
  flippedForVolume: number;
  nonManifoldConflict: boolean;
}

/**
 * Fix face winding via adjacency BFS, then flip closed components with
 * negative signed volume (RPR-008).
 */
export function fixWinding(mesh: RawMesh): WindingFixResult {
  const faces = mesh.faces.map((f) => [...f] as number[]);
  const faceCount = faces.length;
  if (faceCount === 0) {
    return {
      mesh: { vertices: new Float64Array(mesh.vertices), faces },
      flippedForConsistency: 0,
      flippedForVolume: 0,
      nonManifoldConflict: false,
    };
  }

  type EdgeOcc = { face: number; a: number; b: number };
  const edgeMap = new Map<string, EdgeOcc[]>();
  for (let fi = 0; fi < faceCount; fi++) {
    const f = faces[fi]!;
    if (f.length < 3) continue;
    for (const [a, b] of faceEdges(f)) {
      const uk = undirectedKey(a, b);
      const list = edgeMap.get(uk);
      if (list) list.push({ face: fi, a, b });
      else edgeMap.set(uk, [{ face: fi, a, b }]);
    }
  }

  let nonManifoldConflict = false;
  const neighbors: number[][] = Array.from({ length: faceCount }, () => []);
  const sharedEdge: Array<Map<number, [number, number]>> = Array.from(
    { length: faceCount },
    () => new Map(),
  );

  for (const [uk, occs] of edgeMap) {
    if (occs.length > 2) {
      nonManifoldConflict = true;
      continue;
    }
    if (occs.length !== 2) continue;
    const [u, v] = occs as [EdgeOcc, EdgeOcc];
    neighbors[u.face]!.push(v.face);
    neighbors[v.face]!.push(u.face);
    const [lo, hi] = uk.split("|").map(Number) as [number, number];
    sharedEdge[u.face]!.set(v.face, [lo, hi]);
    sharedEdge[v.face]!.set(u.face, [lo, hi]);
  }

  const visited = new Uint8Array(faceCount);
  let flippedForConsistency = 0;

  for (let seed = 0; seed < faceCount; seed++) {
    if (visited[seed] || faces[seed]!.length < 3) continue;
    const queue = [seed];
    visited[seed] = 1;
    while (queue.length > 0) {
      const fi = queue.shift()!;
      for (const other of neighbors[fi]!) {
        if (visited[other]) continue;
        visited[other] = 1;
        const edge = sharedEdge[fi]!.get(other);
        if (!edge) {
          queue.push(other);
          continue;
        }
        const [lo, hi] = edge;
        const a = faces[fi]!;
        const b = faces[other]!;
        // Consistent when one face walks lo->hi and the other hi->lo.
        const aForward = directedMatches(a, lo, hi);
        const bForward = directedMatches(b, lo, hi);
        if (aForward === bForward) {
          faces[other] = [b[0]!, b[2]!, b[1]!];
          flippedForConsistency++;
        }
        queue.push(other);
      }
    }
  }

  // Component grouping via manifold shared edges.
  const parent = new Int32Array(faceCount);
  for (let i = 0; i < faceCount; i++) parent[i] = i;
  const find = (i: number): number => {
    let x = i;
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]!]!;
      x = parent[x]!;
    }
    return x;
  };
  for (let fi = 0; fi < faceCount; fi++) {
    for (const other of neighbors[fi]!) {
      const ra = find(fi);
      const rb = find(other);
      if (ra !== rb) parent[rb] = ra;
    }
  }

  const components = new Map<number, number[]>();
  for (let fi = 0; fi < faceCount; fi++) {
    if (faces[fi]!.length < 3) continue;
    const r = find(fi);
    const list = components.get(r);
    if (list) list.push(fi);
    else components.set(r, [fi]);
  }

  let flippedForVolume = 0;
  for (const faceIndices of components.values()) {
    const localEdges = new Map<string, number>();
    let signedVol = 0;
    for (const fi of faceIndices) {
      const f = faces[fi]!;
      for (const [a, b] of faceEdges(f)) {
        const uk = undirectedKey(a, b);
        localEdges.set(uk, (localEdges.get(uk) ?? 0) + 1);
      }
      const i0 = f[0]!;
      const i1 = f[1]!;
      const i2 = f[2]!;
      signedVol += signedTetraVolume(
        mesh.vertices[i0 * 3]!,
        mesh.vertices[i0 * 3 + 1]!,
        mesh.vertices[i0 * 3 + 2]!,
        mesh.vertices[i1 * 3]!,
        mesh.vertices[i1 * 3 + 1]!,
        mesh.vertices[i1 * 3 + 2]!,
        mesh.vertices[i2 * 3]!,
        mesh.vertices[i2 * 3 + 1]!,
        mesh.vertices[i2 * 3 + 2]!,
      );
    }
    let closed = true;
    for (const c of localEdges.values()) {
      if (c !== 2) {
        closed = false;
        break;
      }
    }
    if (!closed || !(signedVol < 0)) continue;
    for (const fi of faceIndices) {
      const f = faces[fi]!;
      faces[fi] = [f[0]!, f[2]!, f[1]!];
      flippedForVolume++;
    }
  }

  return {
    mesh: { vertices: new Float64Array(mesh.vertices), faces },
    flippedForConsistency,
    flippedForVolume,
    nonManifoldConflict,
  };
}
