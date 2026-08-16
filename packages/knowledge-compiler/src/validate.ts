/**
 * Enterprise semantic validation for the wiki corpus.
 * Ported from core/wiki_validate.py.
 */

import * as fs from "node:fs";
import * as path from "node:path";

import {
  FrontMatterError,
  parseMarkdownDocument,
  type ParsedDocument,
} from "./frontmatter";
import {
  LINK_RE,
  SKIP_SCHEMES,
  requireDirectory,
  validateWikiLinks,
  walkMarkdownFiles,
} from "./links";
import {
  COVERAGE_LEVEL,
  CONFIDENCE,
  DOC_TYPES,
  DOCUMENTED_DOD_MARKERS,
  EVIDENCE_STATUS,
  HARD_ABSOLUTE_PATTERNS,
  ID_REFERENCE_FIELDS,
  KNOWLEDGE_STATUS,
  LEGACY_PREFIXES,
  NON_CORPUS_FILES,
  PRINTER_LIFECYCLE,
  PRINTER_REQUIRED_FIELDS,
  REVIEW_CYCLES,
  SAFETY_LEVEL,
  SOFT_ABSOLUTE_PATTERNS,
  SOURCE_TYPES,
  SUMMARY_MAX,
  SUMMARY_MIN,
  TECH_NUMBER_PATTERNS,
  asStrList,
  requiredFieldsFor,
} from "./schema";

const HEADING_RE = /^(#{1,6})\s+(.+?)\s*$/gm;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EVIDENCE_NEAR_RE =
  /(source\.|fonte|sources:|TDS|SDS|fabricante|manufacturer|oficial|spec|heurística|heuristic|preset|validar|Ellis|Teaching\s*Tech|Bambu)/i;

export interface ValidationIssue {
  code: string;
  message: string;
  path: string | null;
  severity: "error" | "warning";
  field: string | null;
  entityId: string | null;
}

export interface WikiValidationResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
  issues: Array<Record<string, unknown>>;
  stats: Record<string, unknown>;
  summaryByCode: Record<string, number>;
}

function formatIssue(issue: ValidationIssue): string {
  const loc = issue.path ? `${issue.path}: ` : "";
  return `[${issue.code}] ${loc}${issue.message}`;
}

function issueToDict(issue: ValidationIssue): Record<string, unknown> {
  return {
    code: issue.code,
    severity: issue.severity,
    path: issue.path,
    field: issue.field,
    id: issue.entityId,
    message: issue.message,
  };
}

function relPath(root: string, filePath: string): string {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function isLegacy(rel: string): boolean {
  return LEGACY_PREFIXES.some((p) => rel.startsWith(p));
}

function isCanonical(rel: string): boolean {
  if (NON_CORPUS_FILES.has(rel)) {
    return false;
  }
  return !isLegacy(rel);
}

function slugifyHeading(text: string): string {
  let t = text.trim().toLowerCase();
  t = t.replace(/[^\p{L}\p{N}\s-]/gu, "");
  t = t.replace(/\s+/g, "-");
  return t.replace(/^-+|-+$/g, "");
}

function parseDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(
      Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()),
    );
  }
  if (typeof value === "string" && DATE_RE.test(value.trim())) {
    const [y, m, d] = value.trim().split("-").map(Number);
    if (y === undefined || m === undefined || d === undefined) {
      return null;
    }
    return new Date(Date.UTC(y, m - 1, d));
  }
  return null;
}

function cycleMonths(cycle: string): number | null {
  const mapping: Record<string, number> = {
    "1-month": 1,
    "3-months": 3,
    "6-months": 6,
    "12-months": 12,
  };
  return mapping[cycle] ?? null;
}

