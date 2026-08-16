/**
 * Deterministic ear clipping for simple planar polygon loops (RPR-012).
 */

export interface EarClipResult {
  triangles: number[][];
  ok: boolean;
  reason?: string;
}

function project(
  positions: Float64Array,
  loop: readonly number[],
): { pts: [number, number][]; drop: 0 | 1 | 2 } {
  const ax = positions[loop[0]! * 3]!;
  const ay = positions[loop[0]! * 3 + 1]!;
  const az = positions[loop[0]! * 3 + 2]!;
  const bx = positions[loop[1]! * 3]!;
  const by = positions[loop[1]! * 3 + 1]!;
  const bz = positions[loop[1]! * 3 + 2]!;
  const cx = positions[loop[2]! * 3]!;
  const cy = positions[loop[2]! * 3 + 1]!;
  const cz = positions[loop[2]! * 3 + 2]!;
  const nx = Math.abs((by - ay) * (cz - az) - (bz - az) * (cy - ay));
  const ny = Math.abs((bz - az) * (cx - ax) - (bx - ax) * (cz - az));
  const nz = Math.abs((bx - ax) * (cy - ay) - (by - ay) * (cx - ax));
  const drop: 0 | 1 | 2 = nx >= ny && nx >= nz ? 0 : ny >= nz ? 1 : 2;
  const pts: [number, number][] = loop.map((vi) => {
    const x = positions[vi * 3]!;
    const y = positions[vi * 3 + 1]!;
    const z = positions[vi * 3 + 2]!;
    if (drop === 0) return [y, z];
    if (drop === 1) return [x, z];
    return [x, y];
  });
  return { pts, drop };
}

function area2(pts: [number, number][]): number {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i]!;
    const [x2, y2] = pts[(i + 1) % pts.length]!;
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

function pointInTri(
  p: [number, number],
  a: [number, number],
  b: [number, number],
  c: [number, number],
): boolean {
  const sign = (p1: [number, number], p2: [number, number], p3: [number, number]) =>
    (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
  const b1 = sign(p, a, b) < 0;
  const b2 = sign(p, b, c) < 0;
  const b3 = sign(p, c, a) < 0;
  return b1 === b2 && b2 === b3;
}

/**
 * Ear-clip a simple loop into triangles referencing original vertex indices.
 */
export function earClipLoop(
  positions: Float64Array,
  loop: readonly number[],
): EarClipResult {
  if (loop.length < 3) return { triangles: [], ok: false, reason: "TOO_FEW_VERTICES" };
  if (loop.length === 3) {
    return { triangles: [[loop[0]!, loop[1]!, loop[2]!]], ok: true };
  }

  const { pts } = project(positions, loop);
  let orient = area2(pts) >= 0 ? 1 : -1;
  const idx = loop.map((_, i) => i);
  const triangles: number[][] = [];
  let guard = loop.length * loop.length + 8;

  while (idx.length > 3 && guard-- > 0) {
    let clipped = false;
    for (let i = 0; i < idx.length; i++) {
      const i0 = idx[(i + idx.length - 1) % idx.length]!;
      const i1 = idx[i]!;
      const i2 = idx[(i + 1) % idx.length]!;
      const a = pts[i0]!;
      const b = pts[i1]!;
      const c = pts[i2]!;
      const cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
      if (cross * orient <= 1e-18) continue; // not a convex ear for this orientation
      let empty = true;
      for (let j = 0; j < idx.length; j++) {
        const ij = idx[j]!;
        if (ij === i0 || ij === i1 || ij === i2) continue;
        if (pointInTri(pts[ij]!, a, b, c)) {
          empty = false;
          break;
        }
      }
      if (!empty) continue;
      triangles.push([loop[i0]!, loop[i1]!, loop[i2]!]);
      idx.splice(i, 1);
      clipped = true;
      break;
    }
    if (!clipped) {
      // Flip orientation once if stuck (CW/CCW mismatch).
      if (orient === 1) {
        orient = -1;
        continue;
      }
      return { triangles: [], ok: false, reason: "TRIANGULATION_FAILED" };
    }
  }
  if (idx.length === 3) {
    triangles.push([loop[idx[0]!]!, loop[idx[1]!]!, loop[idx[2]!]!]);
  }
  return { triangles, ok: triangles.length > 0 };
}
