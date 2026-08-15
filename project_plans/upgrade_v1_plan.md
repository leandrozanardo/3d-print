# Upgrade v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar o sistema local (playbook + wiki + `core/`) **productizável v1** — ruleset machine-readable, concierge operacional, amostra de relatório pública — sem construir o SaaS completo até os 5 pilots pagos passarem.

**Architecture:** Manter híbrido C (agente/wiki decide; `core/` mecânico). Extrair regras dos perfis Markdown para JSON versionado. Concierge usa o mesmo pipeline do `playbook.md`. SaaS web fica **bloqueado** até Phase 0 exit (ver `project_plans/saas/`).

**Tech Stack:** Python 3.11+ (`core/`), Markdown wiki, JSON Schema (ruleset), templates PT-BR para entrega concierge. Sem Next.js/Nest nesta fase.

**Related:** [`saas/MASTER_PLAN.md`](saas/MASTER_PLAN.md) · [`saas/00-executive-decision.md`](saas/00-executive-decision.md) · [`playbook.md`](../playbook.md)

**Status desta sessão:** Planning + Phase 0 pack **fechados**. Execução de código ruleset/SaaS = prompts futuros.

---

## File map (v1)

| Path | Responsibility |
|---|---|
| `knowledge/ruleset/v0/` (criar) | JSON profiles + printer capabilities + schema |
| `core/ruleset.py` (criar depois) | Load/validate ruleset; CLI `ruleset-validate` |
| `project_plans/saas/phase0/` | Intake, offer, outcome, sample report (ops) |
| `3ds/plan/_template.md` | Continua fonte do plan PT-BR |
| `docs/projeto/perfis-a1-mini/*.md` | Fonte humana; JSON deriva daqui |

---

## Phase gates (resumo)

| Gate | Pass | Fail |
|---|---|---|
| **P0a** Community memo | Assinado (feito 2026-08-15) | — |
| **P0b** Ops pack | Templates prontos (este closeout) | — |
| **P0c** 5 paid pilots | Founder executa fora do IDE | 0/5 ou actionability &lt;3 |
| **V1-rules** | Schema + 7 profiles JSON + tests | Schema drift |
| **SaaS spike** | Só após P0c pass | — |

---

## Task 0: Closeout docs (THIS PROMPT) — DONE when files exist

- [x] `upgrade_v1_plan.md` (este arquivo)
- [x] `saas/phase0/` pack
- [x] Community memo accepted in decisions
- [x] `docs/context.md` updated

---

## Task 1: Ruleset schema (next coding prompt)

**Files:**
- Create: `knowledge/ruleset/schema/profile.schema.json`
- Create: `knowledge/ruleset/schema/capability.schema.json`
- Create: `knowledge/ruleset/v0/printers/a1-mini.json`
- Create: `knowledge/ruleset/v0/profiles/*.json` (7 from INDEX)
- Test: `tests/test_ruleset_schema.py`

- [ ] Write failing test: load schema + reject profile missing `layer_height_mm`
- [ ] Run test — expect FAIL
- [ ] Implement minimal JSON Schema + one profile (`pla-ferramenta-resistente-0.4`)
- [ ] Run test — expect PASS
- [ ] Port remaining 6 profiles from MD (no invented numbers)
- [ ] `python -m core ruleset-validate knowledge/ruleset/v0` (add CLI)
- [ ] Commit (only if user asks)

**Acceptance:** Every named profile in `docs/projeto/perfis-a1-mini/INDEX.md` has a JSON twin with `source_md`, `version`, Studio field map, confidence tags.

---

## Task 2: Geometry facts enrichment (after Task 1)

**Files:**
- Modify: `core/mesh.py` / `core/models.py`
- Test: `tests/test_inspect_mesh.py`

- [ ] Failing test: report includes `bbox_mm`, `triangle_count`, `watertight`
- [ ] Already mostly present — add `aspect_ratio` + `footprint_xy_mm` proxies
- [ ] Document false-positive risk in model docstring
- [ ] Tests green

**Non-goals:** Full overhang heatmap, orientation Pareto (Phase 1 SaaS spike).

---

## Task 3: Concierge dry-run on real customer file (founder)

- [ ] Customer drops STL/3MF in secure channel (not public git)
- [ ] Copy to local `3ds/original/<stem>.*` (gitignored)
- [ ] Run playbook end-to-end
- [ ] Deliver using `phase0/concierge-delivery-template.md`
- [ ] Log `phase0/outcome-log.csv`
- [ ] Repeat until 5 paid

---

## Task 4: Landing sample (static, optional same prompt later)

- [ ] HTML or MD public page from `phase0/sample-public-report.md`
- [ ] CTA waitlist + Pix/concierge price
- [ ] No upload backend yet

---

## Task 5: SaaS code — BLOCKED

Do **not** start `apps/web` until:

1. ≥5 paid pilots logged  
2. Actionability ≥3/5 avg  
3. Success among feedback ≥30%  
4. Explicit GO in `saas/00-executive-decision.md`

Then follow `saas/13-roadmap-backlog.md` Phase 1.

---

## Out of scope for v1 local upgrade

- Headless Bambu Studio / Orca (AGPL)
- Bambu cloud credentials
- Multi-printer gold content
- Fine-tuned LLM
- Lifetime deals

---

## Definition of done — this prompt (closeout)

| Item | Status |
|---|---|
| SaaS planning package complete | **OK** |
| Interviews skipped + community pain accepted | **OK** |
| Phase 0 ops templates | **OK** |
| upgrade_v1_plan executable | **OK** |
| context.md current | **OK** |
| Paid pilots / CNPJ / brand / counsel | **Founder-only** |
| SaaS implementation | **Blocked** |
| git commit | **Only if user asks** |
