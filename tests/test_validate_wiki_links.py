from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.wiki_links import validate_wiki_links


def test_valid_fixture_has_no_errors():
    errors = validate_wiki_links(ROOT / "tests" / "fixtures" / "wiki_ok")
    assert errors == []


def test_broken_link_is_reported():
    errors = validate_wiki_links(ROOT / "tests" / "fixtures" / "wiki_broken")
    assert any("missing.md" in e for e in errors)


def test_missing_root_raises():
    from core.errors import PathValidationError
    import pytest

    with pytest.raises(PathValidationError):
        validate_wiki_links(ROOT / "tests" / "fixtures" / "does_not_exist")
