# How to write `plan/*.md`

## Summary

Each artifact in `3ds/upgraded/` gets a **same-basename** report in `plan/` explaining decisions and citing wiki pages. Start from [plan/_template.md](../../../plan/_template.md). Plans are the audit trail for hybrid mode B — not optional fluff.

## When to use

| Trigger | Action |
|---|---|
| Completed optimization | Full plan |
| Aborted run with findings | Partial plan + blockers |
| Dry-run training | Follow [dry-run-exemplo](dry-run-exemplo.md) |

## When NOT to use

- Empty “looks fine” plans without wiki paths.
- Plans that invent temps without **validate on printer**.
- Writing plans instead of fixing broken links (run `validate-wiki`).

## Required structure

| # | Section | Must include |
|---|---|---|
| 1 | Model | original path → upgraded path |
| 2 | Purpose + geometry | tags + links under `geometria/` / `proposito/` |
| 3 | Material | PLA or PETG (+ dry state) |
| 4 | Profile | link `docs/projeto/perfis-a1-mini/...` |
| 5 | Orientation / supports / brim | concrete numbers (type, Z, interface, °) |
| 6 | Mesh | repair? scale? CLI used? |
| 7 | Wiki cited | relative paths list |
| 8 | Risks / validate on printer | open items |
| 9 | CLI | relevant `inspect-*` / `repair-mesh` output |

## Decision tree

```text
Same basename as upgraded artifact?
  ├─ NO → rename to match
  └─ YES → template sections filled?
        ├─ Missing profile link → stop; add
        ├─ Missing validate list → add even if empty (“none”)
        └─ PETG without dry note → add dry state
```

## Citation example

```markdown
## Wiki cited
- docs/projeto/geometria/organicos-e-miniaturas.md
- docs/projeto/proposito/miniaturas.md
- docs/projeto/perfis-a1-mini/pla-miniatura-0.4.md
- docs/projeto/fatiamento/suportes-estrategia.md
- docs/projeto/perfis-a1-mini/suportes-arvore-vs-normal.md
```

## CLI snippet to paste

```bash
python -m core inspect-mesh 3ds/original/<file>.stl --json
# or
python -m core inspect-3mf 3ds/original/<file>.3mf --json
```

Optional repair:

```bash
python -m core repair-mesh 3ds/original/<file>.stl 3ds/upgraded/<file>.stl --json
```

## Studio fields block (recommended table)

| Field | Value | Source profile / note |
|---|---|---|
| Layer height | e.g. 0.10 | pla-miniatura-0.4 |
| Walls | e.g. 3 | … |
| Infill | e.g. 12% gyroid | … |
| Supports | tree / 32° / Z 0.20 / iface 3 | tree vs normal |
| Brim | 5 mm | … |
| Temps | nozzle/bed | material table — **validate** |
| Speeds | outer … | … |

## PLA vs PETG plan extras

| Extra | PLA | PETG |
|---|---|---|
| Dry state | Optional but good | **Required** |
| Plate type | Optional | Textured vs smooth |
| Support Z rationale | Link matrix | Explicit larger Z |
| Service temp claim | Rare | Must say **validate** |

## Quality bar

- [ ] Paths exist (no orphans)  
- [ ] Profile matches purpose  
- [ ] Numbers not hand-waved  
- [ ] Validate list honest  
- [ ] Checklist referenced or completed  

## Failure modes

| Bad plan smell | Fix |
|---|---|
| “Used default settings” | Name profile path |
| No support numbers | Add type/Z/interface |
| Silent mesh scale | Document factor |
| Claimed food-safe / certified strength | Remove — out of scope |
| Copy-paste wrong purpose | Re-classify |

## Related

- [Optimize model](otimizar-modelo.md)
- [Dry-run](dry-run-exemplo.md)
- [Template](../../../plan/_template.md)
- [Checklist](checklist-qualidade.md)
- [Hub](../INDEX.md)

## Sources

- Playbook / start_plan I/O rules
- `plan/_template.md`
