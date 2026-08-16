import {
  applyCancelSemantics,
  createCancelState,
  validateWorkerEvent,
  validateWorkerRequest,
} from "../src/index";

describe("@fix-my-print/geometry-worker", () => {
  it("validates initialize/inspect/cancel requests", () => {
    const init = validateWorkerRequest({
      schemaVersion: 1,
      type: "initialize",
      runId: "r1",
      budgets: { maxBytes: 10, maxFaces: 10, maxVertices: 10, maxMs: 10 },
    });
    expect(init.type).toBe("initialize");
    const cancel = validateWorkerRequest({
      schemaVersion: 1,
      type: "cancel",
      runId: "r1",
    });
    expect(cancel.type).toBe("cancel");
  });

  it("cancel semantics block subsequent requests for same runId", () => {
    const state = createCancelState();
    const cancelEv = applyCancelSemantics(state, {
      schemaVersion: 1,
      type: "cancel",
      runId: "r1",
    });
    expect(cancelEv?.type).toBe("error");
    if (cancelEv?.type === "error") {
      expect(cancelEv.error.code).toBe("RUN_CANCELLED");
    }
    const blocked = applyCancelSemantics(state, {
      schemaVersion: 1,
      type: "inspect",
      runId: "r1",
      context: {},
    });
    expect(blocked?.type).toBe("error");
    const ready = validateWorkerEvent({
      schemaVersion: 1,
      type: "ready",
      runId: "r2",
      capabilities: { inspect: true, apply: false, multithreaded: false },
    });
    expect(ready.type).toBe("ready");
  });
});
