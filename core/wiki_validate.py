"""Enterprise semantic validation for the fix-my-print wiki corpus."""

from __future__ import annotations

import re
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date, datetime
from pathlib import Path
from typing import Any

from core.paths import require_directory
from core.wiki_frontmatter import FrontMatterError, ParsedDocument, parse_markdown_document
from core.wiki_links import LINK_RE, SKIP_SCHEMES, validate_wiki_links
from core.wiki_contract import (
    DOCUMENTED_DOD_MARKERS,
    ID_REFERENCE_FIELDS,
    PRINTER_REQUIRED_FIELDS,
    SOURCE_TYPES,
)
from core.wiki_schema import (
    COVERAGE_LEVEL,
    CONFIDENCE,
    DOC_TYPES,
    EVIDENCE_STATUS,
    HARD_ABSOLUTE_PATTERNS,
    KNOWLEDGE_STATUS,
    PRINTER_LIFECYCLE,
    SAFETY_LEVEL,
    SOFT_ABSOLUTE_PATTERNS,
    TECH_NUMBER_PATTERNS,
    as_str_list,
    required_fields_for,
)

# Paths under docs/ that are not part of the canonical semantic corpus
LEGACY_PREFIXES = (
    "projeto/",
    "ebook/",
    "printers/",
    "_arquivo/",
    "superpowers/",
)

# Operational / non-wiki Markdown allowed without full editorial contract
NON_CORPUS_FILES = frozenset(
    {
        "context.md",
    }
)

HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.M)
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
REVIEW_CYCLES = frozenset(
    {
        "1-month",
        "3-months",
        "6-months",
        "12-months",
        "per-batch",
        "on-change",
    }
)
EVIDENCE_NEAR_RE = re.compile(
    r"(source\.|fonte|sources:|TDS|SDS|fabricante|manufacturer|oficial|spec|"
    r"heurística|heuristic|preset|validar|Ellis|Teaching\s*Tech|Bambu)",
    re.I,
)
SUMMARY_MIN = 40
SUMMARY_MAX = 600  # characters; editorial targets 100–250 words ≈ upper bound soft


@dataclass
class ValidationIssue:
    code: str
    message: str
    path: str | None = None
    severity: str = "error"  # error | warning
    field: str | None = None
    entity_id: str | None = None

    def format(self) -> str:
        loc = f"{self.path}: " if self.path else ""
        return f"[{self.code}] {loc}{self.message}"

    def to_dict(self) -> dict[str, Any]:
        return {
            "code": self.code,
            "severity": self.severity,
            "path": self.path,
            "field": self.field,
            "id": self.entity_id,
            "message": self.message,
        }


@dataclass
class WikiValidationResult:
    ok: bool
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    issues: list[dict[str, Any]] = field(default_factory=list)
    stats: dict[str, Any] = field(default_factory=dict)
    summary_by_code: dict[str, int] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        return {
            "ok": self.ok,
            "errors": self.errors,
            "warnings": self.warnings,
            "issues": self.issues,
            "summary_by_code": self.summary_by_code,
            "stats": self.stats,
        }


def _rel(root: Path, path: Path) -> str:
    return str(path.relative_to(root)).replace("\\", "/")


def _is_legacy(rel: str) -> bool:
    return any(rel.startswith(p) for p in LEGACY_PREFIXES)


def _is_canonical(rel: str) -> bool:
    if rel in NON_CORPUS_FILES:
        return False
    return not _is_legacy(rel)


def _slugify_heading(text: str) -> str:
    """GitHub-like anchor slug (approx) for Markdown headings."""
    text = text.strip().lower()
    text = re.sub(r"[^\w\s\-]", "", text, flags=re.UNICODE)
    text = re.sub(r"\s+", "-", text)
    return text.strip("-")


def _parse_date(value: Any) -> date | None:
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    if isinstance(value, str) and DATE_RE.match(value.strip()):
        y, m, d = value.strip().split("-")
        return date(int(y), int(m), int(d))
    return None


