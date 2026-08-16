export type CapabilityReport = {
  crossOriginIsolated: boolean;
  workerSupport: boolean;
  wasmSupport: boolean;
  /** Mandatory until multithreading is proven in a deployed isolated context. */
  singleThreadNote: string;
};

const SINGLE_THREAD_NOTE =
  "Geometry WASM must run single-threaded until crossOriginIsolated is proven in deployment.";

export type CapabilityEnv = {
  crossOriginIsolated?: boolean;
  Worker?: unknown;
  WebAssembly?: unknown;
};

export function detectCapabilities(
  env: CapabilityEnv = globalThis as CapabilityEnv,
): CapabilityReport {
  return {
    crossOriginIsolated: Boolean(env.crossOriginIsolated),
    workerSupport: typeof env.Worker !== "undefined",
    wasmSupport: typeof env.WebAssembly !== "undefined",
    singleThreadNote: SINGLE_THREAD_NOTE,
  };
}
