import { createEngineError, EngineException } from "@fix-my-print/contracts";

import type { FormatBudgets } from "./types";

export function assertByteBudget(
  byteLength: number,
  budgets: FormatBudgets,
  label: string,
): void {
  if (byteLength > budgets.maxBytes) {
    throw new EngineException(
      createEngineError("INPUT_TOO_LARGE", `${label} exceeds maxBytes budget`, {
        context: { byteLength, maxBytes: budgets.maxBytes },
      }),
    );
  }
}

export function assertFaceBudget(faceCount: number, budgets: FormatBudgets): void {
  if (faceCount > budgets.maxFaces) {
    throw new EngineException(
      createEngineError("GEOMETRY_BUDGET_EXCEEDED", "too many faces", {
        context: { faceCount, maxFaces: budgets.maxFaces },
      }),
    );
  }
}

export function assertVertexBudget(vertexCount: number, budgets: FormatBudgets): void {
  if (vertexCount > budgets.maxVertices) {
    throw new EngineException(
      createEngineError("GEOMETRY_BUDGET_EXCEEDED", "too many vertices", {
        context: { vertexCount, maxVertices: budgets.maxVertices },
      }),
    );
  }
}

export function meshFailed(message: string): never {
  throw new EngineException(
    createEngineError("MESH_PARSE_FAILED", message, { retryable: false }),
  );
}
