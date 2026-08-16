/**
 * Row-major 4x4 affine matrices using the column-vector convention: p' = M * p.
 *
 * Only affine matrices are supported (last row must be [0, 0, 0, 1]); perspective
 * projections are meaningless for solid geometry and are rejected explicitly.
 */

export type Matrix4 = readonly number[];

export const IDENTITY_MATRIX4: Matrix4 = Object.freeze([
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
]);

const AFFINE_ROW_EPSILON = 1e-9;

function assertFiniteValues(values: readonly number[]): void {
  for (let i = 0; i < values.length; i++) {
    if (!Number.isFinite(values[i])) {
      throw new Error(`MATRIX_NOT_FINITE: value at index ${i} is not finite`);
    }
  }
}

/** Normalize a 12 (3x4) or 16 (4x4) row-major value list into a 4x4 affine matrix. */
export function toMatrix4(values: readonly number[]): number[] {
  if (values.length !== 12 && values.length !== 16) {
    throw new Error(
      `MATRIX_INVALID_LENGTH: expected 12 or 16 values, received ${values.length}`,
    );
  }
  assertFiniteValues(values);
  if (values.length === 12) {
    return [...values, 0, 0, 0, 1];
  }
  const expectedLastRow = [0, 0, 0, 1];
  for (let i = 0; i < 4; i++) {
    if (Math.abs(values[12 + i]! - expectedLastRow[i]!) > AFFINE_ROW_EPSILON) {
      throw new Error("MATRIX_NOT_AFFINE: last row must be [0, 0, 0, 1]");
    }
  }
  return [...values];
}

export function multiplyMatrix4(a: Matrix4, b: Matrix4): number[] {
  const left = toMatrix4(a);
  const right = toMatrix4(b);
  const out = new Array<number>(16).fill(0);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum += left[row * 4 + k]! * right[k * 4 + col]!;
      }
      out[row * 4 + col] = sum;
    }
  }
  return out;
}

/** Determinant of the upper-left 3x3 linear block (sign tells reflection vs rotation). */
export function linearDeterminant(m: Matrix4): number {
  const v = toMatrix4(m);
  const a = v[0]!,
    b = v[1]!,
    c = v[2]!;
  const d = v[4]!,
    e = v[5]!,
    f = v[6]!;
  const g = v[8]!,
    h = v[9]!,
    i = v[10]!;
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

/** True when the linear block satisfies R * Rᵀ = I (no scale, no shear). */
export function isOrthogonalLinear(m: Matrix4, epsilon = 1e-9): boolean {
  const v = toMatrix4(m);
  const r = [
    [v[0]!, v[1]!, v[2]!],
    [v[4]!, v[5]!, v[6]!],
    [v[8]!, v[9]!, v[10]!],
  ] as const;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let dot = 0;
      for (let k = 0; k < 3; k++) {
        dot += r[i]![k]! * r[j]![k]!;
      }
      const expected = i === j ? 1 : 0;
      if (Math.abs(dot - expected) > epsilon) {
        return false;
      }
    }
  }
  return true;
}

/** Proper rotation by `turns` quarter-turns around a principal axis (right-handed). */
export function rotation90Matrix(axis: "x" | "y" | "z", turns: number): number[] {
  const t = ((Math.trunc(turns) % 4) + 4) % 4;
  const cos = [1, 0, -1, 0][t]!;
  const sin = [0, 1, 0, -1][t]!;
  if (axis === "x") {
    return [1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1];
  }
  if (axis === "y") {
    return [cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1];
  }
  return [cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

export function translationMatrix(dx: number, dy: number, dz: number): number[] {
  assertFiniteValues([dx, dy, dz]);
  return [1, 0, 0, dx, 0, 1, 0, dy, 0, 0, 1, dz, 0, 0, 0, 1];
}

export function applyMatrix4(
  m: Matrix4,
  x: number,
  y: number,
  z: number,
): [number, number, number] {
  return [
    m[0]! * x + m[1]! * y + m[2]! * z + m[3]!,
    m[4]! * x + m[5]! * y + m[6]! * z + m[7]!,
    m[8]! * x + m[9]! * y + m[10]! * z + m[11]!,
  ];
}

/** Round values that are within `epsilon` of an integer, keeping exact 0/±1 entries. */
export function snapMatrix4(m: Matrix4, epsilon = 1e-12): number[] {
  return toMatrix4(m).map((value) => {
    const rounded = Math.round(value);
    return Math.abs(value - rounded) <= epsilon ? rounded : value;
  });
}
