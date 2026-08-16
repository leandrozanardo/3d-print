/// <reference lib="webworker" />

import {
  isGeometryWorkerRequest,
  type GeometryWorkerResponse,
} from "./protocol";

declare const self: DedicatedWorkerGlobalScope;

function post(message: GeometryWorkerResponse): void {
  self.postMessage(message);
}

self.onmessage = (event: MessageEvent<unknown>) => {
  const data = event.data;
  if (!isGeometryWorkerRequest(data)) {
    post({
      type: "error",
      requestId: "unknown",
      ok: false,
      code: "INVALID_PROTOCOL",
      message: "Invalid geometry worker message",
    });
    return;
  }

  if (data.type === "cancel") {
    post({
      type: "progress",
      requestId: data.requestId,
      ratio: 0,
      message: "cancel acknowledged (terminate from UI for hard stop)",
    });
    return;
  }

  const { requestId, fileName, bytes } = data;
  post({
    type: "progress",
    requestId,
    ratio: 0.25,
    message: "validating buffer",
  });
  post({
    type: "progress",
    requestId,
    ratio: 0.75,
    message: "stub inspect",
  });
  post({
    type: "inspectResult",
    requestId,
    ok: true,
    stub: true,
    fileName,
    byteLength: bytes.byteLength,
    note: "Stub geometry inspect — WASM adapter disabled by feature flag",
  });
};
