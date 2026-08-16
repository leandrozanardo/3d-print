import type { FormatBudgets, RawMesh } from "./types";
import { DEFAULT_FORMAT_BUDGETS } from "./types";
import { assertFiniteTriple } from "./coords";
import {
  assertByteBudget,
  assertFaceBudget,
  assertVertexBudget,
  meshFailed,
} from "./budgets";

interface PlyProperty {
  name: string;
  type: string;
  listCountType?: string;
  listValueType?: string;
}

interface PlyElement {
  name: string;
  count: number;
  properties: PlyProperty[];
}

interface PlyHeader {
  format: "ascii" | "binary_little_endian" | "binary_big_endian";
  elements: PlyElement[];
  headerByteLength: number;
}

const SCALAR_TYPES = new Set([
  "char",
  "uchar",
  "short",
  "ushort",
  "int",
  "uint",
  "float",
  "double",
  "int8",
  "uint8",
  "int16",
  "uint16",
  "int32",
  "uint32",
  "float32",
  "float64",
]);

function scalarSize(type: string): number {
  switch (type) {
    case "char":
    case "uchar":
    case "int8":
    case "uint8":
      return 1;
    case "short":
    case "ushort":
    case "int16":
    case "uint16":
      return 2;
    case "int":
    case "uint":
    case "float":
    case "int32":
    case "uint32":
    case "float32":
      return 4;
    case "double":
    case "float64":
      return 8;
    default:
      meshFailed(`unsupported PLY type: ${type}`);
  }
}

function readScalar(
  view: DataView,
  offset: number,
  type: string,
  littleEndian: boolean,
): { value: number; size: number } {
  const size = scalarSize(type);
  switch (type) {
    case "char":
    case "int8":
      return { value: view.getInt8(offset), size };
    case "uchar":
    case "uint8":
      return { value: view.getUint8(offset), size };
    case "short":
    case "int16":
      return { value: view.getInt16(offset, littleEndian), size };
    case "ushort":
    case "uint16":
      return { value: view.getUint16(offset, littleEndian), size };
    case "int":
    case "int32":
      return { value: view.getInt32(offset, littleEndian), size };
    case "uint":
    case "uint32":
      return { value: view.getUint32(offset, littleEndian), size };
    case "float":
    case "float32":
      return { value: view.getFloat32(offset, littleEndian), size };
    case "double":
    case "float64":
      return { value: view.getFloat64(offset, littleEndian), size };
    default:
      meshFailed(`unsupported PLY type: ${type}`);
  }
}

function parseHeader(buffer: Uint8Array): PlyHeader {
  const text = Buffer.from(buffer).toString("latin1");
  const endMatch = /end_header(?:\r\n|\n|\r)/i.exec(text);
  if (!endMatch || endMatch.index === undefined) {
    meshFailed("PLY missing end_header");
  }
  const headerText = text.slice(0, endMatch.index + endMatch[0].length);
  const headerByteLength = Buffer.byteLength(headerText, "latin1");

  const lines = headerText.split(/\r?\n/);
  if (!/^ply\s*$/i.test(lines[0]?.trim() ?? "")) {
    meshFailed("PLY missing ply magic");
  }

  let format: PlyHeader["format"] | null = null;
  const elements: PlyElement[] = [];
  let current: PlyElement | null = null;

  for (let i = 1; i < lines.length; i++) {
    const line = (lines[i] ?? "").trim();
    if (line.length === 0 || line.startsWith("comment") || line.startsWith("obj_info")) {
      continue;
    }
    if (/^end_header$/i.test(line)) {
      break;
    }
    const parts = line.split(/\s+/);
    const keyword = parts[0]?.toLowerCase();
    if (keyword === "format") {
      const fmt = (parts[1] ?? "").toLowerCase();
      if (
        fmt !== "ascii" &&
        fmt !== "binary_little_endian" &&
        fmt !== "binary_big_endian"
      ) {
        meshFailed(`unsupported PLY format: ${parts[1] ?? ""}`);
      }
      format = fmt;
      continue;
    }
    if (keyword === "element") {
      const name = parts[1] ?? "";
      const count = Number(parts[2]);
      if (!name || !Number.isInteger(count) || count < 0) {
        meshFailed(`malformed PLY element: ${line}`);
      }
      current = { name, count, properties: [] };
      elements.push(current);
      continue;
    }
    if (keyword === "property") {
      if (!current) {
        meshFailed("PLY property before element");
      }
      if ((parts[1] ?? "").toLowerCase() === "list") {
        const countType = (parts[2] ?? "").toLowerCase();
        const valueType = (parts[3] ?? "").toLowerCase();
        const name = parts[4] ?? "";
        if (!SCALAR_TYPES.has(countType) || !SCALAR_TYPES.has(valueType) || !name) {
          meshFailed(`malformed PLY list property: ${line}`);
        }
        current.properties.push({
          name,
          type: "list",
          listCountType: countType,
          listValueType: valueType,
        });
      } else {
        const type = (parts[1] ?? "").toLowerCase();
        const name = parts[2] ?? "";
        if (!SCALAR_TYPES.has(type) || !name) {
          meshFailed(`malformed PLY property: ${line}`);
        }
        current.properties.push({ name, type });
      }
      continue;
    }
  }

  if (!format) {
    meshFailed("PLY missing format line");
  }
  return { format, elements, headerByteLength };
}

