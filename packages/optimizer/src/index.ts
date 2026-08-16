import { canonicalJson } from "@fix-my-print/contracts";
import {
  buildParetoSet,
  createCandidate,
  type Candidate,
  type CandidateScores,
  type ParetoSet,
} from "@fix-my-print/domain";
import type { RawMesh } from "@fix-my-print/formats";
import { PureTsGeometryAdapter, type GeometryPort } from "@fix-my-print/geometry";

import { computeOrientationMetrics, type OrientationMetrics } from "./metrics";
import { ORIENTATION_SPECS, type OrientationSpec } from "./orientations";

export type { OrientationMetrics } from "./metrics";
export { computeOrientationMetrics } from "./metrics";
export type { OrientationSpec, UpAxisLabel, YawDegrees } from "./orientations";
export {
  ORIENTATION_COUNT,
  ORIENTATION_SPECS,
  findOrientationSpec,
} from "./orientations";

export interface BuildVolume {
  x: number;
  y: number;
  z: number;
}

/**
 * Scoring contract version. All axes below are geometric proxies derived from
 * the mesh; none of them come from a slicer.
 */
export const ORIENTATION_SCORE_VERSION = "orientation-v1";

export type {
  OrientationMetricsV2,
  OverhangBands,
  OrientationCostVector,
} from "./metricsV2";
export { computeOrientationMetricsV2 } from "./metricsV2";
export type {
  OrientationGoal,
  GoalWeights,
  OrientationDecisionKind,
} from "./orientationPolicy";
export {
  ORIENTATION_V2_VERSION,
  GOAL_WEIGHTS,
  QUICK_DIRECTION_CAP,
  EXACT_CANDIDATE_CAP,
  QUICK_FACE_SAMPLE_CAP,
  MEANINGFUL_IMPROVEMENT_ABS,
  MEANINGFUL_IMPROVEMENT_REL,
  V1_V2_COST_TOLERANCE,
  weightsForGoal,
  totalCost,
  qualityIndexFromCost,
  isMeaningfulImprovement,
} from "./orientationPolicy";
export type { Quaternion, OrientationCandidateSeed } from "./quat";
export {
  normalizeQuat,
  canonicalizeQuat,
  quatToMatrix,
  matrixToQuat,
  quatFromTo,
  angularDistance,
  orientationCandidateId,
  dedupeByAngularDistance,
  identityQuat,
  matrixLinearDeterminant,
} from "./quat";
export type { PcaResult, Vec3 } from "./pca";
export { computePca, pcaAxisSenses, eigenSymmetric3x3 } from "./pca";
export { clusterNormals, quatAlignNormalToNegZ } from "./normals";
export { fibonacciSphereDirections } from "./fibonacci";
export type {
  OrientationCandidateV2,
  EvaluateOrientationsV2Options,
  EvaluateOrientationsV2Result,
  OrientationV2Progress,
} from "./evaluateOrientationsV2";
export {
  evaluateOrientationsV2,
  evaluateOrientationsV2Progressive,
  selectBestOrientationV2,
} from "./evaluateOrientationsV2";

/** Fixed weights used to break Pareto ties deterministically. */
export const DEFAULT_SELECTION_WEIGHTS: CandidateScores = {
  printability: 0.3,
  strength: 0.15,
  quality: 0.1,
  timeProxy: 0.15,
  materialProxy: 0.15,
  risk: 0.15,
};

/**
 * Axis-aligned fit after orientation: compare each transformed axis to the
 * matching printer axis (do not sort/permute axes).
 */
export function fits(
  size: readonly [number, number, number],
  volume: BuildVolume,
  clearance = 0,
): boolean {
  return (
    size[0] <= volume.x - clearance &&
    size[1] <= volume.y - clearance &&
    size[2] <= volume.z - clearance
  );
}

/**
 * Map geometric metrics to the objective vector (higher is better on all axes).
 * Every axis is a proxy: `timeProxy`/`materialProxy` do not model a slicer.
 */
