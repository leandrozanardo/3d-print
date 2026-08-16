import type { RawMesh } from "@fix-my-print/formats";

import type { RepairPolicy } from "./repairPolicy";

function undirectedKey(a: number, b: number): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

export interface BoundaryLoop {
  /** Ordered vertex indices (closed: first equals last is NOT duplicated). */
  vertices: number[];
  perimeterMm: number;
  diameterMm: number;
  planar: boolean;
  selfIntersecting: boolean;
  fillable: boolean;
  reasonCodes: string[];
}

export interface BoundaryExtractionResult {
  loops: BoundaryLoop[];
  boundaryEdgeCount: number;
}

function edgeLength(vertices: Float64Array, a: number, b: number): number {
  const ax = vertices[a * 3]!;
  const ay = vertices[a * 3 + 1]!;
  const az = vertices[a * 3 + 2]!;
  const bx = vertices[b * 3]!;
  const by = vertices[b * 3 + 1]!;
  const bz = vertices[b * 3 + 2]!;
  return Math.hypot(bx - ax, by - ay, bz - az);
}

function planarityOk(
  vertices: Float64Array,
  loop: number[],
  toleranceMm: number,
): boolean {
  if (loop.length < 3) return false;
  const ax = vertices[loop[0]! * 3]!;
  const ay = vertices[loop[0]! * 3 + 1]!;
  const az = vertices[loop[0]! * 3 + 2]!;
  const bx = vertices[loop[1]! * 3]!;
  const by = vertices[loop[1]! * 3 + 1]!;
  const bz = vertices[loop[1]! * 3 + 2]!;
  const cx = vertices[loop[2]! * 3]!;
  const cy = vertices[loop[2]! * 3 + 1]!;
  const cz = vertices[loop[2]! * 3 + 2]!;
  let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
  let ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
  let nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  const nlen = Math.hypot(nx, ny, nz);
  if (nlen < 1e-18) return false;
  nx /= nlen;
  ny /= nlen;
  nz /= nlen;
  const d = -(nx * ax + ny * ay + nz * az);
  for (const vi of loop) {
    const x = vertices[vi * 3]!;
    const y = vertices[vi * 3 + 1]!;
    const z = vertices[vi * 3 + 2]!;
    if (Math.abs(nx * x + ny * y + nz * z + d) > toleranceMm) return false;
  }
  return true;
}

/** Conservative 2D projection self-intersection check on plane of first triangle. */
function selfIntersects(vertices: Float64Array, loop: number[]): boolean {
  if (loop.length < 4) return false;
  // Project to dominant plane axes.
  const ax = vertices[loop[0]! * 3]!;
  const ay = vertices[loop[0]! * 3 + 1]!;
  const az = vertices[loop[0]! * 3 + 2]!;
  const bx = vertices[loop[1]! * 3]!;
  const by = vertices[loop[1]! * 3 + 1]!;
  const bz = vertices[loop[1]! * 3 + 2]!;
  const cx = vertices[loop[2]! * 3]!;
  const cy = vertices[loop[2]! * 3 + 1]!;
  const cz = vertices[loop[2]! * 3 + 2]!;
  const nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
  const ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
  const nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  const anx = Math.abs(nx);
  const any = Math.abs(ny);
  const anz = Math.abs(nz);
  const drop = anx >= any && anx >= anz ? 0 : any >= anz ? 1 : 2;
  const pts: [number, number][] = loop.map((vi) => {
    const x = vertices[vi * 3]!;
    const y = vertices[vi * 3 + 1]!;
    const z = vertices[vi * 3 + 2]!;
    if (drop === 0) return [y, z];
    if (drop === 1) return [x, z];
    return [x, y];
  });
  const n = pts.length;
  const segIntersect = (
    p1: [number, number],
    p2: [number, number],
    q1: [number, number],
    q2: [number, number],
  ): boolean => {
    const orient = (a: [number, number], b: [number, number], c: [number, number]) => {
      const v = (b[1] - a[1]) * (c[0] - b[0]) - (b[0] - a[0]) * (c[1] - b[1]);
      if (Math.abs(v) < 1e-18) return 0;
      return v > 0 ? 1 : 2;
    };
    const o1 = orient(p1, p2, q1);
    const o2 = orient(p1, p2, q2);
    const o3 = orient(q1, q2, p1);
    const o4 = orient(q1, q2, p2);
    return o1 !== 0 && o2 !== 0 && o3 !== 0 && o4 !== 0 && o1 !== o2 && o3 !== o4;
  };
  for (let i = 0; i < n; i++) {
    const a1 = pts[i]!;
    const a2 = pts[(i + 1) % n]!;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(i - j) <= 1 || (i === 0 && j === n - 1)) continue;
      const b1 = pts[j]!;
      const b2 = pts[(j + 1) % n]!;
      if (segIntersect(a1, a2, b1, b2)) return true;
    }
  }
  return false;
}

/**
 * Extract boundary loops and classify fillable candidates (RPR-009 / RPR-010).
 */
