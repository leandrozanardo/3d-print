/**
 * Product feature flags (Phase 04 defaults).
 * engine.ts.enabled = true
 * geometry.wasm.enabled = false
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
