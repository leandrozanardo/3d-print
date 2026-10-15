# melhorar-docs-bambu-a1-mini — Testes

## Evidências

| Gate | Resultado | Como |
|------|-----------|------|
| G1 | PASS | `node ../../../scripts/verify-bambu-a1-mini-docs-demand.mjs g1` via gate-check --approve |
| G2 | PASS | idem g2 — playbook + INDEX |
| G3 | PASS | idem g3 — canônico A1 Mini |
| G4 | PASS | idem g4 — fontes comunitárias |
| G5 | PASS | idem g5 — troubleshooting files |
| G6 | PASS | idem g6 — hub bridges |
| G7 | PASS | `pnpm run graft:refresh` → graph check: OK |
| G8 | PASS | revisão manual 2026-10-15 (EVIDENCE no ledger) |

Baseline `validate-wiki --strict` do corpus inteiro ainda tem ~46 erros legados (broken_link etc.); G1 prova slice desta demanda sem erros novos.

## Comandos

```bash
node apps/cli/dist/bin.js validate-wiki docs --strict --json
node scripts/verify-bambu-a1-mini-docs-demand.mjs g1
pnpm run graft:refresh
node .agents/skills/unlazy/scripts/gate-check.mjs --status docs/plans/melhorar-docs-bambu-a1-mini/GATES.md
```
