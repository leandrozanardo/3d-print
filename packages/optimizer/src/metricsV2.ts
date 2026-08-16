/**
 * Orientation metrics V2 and cost vector (OPT-012 … OPT-017).
 */

import type { RawMesh } from "@fix-my-print/formats";
import { analyzeTopology } from "@fix-my-print/geometry";

import { OVERHANG_SUPPORT_DEG, type OrientationCostVector } from "./orientationPolicy";

export type { OrientationCostVector };

export interface MetricsBuildVolume {
  x: number;
  y: number;
  z: number;
}

export interface OverhangBands {
  /** Face area with downwardAngle in [0, 15). */
  band0to15Mm2: number;
  /** [15, 30). */
  band15to30Mm2: number;
  /** [30, 45). */
  band30to45Mm2: number;
  /** ≥ 45°. */
  band45plusMm2: number;
}

export interface OrientationMetricsV2 {
  sizeMm: [number, number, number];
  heightMm: number;
  heightRatio: number;
  footprintAreaMm2: number;
  totalSurfaceAreaMm2: number;
  bedContactAreaMm2: number;
  /** Contact area / footprint (OPT-014), not / total surface. */
  bedContactCoverage: number;
  overhangAreaMm2: number;
  overhangAreaRatio: number;
  weightedOverhangSeverity: number;
  projectedOverhangAreaMm2: number;
  supportHeightMoment: number;
  centerOfMassEstimate: [number, number, number];
  supportPolygonAreaMm2: number;
  stabilityMarginMm: number;
  instabilityRisk: number;
  fitsBuildVolume: boolean;
  metricConfidence: number;
  limitations: readonly string[];
  overhangBands: OverhangBands;
  costs: OrientationCostVector;
}

const EMPTY_BANDS: OverhangBands = {
  band0to15Mm2: 0,
  band15to30Mm2: 0,
  band30to45Mm2: 0,
  band45plusMm2: 0,
};

const EMPTY_COSTS: OrientationCostVector = {
  supportSeverityCost: 1,
  supportHeightCost: 1,
  instabilityCost: 1,
  heightCost: 1,
  contactDeficitCost: 1,
  cosmeticDownwardCost: 1,
};

function clamp01(v: number): number {
  if (!Number.isFinite(v)) {
    return 1;
  }
  return Math.min(1, Math.max(0, v));
}

function contactEpsilon(height: number, diagonal: number): number {
  return Math.max(1e-6, height * 1e-4, diagonal * 1e-6);
}

function downwardAngleDeg(normalZ: number): number {
  return (Math.acos(Math.min(1, Math.max(-1, -normalZ))) * 180) / Math.PI;
}

/** Continuous severity in [0,1]: 0 at vertical (90°), 1 at flat down (0°). */
function overhangSeverity(angleDeg: number): number {
  if (angleDeg >= OVERHANG_SUPPORT_DEG) {
    return 0;
  }
  return clamp01((OVERHANG_SUPPORT_DEG - angleDeg) / OVERHANG_SUPPORT_DEG);
}

