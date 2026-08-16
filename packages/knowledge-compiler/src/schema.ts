/**
 * Controlled vocabularies and required front-matter fields for wiki pages.
 * Ported from core/wiki_schema.py and core/wiki_contract.py.
 */

export const KNOWLEDGE_STATUS = new Set([
  "planned",
  "draft",
  "reviewed",
  "verified",
  "deprecated",
  "archived",
]);

export const EVIDENCE_STATUS = new Set([
  "strong",
  "mixed",
  "limited",
  "manufacturer-specific",
  "experimental",
  "unknown",
]);

export const CONFIDENCE = new Set(["high", "medium", "low", "unknown"]);

export const SAFETY_LEVEL = new Set(["normal", "caution", "high", "critical"]);

export const PRINTER_LIFECYCLE = new Set([
  "announced",
  "preorder",
  "current",
  "region-limited",
  "discontinued",
  "legacy-supported",
  "unsupported",
  "unknown",
]);

export const COVERAGE_LEVEL = new Set([
  "discovered",
  "cataloged",
  "documented",
  "troubleshooting-mapped",
  "review-ready",
  "reviewed",
  "verified",
]);

export const CORE_REQUIRED_FIELDS = [
  "id",
  "title",
  "summary",
  "doc_type",
  "domain",
  "knowledge_status",
  "evidence_status",
  "safety_level",
  "confidence",
  "last_reviewed",
  "review_cycle",
] as const;

export const LIST_FIELDS_REQUIRED = [
  "technology",
  "process",
  "applies_to",
  "not_for",
  "sources",
  "related",
  "prerequisites",
  "supersedes",
  "aliases_pt_br",
  "aliases_en",
  "tags",
] as const;

export const RELAXED_DOC_TYPES = new Set([
  "policy",
  "audit",
  "log",
  "continuation",
  "coverage",
  "plan",
  "guide",
]);

export const DOC_TYPES = new Set([
  "hub",
  "guide",
  "policy",
  "audit",
  "log",
  "continuation",
  "coverage",
  "plan",
  "technology",
  "material",
  "printer",
  "component",
  "setting",
  "troubleshooting",
  "calibration",
  "scenario",
  "research",
  "source",
  "glossary",
  "concept",
  "architecture",
  "design",
  "process",
  "safety",
  "slicer",
  "firmware",
  "manufacturer",
  "catalog",
  "decision-log",
  "map",
]);

export const HARD_ABSOLUTE_PATTERNS = [
  String.raw`\b100%\s*seguro\b`,
  String.raw`\btotalmente\s+seguro\b`,
  String.raw`\bcompletely\s+safe\b`,
  String.raw`\bguaranteed\b`,
] as const;

export const SOFT_ABSOLUTE_PATTERNS = [
  String.raw`\bsempre\b`,
  String.raw`\bnunca\b`,
  String.raw`\balways\b`,
  String.raw`\bnever\b`,
  String.raw`\bgarantido\b`,
  String.raw`\bgarantia\b`,
] as const;

export const TECH_NUMBER_PATTERNS = [
  String.raw`\b\d+(?:[.,]\d+)?\s*°\s*C\b`,
  String.raw`\b\d+(?:[.,]\d+)?\s*mm/s\b`,
  String.raw`\b\d+(?:[.,]\d+)?\s*mm/s²\b`,
  String.raw`\b\d+(?:[.,]\d+)?\s*mm\b`,
  String.raw`\b\d+(?:[.,]\d+)?\s*%\b`,
] as const;

/** Paths under docs/ that are not part of the canonical semantic corpus. */
export const LEGACY_PREFIXES = [
  "projeto/",
  "ebook/",
  "printers/",
  "_arquivo/",
  "superpowers/",
] as const;

export const NON_CORPUS_FILES = new Set(["context.md"]);

export const SOURCE_TYPES = new Set([
  "official-product-page",
  "official-technical-specification",
  "official-user-manual",
  "official-service-manual",
  "official-maintenance-guide",
  "official-safety-notice",
  "official-recall",
  "official-firmware-release-note",
  "official-software-release-note",
  "official-knowledge-base",
  "official-source-code",
  "standard",
  "regulatory-guidance",
  "sds",
  "tds",
  "primary-research",
  "systematic-review",
  "controlled-experiment",
  "technical-method",
  "official-forum",
  "community-report",
  "discovery-only",
  "manufacturer-product-listing",
  "unknown",
]);

export const ID_REFERENCE_FIELDS = [
  "sources",
  "related",
  "prerequisites",
  "supersedes",
  "materials",
  "printers",
  "slicers",
  "settings",
  "symptoms",
  "causes",
  "tests",
  "fixes",
  "hazards",
  "components",
  "firmware",
  "manufacturers",
  "families",
  "revisions",
] as const;

export const PRINTER_REQUIRED_FIELDS = [
  "manufacturer_id",
  "model_name",
  "aliases_pt_br",
  "aliases_en",
  "regions",
  "lifecycle",
  "lifecycle_observed_at",
  "availability_evidence",
  "coverage_level",
  "technology",
  "process",
  "knowledge_status",
  "evidence_status",
  "confidence",
  "last_reviewed",
  "review_cycle",
  "sources",
  "related",
  "prerequisites",
  "supersedes",
  "tags",
] as const;

export const DOCUMENTED_DOD_MARKERS = [
  "## Identidade",
  "## Lifecycle",
  "## Especificações",
  "## Tecnologia",
  "## Manuais",
  "## Hardware",
  "## Software",
  "## Firmware",
  "## Slicer",
  "## Materiais",
  "## Manutenção",
  "## Segurança",
  "## Known issues",
  "## Fontes",
  "## Lacunas",
] as const;

export const REVIEW_CYCLES = new Set([
  "1-month",
  "3-months",
  "6-months",
  "12-months",
  "per-batch",
  "on-change",
]);

export const SUMMARY_MIN = 40;
export const SUMMARY_MAX = 600;

/** Normalize a front-matter list field; null if type is invalid. */
export function asStrList(value: unknown): string[] | null {
  if (value === null || value === undefined) {
    return [];
  }
  if (Array.isArray(value)) {
    const out: string[] = [];
    for (const item of value) {
      if (item === null || item === undefined) {
        continue;
      }
      if (typeof item !== "string" && typeof item !== "number") {
        return null;
      }
      out.push(String(item).trim());
    }
    return out;
  }
  if (typeof value === "string") {
    const text = value.trim();
    return text ? [text] : [];
  }
  return null;
}

/** Return required field names for a doc_type. */
export function requiredFieldsFor(docType: string): string[] {
  const base: string[] = [...CORE_REQUIRED_FIELDS];
  if (!RELAXED_DOC_TYPES.has(docType)) {
    base.push(...LIST_FIELDS_REQUIRED);
  } else if (docType === "guide" || docType === "policy") {
    base.push("related", "tags");
  }
  return base;
}