export function scoreOrientation(
  metrics: OrientationMetrics,
  hardConstraintOk: boolean,
): CandidateScores {
  const heightScore = 1 / (1 + Math.max(0, metrics.height));
  const footprintScore = 1 / (1 + Math.max(0, metrics.footprintArea));
  const contactScore = Math.min(1, Math.max(0, metrics.contactFraction));
  const supportFreeScore = 1 - Math.min(1, Math.max(0, metrics.overhangFraction));
  return {
    printability: hardConstraintOk ? contactScore : 0,
    strength: heightScore,
    quality: footprintScore,
    timeProxy: heightScore,
    materialProxy: supportFreeScore,
    risk: hardConstraintOk ? supportFreeScore : 0,
  };
}

export interface OrientationCandidateDetail {
  spec: OrientationSpec;
  metrics: OrientationMetrics;
  candidate: Candidate;
  mesh: RawMesh;
}

/** Evaluate all 24 orientations and return candidates plus transformed meshes. */
export function evaluateOrientations(
  mesh: RawMesh,
  buildVolume: BuildVolume,
  geometry: GeometryPort = new PureTsGeometryAdapter(),
): OrientationCandidateDetail[] {
  return ORIENTATION_SPECS.map((spec) => {
    const transformed = geometry.transform(mesh, { type: "matrix", m: spec.matrix });
    const metrics = computeOrientationMetrics(transformed);
    const hardConstraintOk = fits(metrics.size, buildVolume);
    const scores = scoreOrientation(metrics, hardConstraintOk);
    const candidate = createCandidate(
      spec.id,
      `orient:${spec.id}`,
      scores,
      hardConstraintOk,
      {
        up: spec.up,
        yawDegrees: spec.yawDegrees,
        height: metrics.height,
        footprintArea: metrics.footprintArea,
        contactFraction: metrics.contactFraction,
        overhangFraction: metrics.overhangFraction,
        scoreVersion: ORIENTATION_SCORE_VERSION,
        scoreKind: "proxy",
        timeIsProxy: true,
        materialIsProxy: true,
      },
    );
    return { spec, metrics, candidate, mesh: transformed };
  });
}

export function generateOrientationCandidates(
  mesh: RawMesh,
  buildVolume: BuildVolume,
  geometry: GeometryPort = new PureTsGeometryAdapter(),
): Candidate[] {
  return evaluateOrientations(mesh, buildVolume, geometry).map((d) => d.candidate);
}

export function weightedScore(
  scores: CandidateScores,
  weights: CandidateScores = DEFAULT_SELECTION_WEIGHTS,
): number {
  return (
    scores.printability * weights.printability +
    scores.strength * weights.strength +
    scores.quality * weights.quality +
    scores.timeProxy * weights.timeProxy +
    scores.materialProxy * weights.materialProxy +
    scores.risk * weights.risk
  );
}

/**
 * Deterministic winner: highest weighted score among feasible candidates,
 * ties broken by ascending id so repeated runs agree.
 */
export function selectBestCandidate(
  candidates: readonly Candidate[],
  weights: CandidateScores = DEFAULT_SELECTION_WEIGHTS,
): Candidate | null {
  let best: Candidate | null = null;
  let bestScore = -Infinity;
  for (const candidate of candidates) {
    if (!candidate.hardConstraintOk) {
      continue;
    }
    const score = weightedScore(candidate.scores, weights);
    if (
      score > bestScore ||
      (score === bestScore && best !== null && candidate.id.localeCompare(best.id) < 0)
    ) {
      best = candidate;
      bestScore = score;
    }
  }
  return best;
}

export function paretoFrontierFromCandidates(
  candidates: readonly Candidate[],
): ParetoSet {
  return buildParetoSet(candidates);
}

export function frontierHash(set: ParetoSet): string {
  const payload = set.frontier
    .map((c) => ({ id: c.id, scores: c.scores, ok: c.hardConstraintOk }))
    .sort((a, b) => a.id.localeCompare(b.id));
  return canonicalJson(payload);
}
