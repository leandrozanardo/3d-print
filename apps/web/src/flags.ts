/**
 * Product feature flags.
 * engine.ts.enabled = true
 * geometry.wasm.enabled = false — Manifold WASM adapter is not bundled in the
 * browser worker yet; inspect uses PureTsGeometryAdapter with full GeometryFacts.
 * Flip to true only after ManifoldGeometryAdapter / createProductionGeometryAdapter
 * is wired and proven under Vite worker bundling.
 * ai = off
 */
export const featureFlags = {
  engine: {
    ts: {
      enabled: true,
    },
  },
  geometry: {
    wasm: {
      enabled: false,
    },
  },
  ai: {
    enabled: false,
  },
} as const;

export type FeatureFlags = typeof featureFlags;

export function isAiEnabled(flags: FeatureFlags = featureFlags): boolean {
  return Boolean(flags.ai.enabled);
}
