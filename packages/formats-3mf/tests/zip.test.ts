import AdmZip from "adm-zip";

import { EngineException } from "@fix-my-print/contracts";

import { inspect3mf, openZipReadOnly } from "../src/index";

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
    <item objectid="1" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>
  </build>
</model>`;
}

function buildMinimal3mf(): Buffer {
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
  return zip.toBuffer();
}

describe("@fix-my-print/formats-3mf", () => {
  it("rejects traversal path entry", () => {
    const zip = new AdmZip();
    const entry = zip.addFile("safe.txt", Buffer.from("x"));
    entry.entryName = "../escape.txt";
    const buf = zip.toBuffer();
    expect(() => openZipReadOnly(buf)).toThrow(EngineException);
    try {
      openZipReadOnly(buf);
    } catch (e) {
      expect(e).toBeInstanceOf(EngineException);
      expect((e as EngineException).code).toBe("REPO_BOUNDARY_VIOLATION");
    }
  });

  it("lists safe members read-only", () => {
    const zip = new AdmZip();
    zip.addFile("3D/3dmodel.model", Buffer.from("<model/>"));
    const opened = openZipReadOnly(zip.toBuffer());
    expect(opened.members.map((m) => m.path)).toEqual(["3D/3dmodel.model"]);
    expect(new TextDecoder("utf-8").decode(opened.readMember("3D/3dmodel.model"))).toBe(
      "<model/>",
    );
  });

  it("inspects synthetic minimal 3MF zip in memory", () => {
    const report = inspect3mf(buildMinimal3mf());
    expect(report.isZip).toBe(true);
    expect(report.hasModel).toBe(true);
    expect(report.memberCount).toBeGreaterThanOrEqual(3);
    expect(report.units).toBe("millimeter");
    expect(report.objectCount).toBe(1);
    expect(report.vertexCount).toBe(3);
    expect(report.triangleCount).toBe(1);
    expect(report.buildItemCount).toBe(1);
    expect(report.issues).toEqual([]);
  });

  it("rejects unsafe XML with DOCTYPE", () => {
    const zip = new AdmZip();
    zip.addFile(
      "[Content_Types].xml",
      Buffer.from(
        `<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<Types></Types>`,
        "utf8",
      ),
    );
    zip.addFile("3D/3dmodel.model", Buffer.from(minimalModelXml(), "utf8"));
    expect(() => inspect3mf(zip.toBuffer())).toThrow(EngineException);
    try {
      inspect3mf(zip.toBuffer());
    } catch (e) {
      expect(e).toBeInstanceOf(EngineException);
      expect((e as EngineException).message).toMatch(/DTD|ENTITY/i);
    }
  });

  it("rejects DOCTYPE inside .model XML", () => {
    const zip = new AdmZip();
    zip.addFile(
      "[Content_Types].xml",
      Buffer.from(
        `<?xml version="1.0"?><Types>
  <Override PartName="/3D/3dmodel.model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
</Types>`,
        "utf8",
      ),
    );
    zip.addFile(
      "3D/3dmodel.model",
      Buffer.from(
        `<?xml version="1.0"?><!DOCTYPE model [<!ENTITY xxe SYSTEM "http://evil">]><model unit="millimeter"></model>`,
        "utf8",
      ),
    );
    expect(() => inspect3mf(zip.toBuffer())).toThrow(EngineException);
  });
});
