import { createEngineError, EngineException } from "@fix-my-print/contracts";

import { detectFormat } from "./detect";
import { parseObj } from "./obj";
import { parsePly } from "./ply";
import { parseAsciiStl, parseBinaryStl } from "./stl";
import type { FormatBudgets, ParsedMesh } from "./types";
import { DEFAULT_FORMAT_BUDGETS } from "./types";

export type {
  RawMesh,
  FormatBudgets,
  DetectedFormat,
  ParsedMeshFormat,
  ParsedMesh,
} from "./types";
export { DEFAULT_FORMAT_BUDGETS } from "./types";
export { detectFormat } from "./detect";
export { parseAsciiStl, parseBinaryStl } from "./stl";
export { parseObj } from "./obj";
export { parsePly, parseAsciiPly, parseBinaryPly } from "./ply";
export { assertFiniteCoord, assertFiniteTriple } from "./coords";

export function parseMesh(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): ParsedMesh {
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
  if (format === "obj") {
    return { format, mesh: parseObj(buffer, budgets) };
  }
  if (format === "ply-ascii" || format === "ply-binary") {
    return { format, mesh: parsePly(buffer, budgets) };
  }
  throw new EngineException(
    createEngineError("FORMAT_UNSUPPORTED", "unsupported or unknown format", {
      retryable: false,
    }),
  );
}