function cross2(
  o: readonly [number, number],
  a: readonly [number, number],
  b: readonly [number, number],
): number {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

/** Monotone chain convex hull in XY. */
function convexHull2(points: Array<[number, number]>): Array<[number, number]> {
  if (points.length <= 1) {
    return points.slice();
  }
  const sorted = points
    .slice()
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  const lower: Array<[number, number]> = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross2(lower[lower.length - 2]!, lower[lower.length - 1]!, p) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper: Array<[number, number]> = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i]!;
    while (
      upper.length >= 2 &&
      cross2(upper[upper.length - 2]!, upper[upper.length - 1]!, p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

function polygonArea(poly: ReadonlyArray<readonly [number, number]>): number {
  if (poly.length < 3) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]!;
    const b = poly[(i + 1) % poly.length]!;
    sum += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(sum) * 0.5;
}

/** Signed distance to hull edge; positive inside for CCW hull. */
function distanceToHull(
  point: readonly [number, number],
  hull: ReadonlyArray<readonly [number, number]>,
): { inside: boolean; margin: number } {
  if (hull.length === 0) {
    return { inside: false, margin: -Infinity };
  }
  if (hull.length === 1) {
    const d = Math.hypot(point[0] - hull[0]![0], point[1] - hull[0]![1]);
    return { inside: d < 1e-9, margin: -d };
  }
  if (hull.length === 2) {
    const a = hull[0]!;
    const b = hull[1]!;
    const abx = b[0] - a[0];
    const aby = b[1] - a[1];
    const apx = point[0] - a[0];
    const apy = point[1] - a[1];
    const ab2 = abx * abx + aby * aby;
    const t = ab2 > 0 ? Math.min(1, Math.max(0, (apx * abx + apy * aby) / ab2)) : 0;
    const cx = a[0] + abx * t;
    const cy = a[1] + aby * t;
    const d = Math.hypot(point[0] - cx, point[1] - cy);
    return { inside: d < 1e-9, margin: -d };
  }

  let minEdgeDist = Infinity;
  let windingOk = true;
  for (let i = 0; i < hull.length; i++) {
    const a = hull[i]!;
    const b = hull[(i + 1) % hull.length]!;
    const cross = (b[0] - a[0]) * (point[1] - a[1]) - (b[1] - a[1]) * (point[0] - a[0]);
    if (cross < -1e-12) {
      windingOk = false;
    }
    const abx = b[0] - a[0];
    const aby = b[1] - a[1];
    const len = Math.hypot(abx, aby);
    const dist =
      len > 0 ? Math.abs(cross) / len : Math.hypot(point[0] - a[0], point[1] - a[1]);
    if (dist < minEdgeDist) {
      minEdgeDist = dist;
    }
  }
  if (windingOk) {
    return { inside: true, margin: minEdgeDist };
  }
  return { inside: false, margin: -minEdgeDist };
}

function fitsSize(
  size: readonly [number, number, number],
  volume: MetricsBuildVolume,
  clearance = 0,
): boolean {
  return (
    size[0] <= volume.x - clearance &&
    size[1] <= volume.y - clearance &&
    size[2] <= volume.z - clearance
  );
}

export interface MetricsV2Options {
  buildVolume?: MetricsBuildVolume;
  /** When true, skip topology volume COM (quick path). */
  quick?: boolean;
  referenceDiagonalMm?: number;
}

/**
 * Compute full V2 orientation metrics and normalized cost vector for a mesh
 * already expressed in printer space (after orientation transform).
 */
export function computeOrientationMetricsV2(
  mesh: RawMesh,
  options: MetricsV2Options = {},
): OrientationMetricsV2 {
  const vertices = mesh.vertices;
  const limitations: string[] = [];

  if (vertices.length < 3 || mesh.faces.length === 0) {
    return {
      sizeMm: [0, 0, 0],
      heightMm: 0,
      heightRatio: 0,
      footprintAreaMm2: 0,
      totalSurfaceAreaMm2: 0,
      bedContactAreaMm2: 0,
      bedContactCoverage: 0,
      overhangAreaMm2: 0,
      overhangAreaRatio: 0,
      weightedOverhangSeverity: 0,
      projectedOverhangAreaMm2: 0,
      supportHeightMoment: 0,
      centerOfMassEstimate: [0, 0, 0],
      supportPolygonAreaMm2: 0,
      stabilityMarginMm: 0,
      instabilityRisk: 1,
      fitsBuildVolume: false,
      metricConfidence: 0,
      limitations: ["empty_mesh"],
      overhangBands: { ...EMPTY_BANDS },
      costs: { ...EMPTY_COSTS },
    };
  }

  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  for (let i = 0; i + 2 < vertices.length; i += 3) {
    const x = vertices[i]!;
    const y = vertices[i + 1]!;
    const z = vertices[i + 2]!;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (z > maxZ) maxZ = z;
  }

  const sizeMm: [number, number, number] = [maxX - minX, maxY - minY, maxZ - minZ];
  const heightMm = sizeMm[2];
  const footprintAreaMm2 = sizeMm[0] * sizeMm[1];
  const diagonal = Math.hypot(sizeMm[0], sizeMm[1], sizeMm[2]);
  const refDiag = options.referenceDiagonalMm ?? Math.max(diagonal, 1e-9);
  const epsilon = contactEpsilon(heightMm, diagonal);

  let totalArea = 0;
  let contactArea = 0;
  let overhangArea = 0;
  let weightedSeverityArea = 0;
  let projectedOverhang = 0;
  let supportMoment = 0;
  let cosmeticDown = 0;
  const bands: OverhangBands = { ...EMPTY_BANDS };
  const contactPoints: Array<[number, number]> = [];

  // Surface centroid accumulators
  let sAx = 0;
  let sAy = 0;
  let sAz = 0;
  let sA = 0;
  // Volume COM (tetrahedron method) when watertight
  let vol6 = 0;
  let momX = 0;
  let momY = 0;
  let momZ = 0;

  for (const face of mesh.faces) {
    if (face.length < 3) continue;
    const ia = face[0]! * 3;
    const ib = face[1]! * 3;
    const ic = face[2]! * 3;
    if (
      ia < 0 ||
      ib < 0 ||
      ic < 0 ||
      ia + 2 >= vertices.length ||
      ib + 2 >= vertices.length ||
      ic + 2 >= vertices.length
    ) {
      continue;
    }
    const ax = vertices[ia]!;
    const ay = vertices[ia + 1]!;
    const az = vertices[ia + 2]!;
    const bx = vertices[ib]!;
    const by = vertices[ib + 1]!;
    const bz = vertices[ib + 2]!;
    const cx = vertices[ic]!;
    const cy = vertices[ic + 1]!;
    const cz = vertices[ic + 2]!;

    const ux = bx - ax;
    const uy = by - ay;
    const uz = bz - az;
    const vx = cx - ax;
    const vy = cy - ay;
    const vz = cz - az;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const crossLen = Math.hypot(nx, ny, nz);
    if (!Number.isFinite(crossLen) || crossLen === 0) continue;
    const area = crossLen / 2;
    totalArea += area;
    const invLen = 1 / crossLen;
    const nZ = nz * invLen;
    const cx3 = (ax + bx + cx) / 3;
    const cy3 = (ay + by + cy) / 3;
    const cz3 = (az + bz + cz) / 3;
    sAx += cx3 * area;
    sAy += cy3 * area;
    sAz += cz3 * area;
    sA += area;

    // Signed volume contribution (for optional COM)
    const v6 =
      ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx);
    vol6 += v6;
    momX += v6 * (ax + bx + cx);
    momY += v6 * (ay + by + cy);
    momZ += v6 * (az + bz + cz);

    const onBed = az - minZ <= epsilon && bz - minZ <= epsilon && cz - minZ <= epsilon;
    if (onBed) {
      contactArea += area;
      contactPoints.push([ax, ay], [bx, by], [cx, cy]);
      continue;
    }

    const angle = downwardAngleDeg(nZ);
    if (angle < 15) bands.band0to15Mm2 += area;
    else if (angle < 30) bands.band15to30Mm2 += area;
    else if (angle < 45) bands.band30to45Mm2 += area;
    else bands.band45plusMm2 += area;

    if (angle < OVERHANG_SUPPORT_DEG) {
      const sev = overhangSeverity(angle);
      overhangArea += area;
      weightedSeverityArea += sev * area;
      const proj = area * Math.max(0, -nZ);
      projectedOverhang += proj;
      const heightNorm =
        heightMm > 0 ? Math.min(1, Math.max(0, (cz3 - minZ) / heightMm)) : 0;
      supportMoment += sev * proj * heightNorm;
      if (angle < 30) {
        cosmeticDown += area * (1 - angle / 30);
      }
    }
  }

  const hull = convexHull2(contactPoints);
  const supportPolygonAreaMm2 = polygonArea(hull);

  let metricConfidence = 0.85;
  let com: [number, number, number];
  let watertight = false;
  if (!options.quick) {
    const topo = analyzeTopology(mesh);
    watertight = topo.watertight;
    for (const lim of topo.limitations) {
      if (!limitations.includes(lim)) limitations.push(lim);
    }
  } else {
    limitations.push("quick_metrics_skip_topology");
    metricConfidence = 0.55;
  }

  if (watertight && Math.abs(vol6) > 1e-18) {
    const vol = vol6 / 6;
    com = [momX / (24 * vol), momY / (24 * vol), momZ / (24 * vol)];
    metricConfidence = Math.max(metricConfidence, 0.95);
  } else {
    if (sA > 0) {
      com = [sAx / sA, sAy / sA, sAz / sA];
    } else {
      com = [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2];
    }
    if (!watertight) {
      limitations.push("com_surface_centroid_proxy");
      metricConfidence = Math.min(metricConfidence, 0.7);
    }
  }

  const hullInfo = distanceToHull([com[0], com[1]], hull);
  const charLen = Math.max(Math.hypot(sizeMm[0], sizeMm[1]) * 0.5, 1e-9);
  let stabilityMarginMm = hullInfo.margin;
  let instabilityRisk: number;
  if (supportPolygonAreaMm2 <= 1e-12) {
    instabilityRisk = 1;
    stabilityMarginMm = -charLen;
    limitations.push("point_or_line_or_empty_contact");
  } else if (hullInfo.inside) {
    instabilityRisk = clamp01(1 - hullInfo.margin / charLen);
  } else {
    instabilityRisk = clamp01(0.5 + Math.min(0.5, -hullInfo.margin / charLen));
  }

  const heightRatio = heightMm / refDiag;
  const overhangAreaRatio = totalArea > 0 ? overhangArea / totalArea : 0;
  const weightedOverhangSeverity = totalArea > 0 ? weightedSeverityArea / totalArea : 0;
  const bedContactCoverage =
    footprintAreaMm2 > 0 ? Math.min(1, contactArea / footprintAreaMm2) : 0;

  const momentNorm =
    totalArea > 0 && footprintAreaMm2 > 0
      ? supportMoment / (totalArea * Math.max(footprintAreaMm2, 1e-12) ** 0.5 + 1e-12)
      : supportMoment;
  // Soft normalize moment into a comparable scale
  const supportHeightMoment = supportMoment;

  const buildVolume = options.buildVolume ?? { x: Infinity, y: Infinity, z: Infinity };
  const fitsBuildVolume = fitsSize(sizeMm, buildVolume);

  const costs: OrientationCostVector = {
    supportSeverityCost: clamp01(weightedOverhangSeverity * 4),
    supportHeightCost: clamp01(momentNorm * 8),
    instabilityCost: clamp01(instabilityRisk),
    heightCost: clamp01(heightRatio),
    contactDeficitCost: clamp01(1 - bedContactCoverage),
    cosmeticDownwardCost: clamp01(totalArea > 0 ? cosmeticDown / totalArea : 0),
  };

  return {
    sizeMm,
    heightMm,
    heightRatio,
    footprintAreaMm2,
    totalSurfaceAreaMm2: totalArea,
    bedContactAreaMm2: contactArea,
    bedContactCoverage,
    overhangAreaMm2: overhangArea,
    overhangAreaRatio,
    weightedOverhangSeverity,
    projectedOverhangAreaMm2: projectedOverhang,
    supportHeightMoment,
    centerOfMassEstimate: com,
    supportPolygonAreaMm2,
    stabilityMarginMm,
    instabilityRisk,
    fitsBuildVolume,
    metricConfidence,
    limitations,
    overhangBands: bands,
    costs,
  };
}
