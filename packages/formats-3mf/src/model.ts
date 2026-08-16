import { asArray, attr, parseSafeXml } from "./safeXml";

export interface ModelParseLimits {
  maxXmlBytes: number;
  maxXmlDepth: number;
}

export interface ModelInspectFacts {
  units?: string;
  objectCount: number;
  vertexCount: number;
  triangleCount: number;
  componentCount: number;
  buildItemCount: number;
  transformNotes: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Parse 3MF Core .model XML for units, mesh counts, components, build items.
 */
export function parseModelXml(
  xmlText: string,
  limits: ModelParseLimits,
): ModelInspectFacts {
  const parsed = parseSafeXml(xmlText, {
    maxBytes: limits.maxXmlBytes,
    maxDepth: limits.maxXmlDepth,
  });
  if (!isRecord(parsed)) {
    return {
      objectCount: 0,
      vertexCount: 0,
      triangleCount: 0,
      componentCount: 0,
      buildItemCount: 0,
      transformNotes: [],
    };
  }

  const model = isRecord(parsed.model) ? parsed.model : undefined;
  const units = attr(model, "unit");
  const resources = isRecord(model?.resources) ? model.resources : undefined;
  const objects = asArray(
    resources?.object as Record<string, unknown> | Record<string, unknown>[] | undefined,
  );

  let vertexCount = 0;
  let triangleCount = 0;
  let componentCount = 0;
  const transformNotes: string[] = [];

  for (const obj of objects) {
    if (!isRecord(obj)) {
      continue;
    }
    const mesh = isRecord(obj.mesh) ? obj.mesh : undefined;
    if (mesh) {
      const vertices = isRecord(mesh.vertices) ? mesh.vertices : undefined;
      vertexCount += asArray(vertices?.vertex as unknown[] | undefined).length;
      const triangles = isRecord(mesh.triangles) ? mesh.triangles : undefined;
      triangleCount += asArray(triangles?.triangle as unknown[] | undefined).length;
    }
    const components = isRecord(obj.components) ? obj.components : undefined;
    const componentList = asArray(
      components?.component as
        | Record<string, unknown>
        | Record<string, unknown>[]
        | undefined,
    );
    componentCount += componentList.length;
    for (const component of componentList) {
      const transform = attr(component, "transform");
      const objectId = attr(component, "objectid");
      if (transform) {
        transformNotes.push(
          `component objectid=${objectId ?? "?"} transform=${transform}`,
        );
      }
    }
  }

  const build = isRecord(model?.build) ? model.build : undefined;
  const items = asArray(
    build?.item as Record<string, unknown> | Record<string, unknown>[] | undefined,
  );
  for (const item of items) {
    const transform = attr(item, "transform");
    const objectId = attr(item, "objectid");
    if (transform) {
      transformNotes.push(
        `build item objectid=${objectId ?? "?"} transform=${transform}`,
      );
    }
  }

  const facts: ModelInspectFacts = {
    objectCount: objects.length,
    vertexCount,
    triangleCount,
    componentCount,
    buildItemCount: items.length,
    transformNotes,
  };
  if (units !== undefined) {
    facts.units = units;
  }
  return facts;
}
