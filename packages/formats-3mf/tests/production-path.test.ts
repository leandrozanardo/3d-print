/**
 * 3MF Production: objectid is scoped to the model part named by p:path.
 * Root assemblies that only reference /3D/Objects/*.model used to throw MISSING_OBJECT: 1.
 */
import { zipSync, strToU8 } from "fflate";

import { flattenThreeMf, parseThreeMf } from "../src/parse";
import { resolveThreeMfInstances } from "../src/instances";

const TRIANGLE_MESH = `
      <mesh>
        <vertices>
          <vertex x="0" y="0" z="0"/>
          <vertex x="1" y="0" z="0"/>
          <vertex x="0" y="1" z="0"/>
        </vertices>
        <triangles>
          <triangle v1="0" v2="1" v3="2"/>
        </triangles>
      </mesh>`;

function partModelXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US"
  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <resources>
    <object id="1" name="Part" type="model">${TRIANGLE_MESH}
    </object>
  </resources>
  <build />
</model>`;
}

function rootAssemblyXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US" requiredextensions="p"
  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"
  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">
  <resources>
    <object id="2" name="Assembly" type="model">
      <components>
        <component objectid="1" p:path="/3D/Objects/part.model" />
      </components>
    </object>
  </resources>
  <build>
    <item objectid="2" />
  </build>
</model>`;
}

function contentTypes(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
</Types>`;
}

function rels(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0"
    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
</Relationships>`;
}

function makeProductionComponent3mf(): Uint8Array {
  return zipSync({
    "[Content_Types].xml": strToU8(contentTypes()),
    "_rels/.rels": strToU8(rels()),
    "3D/3dmodel.model": strToU8(rootAssemblyXml()),
    "3D/Objects/part.model": strToU8(partModelXml()),
  });
}

function makeProductionBuildItem3mf(): Uint8Array {
  const root = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US" requiredextensions="p"
  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"
  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">
  <resources />
  <build>
    <item objectid="1" p:path="/3D/Objects/part.model" />
  </build>
</model>`;
  return zipSync({
    "[Content_Types].xml": strToU8(contentTypes()),
    "_rels/.rels": strToU8(rels()),
    "3D/3dmodel.model": strToU8(root),
    "3D/Objects/part.model": strToU8(partModelXml()),
  });
}

function makeProductionSameIdAssembly3mf(): Uint8Array {
  const root = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US" requiredextensions="p"
  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"
  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">
  <resources>
    <object id="1" name="Assembly" type="model">
      <components>
        <component objectid="1" p:path="/3D/Objects/part.model" />
      </components>
    </object>
  </resources>
  <build>
    <item objectid="1" />
  </build>
</model>`;
  return zipSync({
    "[Content_Types].xml": strToU8(contentTypes()),
    "_rels/.rels": strToU8(rels()),
    "3D/3dmodel.model": strToU8(root),
    "3D/Objects/part.model": strToU8(partModelXml()),
  });
}

describe("3MF Production path + objectid", () => {
  it("resolves component objectid against the part named by p:path", () => {
    const bytes = makeProductionComponent3mf();
    const document = parseThreeMf(bytes, { fileName: "prod.3mf" });
    const resolved = resolveThreeMfInstances(document, { fileName: "prod.3mf" });
    expect(resolved.instances.length).toBe(1);
    expect(resolved.instances[0]!.indices.length).toBe(3);
  });

  it("flattens the same production assembly to one triangle", () => {
    const bytes = makeProductionComponent3mf();
    const scene = flattenThreeMf(parseThreeMf(bytes, { fileName: "prod.3mf" }), {
      fileName: "prod.3mf",
    });
    expect(scene.meshes[0]!.indices.length / 3).toBe(1);
  });

  it("does not treat root object 1 + child object 1 as a cycle", () => {
    const resolved = resolveThreeMfInstances(
      parseThreeMf(makeProductionSameIdAssembly3mf(), { fileName: "prod-same-id.3mf" }),
    );
    expect(resolved.instances.length).toBe(1);
    expect(resolved.instances[0]!.indices.length).toBe(3);
  });

  it("resolves build item objectid against p:path when the root has no local object 1", () => {
    const bytes = makeProductionBuildItem3mf();
    const resolved = resolveThreeMfInstances(
      parseThreeMf(bytes, { fileName: "prod-item.3mf" }),
    );
    expect(resolved.instances.length).toBe(1);
    expect(resolved.instances[0]!.indices.length).toBe(3);
  });
});
