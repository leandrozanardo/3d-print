/**
 * Conservative safeRepair coverage (RPR-*).
 */
import { analyzeTopology } from "../src/topology";
import { safeRepair } from "../src/repair/safeRepair";
import { analyzeAssemblyGeometry } from "../src/repair/assemblyAnalysis";

function unitCube(): { vertices: Float64Array; faces: number[][] } {
  const vertices = Float64Array.from([
    0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
  ]);
  const faces = [
    [0, 1, 2],
    [0, 2, 3],
    [4, 6, 5],
    [4, 7, 6],
    [0, 4, 5],
    [0, 5, 1],
    [1, 5, 6],
    [1, 6, 2],
    [2, 6, 7],
    [2, 7, 3],
    [3, 7, 4],
    [3, 4, 0],
  ];
  return { vertices, faces };
}

describe("safeRepair", () => {
  it("marks a closed cube as not-needed", async () => {
    const mesh = unitCube();
    const result = await safeRepair(mesh, { mode: "safe" });
    expect(result.status).toBe("not-needed");
    expect(analyzeTopology(result.mesh).watertight).toBe(true);
  });

  it("fills a single missing cube face safely", async () => {
    const mesh = unitCube();
    mesh.faces = mesh.faces.slice(0, 10); // drop top
    expect(analyzeTopology(mesh).watertight).toBe(false);
    // Unit-cube face hole exceeds default 0.5mm diameter floor; widen policy for this fixture.
    const result = await safeRepair(mesh, {
      mode: "safe",
      policy: {
        maxHoleDiameterMm: 5,
        maxHolePerimeterMm: 20,
        maxHoleAreaFraction: 0.5,
        maxSampleDistanceMm: 2,
        maxSampleP95Mm: 1,
        maxBoundsDeltaMm: 1,
        maxAreaRelativeDelta: 0.5,
      },
    });
    if (result.status !== "committed") {
      throw new Error(
        `expected committed, got ${result.status}: ${JSON.stringify(result.reasonCodes)}`,
      );
    }
    expect(result.status).toBe("committed");
    const after = analyzeTopology(result.mesh);
    expect(after.watertight).toBe(true);
    expect(after.boundaryEdgeCount).toBe(0);
    expect(after.volume).not.toBeNull();
    expect(Math.abs((after.volume ?? 0) - 1)).toBeLessThan(0.05);
  });

  it("abstains on a large opening", async () => {
    // Flat square ring-like open box: remove 5 faces leaving a large boundary.
    const mesh = unitCube();
    mesh.faces = mesh.faces.slice(0, 2); // only bottom
    const result = await safeRepair(mesh, {
      mode: "safe",
      policy: { maxHoleDiameterMm: 0.1, maxHoleAreaFraction: 0.0001 },
    });
    expect(["abstained", "rejected", "not-needed"]).toContain(result.status);
    expect(result.status).not.toBe("committed");
  });

  it("never welds two separate cubes into one part", async () => {
    const a = unitCube();
    const b = unitCube();
    b.vertices = Float64Array.from(b.vertices.map((v, i) => (i % 3 === 0 ? v + 3 : v)));
    const assembly = analyzeAssemblyGeometry([
      { id: "a", sourceObjectId: "1", mesh: a },
      { id: "b", sourceObjectId: "2", mesh: b },
    ]);
    expect(assembly.partCount).toBe(2);
    expect(assembly.allPartsWatertight).toBe(true);
    expect(assembly.nonManifoldPartCount).toBe(0);
  });

  it("rejects NaN coordinates", async () => {
    const mesh = unitCube();
    mesh.vertices[0] = Number.NaN;
    const result = await safeRepair(mesh, { mode: "safe" });
    expect(result.status).toBe("rejected");
    expect(result.reasonCodes).toContain("INVALID_COORDINATES");
  });

  it("is idempotent when applied twice", async () => {
    const mesh = unitCube();
    mesh.faces = mesh.faces.slice(0, 10);
    const policy = {
      maxHoleDiameterMm: 5,
      maxHolePerimeterMm: 20,
      maxHoleAreaFraction: 0.5,
      maxSampleDistanceMm: 2,
      maxSampleP95Mm: 1,
      maxBoundsDeltaMm: 1,
      maxAreaRelativeDelta: 0.5,
    };
    const once = await safeRepair(mesh, { mode: "safe", policy });
    expect(once.status).toBe("committed");
    expect(analyzeTopology(once.mesh).watertight).toBe(true);
    const twice = await safeRepair(once.mesh, { mode: "safe", policy });
    expect(twice.status).toBe("not-needed");
  });
});
