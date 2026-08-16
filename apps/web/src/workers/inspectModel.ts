import { detectFormat, parseMesh } from "@fix-my-print/formats";
import { inspect3mf } from "@fix-my-print/formats-3mf";
import { PureTsGeometryAdapter } from "@fix-my-print/geometry";

import type { GeometryBounds, GeometryInspectResult } from "./protocol";

function isZipMagic(buffer: Uint8Array): boolean {
  return (
    buffer.byteLength >= 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    (buffer[2] === 0x03 || buffer[2] === 0x05 || buffer[2] === 0x07) &&
    (buffer[3] === 0x04 || buffer[3] === 0x06 || buffer[3] === 0x08)
  );
}

function looksLike3mf(fileName: string, buffer: Uint8Array): boolean {
  if (fileName.toLowerCase().endsWith(".3mf")) {
    return true;
  }
  return isZipMagic(buffer);
}

const UNKNOWN_BOUNDS: GeometryBounds = {
  min: [0, 0, 0],
  max: [0, 0, 0],
};

export type InspectModelSuccess = Omit<
  GeometryInspectResult,
  "type" | "requestId" | "ok" | "fileName" | "byteLength"
>;

/**
 * Browser/Node-safe inspect routing: mesh parsers for STL/OBJ/PLY,
 * container inspect for 3MF (ZIP).
 */
export function inspectModelBytes(
  fileName: string,
  bytes: Uint8Array,
): InspectModelSuccess {
  if (looksLike3mf(fileName, bytes)) {
    const report = inspect3mf(bytes);
    return {
      format: "3mf",
      vertexCount: report.vertexCount ?? 0,
      faceCount: report.triangleCount ?? 0,
      bounds: UNKNOWN_BOUNDS,
      watertight: false,
      area: null,
      volume: null,
      issues: report.issues,
      limitations: [
        "3mf_container_inspect",
        "bounds_not_computed_from_mesh",
        "watertight_not_evaluated_for_3mf_container",
        ...(report.units ? [`units=${report.units}`] : []),
        ...(report.hasModel ? [] : ["no_model_payload"]),
        `members=${report.memberCount}`,
        ...(report.objectCount !== undefined
          ? [`objects=${report.objectCount}`]
          : []),
      ],
    };
  }

  const detected = detectFormat(bytes);
  const parsed = parseMesh(bytes);
  const geometry = new PureTsGeometryAdapter();
  try {
    const facts = geometry.inspect(parsed.mesh);
    return {
      format: parsed.format || detected,
      vertexCount: facts.vertexCount,
      faceCount: facts.faceCount,
      bounds: facts.bounds,
      watertight: facts.watertight,
      area: facts.area,
      volume: facts.volume,
      issues: facts.issues,
      limitations: facts.limitations,
    };
  } finally {
    geometry.dispose();
  }
}
