import {
  buildParetoSet,
  createCandidate,
  createObjectiveVector,
  dominates,
  paretoFrontier,
} from "../src/index";

describe("@fix-my-print/domain", () => {
  it("normalizes objective weights to sum 1", () => {
    const v = createObjectiveVector({
      printability: 2,
      strength: 2,
      quality: 0,
      timeProxy: 0,
      materialProxy: 0,
      risk: 0,
    });
    expect(v.printability).toBeCloseTo(0.5);
    expect(v.strength).toBeCloseTo(0.5);
    const sum =
      v.printability + v.strength + v.quality + v.timeProxy + v.materialProxy + v.risk;
    expect(sum).toBeCloseTo(1);
  });

  it("Pareto dominance excludes dominated candidates", () => {
    const a = createCandidate("a", "A", {
      printability: 1,
      strength: 0.2,
      quality: 0.2,
      timeProxy: 0.2,
      materialProxy: 0.2,
      risk: 0.2,
    });
    const b = createCandidate("b", "B", {
      printability: 0.5,
      strength: 0.1,
      quality: 0.1,
      timeProxy: 0.1,
      materialProxy: 0.1,
      risk: 0.1,
    });
    const c = createCandidate("c", "C", {
      printability: 0.2,
      strength: 1,
      quality: 0.2,
      timeProxy: 0.2,
      materialProxy: 0.2,
      risk: 0.2,
    });
    expect(dominates(a.scores, b.scores)).toBe(true);
    expect(dominates(b.scores, a.scores)).toBe(false);
    expect(dominates(a.scores, c.scores)).toBe(false);
    expect(dominates(c.scores, a.scores)).toBe(false);
    const frontier = paretoFrontier([a, b, c]);
    const ids = frontier.map((x) => x.id).sort();
    expect(ids).toEqual(["a", "c"]);
    const set = buildParetoSet([a, b, c]);
    expect(set.dominatedIds).toContain("b");
  });
});
