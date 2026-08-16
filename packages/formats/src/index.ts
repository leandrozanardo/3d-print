import {
  createEngineError,
  EngineException,
} from "@fix-my-print/contracts";

import { detectFormat } from "./detect";
import { parseAsciiStl, parseBinaryStl } from "./stl";
import type { FormatBudgets, RawMesh } from "./types";
import { DEFAULT_FORMAT_BUDGETS } from "./types";

export type { RawMesh, FormatBudgets, DetectedFormat } from "./types";
export { DEFAULT_FORMAT_BUDGETS } from "./types";
export { detectFormat } from "./detect";
export { parseAsciiStl, parseBinaryStl } from "./stl";

export function parseMesh(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): { format: "stl-ascii" | "stl-binary"; mesh: RawMesh } {
  if (buffer.byteLength === 0) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "empty buffer", {
        retryable: false,
      }),
    );
  }
  const format = detectFormat(buffer);
  if (format === "stl-binary") {
    return { format, mesh: parseBinaryStl(buffer, budgets) };
  }
  if (format === "stl-ascii") {
    return { format, mesh: parseAsciiStl(buffer, budgets) };
  }
  throw new EngineException(
    createEngineError("FORMAT_UNSUPPORTED", "unsupported or unknown format", {
      retryable: false,
    }),
  );
}
