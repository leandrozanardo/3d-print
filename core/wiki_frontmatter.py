"""Safe YAML front-matter parsing for wiki Markdown pages."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml

from core.errors import CoreError


class FrontMatterError(CoreError):
    """Raised when front matter cannot be parsed safely."""

    def __init__(self, message: str, *, path: str | None = None) -> None:
        super().__init__(
            message if path is None else f"{path}: {message}",
            code="FRONT_MATTER_INVALID",
        )
        self.path = path


FM_START = "---"


@dataclass(frozen=True)
class ParsedDocument:
    """Markdown document with optional YAML front matter."""

    path: Path
    front_matter: dict[str, Any] | None
    body: str
    raw_text: str
    has_bom: bool


def _strip_bom(text: str) -> tuple[str, bool]:
    if text.startswith("\ufeff"):
        return text.lstrip("\ufeff"), True
    return text, False


def split_front_matter(text: str) -> tuple[str | None, str]:
    """Return (yaml_text_or_None, body). Accepts optional UTF-8 BOM already stripped."""
    if not text.startswith(FM_START):
        return None, text
    # Require newline after opening fence
    if len(text) == 3 or text[3] not in "\r\n":
        return None, text
    rest = text[3:]
    if rest.startswith("\r\n"):
        rest = rest[2:]
    elif rest.startswith("\n"):
        rest = rest[1:]
    else:
        return None, text

    # Find closing fence at beginning of a line
    idx = 0
    while True:
        line_end = rest.find("\n", idx)
        chunk = rest if line_end < 0 else rest[:line_end]
        # Check each line from idx
        nl = rest.find("\n", idx)
        line = rest[idx:] if nl < 0 else rest[idx:nl]
        if line.rstrip("\r") == FM_START:
            yaml_text = rest[:idx]
            body = "" if nl < 0 else rest[nl + 1 :]
            # Drop leading CR from CRLF body handled by slice after \n
            return yaml_text, body
        if nl < 0:
            return None, text
        idx = nl + 1


def parse_front_matter_yaml(yaml_text: str, *, path: str | None = None) -> dict[str, Any]:
    """Parse front matter with YAML SafeLoader only."""
    try:
        data = yaml.safe_load(yaml_text)
    except yaml.YAMLError as exc:
        raise FrontMatterError(f"YAML parse error: {exc}", path=path) from exc
    if data is None:
        return {}
    if not isinstance(data, dict):
        raise FrontMatterError("front matter must be a YAML mapping", path=path)
    return data


def parse_markdown_document(path: Path, text: str | None = None) -> ParsedDocument:
    """Load a Markdown file and parse front matter when present."""
    raw = text if text is not None else path.read_text(encoding="utf-8")
    cleaned, has_bom = _strip_bom(raw)
    yaml_text, body = split_front_matter(cleaned)
    if yaml_text is None:
        return ParsedDocument(
            path=path,
            front_matter=None,
            body=cleaned,
            raw_text=raw,
            has_bom=has_bom,
        )
    fm = parse_front_matter_yaml(yaml_text, path=str(path))
    return ParsedDocument(
        path=path,
        front_matter=fm,
        body=body,
        raw_text=raw,
        has_bom=has_bom,
    )
