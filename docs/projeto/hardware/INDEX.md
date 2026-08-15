# Hardware — Bambu Lab A1 Mini

## Summary

Mechanical and process limits of the **Bambu Lab A1 Mini** that constrain every recipe in this wiki: build volume **180³ mm**, **0.4 mm** direct-drive hotend, PEI sheet adhesion, maintenance, and optional **AMS Lite**. Read this folder before inventing custom speeds or “max machine” profiles. Materials and temps live in [Materials](../materiais/INDEX.md); this folder covers the **machine**.

## When to use

| Situation | Start here |
|---|---|
| Before creating/cloning a Studio process profile | [Overview](a1-mini-visao-geral.md) |
| Swapping build plate or diagnosing stick/peel | [Bed & adhesion](a1-mini-mesa-e-adesao.md) |
| Gaps, clogs, line width, volumetric | [Extrusion & nozzle](a1-mini-extrusao-e-bico.md) |
| Noise, shift, after transport, schedule | [Maintenance](a1-mini-manutencao.md) |
| Multicolor / load fails / flush waste | [AMS Lite](a1-mini-ams-lite.md) |

## Decision tree (folder entry)

```text
Is the problem machine-class?
  ├─ First layer / stick / PEI weld → mesa-e-adesao
  ├─ Gaps / grind / clog / flow → extrusao-e-bico (+ AMS path?)
  ├─ Layer shift / new noise / after move → manutencao
  ├─ Multicolor / load-unload → ams-lite
  └─ Envelope / speed baselines / scope → visao-geral
Geometry/purpose still undecided?
  └─ Do those first — hardware constrains, does not classify intent
```

## A1 Mini rules

| Rule | Guidance |
|---|---|
| Scope | **A1 Mini** + **Bambu Studio** only |
| Nozzle | **0.4 mm** default for all day-1 profiles |
| Materials | PLA primary; full library in materiais/ (capability-gated) |
| False precision | **validate on printer** |
| Chamber | Open — ABS/ASA/PC/PA need risk plan or other printer |
| Local manuals | [docs/printers/A1mini](../../printers/A1mini/INDEX.md) · [registry](../../printers/INDEX.md) |

### Pages

| Page | One-line description | Dense topics |
|---|---|---|
| [Overview](a1-mini-visao-geral.md) | Specs, envelope, motion baselines, in/out of scope | Volume margins, speed bands, purpose fit |
| [Bed & adhesion](a1-mini-mesa-e-adesao.md) | PEI clean/care, PLA vs PETG stick, brim, first layer | Smooth weld risk, temps, brim tree |
| [Extrusion & nozzle](a1-mini-extrusao-e-bico.md) | 0.4 mm line width, layers, flow, clog, volumetric | Decision tree for gaps |
| [Maintenance](a1-mini-manutencao.md) | Checklist, belts, cold pull, validation prints | Intervals, shift prevention |
| [AMS Lite](a1-mini-ams-lite.md) | Multicolor tradeoffs, drying, flush, path faults | AMS vs direct spool |

### Hardware ↔ wiki cross-map

| Hardware concern | Also read |
|---|---|
| Adhesion / warp | [Brim](../fatiamento/brim-raft-saia.md), [warping](../troubleshooting/warping.md) |
| Extrusion gaps | [Under-extrusion](../troubleshooting/under-extrusion.md), [drying](../materiais/secagem-e-umidade.md) |
| Speed / ringing | [Layer & speed](../fatiamento/altura-de-camada-e-velocidade.md) |
| Multicolor characters | [Characters](../proposito/personagens.md) |
| Temps | [Temp table](../materiais/tabela-temperaturas-a1-mini.md) |

### PLA vs PETG machine bias

| Dimension | PLA | PETG |
|---|---|---|
| Plate | Smooth or textured OK | Textured preferred |
| Outer speed | Higher OK | Brake 40–80 mm/s |
| Path / AMS | Easier | Stricter dry + drag |
| Maintenance signal | Forgiving | Moisture masquerades as hardware |

## Smoke-test order (after hardware change)

| Step | Action |
|---|---|
| 1 | Clean plate; full calibration |
| 2 | First-layer patch (PLA or PETG as relevant) |
| 3 | 20 mm cube or short coupon |
| 4 | Resume named intent profile only if pass |

Use after nozzle swap, transport, belt service, or AMS path repair — see [maintenance](a1-mini-manutencao.md).

## Suggested presets (PLA)

Machine baselines: Bambu **PLA @ A1 Mini 0.4**. Intent recipes: [profiles](../perfis-a1-mini/INDEX.md). Hardware pages do not replace named profiles — they constrain them.

| Constraint | Typical |
|---|---|
| Envelope | 180³ + helpers margin |
| Outer faces | 40–80 mm/s |
| Nozzle | 0.4 mm |

## Suggested presets (PETG)

Bambu **PETG @ A1 Mini 0.4** + [petg-funcional-0.4](../perfis-a1-mini/petg-funcional-0.4.md). Dry first. Prefer textured PEI. Never clone PLA process with temps bumped only.

| Constraint | Typical |
|---|---|
| Outer | 40–80 mm/s |
| Bed | 70–80 °C |
| Plate | Textured preferred |

## Related

- [Wiki hub](../INDEX.md)
- [How to use this wiki](../00-como-usar-esta-wiki.md)
- [Materials](../materiais/INDEX.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Slicing](../fatiamento/INDEX.md)
- [Troubleshooting](../troubleshooting/INDEX.md)
- [Purpose](../proposito/INDEX.md)
- [Local A1 Mini docs](../../printers/A1mini/INDEX.md) · [wiki.md](../../printers/A1mini/wiki.md)
- [Playbook](../../../playbook.md)

## Sources

- https://wiki.bambulab.com/en/a1-mini/manual
- Converted local manuals under `docs/printers/A1mini/`
- Bambu Studio machine/filament preset concepts
- Project scope lock (PLA primary, PETG day-1, 0.4 mm)
