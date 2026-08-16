/**
 * Stable symmetric 3×3 PCA for build-direction candidates (OPT-007).
 */

export type Vec3 = readonly [number, number, number];

export interface PcaResult {
  /** Mean of the input points. */
  centroid: Vec3;
  /** Eigenvalues descending (σ² along principal axes). */
  eigenvalues: Vec3;
  /** Orthonormal eigenvectors as columns matching eigenvalues. */
  axes: readonly [Vec3, Vec3, Vec3];
  /** True when at least two eigenvalues are nearly equal. */
  degenerate: boolean;
  limitations: readonly string[];
}

const EPS = 1e-12;

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function norm(v: Vec3): number {
  return Math.hypot(v[0], v[1], v[2]);
}

function normalize(v: Vec3): Vec3 | null {
  const n = norm(v);
  if (n < EPS) {
    return null;
  }
  return [v[0] / n, v[1] / n, v[2] / n];
}

function scale(v: Vec3, s: number): Vec3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

/** Lexicographic sign flip so first non-zero component is ≥ 0. */
function canonicalDirection(v: Vec3): Vec3 {
  const n = normalize(v) ?? ([1, 0, 0] as Vec3);
  for (let i = 0; i < 3; i++) {
    if (Math.abs(n[i]!) > EPS) {
      return n[i]! < 0 ? scale(n, -1) : n;
    }
  }
  return [1, 0, 0];
}

function compareDir(a: Vec3, b: Vec3): number {
  for (let i = 0; i < 3; i++) {
    const d = a[i]! - b[i]!;
    if (Math.abs(d) > 1e-15) {
      return d < 0 ? -1 : 1;
    }
  }
  return 0;
}

/**
 * Analytic eigenvalues of a real symmetric 3×3 (Smith 1961 / wikipedia).
 * Returns descending eigenvalues and an orthonormal eigenbasis with deterministic ties.
 */
export function eigenSymmetric3x3(cov: readonly number[]): {
  values: Vec3;
  vectors: readonly [Vec3, Vec3, Vec3];
} {
  const a = cov[0]!;
  const b = cov[1]!;
  const c = cov[2]!;
  const d = cov[3]!;
  const e = cov[4]!;
  const f = cov[5]!;

  const p1 = b * b + c * c + e * e;
  if (p1 < 1e-30) {
    const entries: Array<{ v: number; axis: Vec3 }> = [
      { v: a, axis: [1, 0, 0] },
      { v: d, axis: [0, 1, 0] },
      { v: f, axis: [0, 0, 1] },
    ];
    entries.sort((u, w) => w.v - u.v || compareDir(u.axis, w.axis));
    return {
      values: [entries[0]!.v, entries[1]!.v, entries[2]!.v],
      vectors: [entries[0]!.axis, entries[1]!.axis, entries[2]!.axis],
    };
  }

  const q = (a + d + f) / 3;
  const p2 = (a - q) * (a - q) + (d - q) * (d - q) + (f - q) * (f - q) + 2 * p1;
  const p = Math.sqrt(p2 / 6);
  const invP = 1 / p;
  const A00 = (a - q) * invP;
  const A01 = b * invP;
  const A02 = c * invP;
  const A11 = (d - q) * invP;
  const A12 = e * invP;
  const A22 = (f - q) * invP;
  const detB =
    A00 * (A11 * A22 - A12 * A12) -
    A01 * (A01 * A22 - A12 * A02) +
    A02 * (A01 * A12 - A11 * A02);
  const r = detB / 2;
  const phi =
    r <= -1 ? Math.PI / 3 : r >= 1 ? 0 : Math.acos(Math.min(1, Math.max(-1, r))) / 3;
  const eig0 = q + 2 * p * Math.cos(phi);
  const eig2 = q + 2 * p * Math.cos(phi + (2 * Math.PI) / 3);
  const eig1 = 3 * q - eig0 - eig2;

  const valuesRaw: Vec3 = [eig0, eig1, eig2];
  const vectors = valuesRaw.map((lambda) => eigenvectorFor(cov, lambda)) as [
    Vec3,
    Vec3,
    Vec3,
  ];

  // Orthonormalize / complete basis deterministically
  const v0 = canonicalDirection(vectors[0]);
  let v1 = canonicalDirection(vectors[1]);
  if (Math.abs(dot(v0, v1)) > 0.9) {
    v1 = canonicalDirection(orthogonalFallback(v0));
  } else {
    const proj = scale(v0, dot(v1, v0));
    v1 = normalize(sub(v1, proj)) ?? canonicalDirection(orthogonalFallback(v0));
    v1 = canonicalDirection(v1);
  }
  let v2 = normalize(cross(v0, v1));
  if (!v2) {
    v2 = canonicalDirection(orthogonalFallback(v0));
  } else {
    v2 = canonicalDirection(v2);
  }
  // Re-orthogonalize v1 against v0,v2 if needed
  v1 = normalize(cross(v2, v0)) ?? v1;
  v1 = canonicalDirection(v1);

  const triples: Array<{ v: number; axis: Vec3 }> = [
    { v: valuesRaw[0], axis: v0 },
    { v: valuesRaw[1], axis: v1 },
    { v: valuesRaw[2], axis: v2 },
  ];
  triples.sort((u, w) => w.v - u.v || compareDir(u.axis, w.axis));
  return {
    values: [triples[0]!.v, triples[1]!.v, triples[2]!.v],
    vectors: [triples[0]!.axis, triples[1]!.axis, triples[2]!.axis],
  };
}

