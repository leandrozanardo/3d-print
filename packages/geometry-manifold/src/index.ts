/**
 * Default entry remains Node for Jest/CLI compatibility.
 * Browser consumers must import `@fix-my-print/geometry-manifold/browser`.
 */
export { ManifoldGeometryAdapter, createProductionGeometryAdapter } from "./node";
export {
  ManifoldGeometryAdapter as ManifoldGeometryAdapterBase,
  createAdapter,
  rawToManifoldMesh,
  manifoldMeshToRaw,
} from "./common";
