from pathlib import Path
import sys
import zipfile

import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.errors import PathValidationError, ThreeMfError
from core.threemf import inspect_3mf


def _minimal_3mf(path: Path) -> None:
    with zipfile.ZipFile(path, "w") as zf:
        zf.writestr(
            "3D/3dmodel.model",
            '<?xml version="1.0"?><model unit="millimeter"></model>',
        )
        zf.writestr("[Content_Types].xml", '<?xml version="1.0"?><Types></Types>')


def test_inspect_minimal_3mf(tmp_path: Path):
    path = tmp_path / "part.3mf"
    _minimal_3mf(path)
    report = inspect_3mf(path)
    assert report.is_zip is True
    assert report.has_model is True
    assert report.member_count >= 2


def test_inspect_non_zip_fails(tmp_path: Path):
    path = tmp_path / "fake.3mf"
    path.write_text("not-a-zip", encoding="utf-8")
    with pytest.raises(ThreeMfError):
        inspect_3mf(path)


def test_inspect_missing_3mf():
    with pytest.raises(PathValidationError):
        inspect_3mf(Path("missing-file.3mf"))
