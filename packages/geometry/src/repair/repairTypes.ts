import type { RawMesh } from "@fix-my-print/formats";

import type { Bounds } from "../bounds";

/** Transactional repair outcome status (RPR-002). */
export type RepairStatus =
  | "not-needed"
  | "committed"
  | "abstained"
  | "rejected"
  | "unavailable";

/** Requested repair aggressiveness (RPR-001). */
export type RepairMode = "none" | "safe";

/** Compact topology snapshot for before/candidate/after reports. */
export interface TopologySnapshot {
  vertexCount: number;
  faceCount: number;
  componentCount: number;
  boundaryEdgeCount: number;
  nonManifoldEdgeCount: number;
  degenerateFaceCount: number;
  windingConsistent: boolean | null;
  watertight: boolean;
  area: number | null;
  volume: number | null;
  bounds: Bounds;
  issues: string[];
}

export interface FidelityMetrics {
  maxDistanceMm: number;
  p95DistanceMm: number;
  meanDistanceMm: number;
  boundsDeltaMm: [number, number, number];
  triangleDelta: number;
  volumeRelativeDelta: number | null;
  areaRelativeDelta: number | null;
  newNonManifold: boolean;
  boundaryReducedOrClosed: boolean;
}

export interface FidelityReport {
  passed: boolean;
  metrics: FidelityMetrics;
  reasonCodes: string[];
}

export interface ValidatorReport {
  available: boolean;
  accepted: boolean | null;
  warnings: string[];
}

/**
 * Transactional safe-repair result (RPR-002).
 * Distinct from GeometryPort light RepairResult (operations/issues).
 */
export interface SafeRepairResult {
  status: RepairStatus;
  mode: RepairMode;
  mesh: RawMesh;
  operationsAttempted: string[];
  operationsCommitted: string[];
  reasonCodes: string[];
  before: TopologySnapshot;
  candidate: TopologySnapshot | null;
  after: TopologySnapshot;
  fidelity: FidelityReport | null;
  validator: ValidatorReport | null;
  durationMs: number;
  /** Per-operation face/vertex deltas for diagnostics. */
  counts: {
    weldedVertices: number;
    removedDegenerateFaces: number;
    removedDuplicateFaces: number;
    removedUnreferencedVertices: number;
    flippedFaces: number;
    filledLoops: number;
    filledTriangles: number;
  };
}

export interface PartRepairReport {
  partId: string;
  name?: string;
  status: RepairStatus;
  reasonCodes: string[];
  operationsCommitted: string[];
  beforeWatertight: boolean;
  afterWatertight: boolean;
}

export type RepairReasonCode =
  | "REPAIR_MODE_NONE"
  | "ALREADY_CLEAN"
  | "INVALID_COORDINATES"
  | "INVALID_INDICES"
  | "BOUNDARY_TOO_LARGE"
  | "BOUNDARY_NON_PLANAR"
  | "BOUNDARY_AMBIGUOUS"
  | "BOUNDARY_SELF_INTERSECTING"
  | "NON_MANIFOLD_COMPLEX"
  | "FIDELITY_NOT_PROVABLE"
  | "FIDELITY_BOUNDS"
  | "FIDELITY_TRIANGLES"
  | "FIDELITY_NON_MANIFOLD"
  | "FIDELITY_VOLUME"
  | "FIDELITY_AREA"
  | "FIDELITY_DISTANCE"
  | "FIDELITY_DEGENERATE"
  | "FIDELITY_BOUNDARY"
  | "FIDELITY_COMPONENTS"
  | "POSSIBLE_INTENTIONAL_OPENING"
  | "HOLE_FILL_BUDGET"
  | "TRIANGULATION_FAILED"
  | "MANIFOLD_UNAVAILABLE"
  | "MANIFOLD_FAILED"
  | "COMMITTED"
  | "ABSTAINED_NO_SAFE_FILL";
