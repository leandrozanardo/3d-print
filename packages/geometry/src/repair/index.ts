export type { RepairPolicy } from "./repairPolicy";
export {
  REPAIR_POLICY_VERSION,
  boundsDiagonal,
  createRepairPolicy,
  createRepairPolicyFromDiagonal,
} from "./repairPolicy";

export type {
  RepairStatus,
  RepairMode,
  TopologySnapshot,
  FidelityMetrics,
  FidelityReport,
  ValidatorReport,
  SafeRepairResult,
  PartRepairReport,
  RepairReasonCode,
} from "./repairTypes";

export type { WeldResult } from "./weld";
export { weldVertices } from "./weld";

export type { FaceCleanupResult } from "./faces";
export { cleanFaces, removeUnreferencedVertices } from "./faces";

export type { WindingFixResult } from "./winding";
export { fixWinding } from "./winding";

export type { BoundaryLoop, BoundaryExtractionResult } from "./boundaryLoops";
export { extractBoundaryLoops } from "./boundaryLoops";

export type { EarClipResult } from "./triangulate";
export { earClipLoop } from "./triangulate";

export { evaluateFidelity, snapshotTopology } from "./fidelity";

export type { SafeRepairOptions } from "./safeRepair";
export { safeRepair, safeRepairMesh, safeRepairMeshSync } from "./safeRepair";

export type {
  PartGeometryAnalysis,
  AssemblyGeometryAnalysis,
  PartMeshInput,
  AssemblyPartInput,
} from "./assemblyAnalysis";
export { analyzePartGeometry, analyzeAssemblyGeometry } from "./assemblyAnalysis";
