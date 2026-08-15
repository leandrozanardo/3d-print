"""Typed errors for the 3D-print core toolkit."""

from __future__ import annotations


class CoreError(Exception):
    """Base error for core operations."""

    def __init__(self, message: str, *, code: str = "CORE_ERROR") -> None:
        super().__init__(message)
        self.message = message
        self.code = code


class PathValidationError(CoreError):
    def __init__(self, message: str) -> None:
        super().__init__(message, code="PATH_INVALID")


class UnsupportedFormatError(CoreError):
    def __init__(self, message: str) -> None:
        super().__init__(message, code="UNSUPPORTED_FORMAT")


class MeshLoadError(CoreError):
    def __init__(self, message: str) -> None:
        super().__init__(message, code="MESH_LOAD")


class ThreeMfError(CoreError):
    def __init__(self, message: str) -> None:
        super().__init__(message, code="THREEMF")


class WriteGuardError(CoreError):
    def __init__(self, message: str) -> None:
        super().__init__(message, code="WRITE_GUARD")
