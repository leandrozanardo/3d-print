/**
 * Minimal geometry worker protocol (duplicated intentionally so the web app
 * builds without depending on packages that may still be scaffolding).
 */

export type GeometryInspectRequest = {
  type: "inspect";
  requestId: string;
  fileName: string;
  bytes: ArrayBuffer;
};

export type GeometryCancelRequest = {
  type: "cancel";
  requestId: string;
};

export type GeometryWorkerRequest = GeometryInspectRequest | GeometryCancelRequest;

export type GeometryProgressEvent = {
  type: "progress";
  requestId: string;
  ratio: number;
  message: string;
};

export type GeometryInspectResult = {
  type: "inspectResult";
  requestId: string;
  ok: true;
  stub: true;
  fileName: string;
  byteLength: number;
  note: string;
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

export function isGeometryWorkerRequest(value: unknown): value is GeometryWorkerRequest {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const msg = value as Record<string, unknown>;
  if (msg.type === "cancel") {
    return typeof msg.requestId === "string" && msg.requestId.length > 0;
  }
  if (msg.type === "inspect") {
    return (
      typeof msg.requestId === "string" &&
      msg.requestId.length > 0 &&
      typeof msg.fileName === "string" &&
      msg.bytes instanceof ArrayBuffer
    );
  }
  return false;
}
