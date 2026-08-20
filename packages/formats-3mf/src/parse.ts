import { createEngineError, EngineException } from "@fix-my-print/contracts";
import { computeBounds, IDENTITY_MATRIX4, type Matrix4 } from "@fix-my-print/geometry";

import { classifyArchiveMember } from "./classify";
import { DEFAULT_THREEMF_LIMITS, inspect3mf } from "./inspect";
import { asArray, attr, parseSafeXml } from "./safeXml";
import { composeTransforms, parseTransformAttribute, transformPoint } from "./transform";
import type {
  CanonicalMesh,
  CanonicalScene,
  ProductWarning,
  ThreeMfBuildItem,
  ThreeMfDocument,
  ThreeMfModelPart,
  ThreeMfObjectNode,
  ThreeMfParseOptions,
} from "./types";
import { parseUnit, unitToMillimeters, type ThreeMfUnit } from "./units";
import { isUnsafeEntryPath, openZipReadOnly, utf8FromBytes } from "./zip";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function findMemberIgnoreCase(members: string[], wanted: string): string | undefined {
  const lower = wanted.toLowerCase();
  return members.find((m) => m.toLowerCase() === lower);
}

function resolveModelPath(
  buffer: Uint8Array,
  fileName: string,
): { modelPath: string; members: string[]; unitHint?: string } {
  const report = inspect3mf(buffer, DEFAULT_THREEMF_LIMITS);
  if (!report.isZip) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "INVALID_ZIP: not a zip container", {
        retryable: false,
        context: { fileName },
      }),
    );
  }
  if (!report.hasModel) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "MISSING_MODEL: no .model part found", {
        retryable: false,
        context: { fileName },
      }),
    );
  }
  const modelPath =
    report.members.find((m) => m.toLowerCase().endsWith(".model")) ??
    report.members.find((m) => m.toLowerCase().includes("3dmodel"));
  if (!modelPath) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "MISSING_MODEL", {
        retryable: false,
      }),
    );
  }
  return {
    modelPath,
    members: report.members,
    ...(report.units !== undefined ? { unitHint: report.units } : {}),
  };
}

function readVertex(
  node: Record<string, unknown>,
  index: number,
): [number, number, number] {
  const x = Number(attr(node, "x"));
  const y = Number(attr(node, "y"));
  const z = Number(attr(node, "z"));
  if (![x, y, z].every(Number.isFinite)) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", `INVALID_VERTEX at index ${index}`, {
        retryable: false,
      }),
    );
  }
  return [x, y, z];
}

function readTriangle(
  node: Record<string, unknown>,
  vertexCount: number,
  index: number,
): [number, number, number] {
  const v1 = Number(attr(node, "v1"));
  const v2 = Number(attr(node, "v2"));
  const v3 = Number(attr(node, "v3"));
  if (![v1, v2, v3].every((v) => Number.isInteger(v) && v >= 0 && v < vertexCount)) {
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        `INVALID_TRIANGLE at index ${index}: indices out of range`,
        { retryable: false },
      ),
    );
  }
  return [v1, v2, v3];
}

function normalizePartPath(raw: string): string {
  return raw.replace(/\\/g, "/").replace(/^\//, "");
}

function parseExternalPath(
  raw: string | undefined,
  allowExternalPath: boolean,
): string | null {
  if (!raw) {
    return null;
  }
  if (!allowExternalPath) {
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        "MISSING_OBJECT: path attribute is only valid on the root model",
        { retryable: false },
      ),
    );
  }
  const normalized = normalizePartPath(raw);
  if (!normalized || isUnsafeEntryPath(normalized)) {
    throw new EngineException(
      createEngineError(
        "REPO_BOUNDARY_VIOLATION",
        `unsafe production path: ${raw}`,
        { retryable: false },
      ),
    );
  }
  return normalized;
}

