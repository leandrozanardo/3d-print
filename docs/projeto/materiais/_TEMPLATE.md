# Material page template

Copy to `materiais/<slug>.md` when adding a filament family.

```markdown
# <Material> on <Printer or "FFF general">

## Summary
…

## When to use
…

## When NOT to use
…

## Printer capability matrix
| Printer | Suitability | Notes |
|---|---|---|
| A1 Mini (active) | … | … |
| <future> | prepared | fill when onboarded |

## Behavior
| Property | Consequence |
|---|---|

## Process rules (A1 Mini unless noted)
1. …

## Suggested presets (this material)
| Parameter | Start | Why |
|---|---|---|

## Drying / storage
…

## Failure modes → first fix
| Symptom | First checks |
|---|---|

## Geometry / purpose pairing
…

## Related
- [Materials index](INDEX.md)
- [Hub](../INDEX.md)

## Sources
…
```

## Checklist before marking “production ready”

- [ ] Temperature tower run on active printer (or explicitly deferred)
- [ ] Capability row filled for every active printer
- [ ] Linked from INDEX + choosing-material
- [ ] No copied numbers from another machine without label
