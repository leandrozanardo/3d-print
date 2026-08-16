import AdmZip from "adm-zip";
import { describe, expect, it } from "vitest";

import { inspectModelBytes } from "./inspectModel";

function minimalModelXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US"
  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <resources>
    <object id="1" type="model">
      <mesh>
        <vertices>
          <vertex x="0" y="0" z="0"/>
          <vertex x="1" y="0" z="0"/>
          <vertex x="0" y="1" z="0"/>
        </vertices>
        <triangles>
          <triangle v1="0" v2="1" v3="2"/>
        </triangles>
      </mesh>
    </object>
  </resources>
  <build>
    <item objectid="1"/>
  </build>
</model>`;
}

function buildMinimal3mf(): Uint8Array {
  const zip = new AdmZip();
  zip.addFile(
    "[Content_Types].xml",
    Buffer.from(
      `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
  <Override PartName="/3D/3dmodel.model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
</Types>`,
      "utf8",
    ),
  );
  zip.addFile(
    "_rels/.rels",
    Buffer.from(
      `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model"
    Id="rel0"
    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>
</Relationships>`,
      "utf8",
    ),
  );
  zip.addFile("3D/3dmodel.model", Buffer.from(minimalModelXml(), "utf8"));
  return new Uint8Array(zip.toBuffer());
}

describe("inspectModelBytes", () => {
  it("inspects synthetic 3MF by extension", () => {
    const bytes = buildMinimal3mf();
    const result = inspectModelBytes("part.3mf", bytes);
    expect(result.format).toBe("3mf");
    expect(result.vertexCount).toBe(3);
    expect(result.faceCount).toBe(1);
    expect(result.limitations).toContain("geometry_flattened_from_3mf");
    expect(result.bounds.max[0] - result.bounds.min[0]).toBeGreaterThan(0);
  });

  it("inspects 3MF by ZIP magic without extension", () => {
    const bytes = buildMinimal3mf();
    const result = inspectModelBytes("unknown.bin", bytes);
    expect(result.format).toBe("3mf");
    expect(result.vertexCount).toBe(3);
  });
});
