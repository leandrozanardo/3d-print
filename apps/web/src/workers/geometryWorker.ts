/// <reference lib="webworker" />

import { Buffer } from "buffer";
import { detectFormat, parseMesh } from "@fix-my-print/formats";
import { PureTsGeometryAdapter } from "@fix-my-print/geometry";
import {
  isGeometryWorkerRequest,
  type GeometryProgressStage,
  type GeometryWorkerResponse,
} from "./protocol";

// formats parsers expect Node Buffer in the browser worker bundle
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
  const detected = detectFormat(view);
  throwIfCancelled(requestId);

  postProgress(requestId, "parse", 0.45, "parse");
  const parsed = parseMesh(view);
  throwIfCancelled(requestId);

  postProgress(requestId, "inspect", 0.75, "inspect");
  // Browser worker uses topology-complete PureTs adapter (real metrics).
  // Node/CLI production path uses ManifoldGeometryAdapter (WASM).
  const geometry = new PureTsGeometryAdapter();
  try {
    const facts = geometry.inspect(parsed.mesh);
    throwIfCancelled(requestId);

    postProgress(requestId, "done", 1, "done");
    post({
      type: "inspectResult",
      requestId,
      ok: true,
      fileName,
      byteLength: bytes.byteLength,
      format: parsed.format || detected,
      vertexCount: facts.vertexCount,
      faceCount: facts.faceCount,
      bounds: facts.bounds,
      watertight: facts.watertight,
      area: facts.area,
      volume: facts.volume,
      issues: facts.issues,
      limitations: facts.limitations,
    });
  } finally {
    geometry.dispose();
  }
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