function addMonths(d: Date, months: number): Date {
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const day = d.getUTCDate();
  const total = month + months;
  const newYear = year + Math.floor(total / 12);
  const newMonth = ((total % 12) + 12) % 12;
  const daysInMonth = [
    31,
    newYear % 4 === 0 && (newYear % 100 !== 0 || newYear % 400 === 0) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const maxDay = daysInMonth[newMonth] ?? 28;
  return new Date(Date.UTC(newYear, newMonth, Math.min(day, maxDay)));
}

function collectAnchors(body: string): Set<string> {
  const anchors = new Set<string>();
  HEADING_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = HEADING_RE.exec(body)) !== null) {
    anchors.add(slugifyHeading(match[2] ?? ""));
  }
  const idRe = /id=["']([^"']+)["']/g;
  let idMatch: RegExpExecArray | null;
  while ((idMatch = idRe.exec(body)) !== null) {
    anchors.add(idMatch[1] ?? "");
  }
  return anchors;
}

function startswithScheme(target: string): boolean {
  return SKIP_SCHEMES.some((s) => target.startsWith(s));
}

class WikiValidator {
  readonly root: string;
  readonly strict: boolean;
  readonly today: Date;
  readonly issues: ValidationIssue[] = [];
  readonly docs = new Map<string, ParsedDocument>();
  readonly idToRel = new Map<string, string>();
  readonly relToId = new Map<string, string>();
  readonly prereqGraph = new Map<string, string[]>();
  readonly bodyByRel = new Map<string, string>();
  readonly anchorsByRel = new Map<string, Set<string>>();
  readonly inboundLinks = new Map<string, Set<string>>();
  readonly fmByRel = new Map<string, Record<string, unknown>>();

  constructor(root: string, options: { strict?: boolean; today?: Date }) {
    this.root = requireDirectory(root);
    this.strict = options.strict ?? false;
    this.today = options.today ?? new Date();
  }

  error(
    code: string,
    message: string,
    filePath: string | null = null,
    extra?: { field?: string; entityId?: string },
  ): void {
    this.issues.push({
      code,
      message,
      path: filePath,
      severity: "error",
      field: extra?.field ?? null,
      entityId: extra?.entityId ?? null,
    });
  }

  warning(
    code: string,
    message: string,
    filePath: string | null = null,
    extra?: { field?: string; entityId?: string },
  ): void {
    this.issues.push({
      code,
      message,
      path: filePath,
      severity: "warning",
      field: extra?.field ?? null,
      entityId: extra?.entityId ?? null,
    });
  }

  run(): WikiValidationResult {
    const mdFiles = walkMarkdownFiles(this.root);
    for (const err of validateWikiLinks(this.root)) {
      this.error("broken_link", err);
    }

    const canonicalFiles = mdFiles.filter((p) => isCanonical(relPath(this.root, p)));
    this.loadDocuments(canonicalFiles);
    this.checkFrontMatterContracts();
    this.checkIdReferences();
    this.checkPrereqCycles();
    this.checkDeprecatedRefs();
    this.checkAnchors();
    this.checkOrphans();
    this.checkAbsoluteLanguage();
    this.checkNumericClaims();
    this.checkPrinterRules();
    this.checkSourcePages();
    this.checkAliases();

    const structured = this.issues.map(issueToDict);
    const errors = this.issues
      .filter((i) => i.severity === "error")
      .map(formatIssue)
      .sort();
    const warnings = this.issues
      .filter((i) => i.severity === "warning")
      .map(formatIssue)
      .sort();
    const summary: Record<string, number> = {};
    for (const issue of this.issues) {
      summary[issue.code] = (summary[issue.code] ?? 0) + 1;
    }
    const summaryByCode = Object.fromEntries(
      Object.entries(summary).sort(([a], [b]) => a.localeCompare(b)),
    );

    return {
      ok: errors.length === 0,
      errors,
      warnings,
      issues: structured,
      stats: {
        canonical_pages: canonicalFiles.length,
        pages_with_front_matter: this.fmByRel.size,
        unique_ids: this.idToRel.size,
        strict: this.strict,
        error_count: errors.length,
        warning_count: warnings.length,
      },
      summaryByCode,
    };
  }

