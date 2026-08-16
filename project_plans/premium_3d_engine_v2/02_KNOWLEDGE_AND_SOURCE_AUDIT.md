# 02 — Knowledge and Source Audit

**Date:** 2026-08-15  
**Policy:** prose is not canonical. Every future trusted number needs `source_id` + applicability + confidence.

---

## 1. Page inventory (active wiki)

`docs/projeto/` — **71** Markdown files, **7,681** lines.

Hubs present and linked from `docs/projeto/INDEX.md`:

| Hub | Role | Canonicalizable? |
|---|---|---|
| `hardware/` | A1 Mini machine prose | Yes → `knowledge/printers/bambu-a1-mini` |
| `materiais/` | PLA/PETG + gated TPU/ABS/PA/PC/composites | Yes, with **support_level** |
| `geometria/` | Classifiers, overhangs, thin walls, fits, vase | Heuristics + diagnostics |
| `proposito/` | Mini / tool / decorative / vase / character | Purpose presets |
| `fatiamento/` | Orientation, supports, brim, walls, speed | Semantic settings + heuristics |
| `qualidade-e-acabamento/` | Seam, stringing, elephant foot, post | Diagnostics |
| `troubleshooting/` | Symptom matrix | `knowledge/failures/` |
| `perfis-a1-mini/` | 7 named recipes + tree-vs-normal | First compiler vertical slice |
| `workflow/` | Optimize SOP, plan template, checklist | Process docs, not numbers |
| `profiles/INDEX.md` | Multi-printer **placeholder registry** | Not an engine |

Also: `00-como-usar-esta-wiki.md`, `fontes-e-atribuicao.md`, `mapa-da-rede.md`, `IMPLANTACAO-FASES.md`.

`docs/printers/A1mini/`: INDEX, wiki.md, two quick-start MD (combo/unidade) — OCR/reference, keep isolated.

`docs/ebook/`: converted guide + `LICENSE` (CC BY-SA 4.0). `docs/_arquivo/ebook/` originals. **Do not harvest numbers into trusted rules without attribution + ShareAlike handling.**

---

## 2. Duplicated ranges (same numbers, many homes)

These must become **one** compiled fact with citations; prose may *link* the id.

| Claim (approx.) | Locations (sample) |
|---|---|
| PLA nozzle 190–220 °C | `materiais/pla.md`, `tabela-temperaturas-a1-mini.md:50`, `perfis-a1-mini/*`, playbook |
| PLA bed 35–60 °C (~55) | `tabela-temperaturas-a1-mini.md:52`, `hardware/a1-mini-mesa-e-adesao.md:70`, `pla.md` |
| PETG nozzle 220–250 °C (~230–245) | `petg.md:47`, `tabela-temperaturas-a1-mini.md:71` |
| PETG bed 70–80 °C | `petg.md:48`, `tabela-temperaturas-a1-mini.md:73` (older bootstrap said 70–85 — **live wiki capped at 80**) |
| Outer wall PLA 60–120 mm/s | `a1-mini-visao-geral.md:64`, temperature table, profiles |
| Outer wall PETG 40–80 mm/s | `petg.md:51`, visao-geral, profiles |
| Mini layer 0.08–0.12 mm, walls 2–3, tree | `perfis-a1-mini/INDEX.md:48–49`, playbook cheat-sheet |
| Tool layer 0.16–0.20, walls 4–5 | `INDEX.md:50`, playbook |
| Support top Z ~0.2 mm PLA | `geometria/balancos-e-angulos.md:99`, `organicos-e-miniaturas.md:38` |
| Retract DD 0.4–1.2 mm PLA | `materiais/pla.md:38` |
| Overhang practical 45–60° | `geometria/balancos-e-angulos.md`, bootstrap leftover concept |
| Fit clearance 0.2–0.4 mm PLA | `geometria/encaixes-mecanicos.md` |
| Line width ~0.42 @ 0.4 nozzle | `geometria/paredes-finas.md` |
| Brim 5–8 mm | `a1-mini-mesa-e-adesao.md`, `falha-adesao.md`, `brim-raft-saia.md` |
| Overhang ≤45° PLA / 30–45° | `balancos-e-angulos.md`, `suportes-estrategia.md`, `orientacao.md` |
| Vase non-spiral walls 2–3, infill 0–5% | `proposito/vasos.md`, `geometria/vasos-e-vasilhames.md` |
| Build 180×180×180 mm | hardware overview, printers A1mini — **officially corroborated** |

