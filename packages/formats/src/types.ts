/** Shared raw mesh representation (no normalization). */

export interface RawMesh {
  /** Flat triples: [x0,y0,z0, x1,y1,z1, ...] */
  vertices: Float64Array;
  /** Each face is three vertex indices into the vertex stream. */
  faces: number[][];
}

export interface FormatBudgets {
  maxBytes: number;
  maxFaces: number;
  maxVertices: number;
}

export const DEFAULT_FORMAT_BUDGETS: FormatBudgets = {
  maxBytes: 50 * 1024 * 1024,
  maxFaces: 5_000_000,
  maxVertices: 5_000_000,
};

export type DetectedFormat = "stl-ascii" | "stl-binary" | "unknown";