  private loadDocuments(files: string[]): void {
    for (const filePath of files) {
      const rel = relPath(this.root, filePath);
      let doc: ParsedDocument;
      try {
        doc = parseMarkdownDocument(filePath);
      } catch (err) {
        if (err instanceof FrontMatterError) {
          this.error("yaml_parse", err.message, rel);
          continue;
        }
        this.error("read_failed", err instanceof Error ? err.message : String(err), rel);
        continue;
      }

      this.docs.set(rel, doc);
      this.bodyByRel.set(rel, doc.body);
      this.anchorsByRel.set(rel, collectAnchors(doc.body));

      if (doc.hasBom) {
        this.error(
          "utf8_bom",
          "file starts with UTF-8 BOM; strip BOM for deterministic parsing",
          rel,
        );
      }

      if (doc.frontMatter === null) {
        this.error(
          "missing_front_matter",
          "canonical page missing YAML front matter",
          rel,
        );
        continue;
      }

      const fm = doc.frontMatter;
      this.fmByRel.set(rel, fm);
      const pageIdRaw = fm["id"];
      if (typeof pageIdRaw !== "string" || !pageIdRaw.trim()) {
        this.error("missing_id", "front matter missing non-empty id", rel);
        continue;
      }
      const pageId = pageIdRaw.trim();
      if (this.idToRel.has(pageId)) {
        this.error(
          "duplicate_id",
          `duplicate id '${pageId}' also in ${this.idToRel.get(pageId)}`,
          rel,
        );
      } else {
        this.idToRel.set(pageId, rel);
        this.relToId.set(rel, pageId);
      }
    }
  }

  private checkEnum(
    rel: string,
    fm: Record<string, unknown>,
    key: string,
    allowed: Set<string>,
  ): void {
    if (!(key in fm)) {
      return;
    }
    const value = fm[key];
    if (typeof value !== "string" || !allowed.has(value)) {
      const sorted = [...allowed].sort();
      this.error(
        "invalid_enum",
        `${key}=${JSON.stringify(value)} not in ${JSON.stringify(sorted)}`,
        rel,
      );
    }
  }