function parseObjectNode(
  obj: Record<string, unknown>,
  allowExternalPath: boolean,
): ThreeMfObjectNode {
  const objectId = attr(obj, "id");
  if (!objectId) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "MISSING_OBJECT: object without id", {
        retryable: false,
      }),
    );
  }
  const name = attr(obj, "name") ?? null;
  let mesh: ThreeMfObjectNode["mesh"] = null;
  const meshNode = isRecord(obj.mesh) ? obj.mesh : undefined;
  if (meshNode) {
    const verticesNode = isRecord(meshNode.vertices) ? meshNode.vertices : undefined;
    const vertexNodes = asArray(
      verticesNode?.vertex as
        | Record<string, unknown>
        | Record<string, unknown>[]
        | undefined,
    );
    const positions = new Float64Array(vertexNodes.length * 3);
    for (let i = 0; i < vertexNodes.length; i++) {
      const [x, y, z] = readVertex(vertexNodes[i]!, i);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    const trianglesNode = isRecord(meshNode.triangles) ? meshNode.triangles : undefined;
    const triangleNodes = asArray(
      trianglesNode?.triangle as
        | Record<string, unknown>
        | Record<string, unknown>[]
        | undefined,
    );
    const indices = new Uint32Array(triangleNodes.length * 3);
    for (let i = 0; i < triangleNodes.length; i++) {
      const [a, b, c] = readTriangle(triangleNodes[i]!, vertexNodes.length, i);
      indices[i * 3] = a;
      indices[i * 3 + 1] = b;
      indices[i * 3 + 2] = c;
    }
    mesh = { objectId, name, positions, indices };
  }

  const componentsNode = isRecord(obj.components) ? obj.components : undefined;
  const componentNodes = asArray(
    componentsNode?.component as
      | Record<string, unknown>
      | Record<string, unknown>[]
      | undefined,
  );
  const components = componentNodes.map((component) => {
    const refId = attr(component, "objectid");
    if (!refId) {
      throw new EngineException(
        createEngineError(
          "MESH_PARSE_FAILED",
          "MISSING_OBJECT: component without objectid",
          {
            retryable: false,
          },
        ),
      );
    }
    return {
      objectId: refId,
      transform: parseTransformAttribute(attr(component, "transform")),
      path: parseExternalPath(attr(component, "path"), allowExternalPath),
    };
  });

  return { objectId, name, mesh, components };
}

function parseModelResources(
  xml: string,
  limits: { maxXmlBytes: number; maxXmlDepth: number },
  allowExternalPath: boolean,
): {
  unit: ThreeMfUnit;
  objects: Map<string, ThreeMfObjectNode>;
  itemNodes: Record<string, unknown>[];
} {
  const parsed = parseSafeXml(xml, {
    maxBytes: limits.maxXmlBytes,
    maxDepth: limits.maxXmlDepth,
  });
  if (!isRecord(parsed) || !isRecord(parsed.model)) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "INVALID_MODEL_XML", {
        retryable: false,
      }),
    );
  }

  const model = parsed.model;
  const unit: ThreeMfUnit = parseUnit(attr(model, "unit"));
  const resources = isRecord(model.resources) ? model.resources : undefined;
  const objectNodes = asArray(
    resources?.object as Record<string, unknown> | Record<string, unknown>[] | undefined,
  );
  const objects = new Map<string, ThreeMfObjectNode>();
  for (const node of objectNodes) {
    if (!isRecord(node)) continue;
    const parsedObject = parseObjectNode(node, allowExternalPath);
    if (objects.has(parsedObject.objectId)) {
      throw new EngineException(
        createEngineError(
          "MESH_PARSE_FAILED",
          `MISSING_OBJECT: duplicate object id ${parsedObject.objectId}`,
          { retryable: false },
        ),
      );
    }
    objects.set(parsedObject.objectId, parsedObject);
  }

  const build = isRecord(model.build) ? model.build : undefined;
  const itemNodes = asArray(
    build?.item as Record<string, unknown> | Record<string, unknown>[] | undefined,
  );
  return { unit, objects, itemNodes };
}

