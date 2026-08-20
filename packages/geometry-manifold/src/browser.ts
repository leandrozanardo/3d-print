/**
 * Browser-safe Manifold loader — no node:module / node:path / node:fs / Buffer.
 * Vite resolves the WASM URL via import.meta.url.
 */
import { createAdapter, ManifoldGeometryAdapter, type ManifoldModule } from "./common";

async function loadManifoldBrowser(): Promise<ManifoldModule> {
  const mod = (await import("manifold-3d")) as unknown as {
    default?: () => Promise<ManifoldModule>;
  };
  const factory =
    typeof mod === "function"
      ? (mod as unknown as () => Promise<ManifoldModule>)
      : mod.default;
  if (typeof factory !== "function") {
    throw new Error("manifold-3d browser entry did not export a factory");
  }
  const wasm = await factory();
  wasm.setup();
  return wasm;
}

export { ManifoldGeometryAdapter };
export async function createProductionGeometryAdapter(): Promise<ManifoldGeometryAdapter> {
  return createAdapter(loadManifoldBrowser);
}
