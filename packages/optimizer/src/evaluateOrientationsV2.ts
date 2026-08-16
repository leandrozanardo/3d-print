/**
 * Orientation engine V2: staged search A/B/C/D with cooperative yield (OPT-005…011, 020…025).
 */

import type { RawMesh } from "@fix-my-print/formats";
import { PureTsGeometryAdapter, type GeometryPort } from "@fix-my-print/geometry";

import { fibonacciSphereDirections } from "./fibonacci";
import {
  computeOrientationMetricsV2,
  type MetricsBuildVolume,
  type OrientationMetricsV2,
} from "./metricsV2";
import { clusterNormals, quatAlignNormalToNegZ, type FaceNormalSample } from "./normals";
import {
  DEDUPE_ANGULAR_RAD,
  EXACT_CANDIDATE_CAP,
  FIBONACCI_SPHERE_COUNT,
  FIBONACCI_TRIGGER_MIN_DIRECTIONS,
  isMeaningfulImprovement,
  ORIENTATION_V2_VERSION,
  qualityIndexFromCost,
  QUICK_DIRECTION_CAP,
  QUICK_FACE_SAMPLE_CAP,
  SELECTION_COST_EPSILON,
  totalCost,
  V1_V2_COST_TOLERANCE,
  weightsForGoal,
  type GoalWeights,
  type OrientationDecisionKind,
  type OrientationGoal,
} from "./orientationPolicy";
import { ORIENTATION_SPECS } from "./orientations";
import { computePca, pcaAxisSenses, type Vec3 } from "./pca";
import {
  angularDistance,
  dedupeByAngularDistance,
  identityQuat,
  multiplyQuat,
  quatFromTo,
  quatToMatrix,
  quatYawZ,
  seedFromMatrix,
  seedFromQuat,
  type OrientationCandidateSeed,
  type Quaternion,
} from "./quat";

export type BuildVolumeV2 = MetricsBuildVolume;

export type OrientationV2ProgressStage =
  | "generate"
  | "quick"
  | "yaw"
  | "refine"
  | "exact"
  | "select";

export interface OrientationV2Progress {
  stage: OrientationV2ProgressStage;
  completed: number;
  total: number;
}

export interface OrientationCandidateV2 {
  id: string;
  quat: Quaternion;
  matrix: readonly number[];
  source: string;
  legacy: boolean;
  metrics: OrientationMetricsV2;
  totalCost: number;
  qualityIndex: number;
}

export interface EvaluateOrientationsV2Options {
  goal?: OrientationGoal;
  geometry?: GeometryPort;
  signal?: AbortSignal;
  onProgress?: (progress: OrientationV2Progress) => void;
  /** Batch size between cooperative yields. */
  yieldBatchSize?: number;
}

export interface EvaluateOrientationsV2Result {
  version: typeof ORIENTATION_V2_VERSION;
  goal: OrientationGoal;
  weights: GoalWeights;
  candidates: OrientationCandidateV2[];
  selected: OrientationCandidateV2;
  bestV1: OrientationCandidateV2;
  bestV2: OrientationCandidateV2;
  v1BestCost: number;
  v2BestCost: number;
  original: OrientationCandidateV2;
  meaningfulImprovement: boolean;
  alreadyOptimal: boolean;
  decisionKind: OrientationDecisionKind;
  candidateCount: number;
  legacyCandidateCount: number;
  quickCandidateCount: number;
  exactCandidateCount: number;
  cancelled: boolean;
}

const IDENTITY_ID = "up+z-yaw0";
const YAW_COARSE_STEPS = 24; // 15°
const TOP_YAW_DIRECTIONS = 12;
const TOP_REFINE = 16;
const BATCH_DEFAULT = 4;

function checkAbort(signal: AbortSignal | undefined): void {
  if (signal?.aborted) {
    const err = new Error("ORIENTATION_V2_ABORTED");
    err.name = "AbortError";
    throw err;
  }
}

async function coopYield(): Promise<void> {
  await Promise.resolve();
}

function sampleFaceIndices(faceCount: number, cap: number): number[] {
  if (faceCount <= cap) {
    return Array.from({ length: faceCount }, (_, i) => i);
  }
  const out: number[] = [];
  for (let i = 0; i < cap; i++) {
    out.push(Math.floor((i * faceCount) / cap));
  }
  return out;
}