function getPart(
  parts: ReadonlyMap<string, ThreeMfModelPart>,
  wanted: string,
): ThreeMfModelPart | undefined {
  const direct = parts.get(wanted);
  if (direct) return direct;
  const hit = findMemberIgnoreCase([...parts.keys()], wanted);
  return hit ? parts.get(hit) : undefined;
}

/**
 * Parse a 3MF package into a typed document (meshes + components + build).
 * Geometry coordinates remain in the document unit until flatten().
 */
export function parseThreeMf(
  bytes: Uint8Array,
  options: ThreeMfParseOptions = {},
): ThreeMfDocument {
  const fileName = options.fileName ?? "model.3mf";
  if (bytes.byteLength < 4 || bytes[0] !== 0x50 || bytes[1] !== 0x4b) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "INVALID_ZIP: missing ZIP magic", {
        retryable: false,
        context: { fileName },
      }),
    );
  }

  const { modelPath, members } = resolveModelPath(bytes, fileName);
  const opened = openZipReadOnly(bytes, DEFAULT_THREEMF_LIMITS);
  const zipMemberPaths = opened.members.map((m) => m.path);
  const resolvedModel =
    findMemberIgnoreCase(zipMemberPaths, modelPath) ?? modelPath;
  const limits = {
    maxXmlBytes: options.maxXmlBytes ?? DEFAULT_THREEMF_LIMITS.maxXmlBytes,
    maxXmlDepth: options.maxXmlDepth ?? DEFAULT_THREEMF_LIMITS.maxXmlDepth,
  };
  const rootXml = utf8FromBytes(opened.readMember(resolvedModel));
  const rootParsed = parseModelResources(rootXml, limits, true);

  const parts = new Map<string, ThreeMfModelPart>();
  parts.set(resolvedModel, {
    path: resolvedModel,
    unit: rootParsed.unit,
    objects: rootParsed.objects,
  });

  const referencedPaths = new Set<string>();
  for (const object of rootParsed.objects.values()) {
    for (const component of object.components) {
      if (component.path) referencedPaths.add(component.path);
    }
  }
  for (const item of rootParsed.itemNodes) {
    if (!isRecord(item)) continue;
    const itemPath = parseExternalPath(attr(item, "path"), true);
    if (itemPath) referencedPaths.add(itemPath);
  }

  for (const rawPath of referencedPaths) {
    const member = findMemberIgnoreCase(zipMemberPaths, rawPath);
    if (!member) {
      throw new EngineException(
        createEngineError(
          "MESH_PARSE_FAILED",
          `MISSING_OBJECT: production part not found: ${rawPath}`,
          { retryable: false },
        ),
      );
    }
    if (member.toLowerCase() === resolvedModel.toLowerCase()) {
      continue;
    }
    const childXml = utf8FromBytes(opened.readMember(member));
    const child = parseModelResources(childXml, limits, false);
    parts.set(member, {
      path: member,
      unit: child.unit,
      objects: child.objects,
    });
  }

  const buildItems: ThreeMfBuildItem[] = rootParsed.itemNodes.map((item) => {
    const objectId = attr(item, "objectid");
    if (!objectId) {
      throw new EngineException(
        createEngineError(
          "MESH_PARSE_FAILED",
          "MISSING_OBJECT: build item without objectid",
          {
            retryable: false,
          },
        ),
      );
    }
    const itemPath = parseExternalPath(attr(item, "path"), true);
    const target = getPart(parts, itemPath ?? resolvedModel);
    if (!target || !target.objects.has(objectId)) {
      throw new EngineException(
        createEngineError(
          "MESH_PARSE_FAILED",
          itemPath
            ? `MISSING_OBJECT: ${objectId} in ${itemPath}`
            : `MISSING_OBJECT: build references unknown id ${objectId}`,
          { retryable: false },
        ),
      );
    }
    return {
      objectId,
      transform: parseTransformAttribute(attr(item, "transform")),
      path: itemPath,
    };
  });

  if (buildItems.length === 0) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "EMPTY_GEOMETRY: build has no items", {
        retryable: false,
      }),
    );
  }

  const warnings: ProductWarning[] = [];
  const classified = members.map((path) => ({
    path,
    kind: classifyArchiveMember(path),
  }));
  if (classified.some((m) => m.kind === "GCODE_OR_TOOLPATH")) {
    warnings.push({
      code: "GCODE_PRESENT",
      message:
        "Archive contains G-code or toolpath data that will be invalidated if geometry changes",
    });
  }

  return {
    unit: rootParsed.unit,
    modelPath: resolvedModel,
    members: classified,
    objects: rootParsed.objects,
    parts,
    buildItems,
    warnings,
  };
}