function findElement(elements: PlyElement[], name: string): PlyElement {
  const el = elements.find((e) => e.name === name);
  if (!el) {
    meshFailed(`PLY missing element: ${name}`);
  }
  return el;
}

function propIndex(el: PlyElement, name: string): number {
  const idx = el.properties.findIndex((p) => p.name === name);
  if (idx < 0) {
    meshFailed(`PLY missing property ${name} on ${el.name}`);
  }
  return idx;
}

function triangulateFace(
  indices: number[],
  vertexCount: number,
  faces: number[][],
  budgets: FormatBudgets,
): void {
  if (indices.length < 3) {
    meshFailed("PLY face needs ≥3 indices");
  }
  for (const idx of indices) {
    if (!Number.isInteger(idx) || idx < 0 || idx >= vertexCount) {
      meshFailed(`PLY face index out of range: ${idx}`);
    }
  }
  for (let i = 1; i < indices.length - 1; i++) {
    faces.push([indices[0]!, indices[i]!, indices[i + 1]!]);
    assertFaceBudget(faces.length, budgets);
  }
}

function parseAsciiBody(
  body: string,
  header: PlyHeader,
  budgets: FormatBudgets,
): RawMesh {
  const vertexEl = findElement(header.elements, "vertex");
  const faceEl = findElement(header.elements, "face");
  assertVertexBudget(vertexEl.count, budgets);
  // Face budget checked as triangles are emitted.

  const xIdx = propIndex(vertexEl, "x");
  const yIdx = propIndex(vertexEl, "y");
  const zIdx = propIndex(vertexEl, "z");
  const listProp = faceEl.properties.find((p) => p.type === "list");
  if (!listProp) {
    meshFailed("PLY face element missing list property");
  }

  const tokens = body.trim().length === 0 ? [] : body.trim().split(/\s+/);
  let cursor = 0;
  const take = (): string => {
    if (cursor >= tokens.length) {
      meshFailed("PLY ASCII truncated");
    }
    return tokens[cursor++]!;
  };

  // Skip elements before vertex in declaration order.
  for (const el of header.elements) {
    if (el.name === "vertex") {
      break;
    }
    for (let i = 0; i < el.count; i++) {
      for (const prop of el.properties) {
        if (prop.type === "list") {
          const n = Number(take());
          if (!Number.isInteger(n) || n < 0) {
            meshFailed("PLY invalid list count");
          }
          for (let k = 0; k < n; k++) {
            take();
          }
        } else {
          take();
        }
      }
    }
  }

  const positions: number[] = [];
  for (let i = 0; i < vertexEl.count; i++) {
    const values: number[] = [];
    for (const prop of vertexEl.properties) {
      if (prop.type === "list") {
        meshFailed("PLY vertex list properties unsupported");
      }
      values.push(Number(take()));
    }
    const [x, y, z] = assertFiniteTriple(
      values[xIdx]!,
      values[yIdx]!,
      values[zIdx]!,
      `vertex[${i}]`,
    );
    positions.push(x, y, z);
  }

  // Skip elements between vertex and face.
  let seenVertex = false;
  for (const el of header.elements) {
    if (el.name === "vertex") {
      seenVertex = true;
      continue;
    }
    if (!seenVertex) {
      continue;
    }
    if (el.name === "face") {
      break;
    }
    for (let i = 0; i < el.count; i++) {
      for (const prop of el.properties) {
        if (prop.type === "list") {
          const n = Number(take());
          for (let k = 0; k < n; k++) {
            take();
          }
        } else {
          take();
        }
      }
    }
  }

  const faces: number[][] = [];
  const vertexCount = positions.length / 3;
  for (let i = 0; i < faceEl.count; i++) {
    for (const prop of faceEl.properties) {
      if (prop.type === "list") {
        const n = Number(take());
        if (!Number.isInteger(n) || n < 0) {
          meshFailed("PLY invalid face list count");
        }
        const indices: number[] = [];
        for (let k = 0; k < n; k++) {
          indices.push(Number(take()));
        }
        if (prop === listProp) {
          triangulateFace(indices, vertexCount, faces, budgets);
        }
      } else {
        take();
      }
    }
  }

  if (faces.length === 0) {
    meshFailed("PLY has no faces");
  }

  return { vertices: Float64Array.from(positions), faces };
}

