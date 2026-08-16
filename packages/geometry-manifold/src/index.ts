import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

import type { RawMesh } from "@fix-my-print/formats";
import {
  analyzeTopology,
  exportBinaryStl,
  prepareMeshForInspect,
  repairMeshLight,
  topologyToFacts,
  transformMesh,
  type GeometryFacts,
  type GeometryPort,
  type OutputFormat,
  type RepairPlan,
  type RepairResult,
  type TransformPlan,
} from "@fix-my-print/geometry";

type ManifoldModule = {
  setup: () => void;
  Manifold: {
    ofMesh: (mesh: {
      numProp: number;
      vertProperties: Float32Array;
      triVerts: Uint32Array;
    }) => {
      getMesh: () => {
        numProp: number;
        vertProperties: Float32Array;
        triVerts: Uint32Array;
      };
      delete: () => void;
    };
  };
};

// Resolve from this package root so Jest (ts-jest) and dist share the same lookup.
const packageRoot = path.resolve(__dirname, "..");
const nodeRequire = createRequire(path.join(packageRoot, "package.json"));

async function loadManifold(): Promise<ManifoldModule> {
  // Subpath export — "manifold-3d/package.json" is blocked by package exports.
  // Load as ESM (manifold.js uses import.meta). Native dynamic import via Function
  // so tsc CommonJS emit does not rewrite import() to require().
  const manifoldJs = nodeRequire.resolve("manifold-3d/manifold.js");
  const dynamicImport = new Function("specifier", "return import(specifier)") as (
    specifier: string,
  ) => Promise<unknown>;
  const mod = (await dynamicImport(pathToFileURL(manifoldJs).href)) as {
    default?: () => Promise<ManifoldModule>;
  };
  const factory =
    typeof mod === "function" ? (mod as () => Promise<ManifoldModule>) : mod.default;
  if (typeof factory !== "function") {
    throw new Error("manifold-3d/manifold.js did not export a factory");
  }
  const wasm = await factory();
  wasm.setup();
  return wasm;
}

function rawToManifoldMesh(mesh: RawMesh): {
  numProp: number;
  vertProperties: Float32Array;
  triVerts: Uint32Array;
} {
  const vertProperties = new Float32Array(mesh.vertices.length);
  for (let i = 0; i < mesh.vertices.length; i++) {
    vertProperties[i] = mesh.vertices[i]!;
  }
  const triVerts = new Uint32Array(mesh.faces.length * 3);
  let o = 0;
  for (const f of mesh.faces) {
    triVerts[o++] = f[0]!;
    triVerts[o++] = f[1]!;
    triVerts[o++] = f[2]!;
  }
  return { numProp: 3, vertProperties, triVerts };
}

function manifoldMeshToRaw(mesh: {
  numProp: number;
  vertProperties: Float32Array;
  triVerts: Uint32Array;
}): RawMesh {
  const stride = mesh.numProp;
  const vertices = new Float64Array((mesh.vertProperties.length / stride) * 3);
  for (let i = 0, v = 0; i < mesh.vertProperties.length; i += stride, v += 3) {
    vertices[v] = mesh.vertProperties[i]!;
    vertices[v + 1] = mesh.vertProperties[i + 1]!;
    vertices[v + 2] = mesh.vertProperties[i + 2]!;
  }
  const faces: number[][] = [];
  for (let i = 0; i < mesh.triVerts.length; i += 3) {
    faces.push([mesh.triVerts[i]!, mesh.triVerts[i + 1]!, mesh.triVerts[i + 2]!]);
  }
  return { vertices, faces };
}

/**
 * Production geometry adapter. Uses manifold-3d WASM when available;
 * inspect/topology always use shared deterministic analyzers.
 */
export class ManifoldGeometryAdapter implements GeometryPort {
  private wasm: ManifoldModule | null = null;
  private initError: string | null = null;
  private initPromise: Promise<void> | null = null;

  async ensureReady(): Promise<void> {
    if (this.wasm) return;
    if (this.initError) {
      throw new Error(this.initError);
    }
    if (!this.initPromise) {
      this.initPromise = (async () => {
        try {
          this.wasm = await loadManifold();
        } catch (err) {
          this.initError = err instanceof Error ? err.message : String(err);
          this.initPromise = null;
          throw new Error(this.initError);
        }
      })();
    }
    await this.initPromise;
  }

  /** True when manifold-3d WASM module is loaded. */
  isReady(): boolean {
    return this.wasm !== null;
  }

  inspect(mesh: RawMesh): GeometryFacts {
    // Weld coincident vertices before topology (parity with trimesh process=True).
    const facts = topologyToFacts(analyzeTopology(prepareMeshForInspect(mesh)));
    if (!this.wasm) {
      facts.limitations = [
        ...facts.limitations,
        "manifold_wasm_not_initialized_for_inspect",
      ];
    }
    return facts;
  }

  async repair(mesh: RawMesh, plan: RepairPlan): Promise<RepairResult> {
    await this.ensureReady();
    const lightPlan: RepairPlan = { fillHoles: false };
    if (plan.mergeVertices !== undefined) {
      lightPlan.mergeVertices = plan.mergeVertices;
    }
    if (plan.removeDegenerate !== undefined) {
      lightPlan.removeDegenerate = plan.removeDegenerate;
    }
    const light = repairMeshLight(mesh, lightPlan);
    const operations = [...light.operations];

    if (plan.fillHoles && this.wasm) {
      try {
        const m = this.wasm.Manifold.ofMesh(rawToManifoldMesh(light.mesh));
        const out = m.getMesh();
        const repaired = manifoldMeshToRaw(out);
        m.delete();
        operations.push("manifold_ofMesh");
        const after = analyzeTopology(repaired);
        return {
          mesh: repaired,
          operations,
          issuesBefore: light.issuesBefore,
          issuesAfter: after.issues,
        };
      } catch {
        operations.push("fill_holes_skipped");
      }
    } else if (plan.fillHoles) {
      operations.push("fill_holes_skipped");
    }

    return { ...light, operations };
  }

  transform(mesh: RawMesh, plan: TransformPlan): RawMesh {
    return transformMesh(mesh, plan);
  }

  exportModel(mesh: RawMesh, format: OutputFormat): Uint8Array {
    if (format !== "stl-binary") {
      throw new Error("FORMAT_UNSUPPORTED");
    }
    return exportBinaryStl(mesh);
  }

  async dispose(): Promise<void> {
    this.wasm = null;
  }
}

/** Factory for production geometry path; fails closed if WASM cannot load. */
export async function createProductionGeometryAdapter(): Promise<ManifoldGeometryAdapter> {
  const adapter = new ManifoldGeometryAdapter();
  await adapter.ensureReady();
  if (!adapter.isReady()) {
    throw new Error("manifold-3d WASM failed to initialize");
  }
  return adapter;
}
