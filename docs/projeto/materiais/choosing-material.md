# Choosing a material

## Summary

Select filament from **intent + active printer capability + environment + post-processing needs**. Marketing names (“aerospace”, “ultra”) do not override physics. Active printer: **A1 Mini** (open frame). Enclosure-class materials are documented for completeness and future printers, but require a written risk plan before use.

## When to use this page

- Starting any new part optimization in the playbook
- Deciding PLA vs PETG vs “something else”
- Onboarding a new spool family into the wiki

## Decision tree

```text
Need max detail / easiest success / miniatures?
  └─ YES → PLA ([pla.md](pla.md)) + pla-* profiles

Need toughness, snap fits, mild heat (~60–80 °C use)?
  └─ YES → PETG ([petg.md](petg.md)) — dry first

Need soft / grippy / living hinge / bumper?
  └─ YES → TPU ([tpu.md](tpu.md)) — slow, minimal retract

Need outdoor UV + higher heat cosmetics?
  └─ YES → ASA over ABS ([abs-asa.md](abs-asa.md))
           On A1 Mini: RISK PLAN (drafts, fumes, warp) or wait for enclosed printer

Need high heat / wear / true engineering polymer?
  └─ PA ([pa-nylon.md](pa-nylon.md)) or PC ([pc.md](pc.md))
           A1 Mini: generally defer — document risk or other machine

Filled / CF / GF / metal / glow?
  └─ Read base polymer first, then [composites.md](composites.md)
           Hardened nozzle if abrasive
```

## Quick matrix (intent × A1 Mini)

| Intent | First choice | Second | Avoid on A1 Mini |
|---|---|---|---|
| Miniatures / characters | PLA | — | TPU, wet PETG |
| Tools / clips | PETG | Tough PLA+ | Wishful PC |
| Decorative indoor | PLA | PETG translucent | ABS fumes indoors |
| Outdoor signage | ASA* | PETG short-term | PLA long sun |
| Flexible strap / feet | TPU | — | Rigid PETG |
| Hot fixture >90 °C | Defer to capable printer | PETG if marginal | PLA |

\*ASA\* = advanced / risk-plan only on open A1 Mini.

## Capability gate (non-PLA/PETG)

Before selecting ABS/ASA/PA/PC (or aggressive composites) on the **active** printer:

1. Read the material page **Printer capability matrix**
2. Confirm dryer, ventilation, plate adhesion strategy
3. Write residual risks in `3ds/plan/<name>.md`
4. Print a sacrificial coupon before the real part
5. Prefer registering a more suitable printer under [`docs/printers/`](../../printers/INDEX.md) when hardware arrives

## Material vs profile mapping (A1 Mini / 0.4)

| Material | Start profile pack | Notes |
|---|---|---|
| PLA | [perfis-a1-mini](../perfis-a1-mini/INDEX.md) `pla-*` | Default |
| PETG | `petg-funcional-0.4` | Dry first |
| TPU | Studio TPU preset + this wiki | No dedicated pack yet — document deviations in plan |
| ABS/ASA/PA/PC | No day-1 pack | Risk plan or other printer |

## Environment & safety checklist

| Factor | PLA | PETG | TPU | ABS/ASA | PA/PC |
|---|---|---|---|---|---|
| Dryer priority | Med | **High** | **High** | Med | **Critical** |
| Ventilation | Low | Low | Low | **Required** | **Required** |
| Enclosure help | Optional | Optional | Optional | **Strongly** | **Required-class** |
| Open A1 Mini fit | Excellent | Good | Possible | Risky | Poor |

## Related

- [Materials index](INDEX.md)
- [PLA](pla.md) · [PETG](petg.md) · [TPU](tpu.md) · [ABS/ASA](abs-asa.md) · [PA](pa-nylon.md) · [PC](pc.md) · [Composites](composites.md)
- [Temperature table](tabela-temperaturas-a1-mini.md)
- [Drying](secagem-e-umidade.md)
- [Printers registry](../../printers/INDEX.md)
- [Profiles registry](../profiles/INDEX.md)
- [Playbook](../../../playbook.md)

## Sources

- Project hardware limits (A1 Mini open frame)
- OEM filament guides + Bambu presets
- Ellis / Teaching Tech calibration order (applied after material gate)
