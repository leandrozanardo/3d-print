import type { FormatBudgets, RawMesh } from "./types";
import { DEFAULT_FORMAT_BUDGETS } from "./types";
import { assertFiniteTriple } from "./coords";
import {
  assertByteBudget,
  assertFaceBudget,
  assertVertexBudget,
  meshFailed,
} from "./budgets";

function resolveIndex(raw: number, count: number, kind: string): number {
  if (!Number.isInteger(raw) || raw === 0) {
    meshFailed(`invalid ${kind} index: ${raw}`);
  }
  const resolved = raw < 0 ? count + raw : raw - 1;
  if (resolved < 0 || resolved >= count) {
    meshFailed(`out-of-range ${kind} index: ${raw}`);
  }
  return resolved;
}

function parseFaceCorner(token: string): number {
  // Formats: v | v/vt | v//vn | v/vt/vn — only position index is required.
  const slash = token.indexOf("/");
  const rawText = slash === -1 ? token : token.slice(0, slash);
  const raw = Number(rawText);
  if (!Number.isFinite(raw)) {
    meshFailed(`malformed face corner: ${token}`);
  }
  return raw;
}

/**
 * Parse Wavefront OBJ into a triangulated RawMesh.
 * Supports negative vertex indices; rejects invalid references.
 */
export function parseObj(
  buffer: Uint8Array,
  budgets: FormatBudgets = DEFAULT_FORMAT_BUDGETS,
): RawMesh {
  assertByteBudget(buffer.byteLength, budgets, "OBJ");
  if (buffer.byteLength === 0) {
    meshFailed("empty OBJ");
  }

  const text = Buffer.from(buffer).toString("utf8");
  const positions: number[] = [];
  const faces: number[][] = [];

  const lines = text.split(/\r?\n/);
  for (let lineNo = 0; lineNo < lines.length; lineNo++) {
    const rawLine = lines[lineNo]!;
    const hash = rawLine.indexOf("#");
    const line = (hash === -1 ? rawLine : rawLine.slice(0, hash)).trim();
    if (line.length === 0) {
      continue;
    }

    if (line.startsWith("v ") || line === "v") {
      const parts = line.split(/\s+/);
      if (parts.length < 4) {
        meshFailed(`OBJ vertex needs 3 coordinates at line ${lineNo + 1}`);
      }
      const x = Number(parts[1]);
      const y = Number(parts[2]);
      const z = Number(parts[3]);
      const [fx, fy, fz] = assertFiniteTriple(x, y, z, `v@${lineNo + 1}`);
      positions.push(fx, fy, fz);
      assertVertexBudget(positions.length / 3, budgets);
      continue;
    }

    if (line.startsWith("f ") || line === "f") {
      const parts = line
        .split(/\s+/)
        .slice(1)
        .filter((p) => p.length > 0);
      if (parts.length < 3) {
        meshFailed(`OBJ face needs ≥3 corners at line ${lineNo + 1}`);
      }
      const vertexCount = positions.length / 3;
      const indices = parts.map((token) =>
        resolveIndex(parseFaceCorner(token), vertexCount, "vertex"),
      );
      // Fan triangulation for n-gons → triangles for RawMesh faces.
      for (let i = 1; i < indices.length - 1; i++) {
        faces.push([indices[0]!, indices[i]!, indices[i + 1]!]);
        assertFaceBudget(faces.length, budgets);
      }
    }
  }

  if (positions.length === 0) {
    meshFailed("OBJ has no vertices");
  }
  if (faces.length === 0) {
    meshFailed("OBJ has no faces");
  }

  return {
    vertices: Float64Array.from(positions),
    faces,
  };
}
