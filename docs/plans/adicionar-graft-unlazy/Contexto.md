# adicionar-graft-unlazy — Contexto

## Estado

- Fase atual: 5–8 Fecho
- Próximo passo: autorização git (só arquivos de tooling)
- Bloqueios: nenhum de tooling; WIP frontend não relacionado permanece intocado

## Decisões travadas

- Agent: Cursor only (`graft init --agents cursor`)
- Sem writes globais fora do repo (`--no-global`)
- unlazy via `npx skills add leonxlnx/unlazy` (project scope, `--copy`)
- porte `trivial` (tooling estrutural autorizado no prompt)

## Notas de sessão

- Bootstrap: graft CLI já global; unlazy skill ausente → instalado no projeto
- Refresh pré e pós: `pnpm run graft:refresh` exit 0
- Achado Graft: `processModel` em `packages/engine/src/processModel.ts:315`

## Correções

- Nenhuma
