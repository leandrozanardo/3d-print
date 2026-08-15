"""3D-print core toolkit — mesh/3MF inspection and wiki link validation."""

from core.mesh import inspect_mesh
from core.models import MeshReport, RepairReport, ThreeMfReport
from core.repair import repair_mesh
from core.threemf import inspect_3mf
from core.wiki_links import validate_wiki_links

__all__ = [
    "inspect_mesh",
    "inspect_3mf",
    "repair_mesh",
    "validate_wiki_links",
    "MeshReport",
    "ThreeMfReport",
    "RepairReport",
]

__version__ = "0.1.0"
