"""Light mesh repair / export — never writes under 3ds/original."""

from __future__ import annotations

from pathlib import Path

from core.errors import MeshLoadError
from core.models import RepairReport
from core.paths import MESH_SUFFIXES, assert_not_original_tree, ensure_parent_dir, require_existing_file


def repair_mesh(
    source: Path,
    output: Path,
    *,
    fill_holes: bool = True,
    merge_vertices: bool = True,
) -> RepairReport:
    """Apply light repair ops and export to output path."""
    src = require_existing_file(source, allowed_suffixes=MESH_SUFFIXES)
    out = output.expanduser().resolve()
    assert_not_original_tree(out)
    ensure_parent_dir(out)

    try:
        import trimesh
    except ImportError as exc:
        raise MeshLoadError("trimesh is not installed; pip install -r core/requirements.txt") from exc

    try:
        mesh = trimesh.load(src, force="mesh", process=True)
    except Exception as exc:
        raise MeshLoadError(f"Failed to load mesh for repair: {src} ({exc})") from exc

    if not isinstance(mesh, trimesh.Trimesh):
        raise MeshLoadError(f"Repair requires a single Trimesh, got {type(mesh)!r}")

    issues_before: list[str] = []
    if not mesh.is_watertight:
        issues_before.append("not watertight")
    if mesh.is_empty:
        issues_before.append("empty mesh")

    operations: list[str] = []
    if merge_vertices:
        try:
            mesh.merge_vertices()
            operations.append("merge_vertices")
        except Exception:
            operations.append("merge_vertices_skipped")

    # Avoid process(validate=True): it may require scipy on some trimesh builds
    try:
        mesh.process(validate=False)
        operations.append("process")
    except Exception:
        operations.append("process_skipped")

    try:
        mesh.remove_unreferenced_vertices()
        operations.append("remove_unreferenced_vertices")
    except Exception:
        operations.append("remove_unreferenced_vertices_skipped")

    if fill_holes:
        try:
            mesh.fill_holes()
            operations.append("fill_holes")
        except Exception:
            operations.append("fill_holes_skipped")

    issues_after: list[str] = []
    if mesh.is_empty:
        issues_after.append("empty mesh")
    if not mesh.is_watertight:
        issues_after.append("not watertight")

    try:
        mesh.export(out)
    except Exception as exc:
        raise MeshLoadError(f"Failed to export repaired mesh: {out} ({exc})") from exc

    return RepairReport(
        source_path=str(src),
        output_path=str(out),
        operations=operations,
        issues_before=issues_before,
        issues_after=issues_after,
    )