function parseBinaryBody(
  buffer: Uint8Array,
  header: PlyHeader,
  budgets: FormatBudgets,
): RawMesh {
  if (header.format === "binary_big_endian") {
    meshFailed("PLY binary_big_endian is not supported");
  }
  const littleEndian = true;
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  let offset = header.headerByteLength;

  const vertexEl = findElement(header.elements, "vertex");
  const faceEl = findElement(header.elements, "face");
  assertVertexBudget(vertexEl.count, budgets);

  const xIdx = propIndex(vertexEl, "x");
  const yIdx = propIndex(vertexEl, "y");
  const zIdx = propIndex(vertexEl, "z");
  const listProp = faceEl.properties.find((p) => p.type === "list");
  if (!listProp?.listCountType || !listProp.listValueType) {
    meshFailed("PLY face element missing list property");
  }

  const readOne = (type: string): number => {
    if (offset + scalarSize(type) > buffer.byteLength) {
      meshFailed("PLY binary truncated");
    }
    const { value, size } = readScalar(view, offset, type, littleEndian);
    offset += size;
    return value;
  };

  // Skip elements before vertex.
  for (const el of header.elements) {
    if (el.name === "vertex") {
      break;
    }
    for (let i = 0; i < el.count; i++) {
      for (const prop of el.properties) {
        if (prop.type === "list") {
          const n = readOne(prop.listCountType!);
          for (let k = 0; k < n; k++) {
            readOne(prop.listValueType!);
          }
        } else {
          readOne(prop.type);
        }
      }
    }
  }

  const positions: number[] = [];
  for (let i = 0; i < vertexEl.count; i++) {
    const values: number[] = [];
    for (const prop of vertexEl.properties) {
      if (prop.type === "list") {
        meshFailed("PLY vertex list properties unsupported");
      }
      values.push(readOne(prop.type));
    }
    const [x, y, z] = assertFiniteTriple(
      values[xIdx]!,
      values[yIdx]!,
      values[zIdx]!,
      `vertex[${i}]`,
    );
    positions.push(x, y, z);
  }

  let seenVertex = false;
  for (const el of header.elements) {
    if (el.name === "vertex") {
      seenVertex = true;
      continue;
    }
    if (!seenVertex) {
      continue;
    }
    if (el.name === "face") {
      break;
    }
    for (let i = 0; i < el.count; i++) {
      for (const prop of el.properties) {
        if (prop.type === "list") {
          const n = readOne(prop.listCountType!);
          for (let k = 0; k < n; k++) {
            readOne(prop.listValueType!);
          }
        } else {
          readOne(prop.type);
        }
      }
    }
  }

  const faces: number[][] = [];
  const vertexCount = positions.length / 3;
  for (let i = 0; i < faceEl.count; i++) {
    for (const prop of faceEl.properties) {
      if (prop.type === "list") {
        const n = readOne(prop.listCountType!);
        if (!Number.isInteger(n) || n < 0) {
          meshFailed("PLY invalid face list count");
        }
        const indices: number[] = [];
        for (let k = 0; k < n; k++) {
          indices.push(readOne(prop.listValueType!));
        }
        if (prop === listProp) {
          triangulateFace(indices, vertexCount, faces, budgets);
        }
      } else {
        readOne(prop.type);
      }
    }
  }

  if (faces.length === 0) {
    meshFailed("PLY has no faces");
  }

  return { vertices: Float64Array.from(positions), faces };
}

export function parsePly(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): RawMesh {
  assertByteBudget(buffer.byteLength, budgets, "PLY");
  if (buffer.byteLength === 0) {
    meshFailed("empty PLY");
  }
  const header = parseHeader(buffer);
  if (header.format === "ascii") {
    const body = Buffer.from(buffer.subarray(header.headerByteLength)).toString("utf8");
    return parseAsciiBody(body, header, budgets);
  }
  return parseBinaryBody(buffer, header, budgets);
}

export function parseAsciiPly(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): RawMesh {
  const header = parseHeader(buffer);
  if (header.format !== "ascii") {
    meshFailed("expected PLY ascii format");
  }
  return parsePly(buffer, budgets);
}

export function parseBinaryPly(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): RawMesh {
  const header = parseHeader(buffer);
  if (header.format === "ascii") {
    meshFailed("expected PLY binary format");
  }
  return parsePly(buffer, budgets);
}
