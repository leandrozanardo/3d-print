/**
 * Node-safe Manifold loader using createRequire + pathToFileURL.
 */
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { createAdapter, ManifoldGeometryAdapter, type ManifoldModule } from "./common";

const packageRoot = path.resolve(__dirname, "..");
const nodeRequire = createRequire(path.join(packageRoot, "package.json"));

async function loadManifoldNode(): Promise<ManifoldModule> {
  const manifoldJs = nodeRequire.resolve("manifold-3d/manifold.js");
  const dynamicImport = new Function("specifier", "return import(specifier)") as (
    specifier: string,
  ) => Promise<unknown>;
  const mod = (await dynamicImport(pathToFileURL(manifoldJs).href)) as {
    default?: () => Promise<ManifoldModule>;
  };
  const factory =
    typeof mod === "function"
      ? (mod as unknown as () => Promise<ManifoldModule>)
      : mod.default;
  if (typeof factory !== "function") {
    throw new Error("manifold-3d/manifold.js did not export a factory");
  }
  const wasm = await factory();
  wasm.setup();
  return wasm;
}

export { ManifoldGeometryAdapter };
export async function createProductionGeometryAdapter(): Promise<ManifoldGeometryAdapter> {
  return createAdapter(loadManifoldNode);
}
