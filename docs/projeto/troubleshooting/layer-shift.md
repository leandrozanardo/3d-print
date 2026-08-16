# Layer shift

## Summary

Sudden **permanent XY offset** in walls. On A1 Mini: head impact, belt/gantry, part **peeled then pushed**, cable snag, or overspeed/accel on tall parts. **Confirm adhesion first** — peel-then-drag mimics shift and leads to wrong belt panic.

Maintenance: [a1-mini-manutencao](../hardware/a1-mini-manutencao.md).

## When to use

| Symptom | Use |
|---|---|
| Step from a height upward forever | Yes |
| Shift after audible slam | Yes |
| Gradual skew on tall print | Yes → speed/accel |
| Repeatable mid-travel skip | Yes → belt/gantry |

## When NOT to use

- Part clearly unstuck and relocated → [adhesion](falha-adesao.md) / [warping](warping.md).
- Gaps without XY step → [under-extrusion](under-extrusion.md).
- Only first-layer blob → elephant foot / adhesion.

## Decision tree

```text
Is the part still bonded where it started?
  ├─ NO → adhesion/warp; brim; clear debris — not belts first
  └─ YES → audible collision / cable snag?
        ├─ YES → free path; remove loose support chunks
        └─ NO → tall + fast?
              ├─ YES → −20–40% speed; conservative accel
              └─ NO → belt tension / gantry play (Bambu procedure)
```

## Symptom → cause → fix

| Symptom | Cause | Fix |
|---|---|---|
| Step from a height upward | Knock / peel then push | Fix adhesion/brim; clear debris |
| Shift after audible slam | Cable snag / collision | Free cable path; remove loose support |
| Gradual skew tall print | Accel/speed + mass | −20–40% speed; conservative accel |
| Repeatable mid-travel | Belt tension / gantry play | Bambu belt procedure |
| Shift only near AMS move | Path tug | Check AMS Lite routing |
| Layer shift + scarred corner | Detached support hit | Support stability + brim |

## A1 Mini rules

1. Verify part still stuck (false layer shift).
2. Clear toolhead cable path.
3. Reduce speed/accel on tall parts.
4. Check belt tension (official Bambu procedure — don’t overtighten by guess).
5. No abnormal gantry play.
6. Avoid collision with detached support islands.
7. Brim tall/unstable models.
8. After mechanical fix, re-run a small calibration cube — **validate on printer**.

## Suggested presets (PLA / PETG)

| Field | Action | Why |
|---|---|---|
| Speed | −20–40% on suspect jobs | Less inertia |
| Accel | Conservative / stock A1 Mini | Stability |
| Brim | On if tall or tippy | Anti-knock |
| Supports | Stable; not flimsy islands | Anti-debris collision |
| Travel | Avoid crazy cross-part travel if knocking risk | Same |

PLA and PETG share mechanical causes; PETG may peel differently — still rule out adhesion first.

## PLA vs PETG columns

| Aspect | PLA | PETG |
|---|---|---|
| Peel-then-shift mimic | Common if cold/dirty | Common if warp |
| Speed headroom before inertia issues | Higher | Lower recommended |
| Mechanical diagnosis | Same belt/cable rules | Same |

## Failure modes → next node

| If… | Then |
|---|---|
| Reprints shift-free after brim | It was peel/knock |
| Still shifts on cube | Belts/gantry/maintenance |
| Only one material shifts | Check temp/bed for that material stick |
| Shift + under-extrusion | Separate issues; fix extrusion after motion stable |

## Validation coupon (A1 Mini)

1. Print a 20×20×40 mm tower with brim at production speed.
2. If shift appears mid-height with base still glued → motion/accel track.
3. If base moved → adhesion/warp track (false shift).
4. Re-test at −30% speed once; if cured, document speed cap in plan — **validate on printer**.
5. Only after coupon fails both stick and slow tests → belt/gantry maintenance.

## Related

- [Maintenance](../hardware/a1-mini-manutencao.md)
- [Hardware overview](../hardware/a1-mini-visao-geral.md)
- [Adhesion](falha-adesao.md)
- [Warping](warping.md)
- [Matrix](matriz-sintoma-causa.md)
- [Hub](../INDEX.md)

## Sources

- Bambu maintenance · Prusa layer-shift KB
- Open-frame cable management notes
