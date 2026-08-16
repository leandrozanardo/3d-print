import { createEngineError, EngineException } from "@fix-my-print/contracts";

import { parseModelXml } from "./model";
import { asArray, attr, parseSafeXml } from "./safeXml";
import { DEFAULT_ZIP_LIMITS, openZipReadOnly, type ZipOpenLimits } from "./zip";

const MODEL_HINTS = ["3d/3dmodel.model", "3dmodel.model", "model.model"] as const;

const MODEL_CONTENT_TYPE_HINTS = [
  "application/vnd.ms-package.3dmanufacturing-3dmodel+xml",
  "model/3mf",
  "3dmodel+xml",
] as const;

const MODEL_REL_TYPE_HINTS = [
  "http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel",
  "3dmodel",
] as const;

export interface ThreeMfInspectLimits extends ZipOpenLimits {
  maxXmlBytes: number;
  maxXmlDepth: number;
  maxMembersListed: number;
  maxMetadataNotes: number;
}

export const DEFAULT_THREEMF_LIMITS: ThreeMfInspectLimits = {
  ...DEFAULT_ZIP_LIMITS,
  maxXmlBytes: 64 * 1024 * 1024,
  maxXmlDepth: 64,
  maxMembersListed: 200,
  maxMetadataNotes: 50,
};

