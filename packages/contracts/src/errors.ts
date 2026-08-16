/** Stable engine error catalog (master plan §6.4). */

export const ENGINE_ERROR_CODES = [
  "REPO_BOUNDARY_VIOLATION",
  "ORIGINAL_IMMUTABLE",
  "INPUT_TOO_LARGE",
  "FORMAT_MISMATCH",
  "FORMAT_UNSUPPORTED",
  "ARCHIVE_BOMB_RISK",
  "XML_POLICY_VIOLATION",
  "UNIT_AMBIGUOUS",
  "MESH_PARSE_FAILED",
  "MESH_NON_MANIFOLD",
  "GEOMETRY_BUDGET_EXCEEDED",
  "WORKER_CRASHED",
  "RULE_CONFLICT",
  "CONSTRAINT_FAILED",
  "PARITY_FAILED",
  "KNOWLEDGE_PACK_INVALID",
  "STORAGE_CONFLICT",
  "AUTHORIZATION_DENIED",
  "RUN_CANCELLED",
  "SCHEMA_UNSUPPORTED",
  "INTERNAL_ERROR",
] as const;

export type EngineErrorCode = (typeof ENGINE_ERROR_CODES)[number];

export type EngineErrorSeverity = "info" | "warning" | "error" | "fatal";

export interface EngineError {
  schemaVersion: 1;
  code: EngineErrorCode;
  severity: EngineErrorSeverity;
  message: string;
  retryable: boolean;
  context?: Record<string, string | number | boolean | null>;
}

export function createEngineError(
  code: EngineErrorCode,
  message: string,
  options: {
    severity?: EngineErrorSeverity;
    retryable?: boolean;
    context?: Record<string, string | number | boolean | null>;
  } = {},
): EngineError {
  const err: EngineError = {
    schemaVersion: 1,
    code,
    severity: options.severity ?? "error",
    message,
    retryable: options.retryable ?? false,
  };
  if (options.context !== undefined) {
    err.context = options.context;
  }
  return err;
}

export class EngineException extends Error {
  readonly engineError: EngineError;

  constructor(engineError: EngineError) {
    super(engineError.message);
    this.name = "EngineException";
    this.engineError = engineError;
  }

  get code(): EngineErrorCode {
    return this.engineError.code;
  }
}
