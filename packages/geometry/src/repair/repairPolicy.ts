import type { RawMesh } from "@fix-my-print/formats";

import { computeBounds, type Bounds } from "../bounds";

/** Versioned adaptive repair tolerances (RPR-005 / RPR-010 / RPR-015 / RPR-016). */
export const REPAIR_POLICY_VERSION = "geometry-quality-v2-repair.1.0.0";

export interface RepairPolicy {
  version: string;
  weldToleranceMm: number;
  areaToleranceMm2: number;
  planarityToleranceMm: number;
  /** Absolute max hole diameter for auto-fill. */
  maxHoleDiameterMm: number;
  /** Max hole projected area as fraction of part surface area. */
  maxHoleAreaFraction: number;
  /** Max hole perimeter for auto-fill. */
  maxHolePerimeterMm: number;
  /** Cap on automatic fillable loops per part. */
  maxFillableLoops: number;
  /** Absolute triangle growth budget for hole fill. */
  maxTriangleGrowth: number;
  /** Per-axis bounds delta allowed after repair. */
  maxBoundsDeltaMm: number;
  /** Relative volume delta when both sides are watertight. */
  maxVolumeRelativeDelta: number;
  /** Relative area delta when both sides are watertight (excluding justified fill). */
  maxAreaRelativeDelta: number;
  /** Symmetric sampling distance limits (RPR-016). */
  maxSampleDistanceMm: number;
  maxSampleP95Mm: number;
  /**
   * When false (default), invalid indices / non-finite coords fail closed
   * instead of dropping faces.
   */
  allowRemoveInvalidFaces: boolean;
}

function clamp(value: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, value));
}

/** Bounding-box diagonal length in mm. */
export function boundsDiagonal(bounds: Bounds): number {
  const dx = bounds.max[0] - bounds.min[0];
  const dy = bounds.max[1] - bounds.min[1];
  const dz = bounds.max[2] - bounds.min[2];
  const d = Math.hypot(dx, dy, dz);
  return Number.isFinite(d) && d > 0 ? d : 1e-9;
}

/** Build adaptive RepairPolicy from bbox diagonal D and face count. */
export function createRepairPolicyFromDiagonal(
  D: number,
  faceCount: number,
  overrides: Partial<RepairPolicy> = {},
): RepairPolicy {
  const d = Number.isFinite(D) && D > 0 ? D : 1e-9;
  const maxHoleDiameterMm = Math.min(20, Math.max(0.5, 0.02 * d));
  const policy: RepairPolicy = {
    version: REPAIR_POLICY_VERSION,
    weldToleranceMm: clamp(d * 1e-9, 1e-9, 1e-5),
    areaToleranceMm2: Math.max(1e-18, d * d * 1e-14),
    planarityToleranceMm: clamp(d * 1e-5, 1e-5, 0.01),
    maxHoleDiameterMm,
    maxHoleAreaFraction: 0.005,
    maxHolePerimeterMm: Math.PI * maxHoleDiameterMm,
    maxFillableLoops: 16,
    maxTriangleGrowth: Math.max(1000, Math.ceil(Math.max(0, faceCount) * 0.05)),
    maxBoundsDeltaMm: Math.max(0.01, d * 1e-4),
    maxVolumeRelativeDelta: 0.005,
    maxAreaRelativeDelta: 0.01,
    maxSampleDistanceMm: 0.05,
    maxSampleP95Mm: 0.02,
    allowRemoveInvalidFaces: false,
  };
  return { ...policy, ...overrides, version: overrides.version ?? policy.version };
}

/** Derive RepairPolicy from a mesh bounds + face count. */
export function createRepairPolicy(
  mesh: RawMesh,
  overrides: Partial<RepairPolicy> = {},
): RepairPolicy {
  const bounds = computeBounds(mesh);
  return createRepairPolicyFromDiagonal(
    boundsDiagonal(bounds),
    mesh.faces.length,
    overrides,
  );
}
