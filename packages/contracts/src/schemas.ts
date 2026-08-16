import { z } from "zod";

import { ENGINE_ERROR_CODES } from "./errors";

export const SchemaVersionSchema = z.literal(1);

export const EngineErrorSchema = z
  .object({
    schemaVersion: SchemaVersionSchema,
    code: z.enum(ENGINE_ERROR_CODES),
    severity: z.enum(["info", "warning", "error", "fatal"]),
    message: z.string().min(1),
    retryable: z.boolean(),
    context: z
      .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
      .optional(),
  })
  .strict();

export const RunManifestSchema = z
  .object({
    schemaVersion: SchemaVersionSchema,
    runId: z.string().min(1),
    createdAt: z.string().min(1),
    state: z.enum([
      "Draft",
      "Validating",
      "Ready",
      "Analyzing",
      "Proposing",
      "Applying",
      "Verifying",
      "Completed",
      "Failed",
      "Cancelled",
    ]),
    inputSha256: z.string().nullable(),
    knowledgePackHash: z.string().nullable(),
    engineVersion: z.string().min(1),
    transitions: z.array(
      z
        .object({
          at: z.string().min(1),
          from: z.string().min(1),
          to: z.string().min(1),
        })
        .strict(),
    ),
  })
  .strict();

export const EngineBudgetsSchema = z
  .object({
    maxBytes: z.number().int().positive(),
    maxFaces: z.number().int().positive(),
    maxVertices: z.number().int().positive(),
    maxMs: z.number().int().positive(),
  })
  .strict();

export const ContextSnapshotSchema = z
  .object({
    printerModel: z.string().optional(),
    material: z.string().optional(),
    nozzleMm: z.number().positive().optional(),
  })
  .strict();

export const WorkerRequestSchema = z.discriminatedUnion("type", [
  z
    .object({
      schemaVersion: SchemaVersionSchema,
      type: z.literal("initialize"),
      runId: z.string().min(1),
      budgets: EngineBudgetsSchema,
    })
    .strict(),
  z
    .object({
      schemaVersion: SchemaVersionSchema,
      type: z.literal("inspect"),
      runId: z.string().min(1),
      fileBase64: z.string().optional(),
      context: ContextSnapshotSchema,
    })
    .strict(),
  z
    .object({
      schemaVersion: SchemaVersionSchema,
      type: z.literal("apply"),
      runId: z.string().min(1),
      candidateId: z.string().min(1),
    })
    .strict(),
  z
    .object({
      schemaVersion: SchemaVersionSchema,
      type: z.literal("cancel"),
      runId: z.string().min(1),
    })
    .strict(),
]);

export const WorkerCapabilitiesSchema = z
  .object({
    inspect: z.boolean(),
    apply: z.boolean(),
    multithreaded: z.boolean(),
  })
  .strict();

export const AnalysisResultSchema = z
  .object({
    schemaVersion: SchemaVersionSchema,
    runId: z.string().min(1),
    format: z.string().min(1),
    vertexCount: z.number().int().nonnegative(),
    faceCount: z.number().int().nonnegative(),
    bounds: z
      .object({
        min: z.tuple([z.number(), z.number(), z.number()]),
        max: z.tuple([z.number(), z.number(), z.number()]),
      })
      .strict(),
  })
  .strict();

export const WorkerEventSchema = z.discriminatedUnion("type", [
  z
    .object({
      schemaVersion: SchemaVersionSchema,
      type: z.literal("ready"),
      runId: z.string().min(1),
      capabilities: WorkerCapabilitiesSchema,
    })
    .strict(),
  z
    .object({
      schemaVersion: SchemaVersionSchema,
      type: z.literal("progress"),
      runId: z.string().min(1),
      stage: z.string().min(1),
      completed: z.number().nonnegative(),
      total: z.number().nonnegative().optional(),
    })
    .strict(),
  z
    .object({
      schemaVersion: SchemaVersionSchema,
      type: z.literal("result"),
      runId: z.string().min(1),
      result: AnalysisResultSchema,
    })
    .strict(),
  z
    .object({
      schemaVersion: SchemaVersionSchema,
      type: z.literal("error"),
      runId: z.string().min(1),
      error: EngineErrorSchema,
    })
    .strict(),
]);

export type RunManifest = z.infer<typeof RunManifestSchema>;
export type WorkerRequest = z.infer<typeof WorkerRequestSchema>;
export type WorkerEvent = z.infer<typeof WorkerEventSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
export type EngineBudgets = z.infer<typeof EngineBudgetsSchema>;

export function parseWithSchemaVersion<T>(schema: z.ZodType<T>, value: unknown): T {
  if (
    typeof value !== "object" ||
    value === null ||
    !("schemaVersion" in value) ||
    (value as { schemaVersion: unknown }).schemaVersion !== 1
  ) {
    throw new Error("SCHEMA_UNSUPPORTED");
  }
  return schema.parse(value);
}
