import { detectFormat, parseMesh } from "@fix-my-print/formats";
import { flattenThreeMf, parseThreeMf } from "@fix-my-print/formats-3mf";
import { PureTsGeometryAdapter } from "@fix-my-print/geometry";

export type GeometryBounds = {
  min: [number, number, number];
  max: [number, number, number];
};

export type InspectModelSuccess = {
  format: string;
  vertexCount: number;
  faceCount: number;
  bounds: GeometryBounds;
  watertight: boolean | null;
  area: number | null;
  volume: number | null;
  issues: string[];
  limitations: string[];
};

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

/**
 * Browser/Node-safe inspect routing: real 3MF flatten for geometry facts,
 * mesh parsers for STL/OBJ/PLY.
 */
export function inspectModelBytes(
  fileName: string,
  bytes: Uint8Array,
): InspectModelSuccess {
  if (looksLike3mf(fileName, bytes)) {
    const document = parseThreeMf(bytes, { fileName });
    const scene = flattenThreeMf(document, { fileName });
    const mesh = scene.meshes[0]!;
    const faces: number[][] = [];
    for (let i = 0; i < mesh.indices.length; i += 3) {
      faces.push([mesh.indices[i]!, mesh.indices[i + 1]!, mesh.indices[i + 2]!]);
    }
    const geometry = new PureTsGeometryAdapter();
    try {
      const facts = geometry.inspect({ vertices: mesh.positions, faces });
      return {
        format: "3mf",
        vertexCount: facts.vertexCount,
        faceCount: facts.faceCount,
        bounds: facts.bounds,
        watertight: facts.watertight,
        area: facts.area,
        volume: facts.volume,
        issues: [...facts.issues, ...scene.warnings.map((w) => w.message)],
        limitations: [
          `units=${document.unit}`,
          `members=${document.members.length}`,
          `objects=${document.objects.size}`,
          "geometry_flattened_from_3mf",
        ],
      };
    } finally {
      geometry.dispose();
    }
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
