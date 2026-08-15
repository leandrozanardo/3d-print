"""Domain report models — no third-party mesh libraries."""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any


@dataclass(frozen=True, slots=True)
class Bounds3D:
    min_xyz: tuple[float, float, float]
    max_xyz: tuple[float, float, float]

    @property
    def size_xyz(self) -> tuple[float, float, float]:
        return (
            self.max_xyz[0] - self.min_xyz[0],
            self.max_xyz[1] - self.min_xyz[1],
            self.max_xyz[2] - self.min_xyz[2],
        )


@dataclass(slots=True)
class MeshReport:
    path: str
    face_count: int
    vertex_count: int
    watertight: bool
    volume: float | None
    bounds: Bounds3D | None
    issues: list[str] = field(default_factory=list)
    units_assumed: str = "mm"

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        if self.bounds is not None:
            data["bounds"]["size_xyz"] = list(self.bounds.size_xyz)
        return data


@dataclass(slots=True)
class ThreeMfReport:
    path: str
    is_zip: bool
    member_count: int
    members: list[str]
    has_model: bool
    metadata_notes: list[str] = field(default_factory=list)
    issues: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(slots=True)
class RepairReport:
    source_path: str
    output_path: str
    operations: list[str] = field(default_factory=list)
    issues_before: list[str] = field(default_factory=list)
    issues_after: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
