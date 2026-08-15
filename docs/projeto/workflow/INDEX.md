# Workflow

## Summary

Operational SOP for mode **C hybrid / B optimize**: inspect model with `python -m core`, classify via wiki, pick A1 Mini profile, light mesh ops if allowed, emit `3ds/upgraded/` + `plan/<name>.md`. Entry ritual: [playbook.md](../../../playbook.md) + a file under `3ds/original/`.

Never mutate originals. Cite wiki pages in every plan.

## When to use

| Trigger | Action |
|---|---|
| Every optimization run | Follow [otimizar-modelo](otimizar-modelo.md) |
| Training agents/humans | [dry-run-exemplo](dry-run-exemplo.md) |
| Gate before done | [checklist-qualidade](checklist-qualidade.md) |
| Mesh repair question | [quando-editar-malha](quando-editar-malha.md) |
| Writing the report | [como-escrever-plan-md](como-escrever-plan-md.md) |

## Decision tree (pipeline)

```text
playbook + 3ds/original/<file>
  → inspect (core)
  → classify geometry + purpose
  → pick profile (PLA/PETG)
  → orientation / supports / brim
  → light mesh? (only if allowed)
  → upgraded artifact + plan.md
  → checklist gate
```

## A1 Mini rules

| # | Rule |
|---|---|
| 1 | Never write under `3ds/original/` |
| 2 | Cite wiki pages in every plan |
| 3 | Uncertain values → **validate on printer** |
| 4 | Hardware A1 Mini; PLA default, PETG when required |
| 5 | Prefer named profiles over ad-hoc knobs |
| 6 | Mode B: recipe + light mesh only |

## Pages

| Page | Role |
|---|---|
| [Optimize model](otimizar-modelo.md) | Full pipeline + CLI |
| [Quality checklist](checklist-qualidade.md) | Pre/post gate |
| [When to edit mesh](quando-editar-malha.md) | Mode B mesh bounds |
| [How to write plan.md](como-escrever-plan-md.md) | Report structure |
| [Dry-run example](dry-run-exemplo.md) | Didactic walkthrough |

## Related

- [Hub](../INDEX.md)
- [How to use this wiki](../00-como-usar-esta-wiki.md)
- [Profiles](../perfis-a1-mini/INDEX.md)
- [Troubleshooting](../troubleshooting/INDEX.md)
- [Playbook](../../../playbook.md)

## Sources

- `start_plan.md` / `playbook.md` / `core/README.md`
