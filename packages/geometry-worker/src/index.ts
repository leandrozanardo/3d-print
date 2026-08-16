import {
  WorkerEventSchema,
  WorkerRequestSchema,
  createEngineError,
  parseWithSchemaVersion,
  type WorkerEvent,
  type WorkerRequest,
} from "@fix-my-print/contracts";

export function validateWorkerRequest(value: unknown): WorkerRequest {
  return parseWithSchemaVersion(WorkerRequestSchema, value);
}

export function validateWorkerEvent(value: unknown): WorkerEvent {
  return parseWithSchemaVersion(WorkerEventSchema, value);
}

export type CancelState = {
  cancelledRunIds: Set<string>;
};

export function createCancelState(): CancelState {
  return { cancelledRunIds: new Set() };
}

/** Record cancel for a run; subsequent work should short-circuit. */
export function requestCancel(state: CancelState, runId: string): WorkerEvent {
  state.cancelledRunIds.add(runId);
  return {
    schemaVersion: 1,
    type: "error",
    runId,
    error: createEngineError("RUN_CANCELLED", "run cancelled", {
      severity: "info",
      retryable: false,
    }),
  };
}

export function isCancelled(state: CancelState, runId: string): boolean {
  return state.cancelledRunIds.has(runId);
}

/**
 * Apply cancel semantics: if run already cancelled, return cancel error event
 * instead of processing the request.
 */
export function applyCancelSemantics(
  state: CancelState,
  request: WorkerRequest,
): WorkerEvent | null {
  if (request.type === "cancel") {
    return requestCancel(state, request.runId);
  }
  if (isCancelled(state, request.runId)) {
    return {
      schemaVersion: 1,
      type: "error",
      runId: request.runId,
      error: createEngineError("RUN_CANCELLED", "run already cancelled", {
        severity: "info",
        retryable: false,
      }),
    };
  }
  return null;
}
