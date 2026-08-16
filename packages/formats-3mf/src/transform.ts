/**
 * 3MF Core transform attribute (12 numbers) ↔ internal row-major 4x4.
 *
 * Spec application (column vector form after remapping translation into m03/m13/m23):
 *   x' = m00*x + m01*y + m02*z + tx
 * where the attribute lists: m00 m01 m02 m10 m11 m12 m20 m21 m22 tx ty tz
 */

import {
  applyMatrix4,
  IDENTITY_MATRIX4,
  multiplyMatrix4,
  toMatrix4,
  type Matrix4,
} from "@fix-my-print/geometry";

export function parseTransformAttribute(raw: string | undefined): number[] {
  if (raw === undefined || raw.trim() === "") {
    return [...IDENTITY_MATRIX4];
  }
  const parts = raw.trim().split(/\s+/).map(Number);
  if (parts.length !== 12 || parts.some((n) => !Number.isFinite(n))) {
    throw new Error(`INVALID_TRANSFORM: expected 12 finite numbers, got "${raw}"`);
  }
  // Remap 3MF (… tx ty tz) into row-major 4x4 with translation in column 3.
  const [
    m00,
    m01,
    m02,
    m10,
    m11,
    m12,
    m20,
    m21,
    m22,
    tx,
    ty,
    tz,
  ] = parts as [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  return toMatrix4([m00, m01, m02, tx, m10, m11, m12, ty, m20, m21, m22, tz]);
}

export function composeTransforms(parent: Matrix4, child: Matrix4): number[] {
  // Parent applied after child: p' = parent * child * p
  return multiplyMatrix4(parent, child);
}

export function transformPoint(
  matrix: Matrix4,
  x: number,
  y: number,
  z: number,
): [number, number, number] {
  return applyMatrix4(matrix, x, y, z);
}

export { IDENTITY_MATRIX4 };
