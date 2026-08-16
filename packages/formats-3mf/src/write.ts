import { zipSync, strToU8 } from "fflate";

import type {
  CanonicalMesh,
  CanonicalScene,
  PreservationReport,
  ThreeMfWriteOptions,
} from "./types";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatCoord(n: number): string {
  if (!Number.isFinite(n)) {
    throw new Error(`SERIALIZATION_FAILED: non-finite coordinate ${n}`);
  }
  // Trim trailing zeros for deterministic compact output.
  return Number(n.toFixed(6)).toString();
}

function meshObjectXml(
  mesh: CanonicalMesh,
  objectId: number,
  fallbackName: string,
): string {
  if (mesh.indices.length < 3) {
    throw new Error("SERIALIZATION_FAILED: empty mesh");
  }
  const name = escapeXml(mesh.name ?? fallbackName);
  const vertexLines: string[] = [];
  for (let i = 0; i < mesh.positions.length; i += 3) {
    vertexLines.push(
      `        <vertex x="${formatCoord(mesh.positions[i]!)}" y="${formatCoord(mesh.positions[i + 1]!)}" z="${formatCoord(mesh.positions[i + 2]!)}" />`,
    );
  }
  const triangleLines: string[] = [];
  for (let i = 0; i < mesh.indices.length; i += 3) {
    const a = mesh.indices[i]!;
    const b = mesh.indices[i + 1]!;
    const c = mesh.indices[i + 2]!;
    const vertexCount = mesh.positions.length / 3;
    if (a >= vertexCount || b >= vertexCount || c >= vertexCount) {
      throw new Error("SERIALIZATION_FAILED: triangle index out of range");
    }
    triangleLines.push(`        <triangle v1="${a}" v2="${b}" v3="${c}" />`);
  }
  return `    <object id="${objectId}" name="${name}" type="model">
      <mesh>
        <vertices>
${vertexLines.join("\n")}
        </vertices>
        <triangles>
${triangleLines.join("\n")}
        </triangles>
      </mesh>
    </object>`;
}

/**
 * Write a Core 3MF geometry-only package from a canonical millimeter scene.
 * Serializes every mesh as its own object + build item (FMT-004).
 * Vendor G-code / slice data is intentionally omitted (see preservation report).
 */
export function writeThreeMf(
  scene: CanonicalScene,
  options: ThreeMfWriteOptions = {},
): { bytes: Uint8Array; preservation: PreservationReport } {
  const meshes = scene.meshes.filter((m) => m.indices.length >= 3);
  if (meshes.length === 0) {
    throw new Error("SERIALIZATION_FAILED: empty mesh");
  }

  const objectBlocks = meshes.map((mesh, index) => {
    const objectId = index + 1;
    const fallback =
      meshes.length === 1
        ? (options.objectName ?? "Optimized model")
        : options.objectName
          ? `${options.objectName} ${objectId}`
          : `Part ${objectId}`;
    return meshObjectXml(mesh, objectId, fallback);
  });

  const buildItems = meshes
    .map((_, index) => `    <item objectid="${index + 1}" />`)
    .join("\n");

  const primaryName = escapeXml(
    options.objectName ?? meshes[0]!.name ?? "Optimized model",
  );

  const modelXml = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <metadata name="Application">fix-my-print</metadata>
  <resources>
${objectBlocks.join("\n")}
  </resources>
  <build>
${buildItems}
  </build>
</model>
`;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
</Types>
`;

  const rels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
</Relationships>
`;

  // fflate rejects dates outside 1980–2099; pin a deterministic in-range timestamp.
  const mtimeSeconds = options.mtimeSeconds ?? Date.UTC(2020, 0, 1) / 1000;
  const zipped = zipSync(
    {
      "[Content_Types].xml": strToU8(contentTypes),
      "_rels/.rels": strToU8(rels),
      "3D/3dmodel.model": strToU8(modelXml),
    },
    {
      level: 6,
      mtime: new Date(mtimeSeconds * 1000),
    },
  );

  const preserved = scene.sourceMetadata
    ? [
        meshes.length === 1
          ? "Core geometry (flattened)"
          : `Core geometry (${meshes.length} objects)`,
        `Original unit: ${scene.sourceMetadata.originalUnit}`,
        `Object names when available → ${primaryName}`,
      ]
    : ["Core geometry"];
  const removed = [
    "VENDOR_CONFIGURATION",
    "DERIVED_SLICE_DATA",
    "GCODE_OR_TOOLPATH",
    "THUMBNAIL",
    "Non-core OPC parts",
  ];

  return {
    bytes: zipped,
    preservation: {
      preserved,
      removed,
      policy: "geometry-only-core-3mf",
      notes: [
        "Output is a Core 3MF with effective geometry after orientation.",
        "Slicer-specific project settings and G-code were not preserved as valid.",
        "Re-slice the model in your slicer before printing.",
      ],
    },
  };
}
