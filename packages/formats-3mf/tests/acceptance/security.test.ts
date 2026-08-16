import { zipSync, strToU8 } from "fflate";

import { flattenThreeMf, parseThreeMf } from "../../src/index";
import { assertSafeXmlText } from "../../src/safeXml";
import { isUnsafeEntryPath } from "../../src/zip";

describe("acceptance: 3MF security", () => {
  it("rejects unsafe archive paths", () => {
    expect(isUnsafeEntryPath("../secret")).toBe(true);
    expect(isUnsafeEntryPath("/abs/path")).toBe(true);
    expect(isUnsafeEntryPath("C:\\windows\\x")).toBe(true);
    expect(isUnsafeEntryPath("3D/3dmodel.model")).toBe(false);
  });

  it("rejects DTD / ENTITY XML", () => {
    expect(() => assertSafeXmlText(`<!DOCTYPE foo [<!ENTITY x "y">]><a/>`)).toThrow(
      /unsafe XML/i,
    );
  });

  it("rejects zip without model as MISSING_MODEL", () => {
    const bytes = zipSync({
      "[Content_Types].xml": strToU8(
        `<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"></Types>`,
      ),
      "_rels/.rels": strToU8(
        `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`,
      ),
    });
    expect(() => parseThreeMf(bytes, { fileName: "empty.3mf" })).toThrow(/MISSING_MODEL/i);
  });

  it("rejects non-zip bytes", () => {
    expect(() => parseThreeMf(new Uint8Array([1, 2, 3, 4]), { fileName: "x.3mf" })).toThrow(
      /INVALID_ZIP/i,
    );
  });
});

describe("acceptance: component cycle", () => {
  it("detects cyclic components", () => {
    const model = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <resources>
    <object id="1" type="model"><components><component objectid="2"/></components></object>
    <object id="2" type="model"><components><component objectid="1"/></components></object>
  </resources>
  <build><item objectid="1"/></build>
</model>`;
    const bytes = zipSync({
      "[Content_Types].xml": strToU8(
        `<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>`,
      ),
      "_rels/.rels": strToU8(
        `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>`,
      ),
      "3D/3dmodel.model": strToU8(model),
    });
    expect(() => flattenThreeMf(parseThreeMf(bytes, { fileName: "cycle.3mf" }))).toThrow(
      /CYCLIC_COMPONENTS/i,
    );
  });
});
