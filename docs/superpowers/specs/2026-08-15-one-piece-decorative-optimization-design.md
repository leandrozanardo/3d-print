# Design: First real optimization — `one+Piece.3mf` (decorative / scenario 2)

**Date:** 2026-08-15
**Status:** Approved in brainstorming (sections 1–3)
**Subproject:** A of roadmap A → B → C
**System mode:** C (hybrid) · Optimization mode: B (recipe + light mesh)

---

## 1. Problem

The hybrid wiki + playbook + `core/` stack is implanted, but the first **real** model (`3ds/original/one+Piece.3mf`) has no upgraded artifact or `plan/*.md`. The gap is operational proof of the SOP, not missing documentation volume.

## 2. Goals

- Deliver a **cost-effective decorative PLA** print recipe with **low failure risk** (scenario 2 — not max-quality-at-any-cost).
- Keep decisions **wiki-driven** (low AI dependence): agent orchestrates playbook; numbers come from profile/purpose pages.
- Produce `3ds/upgraded/one+Piece.3mf` + `3ds/plan/one+Piece.md` without mutating `3ds/original/`.

## 3. Non-goals (this spec)

- Subproject **B** (`core/` enrichment: mesh metrics from 3MF, plan scaffolding).
- Subproject **C** (post-print failure → wiki feedback loop).
- Heavy remesh / remodel, SaaS, new printers, enclosure materials on A1 Mini.
- Rewriting proprietary Bambu Studio process XML inside the 3MF.
- Visual companion / high-token UI for comparisons.

## 4. Locked decisions

| Topic | Choice |
|---|---|
| Roadmap order | A → B → C |
| Purpose | Decorative (`docs/projeto/proposito/decorativas.md`) |
| Material | PLA, monochrome, no paint |
| Success bar | Clean surface with material/time cost-benefit + fail-safety (scenario **2**) |
| Artifact | Project `.3mf` copy/light hygiene + `3ds/plan/*.md` (Studio UI for opaque settings) |
| Printer | Bambu Lab A1 Mini · 0.4 mm · Bambu Studio |
| Profile | `pla-decorativo-superficie-0.4` |

## 5. Approaches considered

| ID | Approach | Verdict |
|---|---|---|
| 1 | Plan-only + verbatim 3MF copy | Viable but weaker if plate/settings are noisy |
| **2** | Balanced recipe + light 3MF hygiene | **Selected** |
| 3 | Max quality (0.08 mm, generous supports, brim/raft) | Rejected as default — material/time too high; may appear in plan as optional escalation if Studio preview shows unavoidable overhang risk |

## 6. Architecture

No new application. Reuse existing hybrid stack:

```text
playbook.md
    → core inspect-3mf (JSON baseline)
    → wiki: geometry + purpose(decorative) + material(PLA) + profile + slicing
    → emit: 3ds/upgraded/one+Piece.3mf + 3ds/plan/one+Piece.md
    → human: Bambu Studio preview (seam, supports) → print
```

**Path note:** Per-model plans live under `3ds/plan/` (templates `_template.md` / `_exemplo-dry-run.md`). Local `3ds/original/`, `3ds/upgraded/`, and per-model plans are gitignored; only templates stay tracked.

**Light 3MF hygiene (explicit):** binary copy of the project file into `upgraded/`; in the plan, name which plate/object to print and which Studio fields to set. Do **not** rewrite proprietary `Metadata/*.config` blobs.

**Anti-AI rule:** Do not invent process numbers. Cite wiki pages; mark uncertain values **validate on printer**.

## 7. Data flow & recipe (scenario 2)

1. **Inventory** — `python -m core inspect-3mf 3ds/original/one+Piece.3mf --json`; paste summary into plan.
2. **Classify** — geometry via wiki classifier; purpose locked to decorative.
3. **Material** — PLA monochrome.
4. **Profile** — `pla-decorativo-superficie-0.4`:
   - Layer height **0.12–0.16 mm**
   - Walls **~3**
   - Infill **~10–15%** (e.g. gyroid)
   - Ironing **off** by default
   - Outer wall slower than inner; seam on hidden edge
5. **Orientation / supports / brim**
   - Reorient before adding supports
   - Supports only where overhang requires; selective paint; prefer tree if organic
   - **No raft**; brim only if base is unstable / peel risk
6. **Emit** — copy 3MF to `3ds/upgraded/one+Piece.3mf`; fill `3ds/plan/one+Piece.md` from `3ds/plan/_template.md` with wiki citations.
7. **Self-check** — `docs/projeto/workflow/checklist-qualidade.md`.

**Opaque Bambu settings:** document Studio UI steps in the plan; do not edit proprietary config blobs.

**Escalation note (optional in plan):** if Studio preview shows critical unsupported overhangs that selective support cannot fix cheaply, document a short “escalate toward scenario 3” path — do **not** apply by default.

## 8. Components touched

| Component | Role in A |
|---|---|
| `core` `inspect-3mf` | Existing baseline report only (no new code in A) |
| Wiki purpose/profile/slicing pages | Source of truth |
| `3ds/plan/one+Piece.md` | Recipe, deviations, risks, Studio steps |
| `3ds/upgraded/one+Piece.3mf` | Upgraded project deliverable (local; gitignored) |
| Bambu Studio | Apply profile, support paint, preview |

## 9. Error & edge cases

| Case | Handling |
|---|---|
| Write under `3ds/original/` | Forbidden |
| Part exceeds ~180³ mm or weak base | Plan: scale and/or brim; mark risk |
| Multi-plate / noisy metadata in 3MF | Prefer single printable plate intent in plan; leave unused plates noted |
| Broken / missing model in 3MF | Fail closed; report via inspect issues; do not emit fake success |
| User wants max quality mid-flight | Point to optional scenario-3 escalation section only |

## 10. Acceptance criteria

- [ ] `3ds/original/one+Piece.3mf` unchanged
- [ ] `3ds/upgraded/one+Piece.3mf` exists (local workspace)
- [ ] `3ds/plan/one+Piece.md` exists, based on `3ds/plan/_template.md`, cites decorative purpose + decorative profile + relevant slicing/support pages
- [ ] Recipe matches scenario 2 (no raft; ironing off; low infill; minimal supports documented)
- [ ] Uncertain numbers marked **validate on printer**
- [ ] Quality checklist referenced
- [ ] Studio open-path documented (A1 Mini / 0.4, apply cited profile, review seam + supports)

## 11. Verification

- `python -m core inspect-3mf 3ds/original/one+Piece.3mf --json`
- Open upgraded 3MF in Bambu Studio; apply profile; review preview
- Print is optional for closing A; print outcomes feed **subproject C** later
- Automated tests: **none new** for A (no `core/` changes). If docs are accidentally edited, re-run `python -m core validate-wiki docs` and `pytest`

## 12. Follow-on specs (not implemented here)

| ID | Scope |
|---|---|
| B | Enrich `core/`: mesh metrics from 3MF model XML, optional `plan` scaffold — reduce AI fill-in |
| C | Post-print SOP: symptom → update troubleshooting/wiki |

## 13. Implementation next step

After user review of this file: invoke **writing-plans** to produce a task-level implementation plan for subproject A only.
