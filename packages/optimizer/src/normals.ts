/**
 * Area-weighted face-normal clustering for bed-alignment candidates (OPT-006).
 */

import { MAX_NORMAL_CLUSTERS, NORMAL_CLUSTER_ANGULAR_RAD } from "./orientationPolicy";
import { quatFromTo, type Quaternion } from "./quat";
import type { Vec3 } from "./pca";

export interface FaceNormalSample {
  normal: Vec3;
  area: number;
}

export interface NormalCluster {
  /** Unit average direction. */
  direction: Vec3;
  area: number;
}

const EPS = 1e-14;

function normalize(v: Vec3): Vec3 | null {
  const n = Math.hypot(v[0], v[1], v[2]);
  if (n < EPS) {
    return null;
  }
  return [v[0] / n, v[1] / n, v[2] / n];
}

function angleBetween(a: Vec3, b: Vec3): number {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  return Math.acos(dot);
}

function quantKey(v: Vec3): string {
  return `${v[0].toFixed(6)},${v[1].toFixed(6)},${v[2].toFixed(6)}`;
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
 * Cluster unit normals by angular proximity; keep top `maxClusters` by area.
 */
export function clusterNormals(
  samples: readonly FaceNormalSample[],
  angularTolRad = NORMAL_CLUSTER_ANGULAR_RAD,
  maxClusters = MAX_NORMAL_CLUSTERS,
): NormalCluster[] {
  type Acc = { x: number; y: number; z: number; area: number };
  const clusters: Acc[] = [];

  for (const sample of samples) {
    if (!(sample.area > 0) || !Number.isFinite(sample.area)) {
      continue;
    }
    const n = normalize(sample.normal);
    if (!n) {
      continue;
    }
    let best = -1;
    let bestAngle = Infinity;
    for (let i = 0; i < clusters.length; i++) {
      const c = clusters[i]!;
      const cl = Math.hypot(c.x, c.y, c.z);
      if (cl < EPS) {
        continue;
      }
      const cd: Vec3 = [c.x / cl, c.y / cl, c.z / cl];
      const ang = angleBetween(n, cd);
      if (ang < angularTolRad && ang < bestAngle) {
        bestAngle = ang;
        best = i;
      }
    }
    if (best >= 0) {
      const c = clusters[best]!;
      c.x += n[0] * sample.area;
      c.y += n[1] * sample.area;
      c.z += n[2] * sample.area;
      c.area += sample.area;
    } else {
      clusters.push({
        x: n[0] * sample.area,
        y: n[1] * sample.area,
        z: n[2] * sample.area,
        area: sample.area,
      });
    }
  }

  const result: NormalCluster[] = [];
  for (const c of clusters) {
    const dir = normalize([c.x, c.y, c.z]);
    if (!dir) {
      continue;
    }
    result.push({ direction: dir, area: c.area });
  }

  result.sort((a, b) => {
    if (b.area !== a.area) {
      return b.area - a.area;
    }
    const ka = quantKey(a.direction);
    const kb = quantKey(b.direction);
    return ka < kb ? -1 : ka > kb ? 1 : compareDir(a.direction, b.direction);
  });

  return result.slice(0, maxClusters);
}

/** Rotation that aligns outward face normal with printer −Z (bed). */
export function quatAlignNormalToNegZ(normal: Vec3): Quaternion {
  const n = normalize(normal) ?? ([0, 0, 1] as Vec3);
  return quatFromTo(n, [0, 0, -1]);
}
