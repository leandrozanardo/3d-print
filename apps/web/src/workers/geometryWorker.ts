/// <reference lib="webworker" />

// Provide Buffer for format parsers that still decode via Node-style APIs.
import { Buffer } from "buffer";
(globalThis as unknown as { Buffer: typeof Buffer }).Buffer = Buffer;

import { processModel, type PrinterProfile } from "@fix-my-print/engine";
import { EngineException } from "@fix-my-print/contracts";

import {
  GEOMETRY_WORKER_PROTOCOL_VERSION,
  isWorkerRequest,
  type ProcessStage,
  type WorkerResponse,
} from "./protocol";

declare const self: DedicatedWorkerGlobalScope;

let activeJobId: string | null = null;
let cancelledJobId: string | null = null;

function post(message: WorkerResponse, transfer: Transferable[] = []): void {
  self.postMessage(message, transfer);
}

function mapStage(stage: string): ProcessStage | string {
  if (stage === "resolving-components") return "building-geometry";
  return stage;
}

self.onmessage = (event: MessageEvent<unknown>) => {
  const data = event.data;
  if (!isWorkerRequest(data)) {
    post({
      schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
      type: "processFailure",
      jobId: "unknown",
      code: "UNKNOWN",
      message: "Invalid worker request",
      stage: "validating",
      retryable: false,
    });
    return;
  }

  if (data.type === "cancel") {
    cancelledJobId = data.jobId;
    if (activeJobId === data.jobId) {
      post({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "cancelled",
        jobId: data.jobId,
      });
    }
    return;
  }

  const jobId = data.jobId;
  activeJobId = jobId;
  cancelledJobId = null;

  void (async () => {
    try {
      const printer: PrinterProfile = {
        id: data.printer.id,
        name: data.printer.name,
        bedWidthMm: data.printer.bedWidthMm,
        bedDepthMm: data.printer.bedDepthMm,
        maxHeightMm: data.printer.maxHeightMm,
      };
      const result = await processModel(
        {
          jobId,
          fileName: data.fileName,
          bytes: new Uint8Array(data.bytes),
          printer,
          goal: data.goal,
        },
        {
          isCancelled: () => cancelledJobId === jobId,
          onProgress: (stage, ratio, message) => {
            if (cancelledJobId === jobId) return;
            post({
              schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
              type: "progress",
              jobId,
              stage: mapStage(stage),
              ratio,
              message,
            });
          },
        },
      );

      if (cancelledJobId === jobId) {
        post({
          schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
          type: "cancelled",
          jobId,
        });
        return;
      }

      const outBuffer = result.output.bytes.buffer.slice(
        result.output.bytes.byteOffset,
        result.output.bytes.byteOffset + result.output.bytes.byteLength,
      ) as ArrayBuffer;

      post(
        {
          schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
          type: "processSuccess",
          jobId,
          fileName: result.input.fileName,
          outputFileName: result.output.fileName,
          format: result.output.format,
          mimeType: result.output.mimeType,
          bytes: outBuffer,
          sha256: result.output.sha256,
          before: {
            vertexCount: result.before.vertexCount,
            triangleCount: result.before.triangleCount,
            dimensionsMm: result.before.dimensionsMm,
            watertight: result.before.watertight,
            bounds: result.before.bounds,
          },
          after: {
            vertexCount: result.after.vertexCount,
            triangleCount: result.after.triangleCount,
            dimensionsMm: result.after.dimensionsMm,
            watertight: result.after.watertight,
            bounds: result.after.bounds,
          },
          optimization: {
            algorithm: result.optimization.algorithm,
            orientationId: result.optimization.orientationId,
            scoreBefore: result.optimization.scoreBefore,
            scoreAfter: result.optimization.scoreAfter,
            alreadyOptimal: result.optimization.alreadyOptimal,
          },
          preservation: {
            preserved: [...result.preservation.preserved],
            removed: [...result.preservation.removed],
            policy: result.preservation.policy,
            notes: [...result.preservation.notes],
          },
          warnings: result.warnings.map((w) => ({ code: w.code, message: w.message })),
          durationMs: result.durationMs,
          preview: {
            positions: result.preview.positions,
            indices: result.preview.indices,
          },
        },
        [outBuffer, result.preview.positions.buffer, result.preview.indices.buffer],
      );
    } catch (err) {
      if (cancelledJobId === jobId) {
        post({
          schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
          type: "cancelled",
          jobId,
        });
        return;
      }
      const code =
        err instanceof EngineException
          ? err.engineError.code
          : err instanceof Error && /CANCELLED/.test(err.message)
            ? "CANCELLED"
            : "UNKNOWN";
      const message =
        err instanceof EngineException
          ? err.message
          : err instanceof Error
            ? err.message
            : String(err);
      if (code === "RUN_CANCELLED" || code === "CANCELLED") {
        post({
          schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
          type: "cancelled",
          jobId,
        });
        return;
      }
      post({
        schemaVersion: GEOMETRY_WORKER_PROTOCOL_VERSION,
        type: "processFailure",
        jobId,
        code,
        message,
        stage: "processing",
        retryable: err instanceof EngineException ? Boolean(err.engineError.retryable) : false,
      });
    } finally {
      if (activeJobId === jobId) {
        activeJobId = null;
      }
    }
  })();
};
