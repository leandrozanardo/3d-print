/**
 * Versioned orientation V2 policy: caps, thresholds, and goal weights (OPT-002/010/018/021).
 */

/** Cost vector components in [0, 1]; lower is better (OPT-017). */
export interface OrientationCostVector {
  supportSeverityCost: number;
  supportHeightCost: number;
  instabilityCost: number;
  heightCost: number;
  contactDeficitCost: number;
  cosmeticDownwardCost: number;
}

export const ORIENTATION_V2_VERSION = "orientation-v2.0.0";

/** Stage A: approximate build-direction budget. */
export const QUICK_DIRECTION_CAP = 110;

/** Stage D: full-metric evaluation budget. */
export const EXACT_CANDIDATE_CAP = 64;

/** Stage A sampling: max faces on the quick path. */
export const QUICK_FACE_SAMPLE_CAP = 20_000;

/** Fibonacci sphere size when distinct directions are scarce (OPT-008). */
export const FIBONACCI_SPHERE_COUNT = 64;

/** Distinct build directions below this trigger Fibonacci fallback. */
export const FIBONACCI_TRIGGER_MIN_DIRECTIONS = 32;

/** Angular dedupe threshold (radians ≈ 1°). */
export const DEDUPE_ANGULAR_RAD = (1 * Math.PI) / 180;

/** Normal cluster merge threshold (radians ≈ 8°). */
export const NORMAL_CLUSTER_ANGULAR_RAD = (8 * Math.PI) / 180;

/** Max area-weighted normal clusters (OPT-006). */
export const MAX_NORMAL_CLUSTERS = 48;

/** Absolute cost reduction required for meaningful improvement. */
export const MEANINGFUL_IMPROVEMENT_ABS = 1e-6;

/** Relative cost reduction required (≥ 0.5%). */
export const MEANINGFUL_IMPROVEMENT_REL = 0.005;

/** Tie epsilon for selection (OPT-020). */
export const SELECTION_COST_EPSILON = 1e-9;

/** V1 vs V2 cost invariant tolerance (OPT-022). */
export const V1_V2_COST_TOLERANCE = 1e-9;

/** Overhang support threshold in degrees (OPT-013). */
export const OVERHANG_SUPPORT_DEG = 45;

export type OrientationGoal = "balanced" | "minimize-height" | "maximize-bed-contact";

export type GoalWeightKey = keyof OrientationCostVector;

export type GoalWeights = Readonly<Record<GoalWeightKey, number>>;

/** OPT-018 — weights sum to 1 for each goal. */
export const GOAL_WEIGHTS: Readonly<Record<OrientationGoal, GoalWeights>> = Object.freeze(
  {
    balanced: Object.freeze({
      supportSeverityCost: 0.3,
      supportHeightCost: 0.2,
      instabilityCost: 0.2,
      heightCost: 0.15,
      contactDeficitCost: 0.1,
      cosmeticDownwardCost: 0.05,
    }),
    "minimize-height": Object.freeze({
      heightCost: 0.45,
      supportSeverityCost: 0.2,
      instabilityCost: 0.15,
      supportHeightCost: 0.1,
      contactDeficitCost: 0.05,
      cosmeticDownwardCost: 0.05,
    }),
    "maximize-bed-contact": Object.freeze({
      contactDeficitCost: 0.4,
      instabilityCost: 0.25,
      supportSeverityCost: 0.15,
      heightCost: 0.1,
      supportHeightCost: 0.05,
      cosmeticDownwardCost: 0.05,
    }),
  },
);

export function weightsForGoal(goal: OrientationGoal): GoalWeights {
  return GOAL_WEIGHTS[goal];
}

export function assertWeightsSumToOne(weights: GoalWeights, eps = 1e-12): void {
  const sum =
    weights.supportSeverityCost +
    weights.supportHeightCost +
    weights.instabilityCost +
    weights.heightCost +
    weights.contactDeficitCost +
    weights.cosmeticDownwardCost;
  if (Math.abs(sum - 1) > eps) {
    throw new Error(`GOAL_WEIGHTS_SUM: expected 1, got ${sum}`);
  }
}

for (const goal of Object.keys(GOAL_WEIGHTS) as OrientationGoal[]) {
  assertWeightsSumToOne(GOAL_WEIGHTS[goal]);
}

export function totalCost(costs: OrientationCostVector, weights: GoalWeights): number {
  return (
    costs.supportSeverityCost * weights.supportSeverityCost +
    costs.supportHeightCost * weights.supportHeightCost +
    costs.instabilityCost * weights.instabilityCost +
    costs.heightCost * weights.heightCost +
    costs.contactDeficitCost * weights.contactDeficitCost +
    costs.cosmeticDownwardCost * weights.cosmeticDownwardCost
  );
}

export function qualityIndexFromCost(cost: number): number {
  return Math.round(Math.min(100, Math.max(0, (1 - cost) * 100)));
}

export function isMeaningfulImprovement(
  baselineCost: number,
  candidateCost: number,
  baselineFits: boolean,
  candidateFits: boolean,
): boolean {
  if (!baselineFits && candidateFits) {
    return true;
  }
  const abs = baselineCost - candidateCost;
  if (abs <= MEANINGFUL_IMPROVEMENT_ABS) {
    return false;
  }
  const denom = Math.max(baselineCost, 1e-12);
  return abs / denom >= MEANINGFUL_IMPROVEMENT_REL;
}

export type OrientationDecisionKind =
  | "orientation-improved"
  | "already-best-or-sanitized"
  | "repair-and-orientation-improved"
  | "repair-only";