def _cycle_months(cycle: str) -> int | None:
    mapping = {
        "1-month": 1,
        "3-months": 3,
        "6-months": 6,
        "12-months": 12,
    }
    return mapping.get(cycle)


def _add_months(d: date, months: int) -> date:
    year = d.year + (d.month - 1 + months) // 12
    month = (d.month - 1 + months) % 12 + 1
    day = min(d.day, [31, 29 if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0) else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1])
    return date(year, month, day)


def _collect_anchors(body: str) -> set[str]:
    anchors: set[str] = set()
    for match in HEADING_RE.finditer(body):
        anchors.add(_slugify_heading(match.group(2)))
    # Explicit HTML anchors
    for m in re.finditer(r'id=["\']([^"\']+)["\']', body):
        anchors.add(m.group(1))
    return anchors


class WikiValidator:
    """Validate canonical wiki structure under a docs root."""

    def __init__(self, root: Path, *, strict: bool = False, today: date | None = None) -> None:
        self.root = require_directory(root)
        self.strict = strict
        self.today = today or date.today()
        self.issues: list[ValidationIssue] = []
        self.docs: dict[str, ParsedDocument] = {}
        self.id_to_rel: dict[str, str] = {}
        self.rel_to_id: dict[str, str] = {}
        self.prereq_graph: dict[str, list[str]] = defaultdict(list)
        self.body_by_rel: dict[str, str] = {}
        self.anchors_by_rel: dict[str, set[str]] = {}
        self.inbound_links: dict[str, set[str]] = defaultdict(set)
        self.fm_by_rel: dict[str, dict[str, Any]] = {}

    def error(
        self,
        code: str,
        message: str,
        path: str | None = None,
        *,
        field: str | None = None,
        entity_id: str | None = None,
    ) -> None:
        self.issues.append(
            ValidationIssue(code, message, path, "error", field=field, entity_id=entity_id)
        )

    def warning(
        self,
        code: str,
        message: str,
        path: str | None = None,
        *,
        field: str | None = None,
        entity_id: str | None = None,
    ) -> None:
        self.issues.append(
            ValidationIssue(code, message, path, "warning", field=field, entity_id=entity_id)
        )

    def run(self) -> WikiValidationResult:
        md_files = sorted(self.root.rglob("*.md"))
        # Always include relative link checks (existing contract)
        link_errors = validate_wiki_links(self.root)
        for err in link_errors:
            self.error("broken_link", err)

        canonical_files = [
            p for p in md_files if _is_canonical(_rel(self.root, p))
        ]

        self._load_documents(canonical_files)
        self._check_unique_ids()
        self._check_front_matter_contracts()
        self._check_id_references()
        self._check_prereq_cycles()
        self._check_deprecated_refs()
        self._check_anchors()
        self._check_orphans()
        self._check_absolute_language()
        self._check_numeric_claims()
        self._check_printer_rules()
        self._check_source_pages()
        self._check_aliases()

        structured = [i.to_dict() for i in self.issues]
        errors = sorted(i.format() for i in self.issues if i.severity == "error")
        warnings = sorted(i.format() for i in self.issues if i.severity == "warning")
        summary: dict[str, int] = defaultdict(int)
        for issue in self.issues:
            summary[issue.code] += 1
        ok = len(errors) == 0
        stats = {
            "canonical_pages": len(canonical_files),
            "pages_with_front_matter": len(self.fm_by_rel),
            "unique_ids": len(self.id_to_rel),
            "strict": self.strict,
            "error_count": len(errors),
            "warning_count": len(warnings),
        }
        return WikiValidationResult(
            ok=ok,
            errors=errors,
            warnings=warnings,
            issues=structured,
            stats=stats,
            summary_by_code=dict(sorted(summary.items())),
        )

    def _load_documents(self, files: list[Path]) -> None:
        for path in files:
            rel = _rel(self.root, path)
            try:
                doc = parse_markdown_document(path)
            except FrontMatterError as exc:
                self.error("yaml_parse", str(exc), rel)
                continue
            except OSError as exc:
                self.error("read_failed", str(exc), rel)
                continue

            self.docs[rel] = doc
            self.body_by_rel[rel] = doc.body
            self.anchors_by_rel[rel] = _collect_anchors(doc.body)

            if doc.has_bom:
                self.error("utf8_bom", "file starts with UTF-8 BOM; strip BOM for deterministic parsing", rel)

            if doc.front_matter is None:
                self.error("missing_front_matter", "canonical page missing YAML front matter", rel)
                continue

            fm = doc.front_matter
            self.fm_by_rel[rel] = fm
            page_id = fm.get("id")
            if not isinstance(page_id, str) or not page_id.strip():
                self.error("missing_id", "front matter missing non-empty id", rel)
                continue
            page_id = page_id.strip()
            if page_id in self.id_to_rel:
                self.error(
                    "duplicate_id",
                    f"duplicate id '{page_id}' also in {self.id_to_rel[page_id]}",
                    rel,
                )
            else:
                self.id_to_rel[page_id] = rel
                self.rel_to_id[rel] = page_id

    def _check_unique_ids(self) -> None:
        # duplicates already recorded during load
        return

    def _check_front_matter_contracts(self) -> None:
        for rel, fm in self.fm_by_rel.items():
            doc_type = fm.get("doc_type")
            if not isinstance(doc_type, str) or doc_type not in DOC_TYPES:
                self.error(
                    "invalid_doc_type",
                    f"doc_type must be one of controlled set; got {doc_type!r}",
                    rel,
                )
                doc_type_key = str(doc_type) if doc_type is not None else ""
            else:
                doc_type_key = doc_type

            for key in required_fields_for(doc_type_key if doc_type_key in DOC_TYPES else "hub"):
                if key not in fm:
                    self.error("missing_field", f"required field '{key}' missing", rel)

            self._check_enum(rel, fm, "knowledge_status", KNOWLEDGE_STATUS)
            self._check_enum(rel, fm, "evidence_status", EVIDENCE_STATUS)
            self._check_enum(rel, fm, "confidence", CONFIDENCE)
            self._check_enum(rel, fm, "safety_level", SAFETY_LEVEL)

            for list_key in (
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
            ):
                if list_key in fm and as_str_list(fm[list_key]) is None:
                    self.error("invalid_list_field", f"field '{list_key}' must be a list of scalars", rel)

            summary = fm.get("summary")
            if isinstance(summary, str):
                length = len(summary.strip())
                if length < SUMMARY_MIN:
                    self.error("summary_too_short", f"summary length {length} < {SUMMARY_MIN}", rel)
                elif length > SUMMARY_MAX:
                    self.warning("summary_too_long", f"summary length {length} > {SUMMARY_MAX}", rel)
            elif "summary" in fm:
                self.error("invalid_summary", "summary must be a string", rel)

            reviewed = _parse_date(fm.get("last_reviewed"))
            if "last_reviewed" in fm and reviewed is None:
                self.error("invalid_date", "last_reviewed must be YYYY-MM-DD", rel)

            cycle = fm.get("review_cycle")
            if isinstance(cycle, str):
                if cycle not in REVIEW_CYCLES and not cycle.endswith("-months") and cycle not in {"per-batch", "on-change"}:
                    self.warning("unknown_review_cycle", f"unrecognized review_cycle '{cycle}'", rel)
                months = _cycle_months(cycle)
                if reviewed is not None and months is not None:
                    due = _add_months(reviewed, months)
                    if due < self.today:
                        self.error(
                            "review_cycle_overdue",
                            f"review overdue (last_reviewed={reviewed.isoformat()}, cycle={cycle})",
                            rel,
                        )
            elif "review_cycle" in fm and cycle is not None:
                self.error("invalid_review_cycle", "review_cycle must be a string", rel)

            # Invalid promotion to reviewed/verified without independent reviewer metadata
            ks = fm.get("knowledge_status")
            if ks in {"reviewed", "verified"}:
                reviewer = fm.get("reviewed_by")
                author = fm.get("authored_by") or fm.get("author")
                if not isinstance(reviewer, str) or not reviewer.strip():
                    self.error(
                        "invalid_promotion",
                        f"knowledge_status '{ks}' requires reviewed_by (independent reviewer)",
                        rel,
                    )
                elif isinstance(author, str) and author.strip() and author.strip() == reviewer.strip():
                    self.error(
                        "invalid_promotion",
                        f"knowledge_status '{ks}' cannot have reviewed_by equal to author",
                        rel,
                    )

            coverage = fm.get("coverage_level")
            if coverage is not None:
                if coverage not in COVERAGE_LEVEL:
                    self.error("invalid_coverage_level", f"invalid coverage_level '{coverage}'", rel)
                sources = as_str_list(fm.get("sources")) or []
                if coverage in {"cataloged", "documented", "troubleshooting-mapped", "review-ready", "reviewed", "verified"} and not sources:
                    self.error(
                        "coverage_without_evidence",
                        f"coverage_level '{coverage}' requires non-empty sources",
                        rel,
                        field="coverage_level",
                    )
                if coverage in {"cataloged", "documented", "troubleshooting-mapped"}:
                    if not as_str_list(fm.get("regions")):
                        self.error(
                            "cataloged_without_region",
                            f"coverage_level '{coverage}' requires non-empty regions",
                            rel,
                            field="regions",
                        )
                    evidence = fm.get("availability_evidence")
                    if not isinstance(evidence, str) or not evidence.strip() or evidence.strip() == "unknown":
                        self.error(
                            "cataloged_without_evidence",
                            f"coverage_level '{coverage}' requires concrete availability_evidence",
                            rel,
                            field="availability_evidence",
                        )
                if coverage in {"documented", "troubleshooting-mapped", "review-ready", "reviewed", "verified"}:
                    body = self.body_by_rel.get(rel, "")
                    missing = [m for m in DOCUMENTED_DOD_MARKERS if m not in body]
                    if missing:
                        self.error(
                            "documented_without_dod",
                            "documented+ coverage requires DoD body sections; missing: "
                            + ", ".join(missing[:5]),
                            rel,
                            field="coverage_level",
                        )

    def _check_enum(self, rel: str, fm: dict[str, Any], key: str, allowed: frozenset[str]) -> None:
        if key not in fm:
            return
        value = fm[key]
        if value not in allowed:
            self.error("invalid_enum", f"{key}={value!r} not in {sorted(allowed)}", rel)

    def _check_id_references(self) -> None:
        for rel, fm in self.fm_by_rel.items():
            page_id = self.rel_to_id.get(rel)
            for field_name in ID_REFERENCE_FIELDS:
                if field_name not in fm:
                    continue
                values = as_str_list(fm.get(field_name)) or []
                for ref in values:
                    if not ref:
                        continue
                    if ref not in self.id_to_rel:
                        self.error(
                            "unresolved_id",
                            f"{field_name} references unknown id '{ref}'",
                            rel,
                            field=field_name,
                            entity_id=ref,
                        )
                    elif field_name == "prerequisites" and page_id:
                        self.prereq_graph[page_id].append(ref)

            # Track markdown body links for orphan detection
            body = self.body_by_rel.get(rel, "")
            for _label, raw in LINK_RE.findall(body):
                target = raw.strip().strip("<>").strip()
                if not target or target.startswith(SKIP_SCHEMES) or target.startswith("#"):
                    continue
                path_part = target.split("#", 1)[0].split("?", 1)[0]
                if not path_part:
                    continue
                resolved = (self.root / rel).parent.joinpath(path_part).resolve()
                try:
                    target_rel = _rel(self.root, resolved)
                except ValueError:
                    continue
                if target_rel.endswith(".md"):
                    self.inbound_links[target_rel].add(rel)

    def _check_prereq_cycles(self) -> None:
        visiting: set[str] = set()
        visited: set[str] = set()
        stack: list[str] = []

        def dfs(node: str) -> None:
            if node in visited:
                return
            if node in visiting:
                cycle_start = stack.index(node) if node in stack else 0
                cycle = " -> ".join(stack[cycle_start:] + [node])
                self.error("prereq_cycle", f"prerequisites cycle: {cycle}")
                return
            visiting.add(node)
            stack.append(node)
            for nxt in self.prereq_graph.get(node, []):
                dfs(nxt)
            stack.pop()
            visiting.remove(node)
            visited.add(node)

        for node in list(self.prereq_graph):
            dfs(node)

    def _check_deprecated_refs(self) -> None:
        deprecated_ids = {
            pid
            for pid, rel in self.id_to_rel.items()
            if self.fm_by_rel.get(rel, {}).get("knowledge_status") in {"deprecated", "archived"}
        }
        for rel, fm in self.fm_by_rel.items():
            ks = fm.get("knowledge_status")
            if ks in {"deprecated", "archived"}:
                continue
            for field_name in ("related", "prerequisites", "sources"):
                for ref in as_str_list(fm.get(field_name)) or []:
                    if ref in deprecated_ids:
                        self.error(
                            "deprecated_reference",
                            f"{field_name} references {ks_of(self, ref)} id '{ref}' without supersedes migration context",
                            rel,
                        )

    def _check_anchors(self) -> None:
        for rel, body in self.body_by_rel.items():
            for _label, raw in LINK_RE.findall(body):
                target = raw.strip().strip("<>").strip()
                if not target or target.startswith(SKIP_SCHEMES):
                    continue
                if "#" not in target:
                    continue
                path_part, anchor = target.split("#", 1)
                anchor = anchor.strip()
                if not anchor:
                    continue
                if not path_part:
                    anchors = self.anchors_by_rel.get(rel, set())
                    if anchor not in anchors and _slugify_heading(anchor) not in anchors:
                        self.error("broken_anchor", f"broken in-page anchor #{anchor}", rel)
                    continue
                resolved = (self.root / rel).parent.joinpath(path_part).resolve()
                try:
                    target_rel = _rel(self.root, resolved)
                except ValueError:
                    continue
                if target_rel not in self.anchors_by_rel:
                    # Missing file already reported by link validator
                    continue
                anchors = self.anchors_by_rel[target_rel]
                if anchor not in anchors and _slugify_heading(anchor) not in anchors:
                    self.error(
                        "broken_anchor",
                        f"broken anchor -> {target}",
                        rel,
                    )

    def _check_orphans(self) -> None:
        # Entry points that may have no inbound wiki links
        roots = {
            "INDEX.md",
            "AGENT_GUIDE.md",
            "_meta/INDEX.md",
            "_meta/continuacao.md",
            "_meta/cobertura.md",
            "_meta/fila-de-trabalho.md",
        }
        for rel in self.fm_by_rel:
            if rel in roots:
                continue
            if rel.startswith("_meta/"):
                # meta pages are reachable from meta hub; require hub or peer link
                if rel != "_meta/INDEX.md" and not self.inbound_links.get(rel) and "INDEX.md" not in rel:
                    # soft: warn unless strict orphan for non-index meta without inbound
                    if not self.inbound_links.get(rel):
                        self.warning("possible_orphan", "no inbound relative links found", rel)
                continue
            if not self.inbound_links.get(rel):
                # Domain INDEX hubs are entry points from portal
                if rel.endswith("/INDEX.md") or rel.endswith("\\INDEX.md"):
                    continue
                self.error("orphan_page", "canonical page has no inbound relative Markdown links", rel)

    def _check_absolute_language(self) -> None:
        hard = [re.compile(p, re.I) for p in HARD_ABSOLUTE_PATTERNS]
        soft = [re.compile(p, re.I) for p in SOFT_ABSOLUTE_PATTERNS]
        hedge = re.compile(
            r"(exceto|salvo|não\s+significa|condicional|quando|unless|except|"
            r"not\s+always|imperativo|proibid|safety|segurança|pare|stop|"
            r"nem\s+sempre|não\s+sempre|em\s+geral)",
            re.I,
        )
        skip_doc = frozenset({"policy", "audit", "guide", "research", "myth", "source"})
        for rel, body in self.body_by_rel.items():
            fm = self.fm_by_rel.get(rel, {})
            doc_type = fm.get("doc_type")
            if doc_type in skip_doc:
                continue
            # Myth pages often quote absolute claims to refute them
            if "mito-" in rel or fm.get("doc_type") == "research":
                continue
            safety = fm.get("safety_level")
            for pattern in hard:
                for match in pattern.finditer(body):
                    start = max(0, match.start() - 80)
                    end = min(len(body), match.end() + 80)
                    window = body[start:end]
                    if hedge.search(window) or "Absolutos indevidos" in window:
                        continue
                    self.error(
                        "absolute_claim",
                        f"improper absolute certainty near '{match.group(0)}'",
                        rel,
                    )
                    break
            for pattern in soft:
                for match in pattern.finditer(body):
                    start = max(0, match.start() - 80)
                    end = min(len(body), match.end() + 80)
                    window = body[start:end]
                    if hedge.search(window) or "Absolutos indevidos" in window:
                        continue
                    if "sempre/nunca" in window or "sempre|" in window:
                        continue
                    # Imperative safety language is allowed on caution+ pages
                    if safety in {"caution", "high", "critical"} and match.group(0).lower() in {
                        "nunca",
                        "never",
                        "sempre",
                        "always",
                    }:
                        continue
                    self.warning(
                        "absolute_language",
                        f"absolute language without hedge near '{match.group(0)}'",
                        rel,
                    )
                    break

    def _check_numeric_claims(self) -> None:
        compiled = [re.compile(p) for p in TECH_NUMBER_PATTERNS]
        for rel, body in self.body_by_rel.items():
            fm = self.fm_by_rel.get(rel, {})
            sources = as_str_list(fm.get("sources")) or []
            if fm.get("doc_type") in {
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
            }:
                continue
            for pattern in compiled:
                for match in pattern.finditer(body):
                    start = max(0, match.start() - 120)
                    end = min(len(body), match.end() + 120)
                    window = body[start:end]
                    if EVIDENCE_NEAR_RE.search(window):
                        continue
                    if not sources:
                        # Structural gap: technical number without provenance list
                        self.error(
                            "numeric_without_evidence",
                            f"technical number '{match.group(0)}' on page with empty/missing sources",
                            rel,
                        )
                    else:
                        self.warning(
                            "numeric_without_nearby_citation",
                            f"technical number '{match.group(0)}' lacks nearby source cue",
                            rel,
                        )
                    break

    def _check_printer_rules(self) -> None:
        for rel, fm in self.fm_by_rel.items():
            if fm.get("doc_type") != "printer":
                continue
            for key in PRINTER_REQUIRED_FIELDS:
                if key not in fm:
                    self.error("missing_printer_field", f"printer requires '{key}'", rel, field=key)
            if "family_id" not in fm and fm.get("family_status") not in {"unknown", "n/a", "pending"}:
                if "family_status" not in fm:
                    self.error(
                        "missing_printer_field",
                        "printer requires family_id or family_status",
                        rel,
                        field="family_status",
                    )

            lifecycle = fm.get("lifecycle") or fm.get("lifecycle_status")
            if lifecycle is not None and lifecycle not in PRINTER_LIFECYCLE:
                self.error(
                    "invalid_lifecycle",
                    f"printer lifecycle '{lifecycle}' not in controlled set",
                    rel,
                    field="lifecycle",
                )
            if lifecycle == "current":
                regions = as_str_list(fm.get("regions")) or []
                evidence = fm.get("availability_evidence")
                observed = fm.get("lifecycle_observed_at")
                if not regions or regions == ["unknown"]:
                    self.error(
                        "current_without_region",
                        "lifecycle current requires documented regions",
                        rel,
                        field="regions",
                    )
                if not isinstance(evidence, str) or not evidence.strip() or evidence.strip() in {
                    "unknown",
                    "pending-revalidation",
                }:
                    self.error(
                        "current_without_evidence",
                        "lifecycle current requires concrete availability_evidence",
                        rel,
                        field="availability_evidence",
                    )
                if _parse_date(observed) is None:
                    self.error(
                        "current_without_observation_date",
                        "lifecycle current requires lifecycle_observed_at YYYY-MM-DD",
                        rel,
                        field="lifecycle_observed_at",
                    )

            mfr = fm.get("manufacturer_id")
            if isinstance(mfr, str) and mfr.strip():
                mfr_id = mfr if mfr.startswith("manufacturer.") else f"manufacturer.{mfr}"
                if mfr_id not in self.id_to_rel and mfr not in self.id_to_rel:
                    self.error(
                        "unresolved_id",
                        f"manufacturer_id '{mfr}' does not resolve",
                        rel,
                        field="manufacturer_id",
                        entity_id=mfr,
                    )

    def _check_source_pages(self) -> None:
        for rel, fm in self.fm_by_rel.items():
            if fm.get("doc_type") != "source":
                continue
            if "title" not in fm:
                self.error("incomplete_source_page", "source page missing 'title'", rel, field="title")
            body = self.body_by_rel.get(rel, "")
            has_url = bool(re.search(r"https?://", body)) or bool(re.search(r"\bURL\b", body))
            if not has_url:
                self.error("incomplete_source_page", "source page body missing URL field", rel)
            if "data de acesso" not in body.lower() and "accessed" not in body.lower():
                self.error("incomplete_source_page", "source page missing access date", rel)
            # Enterprise metadata — warn when missing (P1 debt)
            for key in ("source_type", "language", "version", "last_verified"):
                if key not in fm:
                    self.warning(
                        "incomplete_source_metadata",
                        f"source page missing front-matter '{key}'",
                        rel,
                        field=key,
                    )
            st = fm.get("source_type")
            if st is not None and st not in SOURCE_TYPES:
                self.error(
                    "invalid_source_type",
                    f"source_type '{st}' not in controlled set",
                    rel,
                    field="source_type",
                )

    def _check_aliases(self) -> None:
        alias_index: dict[str, list[str]] = defaultdict(list)
        for rel, fm in self.fm_by_rel.items():
            page_id = self.rel_to_id.get(rel, rel)
            for key in ("aliases_pt_br", "aliases_en"):
                for alias in as_str_list(fm.get(key)) or []:
                    norm = alias.strip().lower()
                    if not norm:
                        continue
                    alias_index[norm].append(page_id)
        for alias, owners in alias_index.items():
            unique = sorted(set(owners))
            if len(unique) > 1:
                self.warning(
                    "inconsistent_alias",
                    f"alias '{alias}' shared by multiple ids: {', '.join(unique)}",
                )


def ks_of(validator: WikiValidator, ref: str) -> str:
    rel = validator.id_to_rel.get(ref)
    if not rel:
        return "unknown"
    return str(validator.fm_by_rel.get(rel, {}).get("knowledge_status", "unknown"))


def validate_wiki(
    root: Path,
    *,
    strict: bool = False,
    fail_on_warnings: bool = False,
    today: date | None = None,
) -> WikiValidationResult:
    """Validate wiki links and, when strict, full semantic enterprise rules."""
    if not strict:
        errors = validate_wiki_links(root)
        result = WikiValidationResult(
            ok=not errors,
            errors=errors,
            warnings=[],
            stats={"strict": False, "error_count": len(errors), "fail_on_warnings": fail_on_warnings},
        )
        if fail_on_warnings and result.warnings:
            result.ok = False
        return result
    result = WikiValidator(root, strict=True, today=today).run()
    result.stats["fail_on_warnings"] = fail_on_warnings
    if fail_on_warnings and result.warnings:
        result.ok = False
    return result
