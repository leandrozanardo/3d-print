/**
 * Geometric spaghetti risk from orientation V2 metrics.
 * Causes and slicer mitigations follow Bambu Lab's spaghetti troubleshooting wiki
 * (source.bambu-wiki-spaghetti / defect.fff.spaghetti). Plate cleanliness and
 * Auto Bed Leveling cannot be observed from the mesh; those stay process advice.
 */

import type { OrientationMetricsV2 } from "@fix-my-print/optimizer";

export const SPAGHETTI_KNOWLEDGE_ID = "defect.fff.spaghetti";
export const SPAGHETTI_SOURCE_ID = "source.bambu-wiki-spaghetti";

/** Bambu: overhangs steeper than 45° need supports (orientation V2 overhangAreaRatio). */
export const SPAGHETTI_OVERHANG_RATIO_MIN = 0.06;

/** Contact patch below this (mm²) is a first-layer spaghetti proxy. */
export const SPAGHETTI_SMALL_CONTACT_MM2 = 400;
export const SPAGHETTI_FIRST_LAYER_HEIGHT_MM = 12;

/** Large footprint with weak coverage: mid-print warp then knock-off. */
export const SPAGHETTI_WARP_FOOTPRINT_MM2 = 4000;
export const SPAGHETTI_WARP_COVERAGE_MAX = 0.55;

/** Tip-over / nozzle scrape when CoM is poorly supported. */
export const SPAGHETTI_INSTABILITY_MIN = 0.55;
export const SPAGHETTI_ASPECT_UNSTABLE = 2.5;
export const SPAGHETTI_SCRAPE_CONTACT_MM2 = 800;

export type SpaghettiWarningCode =
  | "SPAGHETTI_FIRST_LAYER"
  | "SPAGHETTI_WARPING"
  | "SPAGHETTI_SUPPORT_COLLAPSE"
  | "SPAGHETTI_NOZZLE_SCRAPE";

export interface SpaghettiWarning {
  readonly code: SpaghettiWarningCode;
  readonly message: string;
}

function cite(): string {
  return `${SPAGHETTI_KNOWLEDGE_ID} (${SPAGHETTI_SOURCE_ID})`;
}

function contactAspectRatio(metrics: OrientationMetricsV2): number {
  const denom = Math.sqrt(Math.max(metrics.bedContactAreaMm2, 1));
  return metrics.heightMm / denom;
}

function footprintAspectRatio(metrics: OrientationMetricsV2): number {
  const denom = Math.sqrt(Math.max(metrics.footprintAreaMm2, 1));
  return metrics.heightMm / denom;
}

export function assessSpaghettiRisk(
  metrics: OrientationMetricsV2,
): readonly SpaghettiWarning[] {
  const warnings: SpaghettiWarning[] = [];

  const firstLayer =
    metrics.bedContactAreaMm2 < SPAGHETTI_SMALL_CONTACT_MM2 &&
    metrics.heightMm >= SPAGHETTI_FIRST_LAYER_HEIGHT_MM &&
    contactAspectRatio(metrics) >= 1.2;
  if (firstLayer) {
    warnings.push({
      code: "SPAGHETTI_FIRST_LAYER",
      message:
        `Spaghetti na primeira camada: contato com a mesa de ${metrics.bedContactAreaMm2.toFixed(0)} mm². ` +
        `Limpe a PEI (água morna + detergente, sem tocar a face), confira o tipo de placa no slicer, ` +
        `rode Auto Bed Leveling, seque o filamento e use initial layer ≤ 30 mm/s (infill da 1ª camada ≤ 60 mm/s). ` +
        cite(),
    });
  }

  const warping =
    metrics.footprintAreaMm2 >= SPAGHETTI_WARP_FOOTPRINT_MM2 &&
    metrics.bedContactCoverage <= SPAGHETTI_WARP_COVERAGE_MAX;
  if (warping) {
    warnings.push({
      code: "SPAGHETTI_WARPING",
      message:
        `Spaghetti por empenamento (warping): cobertura de contato ${Math.round(metrics.bedContactCoverage * 100)}% ` +
        `em footprint de ${metrics.footprintAreaMm2.toFixed(0)} mm². Ative brim (5–8 mm, Outer brim only), ` +
        `confira placa/leveling e, em ABS/ASA/PC/PA, trate contração térmica. ` +
        cite(),
    });
  }

  const supportCollapse = metrics.overhangAreaRatio >= SPAGHETTI_OVERHANG_RATIO_MIN;
  if (supportCollapse) {
    warnings.push({
      code: "SPAGHETTI_SUPPORT_COLLAPSE",
      message:
        `Spaghetti por colapso de overhang/suporte: ${(metrics.overhangAreaRatio * 100).toFixed(1)}% da superfície ` +
        `está abaixo de 45°. Ative suportes no Bambu Studio, Slow down for overhangs, e reduza velocidade de ` +
        `Support / Support interface. Tree para orgânicos; Normal (auto) para balanços pesados. ` +
        cite(),
    });
  }

  const nozzleScrape =
    metrics.instabilityRisk >= SPAGHETTI_INSTABILITY_MIN ||
    (footprintAspectRatio(metrics) >= SPAGHETTI_ASPECT_UNSTABLE &&
      metrics.bedContactAreaMm2 < SPAGHETTI_SCRAPE_CONTACT_MM2);
  if (nozzleScrape) {
    warnings.push({
      code: "SPAGHETTI_NOZZLE_SCRAPE",
      message:
        `Spaghetti por raspagem do nozzle / peça instável (risco ${metrics.instabilityRisk.toFixed(2)}). ` +
        `Em Printer → Extruder, mude Z hop type para Normal. Aumente a base com brim 5–8 mm ` +
        `(Outer brim only) e, em galhos finos, use Paint-on Supports. ` +
        cite(),
    });
  }

  return warnings;
}
