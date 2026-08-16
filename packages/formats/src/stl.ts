import type { FormatBudgets, RawMesh } from "./types";
import { DEFAULT_FORMAT_BUDGETS } from "./types";
import { assertFiniteTriple } from "./coords";
import {
  assertByteBudget,
  assertFaceBudget,
  assertVertexBudget,
  meshFailed,
} from "./budgets";

export function parseBinaryStl(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): RawMesh {
  assertByteBudget(buffer.byteLength, budgets, "STL");
  if (buffer.byteLength < 84) {
    meshFailed("binary STL truncated: header incomplete");
  }
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const triCount = view.getUint32(80, true);
  const expected = 84 + triCount * 50;
  if (buffer.byteLength < expected) {
    meshFailed("binary STL truncated: triangle data incomplete");
  }
  assertFaceBudget(triCount, budgets);

  const vertices = new Float64Array(triCount * 9);
  const faces: number[][] = [];
  let floatOffset = 0;
  let vertexIndex = 0;

  for (let t = 0; t < triCount; t++) {
    const base = 84 + t * 50;
    for (let v = 0; v < 3; v++) {
      const off = base + 12 + v * 12;
      const x = view.getFloat32(off, true);
      const y = view.getFloat32(off + 4, true);
      const z = view.getFloat32(off + 8, true);
      const [fx, fy, fz] = assertFiniteTriple(x, y, z, `stl[${t}].v${v}`);
      vertices[floatOffset++] = fx;
      vertices[floatOffset++] = fy;
      vertices[floatOffset++] = fz;
    }
    faces.push([vertexIndex, vertexIndex + 1, vertexIndex + 2]);
    vertexIndex += 3;
  }

  assertVertexBudget(vertexIndex, budgets);
  return { vertices, faces };
}

export function parseAsciiStl(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): RawMesh {
  assertByteBudget(buffer.byteLength, budgets, "STL");
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
  let vertexOrdinal = 0;
  while ((match = vertexRe.exec(text)) !== null) {
    const [x, y, z] = assertFiniteTriple(
      Number(match[1]),
      Number(match[2]),
      Number(match[3]),
      `asciiVertex[${vertexOrdinal++}]`,
    );
    coords.push(x, y, z);
  }
  if (coords.length === 0) {
    meshFailed("ASCII STL has no vertices");
  }
  if (coords.length % 9 !== 0) {
    meshFailed("ASCII STL vertex count not divisible by 3 (incomplete facet)");
  }

  const triCount = coords.length / 9;
  assertFaceBudget(triCount, budgets);
  assertVertexBudget(coords.length / 3, budgets);

  const vertices = Float64Array.from(coords);
  const faces: number[][] = [];
  for (let t = 0; t < triCount; t++) {
    const i = t * 3;
    faces.push([i, i + 1, i + 2]);
  }
  return { vertices, faces };
}
