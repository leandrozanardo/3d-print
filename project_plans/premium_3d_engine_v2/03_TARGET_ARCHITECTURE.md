# 03 — Target Architecture

**Date:** 2026-08-15  
**Style:** Hexagonal / ports & adapters. Python 3.11+ core. JSON contracts for a future TypeScript UI. **No GUI coupling.**

---

## 1. Bounded contexts

| Context | Responsibility | Must not do |
|---|---|---|
| **Intake & artifacts** | Hashes, path guards, run bundle, immutability | Parse geometry |
| **Formats** | Magic, containers, scene graph, loss budget | Decide print settings |
| **Geometry** | Raw/normalized facts, transactions, invariants | Know printer brand |
| **Capabilities** | Printer/nozzle/plate/material/slicer matrices | Hardcode `if printer == "a1"` in optimizer |
| **Knowledge** | Versioned rules, sources, compiler, conflicts | Execute Python from YAML |
| **Optimization** | Candidates, constraints, Pareto, change proposals | Mutate files |
| **Apply** | Authorized ops A–D as transactions | Skip approval on class D |
| **Slicer** | Semantic settings ↔ vendor keys; subprocess | Shell interpolation; networking plugin |
| **Reporting** | Deterministic templates pt-BR / en | Call LLM to invent numbers |
| **AI (optional)** | Explain/classify against schema | Change hard decisions |
| **Calibration** | Local measurements, coupons, expiry | Auto-promote to global rules |
| **Wiki retrieval** | Human pages + context packs | Duplicate canonical numbers |

Historical **system C / optimize B** remains the *operator SOP* until Phase 8. The engine *implements* B as code and grows toward constrained C (class D gated).

---

## 2. Dependency direction

```
CLI / future TS UI
        ↓
 application (use cases: inspect, optimize, apply, validate, reproduce)
        ↓
 domain (entities, invariants, ports)
        ↑
 adapters: trimesh | zip/xml|lib3mf | fs | subprocess slicer | yaml compiler | templates | optional LLM
```

**Rules:**

- Domain does **not** import `trimesh`, `lib3mf`, `subprocess`, filesystem, or LLM SDKs.
- All I/O dependencies **constructor-injected** (composition root: `core/cli.py` today; later `core/app/composition.py`).
- Anti-corruption: keep `TrimeshMeshInspector` pattern (`core/mesh.py:17–18`) and extend; do not let `MeshReport` grow `dict[str, Any]` pipelines.
- Clock and Logger are ports (`Clock`, `Logger`) for determinism in tests.

Existing seed: `MeshInspector` Protocol (`core/mesh.py:13–14`) + `inspect_mesh(..., inspector=)`. **Keep and replicate.**

---

## 3. Pipeline

```
Intake
  → SafeParse (magic, budgets)
  → RawFacts
  → NormalizedScene (explicit; never silently)
  → DeepAnalysis? (Pass 2/3 gated)
  → CapabilityResolution
  → Knowledge/RuleResolution  (KNOWLEDGE_CONFLICT → fail closed)
  → CandidateGeneration
  → ConstraintFilter (hard first)
  → MultiObjectiveEvaluate (Pareto + documented weights)
  → Optional Top-K slice (slicer adapter)
  → ChangeProposal
  → ApprovalGates (class C/D)
  → ApplyTransaction
  → ArtifactValidation
  → DeterministicReport
  → Optional LLM explanation (language only)
```

`--ai off` must complete the whole supported flow.

---

## 4. Ports (minimum)

```
ModelRepository
FormatAdapter (ModelReader, ModelWriter, ScenePreserver, ThreeMfAdapter, CadAdapter)
GeometryAnalyzer
GeometryRepairer
GeometryModifier
OrientationCandidateGenerator
OrientationEvaluator
ConstraintEngine
RuleEngine
PrinterRegistry / MaterialRegistry / NozzleRegistry / PlateRegistry
SlicerAdapter
CostEstimator
ArtifactStore / ArtifactValidator
KnowledgeRetriever / KnowledgeCompiler
ReportRenderer
AiExplanationProvider   # optional; Null implementation default
Clock
Logger
```

---

## 5. Storage and caching

| Store | Content | Notes |
|---|---|---|
| `3ds/original/` | User inputs | Immutable; gitignored; write-guard |
| `3ds/runs/<run-id>/` | Canonical bundle | run-id = hash(input + normalized request + engine version) + short id |
| `3ds/upgraded/`, `3ds/plan/` | Compatibility aliases | Copy/index, not second source of truth; Windows-safe names |
| `knowledge/` authoring YAML | Human-editable | Safe loader (no `!!python`) |
| `knowledge/compiled/` | JSON/SQLite | Deterministic build; CI artifact |
| Analyzer cache | `input_hash + analyzer_version + config_hash + dep_versions` | Local, optional |
| Calibration DB | SQLite or YAML log | Machine-local; not global rules |

---

## 6. Slicer integration boundary

- Adapter talks to an **explicit executable path** (config), version allowlist, argv array (no shell), temp dir, timeouts, captured stdio, network disabled when the host OS allows.
- Semantic setting ids (`process.layer_height`, …) live in domain; vendor maps are versioned data.
- **Do not** copy Bambu `resources/profiles` into this repo until license ADR.
- **Do not** load `bambu_networking` / `BambuSource`. Slicing-only CLI path.
- Fallback: emit `semantic-settings.json` + human UI path hints if project 3MF round-trip is unproven.
- AGPL: subprocess of a **user-installed** binary is the proposed legal/technical boundary (not legal advice). In-process linking and redistributing Studio/Orca is **blocked**.

ADR required before Phase 7 implementation (see `10_DECISION_LOG.md`).

---

## 7. Optional AI boundary

```
AiExplanationProvider.explain(StructuredDecision) -> SchemaValidatedCopy
AiExplanationProvider.classify_purpose(text) -> PurposeDraft (needs user confirm)
```

Null provider is default. Invalid schema → discard, continue deterministic. Mesh bytes never enter prompts. Metadata/filenames are data, not instructions (`ContextPackBuilder`).

Zero provider packages in core extras until Phase 11.

---

## 8. Package layout (target, incremental)

Do **not** explode the tree on day 1. Grow from `core/`:

```
core/
  domain/          # models, errors, invariants
  application/     # use cases
  adapters/
    mesh_trimesh.py
    threemf_zip.py
    fs.py
    slicer_bambu_cli.py
  cli.py           # composition root
knowledge/
  schemas/ sources/ printers/ ...
docs/
  user-guide/ engineering/ architecture/ ...
```

CLI migration: keep old subcommands as stable aliases until Phase 8 (`08_MIGRATION_PLAN.md`).

---

## 9. Alternatives (forced A1/A2/A3)

**A1 — Patch current scripts, wiki remains source of truth.** Minimal. Rejected: cannot version rules, conflicts, or reproducibility.

**A2 — Monolithic `optimize.py` + JSON dump of wiki numbers.** Faster demo. Rejected: god object, folklore YAML, brand `if`s.

**A3 — Ports/adapters + compiled knowledge + phased vertical slice (A1 Mini PLA/PETG).** Selected. Cost: slower; gain: second printer is data.

---

## 10. TypeScript later

Stable JSON schemas for request/report/manifest. No Nest/Next in this program. Python geometry stays.