export function extractBoundaryLoops(
  mesh: RawMesh,
  policy: RepairPolicy,
  surfaceAreaMm2: number,
): BoundaryExtractionResult {
  const edgeCount = new Map<string, { a: number; b: number; count: number }>();
  for (const face of mesh.faces) {
    if (face.length < 3) continue;
    const edges: [number, number][] = [
      [face[0]!, face[1]!],
      [face[1]!, face[2]!],
      [face[2]!, face[0]!],
    ];
    for (const [a, b] of edges) {
      const key = undirectedKey(a, b);
      const prev = edgeCount.get(key);
      if (prev) prev.count += 1;
      else edgeCount.set(key, { a, b, count: 1 });
    }
  }

  const adj = new Map<number, number[]>();
  let boundaryEdgeCount = 0;
  for (const { a, b, count } of edgeCount.values()) {
    if (count !== 1) continue;
    boundaryEdgeCount += 1;
    const la = adj.get(a) ?? [];
    la.push(b);
    adj.set(a, la);
    const lb = adj.get(b) ?? [];
    lb.push(a);
    adj.set(b, lb);
  }

  const visitedEdges = new Set<string>();
  const loops: BoundaryLoop[] = [];

  for (const start of [...adj.keys()].sort((x, y) => x - y)) {
    const neighbors = adj.get(start);
    if (!neighbors || neighbors.length === 0) continue;
    for (const firstNext of [...neighbors].sort((x, y) => x - y)) {
      const startKey = undirectedKey(start, firstNext);
      if (visitedEdges.has(startKey)) continue;

      const loop: number[] = [start];
      let prev = start;
      let cur = firstNext;
      visitedEdges.add(startKey);
      let closed = false;
      const maxSteps = boundaryEdgeCount + 2;
      for (let step = 0; step < maxSteps; step++) {
        loop.push(cur);
        if (cur === start) {
          closed = true;
          break;
        }
        const nexts = (adj.get(cur) ?? []).filter((n) => n !== prev);
        if (nexts.length !== 1) {
          closed = false;
          break;
        }
        const next = nexts[0]!;
        visitedEdges.add(undirectedKey(cur, next));
        prev = cur;
        cur = next;
      }
      if (!closed || loop.length < 4) continue;
      // loop includes closing start at end — drop duplicate
      const verts = loop.slice(0, -1);
      if (verts.length < 3) continue;

      // Degree-2 within loop check
      const deg = new Map<number, number>();
      for (let i = 0; i < verts.length; i++) {
        const u = verts[i]!;
        const v = verts[(i + 1) % verts.length]!;
        deg.set(u, (deg.get(u) ?? 0) + 1);
        deg.set(v, (deg.get(v) ?? 0) + 1);
      }
      const degreeOk = [...deg.values()].every((d) => d === 2);

      let perimeter = 0;
      let maxEdge = 0;
      for (let i = 0; i < verts.length; i++) {
        const len = edgeLength(mesh.vertices, verts[i]!, verts[(i + 1) % verts.length]!);
        perimeter += len;
        if (len > maxEdge) maxEdge = len;
      }
      // Diameter proxy: max pairwise distance among loop verts (capped sample).
      let diameter = maxEdge;
      for (let i = 0; i < verts.length; i++) {
        for (let j = i + 1; j < verts.length; j++) {
          const d = edgeLength(mesh.vertices, verts[i]!, verts[j]!);
          if (d > diameter) diameter = d;
        }
      }

      const planar = planarityOk(mesh.vertices, verts, policy.planarityToleranceMm);
      const crossing = selfIntersects(mesh.vertices, verts);
      const projectedAreaProxy = (perimeter * perimeter) / (4 * Math.PI);
      const reasonCodes: string[] = [];
      if (!degreeOk) reasonCodes.push("BOUNDARY_AMBIGUOUS");
      if (!planar) reasonCodes.push("BOUNDARY_NON_PLANAR");
      if (crossing) reasonCodes.push("BOUNDARY_SELF_INTERSECTING");
      if (diameter > policy.maxHoleDiameterMm) reasonCodes.push("BOUNDARY_TOO_LARGE");
      if (perimeter > policy.maxHolePerimeterMm) reasonCodes.push("BOUNDARY_TOO_LARGE");
      if (
        surfaceAreaMm2 > 0 &&
        projectedAreaProxy > surfaceAreaMm2 * policy.maxHoleAreaFraction
      ) {
        reasonCodes.push("BOUNDARY_TOO_LARGE");
        reasonCodes.push("POSSIBLE_INTENTIONAL_OPENING");
      }

      const fillable = reasonCodes.length === 0 && verts.length >= 3;
      loops.push({
        vertices: verts,
        perimeterMm: perimeter,
        diameterMm: diameter,
        planar,
        selfIntersecting: crossing,
        fillable,
        reasonCodes,
      });
    }
  }

  loops.sort((a, b) => {
    if (a.perimeterMm !== b.perimeterMm) return a.perimeterMm - b.perimeterMm;
    return a.vertices.join(",").localeCompare(b.vertices.join(","));
  });

  return { loops, boundaryEdgeCount };
}
