import type { Bounds } from "@fix-my-print/geometry";

import type { ThreeMfUnit } from "./units";

export type ArchiveMemberKind =
  | "CORE_REQUIRED"
  | "CORE_OPTIONAL"
  | "VENDOR_CONFIGURATION"
  | "THUMBNAIL"
  | "DERIVED_SLICE_DATA"
  | "GCODE_OR_TOOLPATH"
  | "UNKNOWN_PRESERVE"
  | "UNKNOWN_UNSAFE";

export interface ProductWarning {
  readonly code: string;
  readonly message: string;
}

export interface SourceMetadata {
  readonly fileName: string;
  readonly originalUnit: ThreeMfUnit;
  readonly memberCount: number;
  readonly objectCount: number;
  readonly buildItemCount: number;
  readonly modelPath: string;
}

export interface CanonicalMesh {
  readonly id: string;
  readonly name: string | null;
  readonly positions: Float64Array;
  readonly indices: Uint32Array;
}

export interface CanonicalScene {
  readonly unit: "millimeter";
  readonly meshes: readonly CanonicalMesh[];
  readonly bounds: Bounds;
  readonly sourceFormat: "3mf" | "stl";
  readonly sourceMetadata: SourceMetadata;
  readonly warnings: readonly ProductWarning[];
}

export interface ThreeMfObjectMesh {
  readonly objectId: string;
  readonly name: string | null;
  readonly positions: Float64Array;
  readonly indices: Uint32Array;
}

export interface ThreeMfComponentRef {
  readonly objectId: string;
  readonly transform: readonly number[];
}

export interface ThreeMfObjectNode {
  readonly objectId: string;
  readonly name: string | null;
  readonly mesh: ThreeMfObjectMesh | null;
  readonly components: readonly ThreeMfComponentRef[];
}

export interface ThreeMfBuildItem {
  readonly objectId: string;
  readonly transform: readonly number[];
}

export interface ThreeMfDocument {
  readonly unit: ThreeMfUnit;
  readonly modelPath: string;
  readonly members: readonly { path: string; kind: ArchiveMemberKind }[];
  readonly objects: ReadonlyMap<string, ThreeMfObjectNode>;
  readonly buildItems: readonly ThreeMfBuildItem[];
  readonly warnings: readonly ProductWarning[];
}

export interface PreservationReport {
  readonly preserved: readonly string[];
  readonly removed: readonly string[];
  readonly policy: string;
  readonly notes: readonly string[];
}

export interface ThreeMfParseOptions {
  readonly fileName?: string;
  readonly maxXmlBytes?: number;
  readonly maxXmlDepth?: number;
}

export interface ThreeMfWriteOptions {
  readonly objectName?: string;
  /** Deterministic ZIP timestamps (epoch seconds). */
  readonly mtimeSeconds?: number;
}

export interface ThreeMfValidationResult {
  readonly ok: boolean;
  readonly issues: readonly string[];
  readonly vertexCount?: number;
  readonly triangleCount?: number;
  readonly unit?: string;
  readonly hasModel: boolean;
  readonly hasContentTypes: boolean;
  readonly hasRelationships: boolean;
}
