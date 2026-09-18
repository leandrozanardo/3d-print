# adicionar-graft-unlazy — Testes

## Evidência (sessão 2026-09-18)

| Check | Comando | Resultado |
|-------|---------|-----------|
| Graft init | `graft init --agents cursor -y --no-global` | OK — 993 nodes, 2201 edges |
| Graft check | `graft check` | OK — wiring in sync |
| Graft refresh script | `pnpm run graft:refresh` | EXIT 0 |
| Graft ask | `graft ask "where is processModel defined?" --source` | hit `processModel` @ `packages/engine/src/processModel.ts:315` |
| Unlazy install | `npx skills add leonxlnx/unlazy --skill unlazy -a cursor -y --copy` | `.agents/skills/unlazy` |
| Unlazy self-check | `node .agents/skills/unlazy/tests/self-check.mjs` | ok 15/15 |
