import { canonicalJson } from "@fix-my-print/contracts";
import {
  buildParetoSet,
  createCandidate,
  type Candidate,
  type ParetoSet,
} from "@fix-my-print/domain";
import type { RawMesh } from "@fix-my-print/formats";
import {
  PureTsGeometryAdapter,
  type Bounds,
  type GeometryPort,
} from "@fix-my-print/geometry";

export interface BuildVolume {
  x: number;
  y: number;
  z: number;
}

export interface OrientationSpec {
  id: string;
  axis: "x" | "y" | "z";
  turns: number;
}

/** Finite deterministic orientation set (identity + 90° steps on principal axes). */
export const ORIENTATION_SPECS: readonly OrientationSpec[] = [
  { id: "identity", axis: "z", turns: 0 },
  { id: "z90", axis: "z", turns: 1 },
  { id: "z180", axis: "z", turns: 2 },
  { id: "z270", axis: "z", turns: 3 },
  { id: "x90", axis: "x", turns: 1 },
  { id: "x180", axis: "x", turns: 2 },
  { id: "y90", axis: "y", turns: 1 },
  { id: "y180", axis: "y", turns: 2 },
];

function sizeOf(bounds: Bounds): [number, number, number] {
  return [
    bounds.max[0] - bounds.min[0],
    bounds.max[1] - bounds.min[1],
    bounds.max[2] - bounds.min[2],
  ];
}

/**
 * Axis-aligned fit after orientation: compare each transformed axis to the
 * matching printer axis (do not sort/permute axes).
 */
export function fits(
  size: [number, number, number],
  volume: BuildVolume,
  clearance = 0,
): boolean {
  return (
    size[0]! <= volume.x - clearance &&
    size[1]! <= volume.y - clearance &&
    size[2]! <= volume.z - clearance
  );
}

export function generateOrientationCandidates(
  mesh: RawMesh,
  buildVolume: BuildVolume,
  geometry: GeometryPort = new PureTsGeometryAdapter(),
): Candidate[] {
  const candidates: Candidate[] = [];
  for (const spec of ORIENTATION_SPECS) {
    const transformed =
      spec.turns === 0
        ? mesh
        : geometry.transform(mesh, {
            type: "rotate90",
            axis: spec.axis,
            turns: spec.turns,
          });
    const facts = geometry.inspect(transformed);
    const size = sizeOf(facts.bounds);
    const hardConstraintOk = fits(size, buildVolume);
    const height = size[2]!;
    const footprint = size[0]! * size[1]!;
    // Scores are engineering proxies only — not slicer measurements.
    const scores = {
      printability: hardConstraintOk ? 1 / (1 + height) : 0,
      strength: 1 / (1 + height),
      quality: 1 / (1 + footprint),
      timeProxy: 1 / (1 + height),
      materialProxy: 1 / (1 + footprint),
      risk: hardConstraintOk ? 1 : 0,
    };
    candidates.push(
      createCandidate(spec.id, `orient:${spec.id}`, scores, hardConstraintOk, {
        axis: spec.axis,
        turns: spec.turns,
        height,
        footprint,
        scoreKind: "proxy",
        timeIsProxy: true,
        materialIsProxy: true,
      }),
    );
  }
  return candidates;
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
