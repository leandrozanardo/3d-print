# Seam & surface

## Summary

**Z-seam** = where each perimeter loop closes. Hide on a back/hidden edge, or scatter if a single vertical line looks worse. **Ringing**, wrong **flow**, and high **outer-wall speed** mark walls more than micro-seam tweaks. On A1 Mini day-1: slow the outer wall before chasing pressure-advance experiments.

## When to use

| Trigger | Use |
|---|---|
| Decorative / character visible walls | Yes |
| Visible vertical scar | Yes |
| Flat tops needing ironing | Optional section |
| Ghosting / ringing on letters | Yes — speed/flow first |

## When NOT to use

- Gaps between walls → [under-extrusion](../troubleshooting/under-extrusion.md).
- Hairs between towers → [stringing](stringing-e-retract.md).
- Support pits → [hard supports](../troubleshooting/suporte-dificil-remover.md).

## Decision tree

```text
Single vertical scar acceptable if hidden?
  ├─ YES → Seam Aligned / Back on hidden edge
  └─ NO → Nearest / Random to break line (may look noisier)
Walls still marked after seam hide?
  ├─ Outer too fast → drop outer wall speed
  ├─ Flow uncalibrated → calibrate 0.95–1.00
  └─ Ringing → −accel/speed; check loose panels
Flat top critical?
  └─ Ironing On only there — else Off
```

## A1 Mini rules

1. **Seam position:** `Aligned` / `Back` on hidden edge; `Nearest` spreads artifacts — use only if aligned looks worse.
2. Drop **outer wall speed** before chasing seam ghosts.
3. Calibrate **flow** before chasing ringing/ghosting.
4. **Ironing:** flat cosmetic tops only; time cost high — default off.
5. **Pressure advance / flow dynamics:** keep Bambu filament profile; change only after Ellis-style understanding — **validate on printer**.
6. Slow outer wall beats random PA tweaks for A1 Mini day-1.
7. Inner walls can stay faster than outer.
8. PETG: even slower outer; don’t max cooling on structural walls.

## Suggested presets (PLA)

| Bambu Studio field | Value | Why |
|---|---|---|
| Seam position | Aligned @ hidden edge / Back | Cosmetics |
| Outer wall speed | 50–90 mm/s (décor); 40–70 faces | Surface |
| Inner wall speed | Higher than outer | Time |
| Ironing | Off (On only critical flats) | Time vs finish |
| Flow ratio | Calibrated ~0.95–1.00 | Walls |
| Accel | Stock / slightly conservative | Anti-ring |
| Seam gap / wipe | Studio defaults first | Stability |

## Suggested presets (PETG)

| Bambu Studio field | Value | Why |
|---|---|---|
| Outer wall speed | 40–70 mm/s | More viscous |
| Seam | Same logic as PLA | — |
| Cooling | Moderate; don’t max on structural | Layer bond |
| Ironing | Usually off | String/scar risk |
| Flow | Calibrate after dry | Moisture fools eyes |

## PLA vs PETG columns

| Dimension | PLA | PETG |
|---|---|---|
| Outer speed headroom | Higher | Lower |
| Seam strategy | Same | Same |
| Gloss banding | Mild | More visible |
| PA experiments | Last | Last + dry first |

## Failure modes → first checks

| Symptom | Likely cause | Fix |
|---|---|---|
| One tall scar | Seam on show face | Move seam |
| Dashed vertical noise | Nearest seam + fast outer | Align or slow |
| Ripples near corners | Ringing / accel | −speed/accel |
| Bulging seams | Over-extrusion | Flow down |
| Matte/gloss bands | Temp/fan swing | Stabilize |
| Ironing scars | Iron flow/speed wrong | Off or tune coupon — **validate** |

## Surface priority ladder

1. Orientation (hide seam + overhangs)
2. Outer wall speed
3. Seam position
4. Flow calibration
5. Accel / ringing
6. PA / flow dynamics (advanced)
7. Ironing / post

## Related

- [Decorative intent](../proposito/decorativas.md)
- [Characters](../proposito/personagens.md)
- [Layer height & speed](../fatiamento/altura-de-camada-e-velocidade.md)
- [PLA decorative profile](../perfis-a1-mini/pla-decorativo-superficie-0.4.md)
- [Symptom matrix](../troubleshooting/matriz-sintoma-causa.md)
- [Quality index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Ellis Print Tuning Guide (seam / PA)
- Teaching Tech surface notes
