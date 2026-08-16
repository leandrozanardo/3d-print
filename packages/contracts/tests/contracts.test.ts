import {
  EngineErrorSchema,
  RunManifestSchema,
  WorkerRequestSchema,
  WorkerEventSchema,
  canonicalJson,
  createEngineError,
  parseWithSchemaVersion,
} from "../src/index";

describe("@fix-my-print/contracts", () => {
  it("round-trips EngineError through schema", () => {
    const err = createEngineError("MESH_PARSE_FAILED", "bad mesh", {
      severity: "error",
      retryable: false,
      context: { bytes: 12 },
    });
    const parsed = EngineErrorSchema.parse(JSON.parse(JSON.stringify(err)));
    expect(parsed).toEqual(err);
    expect(canonicalJson(parsed)).toBe(canonicalJson(err));
  });

  it("round-trips RunManifest v1", () => {
    const manifest = {
      schemaVersion: 1 as const,
      runId: "run-1",
      createdAt: "2026-08-16T00:00:00.000Z",
      state: "Draft" as const,
      inputSha256: null,
      knowledgePackHash: null,
      engineVersion: "0.0.0",
      transitions: [],
    };
    const parsed = RunManifestSchema.parse(manifest);
    expect(parsed.runId).toBe("run-1");
  });

  it("fail-closed on unknown schemaVersion", () => {
    expect(() =>
      parseWithSchemaVersion(WorkerRequestSchema, {
        schemaVersion: 99,
        type: "cancel",
        runId: "x",
      }),
    ).toThrow("SCHEMA_UNSUPPORTED");
  });

  it("rejects NaN in canonicalJson", () => {
    expect(() => canonicalJson({ a: Number.NaN })).toThrow(/NaN|Infinity/);
    expect(() => canonicalJson({ a: Number.POSITIVE_INFINITY })).toThrow(/NaN|Infinity/);
  });

  it("sorts object keys in canonicalJson", () => {
    expect(canonicalJson({ b: 1, a: 2 })).toBe('{"a":2,"b":1}');
  });

  it("validates WorkerRequest and WorkerEvent shapes", () => {
    const req = WorkerRequestSchema.parse({
      schemaVersion: 1,
      type: "initialize",
      runId: "r1",
      budgets: { maxBytes: 1, maxFaces: 1, maxVertices: 1, maxMs: 1 },
    });
    expect(req.type).toBe("initialize");
    const ev = WorkerEventSchema.parse({
      schemaVersion: 1,
      type: "ready",
      runId: "r1",
      capabilities: { inspect: true, apply: false, multithreaded: false },
    });
    expect(ev.type).toBe("ready");
  });
});
