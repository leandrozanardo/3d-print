"""3MF inspection via zipfile (no proprietary Bambu schema mutation)."""

from __future__ import annotations

import zipfile
from pathlib import Path

from core.errors import ThreeMfError
from core.models import ThreeMfReport
from core.paths import THREEMF_SUFFIXES, require_existing_file

MODEL_HINTS = (
    "3d/3dmodel.model",
    "3dmodel.model",
    "model.model",
)


def inspect_3mf(path: Path) -> ThreeMfReport:
    resolved = require_existing_file(path, allowed_suffixes=THREEMF_SUFFIXES)
    issues: list[str] = []
    notes: list[str] = []

    if not zipfile.is_zipfile(resolved):
        raise ThreeMfError(f"Not a valid ZIP/3MF container: {resolved}")

    try:
        with zipfile.ZipFile(resolved, "r") as zf:
            # Test CRC without extracting
            bad = zf.testzip()
            if bad is not None:
                raise ThreeMfError(f"Corrupt 3MF member (CRC fail): {bad}")
            members = sorted(zf.namelist())
            lower_map = {m.lower(): m for m in members}
            has_model = any(hint in lower_map for hint in MODEL_HINTS) or any(
                m.lower().endswith(".model") for m in members
            )
            if not has_model:
                issues.append("no .model mesh payload found")

            # Lightweight metadata hints (Bambu / generic)
            for name in members:
                lower = name.lower()
                if "metadata" in lower or lower.endswith(".json") or lower.endswith(".xml"):
                    notes.append(f"metadata candidate: {name}")
                if "plate_" in lower or "Metadata/plate" in name.replace("\\", "/"):
                    notes.append(f"plate/project candidate: {name}")
    except ThreeMfError:
        raise
    except zipfile.BadZipFile as exc:
        raise ThreeMfError(f"Bad 3MF/ZIP: {resolved} ({exc})") from exc
    except OSError as exc:
        raise ThreeMfError(f"Failed to read 3MF: {resolved} ({exc})") from exc

    return ThreeMfReport(
        path=str(resolved),
        is_zip=True,
        member_count=len(members),
        members=members[:200],  # cap for agent readability
        has_model=has_model,
        metadata_notes=notes[:50],
        issues=issues,
    )
