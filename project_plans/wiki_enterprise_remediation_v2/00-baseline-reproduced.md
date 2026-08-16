# Baseline reproduced — wiki enterprise remediation v2

**Worktree:** `.tmp/wiki-enterprise-final-c75213a`
**Generated:** 2026-08-16T07:21:11.075Z
**Scope:** Markdown under `docs/` with front matter `id`, excluding `projeto/`, `ebook/`, `printers/`, `superpowers/`, `_arquivo/`, and `context.md`.
**Artifact:** `research/baseline-metrics.json`

## Exact counts

| # | Metric | Value |
|---|---|---|
| 1 | Canonical pages with front matter `id` | **741** |
| 2 | Printers by `coverage_level` | `documented`: **353**; `troubleshooting-mapped`: **1** (total **354**) |
| 3 | Printers whose sources are ONLY `*-official-products` / `manufacturer-product-listing` (no model-specific source) | **311** |
| 4 | Lacuna bullets across printers (`## Lacunas`) | **2059** |
| 5 | Normalized body hash uniqueness | unique **344** / **354** printers; duplicate groups **9**; printers in dup groups **19**; ratio **0.971751** |
| 6 | Unit-splitting citations (`mm ([…])/s`) | **0** |
| 7 | Occurrences of `heurística editorial (sem fonte pinada)` | **0** |
| 8 | Sources without `canonical_url` in FM | **74** / 130 |
| 9 | Sources without Claims and/or Limitações sections | **10** / 130 |
| 10 | `see body` / `carried from prior` | **0** / **0** |
| 11 | Troubleshooting pages with empty `sources` | **2** / 17 |
| 12 | Sample contradiction (Anycubic Kobra 3) | see below |

## Top 10 duplicate body groups

1. **size 3** — hash `5c81662a3a5d…`
   - `21-impressoras/renishaw-renam-500d.md`, `21-impressoras/renishaw-renam-500s.md`, `21-impressoras/trumpf-truprint-1000.md`
2. **size 2** — hash `747de48be325…`
   - `21-impressoras/bambu-lab-h2c.md`, `21-impressoras/bambu-lab-h2s.md`
3. **size 2** — hash `f64e9fabe0b7…`
   - `21-impressoras/farsoon-403p.md`, `21-impressoras/farsoon-ht1001p.md`
4. **size 2** — hash `15cf5236bdc4…`
   - `21-impressoras/hp-jet-fusion-5000.md`, `21-impressoras/hp-jet-fusion-5400.md`
5. **size 2** — hash `852e48d78974…`
   - `21-impressoras/mimaki-3dgd-1800.md`, `21-impressoras/mimaki-3duj-553.md`
6. **size 2** — hash `6a15d637cb56…`
   - `21-impressoras/mingda-md-1000d.md`, `21-impressoras/mingda-md-400d.md`
7. **size 2** — hash `bf9243e9f479…`
   - `21-impressoras/optomec-lens-cs-1500.md`, `21-impressoras/optomec-lens-cs-250.md`
8. **size 2** — hash `a81671582d8f…`
   - `21-impressoras/phrozen-sonic-mighty-12k.md`, `21-impressoras/phrozen-sonic-mighty-16k.md`
9. **size 2** — hash `7a379bc895a9…`
   - `21-impressoras/stratasys-f170.md`, `21-impressoras/stratasys-f900.md`

## Metric 12 — Anycubic Kobra 3 contradiction

| Role | Path |
|---|---|
| Printer page | `21-impressoras/anycubic-kobra-3.md` |
| Source page | `22-fontes/anycubic-kobra-3.md` |

- `printer_says_unpublished=true` (lines still asserting **não publicado** in Manuais / Hardware / Materiais).
- `specs_section_already_has_sourced_table=true`.
- `source_has_numeric_specs=true` on `source.anycubic-kobra-3` **Claims sustentados** (build volume, speeds, nozzle/bed temps).
- Residual contradiction: source pins numeric OEM claims while printer sections still say hardware/manuals/material matrix are unpublished on listing evidence.

### Unpublished lines (printer)

- Mapa de manuais específicos de **Kobra 3**: não publicado / não localizado na superfície citada em 2026-08-16. Próximo passo: portal de suporte anycubic + PDF por SKU.
- Hardware detalhado (eixos, hotend/óptica/energia, sensores, revisões) de **Anycubic Kobra 3**: **não publicado** na evidência de listagem. Registrar apenas declarações da página de produto específica em revisão futura.
- Compatibilidade Ideal/Capable/Not Recommended de **Kobra 3**: **não publicada** na listagem genérica citada. Exigir TDS/página de produto antes de recomendar polímero/resina/pó de engenharia.

## Supplemental near-misses (not exact requested phrases)

| Near-miss | Value |
|---|---|
| `sem fonte pinada` (any wording) | **24** |
| `mm ([` citation openings | **63** |

## Method notes

- **Generic source:** id ends with `-official-products` **or** linked source page has `source_type: manufacturer-product-listing`.
- **Body normalization:** lowercase, collapse whitespace, replace title / model_name / manufacturer_id / aliases / printer slug tokens (length ≥ 3) with `MODEL`, then SHA-256.
- **Unit-splitting regex:** `mm\s*\(\[[^\]]*\](?:\([^)]*\))?\)\s*/\s*s`
- **Lacuna bullets:** lines matching `^\s*[-*]\s+\S` under `## Lacunas` on `doc_type: printer` pages.
- Script: `research/compute-baseline.mjs`

## Troubleshooting empty sources (detail)

- `12-problemas-e-diagnostico/fff/indice-por-sintoma.md` (`troubleshoot.fff-symptom-index`)
- `12-problemas-e-diagnostico/fff/layer-shift.md` (`defect.fff.layer-shift`)

## Unit-splitting samples

_none_
