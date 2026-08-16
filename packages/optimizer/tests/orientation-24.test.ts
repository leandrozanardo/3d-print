import { ORIENTATION_COUNT, ORIENTATION_SPECS } from "../src/orientations";
import {
  isOrthogonalLinear,
  linearDeterminant,
} from "@fix-my-print/geometry";

describe("24 proper cube orientations", () => {
  it("exposes exactly 24 unique proper rotations", () => {
    expect(ORIENTATION_COUNT).toBe(24);
    expect(ORIENTATION_SPECS).toHaveLength(24);
    const ids = new Set(ORIENTATION_SPECS.map((s) => s.id));
    expect(ids.size).toBe(24);
    const matrices = new Set(ORIENTATION_SPECS.map((s) => s.matrix.join(",")));
    expect(matrices.size).toBe(24);
  });

  it("keeps orthogonal matrices with determinant +1 (no reflections)", () => {
    for (const spec of ORIENTATION_SPECS) {
      expect(isOrthogonalLinear(spec.matrix)).toBe(true);
      expect(Math.abs(linearDeterminant(spec.matrix) - 1)).toBeLessThan(1e-9);
    }
  });

  it("keeps a stable order starting with identity up+z-yaw0", () => {
    expect(ORIENTATION_SPECS[0]?.id).toBe("up+z-yaw0");
    expect([...ORIENTATION_SPECS.map((s) => s.id)]).toEqual(
      ORIENTATION_SPECS.map((s) => s.id),
    );
  });
});
