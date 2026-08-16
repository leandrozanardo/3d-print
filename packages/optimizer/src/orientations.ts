import {
  isOrthogonalLinear,
  linearDeterminant,
  multiplyMatrix4,
  rotation90Matrix,
  snapMatrix4,
} from "@fix-my-print/geometry";

/** Object axis that ends up pointing towards the printer +Z (build direction). */
export type UpAxisLabel = "+x" | "-x" | "+y" | "-y" | "+z" | "-z";

export type YawDegrees = 0 | 90 | 180 | 270;

export interface OrientationSpec {
  /** Stable identifier, e.g. "up+z-yaw0" (identity). */
  id: string;
  up: UpAxisLabel;
  yawDegrees: YawDegrees;
  /** Row-major 4x4 proper rotation (det = +1, orthogonal, no reflection). */
  matrix: readonly number[];
}

interface BaseOrientation {
  up: UpAxisLabel;
  axis: "x" | "y" | "z";
  turns: number;
}

/**
 * Six quarter-turn rotations, one per cube face, each bringing the labelled
 * object axis onto the printer +Z axis. Order is part of the public contract.
 */
const BASE_ORIENTATIONS: readonly BaseOrientation[] = [
  { up: "+z", axis: "z", turns: 0 },
  { up: "-z", axis: "x", turns: 2 },
  { up: "+y", axis: "x", turns: 1 },
  { up: "-y", axis: "x", turns: 3 },
  { up: "+x", axis: "y", turns: 3 },
  { up: "-x", axis: "y", turns: 1 },
];

const YAW_TURNS = [0, 1, 2, 3] as const;

const DETERMINANT_EPSILON = 1e-9;

function buildOrientationSpecs(): readonly OrientationSpec[] {
  const specs: OrientationSpec[] = [];
  for (const base of BASE_ORIENTATIONS) {
    const baseMatrix = rotation90Matrix(base.axis, base.turns);
    for (const yaw of YAW_TURNS) {
      // Yaw is applied in printer space, after the face-up rotation.
      const matrix = snapMatrix4(multiplyMatrix4(rotation90Matrix("z", yaw), baseMatrix));
      if (!isOrthogonalLinear(matrix)) {
        throw new Error(`ORIENTATION_NOT_ORTHOGONAL: up=${base.up} yaw=${yaw}`);
      }
      if (Math.abs(linearDeterminant(matrix) - 1) > DETERMINANT_EPSILON) {
        throw new Error(`ORIENTATION_NOT_PROPER_ROTATION: up=${base.up} yaw=${yaw}`);
      }
      specs.push({
        id: `up${base.up}-yaw${yaw * 90}`,
        up: base.up,
        yawDegrees: (yaw * 90) as YawDegrees,
        matrix: Object.freeze(matrix),
      });
    }
  }
  return Object.freeze(specs);
}

/**
 * The 24 proper rotations of the cube (rotation group of the octahedron).
 * Reflections are excluded on purpose: mirroring a printable solid changes the
 * part, not its orientation.
 */
export const ORIENTATION_SPECS: readonly OrientationSpec[] = buildOrientationSpecs();

export const ORIENTATION_COUNT = ORIENTATION_SPECS.length;

export function findOrientationSpec(id: string): OrientationSpec | undefined {
  return ORIENTATION_SPECS.find((spec) => spec.id === id);
}
