import {
  createEngineError,
  EngineException,
} from "@fix-my-print/contracts";

import type { FormatBudgets, RawMesh } from "./types";
import { DEFAULT_FORMAT_BUDGETS } from "./types";

function assertBudgets(byteLength: number, budgets: FormatBudgets): void {
  if (byteLength > budgets.maxBytes) {
    throw new EngineException(
      createEngineError("INPUT_TOO_LARGE", "STL exceeds maxBytes budget", {
        context: { byteLength, maxBytes: budgets.maxBytes },
      }),
    );
  }
}

function meshFailed(message: string): never {
  throw new EngineException(
    createEngineError("MESH_PARSE_FAILED", message, { retryable: false }),
  );
}

export function parseBinaryStl(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): RawMesh {
  assertBudgets(buffer.byteLength, budgets);
  if (buffer.byteLength < 84) {
    meshFailed("binary STL truncated: header incomplete");
  }
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const triCount = view.getUint32(80, true);
  const expected = 84 + triCount * 50;
  if (buffer.byteLength < expected) {
    meshFailed("binary STL truncated: triangle data incomplete");
  }
  if (triCount > budgets.maxFaces) {
    throw new EngineException(
      createEngineError("GEOMETRY_BUDGET_EXCEEDED", "too many faces", {
        context: { triCount, maxFaces: budgets.maxFaces },
      }),
    );
  }

  const vertices = new Float64Array(triCount * 9);
  const faces: number[][] = [];
  let floatOffset = 0;
  let vertexIndex = 0;

  for (let t = 0; t < triCount; t++) {
    const base = 84 + t * 50;
    for (let v = 0; v < 3; v++) {
      const off = base + 12 + v * 12;
      vertices[floatOffset++] = view.getFloat32(off, true);
      vertices[floatOffset++] = view.getFloat32(off + 4, true);
      vertices[floatOffset++] = view.getFloat32(off + 8, true);
    }
    faces.push([vertexIndex, vertexIndex + 1, vertexIndex + 2]);
    vertexIndex += 3;
  }

  if (vertexIndex > budgets.maxVertices) {
    throw new EngineException(
      createEngineError("GEOMETRY_BUDGET_EXCEEDED", "too many vertices", {
        context: { vertexIndex, maxVertices: budgets.maxVertices },
      }),
    );
  }

  return { vertices, faces };
}

export function parseAsciiStl(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): RawMesh {
  assertBudgets(buffer.byteLength, budgets);
  if (buffer.byteLength === 0) {
    meshFailed("empty STL");
  }
  const text = Buffer.from(buffer).toString("utf8");
  if (!/^\s*solid/i.test(text)) {
    meshFailed("ASCII STL missing solid header");
  }

  const vertexRe =
    /vertex\s+([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d)?)\s+([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d)?)\s+([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d)?)/gi;
  const coords: number[] = [];
  let match: RegExpExecArray | null;
  while ((match = vertexRe.exec(text)) !== null) {
    coords.push(Number(match[1]), Number(match[2]), Number(match[3]));
  }
  if (coords.length === 0) {
    meshFailed("ASCII STL has no vertices");
  }
  if (coords.length % 9 !== 0) {
    meshFailed("ASCII STL vertex count not divisible by 3 (incomplete facet)");
  }

  const triCount = coords.length / 9;
  if (triCount > budgets.maxFaces) {
    throw new EngineException(
      createEngineError("GEOMETRY_BUDGET_EXCEEDED", "too many faces", {
        context: { triCount, maxFaces: budgets.maxFaces },
      }),
    );
  }

  const vertices = Float64Array.from(coords);
  const faces: number[][] = [];
  for (let t = 0; t < triCount; t++) {
    const i = t * 3;
    faces.push([i, i + 1, i + 2]);
  }
  return { vertices, faces };
}
