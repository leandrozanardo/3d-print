/**
 * FMT-003 — two closed cubes must not produce cross-object non-manifold after V2 resolve.
 */
import { analyzeTopology } from "@fix-my-print/geometry";
import { zipSync, strToU8 } from "fflate";

import { parseThreeMf } from "../src/parse";
import { resolveThreeMfInstances } from "../src/instances";

function makeTwoCube3mf(): Uint8Array {
  const model = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <resources>
    <object id="1" name="CubeA" type="model">
      <mesh>
        <vertices>
          <vertex x="0" y="0" z="0" />
          <vertex x="1" y="0" z="0" />
          <vertex x="1" y="1" z="0" />
          <vertex x="0" y="1" z="0" />
          <vertex x="0" y="0" z="1" />
          <vertex x="1" y="0" z="1" />
          <vertex x="1" y="1" z="1" />
          <vertex x="0" y="1" z="1" />
        </vertices>
        <triangles>
          <triangle v1="0" v2="1" v3="2" />
          <triangle v1="0" v2="2" v3="3" />
          <triangle v1="4" v2="6" v3="5" />
          <triangle v1="4" v2="7" v3="6" />
          <triangle v1="0" v2="4" v3="5" />
          <triangle v1="0" v2="5" v3="1" />
          <triangle v1="1" v2="5" v3="6" />
          <triangle v1="1" v2="6" v3="2" />
          <triangle v1="2" v2="6" v3="7" />
          <triangle v1="2" v2="7" v3="3" />
          <triangle v1="3" v2="7" v3="4" />
          <triangle v1="3" v2="4" v3="0" />
        </triangles>
      </mesh>
    </object>
    <object id="2" name="CubeB" type="model">
      <mesh>
        <vertices>
          <vertex x="0" y="0" z="0" />
          <vertex x="1" y="0" z="0" />
          <vertex x="1" y="1" z="0" />
          <vertex x="0" y="1" z="0" />
          <vertex x="0" y="0" z="1" />
          <vertex x="1" y="0" z="1" />
          <vertex x="1" y="1" z="1" />
          <vertex x="0" y="1" z="1" />
        </vertices>
        <triangles>
          <triangle v1="0" v2="1" v3="2" />
          <triangle v1="0" v2="2" v3="3" />
          <triangle v1="4" v2="6" v3="5" />
          <triangle v1="4" v2="7" v3="6" />
          <triangle v1="0" v2="4" v3="5" />
          <triangle v1="0" v2="5" v3="1" />
          <triangle v1="1" v2="5" v3="6" />
          <triangle v1="1" v2="6" v3="2" />
          <triangle v1="2" v2="6" v3="7" />
          <triangle v1="2" v2="7" v3="3" />
          <triangle v1="3" v2="7" v3="4" />
          <triangle v1="3" v2="4" v3="0" />
        </triangles>
      </mesh>
    </object>
  </resources>
  <build>
    <item objectid="1" />
    <item objectid="2" transform="1 0 0 0 1 0 0 0 1 1 0 0" />
  </build>
</model>
`;
  const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
</Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
</Relationships>`;
  return zipSync({
    "[Content_Types].xml": strToU8(contentTypes),
    "_rels/.rels": strToU8(rels),
    "3D/3dmodel.model": strToU8(model),
  });
}

describe("FMT-003 resolveThreeMfInstances two closed cubes", () => {
  it("keeps two watertight instances without cross-object welding", () => {
    const bytes = makeTwoCube3mf();
    const document = parseThreeMf(bytes, { fileName: "two-cubes.3mf" });
    const resolved = resolveThreeMfInstances(document, { fileName: "two-cubes.3mf" });
    expect(resolved.instances.length).toBe(2);

    for (const inst of resolved.instances) {
      const faces: number[][] = [];
      for (let i = 0; i < inst.indices.length; i += 3) {
        faces.push([inst.indices[i]!, inst.indices[i + 1]!, inst.indices[i + 2]!]);
      }
      const topo = analyzeTopology({
        vertices: inst.positions,
        faces,
      });
      expect(topo.watertight).toBe(true);
      expect(topo.nonManifoldEdgeCount).toBe(0);
      expect(topo.boundaryEdgeCount).toBe(0);
    }
  });
});
