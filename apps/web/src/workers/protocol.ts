/** Versioned geometry worker protocol for full model processing. */

export const GEOMETRY_WORKER_PROTOCOL_VERSION = 2 as const;

export type ProcessStage =
  | "validating"
  | "opening-container"
  | "parsing-model"
  | "resolving-components"
  | "building-geometry"
  | "analyzing-topology"
  | "evaluating-orientations"
  | "applying-optimization"
  | "serializing"
  | "validating-output"
  | "preparing-preview"
  | "completed";

export type WorkerPrinterProfile = {
  id: string;
  name: string;
  bedWidthMm: number;
  bedDepthMm: number;
  maxHeightMm: number;
};

export type WorkerOptimizationGoal = "balanced" | "minimize-height" | "maximize-bed-contact";

export type ProcessRequest = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "process";
  jobId: string;
  fileName: string;
  bytes: ArrayBuffer;
  printer: WorkerPrinterProfile;
  goal: WorkerOptimizationGoal;
};

export type CancelRequest = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "cancel";
  jobId: string;
};

export type WorkerRequest = ProcessRequest | CancelRequest;

export type ProgressEvent = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "progress";
  jobId: string;
  stage: ProcessStage | string;
  ratio: number;
  message: string;
};

export type PreviewReadyEvent = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "previewReady";
  jobId: string;
  positions: Float32Array;
  indices: Uint32Array;
  bounds: { min: [number, number, number]; max: [number, number, number] };
};

export type ProcessSuccessEvent = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "processSuccess";
  jobId: string;
  fileName: string;
  outputFileName: string;
  format: "3mf" | "stl";
  mimeType: string;
  bytes: ArrayBuffer;
  sha256: string;
  before: {
    vertexCount: number;
    triangleCount: number;
    dimensionsMm: [number, number, number];
    watertight: boolean | "unknown";
    bounds: { min: [number, number, number]; max: [number, number, number] };
  };
  after: {
    vertexCount: number;
    triangleCount: number;
    dimensionsMm: [number, number, number];
    watertight: boolean | "unknown";
    bounds: { min: [number, number, number]; max: [number, number, number] };
  };
  optimization: {
    algorithm: string;
    orientationId: string;
    scoreBefore: number;
    scoreAfter: number;
    alreadyOptimal: boolean;
  };
  preservation: {
    preserved: string[];
    removed: string[];
    policy: string;
    notes: string[];
  };
  warnings: { code: string; message: string }[];
  durationMs: number;
  preview: {
    positions: Float32Array;
    indices: Uint32Array;
  };
};

export type ProcessFailureEvent = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "processFailure";
  jobId: string;
  code: string;
  message: string;
  stage: string;
  retryable: boolean;
};

export type CancelledEvent = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "cancelled";
  jobId: string;
};

export type WorkerResponse =
  | ProgressEvent
  | PreviewReadyEvent
  | ProcessSuccessEvent
  | ProcessFailureEvent
  | CancelledEvent;

export function isWorkerRequest(value: unknown): value is WorkerRequest {
  if (typeof value !== "object" || value === null) return false;
  const rec = value as Record<string, unknown>;
  if (rec.schemaVersion !== GEOMETRY_WORKER_PROTOCOL_VERSION) return false;
  return rec.type === "process" || rec.type === "cancel";
}
