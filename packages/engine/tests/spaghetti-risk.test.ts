import type { OrientationMetricsV2 } from "@fix-my-print/optimizer";

import {
  SPAGHETTI_KNOWLEDGE_ID,
  assessSpaghettiRisk,
} from "../src/spaghettiRisk";

const EMPTY_BANDS = {
  band0to15Mm2: 0,
  band15to30Mm2: 0,
  band30to45Mm2: 0,
  band45plusMm2: 0,
};

const EMPTY_COSTS = {
  supportSeverityCost: 0,
  supportHeightCost: 0,
  instabilityCost: 0,
  heightCost: 0,
  contactDeficitCost: 0,
  cosmeticDownwardCost: 0,
};

function metrics(overrides: Partial<OrientationMetricsV2> = {}): OrientationMetricsV2 {
  return {
    sizeMm: [40, 40, 20],
    heightMm: 20,
    heightRatio: 0.3,
    footprintAreaMm2: 1600,
    totalSurfaceAreaMm2: 6400,
    bedContactAreaMm2: 1600,
    bedContactCoverage: 1,
    overhangAreaMm2: 0,
    overhangAreaRatio: 0,
    weightedOverhangSeverity: 0,
    projectedOverhangAreaMm2: 0,
    supportHeightMoment: 0,
    centerOfMassEstimate: [20, 20, 10],
    supportPolygonAreaMm2: 1600,
    stabilityMarginMm: 10,
    instabilityRisk: 0.1,
    fitsBuildVolume: true,
    metricConfidence: 0.9,
    limitations: [],
    overhangBands: { ...EMPTY_BANDS },
    costs: { ...EMPTY_COSTS },
    ...overrides,
  };
}

describe("assessSpaghettiRisk", () => {
  it("does not warn a stable cube-like orientation", () => {
    expect(assessSpaghettiRisk(metrics())).toEqual([]);
  });

  it("flags first-layer spaghetti when bed contact is tiny", () => {
    const warnings = assessSpaghettiRisk(
      metrics({
        bedContactAreaMm2: 80,
        footprintAreaMm2: 90,
        bedContactCoverage: 0.9,
        heightMm: 40,
        sizeMm: [10, 10, 40],
      }),
    );
    expect(warnings.map((w) => w.code)).toContain("SPAGHETTI_FIRST_LAYER");
    expect(warnings[0]?.message).toMatch(/30 mm\/s/);
    expect(warnings.some((w) => w.message.includes(SPAGHETTI_KNOWLEDGE_ID))).toBe(true);
  });

  it("flags support-collapse spaghetti when overhangs exceed 45°", () => {
    const warnings = assessSpaghettiRisk(
      metrics({
        overhangAreaMm2: 800,
        overhangAreaRatio: 0.2,
        totalSurfaceAreaMm2: 4000,
        overhangBands: { ...EMPTY_BANDS, band45plusMm2: 700 },
      }),
    );
    expect(warnings.map((w) => w.code)).toContain("SPAGHETTI_SUPPORT_COLLAPSE");
    expect(warnings.some((w) => /suporte/i.test(w.message))).toBe(true);
  });

  it("flags nozzle-scrape spaghetti when the part is unstable", () => {
    const warnings = assessSpaghettiRisk(
      metrics({
        instabilityRisk: 0.8,
        heightMm: 80,
        footprintAreaMm2: 100,
        bedContactAreaMm2: 90,
        bedContactCoverage: 0.9,
        sizeMm: [10, 10, 80],
        stabilityMarginMm: -2,
      }),
    );
    expect(warnings.map((w) => w.code)).toContain("SPAGHETTI_NOZZLE_SCRAPE");
    expect(warnings.some((w) => /Z hop/i.test(w.message))).toBe(true);
  });

  it("flags warping spaghetti on a large poorly anchored footprint", () => {
    const warnings = assessSpaghettiRisk(
      metrics({
        footprintAreaMm2: 9000,
        bedContactAreaMm2: 2000,
        bedContactCoverage: 0.22,
        heightMm: 30,
        sizeMm: [100, 90, 30],
      }),
    );
    expect(warnings.map((w) => w.code)).toContain("SPAGHETTI_WARPING");
    expect(warnings.some((w) => /brim/i.test(w.message))).toBe(true);
  });

  it("emits warnings in a stable code order", () => {
    const warnings = assessSpaghettiRisk(
      metrics({
        bedContactAreaMm2: 50,
        footprintAreaMm2: 9000,
        bedContactCoverage: 0.2,
        heightMm: 90,
        sizeMm: [10, 10, 90],
        overhangAreaRatio: 0.25,
        overhangAreaMm2: 500,
        overhangBands: { ...EMPTY_BANDS, band45plusMm2: 400 },
        totalSurfaceAreaMm2: 2000,
        instabilityRisk: 0.9,
      }),
    );
    expect(warnings.map((w) => w.code)).toEqual([
      "SPAGHETTI_FIRST_LAYER",
      "SPAGHETTI_WARPING",
      "SPAGHETTI_SUPPORT_COLLAPSE",
      "SPAGHETTI_NOZZLE_SCRAPE",
    ]);
  });
});
