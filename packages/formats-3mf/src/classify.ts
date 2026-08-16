import type { ArchiveMemberKind } from "./types";

/**
 * Classify OPC/3MF archive members for preservation policy.
 * G-code and derived slice data must not be treated as valid after geometry changes.
 */
export function classifyArchiveMember(path: string): ArchiveMemberKind {
  const lower = path.replace(/\\/g, "/").toLowerCase();
  if (
    lower === "[content_types].xml" ||
    lower === "_rels/.rels" ||
    lower.endsWith(".model")
  ) {
    return "CORE_REQUIRED";
  }
  if (lower.includes("/_rels/") && lower.endsWith(".rels")) {
    return "CORE_OPTIONAL";
  }
  if (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.includes("thumbnail") ||
    lower.includes("preview")
  ) {
    return "THUMBNAIL";
  }
  if (
    lower.endsWith(".gcode") ||
    lower.includes("gcode") ||
    lower.endsWith(".gco") ||
    lower.includes("toolpath")
  ) {
    return "GCODE_OR_TOOLPATH";
  }
  if (
    lower.includes("slice_info") ||
    lower.includes("plate_") ||
    lower.includes("/Metadata/plate") ||
    lower.includes("pick_") ||
    lower.endsWith(".config") ||
    lower.includes("cut_information")
  ) {
    return "DERIVED_SLICE_DATA";
  }
  if (
    lower.includes("Metadata/") ||
    lower.includes("project_settings") ||
    lower.includes("model_settings") ||
    lower.includes("filament") ||
    lower.includes("printer") ||
    lower.includes("process_settings") ||
    lower.endsWith(".json") ||
    lower.endsWith(".xml")
  ) {
    return "VENDOR_CONFIGURATION";
  }
  if (lower.includes("..") || lower.startsWith("/") || /^[a-z]:/.test(lower)) {
    return "UNKNOWN_UNSAFE";
  }
  return "UNKNOWN_PRESERVE";
}
