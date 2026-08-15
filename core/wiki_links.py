"""Validate relative Markdown links under a documentation root."""

from __future__ import annotations

import re
from pathlib import Path

from core.paths import require_directory

LINK_RE = re.compile(r"\[([^\]]*)\]\(([^)]+)\)")
SKIP_SCHEMES = ("http://", "https://", "mailto:", "tel:")


def validate_wiki_links(root: Path) -> list[str]:
    """Return human-readable errors; empty list means the tree is consistent."""
    root = require_directory(root)
    errors: list[str] = []
    md_files = sorted(root.rglob("*.md"))
    for md in md_files:
        try:
            text = md.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            errors.append(f"{md}: not valid UTF-8")
            continue
        except OSError as exc:
            errors.append(f"{md}: read failed ({exc})")
            continue

        for _label, raw_target in LINK_RE.findall(text):
            target = raw_target.strip().strip("<>").strip()
            if not target or target.startswith(SKIP_SCHEMES) or target.startswith("#"):
                continue
            # Ignore images that are intentional external/data URIs
            if target.startswith("data:"):
                continue
            path_part = target.split("#", 1)[0].split("?", 1)[0]
            if not path_part:
                continue
            # Windows drive-looking accidental links
            resolved = (md.parent / path_part).resolve()
            try:
                resolved.relative_to(root)
            except ValueError:
                # Allow repo-level links (e.g. playbook.md) when the target exists
                if resolved.exists():
                    continue
                errors.append(f"{md}: link escapes root and target missing -> {target}")
                continue
            if not resolved.exists():
                errors.append(f"{md}: broken link -> {target}")
    return errors
