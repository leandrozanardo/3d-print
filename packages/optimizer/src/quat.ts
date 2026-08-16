/**
 * Unit quaternions for proper rotations (det ≈ +1, no reflection).
 * Candidate IDs derive from the canonical quantized quaternion (OPT-003/004).
 */

export interface Quaternion {
  readonly w: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

/** Quantization digits for deterministic candidate IDs. */
export const QUAT_ID_QUANT_DIGITS = 6;

const EPS = 1e-12;
const DET_EPS = 1e-9;

function nz(v: number): number {
  return Object.is(v, -0) || v === 0 ? 0 : v;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

export function quatLength(q: Quaternion): number {
  return Math.hypot(q.w, q.x, q.y, q.z);
}

/** Normalize to unit length; returns identity if near-zero. */
export function normalizeQuat(q: Quaternion): Quaternion {
  const len = quatLength(q);
  if (!Number.isFinite(len) || len < EPS) {
    return { w: 1, x: 0, y: 0, z: 0 };
  }
  return {
    w: nz(q.w / len),
    x: nz(q.x / len),
    y: nz(q.y / len),
    z: nz(q.z / len),
  };
}

/**
 * Canonical representative: flip sign so the first non-zero component is positive
 * (prefer w ≥ 0). Makes ±q map to the same orientation id.
 */
export function canonicalizeQuat(q: Quaternion): Quaternion {
  const n = normalizeQuat(q);
  const components = [n.w, n.x, n.y, n.z];
  let flip = false;
  for (const c of components) {
    if (Math.abs(c) > EPS) {
      flip = c < 0;
      break;
    }
  }
  if (!flip) {
    return { w: nz(n.w), x: nz(n.x), y: nz(n.y), z: nz(n.z) };
  }
  return { w: nz(-n.w), x: nz(-n.x), y: nz(-n.y), z: nz(-n.z) };
}

export function identityQuat(): Quaternion {
  return { w: 1, x: 0, y: 0, z: 0 };
}

/** Angular distance in radians between two rotations (0 … π). */
export function angularDistance(a: Quaternion, b: Quaternion): number {
  const qa = canonicalizeQuat(a);
  const qb = canonicalizeQuat(b);
  const dot = clamp(
    Math.abs(qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z),
    0,
    1,
  );
  return 2 * Math.acos(dot);
}

export function quatEquals(a: Quaternion, b: Quaternion, eps = 1e-9): boolean {
  return angularDistance(a, b) <= eps;
}

/** Row-major 4×4 proper rotation from unit quaternion. */
export function quatToMatrix(q: Quaternion): readonly number[] {
  const n = normalizeQuat(q);
  const { w, x, y, z } = n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const xy = x * y;
  const xz = x * z;
  const yz = y * z;
  const wx = w * x;
  const wy = w * y;
  const wz = w * z;
  return Object.freeze([
    1 - 2 * (yy + zz),
    2 * (xy - wz),
    2 * (xz + wy),
    0,
    2 * (xy + wz),
    1 - 2 * (xx + zz),
    2 * (yz - wx),
    0,
    2 * (xz - wy),
    2 * (yz + wx),
    1 - 2 * (xx + yy),
    0,
    0,
    0,
    0,
    1,
  ]);
}

/** Extract rotation quaternion from affine 4×4 (upper-left 3×3). */
export function matrixToQuat(m: readonly number[]): Quaternion {
  if (m.length < 16) {
    throw new Error(`QUAT_MATRIX_LENGTH: expected 16, got ${m.length}`);
  }
  const m00 = m[0]!;
  const m01 = m[1]!;
  const m02 = m[2]!;
  const m10 = m[4]!;
  const m11 = m[5]!;
  const m12 = m[6]!;
  const m20 = m[8]!;
  const m21 = m[9]!;
  const m22 = m[10]!;

  const det =
    m00 * (m11 * m22 - m12 * m21) -
    m01 * (m10 * m22 - m12 * m20) +
    m02 * (m10 * m21 - m11 * m20);
  if (det < 0) {
    throw new Error("QUAT_REFLECTION: matrix determinant is negative");
  }
  if (Math.abs(det - 1) > 0.05) {
    throw new Error(`QUAT_NOT_UNIT_ROTATION: det=${det}`);
  }

  const trace = m00 + m11 + m22;
  let w: number;
  let x: number;
  let y: number;
  let z: number;
  if (trace > 0) {
    const s = Math.sqrt(trace + 1) * 2;
    w = 0.25 * s;
    x = (m21 - m12) / s;
    y = (m02 - m20) / s;
    z = (m10 - m01) / s;
  } else if (m00 > m11 && m00 > m22) {
    const s = Math.sqrt(1 + m00 - m11 - m22) * 2;
    w = (m21 - m12) / s;
    x = 0.25 * s;
    y = (m01 + m10) / s;
    z = (m02 + m20) / s;
  } else if (m11 > m22) {
    const s = Math.sqrt(1 + m11 - m00 - m22) * 2;
    w = (m02 - m20) / s;
    x = (m01 + m10) / s;
    y = 0.25 * s;
    z = (m12 + m21) / s;
  } else {
    const s = Math.sqrt(1 + m22 - m00 - m11) * 2;
    w = (m10 - m01) / s;
    x = (m02 + m20) / s;
    y = (m12 + m21) / s;
    z = 0.25 * s;
  }
  return canonicalizeQuat({ w, x, y, z });
}

/** Linear-block determinant of a 4×4 matrix. */
export function matrixLinearDeterminant(m: readonly number[]): number {
  const a = m[0]!;
  const b = m[1]!;
  const c = m[2]!;
  const d = m[4]!;
  const e = m[5]!;
  const f = m[6]!;
  const g = m[8]!;
  const h = m[9]!;
  const i = m[10]!;
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

export function assertProperRotation(m: readonly number[]): void {
  const det = matrixLinearDeterminant(m);
  if (!(Math.abs(det - 1) <= DET_EPS * 100 || Math.abs(det - 1) < 1e-6)) {
    if (det < 0) {
      throw new Error("ORIENTATION_REFLECTION_FORBIDDEN");
    }
    throw new Error(`ORIENTATION_DET_NOT_ONE: ${det}`);
  }
}

/**
 * Shortest proper rotation taking unit vector `from` onto unit vector `to`.
 * When nearly opposite, pick a stable perpendicular axis.
 */
export function quatFromTo(
  from: readonly [number, number, number],
  to: readonly [number, number, number],
): Quaternion {
  const fx = from[0];
  const fy = from[1];
  const fz = from[2];
  const tx = to[0];
  const ty = to[1];
  const tz = to[2];
  const fl = Math.hypot(fx, fy, fz);
  const tl = Math.hypot(tx, ty, tz);
  if (fl < EPS || tl < EPS) {
    return identityQuat();
  }
  const ax = fx / fl;
  const ay = fy / fl;
  const az = fz / fl;
  const bx = tx / tl;
  const by = ty / tl;
  const bz = tz / tl;
  const dot = clamp(ax * bx + ay * by + az * bz, -1, 1);

  if (dot > 1 - 1e-8) {
    return identityQuat();
  }
  if (dot < -1 + 1e-8) {
    // 180°: choose stable orthogonal axis
    let ox = 1;
    let oy = 0;
    let oz = 0;
    if (Math.abs(ax) > 0.9) {
      ox = 0;
      oy = 1;
      oz = 0;
    }
    let rx = ay * oz - az * oy;
    let ry = az * ox - ax * oz;
    let rz = ax * oy - ay * ox;
    const rl = Math.hypot(rx, ry, rz);
    if (rl < EPS) {
      rx = 0;
      ry = 0;
      rz = 1;
    } else {
      rx /= rl;
      ry /= rl;
      rz /= rl;
    }
    return canonicalizeQuat({ w: 0, x: rx, y: ry, z: rz });
  }

  const cx = ay * bz - az * by;
  const cy = az * bx - ax * bz;
  const cz = ax * by - ay * bx;
  return canonicalizeQuat({
    w: 1 + dot,
    x: cx,
    y: cy,
    z: cz,
  });
}

/** Compose rotations: apply `b` then `a` (q = a ⊗ b). */
export function multiplyQuat(a: Quaternion, b: Quaternion): Quaternion {
  return canonicalizeQuat({
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  });
}

/** Yaw about printer +Z by `degrees`. */
export function quatYawZ(degrees: number): Quaternion {
  const half = (degrees * Math.PI) / 360;
  return canonicalizeQuat({
    w: Math.cos(half),
    x: 0,
    y: 0,
    z: Math.sin(half),
  });
}

function formatQuant(v: number, digits: number): string {
  const n = nz(Number(v.toFixed(digits)));
  return n.toFixed(digits);
}

/** Deterministic candidate id from canonical quantized quaternion. */
export function orientationCandidateId(
  q: Quaternion,
  digits = QUAT_ID_QUANT_DIGITS,
): string {
  const c = canonicalizeQuat(q);
  const w = formatQuant(c.w, digits);
  const x = formatQuant(c.x, digits);
  const y = formatQuant(c.y, digits);
  const z = formatQuant(c.z, digits);
  return `v2-q_${w}_${x}_${y}_${z}`;
}

export interface OrientationCandidateSeed {
  id: string;
  quat: Quaternion;
  matrix: readonly number[];
  source: string;
  legacy: boolean;
}

/** Keep first of each angular cluster; order is stable input order. */
export function dedupeByAngularDistance(
  seeds: readonly OrientationCandidateSeed[],
  minAngleRad: number,
): OrientationCandidateSeed[] {
  const kept: OrientationCandidateSeed[] = [];
  for (const seed of seeds) {
    let duplicate = false;
    for (const existing of kept) {
      if (angularDistance(seed.quat, existing.quat) < minAngleRad) {
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      kept.push(seed);
    }
  }
  return kept;
}

export function seedFromQuat(
  quat: Quaternion,
  source: string,
  legacy = false,
  idOverride?: string,
): OrientationCandidateSeed {
  const q = canonicalizeQuat(quat);
  const matrix = quatToMatrix(q);
  assertProperRotation(matrix);
  return {
    id: idOverride ?? orientationCandidateId(q),
    quat: q,
    matrix,
    source,
    legacy,
  };
}

export function seedFromMatrix(
  matrix: readonly number[],
  source: string,
  legacy = false,
  idOverride?: string,
): OrientationCandidateSeed {
  assertProperRotation(matrix);
  const q = matrixToQuat(matrix);
  return {
    id: idOverride ?? orientationCandidateId(q),
    quat: q,
    matrix: Object.freeze([...matrix]),
    source,
    legacy,
  };
}
