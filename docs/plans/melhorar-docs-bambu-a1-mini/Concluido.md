# melhorar-docs-bambu-a1-mini — Concluído

## Aceite 1:1

| ID | Resultado | Evidência |
|----|-----------|-----------|
| AC-01 | ✅ | Canônico A1 Mini + sources oficiais/FAQ; G3 |
| AC-02 | ✅ | `docs/projeto/workflow/makerworld-para-receita.md` + hubs; G2 |
| AC-03 | ✅ | Troubleshooting/qualidade atualizados; G5 |
| AC-04 | ✅ | Política hipótese→heuristic + fontes forum/MakerWorld; G4+G8 |
| AC-05 | ✅ | Slice validate-wiki sem erros nas páginas da demanda; G1 |
| AC-06 | ✅ | Bridges projeto ↔ canônico; G6 |

## DoD 1:1

| ID | Resultado | Evidência |
|----|-----------|-----------|
| DoD-01 | ✅ | Lote 1B/2B/3B/4false + Planejamento PRONTO |
| DoD-02 | ✅ | GATES 8/8 met (`gate-check --status`) |
| DoD-03 | ✅ | Novas `source.*` em `docs/22-fontes/` |
| DoD-04 | ✅ | Sem secrets; classes de evidência; CC BY-SA respeitado |
| DoD-05 | ✅ | Graft refresh OK; G7 |

## Graft pós citado

- `validateWiki` — `packages/knowledge-compiler/src/validate.ts:1059`
- Playbook operacional — `docs/projeto/workflow/makerworld-para-receita.md` (entry MakerWorld→receita)

## Residual tipado

- `BLOCKED_BY_PLAN` / dívida corpus: ~46 `broken_link`/`missing_front_matter` legados fora do slice — não desta demanda.
- `pnpm validate:knowledge` via filter ainda pode falhar com `REPO_BOUNDARY` (`../../docs`); usar `node apps/cli/dist/bin.js validate-wiki docs --strict`.

## Git

Perguntado ao humano: sim — autorizado: pendente
