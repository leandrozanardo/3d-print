/**
 * Browser geometry-worker protocol.
 * Keep transferable ArrayBuffer inspect payloads local to the web app;
 * versioned shape mirrors contracts AnalysisResult facts without stub flags.
 */

export const GEOMETRY_WORKER_PROTOCOL_VERSION = 1 as const;

export type GeometryBounds = {
  min: [number, number, number];
  max: [number, number, number];
};

export type GeometryInspectRequest = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "inspect";
  requestId: string;
  fileName: string;
  bytes: ArrayBuffer;
};

export type GeometryCancelRequest = {
  schemaVersion: typeof GEOMETRY_WORKER_PROTOCOL_VERSION;
  type: "cancel";
  requestId: string;
};

export type GeometryWorkerRequest = GeometryInspectRequest | GeometryCancelRequest;

export type GeometryProgressStage = "detect" | "parse" | "inspect" | "done";

export type GeometryProgressEvent = {
  type: "progress";
  requestId: string;
  stage: GeometryProgressStage;
  ratio: number;
  message: string;
};

export type GeometryInspectResult = {
  type: "inspectResult";
  requestId: string;
  ok: true;
  fileName: string;
  byteLength: number;
  format: string;
  vertexCount: number;
  faceCount: number;
  bounds: GeometryBounds;
  watertight: boolean;
  area: number | null;
  volume: number | null;
  issues: string[];
  limitations: string[];
};

export type GeometryErrorResult = {
  type: "error";
  requestId: string;
  ok: false;
  code: string;
  message: string;
};

export type GeometryWorkerResponse =
  | GeometryProgressEvent
  | GeometryInspectResult
  | GeometryErrorResult;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

export function isGeometryWorkerRequest(value: unknown): value is GeometryWorkerRequest {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const msg = value as Record<string, unknown>;
  if (msg.schemaVersion !== GEOMETRY_WORKER_PROTOCOL_VERSION) {
    return false;
  }
  if (msg.type === "cancel") {
    return isNonEmptyString(msg.requestId);
  }
  if (msg.type === "inspect") {
    return (
      isNonEmptyString(msg.requestId) &&
      isNonEmptyString(msg.fileName) &&
      msg.bytes instanceof ArrayBuffer
    );
  }
  return false;
}
