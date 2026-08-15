# Playbook — print optimization

## Required inputs
- This file (`playbook.md`)
- Model path under `3ds/original/`

## Active stack (change when hardware changes)
- **Active printer:** Bambu Lab A1 Mini → [`docs/printers/A1mini/`](docs/printers/A1mini/INDEX.md)
- **Printer registry:** [`docs/printers/INDEX.md`](docs/printers/INDEX.md) (prepared for additional machines)
- **Slicer:** Bambu Studio (A1 Mini profiles)
- **Default material:** PLA · full materials library under [`docs/projeto/materiais/`](docs/projeto/materiais/INDEX.md)

## Project premises
- System **C (hybrid)**: wiki + agent decide; `core/` inspects/repairs lightly
- Optimization **B**: print recipe + light mesh ops — no heavy remodel unless parametric source or explicit request
- Docs language: **English** for project wiki / playbook; **`3ds/plan/*.md` in Brazilian Portuguese (PT-BR)**
- Never mutate `3ds/original/`
- **Basename rule (mandatory for every job):** `basename = Path(3ds/original/<file>).stem` — e.g. `one+Piece.3mf` → `one+Piece`. All outputs use that stem only: `3ds/upgraded/<basename>.stl`, `3ds/upgraded/<basename>.3mf`, `3ds/plan/<basename>.md`. Never invent a parallel name (`_sample_cube`, `hero-mini`, etc.) for a different original.
- New printers: copy `docs/printers/_TEMPLATE/`, register in printers INDEX — do not invent specs
- New materials: add a page under `materiais/` using `_TEMPLATE.md`, register in materials INDEX

## Pipeline (in order)

1. **Confirm active printer** (registry) + material family
2. **File inventory** — `python -m core inspect-mesh|inspect-3mf … --json`
3. **Classify geometry** → [classifier](docs/projeto/geometria/classificar-geometria.md)
4. **Classify purpose** → [purpose](docs/projeto/proposito/INDEX.md)
5. **Choose material** → [materials](docs/projeto/materiais/INDEX.md) (+ printer capability notes)
6. **Pick profile** → [A1 Mini profiles](docs/projeto/perfis-a1-mini/INDEX.md)
7. **Orientation / supports / brim** → [slicing](docs/projeto/fatiamento/INDEX.md)
8. **Light mesh ops if needed** → [when to edit mesh](docs/projeto/workflow/quando-editar-malha.md)
9. **Emit** `3ds/upgraded/<basename>.stl` and/or `<basename>.3mf` + `3ds/plan/<basename>.md` (PT-BR) from [template](3ds/plan/_template.md) — matching basename
10. **Self-check** → [checklist](docs/projeto/workflow/checklist-qualidade.md)

## Golden rules
- Never write under `3ds/original/`
- **Basename = original stem** for STL + 3MF + plan (see premises) — no exceptions
- Cite wiki pages in every `3ds/plan/*.md`
- Prefer firm removable supports over “zero support” if quality drops
- Mark uncertain numbers **validate on printer**
- Do not apply enclosure-only materials (ABS/ASA/PC/PA*) on A1 Mini without an explicit risk plan
- Proprietary Bambu `.3mf` process settings: best-effort; else document for Studio UI

## Decision cheat-sheet (A1 Mini / 0.4)

| Intent | Start profile | Layer | Notes |
|---|---|---|---|
| Miniature / character | `pla-miniatura-0.4` / `pla-personagem-detalhe-0.4` | 0.08–0.12 | Tree supports; slow outer wall |
| Tool / mechanical | `pla-ferramenta-resistente-0.4` or `petg-funcional-0.4` | 0.16–0.20 | 4–5 walls beat high infill |
| Decorative | `pla-decorativo-superficie-0.4` | 0.12–0.16 | Hide Z-seam |
| Vase | `pla-vaso-vase-mode-0.4` | 0.16–0.28 | Spiralize only if single contour |

## Core CLI
```bash
python -m core validate-wiki docs
python -m core inspect-mesh path.stl --json
python -m core inspect-3mf path.3mf --json
python -m core repair-mesh in.stl out.stl --json
```

## Outputs
- Source: `3ds/original/<basename>.(stl|3mf|…)`
- `3ds/upgraded/<basename>.stl` and/or `3ds/upgraded/<basename>.3mf` (prefer Studio `.3mf` when available)
- `3ds/plan/<basename>.md` (PT-BR)
- All three share **exactly** the original file stem

## Wiki hub
- [Project hub](docs/projeto/INDEX.md)
- [Printers](docs/printers/INDEX.md)
- [Materials](docs/projeto/materiais/INDEX.md)
- [Optimize workflow](docs/projeto/workflow/otimizar-modelo.md)
