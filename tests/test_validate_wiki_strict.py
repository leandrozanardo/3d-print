"""Unit tests for enterprise wiki semantic validation (--strict)."""

from __future__ import annotations

from datetime import date
from pathlib import Path
import sys

import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.wiki_frontmatter import FrontMatterError, parse_front_matter_yaml, parse_markdown_document
from core.wiki_validate import validate_wiki

FIXTURES = ROOT / "tests" / "fixtures"


def test_safe_yaml_rejects_unsafe_tags():
    with pytest.raises(FrontMatterError):
        parse_front_matter_yaml("id: !!python/object/apply:os.system ['echo pwned']\n")


def test_front_matter_bom_detected(tmp_path: Path):
    md = tmp_path / "a.md"
    md.write_bytes(
        b"\xef\xbb\xbf---\nid: \"x.test\"\ntitle: \"T\"\nsummary: \""
        + (b"word " * 20)
        + b"\"\ndoc_type: \"concept\"\ndomain: []\ntechnology: []\nprocess: []\n"
        b"applies_to: []\nnot_for: []\nknowledge_status: \"draft\"\n"
        b"evidence_status: \"unknown\"\nsafety_level: \"normal\"\nconfidence: \"low\"\n"
        b"last_reviewed: \"2026-08-15\"\nreview_cycle: \"12-months\"\nsources: []\n"
        b"related: []\nprerequisites: []\nsupersedes: []\naliases_pt_br: []\n"
        b"aliases_en: []\ntags: []\n---\n\n# T\n"
    )
    doc = parse_markdown_document(md)
    assert doc.has_bom is True
    assert doc.front_matter is not None
    assert doc.front_matter["id"] == "x.test"


def test_strict_ok_fixture():
    result = validate_wiki(FIXTURES / "wiki_strict_ok", strict=True, today=date(2026, 8, 16))
    assert result.ok is True
    assert result.errors == []


def test_strict_reports_duplicate_id():
    result = validate_wiki(FIXTURES / "wiki_strict_broken", strict=True, today=date(2026, 8, 16))
    assert result.ok is False
    assert any("duplicate_id" in e for e in result.errors)


def test_strict_reports_unresolved_related():
    result = validate_wiki(FIXTURES / "wiki_strict_broken", strict=True, today=date(2026, 8, 16))
    assert any("unresolved_id" in e for e in result.errors)


def test_strict_reports_prereq_cycle():
    result = validate_wiki(FIXTURES / "wiki_strict_broken", strict=True, today=date(2026, 8, 16))
    assert any("prereq_cycle" in e for e in result.errors)


def test_strict_reports_missing_front_matter():
    result = validate_wiki(FIXTURES / "wiki_strict_broken", strict=True, today=date(2026, 8, 16))
    assert any("missing_front_matter" in e for e in result.errors)


def test_strict_reports_invalid_promotion():
    result = validate_wiki(FIXTURES / "wiki_strict_broken", strict=True, today=date(2026, 8, 16))
    assert any("invalid_promotion" in e for e in result.errors)


def test_strict_reports_absolute_hard_claim():
    result = validate_wiki(FIXTURES / "wiki_strict_broken", strict=True, today=date(2026, 8, 16))
    assert any("absolute_claim" in e for e in result.errors)


def test_strict_reports_broken_anchor():
    result = validate_wiki(FIXTURES / "wiki_strict_broken", strict=True, today=date(2026, 8, 16))
    assert any("broken_anchor" in e for e in result.errors)


def test_non_strict_preserves_link_only_contract():
    # Existing wiki_ok fixture has no front matter; non-strict must still pass.
    result = validate_wiki(FIXTURES / "wiki_ok", strict=False)
    assert result.ok is True
    assert result.errors == []


def test_cli_strict_json_shape():
    from core.cli import main
    import io
    from contextlib import redirect_stdout

    buf = io.StringIO()
    with redirect_stdout(buf):
        code = main(["validate-wiki", str(FIXTURES / "wiki_strict_ok"), "--strict", "--json"])
    assert code == 0
    assert '"ok": true' in buf.getvalue()
