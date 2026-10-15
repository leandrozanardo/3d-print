---
name: improve-stl-3mf
description: >-
  Improves STL/3MF models for Bambu Lab A1 Mini (0.4 mm, Bambu Studio) using the
  project MakerWorld-to-recipe playbook and named profiles. Reads from 3ds/original/,
  writes the upgraded artifact to 3ds/upgraded/ with the same basename, and writes
  3ds/plan/<basename>.md (PT-BR) explaining what changed and why. Use when the user
  asks to improve/optimize/refine a print file, mentions MakerWorld quality, or
  points at a file under 3ds/original/.
---

# Improve STL / 3MF (A1 Mini)

## Hard rules

1. **Never** write under `3ds/original/**`.
2. User names the input file; it must exist at `3ds/original/<file>.(stl|3mf)`.
3. `basename` = stem of that file (e.g. `one+Piece.3mf` → `one+Piece`). Same stem for upgraded + plan.
4. Outputs:
   - `3ds/upgraded/<basename>.(stl|3mf)` — prefer `.3mf` when exporting a Studio recipe; keep/repair `.stl` when mesh ops ran
   - `3ds/plan/<basename>.md` — **PT-BR**, what was done and why
5. Target printer: **Bambu Lab A1 Mini**, nozzle **0.4 mm**, slicer **Bambu Studio**. Do not paste X1C/P1 presets.
6. Uncertain numbers → mark **validate on printer** / validar na impressora. Never invent absolute temps as safety rules.
7. Announce: *Using improve-stl-3mf for `<basename>`.*

## Required reading (before edits)

1. [docs/projeto/workflow/makerworld-para-receita.md](../../docs/projeto/workflow/makerworld-para-receita.md) — end-to-end path
2. [docs/projeto/workflow/otimizar-modelo.md](../../docs/projeto/workflow/otimizar-modelo.md) — SOP + CLI
3. [docs/projeto/workflow/checklist-qualidade.md](../../docs/projeto/workflow/checklist-qualidade.md) — gate before done
4. Profile hub: [docs/projeto/perfis-a1-mini/INDEX.md](../../docs/projeto/perfis-a1-mini/INDEX.md)
5. Plan template: [3ds/plan/_template.md](../../3ds/plan/_template.md)
6. Deeper links: [reference.md](reference.md)

## Workflow

Copy and track:

```text
Progress:
- [ ] 1 Confirm input path under 3ds/original/ (user-named)
- [ ] 2 Inspect (CLI)
- [ ] 3 Classify geometry + purpose
- [ ] 4 Pick named A1 Mini profile
- [ ] 5 Orientation / supports / brim / waste
- [ ] 6 Light mesh repair only if allowed → 3ds/upgraded/
- [ ] 7 Emit upgraded same basename
- [ ] 8 Write 3ds/plan/<basename>.md (PT-BR)
- [ ] 9 Checklist quality — no "done" if preview/gate fails
```

### 1–2 Inspect

```bash
npx --yes pnpm@10.12.1 --filter @fix-my-print/cli exec node dist/bin.js inspect-mesh ../../../3ds/original/<file>.stl --json
npx --yes pnpm@10.12.1 --filter @fix-my-print/cli exec node dist/bin.js inspect-3mf ../../../3ds/original/<file>.3mf --json --strict
```

If non-manifold/holes and light repair is allowed:

```bash
npx --yes pnpm@10.12.1 --filter @fix-my-print/cli exec node dist/bin.js repair-mesh ../../../3ds/original/<file>.stl ../../../3ds/upgraded/<basename>.stl --json
```

See [quando-editar-malha](../../docs/projeto/workflow/quando-editar-malha.md).

### 3–5 Decisions (from chat + wiki)

Apply the MakerWorld path: intent → 180³ envelope → PLA default / PETG if needed → remap printer to **A1 Mini** → orient (hide seam, protect show faces) → supports (tree vs normal, paint-off) → named profile → cut waste (no default raft, no blind 100% infill, walls before dense infill).

| Intent | Profile |
|--------|---------|
| Décor / display | `pla-decorativo-superficie-0.4` |
| Tool / load | `pla-ferramenta-resistente-0.4` |
| Miniature | `pla-miniatura-0.4` |
| Character | `pla-personagem-detalhe-0.4` |
| Vase spiral | `pla-vaso-vase-mode-0.4` |
| Functional PETG | `petg-funcional-0.4` (dry first) |

Community heuristics (never hard safety): PEI soap+water; PETG dry before retract chase; Avoid Crossing Walls; outer wall slower for finish; do not copy X1C cooling.

### 6–7 Upgraded artifact

- Same basename as original stem.
- Prefer Studio `.3mf` with A1 Mini machine + chosen process/filament notes documented in the plan.
- If only mesh repair: write `.stl` under `3ds/upgraded/`; still write the plan with slicer recipe.

### 8 Plan (`3ds/plan/<basename>.md`)

Language: **PT-BR**. Start from `_template.md`. Must include:

- Entrada / saída (paths)
- O que foi feito e **por quê** (tabela Alterações)
- Propósito + geometria + links wiki
- Material + perfil nomeado
- Orientação / suportes / brim
- Ops de malha + CLI
- Riscos / validar na impressora
- Wiki citada (paths relativos)

### 9 Done criteria

- [ ] `3ds/original/` untouched
- [ ] `3ds/upgraded/<basename>.*` exists
- [ ] `3ds/plan/<basename>.md` exists, PT-BR, cites profile + why
- [ ] Checklist items addressed or listed as residual risks

## Out of scope

- Mutating originals; ABS/ASA/PC/PA as default on open-frame A1 Mini; inventing OEM numbers; full artistic remesh; printing on the machine for the user.

## Examples

**User:** `melhora o Noob_Saibot_busto_bambu(3).3mf com improve-stl-3mf`

**Agent:** Confirm `3ds/original/Noob_Saibot_busto_bambu(3).3mf` → inspect → classify character → `pla-personagem-detalhe-0.4` → write `3ds/upgraded/Noob_Saibot_busto_bambu(3).3mf` + `3ds/plan/Noob_Saibot_busto_bambu(3).md`.
