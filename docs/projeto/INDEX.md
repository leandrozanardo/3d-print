# Project wiki — A1 Mini (optimization)

Mission: turn models into reliable parts on **Bambu Lab A1 Mini** (**0.4 mm** nozzle) with a Bambu Studio recipe, firm removable supports, fewer failures, and better finish — PLA first, PETG documented day-1.

## Quickstart

Open [`playbook.md`](../../playbook.md), point at a file under `3ds/original/`, follow the SOP. This wiki is the decision graph; the playbook orchestrates.

```bash
npx --yes pnpm@10.12.1 --filter @fix-my-print/cli exec node dist/bin.js validate-wiki ../../docs --strict
```

## Section hubs

| Section | Index | Use |
|---|---|---|
| Hardware | [hardware/INDEX](hardware/INDEX.md) | Bed, extrusion, maintenance, AMS Lite |
| Materials | [materiais/INDEX](materiais/INDEX.md) | PLA, PETG, TPU, ABS/ASA, PA, PC, composites |
| Geometry | [geometria/INDEX](geometria/INDEX.md) | Classify, overhangs, walls, fits |
| Purpose | [proposito/INDEX](proposito/INDEX.md) | Minis, tools, decorative, vases, characters |
| Slicing | [fatiamento/INDEX](fatiamento/INDEX.md) | Orientation, supports, walls, speed |
| Quality | [qualidade-e-acabamento/INDEX](qualidade-e-acabamento/INDEX.md) | Seam, stringing, first layer, post |
| Troubleshooting | [troubleshooting/INDEX](troubleshooting/INDEX.md) | Symptom → cause → fix |
| A1 Mini profiles | [perfis-a1-mini/INDEX](perfis-a1-mini/INDEX.md) | Named 0.4 mm recipes |
| Workflow | [workflow/INDEX](workflow/INDEX.md) | CLI, checklist, `3ds/plan/*.md` |

## Meta & sources

- [How to use this wiki](00-como-usar-esta-wiki.md)
- [Network map](mapa-da-rede.md)
- [Sources & attribution](fontes-e-atribuicao.md)
- [Deployment phases](IMPLANTACAO-FASES.md)

## External corpus

- [Ebook — INDEX](../ebook/INDEX.md) (Maker Guide, CC BY-SA)
- [Printers registry](../printers/INDEX.md)
- [A1 Mini — INDEX](../printers/A1mini/INDEX.md)
- [A1 Mini — local wiki](../printers/A1mini/wiki.md)

## Page-type legend

| Type | Meaning |
|---|---|
| `hardware` | A1 Mini limits & care |
| `material` | Filament & thermal process |
| `geometria` | Shape → support/orientation |
| `proposito` | Intent (strength vs detail vs vase) |
| `perfil` | Named Bambu Studio recipe |
| `falha` | Diagnosis & fix |
| `workflow` | Agent/human SOP + CLI |
