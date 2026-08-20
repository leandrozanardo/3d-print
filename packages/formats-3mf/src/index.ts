export {
  openZipReadOnly,
  utf8FromBytes,
  DEFAULT_ZIP_LIMITS,
  isUnsafeEntryPath,
  type ZipOpenLimits,
  type ZipMember,
} from "./zip";

export {
  inspect3mf,
  DEFAULT_THREEMF_LIMITS,
  type ThreeMfInspectLimits,
  type ThreeMfInspectReport,
} from "./inspect";

export { parseModelXml, type ModelInspectFacts } from "./model";
export { assertSafeXmlText, parseSafeXml, estimateXmlDepth } from "./safeXml";

export { parseThreeMf, flattenThreeMf, canonicalToRawMesh } from "./parse";
export {
  resolveThreeMfInstances,
  type CanonicalMeshInstance,
  type ResolvedThreeMfInstances,
} from "./instances";
export { writeThreeMf } from "./write";
export { validateThreeMf } from "./validate";
export { threeMfPort, type ThreeMfPort } from "./port";
export { classifyArchiveMember } from "./classify";
export { parseUnit, unitToMillimeters, type ThreeMfUnit } from "./units";
export { parseTransformAttribute, composeTransforms, transformPoint } from "./transform";

export type {
  ArchiveMemberKind,
  CanonicalMesh,
  CanonicalScene,
  PreservationReport,
  ProductWarning,
  SourceMetadata,
  ThreeMfBuildItem,
  ThreeMfDocument,
  ThreeMfModelPart,
  ThreeMfObjectNode,
  ThreeMfParseOptions,
  ThreeMfValidationResult,
  ThreeMfWriteOptions,
} from "./types";