function collectFaceSamples(
  mesh: RawMesh,
  faceIndices: readonly number[],
): FaceNormalSample[] {
  const samples: FaceNormalSample[] = [];
  const vertices = mesh.vertices;
  for (const fi of faceIndices) {
    const face = mesh.faces[fi];
    if (!face || face.length < 3) continue;
    const ia = face[0]! * 3;
    const ib = face[1]! * 3;
    const ic = face[2]! * 3;
    if (
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
    const len = Math.hypot(nx, ny, nz);
    if (!(len > 0)) continue;
    samples.push({
      normal: [nx / len, ny / len, nz / len],
      area: len / 2,
    });
  }
  return samples;
}

function collectVertexPoints(mesh: RawMesh, maxPoints = 4096): Vec3[] {
  const verts = mesh.vertices;
  const total = Math.floor(verts.length / 3);
  if (total === 0) return [];
  const stride = Math.max(1, Math.ceil(total / maxPoints));
  const points: Vec3[] = [];
  for (let i = 0; i < total; i += stride) {
    const o = i * 3;
    points.push([verts[o]!, verts[o + 1]!, verts[o + 2]!]);
  }
  return points;
}

function buildDirectionSeeds(mesh: RawMesh): OrientationCandidateSeed[] {
  const seeds: OrientationCandidateSeed[] = [];

  // 1. Identity
  seeds.push(seedFromQuat(identityQuat(), "identity", false, IDENTITY_ID));

  // 2. All 24 V1 (preserve legacy ids)
  for (const spec of ORIENTATION_SPECS) {
    seeds.push(seedFromMatrix(spec.matrix, "v1", true, spec.id));
  }

  // 3–4. Normal clusters → align to −Z
  const faceIdx = sampleFaceIndices(mesh.faces.length, QUICK_FACE_SAMPLE_CAP);
  const samples = collectFaceSamples(mesh, faceIdx);
  const clusters = clusterNormals(samples);
  for (const cluster of clusters) {
    seeds.push(seedFromQuat(quatAlignNormalToNegZ(cluster.direction), "normal-cluster"));
  }

  // 5–6. PCA axes (six senses) as build directions (object +Z → printer +Z via from-to)
  const pca = computePca(collectVertexPoints(mesh));
  for (const dir of pcaAxisSenses(pca.axes)) {
    // Treat dir as desired printer +Z (up) in object space: rotate dir → +Z
    seeds.push(seedFromQuat(quatFromTo(dir, [0, 0, 1]), "pca"));
  }

  let deduped = dedupeByAngularDistance(seeds, DEDUPE_ANGULAR_RAD);

  // Count distinct "build directions" roughly via up-axis of matrix
  if (deduped.length < FIBONACCI_TRIGGER_MIN_DIRECTIONS) {
    for (const dir of fibonacciSphereDirections(FIBONACCI_SPHERE_COUNT)) {
      seeds.push(seedFromQuat(quatFromTo(dir, [0, 0, 1]), "fibonacci"));
    }
    deduped = dedupeByAngularDistance(seeds, DEDUPE_ANGULAR_RAD);
  }

  // Prefer legacy first for stable dedupe winners
  deduped.sort((a, b) => {
    if (a.legacy !== b.legacy) return a.legacy ? -1 : 1;
    return a.id.localeCompare(b.id);
  });
  return dedupeByAngularDistance(deduped, DEDUPE_ANGULAR_RAD).slice(
    0,
    QUICK_DIRECTION_CAP,
  );
}

function withYaw(
  seed: OrientationCandidateSeed,
  yawDeg: number,
): OrientationCandidateSeed {
  const q = multiplyQuat(quatYawZ(yawDeg), seed.quat);
  return seedFromQuat(q, `${seed.source}+yaw${yawDeg}`, seed.legacy);
}

function evaluateSeed(
  seed: OrientationCandidateSeed,
  mesh: RawMesh,
  buildVolume: MetricsBuildVolume,
  geometry: GeometryPort,
  weights: GoalWeights,
  quick: boolean,
  refDiag: number,
): OrientationCandidateV2 {
  const transformed = geometry.transform(mesh, { type: "matrix", m: seed.matrix });
  const metrics = computeOrientationMetricsV2(transformed, {
    buildVolume,
    quick,
    referenceDiagonalMm: refDiag,
  });
  const cost = totalCost(metrics.costs, weights);
  return {
    id: seed.id,
    quat: seed.quat,
    matrix: seed.matrix,
    source: seed.source,
    legacy: seed.legacy,
    metrics,
    totalCost: cost,
    qualityIndex: qualityIndexFromCost(cost),
  };
}

/** Deterministic face subsample for large-mesh orientation search. */
function sampleMeshForSearch(mesh: RawMesh, faceCap: number): RawMesh {
  if (mesh.faces.length <= faceCap) return mesh;
  const indices = sampleFaceIndices(mesh.faces.length, faceCap);
  const used = new Map<number, number>();
  const vertices: number[] = [];
  const faces: number[][] = [];
  for (const fi of indices) {
    const face = mesh.faces[fi]!;
    if (face.length < 3) continue;
    const mapped: number[] = [];
    for (let k = 0; k < 3; k++) {
      const vi = face[k]!;
      let ni = used.get(vi);
      if (ni === undefined) {
        ni = vertices.length / 3;
        used.set(vi, ni);
        const o = vi * 3;
        vertices.push(mesh.vertices[o]!, mesh.vertices[o + 1]!, mesh.vertices[o + 2]!);
      }
      mapped.push(ni);
    }
    faces.push(mapped);
  }
  return { vertices: Float64Array.from(vertices), faces };
}

function referenceDiagonal(mesh: RawMesh): number {
  const v = mesh.vertices;
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  for (let i = 0; i + 2 < v.length; i += 3) {
    const x = v[i]!;
    const y = v[i + 1]!;
    const z = v[i + 2]!;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }
  return Math.max(Math.hypot(maxX - minX, maxY - minY, maxZ - minZ), 1e-9);
}

/**
 * OPT-020 selection among feasible candidates.
 */
export function selectBestOrientationV2(
  candidates: readonly OrientationCandidateV2[],
  originalId: string = IDENTITY_ID,
): OrientationCandidateV2 | null {
  const feasible = candidates.filter((c) => c.metrics.fitsBuildVolume);
  const pool = feasible.length > 0 ? feasible : [...candidates];
  if (pool.length === 0) return null;

  let best = pool[0]!;
  for (let i = 1; i < pool.length; i++) {
    const c = pool[i]!;
    if (isBetterCandidate(c, best, originalId)) {
      best = c;
    }
  }
  return best;
}

function isBetterCandidate(
  a: OrientationCandidateV2,
  b: OrientationCandidateV2,
  originalId: string,
): boolean {
  const da = a.totalCost - b.totalCost;
  if (da < -SELECTION_COST_EPSILON) return true;
  if (da > SELECTION_COST_EPSILON) return false;

  // Within epsilon: prefer original
  const aOrig = a.id === originalId;
  const bOrig = b.id === originalId;
  if (aOrig !== bOrig) return aOrig;

  if (a.metrics.costs.supportSeverityCost !== b.metrics.costs.supportSeverityCost) {
    return a.metrics.costs.supportSeverityCost < b.metrics.costs.supportSeverityCost;
  }
  if (a.metrics.costs.instabilityCost !== b.metrics.costs.instabilityCost) {
    return a.metrics.costs.instabilityCost < b.metrics.costs.instabilityCost;
  }
  if (a.metrics.heightMm !== b.metrics.heightMm) {
    return a.metrics.heightMm < b.metrics.heightMm;
  }
  if (a.metrics.bedContactAreaMm2 !== b.metrics.bedContactAreaMm2) {
    return a.metrics.bedContactAreaMm2 > b.metrics.bedContactAreaMm2;
  }
  return a.id.localeCompare(b.id) < 0;
}

function isOrthogonalCandidate(c: OrientationCandidateV2): boolean {
  return c.legacy || ORIENTATION_SPECS.some((s) => s.id === c.id);
}

/**
 * Async staged orientation search. Always includes the 24 V1 orientations.
 */
export async function evaluateOrientationsV2(
  mesh: RawMesh,
  buildVolume: MetricsBuildVolume,
  options: EvaluateOrientationsV2Options = {},
): Promise<EvaluateOrientationsV2Result> {
  const goal = options.goal ?? "balanced";
  const weights = weightsForGoal(goal);
  const geometry = options.geometry ?? new PureTsGeometryAdapter();
  const signal = options.signal;
  const batch = options.yieldBatchSize ?? BATCH_DEFAULT;
  const report = options.onProgress;
  const refDiag = referenceDiagonal(mesh);
  // Search transforms a sampled mesh; the selected matrix is applied to the full mesh by the engine.
  const searchMesh = sampleMeshForSearch(mesh, QUICK_FACE_SAMPLE_CAP);

  try {
    checkAbort(signal);
    report?.({ stage: "generate", completed: 0, total: 1 });
    let directionSeeds = buildDirectionSeeds(mesh);
    // Ensure all 24 V1 present even after caps
    const legacySeeds = ORIENTATION_SPECS.map((spec) =>
      seedFromMatrix(spec.matrix, "v1", true, spec.id),
    );
    const byId = new Map<string, OrientationCandidateSeed>();
    for (const s of [...legacySeeds, ...directionSeeds]) {
      if (!byId.has(s.id)) byId.set(s.id, s);
    }
    directionSeeds = [...byId.values()];
    // Cap non-legacy while keeping all legacy
    const legacy = directionSeeds.filter((s) => s.legacy);
    const nonLegacy = directionSeeds
      .filter((s) => !s.legacy)
      .slice(0, Math.max(0, QUICK_DIRECTION_CAP - legacy.length));
    directionSeeds = [...legacy, ...nonLegacy];
    report?.({ stage: "generate", completed: 1, total: 1 });
    await coopYield();

    const largeMesh = mesh.faces.length >= 50_000;

    // Stage A — quick evaluation
    report?.({ stage: "quick", completed: 0, total: directionSeeds.length });
    const quickResults: OrientationCandidateV2[] = [];
    for (let i = 0; i < directionSeeds.length; i++) {
      checkAbort(signal);
      quickResults.push(
        evaluateSeed(
          directionSeeds[i]!,
          searchMesh,
          buildVolume,
          geometry,
          weights,
          true,
          refDiag,
        ),
      );
      if ((i + 1) % batch === 0) {
        report?.({ stage: "quick", completed: i + 1, total: directionSeeds.length });
        await coopYield();
      }
    }
    report?.({
      stage: "quick",
      completed: directionSeeds.length,
      total: directionSeeds.length,
    });

    const rankedQuick = [...quickResults].sort((a, b) => {
      if (a.totalCost !== b.totalCost) return a.totalCost - b.totalCost;
      return a.id.localeCompare(b.id);
    });

    // Stage B/C — skipped on large meshes (budget: keep V1 + top quick directions only).
    const yawSeeds: OrientationCandidateSeed[] = [];
    if (!largeMesh) {
      const topNonLegacy = rankedQuick
        .filter((c) => !c.legacy)
        .slice(0, TOP_YAW_DIRECTIONS);
      for (const base of topNonLegacy) {
        const baseSeed = seedFromQuat(base.quat, base.source, false, base.id);
        for (let step = 0; step < YAW_COARSE_STEPS; step++) {
          const deg = step * 15;
          if (deg === 0) continue;
          yawSeeds.push(withYaw(baseSeed, deg));
        }
      }
    }
    report?.({ stage: "yaw", completed: 0, total: yawSeeds.length || 1 });
    const yawResults: OrientationCandidateV2[] = [];
    for (let i = 0; i < yawSeeds.length; i++) {
      checkAbort(signal);
      yawResults.push(
        evaluateSeed(
          yawSeeds[i]!,
          searchMesh,
          buildVolume,
          geometry,
          weights,
          true,
          refDiag,
        ),
      );
      if ((i + 1) % batch === 0) {
        report?.({ stage: "yaw", completed: i + 1, total: yawSeeds.length });
        await coopYield();
      }
    }
    report?.({ stage: "yaw", completed: yawSeeds.length, total: yawSeeds.length || 1 });

    // Stage C — refine best
    const refineSeeds: OrientationCandidateSeed[] = [];
    if (!largeMesh) {
      const refinePool = [...rankedQuick, ...yawResults]
        .sort((a, b) => a.totalCost - b.totalCost || a.id.localeCompare(b.id))
        .slice(0, TOP_REFINE);
      for (const base of refinePool) {
        if (base.legacy) continue;
        const baseSeed = seedFromQuat(base.quat, base.source, false, base.id);
        for (const delta of [7.5, -7.5, 3.75, -3.75]) {
          refineSeeds.push(withYaw(baseSeed, delta));
        }
      }
    }
    report?.({ stage: "refine", completed: 0, total: refineSeeds.length || 1 });
    const refineResults: OrientationCandidateV2[] = [];
    for (let i = 0; i < refineSeeds.length; i++) {
      checkAbort(signal);
      refineResults.push(
        evaluateSeed(
          refineSeeds[i]!,
          searchMesh,
          buildVolume,
          geometry,
          weights,
          true,
          refDiag,
        ),
      );
      if ((i + 1) % batch === 0) {
        report?.({ stage: "refine", completed: i + 1, total: refineSeeds.length });
        await coopYield();
      }
    }
    report?.({
      stage: "refine",
      completed: refineSeeds.length,
      total: refineSeeds.length || 1,
    });

    // Stage D — exact metrics on top candidates + all V1
    const mergedSeeds = new Map<string, OrientationCandidateSeed>();
    for (const c of [...rankedQuick, ...yawResults, ...refineResults]) {
      mergedSeeds.set(c.id, seedFromQuat(c.quat, c.source, c.legacy, c.id));
    }
    for (const spec of ORIENTATION_SPECS) {
      mergedSeeds.set(spec.id, seedFromMatrix(spec.matrix, "v1", true, spec.id));
    }

    const exactSeedList = [...mergedSeeds.values()]
      .map((s) => {
        // Prefer lower quick cost when ranking for exact budget
        const quick = [...rankedQuick, ...yawResults, ...refineResults].find(
          (c) => c.id === s.id,
        );
        return { seed: s, cost: quick?.totalCost ?? Number.POSITIVE_INFINITY };
      })
      .sort((a, b) => {
        if (a.seed.legacy !== b.seed.legacy) return a.seed.legacy ? -1 : 1;
        if (a.cost !== b.cost) return a.cost - b.cost;
        return a.seed.id.localeCompare(b.seed.id);
      });

    const exactSeeds: OrientationCandidateSeed[] = [];
    const seen = new Set<string>();
    for (const row of exactSeedList) {
      if (row.seed.legacy) {
        exactSeeds.push(row.seed);
        seen.add(row.seed.id);
      }
    }
    const exactCap = largeMesh ? Math.min(EXACT_CANDIDATE_CAP, 32) : EXACT_CANDIDATE_CAP;
    for (const row of exactSeedList) {
      if (exactSeeds.length >= exactCap) break;
      if (seen.has(row.seed.id)) continue;
      exactSeeds.push(row.seed);
      seen.add(row.seed.id);
    }

    report?.({ stage: "exact", completed: 0, total: exactSeeds.length });
    const exactResults: OrientationCandidateV2[] = [];
    for (let i = 0; i < exactSeeds.length; i++) {
      checkAbort(signal);
      exactResults.push(
        evaluateSeed(
          exactSeeds[i]!,
          searchMesh,
          buildVolume,
          geometry,
          weights,
          largeMesh,
          refDiag,
        ),
      );
      if ((i + 1) % batch === 0) {
        report?.({ stage: "exact", completed: i + 1, total: exactSeeds.length });
        await coopYield();
      }
    }
    report?.({ stage: "exact", completed: exactSeeds.length, total: exactSeeds.length });

    report?.({ stage: "select", completed: 0, total: 1 });

    const v1Candidates = exactResults.filter((c) => isOrthogonalCandidate(c));
    const bestV1 =
      selectBestOrientationV2(v1Candidates, IDENTITY_ID) ??
      selectBestOrientationV2(exactResults, IDENTITY_ID)!;
    const bestV2 = selectBestOrientationV2(exactResults, IDENTITY_ID)!;

    if (bestV2.totalCost > bestV1.totalCost + V1_V2_COST_TOLERANCE) {
      throw new Error(
        `ORIENTATION_V2_INVARIANT: v2BestCost ${bestV2.totalCost} > v1BestCost ${bestV1.totalCost}`,
      );
    }

    const original =
      exactResults.find((c) => c.id === IDENTITY_ID) ??
      evaluateSeed(
        seedFromQuat(identityQuat(), "identity", false, IDENTITY_ID),
        mesh,
        buildVolume,
        geometry,
        weights,
        false,
        refDiag,
      );

    const meaningful = isMeaningfulImprovement(
      original.totalCost,
      bestV2.totalCost,
      original.metrics.fitsBuildVolume,
      bestV2.metrics.fitsBuildVolume,
    );

    // Also require non-trivial rotation vs identity when declaring improvement
    const angularFromIdentity = angularDistance(bestV2.quat, identityQuat());
    const improved =
      meaningful &&
      (bestV2.id !== IDENTITY_ID || angularFromIdentity > DEDUPE_ANGULAR_RAD);

    let selected: OrientationCandidateV2;
    let alreadyOptimal: boolean;
    let decisionKind: OrientationDecisionKind;
    if (improved) {
      selected = bestV2;
      alreadyOptimal = false;
      decisionKind = "orientation-improved";
    } else {
      selected = original;
      alreadyOptimal = true;
      decisionKind = "already-best-or-sanitized";
    }

    report?.({ stage: "select", completed: 1, total: 1 });

    return {
      version: ORIENTATION_V2_VERSION,
      goal,
      weights,
      candidates: exactResults,
      selected,
      bestV1,
      bestV2,
      v1BestCost: bestV1.totalCost,
      v2BestCost: bestV2.totalCost,
      original,
      meaningfulImprovement: improved,
      alreadyOptimal,
      decisionKind,
      candidateCount: exactResults.length,
      legacyCandidateCount: v1Candidates.length,
      quickCandidateCount: quickResults.length,
      exactCandidateCount: exactResults.length,
      cancelled: false,
    };
  } catch (err) {
    if (
      err instanceof Error &&
      (err.name === "AbortError" || err.message === "ORIENTATION_V2_ABORTED")
    ) {
      return {
        version: ORIENTATION_V2_VERSION,
        goal,
        weights,
        candidates: [],
        selected: {
          id: IDENTITY_ID,
          quat: identityQuat(),
          matrix: quatToMatrix(identityQuat()),
          source: "cancelled",
          legacy: true,
          metrics: computeOrientationMetricsV2(mesh, { buildVolume, quick: true }),
          totalCost: 1,
          qualityIndex: 0,
        },
        bestV1: {
          id: IDENTITY_ID,
          quat: identityQuat(),
          matrix: quatToMatrix(identityQuat()),
          source: "cancelled",
          legacy: true,
          metrics: computeOrientationMetricsV2(mesh, { buildVolume, quick: true }),
          totalCost: 1,
          qualityIndex: 0,
        },
        bestV2: {
          id: IDENTITY_ID,
          quat: identityQuat(),
          matrix: quatToMatrix(identityQuat()),
          source: "cancelled",
          legacy: true,
          metrics: computeOrientationMetricsV2(mesh, { buildVolume, quick: true }),
          totalCost: 1,
          qualityIndex: 0,
        },
        v1BestCost: 1,
        v2BestCost: 1,
        original: {
          id: IDENTITY_ID,
          quat: identityQuat(),
          matrix: quatToMatrix(identityQuat()),
          source: "cancelled",
          legacy: true,
          metrics: computeOrientationMetricsV2(mesh, { buildVolume, quick: true }),
          totalCost: 1,
          qualityIndex: 0,
        },
        meaningfulImprovement: false,
        alreadyOptimal: true,
        decisionKind: "already-best-or-sanitized",
        candidateCount: 0,
        legacyCandidateCount: 0,
        quickCandidateCount: 0,
        exactCandidateCount: 0,
        cancelled: true,
      };
    }
    throw err;
  }
}

/** Async generator variant reporting progress between stages. */
export async function* evaluateOrientationsV2Progressive(
  mesh: RawMesh,
  buildVolume: MetricsBuildVolume,
  options: EvaluateOrientationsV2Options = {},
): AsyncGenerator<OrientationV2Progress, EvaluateOrientationsV2Result, void> {
  const progressLog: OrientationV2Progress[] = [];
  const result = await evaluateOrientationsV2(mesh, buildVolume, {
    ...options,
    onProgress: (p) => {
      progressLog.push(p);
      options.onProgress?.(p);
    },
  });
  for (const p of progressLog) {
    yield p;
  }
  return result;
}