function orthogonalFallback(v: Vec3): Vec3 {
  return Math.abs(v[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
}

function eigenvectorFor(cov: readonly number[], lambda: number): Vec3 {
  // (C - λI) v = 0 via cross-products of rows
  const r0: Vec3 = [cov[0]! - lambda, cov[1]!, cov[2]!];
  const r1: Vec3 = [cov[1]!, cov[3]! - lambda, cov[4]!];
  const r2: Vec3 = [cov[2]!, cov[4]!, cov[5]! - lambda];
  const c01 = cross(r0, r1);
  const c12 = cross(r1, r2);
  const c20 = cross(r2, r0);
  const candidates = [c01, c12, c20];
  let best: Vec3 = [1, 0, 0];
  let bestLen = -1;
  for (const c of candidates) {
    const len = norm(c);
    if (len > bestLen || (Math.abs(len - bestLen) < EPS && compareDir(c, best) < 0)) {
      bestLen = len;
      best = c;
    }
  }
  return normalize(best) ?? [1, 0, 0];
}

/** PCA on a point cloud (unweighted). */
export function computePca(points: readonly Vec3[]): PcaResult {
  if (points.length === 0) {
    return {
      centroid: [0, 0, 0],
      eigenvalues: [0, 0, 0],
      axes: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      degenerate: true,
      limitations: ["pca_empty_point_cloud"],
    };
  }

  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (const p of points) {
    cx += p[0];
    cy += p[1];
    cz += p[2];
  }
  const n = points.length;
  const centroid: Vec3 = [cx / n, cy / n, cz / n];

  let xx = 0;
  let xy = 0;
  let xz = 0;
  let yy = 0;
  let yz = 0;
  let zz = 0;
  for (const p of points) {
    const dx = p[0] - centroid[0];
    const dy = p[1] - centroid[1];
    const dz = p[2] - centroid[2];
    xx += dx * dx;
    xy += dx * dy;
    xz += dx * dz;
    yy += dy * dy;
    yz += dy * dz;
    zz += dz * dz;
  }
  const inv = 1 / n;
  const cov = [xx * inv, xy * inv, xz * inv, yy * inv, yz * inv, zz * inv];
  const { values, vectors } = eigenSymmetric3x3(cov);

  const spread = Math.max(Math.abs(values[0]), 1e-30);
  const degenerate =
    Math.abs(values[0] - values[1]) / spread < 1e-6 ||
    Math.abs(values[1] - values[2]) / spread < 1e-6;

  return {
    centroid,
    eigenvalues: values,
    axes: vectors,
    degenerate,
    limitations: degenerate ? ["pca_degenerate_eigenvalues"] : [],
  };
}

/** Six unit senses of the three PCA axes (OPT-007). */
export function pcaAxisSenses(axes: readonly [Vec3, Vec3, Vec3]): Vec3[] {
  const out: Vec3[] = [];
  for (const axis of axes) {
    const pos = canonicalDirection(axis);
    out.push(pos);
    out.push(scale(pos, -1));
  }
  // Stable order: by quantized components
  out.sort((a, b) => compareDir(a, b));
  return out;
}