  private checkFrontMatterContracts(): void {
    for (const [rel, fm] of this.fmByRel) {
      const docType = fm["doc_type"];
      let docTypeKey = "";
      if (typeof docType !== "string" || !DOC_TYPES.has(docType)) {
        this.error(
          "invalid_doc_type",
          `doc_type must be one of controlled set; got ${JSON.stringify(docType)}`,
          rel,
        );
        docTypeKey = docType !== undefined && docType !== null ? String(docType) : "";
      } else {
        docTypeKey = docType;
      }

      const required = requiredFieldsFor(DOC_TYPES.has(docTypeKey) ? docTypeKey : "hub");
      for (const key of required) {
        if (!(key in fm)) {
          this.error("missing_field", `required field '${key}' missing`, rel);
        }
      }

      this.checkEnum(rel, fm, "knowledge_status", KNOWLEDGE_STATUS);
      this.checkEnum(rel, fm, "evidence_status", EVIDENCE_STATUS);
      this.checkEnum(rel, fm, "confidence", CONFIDENCE);
      this.checkEnum(rel, fm, "safety_level", SAFETY_LEVEL);

      for (const listKey of [
        "domain",
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
      ]) {
        if (listKey in fm && asStrList(fm[listKey]) === null) {
          this.error(
            "invalid_list_field",
            `field '${listKey}' must be a list of scalars`,
            rel,
          );
        }
      }

      const summary = fm["summary"];
      if (typeof summary === "string") {
        const length = summary.trim().length;
        if (length < SUMMARY_MIN) {
          this.error(
            "summary_too_short",
            `summary length ${length} < ${SUMMARY_MIN}`,
            rel,
          );
        } else if (length > SUMMARY_MAX) {
          this.warning(
            "summary_too_long",
            `summary length ${length} > ${SUMMARY_MAX}`,
            rel,
          );
        }
      } else if ("summary" in fm) {
        this.error("invalid_summary", "summary must be a string", rel);
      }

      const reviewed = parseDate(fm["last_reviewed"]);
      if ("last_reviewed" in fm && reviewed === null) {
        this.error("invalid_date", "last_reviewed must be YYYY-MM-DD", rel);
      }

      const cycle = fm["review_cycle"];
      if (typeof cycle === "string") {
        if (
          !REVIEW_CYCLES.has(cycle) &&
          !cycle.endsWith("-months") &&
          cycle !== "per-batch" &&
          cycle !== "on-change"
        ) {
          this.warning(
            "unknown_review_cycle",
            `unrecognized review_cycle '${cycle}'`,
            rel,
          );
        }
        const months = cycleMonths(cycle);
        if (reviewed !== null && months !== null) {
          const due = addMonths(reviewed, months);
          if (due.getTime() < this.today.getTime()) {
            this.error(
              "review_cycle_overdue",
              `review overdue (last_reviewed=${reviewed.toISOString().slice(0, 10)}, cycle=${cycle})`,
              rel,
            );
          }
        }
      } else if ("review_cycle" in fm && cycle !== null && cycle !== undefined) {
        this.error("invalid_review_cycle", "review_cycle must be a string", rel);
      }

      const ks = fm["knowledge_status"];
      if (ks === "reviewed" || ks === "verified") {
        const reviewer = fm["reviewed_by"];
        const author = fm["authored_by"] ?? fm["author"];
        if (typeof reviewer !== "string" || !reviewer.trim()) {
          this.error(
            "invalid_promotion",
            `knowledge_status '${String(ks)}' requires reviewed_by (independent reviewer)`,
            rel,
          );
        } else if (
          typeof author === "string" &&
          author.trim() &&
          author.trim() === reviewer.trim()
        ) {
          this.error(
            "invalid_promotion",
            `knowledge_status '${String(ks)}' cannot have reviewed_by equal to author`,
            rel,
          );
        }
      }

      const coverage = fm["coverage_level"];
      if (coverage !== undefined && coverage !== null) {
        if (typeof coverage !== "string" || !COVERAGE_LEVEL.has(coverage)) {
          this.error(
            "invalid_coverage_level",
            `invalid coverage_level '${String(coverage)}'`,
            rel,
          );
        } else {
          const sources = asStrList(fm["sources"]) ?? [];
          if (
            [
              "cataloged",
              "documented",
              "troubleshooting-mapped",
              "review-ready",
              "reviewed",
              "verified",
            ].includes(coverage) &&
            sources.length === 0
          ) {
            this.error(
              "coverage_without_evidence",
              `coverage_level '${coverage}' requires non-empty sources`,
              rel,
              { field: "coverage_level" },
            );
          }
          if (["cataloged", "documented", "troubleshooting-mapped"].includes(coverage)) {
            if (!(asStrList(fm["regions"]) ?? []).length) {
              this.error(
                "cataloged_without_region",
                `coverage_level '${coverage}' requires non-empty regions`,
                rel,
                { field: "regions" },
              );
            }
            const evidence = fm["availability_evidence"];
            if (
              typeof evidence !== "string" ||
              !evidence.trim() ||
              evidence.trim() === "unknown"
            ) {
              this.error(
                "cataloged_without_evidence",
                `coverage_level '${coverage}' requires concrete availability_evidence`,
                rel,
                { field: "availability_evidence" },
              );
            }
          }
          if (
            [
              "documented",
              "troubleshooting-mapped",
              "review-ready",
              "reviewed",
              "verified",
            ].includes(coverage)
          ) {
            const body = this.bodyByRel.get(rel) ?? "";
            const missing = DOCUMENTED_DOD_MARKERS.filter((m) => !body.includes(m));
            if (missing.length > 0) {
              this.error(
                "documented_without_dod",
                `documented+ coverage requires DoD body sections; missing: ${missing.slice(0, 5).join(", ")}`,
                rel,
                { field: "coverage_level" },
              );
            }
          }
        }
      }
    }
  }

