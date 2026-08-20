import { createEngineError, EngineException } from "@fix-my-print/contracts";
import type { CanonicalMesh } from "@fix-my-print/formats-3mf";
import {
  PureTsGeometryAdapter,
  rotation90Matrix,
  type GeometryPort,
} from "@fix-my-print/geometry";
import { fits } from "@fix-my-print/optimizer";

export type BedVolume = { x: number; y: number; z: number };

export type MeshAabb = {
  min: [number, number, number];
  max: [number, number, number];
  size: [number, number, number];
};

const PACK_GAP_MM = 2;

export function aabbFromPositions(positions: Float64Array): MeshAabb {
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  for (let i = 0; i + 2 < positions.length; i += 3) {
    const x = positions[i]!;
    const y = positions[i + 1]!;
    const z = positions[i + 2]!;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }
  return {
    min: [minX, minY, minZ],
    max: [maxX, maxY, maxZ],
    size: [maxX - minX, maxY - minY, maxZ - minZ],
  };
}

function facesOf(part: CanonicalMesh): number[][] {
  const faces: number[][] = [];
  for (let i = 0; i < part.indices.length; i += 3) {
    faces.push([part.indices[i]!, part.indices[i + 1]!, part.indices[i + 2]!]);
  }
  return faces;
}

function translatePart(
  part: CanonicalMesh,
  dx: number,
  dy: number,
  dz: number,
  geometry: GeometryPort,
): CanonicalMesh {
  const moved = geometry.transform(
    { vertices: part.positions, faces: facesOf(part) },
    { type: "translate", dx, dy, dz },
  );
  return { id: part.id, name: part.name, positions: moved.vertices, indices: part.indices };
}

function rotatePartZ90(part: CanonicalMesh, geometry: GeometryPort): CanonicalMesh {
  const rotated = geometry.transform(
    { vertices: part.positions, faces: facesOf(part) },
    { type: "matrix", m: rotation90Matrix("z", 1) },
  );
  const indices = new Uint32Array(rotated.faces.length * 3);
  let o = 0;
  for (const face of rotated.faces) {
    indices[o++] = face[0]!;
    indices[o++] = face[1]!;
    indices[o++] = face[2]!;
  }
  return { id: part.id, name: part.name, positions: rotated.vertices, indices };
}

/**
 * When CAD/world transforms scatter parts beyond the printer, lay them out
 * on the bed like a slicer (per-part AABB + shelf pack). Relative CAD poses
 * are not print placement.
 */
export function packMeshesOnBed(
  meshes: CanonicalMesh[],
  volume: BedVolume,
  geometry: GeometryPort = new PureTsGeometryAdapter(),
  gapMm: number = PACK_GAP_MM,
): CanonicalMesh[] {
  if (meshes.length === 0) return meshes;

  const prepared: { part: CanonicalMesh; size: [number, number, number] }[] = [];
  for (const mesh of meshes) {
    let part = mesh;
    let box = aabbFromPositions(part.positions);
    part = translatePart(part, -box.min[0], -box.min[1], -box.min[2], geometry);
    box = aabbFromPositions(part.positions);

    if (box.size[2] > volume.z + 1e-6) {
      throw new EngineException(
        createEngineError(
          "CONSTRAINT_FAILED",
          `MODEL_EXCEEDS_BUILD_VOLUME: part ${part.id} height ${box.size[2].toFixed(1)} mm vs printer Z ${volume.z} mm`,
          { retryable: true },
        ),
      );
    }

    const asIs = box.size[0] <= volume.x + 1e-6 && box.size[1] <= volume.y + 1e-6;
    const rotatedFits =
      box.size[1] <= volume.x + 1e-6 && box.size[0] <= volume.y + 1e-6;
    if (!asIs && rotatedFits) {
      part = rotatePartZ90(part, geometry);
      box = aabbFromPositions(part.positions);
      part = translatePart(part, -box.min[0], -box.min[1], -box.min[2], geometry);
      box = aabbFromPositions(part.positions);
    } else if (!asIs) {
      throw new EngineException(
        createEngineError(
          "CONSTRAINT_FAILED",
          `MODEL_EXCEEDS_BUILD_VOLUME: part ${part.id} ${box.size[0].toFixed(1)}×${box.size[1].toFixed(1)}×${box.size[2].toFixed(1)} mm vs printer ${volume.x}×${volume.y}×${volume.z} mm`,
          { retryable: true },
        ),
      );
    }
    prepared.push({ part, size: box.size });
  }

  prepared.sort((a, b) => b.size[1] * b.size[0] - a.size[1] * a.size[0]);

  let cursorX = 0;
  let cursorY = 0;
  let rowDepth = 0;
  const packed: CanonicalMesh[] = [];

  for (const item of prepared) {
    const [w, d] = item.size;
    if (cursorX > 0 && cursorX + w > volume.x + 1e-6) {
      cursorX = 0;
      cursorY += rowDepth + gapMm;
      rowDepth = 0;
    }
    if (cursorY + d > volume.y + 1e-6) {
      throw new EngineException(
        createEngineError(
          "CONSTRAINT_FAILED",
          `MODEL_EXCEEDS_BUILD_VOLUME: cannot pack ${meshes.length} parts onto ${volume.x}×${volume.y} mm bed`,
          { retryable: true },
        ),
      );
    }
    packed.push(translatePart(item.part, cursorX, cursorY, 0, geometry));
    cursorX += w + gapMm;
    rowDepth = Math.max(rowDepth, d);
  }

  return packed;
}

export function assemblyFitsBed(meshes: CanonicalMesh[], volume: BedVolume): boolean {
  const positions: number[] = [];
  for (const mesh of meshes) {
    for (let i = 0; i < mesh.positions.length; i++) positions.push(mesh.positions[i]!);
  }
  const box = aabbFromPositions(Float64Array.from(positions));
  return fits(box.size, volume);
}
