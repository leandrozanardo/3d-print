# Premium 3D Print Engineering Engine Implementation Plan

> **HISTORICAL / SUPERSEDED (2026-08-16):** This Python-first plan must not be executed in parallel with the Fix My Print Lovable + TypeScript/WASM master plan. Keep for audit history only. Authoritative execution path: Phase 00+ under `project_plans/execution/` and `project_plans/adrs/`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the existing hybrid wiki+CLI into a local, deterministic, explainable 3D print engineering engine (A1 Mini + PLA/PETG first) without a big-bang rewrite or SaaS.

**Architecture:** Hexagonal Python core (`core/` stays the package). Domain has no trimesh/subprocess/LLM imports. Knowledge is compiled YAML→JSON with provenance. Pipeline: intake → raw facts → normalized scene → capabilities → rules → candidates → Pareto → gated apply → run bundle. Slicer is an optional external executable adapter. AI is a Null port, default off.

**Tech Stack:** Python ≥3.11 (`pyproject.toml` + uv lock, proposed), pytest, Hypothesis (from Phase 3), Ruff, mypy, trimesh/numpy (adapters), defusedxml (Phase 3), optional lib3mf (Phase 7 ADR), Bambu Studio CLI as user-installed binary (Phase 7).

**Spec pack:** `project_plans/premium_3d_engine_v2/` (00–12). Historical plans remain: `project_plans/start_plan.md`, `docs/projeto/IMPLANTACAO-FASES.md`, `project_plans/saas/` (do not implement). Previous concierge plan copied to `project_plans/saas/upgrade_v1_local_bridge.md`.

## Global Constraints

- DISCOVERY is done; implement **only** the phase the user approves with `APPROVED: IMPLEMENT PHASE <N>`.
- Do not start a broad rewrite; do not move the wiki in Phase 0–1; do not implement SaaS.
- Code, comments, identifiers, schemas, commits: 100% English. Operator `3ds/plan` remains PT-BR; engine templates pt-BR + en.
- Never mutate `3ds/original/`. Never `process=True` as the only inspect path after Phase 3.
- Never present ordinal scores as calibrated probabilities. Never copy wiki numbers into YAML as `verified`.
- No `eval`/Python in rules. No hidden network/LLM. No AGPL vendoring. No Bambu networking plugin.
- Preserve user uncommitted files unrelated to the approved phase.
- TDD: failing test → fail for the right reason → minimal code → pass. Commits only if the user asks.
- Python geometry stays in Python; JSON contracts for a future TypeScript UI.
- First verified printer: Bambu Lab A1 Mini, stock 0.4 mm stainless, Bambu Studio, PLA + PETG.
- `requires-python = ">=3.11"`; local machine verified 3.14.3 with 10 tests passing (2026-08-15).
- Preserve `docs/superpowers/specs/2026-08-15-one-piece-decorative-optimization-design.md`. Subproject **A** (optimize `one+Piece` via playbook, **no new core**) is **not** an engine phase. Do not implement A inside Phase 0–12 unless the user explicitly schedules that job. Subproject B/C map to engine Phase 3+8 and Phase 10 (proposed absorb — see B-SUBPROJECT-B).

---

## File structure (lock-in)

| Path | Responsibility |
|---|---|
| `README.md` | Honest status; create Phase 0 |
| `pyproject.toml` | Packaging, ruff, mypy, pytest; create Phase 1 |
| `core/cli.py` | Composition root; keep existing commands as aliases |
| `core/errors.py` | Typed errors; extend catalog Phase 1 |
| `core/models.py` | Domain reports; split raw/normalized Phase 3 |
| `core/paths.py` | Intake budgets + write guard; strengthen Phase 0 |
| `core/mesh.py` | Trimesh ACL; raw vs processed Phase 3 |
| `core/repair.py` | Repair; become transactions Phase 6 |
| `core/threemf.py` | 3MF; XML inspect Phase 3 |
| `core/wiki_links.py` | Link checker; expand Phase 9 |
| `core/bootstrap_wiki.py` | Freeze Phase 0; do not re-run |
| `core/domain/` | New from Phase 1–2 (ports, rules, VOs) |
| `core/adapters/` | New from Phase 1 (logger, later slicer) |
| `core/application/` | Use cases (`doctor`, later `optimize`) |
| `knowledge/` | Schemas/rules from Phase 2 |
| `tests/test_cli_characterization.py` | Phase 0 |
| `tests/test_write_guard.py` | Phase 0 |
| `3ds/runs/` | Run bundle from Phase 8 |
| `docs/engineering/` | LICENSE_INVENTORY, ERROR_CODES, FIXTURE_CORPUS |

