/** Pure domain types and factories — no zod/react. */

export type Confidence = "high" | "medium" | "low" | "unknown";

export type ProvenanceKind =
  | "measured"
  | "declared"
  | "derived"
  | "heuristic"
  | "simulated"
  | "ai_suggested"
  | "unknown";

export interface Provenance {
  kind: ProvenanceKind;
  sourceId?: string;
  note?: string;
}

export function createProvenance(
  kind: ProvenanceKind,
  options: { sourceId?: string; note?: string } = {},
): Provenance {
  const p: Provenance = { kind };
  if (options.sourceId !== undefined) p.sourceId = options.sourceId;
  if (options.note !== undefined) p.note = options.note;
  return p;
}

export interface ObjectiveVector {
  printability: number;
  strength: number;
  quality: number;
  timeProxy: number;
  materialProxy: number;
  risk: number;
}

const OBJECTIVE_KEYS = [
  "printability",
  "strength",
  "quality",
  "timeProxy",
  "materialProxy",
  "risk",
] as const;

/** Normalize non-negative weights so they sum to 1 (or all-zero stays zero). */
export function createObjectiveVector(
  weights: Partial<ObjectiveVector>,
): ObjectiveVector {
  const raw: ObjectiveVector = {
    printability: weights.printability ?? 0,
    strength: weights.strength ?? 0,
    quality: weights.quality ?? 0,
    timeProxy: weights.timeProxy ?? 0,
    materialProxy: weights.materialProxy ?? 0,
    risk: weights.risk ?? 0,
  };
  for (const key of OBJECTIVE_KEYS) {
    const v = raw[key];
    if (!Number.isFinite(v) || v < 0) {
      throw new Error(`ObjectiveVector weight ${key} must be finite and >= 0`);
    }
  }
  const sum = OBJECTIVE_KEYS.reduce((acc, k) => acc + raw[k], 0);
  if (sum === 0) {
    return raw;
  }
  const out = { ...raw };
  for (const key of OBJECTIVE_KEYS) {
    out[key] = raw[key] / sum;
  }
  return out;
}

export interface Finding {
  id: string;
  code: string;
  message: string;
  confidence: Confidence;
  provenance: Provenance;
}

export function createFinding(
  id: string,
  code: string,
  message: string,
  confidence: Confidence,
  provenance: Provenance,
): Finding {
  return { id, code, message, confidence, provenance };
}

export interface CandidateScores {
  printability: number;
  strength: number;
  quality: number;
  timeProxy: number;
  materialProxy: number;
  risk: number;
}

export interface Candidate {
  id: string;
  label: string;
  hardConstraintOk: boolean;
  scores: CandidateScores;
  meta?: Record<string, string | number | boolean>;
}

export function createCandidate(
  id: string,
  label: string,
  scores: CandidateScores,
  hardConstraintOk = true,
  meta?: Record<string, string | number | boolean>,
): Candidate {
  const c: Candidate = { id, label, hardConstraintOk, scores };
  if (meta !== undefined) c.meta = meta;
  return c;
}

/**
 * A dominates B when A is >= B in all objectives and > in at least one.
 * Higher is better for all score axes.
 */
export function dominates(a: CandidateScores, b: CandidateScores): boolean {
  const keys = OBJECTIVE_KEYS;
  let strictlyBetter = false;
  for (const key of keys) {
    if (a[key] < b[key]) return false;
    if (a[key] > b[key]) strictlyBetter = true;
  }
  return strictlyBetter;
}

export function paretoFrontier(candidates: readonly Candidate[]): Candidate[] {
  const feasible = candidates.filter((c) => c.hardConstraintOk);
  return feasible.filter(
    (c) =>
      !feasible.some(
        (other) => other.id !== c.id && dominates(other.scores, c.scores),
      ),
  );
}

export interface ParetoSet {
  frontier: Candidate[];
  dominatedIds: string[];
}

export function buildParetoSet(candidates: readonly Candidate[]): ParetoSet {
  const frontier = paretoFrontier(candidates);
  const frontierIds = new Set(frontier.map((c) => c.id));
  const dominatedIds = candidates
    .filter((c) => c.hardConstraintOk && !frontierIds.has(c.id))
    .map((c) => c.id);
  return { frontier, dominatedIds };
}
