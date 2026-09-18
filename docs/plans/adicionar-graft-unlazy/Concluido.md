# adicionar-graft-unlazy — Concluído

## Aceite 1:1

| ID | Resultado | Evidência (ref Testes) |
|----|-----------|------------------------|
| AC-01 | ✅ | `graft init` criou `.cursor/rules/graft.mdc`, `mcp.json`, hooks |
| AC-02 | ✅ | `graft check` OK; `pnpm run graft:refresh` EXIT 0 |
| AC-03 | ✅ | scripts em `package.json` |
| AC-04 | ✅ | `.agents/skills/unlazy` + `skills-lock.json` |
| AC-05 | ✅ | self-check 15/15 |

## DoD 1:1

| ID | Resultado | Evidência |
|----|-----------|-----------|
| DoD-01 | ✅ | Graft fresco + unlazy resolvível no projeto |
| DoD-02 | ✅ | Sem `--deep` sem key; sem Stop hook sem consentimento |

## Graft pós citado

- `processModel` — `packages/engine/src/processModel.ts:315`

## Git

Perguntado ao humano: sim — autorizado: pendente
