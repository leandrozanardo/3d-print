"""CLI composition root for the 3D-print core toolkit."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any, Callable

from core.errors import CoreError
from core.mesh import inspect_mesh
from core.repair import repair_mesh
from core.threemf import inspect_3mf
from core.wiki_links import validate_wiki_links
from core.wiki_validate import validate_wiki


def _print_report(data: dict[str, Any], *, as_json: bool) -> None:
    if as_json:
        print(json.dumps(data, ensure_ascii=False, indent=2))
    else:
        for key, value in data.items():
            print(f"{key}: {value}")


def cmd_validate_wiki(args: argparse.Namespace) -> int:
    # Default mode preserves link-only contract; --strict enables enterprise rules.
    if args.strict:
        result = validate_wiki(
            Path(args.root),
            strict=True,
            fail_on_warnings=bool(args.fail_on_warnings),
        )
        payload = result.to_dict()
        if args.json:
            print(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True))
        else:
            if result.ok:
                print(f"OK (strict): {payload.get('stats', {})}")
            for err in result.errors:
                print(err)
            for warn in result.warnings:
                print(f"WARNING: {warn}")
        return 0 if result.ok else 1

    errors = validate_wiki_links(Path(args.root))
    if args.json:
        print(json.dumps({"ok": not errors, "errors": errors}, ensure_ascii=False, indent=2))
    else:
        if not errors:
            print(f"OK: no broken links under {args.root}")
        else:
            for err in errors:
                print(err)
    return 1 if errors else 0


def cmd_inspect_mesh(args: argparse.Namespace) -> int:
    report = inspect_mesh(Path(args.path))
    _print_report(report.to_dict(), as_json=args.json)
    # Non-watertight is informational by default (common for print STLs)
    return 0


def cmd_inspect_3mf(args: argparse.Namespace) -> int:
    report = inspect_3mf(Path(args.path))
    _print_report(report.to_dict(), as_json=args.json)
    return 1 if report.issues and args.strict else 0


def cmd_repair_mesh(args: argparse.Namespace) -> int:
    report = repair_mesh(Path(args.source), Path(args.output))
    _print_report(report.to_dict(), as_json=args.json)
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="python -m core",
        description="Efficient, fail-closed tooling for wiki validation and mesh/3MF inspection.",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    def add_json(p: argparse.ArgumentParser) -> None:
        p.add_argument("--json", action="store_true", help="Emit machine-readable JSON")

    p_wiki = sub.add_parser(
        "validate-wiki",
        help="Validate wiki links; with --strict, run enterprise semantic checks",
    )
    add_json(p_wiki)
    p_wiki.add_argument("root", help="Documentation root directory")
    p_wiki.add_argument(
        "--strict",
        action="store_true",
        help="Enable deterministic enterprise semantic validation (CI gate)",
    )
    p_wiki.add_argument(
        "--fail-on-warnings",
        action="store_true",
        help="With --strict, treat warnings as failing the gate (exit 1)",
    )
    p_wiki.set_defaults(func=cmd_validate_wiki)

    p_mesh = sub.add_parser("inspect-mesh", help="Inspect STL/OBJ/PLY mesh")
    add_json(p_mesh)
    p_mesh.add_argument("path", help="Mesh file path")
    p_mesh.set_defaults(func=cmd_inspect_mesh)

    p_3mf = sub.add_parser("inspect-3mf", help="Inspect 3MF container (read-only)")
    add_json(p_3mf)
    p_3mf.add_argument("path", help="3MF file path")
    p_3mf.add_argument("--strict", action="store_true", help="Exit 1 when issues are present")
    p_3mf.set_defaults(func=cmd_inspect_3mf)

    p_repair = sub.add_parser("repair-mesh", help="Light repair; writes outside 3ds/original only")
    add_json(p_repair)
    p_repair.add_argument("source", help="Input mesh")
    p_repair.add_argument("output", help="Output mesh path (must not be under 3ds/original)")
    p_repair.set_defaults(func=cmd_repair_mesh)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    func: Callable[[argparse.Namespace], int] = args.func
    try:
        return func(args)
    except CoreError as exc:
        payload = {"ok": False, "code": exc.code, "error": exc.message}
        if getattr(args, "json", False):
            print(json.dumps(payload, ensure_ascii=False, indent=2), file=sys.stderr)
        else:
            print(f"ERROR [{exc.code}]: {exc.message}", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print("Interrupted", file=sys.stderr)
        return 130


if __name__ == "__main__":
    raise SystemExit(main())
