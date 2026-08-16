/**
 * Independent structural validator — must not share writer helpers that emit XML.
 * Re-opens via zip + XML parse path used for inspection (separate from writeThreeMf).
 */

import { inspect3mf } from "./inspect";
import { flattenThreeMf, parseThreeMf } from "./parse";
import type { ThreeMfValidationResult } from "./types";

export function validateThreeMf(bytes: Uint8Array): ThreeMfValidationResult {
  const issues: string[] = [];
  if (bytes.byteLength < 4 || bytes[0] !== 0x50 || bytes[1] !== 0x4b) {
    return {
      ok: false,
      issues: ["INVALID_ZIP: missing PK magic"],
      hasModel: false,
      hasContentTypes: false,
      hasRelationships: false,
    };
  }

  let report;
  try {
    report = inspect3mf(bytes);
  } catch (err) {
    return {
      ok: false,
      issues: [err instanceof Error ? err.message : String(err)],
      hasModel: false,
      hasContentTypes: false,
      hasRelationships: false,
    };
  }

  const membersLower = report.members.map((m) => m.toLowerCase());
  const hasContentTypes = membersLower.includes("[content_types].xml");
  const hasRelationships = membersLower.includes("_rels/.rels");
  if (!hasContentTypes) issues.push("MISSING_CONTENT_TYPES");
  if (!hasRelationships) issues.push("MISSING_RELATIONSHIPS");
  if (!report.hasModel) issues.push("MISSING_MODEL");
  for (const issue of report.issues) {
    issues.push(issue);
  }

  // Second path: production parser must reopen and produce non-empty geometry.
  try {
    const document = parseThreeMf(bytes, { fileName: "validate.3mf" });
    const scene = flattenThreeMf(document, { fileName: "validate.3mf" });
    const mesh = scene.meshes[0];
    if (!mesh || mesh.indices.length < 3) {
      issues.push("EMPTY_GEOMETRY");
    }
    return {
      ok: issues.length === 0,
      issues,
      vertexCount: mesh ? mesh.positions.length / 3 : 0,
      triangleCount: mesh ? mesh.indices.length / 3 : 0,
      unit: document.unit,
      hasModel: report.hasModel,
      hasContentTypes,
      hasRelationships,
    };
  } catch (err) {
    issues.push(err instanceof Error ? err.message : String(err));
    return {
      ok: false,
      issues,
      hasModel: report.hasModel,
      hasContentTypes,
      hasRelationships,
      ...(report.vertexCount !== undefined ? { vertexCount: report.vertexCount } : {}),
      ...(report.triangleCount !== undefined
        ? { triangleCount: report.triangleCount }
        : {}),
      ...(report.units !== undefined ? { unit: report.units } : {}),
    };
  }
}
