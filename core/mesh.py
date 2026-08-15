"""Mesh inspection port (domain-facing) and Trimesh adapter."""

from __future__ import annotations

from pathlib import Path
from typing import Protocol

from core.errors import MeshLoadError
from core.models import Bounds3D, MeshReport
from core.paths import MESH_SUFFIXES, require_existing_file


class MeshInspector(Protocol):
    def inspect(self, path: Path) -> MeshReport: ...


class TrimeshMeshInspector:
    """Anti-corruption layer around trimesh."""

    def inspect(self, path: Path) -> MeshReport:
        resolved = require_existing_file(path, allowed_suffixes=MESH_SUFFIXES)
        try:
            import trimesh  # local import keeps domain import-light
        except ImportError as exc:
            raise MeshLoadError("trimesh is not installed; pip install -r core/requirements.txt") from exc

        try:
            loaded = trimesh.load(resolved, force="mesh", process=True)
        except Exception as exc:  # trimesh raises many exception types
            raise MeshLoadError(f"Failed to load mesh: {resolved} ({exc})") from exc

        if isinstance(loaded, trimesh.Scene):
            geometries = [g for g in loaded.geometry.values() if isinstance(g, trimesh.Trimesh)]
            if not geometries:
                raise MeshLoadError(f"No mesh geometry found in: {resolved}")
            mesh = trimesh.util.concatenate(geometries)
        elif isinstance(loaded, trimesh.Trimesh):
            mesh = loaded
        else:
            raise MeshLoadError(f"Unsupported mesh payload type: {type(loaded)!r}")

        issues: list[str] = []
        if mesh.is_empty:
            issues.append("empty mesh")
        face_count = int(len(mesh.faces)) if mesh.faces is not None else 0
        vertex_count = int(len(mesh.vertices)) if mesh.vertices is not None else 0
        if face_count == 0:
            issues.append("zero faces")
        if vertex_count == 0:
            issues.append("zero vertices")

        watertight = bool(mesh.is_watertight) if not mesh.is_empty else False
        if not watertight:
            issues.append("not watertight")

        volume: float | None = None
        if watertight:
            try:
                volume = float(mesh.volume)
            except Exception:
                volume = None
                issues.append("volume unavailable")
        else:
            issues.append("volume skipped (not watertight)")

        bounds: Bounds3D | None = None
        try:
            b = mesh.bounds
            bounds = Bounds3D(
                min_xyz=(float(b[0][0]), float(b[0][1]), float(b[0][2])),
                max_xyz=(float(b[1][0]), float(b[1][1]), float(b[1][2])),
            )
        except Exception:
            issues.append("bounds unavailable")

        return MeshReport(
            path=str(resolved),
            face_count=face_count,
            vertex_count=vertex_count,
            watertight=watertight,
            volume=volume,
            bounds=bounds,
            issues=issues,
        )


def inspect_mesh(path: Path, inspector: MeshInspector | None = None) -> MeshReport:
    """Inspect a mesh file; injector optional (defaults to Trimesh adapter)."""
    active = inspector if inspector is not None else TrimeshMeshInspector()
    return active.inspect(path)
