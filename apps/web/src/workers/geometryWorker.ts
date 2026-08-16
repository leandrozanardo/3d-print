/// <reference lib="webworker" />

import { Buffer } from "buffer";
import {
  isGeometryWorkerRequest,
  type GeometryProgressStage,
  type GeometryWorkerResponse,
} from "./protocol";
import { inspectModelBytes } from "./inspectModel";

// formats / 3mf parsers expect Node Buffer in the browser worker bundle
(globalThis as unknown as { Buffer: typeof Buffer }).Buffer = Buffer;

declare const self: DedicatedWorkerGlobalScope;

let cancelledRequestId: string | null = null;

function post(message: GeometryWorkerResponse): void {
  self.postMessage(message);
}

function postProgress(
  requestId: string,
  stage: GeometryProgressStage,
  ratio: number,
  message: string,
): void {
  post({ type: "progress", requestId, stage, ratio, message });
}

function publicErrorMessage(err: unknown): { code: string; message: string } {
  if (err && typeof err === "object") {
    const e = err as {
      code?: unknown;
      message?: unknown;
      name?: unknown;
    };
    const code =
      typeof e.code === "string" && e.code.length > 0
        ? e.code
        : typeof e.name === "string" && e.name.length > 0
          ? e.name
          : "INSPECT_FAILED";
    const message =
      typeof e.message === "string" && e.message.length > 0
        ? e.message.split("\n")[0]!.slice(0, 240)
        : "Geometry inspect failed";
    return { code, message };
  }
  return { code: "INSPECT_FAILED", message: "Geometry inspect failed" };
}

function throwIfCancelled(requestId: string): void {
  if (cancelledRequestId === requestId) {
    const err = new Error("run cancelled");
    (err as Error & { code: string }).code = "RUN_CANCELLED";
    throw err;
  }
}

async function handleInspect(
  requestId: string,
  fileName: string,
  bytes: ArrayBuffer,
): Promise<void> {
  throwIfCancelled(requestId);

  postProgress(requestId, "detect", 0.15, "detect");
  const view = new Uint8Array(bytes);
  throwIfCancelled(requestId);

  postProgress(requestId, "parse", 0.45, "parse");
  postProgress(requestId, "inspect", 0.75, "inspect");
  const result = inspectModelBytes(fileName, view);
  throwIfCancelled(requestId);

  postProgress(requestId, "done", 1, "done");
  post({
    type: "inspectResult",
    requestId,
    ok: true,
    fileName,
    byteLength: bytes.byteLength,
    ...result,
  });
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
    cancelledRequestId = data.requestId;
    postProgress(
      data.requestId,
      "done",
      0,
      "cancel acknowledged (terminate from UI for hard stop)",
    );
    return;
  }

  const { requestId, fileName, bytes } = data;
  void handleInspect(requestId, fileName, bytes).catch((err: unknown) => {
    const { code, message } = publicErrorMessage(err);
    post({
      type: "error",
      requestId,
      ok: false,
      code,
      message,
    });
  });
};
