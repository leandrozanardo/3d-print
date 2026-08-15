from pathlib import Path
import sys

import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.errors import PathValidationError, WriteGuardError
from core.mesh import inspect_mesh
from core.repair import repair_mesh


def _write_cube(path: Path) -> None:
    import trimesh

    mesh = trimesh.creation.box(extents=(10.0, 10.0, 10.0))
    mesh.export(path)


def test_inspect_cube_reports_faces(tmp_path: Path):
    stl = tmp_path / "cube.stl"
    _write_cube(stl)
    report = inspect_mesh(stl)
    assert report.face_count > 0
    assert report.vertex_count > 0
    assert report.bounds is not None


def test_inspect_missing_file_raises():
    with pytest.raises(PathValidationError):
        inspect_mesh(Path("definitely-missing-mesh-xyz.stl"))


def test_repair_refuses_original_tree(tmp_path: Path):
    src = tmp_path / "cube.stl"
    _write_cube(src)
    # Simulate 3ds/original destination
    original_out = tmp_path / "3ds" / "original" / "cube_fixed.stl"
    original_out.parent.mkdir(parents=True)
    with pytest.raises(WriteGuardError):
        repair_mesh(src, original_out)


def test_repair_writes_upgraded(tmp_path: Path):
    src = tmp_path / "cube.stl"
    _write_cube(src)
    out = tmp_path / "3ds" / "upgraded" / "cube_fixed.stl"
    report = repair_mesh(src, out)
    assert out.exists()
    assert "merge_vertices" in report.operations