---

## 3. Absolute / unsupported language (reclassify)

| Phrase | Example | Reclass |
|---|---|---|
| **validate on printer** | Dozens of pages; `playbook.md:40` | Honest uncertainty **label**, not a source. Keep as `calibration_required` / `confidence: experimental` |
| “always consider dry for PETG” | `secagem-e-umidade.md:11` | **strong default** (hygroscopic), not hard constraint |
| “Interface always” on cosmetic/mating | `suportes-arvore-vs-normal.md:57` | **strong default** for class C surfaces |
| “never copy Bowden lengths” | `stringing-e-retract.md:5` | **hardware compatibility** (direct drive) |
| “never chisel coating” | `a1-mini-mesa-e-adesao.md:33` | **safety / hardware** |
| “skirt always” | `fatiamento/INDEX.md:32` | **strong default**, not safety |
| “Dry always” before print (PETG) | `perfis-a1-mini/petg-funcional-0.4.md:44` | **strong default** (hygroscopic), not hard constraint |
| “Guarantee interface layers…” | `troubleshooting/suporte-dificil-remover.md:51` | Rephrase in Phase 9 — **strong default**, never product guarantee |
| “NEVER for base quality” (raft on minis) | `proposito/miniaturas.md:29` | **strong default** for scenario 2; scenario 3 may document raft as escalation |
| “never invent precision” | purpose INDEX | Process rule (keep) |
| “guarantee” | not used as print-success claim in wiki (good) | Keep banned in product copy |
| Bootstrap “CoreXY-bed-slinger” | `core/bootstrap_wiki.py:122` | **false**; discard |

No wiki page should remain the only home of a numeric default after Phase 2.

---

## 4. Source quality (current)

`docs/projeto/fontes-e-atribuicao.md` is a **generic bibliography** (Bambu wiki, Ellis, Teaching Tech, CNC Kitchen, Prusa KB, forums, ebook). Individual claims do **not** point to source ids.

Required model (Phase 2): `knowledge/sources/<id>.yaml` + every rule `sources: [id, …]`.

### Official sources checked 2026-08-15

| ID (proposed) | Type | URL | Fact extracted | Confidence |
|---|---|---|---|---|
| `src.bambu.a1mini.techspecs` | official-manufacturer | https://bambulab.com/en/a1-mini/tech-specs | Volume 180³ mm; SS nozzle 0.4 (opt 0.2/0.6/0.8); hotend 300 °C; **bed 80 °C**; plates textured/smooth/dual-texture PEI; flow 28 mm³/s @ABS coupon; PLA/PETG/TPU/PVA Ideal; ABS/ASA/PC/PA/PET/CF-GF **Not Recommended**; max power 150 W | high |
| `src.bambu.a1mini.faq` | official-manufacturer | https://wiki.bambulab.com/en/a1-mini/manual/faq | Same temps; SS 0.4 stock; CF/GF need **hardened** nozzle; AMS lite max 1 unit / 4 colors; **do not enclose**; ambient 10–30 °C; idle ~6 W, print avg ~57 W; microSD required | high |
| `src.bambu.filament.guide` | official-manufacturer | https://wiki.bambulab.com/en/general/filament-guide-material-table | Printer/nozzle/AMS/plate matrix; PLA-CF/Glow need hardened; AMS lite not recommended for PLA Glow / PETG-CF / PLA Wood; PETG nozzle band **240–270 °C** (Bambu products) | high for *Bambu SKUs*; **not** universal PETG |
| `src.bambu.studio.cli` | source-code / wiki | https://github.com/bambulab/BambuStudio/wiki/Command-Line-Usage (edited 2026-03-31) | CLI exists; `--load-settings` / `--load-filaments` require **full** configs not `inherits` profiles; `--slice`, `--orient`, `--export-3mf` | high |
| `src.3mf.core.1.3` | specification | https://3mf.io/spec/core-v1-3-0/ | OPC+ZIP; `model/@unit` default millimeter; objects/build/items | high |
| `src.lib3mf` | specification/impl | https://github.com/3MFConsortium/lib3mf | BSD; official read/write | high |
| Ellis / Teaching Tech / Prusa modeling | respected-guide | ellis3dp.com; teachingtechyt; help.prusa3d.com | Method, not A1 Mini law | medium (method) |

