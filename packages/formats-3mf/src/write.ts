import { zipSync, strToU8 } from "fflate";

import type { CanonicalScene, PreservationReport, ThreeMfWriteOptions } from "./types";

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

/**
 * Write a Core 3MF geometry-only package from a canonical millimeter scene.
 * Vendor G-code / slice data is intentionally omitted (see preservation report).
 */
export function writeThreeMf(
  scene: CanonicalScene,
  options: ThreeMfWriteOptions = {},
): { bytes: Uint8Array; preservation: PreservationReport } {
  const mesh = scene.meshes[0];
  if (!mesh || mesh.indices.length < 3) {
    throw new Error("SERIALIZATION_FAILED: empty mesh");
  }
  const name = escapeXml(options.objectName ?? mesh.name ?? "Optimized model");
  const vertexLines: string[] = [];
  for (let i = 0; i < mesh.positions.length; i += 3) {
    vertexLines.push(
      `        <vertex x="${formatCoord(mesh.positions[i]!)}" y="${formatCoord(mesh.positions[i + 1]!)}" z="${formatCoord(mesh.positions[i + 2]!)}" />`,
    );
  }
  const triangleLines: string[] = [];
  for (let i = 0; i < mesh.indices.length; i += 3) {
    triangleLines.push(
      `        <triangle v1="${mesh.indices[i]!}" v2="${mesh.indices[i + 1]!}" v3="${mesh.indices[i + 2]!}" />`,
    );
  }

  const modelXml = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <metadata name="Application">fix-my-print</metadata>
  <resources>
    <object id="1" name="${name}" type="model">
      <mesh>
        <vertices>
${vertexLines.join("\n")}
        </vertices>
        <triangles>
${triangleLines.join("\n")}
        </triangles>
      </mesh>
    </object>
  </resources>
  <build>
    <item objectid="1" />
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
        "Core geometry (flattened)",
        `Original unit: ${scene.sourceMetadata.originalUnit}`,
        `Object names when available → ${name}`,
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
