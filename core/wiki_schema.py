"""Controlled vocabularies and required front-matter fields for wiki pages."""

from __future__ import annotations

from typing import Any

KNOWLEDGE_STATUS = frozenset(
    {"planned", "draft", "reviewed", "verified", "deprecated", "archived"}
)
EVIDENCE_STATUS = frozenset(
    {
        "strong",
        "mixed",
        "limited",
        "manufacturer-specific",
        "experimental",
        "unknown",
    }
)
CONFIDENCE = frozenset({"high", "medium", "low", "unknown"})
SAFETY_LEVEL = frozenset({"normal", "caution", "high", "critical"})
PRINTER_LIFECYCLE = frozenset(
    {
        "announced",
        "preorder",
        "current",
        "region-limited",
        "discontinued",
        "legacy-supported",
        "unsupported",
        "unknown",
    }
)
COVERAGE_LEVEL = frozenset(
    {
        "discovered",
        "cataloged",
        "documented",
        "troubleshooting-mapped",
        "review-ready",
        "reviewed",
        "verified",
    }
)

# Core editorial contract (guia-editorial.md)
CORE_REQUIRED_FIELDS: tuple[str, ...] = (
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
)

# Present as keys (empty list/null allowed) for canonical atomic/hub pages
LIST_FIELDS_REQUIRED: tuple[str, ...] = (
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
)

# doc_types that may omit some list fields (governance / logs)
RELAXED_DOC_TYPES = frozenset(
    {
        "policy",
        "audit",
        "log",
        "continuation",
        "coverage",
        "plan",
        "guide",
    }
)

DOC_TYPES = frozenset(
    {
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
    }
)

# Hard absolute claims (improper certainty). Soft forms (sempre/nunca) are warnings.
HARD_ABSOLUTE_PATTERNS: tuple[str, ...] = (
    r"\b100%\s*seguro\b",
    r"\btotalmente\s+seguro\b",
    r"\bcompletely\s+safe\b",
    r"\bguaranteed\b",
)
# Soft absolute claims — lookbehinds avoid "nem sempre" / "não sempre" false positives.
SOFT_ABSOLUTE_PATTERNS: tuple[str, ...] = (
    r"(?<![Nn]em )(?<![Nn]ão )(?<![Nn]ao )\bsempre\b",
    r"(?<![Nn]em )\bnunca\b",
    r"(?<![Nn]ot )\balways\b",
    r"\bnever\b",
    r"\bgarantido\b",
    r"\bgarantia\b",
)

# Technical numeric patterns that need nearby evidence/context
TECH_NUMBER_PATTERNS: tuple[str, ...] = (
    r"\b\d+(?:[.,]\d+)?\s*°\s*C\b",
    r"\b\d+(?:[.,]\d+)?\s*mm/s\b",
    r"\b\d+(?:[.,]\d+)?\s*mm/s²\b",
    r"\b\d+(?:[.,]\d+)?\s*mm\b",
    r"\b\d+(?:[.,]\d+)?\s*%\b",
)


def as_str_list(value: Any) -> list[str] | None:
    """Normalize a front-matter list field; None if type is invalid."""
    if value is None:
        return []
    if isinstance(value, list):
        out: list[str] = []
        for item in value:
            if item is None:
                continue
            if not isinstance(item, (str, int, float)):
                return None
            out.append(str(item).strip())
        return out
    if isinstance(value, str):
        text = value.strip()
        return [text] if text else []
    return None


def required_fields_for(doc_type: str) -> tuple[str, ...]:
    """Return required field names for a doc_type."""
    base = list(CORE_REQUIRED_FIELDS)
    if doc_type not in RELAXED_DOC_TYPES:
        base.extend(LIST_FIELDS_REQUIRED)
    elif doc_type in {"guide", "policy"}:
        # Guides/policies still need related/sources when present in contract;
        # require related + tags minimally.
        base.extend(["related", "tags"])
    return tuple(base)