### Conflicts to resolve in compiler (fail closed, do not average)

1. **PETG nozzle:** wiki 220–250 vs Bambu filament guide 240–270. Treat wiki as generic family heuristic; vendor SKU as product override; never merge silently.
2. **“Hotend 300 °C ⇒ material OK”:** tech-specs still **Not Recommended** ABS/ASA/PC/PA. Capability engine must encode **vendor_support** separately from **temperature_window**.
3. **Third-party review bed 100 °C** (non-official 2026 review): **reject**; official bed **80 °C**.
4. **Kinematics:** live wiki bed-slinger = correct; bootstrap CoreXY hybrid = incorrect.

---

## 5. License boundaries

| Corpus | License | Rule |
|---|---|---|
| `docs/ebook/**`, `docs/_arquivo/ebook/**` | CC BY-SA 4.0 (Cláudio Luís Marques Sampaio / Maker Linux) | Isolate; attribute; ShareAlike on **adapted** text; do not dump chapters into trusted YAML |
| Bambu wiki / tech-specs | Vendor copyright | Extract facts + cite URL/date; no table dumps |
| Bambu Studio / Orca / PrusaSlicer | AGPLv3 (+ SFC 2026-05-18 networking-plugin dispute) | **Subprocess only**; do not vendor source or proprietary `bambu_networking` |
| lib3mf | BSD-2/3 family | Integrable after ADR |
| Trimesh / numpy | permissive (verify at lock time) | Adapter only |
| Root repo | **none** | User must choose; do not invent |
| Test models | must be licensed or generated in-test | No random internet STLs |

---

## 6. Canonicalization plan

1. Author YAML under `knowledge/` with JSON Schema; compile to `knowledge/compiled/` (gitignored or CI-built, never hand-edited).
2. First vertical slice: A1 Mini printer profile + 0.4 SS nozzle + textured/smooth PEI + generic-PLA + generic-PETG + 7 purpose profiles **as heuristics with `status: experimental` until each number has a source**. **First purpose profile to compile:** `pla-decorativo-superficie-0.4` (locked for job `one+Piece`, scenario 2): layer 0.12–0.16 mm, walls ~3, infill 10–15% gyroid, ironing off, no raft, brim only if unstable. Source tag `src.legacy.wiki.pla-decorativo-superficie-0.4` — **not** `verified`.
3. Copying wiki numbers into YAML **without** reclassification + sources is an **anti-pattern** (prompt §33). Migration script must tag `legacy_wiki` + `confidence: low` + `calibration_required: true`.
4. Wiki pages gain front matter pointing at rule ids; numeric tables shrink to “see rule X”.
5. `validate-wiki` grows contradiction/orphan/source checks (Phase 9). `bootstrap_wiki.py` is frozen (warning on run).

---

## 7. Per-topic research gaps (do not fill with folklore)

| Topic | Gap | Next primary source |
|---|---|---|
| A1 Mini kinematics name | Official pages avoid “CoreXY”; treat as **bed-slinger** | tech-specs + teardown only if needed |
| Max volumetric for **PLA/PETG** on A1 Mini | Spec quotes 28 mm³/s @ **ABS** coupon | Bambu filament JSON / measured calibration |
| AMS Lite abrasive wear | Qualitative FAQ | filament guide + local log |
| Dual-texture PEI | On tech-specs 2026-08-15; wiki FAQ still textured/smooth | Confirm plate ids in Studio |
| Energy | Idle 6 W / avg 57 W / max 150 W | Mark energy **unknown** unless using these as coarse bounds |
| Orientation optimization literature | Not yet surveyed in-repo | Phase 5 research note (build-orientation papers) — cite, don’t copy |
| Bambu project 3MF extensions | Unknown members | Golden fixtures from **user’s** sanitized projects (private) |
| `one+Piece` scene/plates | Private gitignored 3MF; inspect-3mf is ZIP-only today | Job A uses `--strict`; engine Phase 3 XML; do not commit the model |
