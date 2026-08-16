import type { RawMesh } from "@fix-my-print/formats";

/**
 * Purely geometric orientation metrics. These are engineering proxies computed
 * from the mesh itself — they are NOT slicer measurements (no layer height, no
 * extrusion model, no support generation).
 */
export interface OrientationMetrics {
  size: [number, number, number];
  minZ: number;
  height: number;
  /** Bounding-box XY area (footprint proxy). */
  footprintArea: number;
  totalArea: number;
  /** Triangle area resting on the lowest Z plane (bed contact proxy). */
  contactArea: number;
  contactFraction: number;
  /** Downward-facing area above the bed steeper than the overhang threshold. */
  overhangArea: number;
  overhangFraction: number;
}

/** cos(45°): faces whose normal points further down than this need support. */
const OVERHANG_NORMAL_Z_THRESHOLD = -Math.SQRT1_2;

const EMPTY_METRICS: OrientationMetrics = {
  size: [0, 0, 0],
  minZ: 0,
  height: 0,
  footprintArea: 0,
  totalArea: 0,
  contactArea: 0,
  contactFraction: 0,
  overhangArea: 0,
  overhangFraction: 0,
};

function contactEpsilon(height: number): number {
  return Math.max(1e-6, height * 1e-4);
}

export function computeOrientationMetrics(mesh: RawMesh): OrientationMetrics {
  const vertices = mesh.vertices;
  if (vertices.length < 3 || mesh.faces.length === 0) {
    return { ...EMPTY_METRICS, size: [0, 0, 0] };
  }

  let minX = Infinity,
    minY = Infinity,
    minZ = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity,
    maxZ = -Infinity;
  for (let i = 0; i + 2 < vertices.length; i += 3) {
    const x = vertices[i]!;
    const y = vertices[i + 1]!;
    const z = vertices[i + 2]!;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (z > maxZ) maxZ = z;
  }
  if (!Number.isFinite(minX) || !Number.isFinite(maxZ)) {
    return { ...EMPTY_METRICS };
  }

  const size: [number, number, number] = [maxX - minX, maxY - minY, maxZ - minZ];
  const height = size[2];
  const epsilon = contactEpsilon(height);

  let totalArea = 0;
  let contactArea = 0;
  let overhangArea = 0;

  for (const face of mesh.faces) {
    if (face.length < 3) {
      continue;
    }
    const ia = face[0]! * 3;
    const ib = face[1]! * 3;
    const ic = face[2]! * 3;
    if (
      ia < 0 ||
      ib < 0 ||
      ic < 0 ||
      ia + 2 >= vertices.length ||
      ib + 2 >= vertices.length ||
      ic + 2 >= vertices.length
    ) {
      continue;
    }
    const ax = vertices[ia]!,
      ay = vertices[ia + 1]!,
      az = vertices[ia + 2]!;
    const bx = vertices[ib]!,
      by = vertices[ib + 1]!,
      bz = vertices[ib + 2]!;
    const cx = vertices[ic]!,
      cy = vertices[ic + 1]!,
      cz = vertices[ic + 2]!;

    const ux = bx - ax,
      uy = by - ay,
      uz = bz - az;
    const vx = cx - ax,
      vy = cy - ay,
      vz = cz - az;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    const crossLength = Math.hypot(nx, ny, nz);
    if (!Number.isFinite(crossLength) || crossLength === 0) {
      continue;
    }
    const area = crossLength / 2;
    totalArea += area;

    const onBed =
      az - minZ <= epsilon && bz - minZ <= epsilon && cz - minZ <= epsilon;
    if (onBed) {
      contactArea += area;
      continue;
    }
    if (nz / crossLength < OVERHANG_NORMAL_Z_THRESHOLD) {
      overhangArea += area;
    }
  }

  return {
    size,
    minZ,
    height,
    footprintArea: size[0] * size[1],
    totalArea,
    contactArea,
    contactFraction: totalArea > 0 ? contactArea / totalArea : 0,
    overhangArea,
    overhangFraction: totalArea > 0 ? overhangArea / totalArea : 0,
  };
}