Do not create `apps/web`. Do not delete `docs/ebook` or `docs/_arquivo`.

---

### Task 1: CLI characterization tests

**Files:**
- Create: `tests/test_cli_characterization.py`
- Test: `tests/test_cli_characterization.py`

**Interfaces:**
- Consumes: `core.cli.main(argv: list[str] | None) -> int`, `MeshReport.to_dict()` keys as of HEAD `5eb6949`
- Produces: frozen contract for later tasks (`face_count`, `vertex_count`, `watertight`, `volume`, `bounds`, `issues`, `units_assumed`)

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path
import json
import sys

import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.cli import main


def _cube(path: Path) -> None:
    import trimesh
    trimesh.creation.box(extents=(10.0, 10.0, 10.0)).export(path)


def test_inspect_mesh_json_contract(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    stl = tmp_path / "cube.stl"
    _cube(stl)
    code = main(["inspect-mesh", str(stl), "--json"])
    assert code == 0
    data = json.loads(capsys.readouterr().out)
    for key in (
        "path",
        "face_count",
        "vertex_count",
        "watertight",
        "volume",
        "bounds",
        "issues",
        "units_assumed",
    ):
        assert key in data
    assert data["units_assumed"] == "mm"  # characterization of current (unsafe) default
    assert data["face_count"] > 0


def test_repair_exit_zero_even_if_issues(tmp_path: Path) -> None:
    """Characterization: repair currently exits 0 after export (cli.py:52-55)."""
    src = tmp_path / "cube.stl"
    _cube(src)
    out = tmp_path / "out.stl"
    assert main(["repair-mesh", str(src), str(out), "--json"]) == 0
    assert out.exists()
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_cli_characterization.py -v`

Expected: FAIL with `ModuleNotFoundError` or `file not found` until the file exists; after file exists, should PASS against current HEAD (characterization of present behavior). If it fails on keys, stop and update this plan against HEAD — do not “fix” production to match a guessed contract.

- [ ] **Step 3: Write minimal implementation**

No production change if tests pass on HEAD. If a key is missing, do not add features — fix the test to match reality.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m pytest tests/test_cli_characterization.py tests/test_inspect_mesh.py -q`

Expected: PASS (plus existing 10).

- [ ] **Step 5: Commit** (only if the user asks)

```bash
git add tests/test_cli_characterization.py
git commit -m "test: characterize current inspect-mesh and repair CLI JSON contract"
```

---

### Task 2: Strengthen write guard (project root + traversal)

**Files:**
- Modify: `core/paths.py:40-54`
- Test: `tests/test_write_guard.py`

**Interfaces:**
- Consumes: `assert_not_original_tree(target: Path, project_root: Path | None = None) -> None`
- Produces: same signature; `project_root` actually used; `WriteGuardError` on escape + original tree

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path
import sys

import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.errors import WriteGuardError
from core.paths import assert_not_original_tree


def test_refuses_original_tree(tmp_path: Path) -> None:
    dest = tmp_path / "3ds" / "original" / "x.stl"
    dest.parent.mkdir(parents=True)
    with pytest.raises(WriteGuardError):
        assert_not_original_tree(dest, project_root=tmp_path)


def test_allows_upgraded(tmp_path: Path) -> None:
    dest = tmp_path / "3ds" / "upgraded" / "x.stl"
    dest.parent.mkdir(parents=True)
    assert_not_original_tree(dest, project_root=tmp_path)


def test_refuses_when_resolved_path_is_under_original(tmp_path: Path) -> None:
    original = tmp_path / "3ds" / "original"
    original.mkdir(parents=True)
    sneaky = tmp_path / "3ds" / "upgraded" / ".." / "original" / "x.stl"
    sneaky.parent.mkdir(parents=True, exist_ok=True)
    with pytest.raises(WriteGuardError):
        assert_not_original_tree(sneaky, project_root=tmp_path)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_write_guard.py::test_refuses_when_resolved_path_is_under_original -v`

Expected: FAIL if `resolve()` is not applied before the `3ds/original` check (today `expanduser().resolve()` already exists — this test may PASS; then add symlink test below).

- [ ] **Step 3: Symlink test (skip if OS denies)**

```python
@pytest.mark.skipif(not hasattr(Path, "symlink_to"), reason="no symlink")
def test_refuses_symlink_into_original(tmp_path: Path) -> None:
    original = tmp_path / "3ds" / "original"
    original.mkdir(parents=True)
    outside = tmp_path / "out.stl"
    outside.write_bytes(b"x")
    link = tmp_path / "3ds" / "upgraded"
    link.mkdir(parents=True)
    dest = link / "linked.stl"
    try:
        dest.symlink_to(original / "captured.stl")
    except OSError:
        pytest.skip("symlink privilege unavailable")
    # Guard must use resolved path: creating the file would land in original
    with pytest.raises(WriteGuardError):
        assert_not_original_tree(dest, project_root=tmp_path)
```

Implement: resolve target; if `project_root` set, require `relative_to(project_root)` else `WriteGuardError`; detect `3ds/original` on **resolved** parts; keep existing message.

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/test_write_guard.py tests/test_inspect_mesh.py -q`

Expected: PASS

- [ ] **Step 5: Commit** (if asked)

```bash
git add core/paths.py tests/test_write_guard.py
git commit -m "fix: resolve write targets before enforcing 3ds/original immutability"
```

---

### Task 3: Freeze bootstrap_wiki.py

**Files:**
- Modify: `core/bootstrap_wiki.py` (`main` only)
- Test: `tests/test_bootstrap_frozen.py`

**Interfaces:**
- Consumes: `core.bootstrap_wiki.main`
- Produces: exit without writes unless `PRINT_ENGINE_ALLOW_BOOTSTRAP=I_UNDERSTAND`

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path
import os
import sys

import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core import bootstrap_wiki


def test_bootstrap_refuses_without_env(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("PRINT_ENGINE_ALLOW_BOOTSTRAP", raising=False)
    monkeypatch.setattr(bootstrap_wiki, "PROJETO", tmp_path / "projeto")
    (tmp_path / "projeto").mkdir()
    marker = tmp_path / "projeto" / "INDEX.md"
    marker.write_text("keep\n", encoding="utf-8")
    with pytest.raises(SystemExit) as exc:
        bootstrap_wiki.main()
    assert exc.value.code != 0
    assert marker.read_text(encoding="utf-8") == "keep\n"
```

- [ ] **Step 2: Run — expect FAIL** (`main` still writes)

Run: `python -m pytest tests/test_bootstrap_frozen.py -v`

Expected: FAIL (`INDEX.md` overwritten or exit 0)

- [ ] **Step 3: Minimal implementation**

At top of `main()`:

```python
import os
import sys

def main() -> None:
    if os.environ.get("PRINT_ENGINE_ALLOW_BOOTSTRAP") != "I_UNDERSTAND":
        print(
            "FATAL: core.bootstrap_wiki is obsolete and must not overwrite docs/projeto. "
            "Set PRINT_ENGINE_ALLOW_BOOTSTRAP=I_UNDERSTAND only for archaeology.",
            file=sys.stderr,
        )
        raise SystemExit(2)
    # existing writes follow
```

- [ ] **Step 4: Run — expect PASS**

Run: `python -m pytest tests/test_bootstrap_frozen.py -q`

- [ ] **Step 5: Commit** (if asked)

```bash
git add core/bootstrap_wiki.py tests/test_bootstrap_frozen.py
git commit -m "fix: refuse to re-run obsolete wiki bootstrap without explicit override"
```

---

### Task 4: Honest root README + engineering inventories

**Files:**
- Create: `README.md`
- Create: `docs/engineering/LICENSE_INVENTORY.md`
- Create: `docs/engineering/FIXTURE_CORPUS.md`

**Interfaces:** none (docs). README must not list `optimize` as implemented.

- [ ] **Step 1: Write README with this status matrix (verbatim intent)**

| Feature | Status |
|---|---|
| Wiki link validation | implemented |
| Mesh inspect (processed trimesh) | implemented (not raw) |
| 3MF ZIP inspect | implemented (not Core XML) |
| Light repair | implemented (not transactional) |
| Write guard `3ds/original` | implemented |
| Knowledge compiler | planned |
| Orientation optimizer | planned |
| Slicer adapter | planned |
| SaaS / cloud / LLM required | unsupported |

Include: Python 3.11+, `pip install -r core/requirements.txt`, the four `python -m core` commands, link `docs/projeto/INDEX.md`, link `project_plans/premium_3d_engine_v2/00_EXECUTIVE_DIAGNOSIS.md`, CC BY-SA ebook isolation, “root license: not chosen”.

- [ ] **Step 2: LICENSE_INVENTORY.md** — table from `02_KNOWLEDGE_AND_SOURCE_AUDIT.md` §5 (ebook CC BY-SA, no root license, AGPL slicers subprocess-only, lib3mf BSD). Do not pick a license.

- [ ] **Step 3: FIXTURE_CORPUS.md** — generate geometry in tests; no internet STLs; `3ds/` gitignored; hostile 3MF list from `06`.

- [ ] **Step 4: No code tests.** Manually confirm README does not say the engine “optimizes models” as a present-tense product feature.

- [ ] **Step 5: Commit** (if asked)

```bash
git add README.md docs/engineering/LICENSE_INVENTORY.md docs/engineering/FIXTURE_CORPUS.md
git commit -m "docs: add honest README and license/fixture inventories"
```

**Phase 0 gate:** Tasks 1–4 done; `pytest tests/ -q` green; bootstrap frozen; README honest. Stop and ask approval for Phase 1.

---

### Task 5: pyproject.toml packaging

**Files:**
- Create: `pyproject.toml`
- Keep: `core/__init__.py` — `__version__ = "0.1.0"` **already present** (line 19); do not invent a second version source. Sync `[project].version` to the same string.
- Test: `tests/test_packaging.py`

**Interfaces:**
- Consumes: existing `core/requirements.txt` pins (pytest, trimesh, numpy, pypdf); existing `__version__`
- Produces: installable package `print-engine-core` (import still `core`)

- [ ] **Step 1: Write the characterization + packaging test**

```python
from importlib.metadata import PackageNotFoundError, version

from core import __version__


def test_version_is_semver() -> None:
    parts = __version__.split(".")
    assert len(parts) == 3
    assert all(p.isdigit() for p in parts)
    assert __version__ == "0.1.0"


def test_packaging_metadata_matches_module_version() -> None:
    try:
        assert version("print-engine-core") == __version__
    except PackageNotFoundError:
        raise AssertionError("print-engine-core not installed; run pip install -e .")
```

- [ ] **Step 2: Run before pyproject**

Run: `python -m pytest tests/test_packaging.py -v`

Expected: `test_version_is_semver` **PASS** (version already in `core/__init__.py:19`); `test_packaging_metadata_matches_module_version` **FAIL** (`PackageNotFoundError`) until editable install exists.

- [ ] **Step 3: Minimal pyproject (version must match `core.__version__`)**

```toml
[build-system]
requires = ["setuptools>=69", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "print-engine-core"
version = "0.1.0"
description = "Local deterministic 3D print engineering engine (CLI)"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
  "trimesh>=4.0.0",
  "numpy>=1.26.0",
  "pypdf>=5.0.0",
]

[project.optional-dependencies]
dev = [
  "pytest>=8.0.0",
  "ruff>=0.6.0",
  "mypy>=1.11.0",
]

[tool.setuptools.packages.find]
include = ["core*"]

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.mypy]
python_version = "3.11"
strict = true
files = ["core"]
```

Keep `core/requirements.txt` as a comment-header pointer: `# superseded by pyproject.toml; retained for one release`.

If the user accepted uv (ADR P-PKG): run `uv lock` and add `uv.lock`. If not, `pip freeze --exclude-editable > requirements.lock` is acceptable for Phase 1.

- [ ] **Step 4: Run**

Run: `python -m pip install -e ".[dev]"` then `python -m pytest tests/ -q`

Expected: all tests PASS including both packaging tests

- [ ] **Step 5: Commit** (if asked)

```bash
git add pyproject.toml tests/test_packaging.py core/requirements.txt
git commit -m "build: add pyproject.toml for reproducible installs"
```

---

### Task 6: Structured logger + error JSON schema_version

**Files:**
- Create: `core/domain/__init__.py`
- Create: `core/domain/ports.py`
- Create: `core/adapters/stdio_logger.py`
- Modify: `core/errors.py`, `core/cli.py`
- Test: `tests/test_error_json.py`

**Interfaces:**
- Consumes: `CoreError.code`, `cli.main`
- Produces: `Logger.info(event: str, **fields: object) -> None`; error JSON `{ok, code, error, schema_version}` on stderr

- [ ] **Step 1: Write the failing test**

```python
import json
from pathlib import Path
import sys

import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.cli import main


def test_missing_file_json_has_schema_version(capsys: pytest.CaptureFixture[str]) -> None:
    code = main(["inspect-mesh", "definitely-missing-mesh-xyz.stl", "--json"])
    assert code == 1
    err = json.loads(capsys.readouterr().err)
    assert err["ok"] is False
    assert err["code"] == "PATH_INVALID"
    assert err["schema_version"] == "1.0"
    assert "error" in err
```

- [ ] **Step 2: Run — expect FAIL** (`schema_version` missing)

Run: `python -m pytest tests/test_error_json.py -v`

Expected: FAIL `KeyError: schema_version`

- [ ] **Step 3: Minimal implementation**

In `cli.py` error payload add `"schema_version": "1.0"`. Add `Logger` Protocol in `core/domain/ports.py`; StderrLogger no-ops besides writing one JSON line per event when debug. Do not send logs to stdout.

- [ ] **Step 4: Run — PASS** plus characterization tests.

- [ ] **Step 5: Commit** (if asked)

```bash
git add core/cli.py core/errors.py core/domain core/adapters tests/test_error_json.py
git commit -m "feat: version error JSON and introduce logger port"
```

---

### Task 7: `doctor` command

**Files:**
- Modify: `core/cli.py` (`build_parser`)
- Create: `core/application/doctor.py`
- Test: `tests/test_doctor.py`

**Interfaces:**
- Consumes: importability of trimesh, `MAX_FILE_BYTES`, python version
- Produces: `python -m core doctor --json` → `{ok, python, trimesh, knowledge_compiled, schema_version}`

- [ ] **Step 1: Failing test**

```python
import json
from core.cli import main


def test_doctor_json(capsys) -> None:
    assert main(["doctor", "--json"]) == 0
    data = json.loads(capsys.readouterr().out)
    assert data["schema_version"] == "1.0"
    assert "python" in data
    assert "trimesh_installed" in data
    assert data["knowledge_compiled"] == "missing"
```

- [ ] **Step 2: Run — FAIL** (`invalid choice: doctor`)

- [ ] **Step 3: Implement `cmd_doctor`** reporting `sys.version`, trimesh try/import, `knowledge/compiled` exists?, write-guard module importable. No network.

- [ ] **Step 4: PASS**

- [ ] **Step 5: Commit** (if asked) `feat: add doctor command for environment baseline`

---

### Task 8: Ruff, mypy, CI (no behavior rewrite)

**Files:**
- Modify: `pyproject.toml` (already has tool tables)
- Create: `.github/workflows/ci.yml`
- Create: `docs/engineering/ERROR_CODES.md` (list PATH_INVALID, UNSUPPORTED_FORMAT, MESH_LOAD, THREEMF, WRITE_GUARD, CORE_ERROR)

**Interfaces:** CI must not require Bambu Studio or network to pypi beyond install.

- [ ] **Step 1: Run ruff locally**

Run: `python -m ruff check core tests`

Expected: may FAIL on existing code. Fix only mechanical issues (unused `_ = parts` in `paths.py:53-54`, import order). Do not refactor mesh/repair logic.

- [ ] **Step 2: mypy**

Run: `python -m mypy core`

Expected: likely FAIL (`dict[str, Any]` in models). For Phase 1, set `strict = false` globally and `[[tool.mypy.overrides]] module = "core.models" disallow_any_generics = false` **or** type `to_dict() -> dict[str, object]`. Do not introduce `Any` in new files.

- [ ] **Step 3: CI workflow**

```yaml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        python-version: ["3.11", "3.12"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
      - run: pip install -e ".[dev]"
      - run: python -m pytest tests/ -q
      - run: python -m ruff check core tests
      - run: python -m mypy core
      - run: python -m core validate-wiki docs --json
```

- [ ] **Step 4: Full local gate**

Run: `python -m pytest tests/ -q && python -m ruff check core tests && python -m core validate-wiki docs --json`

Expected: PASS

- [ ] **Step 5: Commit** (if asked) `ci: add pytest ruff mypy matrix for the core package`

**Phase 1 gate:** packaging + doctor + versioned errors + CI files. **No** analyzer rewrite. Stop. Ask `APPROVED: IMPLEMENT PHASE 2`.

---

### Task 9: Knowledge schema + JSON Logic allowlist (Phase 2 start)

**Files:**
- Create: `knowledge/schemas/rule.schema.json`
- Create: `knowledge/schemas/source.schema.json`
- Create: `core/domain/rules.py`
- Create: `knowledge/sources/src.bambu.a1mini.techspecs.yaml`
- Create: `knowledge/rules/rule.a1mini.bed.temp.must_not_exceed_max.yaml`
- Test: `tests/test_rule_engine.py`

**Interfaces:**
- Consumes: rule document fields from `04_DOMAIN_MODEL_AND_SCHEMAS.md` §6
- Produces: `evaluate(rule: Rule, facts: Mapping[str, object]) -> RuleResult` with `status: pass|fail|conflict`

- [ ] **Step 1: Failing test**

```python
from core.domain.rules import evaluate, Rule, RuleError


def test_unknown_operator_fails_closed() -> None:
    rule = Rule(
        id="rule.test.bad-op",
        kind="hard_constraint",
        assertions=[{"pow": [2, 8]}],
        priority=100,
    )
    try:
        evaluate(rule, {})
        raise AssertionError("must fail closed")
    except RuleError as exc:
        assert exc.code == "RULE_OPERATOR_DENIED"


def test_bed_max_blocks_85c() -> None:
    from pathlib import Path
    import json
    # load compiled or YAML via test helper
    facts = {
        "printer": {"temperatures": {"bed_max_c": 80}},
        "resolved": {"material": {"bed_temperature_c": 85}},
    }
    # assertion: <= resolved bed vs max
    rule = Rule(
        id="rule.a1mini.bed.temp.must_not_exceed_max",
        kind="hard_constraint",
        assertions=[{"<=": [{"var": "resolved.material.bed_temperature_c"}, {"var": "printer.temperatures.bed_max_c"}]}],
        priority=100,
    )
    result = evaluate(rule, facts)
    assert result.passed is False
```

- [ ] **Step 2: FAIL** (`core.domain.rules` missing)

- [ ] **Step 3: Implement allowlist** `== != < <= > >= and or not in var missing min max` only. `var` uses dotted paths. No `eval`.

- [ ] **Step 4: PASS** + `python -m core knowledge validate` (add parser command in this task if not present — create `cmd_knowledge_validate` that jsonschema-validates YAML).

Do **not** bulk-import wiki temperature tables as `verified`. Only the official 80 °C bed max starts as `verified` with sources `src.bambu.a1mini.techspecs` and `src.bambu.a1mini.faq`.

---

### Task 10: Compiler determinism (Phase 2)

**Files:**
- Create: `core/application/knowledge_build.py`
- Modify: `core/cli.py` — `knowledge validate` / `knowledge build`
- Test: `tests/test_knowledge_build_hash.py`

- [ ] **Step 1: Failing test** — two builds with shuffled file iteration produce identical `knowledge_build_sha256`.

- [ ] **Step 2–4:** sort paths; canonical JSON (`sort_keys=True`, no whitespace variance); write `knowledge/compiled/build.json`. Gitignore compiled if CI rebuilds; **or** commit compiled for offline — prefer **CI rebuild**, gitignore `knowledge/compiled/`.

---

### Task 11: A1 Mini printer record (Phase 2/4 slice)

**Files:**
- Create: `knowledge/printers/bambu-a1-mini.yaml`
- Test: `tests/test_a1_mini_profile.py`

Assert `build_volume.size_mm == [180,180,180]`, `kinematics == "bed-slinger"`, `temperatures.bed_max_c == 80`, `hotend_max_c == 300`, sources include the two official ids. **Forbidden:** string `CoreXY`.

---

### Tasks for later phases (do not execute until approved)

Implement using the same TDD loop. Exact behavior is specified in `09_PHASED_BACKLOG.md` and `03`–`07`. Summary:

**Phase 3:** magic-byte intake; `inspect` emits `{raw, normalized}`; stop silent concatenate; 3MF Core XML via defusedxml; hostile zip/xml fixtures; budgets.

**Phase 4:** PLA/PETG matrix; CF+stainless hard-block; PETG family vs Bambu SKU conflict test (no averaging 220–250 with 240–270).

**Phase 5:** orientation candidates (planar, OBB, holes, original); feature vector; hard constraints first; Pareto; `optimize --dry-run --ai off`; no slicer.

**Phase 6:** repair transactions; `fill_holes` default False; intentional opening fixture; exit 1 on dirty export.

**Phase 7:** semantic settings; Bambu Studio CLI argv subprocess; version in manifest; **blocked** on user-installed executable (B-STUDIO).

**Phase 8:** `3ds/runs/<run-id>/` + `plan.pt-BR.md` / `plan.en.md` templates; aliases to `3ds/upgraded` and `3ds/plan`.

**Phase 9:** wiki front matter; FTS; contradiction QA; do not auto-generate prose.

**Phase 10:** calibration log; coupons as models+settings.

**Phase 11:** `AiExplanationProvider` Null; schema-gated; default off.

**Phase 12:** second printer as data only; grep CI `if printer` forbidden in `core/application` and `core/domain`.

---

## Self-review (writing-plans)

1. **Spec coverage:** Prompt §6–32 mapped in `premium_3d_engine_v2/12_ACCEPTANCE_MATRIX.md` and phases 0–12 here. SaaS explicitly excluded. Operational job spec `2026-08-15-one-piece-decorative-optimization-design.md` is cross-walked (not implemented here); JOB-A-* lives in `12_ACCEPTANCE_MATRIX.md` §4.
2. **Placeholders:** No TBD implementation steps in Phase 0–1; later phases point at numbered backlog tasks with concrete files.
3. **Type consistency:** `schema_version: "1.0"`, `WriteGuardError`, `printer.bambu.a1-mini`, `RuleError.code = RULE_OPERATOR_DENIED`, bed max rule id matches `04`.

## Execution

Do not implement in the same turn as planning. After approval, one phase only.

**Recommended first implementation command:** `APPROVED: IMPLEMENT PHASE 0`  
(The master prompt’s template mentioned Phase 1; Phase 0 is still unfinished: README, write-guard tests, bootstrap freeze.)
