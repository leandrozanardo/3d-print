"""Path validation and write guards (never mutate 3ds/original)."""

from __future__ import annotations

from pathlib import Path

from core.errors import PathValidationError, UnsupportedFormatError, WriteGuardError

MESH_SUFFIXES = {".stl", ".obj", ".ply"}
THREEMF_SUFFIXES = {".3mf"}
MAX_FILE_BYTES = 500 * 1024 * 1024  # 500 MiB hard cap


def require_existing_file(path: Path, *, allowed_suffixes: set[str] | None = None) -> Path:
    resolved = path.expanduser().resolve()
    if not resolved.exists():
        raise PathValidationError(f"File not found: {resolved}")
    if not resolved.is_file():
        raise PathValidationError(f"Not a file: {resolved}")
    if resolved.stat().st_size <= 0:
        raise PathValidationError(f"Empty file: {resolved}")
    if resolved.stat().st_size > MAX_FILE_BYTES:
        raise PathValidationError(f"File exceeds size cap ({MAX_FILE_BYTES} bytes): {resolved}")
    if allowed_suffixes is not None and resolved.suffix.lower() not in allowed_suffixes:
        raise UnsupportedFormatError(
            f"Unsupported extension '{resolved.suffix}' (allowed: {sorted(allowed_suffixes)})"
        )
    return resolved


def require_directory(path: Path) -> Path:
    resolved = path.expanduser().resolve()
    if not resolved.exists():
        raise PathValidationError(f"Directory not found: {resolved}")
    if not resolved.is_dir():
        raise PathValidationError(f"Not a directory: {resolved}")
    return resolved


def assert_not_original_tree(target: Path, project_root: Path | None = None) -> None:
    """Refuse writes under 3ds/original (immutable inputs)."""
    resolved = target.expanduser().resolve()
    parts = {p.lower() for p in resolved.parts}
    # Detect .../3ds/original/... anywhere in the path
    try:
        idx = [p.lower() for p in resolved.parts].index("3ds")
        if idx + 1 < len(resolved.parts) and resolved.parts[idx + 1].lower() == "original":
            raise WriteGuardError(
                f"Refusing write under 3ds/original: {resolved}. Use 3ds/upgraded instead."
            )
    except ValueError:
        pass
    _ = parts
    _ = project_root


def ensure_parent_dir(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
