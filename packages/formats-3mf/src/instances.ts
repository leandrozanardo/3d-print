import { createEngineError, EngineException } from "@fix-my-print/contracts";
import {
  computeBounds,
  IDENTITY_MATRIX4,
  type Bounds,
  type Matrix4,
} from "@fix-my-print/geometry";

import { composeTransforms, transformPoint } from "./transform";
import type { ThreeMfDocument } from "./types";
import { unitToMillimeters } from "./units";
import { lookupThreeMfObject } from "./parse";

/** One resolved mesh occurrence reachable from <build> (millimeter space). */
export interface CanonicalMeshInstance {
  readonly id: string;
  readonly sourceObjectId: string;
  readonly buildItemIndex: number;
  readonly instancePath: string;
  readonly name: string | null;
  readonly positions: Float64Array;
  readonly indices: Uint32Array;
  readonly effectiveTransform: Matrix4;
  readonly bounds: Bounds;
}

export interface ResolvedThreeMfInstances {
  readonly unit: "millimeter";
  readonly instances: readonly CanonicalMeshInstance[];
  readonly globalBounds: Bounds;
}

type LeafAcc = {
  positions: number[];
  indices: number[];
  name: string | null;
  sourceObjectId: string;
  path: string[];
  transform: Matrix4;
};

function appendTransformedMesh(
  acc: { positions: number[]; indices: number[] },
  positions: Float64Array,
  indices: Uint32Array,
  matrix: Matrix4,
  scale: number,
): void {
  const base = acc.positions.length / 3;
  for (let i = 0; i < positions.length; i += 3) {
    const [x, y, z] = transformPoint(
      matrix,
      positions[i]! * scale,
      positions[i + 1]! * scale,
      positions[i + 2]! * scale,
    );
    acc.positions.push(x, y, z);
  }
  for (let i = 0; i < indices.length; i++) {
    acc.indices.push(indices[i]! + base);
  }
}

function objectStackKey(partPath: string, objectId: string): string {
  return `${partPath.toLowerCase()}#${objectId}`;
}

function collectLeaves(
  document: ThreeMfDocument,
  objectId: string,
  parent: Matrix4,
  stack: Set<string>,
  depth: number,
  path: string[],
  out: LeafAcc[],
  fromPartPath: string,
  refPath: string | null,
): void {
  if (depth > 64) {
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        "CYCLIC_COMPONENTS: recursion depth exceeded",
        {
          retryable: false,
        },
      ),
    );
  }
  const { part, object } = lookupThreeMfObject(
    document,
    fromPartPath,
    objectId,
    refPath,
  );
  const key = objectStackKey(part.path, objectId);
  if (stack.has(key)) {
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        `CYCLIC_COMPONENTS: cycle at object ${objectId}`,
        {
          retryable: false,
        },
      ),
    );
  }
  stack.add(key);
  const scale = unitToMillimeters(part.unit);
  const nextPath = [...path, objectId];
  if (object.mesh && object.mesh.indices.length > 0) {
    const leaf: LeafAcc = {
      positions: [],
      indices: [],
      name: object.name,
      sourceObjectId: objectId,
      path: nextPath,
      transform: parent,
    };
    appendTransformedMesh(
      leaf,
      object.mesh.positions,
      object.mesh.indices,
      parent,
      scale,
    );
    out.push(leaf);
  }
  for (const component of object.components) {
    const childMatrix = composeTransforms(parent, component.transform);
    collectLeaves(
      document,
      component.objectId,
      childMatrix,
      stack,
      depth + 1,
      nextPath,
      out,
      part.path,
      component.path,
    );
  }
  stack.delete(key);
}

/**
 * Resolve every mesh instance reachable from <build> without welding across objects.
 * FMT-001 — Geometry Quality V2.
 */
export function resolveThreeMfInstances(
  document: ThreeMfDocument,
  options: { fileName?: string } = {},
): ResolvedThreeMfInstances {
  void options.fileName;
  const leaves: LeafAcc[] = [];
  document.buildItems.forEach((item, buildItemIndex) => {
    const rootTransform = item.transform.length ? item.transform : IDENTITY_MATRIX4;
    const buildLeaves: LeafAcc[] = [];
    collectLeaves(
      document,
      item.objectId,
      rootTransform,
      new Set(),
      0,
      [`build:${buildItemIndex}`],
      buildLeaves,
      document.modelPath,
      item.path,
    );
    for (const leaf of buildLeaves) {
      leaves.push({
        ...leaf,
        path: [`build:${buildItemIndex}`, ...leaf.path.slice(1)],
      });
    }
  });

  if (leaves.length === 0) {
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        "EMPTY_GEOMETRY: no triangles reachable from build",
        {
          retryable: false,
        },
      ),
    );
  }

  const instances: CanonicalMeshInstance[] = leaves.map((leaf, index) => {
    const positions = Float64Array.from(leaf.positions);
    const indices = Uint32Array.from(leaf.indices);
    const faces: number[][] = [];
    for (let i = 0; i < indices.length; i += 3) {
      faces.push([indices[i]!, indices[i + 1]!, indices[i + 2]!]);
    }
    const bounds = computeBounds({ vertices: positions, faces });
    const buildItemIndex = Number(leaf.path[0]!.replace("build:", ""));
    return {
      id: `inst-${index}-${leaf.sourceObjectId}`,
      sourceObjectId: leaf.sourceObjectId,
      buildItemIndex,
      instancePath: leaf.path.join("/"),
      name: leaf.name,
      positions,
      indices,
      effectiveTransform: leaf.transform,
      bounds,
    };
  });

  const allPos: number[] = [];
  const allIdx: number[] = [];
  for (const inst of instances) {
    const base = allPos.length / 3;
    for (let i = 0; i < inst.positions.length; i++) {
      allPos.push(inst.positions[i]!);
    }
    for (let i = 0; i < inst.indices.length; i++) {
      allIdx.push(inst.indices[i]! + base);
    }
  }
  const faces: number[][] = [];
  for (let i = 0; i < allIdx.length; i += 3) {
    faces.push([allIdx[i]!, allIdx[i + 1]!, allIdx[i + 2]!]);
  }
  const globalBounds = computeBounds({
    vertices: Float64Array.from(allPos),
    faces,
  });

  return {
    unit: "millimeter",
    instances,
    globalBounds,
  };
}
