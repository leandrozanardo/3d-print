# Post-processing

## Summary

Support removal, brim trim, light sanding, primer/paint. **Finishes a good slice** — does not replace orientation, support interface, or seam work. If scars are structural, return to supports/profiles before sanding forever.

## When to use

| Trigger | Use |
|---|---|
| Dimensionally OK print needing cosmetic cleanup | Yes |
| Miniatures/characters headed to paint | Yes |
| Brim/support leftovers | Yes |
| Plan needs post-time estimate | Yes — log in plan |

## When NOT to use

- As a substitute for fixing welded supports in the slicer.
- Acetone vapor on PLA (ABS myth) — don’t.
- Heavy remesh “cleanup” of bad geometry — wrong track.

## Decision tree

```text
Scars from supports?
  ├─ Deep / systematic → fix interface/Z next print ([suporte-dificil](../troubleshooting/suporte-dificil-remover.md))
  └─ Light nubs → clip cold; sand
Material?
  ├─ PLA → sand 400–1000 progressive
  └─ PETG → light pressure only (gums)
Paint?
  └─ Wash → dry → primer → paint (mini workflow)
```

## A1 Mini rules

1. Needle-nose pliers for supports; never pry across faces.
2. Cut brim with blade **parallel** to bed.
3. Sand PLA 400–1000; PETG gums — light pressure only.
4. Light wash before primer.
5. No acetone vapor on PLA.
6. Log post time in `3ds/plan/*.md` when it affects SOP.
7. Bad scars → fix [support interface](../fatiamento/suportes-face-e-interface.md).
8. Wear eye protection when clipping supports.
9. Don’t sand off dimensional fits you still need — measure first.

## Workflow checklist

| Step | PLA | PETG |
|---|---|---|
| Cool fully | Yes | Yes (esp. PEI release) |
| Remove supports | Cold; section cuts | Same; expect stickier |
| Trim brim | Parallel blade | Same |
| Sand | 400 → 600 → 1000 | Light; avoid heat |
| Wash | Mild soap | Same |
| Primer/paint | After dry | Same; adhesion may differ — **validate** |

## Suggested presets (PLA / PETG)

N/A in slicer for post. If scars are structural, return to:

| Issue | Return to |
|---|---|
| Welded support | [Hard supports](../troubleshooting/suporte-dificil-remover.md) |
| Seam scar | [Seam](costura-e-superficie.md) |
| String hair | [Stringing](stringing-e-retract.md) |
| Fat base | [Elephant foot](elephant-foot-e-primeira-camada.md) |

## PLA vs PETG columns

| Task | PLA | PETG |
|---|---|---|
| Clip supports | Easier | Stickier |
| Sand | Predictable | Gummy |
| Paint prep | Standard | **validate** primer |
| Chemical smooth | Not acetone | Not claiming solvents here |

## Failure modes → first checks

| Symptom | Cause | Fix |
|---|---|---|
| Face ripped in post | Welded support / prying | Slicer Z/interface; better technique |
| White stress marks | Over-flex PETG/PLA | Gentler removal |
| Fit ruined after sand | Over-sanded datum | Remake; protect fits |
| Paint peels | Dirty / no wash | Wash; primer |

## Plan.md notes

- Estimate post minutes when comparing tree vs normal.
- Note if next iteration should reduce post via slicer.
- Mark paint workflow **validate on printer/paint system**.

## Related

- [Hard-to-remove supports](../troubleshooting/suporte-dificil-remover.md)
- [Miniatures](../proposito/miniaturas.md)
- [Tree vs normal](../perfis-a1-mini/suportes-arvore-vs-normal.md)
- [Ebook](../../ebook/INDEX.md)
- [Quality index](INDEX.md)
- [Hub](../INDEX.md)

## Sources

- Ebook finishing (CC BY-SA) · community mini painting practice
- Support removal field notes