interface Accumulator {
  positions: number[];
  indices: number[];
}

function appendTransformedMesh(
  acc: Accumulator,
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

export function lookupThreeMfObject(
  document: ThreeMfDocument,
  fromPartPath: string,
  objectId: string,
  refPath: string | null,
): { part: ThreeMfModelPart; object: ThreeMfObjectNode } {
  const partPath = refPath ?? fromPartPath;
  const part = getPart(document.parts, partPath);
  const object = part?.objects.get(objectId);
  if (!part || !object) {
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        refPath
          ? `MISSING_OBJECT: ${objectId} in ${refPath}`
          : `MISSING_OBJECT: ${objectId}`,
        { retryable: false },
      ),
    );
  }
  return { part, object };
}

function flattenObject(
  document: ThreeMfDocument,
  objectId: string,
  parent: Matrix4,
  acc: Accumulator,
  stack: Set<string>,
  depth: number,
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
  if (object.mesh && object.mesh.indices.length > 0) {
    appendTransformedMesh(acc, object.mesh.positions, object.mesh.indices, parent, scale);
  }
  for (const component of object.components) {
    const childMatrix = composeTransforms(parent, component.transform);
    flattenObject(
      document,
      component.objectId,
      childMatrix,
      acc,
      stack,
      depth + 1,
      part.path,
      component.path,
    );
  }
  stack.delete(key);
}

/**
 * Compose components + build transforms into a single millimeter CanonicalScene.
 */
export function flattenThreeMf(
  document: ThreeMfDocument,
  options: { fileName?: string } = {},
): CanonicalScene {
  const acc: Accumulator = { positions: [], indices: [] };
  for (const item of document.buildItems) {
    flattenObject(
      document,
      item.objectId,
      item.transform.length ? item.transform : IDENTITY_MATRIX4,
      acc,
      new Set(),
      0,
      document.modelPath,
      item.path,
    );
  }
  if (acc.indices.length === 0) {
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

  const positions = Float64Array.from(acc.positions);
  const indices = Uint32Array.from(acc.indices);
  const faces: number[][] = [];
  for (let i = 0; i < indices.length; i += 3) {
    faces.push([indices[i]!, indices[i + 1]!, indices[i + 2]!]);
  }
  const bounds = computeBounds({ vertices: positions, faces });

  const mesh: CanonicalMesh = {
    id: "flattened-0",
    name: options.fileName ?? null,
    positions,
    indices,
  };

  return {
    unit: "millimeter",
    meshes: [mesh],
    bounds,
    sourceFormat: "3mf",
    sourceMetadata: {
      fileName: options.fileName ?? "model.3mf",
      originalUnit: document.unit,
      memberCount: document.members.length,
      objectCount: document.objects.size,
      buildItemCount: document.buildItems.length,
      modelPath: document.modelPath,
    },
    warnings: [...document.warnings],
  };
}

/** Convert canonical mesh to RawMesh face list used by geometry/optimizer. */
export function canonicalToRawMesh(scene: CanonicalScene): {
  vertices: Float64Array;
  faces: number[][];
} {
  const mesh = scene.meshes[0];
  if (!mesh) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "EMPTY_GEOMETRY", { retryable: false }),
    );
  }
  const faces: number[][] = [];
  for (let i = 0; i < mesh.indices.length; i += 3) {
    faces.push([mesh.indices[i]!, mesh.indices[i + 1]!, mesh.indices[i + 2]!]);
  }
  return { vertices: mesh.positions, faces };
}
