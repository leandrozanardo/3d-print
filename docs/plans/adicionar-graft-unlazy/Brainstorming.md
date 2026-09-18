# adicionar-graft-unlazy — Brainstorming

## Metadados (fail-closed)

```yaml
porte: trivial
sdd: false
status_demanda: CLOSED
continua_de: null
downgrade_approved_by: human
downgrade_at: 2026-09-18T17:02:00-03:00
downgrade_reason: Demanda explícita de tooling estrutural (graft + unlazy), sem mudança de produto
downgrade_skipped_gates: GATES.md de produto; Stop hook unlazy (requer consentimento separado)
```

## Prompt (literal)

adicione o graft nesse projeto e já rode ele e deixe tudo atualizado. Adicione o unlazy também /harness

## Contexto verificado no código

- Caminhos reais (Graft): `graft/` (gitignored), `.cursor/rules/graft.mdc`, `.cursor/mcp.json`
- `docs/plans_old/` consultado: não existe
- CLIs detectadas / instaladas: `node`, `pnpm`, `graft` (@nanonets/graft@0.18.0 global)
- Graft fresco: sim (`graft check` OK)
- unlazy presente: sim (`.agents/skills/unlazy`, self-check 15/15)

## Problema

Repo sem contexto graph (Graft) nem disciplina de gates (unlazy), bloqueando o fluxo harness CLI-first.

## Objetivo

Instalar e atualizar Graft + unlazy no projeto consumidor, com scripts e evidência de freshness.

## Alternativas

| Id | Ideia | Prós | Contras |
|----|-------|------|---------|
| A1 | Só documentação sem instalar | Zero churn | Não atende iron laws 9–10 |
| A2 | Graft deep (`--deep`) + hooks unlazy | Mais rich | Exige `GRAFT_API_KEY` e consentimento de hooks |
| A3 | Graft wiring + unlazy project skill + scripts | $0, dentro do repo, harness-compliant | Deep layer e Stop hook ficam opcionais |

**Decisão:** A3 (autorizada pelo prompt).

## Aceite

| ID | Critério |
|----|----------|
| AC-01 | `graft init` wiring Cursor no repo |
| AC-02 | `graft build && graft check` OK |
| AC-03 | Scripts `graft:build|check|refresh` no `package.json` |
| AC-04 | unlazy em `.agents/skills/unlazy` + `skills-lock.json` |
| AC-05 | `node .agents/skills/unlazy/tests/self-check.mjs` 15/15 |

## Fora de escopo

- `graft build --deep` (sem API key)
- Hook Stop do unlazy (só com consentimento)
- Commit git (perguntar)
- Mudanças de produto / frontend WIP existente