export interface ThreeMfInspectReport {
  isZip: boolean;
  memberCount: number;
  members: string[];
  hasModel: boolean;
  issues: string[];
  metadataNotes: string[];
  units?: string;
  objectCount?: number;
  vertexCount?: number;
  triangleCount?: number;
  componentCount?: number;
  buildItemCount?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizePartName(partName: string): string {
  return partName.replace(/\\/g, "/").replace(/^\//, "");
}

function resolveAgainst(basePath: string, target: string): string {
  const normalizedTarget = target.replace(/\\/g, "/");
  if (normalizedTarget.startsWith("/")) {
    return normalizePartName(normalizedTarget);
  }
  const baseDir = basePath.includes("/")
    ? basePath.slice(0, basePath.lastIndexOf("/"))
    : "";
  const joined = baseDir ? `${baseDir}/${normalizedTarget}` : normalizedTarget;
  const parts: string[] = [];
  for (const part of joined.split("/")) {
    if (part === "" || part === ".") {
      continue;
    }
    if (part === "..") {
      parts.pop();
      continue;
    }
    parts.push(part);
  }
  return parts.join("/");
}

function findMemberIgnoreCase(members: string[], wanted: string): string | undefined {
  const lower = wanted.toLowerCase();
  return members.find((m) => m.toLowerCase() === lower);
}

function collectModelFromContentTypes(
  xmlText: string,
  members: string[],
  limits: ThreeMfInspectLimits,
): string | undefined {
  const parsed = parseSafeXml(xmlText, {
    maxBytes: limits.maxXmlBytes,
    maxDepth: limits.maxXmlDepth,
  });
  if (!isRecord(parsed)) {
    return undefined;
  }
  const types = isRecord(parsed.Types) ? parsed.Types : parsed.types;
  if (!isRecord(types)) {
    return undefined;
  }
  const overrides = asArray(
    (types.Override ?? types.override) as
      | Record<string, unknown>
      | Record<string, unknown>[]
      | undefined,
  );
  for (const override of overrides) {
    const contentType = (attr(override, "ContentType") ?? "").toLowerCase();
    const partName = attr(override, "PartName");
    if (!partName) {
      continue;
    }
    if (
      MODEL_CONTENT_TYPE_HINTS.some((hint) => contentType.includes(hint)) ||
      partName.toLowerCase().endsWith(".model")
    ) {
      const resolved = normalizePartName(partName);
      return findMemberIgnoreCase(members, resolved) ?? resolved;
    }
  }
  return undefined;
}

function collectModelFromRels(
  xmlText: string,
  relsPath: string,
  members: string[],
  limits: ThreeMfInspectLimits,
): string | undefined {
  const parsed = parseSafeXml(xmlText, {
    maxBytes: limits.maxXmlBytes,
    maxDepth: limits.maxXmlDepth,
  });
  if (!isRecord(parsed)) {
    return undefined;
  }
  const relationships = isRecord(parsed.Relationships)
    ? parsed.Relationships
    : parsed.relationships;
  if (!isRecord(relationships)) {
    return undefined;
  }
  const rels = asArray(
    (relationships.Relationship ?? relationships.relationship) as
      | Record<string, unknown>
      | Record<string, unknown>[]
      | undefined,
  );
  for (const rel of rels) {
    const type = (attr(rel, "Type") ?? "").toLowerCase();
    const target = attr(rel, "Target");
    if (!target) {
      continue;
    }
    if (MODEL_REL_TYPE_HINTS.some((hint) => type.includes(hint))) {
      const resolved = resolveAgainst(relsPath, target);
      return findMemberIgnoreCase(members, resolved) ?? resolved;
    }
  }
  return undefined;
}

function sniffModelPath(members: string[]): string | undefined {
  const lowerMap = new Map(members.map((m) => [m.toLowerCase(), m] as const));
  for (const hint of MODEL_HINTS) {
    const hit = lowerMap.get(hint);
    if (hit) {
      return hit;
    }
  }
  return members.find((m) => m.toLowerCase().endsWith(".model"));
}

function rethrowUnsafeXml(err: unknown): void {
  if (err instanceof EngineException && /unsafe XML|DTD|ENTITY/i.test(err.message)) {
    throw err;
  }
}

/**
 * Read-only 3MF Core inspection from an in-memory buffer.
 * Does not extract members to the filesystem.
 */
export function inspect3mf(
  buffer: Buffer | Uint8Array,
  limits: ThreeMfInspectLimits = DEFAULT_THREEMF_LIMITS,
): ThreeMfInspectReport {
  if (buffer.byteLength === 0) {
    throw new EngineException(
      createEngineError("MESH_PARSE_FAILED", "empty 3MF buffer", {
        retryable: false,
      }),
    );
  }

  let opened: ReturnType<typeof openZipReadOnly>;
  try {
    opened = openZipReadOnly(buffer, limits);
  } catch (err) {
    if (err instanceof EngineException) {
      throw err;
    }
    throw new EngineException(
      createEngineError(
        "MESH_PARSE_FAILED",
        `Not a valid ZIP/3MF container: ${err instanceof Error ? err.message : String(err)}`,
        { retryable: false },
      ),
    );
  }

  const memberPaths = opened.members.map((m) => m.path);
  const issues: string[] = [];
  const metadataNotes: string[] = [];

  for (const name of memberPaths) {
    const lower = name.toLowerCase();
    if (lower.includes("metadata") || lower.endsWith(".json") || lower.endsWith(".xml")) {
      metadataNotes.push(`metadata candidate: ${name}`);
    }
    if (lower.includes("plate_") || lower.includes("metadata/plate")) {
      metadataNotes.push(`plate/project candidate: ${name}`);
    }
  }

  let modelPath: string | undefined;

  const contentTypesPath = findMemberIgnoreCase(memberPaths, "[Content_Types].xml");
  if (contentTypesPath) {
    try {
      const xml = opened.readMember(contentTypesPath).toString("utf8");
      modelPath = collectModelFromContentTypes(xml, memberPaths, limits);
      metadataNotes.push(`content types: ${contentTypesPath}`);
    } catch (err) {
      rethrowUnsafeXml(err);
      if (err instanceof EngineException) {
        issues.push(err.message);
      } else {
        issues.push("failed to parse [Content_Types].xml");
      }
    }
  } else {
    issues.push("missing [Content_Types].xml");
  }

  if (!modelPath) {
    const rootRels = findMemberIgnoreCase(memberPaths, "_rels/.rels");
    if (rootRels) {
      try {
        const xml = opened.readMember(rootRels).toString("utf8");
        modelPath = collectModelFromRels(xml, rootRels, memberPaths, limits);
      } catch (err) {
        rethrowUnsafeXml(err);
        if (err instanceof EngineException) {
          issues.push(err.message);
        } else {
          issues.push("failed to parse root relationships");
        }
      }
    }
  }

  if (!modelPath) {
    modelPath = sniffModelPath(memberPaths);
  }

  const hasModel = Boolean(modelPath && findMemberIgnoreCase(memberPaths, modelPath));
  if (!hasModel) {
    issues.push("no .model mesh payload found");
  }

  const report: ThreeMfInspectReport = {
    isZip: true,
    memberCount: memberPaths.length,
    members: memberPaths.slice(0, limits.maxMembersListed),
    hasModel,
    issues,
    metadataNotes: metadataNotes.slice(0, limits.maxMetadataNotes),
  };

  if (hasModel && modelPath) {
    const resolvedModel = findMemberIgnoreCase(memberPaths, modelPath)!;
    try {
      const xml = opened.readMember(resolvedModel).toString("utf8");
      const facts = parseModelXml(xml, {
        maxXmlBytes: limits.maxXmlBytes,
        maxXmlDepth: limits.maxXmlDepth,
      });
      if (facts.units !== undefined) {
        report.units = facts.units;
      }
      report.objectCount = facts.objectCount;
      report.vertexCount = facts.vertexCount;
      report.triangleCount = facts.triangleCount;
      report.componentCount = facts.componentCount;
      report.buildItemCount = facts.buildItemCount;
      for (const note of facts.transformNotes.slice(0, 20)) {
        if (report.metadataNotes.length < limits.maxMetadataNotes) {
          report.metadataNotes.push(note);
        }
      }
    } catch (err) {
      rethrowUnsafeXml(err);
      if (err instanceof EngineException) {
        issues.push(err.message);
      } else {
        issues.push("failed to parse .model XML");
      }
    }
  }

  return report;
}