  private checkIdReferences(): void {
    for (const [rel, fm] of this.fmByRel) {
      const pageId = this.relToId.get(rel);
      for (const fieldName of ID_REFERENCE_FIELDS) {
        if (!(fieldName in fm)) {
          continue;
        }
        const values = asStrList(fm[fieldName]) ?? [];
        for (const ref of values) {
          if (!ref) {
            continue;
          }
          if (!this.idToRel.has(ref)) {
            this.error(
              "unresolved_id",
              `${fieldName} references unknown id '${ref}'`,
              rel,
              {
                field: fieldName,
                entityId: ref,
              },
            );
          } else if (fieldName === "prerequisites" && pageId) {
            const list = this.prereqGraph.get(pageId) ?? [];
            list.push(ref);
            this.prereqGraph.set(pageId, list);
          }
        }
      }

      const body = this.bodyByRel.get(rel) ?? "";
      LINK_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = LINK_RE.exec(body)) !== null) {
        const raw = match[2] ?? "";
        const target = raw.trim().replace(/^<|>$/g, "").trim();
        if (!target || startswithScheme(target) || target.startsWith("#")) {
          continue;
        }
        const pathPart = target.split("#", 1)[0]?.split("?", 1)[0] ?? "";
        if (!pathPart) {
          continue;
        }
        const resolved = path.resolve(path.dirname(path.join(this.root, rel)), pathPart);
        let targetRel: string;
        try {
          targetRel = relPath(this.root, resolved);
          if (targetRel.startsWith("..")) {
            continue;
          }
        } catch {
          continue;
        }
        if (targetRel.endsWith(".md")) {
          const inbound = this.inboundLinks.get(targetRel) ?? new Set<string>();
          inbound.add(rel);
          this.inboundLinks.set(targetRel, inbound);
        }
      }
    }
  }

  private checkPrereqCycles(): void {
    const visiting = new Set<string>();
    const visited = new Set<string>();
    const stack: string[] = [];

    const dfs = (node: string): void => {
      if (visited.has(node)) {
        return;
      }
      if (visiting.has(node)) {
        const cycleStart = stack.indexOf(node);
        const cycle = [...stack.slice(cycleStart >= 0 ? cycleStart : 0), node].join(
          " -> ",
        );
        this.error("prereq_cycle", `prerequisites cycle: ${cycle}`);
        return;
      }
      visiting.add(node);
      stack.push(node);
      for (const nxt of this.prereqGraph.get(node) ?? []) {
        dfs(nxt);
      }
      stack.pop();
      visiting.delete(node);
      visited.add(node);
    };

    for (const node of this.prereqGraph.keys()) {
      dfs(node);
    }
  }

  private ksOf(ref: string): string {
    const rel = this.idToRel.get(ref);
    if (!rel) {
      return "unknown";
    }
    return String(this.fmByRel.get(rel)?.["knowledge_status"] ?? "unknown");
  }

  private checkDeprecatedRefs(): void {
    const deprecatedIds = new Set<string>();
    for (const [pid, rel] of this.idToRel) {
      const ks = this.fmByRel.get(rel)?.["knowledge_status"];
      if (ks === "deprecated" || ks === "archived") {
        deprecatedIds.add(pid);
      }
    }
    for (const [rel, fm] of this.fmByRel) {
      const ks = fm["knowledge_status"];
      if (ks === "deprecated" || ks === "archived") {
        continue;
      }
      for (const fieldName of ["related", "prerequisites", "sources"] as const) {
        for (const ref of asStrList(fm[fieldName]) ?? []) {
          if (deprecatedIds.has(ref)) {
            this.error(
              "deprecated_reference",
              `${fieldName} references ${this.ksOf(ref)} id '${ref}' without supersedes migration context`,
              rel,
            );
          }
        }
      }
    }
  }

  private checkAnchors(): void {
    for (const [rel, body] of this.bodyByRel) {
      LINK_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = LINK_RE.exec(body)) !== null) {
        const raw = match[2] ?? "";
        const target = raw.trim().replace(/^<|>$/g, "").trim();
        if (!target || startswithScheme(target)) {
          continue;
        }
        if (!target.includes("#")) {
          continue;
        }
        const [pathPartRaw, anchorRaw] = target.split("#", 2);
        const pathPart = pathPartRaw ?? "";
        const anchor = (anchorRaw ?? "").trim();
        if (!anchor) {
          continue;
        }
        if (!pathPart) {
          const anchors = this.anchorsByRel.get(rel) ?? new Set();
          if (!anchors.has(anchor) && !anchors.has(slugifyHeading(anchor))) {
            this.error("broken_anchor", `broken in-page anchor #${anchor}`, rel);
          }
          continue;
        }
        const resolved = path.resolve(path.dirname(path.join(this.root, rel)), pathPart);
        let targetRel: string;
        try {
          targetRel = relPath(this.root, resolved);
          if (targetRel.startsWith("..")) {
            continue;
          }
        } catch {
          continue;
        }
        if (!this.anchorsByRel.has(targetRel)) {
          continue;
        }
        const anchors = this.anchorsByRel.get(targetRel)!;
        if (!anchors.has(anchor) && !anchors.has(slugifyHeading(anchor))) {
          this.error("broken_anchor", `broken anchor -> ${target}`, rel);
        }
      }
    }
  }

  private checkOrphans(): void {
    const roots = new Set([
      "INDEX.md",
      "AGENT_GUIDE.md",
      "_meta/INDEX.md",
      "_meta/continuacao.md",
      "_meta/cobertura.md",
      "_meta/fila-de-trabalho.md",
    ]);
    for (const rel of this.fmByRel.keys()) {
      if (roots.has(rel)) {
        continue;
      }
      if (rel.startsWith("_meta/")) {
        if (rel !== "_meta/INDEX.md" && !this.inboundLinks.get(rel)?.size) {
          this.warning("possible_orphan", "no inbound relative links found", rel);
        }
        continue;
      }
      if (!this.inboundLinks.get(rel)?.size) {
        if (rel.endsWith("/INDEX.md") || rel.endsWith("\\INDEX.md")) {
          continue;
        }
        this.error(
          "orphan_page",
          "canonical page has no inbound relative Markdown links",
          rel,
        );
      }
    }
  }

  private checkAbsoluteLanguage(): void {
    const hard = HARD_ABSOLUTE_PATTERNS.map((p) => new RegExp(p, "i"));
    const soft = SOFT_ABSOLUTE_PATTERNS.map((p) => new RegExp(p, "i"));
    const hedge =
      /(exceto|salvo|não\s+significa|condicional|quando|unless|except|not\s+always|imperativo|proibid|safety|segurança|pare|stop)/i;
    const skipDoc = new Set(["policy", "audit", "guide", "research", "myth"]);

    for (const [rel, body] of this.bodyByRel) {
      const fm = this.fmByRel.get(rel) ?? {};
      const docType = fm["doc_type"];
      if (typeof docType === "string" && skipDoc.has(docType)) {
        continue;
      }
      if (rel.includes("mito-") || docType === "research") {
        continue;
      }
      const safety = fm["safety_level"];
      for (const pattern of hard) {
        pattern.lastIndex = 0;
        const match = pattern.exec(body);
        if (!match) {
          continue;
        }
        const start = Math.max(0, match.index - 80);
        const end = Math.min(body.length, match.index + match[0].length + 80);
        const window = body.slice(start, end);
        if (hedge.test(window) || window.includes("Absolutos indevidos")) {
          continue;
        }
        this.error(
          "absolute_claim",
          `improper absolute certainty near '${match[0]}'`,
          rel,
        );
        break;
      }
      for (const pattern of soft) {
        pattern.lastIndex = 0;
        const match = pattern.exec(body);
        if (!match) {
          continue;
        }
        const start = Math.max(0, match.index - 80);
        const end = Math.min(body.length, match.index + match[0].length + 80);
        const window = body.slice(start, end);
        if (hedge.test(window) || window.includes("Absolutos indevidos")) {
          continue;
        }
        if (window.includes("sempre/nunca") || window.includes("sempre|")) {
          continue;
        }
        const token = match[0].toLowerCase();
        if (
          (safety === "caution" || safety === "high" || safety === "critical") &&
          ["nunca", "never", "sempre", "always"].includes(token)
        ) {
          continue;
        }
        this.warning(
          "absolute_language",
          `absolute language without hedge near '${match[0]}'`,
          rel,
        );
        break;
      }
    }
  }

  private checkNumericClaims(): void {
    const compiled = TECH_NUMBER_PATTERNS.map((p) => new RegExp(p));
    for (const [rel, body] of this.bodyByRel) {
      const fm = this.fmByRel.get(rel) ?? {};
      const sources = asStrList(fm["sources"]) ?? [];
      if (
        typeof fm["doc_type"] === "string" &&
        [
          "source",
          "policy",
          "audit",
          "coverage",
          "continuation",
          "log",
          "hub",
          "map",
          "decision-log",
          "guide",
        ].includes(fm["doc_type"])
      ) {
        continue;
      }
      for (const pattern of compiled) {
        pattern.lastIndex = 0;
        const match = pattern.exec(body);
        if (!match) {
          continue;
        }
        const start = Math.max(0, match.index - 120);
        const end = Math.min(body.length, match.index + match[0].length + 120);
        const window = body.slice(start, end);
        if (EVIDENCE_NEAR_RE.test(window)) {
          continue;
        }
        if (sources.length === 0) {
          this.error(
            "numeric_without_evidence",
            `technical number '${match[0]}' on page with empty/missing sources`,
            rel,
          );
        } else {
          this.warning(
            "numeric_without_nearby_citation",
            `technical number '${match[0]}' lacks nearby source cue`,
            rel,
          );
        }
        break;
      }
    }
  }

  private checkPrinterRules(): void {
    for (const [rel, fm] of this.fmByRel) {
      if (fm["doc_type"] !== "printer") {
        continue;
      }
      for (const key of PRINTER_REQUIRED_FIELDS) {
        if (!(key in fm)) {
          this.error("missing_printer_field", `printer requires '${key}'`, rel, {
            field: key,
          });
        }
      }
      if (
        !("family_id" in fm) &&
        fm["family_status"] !== "unknown" &&
        fm["family_status"] !== "n/a" &&
        fm["family_status"] !== "pending"
      ) {
        if (!("family_status" in fm)) {
          this.error(
            "missing_printer_field",
            "printer requires family_id or family_status",
            rel,
            { field: "family_status" },
          );
        }
      }

      const lifecycle = fm["lifecycle"] ?? fm["lifecycle_status"];
      if (lifecycle !== undefined && lifecycle !== null) {
        if (typeof lifecycle !== "string" || !PRINTER_LIFECYCLE.has(lifecycle)) {
          this.error(
            "invalid_lifecycle",
            `printer lifecycle '${String(lifecycle)}' not in controlled set`,
            rel,
            { field: "lifecycle" },
          );
        }
        if (lifecycle === "current") {
          const regions = asStrList(fm["regions"]) ?? [];
          const evidence = fm["availability_evidence"];
          const observed = fm["lifecycle_observed_at"];
          if (!regions.length || (regions.length === 1 && regions[0] === "unknown")) {
            this.error(
              "current_without_region",
              "lifecycle current requires documented regions",
              rel,
              { field: "regions" },
            );
          }
          if (
            typeof evidence !== "string" ||
            !evidence.trim() ||
            evidence.trim() === "unknown" ||
            evidence.trim() === "pending-revalidation"
          ) {
            this.error(
              "current_without_evidence",
              "lifecycle current requires concrete availability_evidence",
              rel,
              { field: "availability_evidence" },
            );
          }
          if (parseDate(observed) === null) {
            this.error(
              "current_without_observation_date",
              "lifecycle current requires lifecycle_observed_at YYYY-MM-DD",
              rel,
              { field: "lifecycle_observed_at" },
            );
          }
        }
      }

      const mfr = fm["manufacturer_id"];
      if (typeof mfr === "string" && mfr.trim()) {
        const mfrId = mfr.startsWith("manufacturer.") ? mfr : `manufacturer.${mfr}`;
        if (!this.idToRel.has(mfrId) && !this.idToRel.has(mfr)) {
          this.error("unresolved_id", `manufacturer_id '${mfr}' does not resolve`, rel, {
            field: "manufacturer_id",
            entityId: mfr,
          });
        }
      }
    }
  }

  private checkSourcePages(): void {
    for (const [rel, fm] of this.fmByRel) {
      if (fm["doc_type"] !== "source") {
        continue;
      }
      if (!("title" in fm)) {
        this.error("incomplete_source_page", "source page missing 'title'", rel, {
          field: "title",
        });
      }
      const body = this.bodyByRel.get(rel) ?? "";
      const hasUrl = /https?:\/\//.test(body) || /\bURL\b/.test(body);
      if (!hasUrl) {
        this.error("incomplete_source_page", "source page body missing URL field", rel);
      }
      if (
        !body.toLowerCase().includes("data de acesso") &&
        !body.toLowerCase().includes("accessed")
      ) {
        this.error("incomplete_source_page", "source page missing access date", rel);
      }
      for (const key of [
        "source_type",
        "language",
        "version",
        "last_verified",
      ] as const) {
        if (!(key in fm)) {
          this.warning(
            "incomplete_source_metadata",
            `source page missing front-matter '${key}'`,
            rel,
            { field: key },
          );
        }
      }
      const st = fm["source_type"];
      if (
        st !== undefined &&
        st !== null &&
        (typeof st !== "string" || !SOURCE_TYPES.has(st))
      ) {
        this.error(
          "invalid_source_type",
          `source_type '${String(st)}' not in controlled set`,
          rel,
          {
            field: "source_type",
          },
        );
      }
    }
  }

  private checkAliases(): void {
    const aliasIndex = new Map<string, string[]>();
    for (const [rel, fm] of this.fmByRel) {
      const pageId = this.relToId.get(rel) ?? rel;
      for (const key of ["aliases_pt_br", "aliases_en"] as const) {
        for (const alias of asStrList(fm[key]) ?? []) {
          const norm = alias.trim().toLowerCase();
          if (!norm) {
            continue;
          }
          const owners = aliasIndex.get(norm) ?? [];
          owners.push(pageId);
          aliasIndex.set(norm, owners);
        }
      }
    }
    for (const [alias, owners] of aliasIndex) {
      const unique = [...new Set(owners)].sort();
      if (unique.length > 1) {
        this.warning(
          "inconsistent_alias",
          `alias '${alias}' shared by multiple ids: ${unique.join(", ")}`,
        );
      }
    }
  }
}

export function validateWiki(
  root: string,
  options?: { strict?: boolean; failOnWarnings?: boolean; today?: Date },
): WikiValidationResult {
  const strict = options?.strict ?? false;
  const failOnWarnings = options?.failOnWarnings ?? false;
  const today = options?.today;

  if (!strict) {
    const errors = validateWikiLinks(root);
    const result: WikiValidationResult = {
      ok: errors.length === 0,
      errors,
      warnings: [],
      issues: [],
      stats: {
        strict: false,
        error_count: errors.length,
        fail_on_warnings: failOnWarnings,
      },
      summaryByCode: {},
    };
    if (failOnWarnings && result.warnings.length > 0) {
      result.ok = false;
    }
    return result;
  }

  const result = new WikiValidator(root, {
    strict: true,
    ...(today !== undefined ? { today } : {}),
  }).run();
  result.stats["fail_on_warnings"] = failOnWarnings;
  if (failOnWarnings && result.warnings.length > 0) {
    result.ok = false;
  }
  return result;
}

/** Ensure directory exists (re-export helper used by compile). */
export function assertDirectory(root: string): string {
  return requireDirectory(root);
}

/** Read UTF-8 file if present — used by compile only. */
export function readFileUtf8(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}
