# 02 — Plano de remediação

**Data:** 2026-08-16  

## Princípios

1. Precisão > volume.
2. Não inventar fontes, números ou compatibilidades.
3. Não apagar legado; usar `supersedes` em migrações.
4. Autor/agente não promove `reviewed`/`verified`.
5. Batches pequenos e resumíveis via `docs/21-impressoras/_meta/progresso.md` e `_meta/continuacao.md`.

## Fase A — Auditoria e gate (este batch)

| # | Ação | Entrega |
|---|---|---|
| A1 | Recalcular estado | `00-current-state.md` |
| A2 | Matriz de gaps | `01-gap-matrix.md` |
| A3 | Aceite | `03-acceptance-matrix.md` |
| A4 | Validador semântico | `core/wiki_frontmatter.py`, `wiki_schema.py`, `wiki_validate.py`, CLI `--strict` |
| A5 | Testes | `tests/test_validate_wiki_strict.py` + fixtures |
| A6 | Remediação estrutural | BOM, campos list, IDs related |
| A7 | Ledger catálogo | `docs/21-impressoras/_meta/*` |

**Status:** concluído neste batch.

## Fase B — Corpus profundo (próximo)

| # | Ação | Critério |
|---|---|---|
| B1 | Reduzir warnings de citação próxima | Toda página atômica com número técnico tem cue + source id |
| B2 | Resolver aliases inconsistentes | Tabela de alias canônico por conceito |
| B3 | Preencher `lifecycle` / `coverage_level` na A1 Mini | Sem promover knowledge_status |
| B4 | Completar source pages (licença, last verified, seções) | Template de fonte |
| B5 | Sincronizar `cobertura.md` com inventário derivado | Script ou tabela gerada |
| B6 | Atualizar `contradicoes.md` / `lacunas.md` | Claims sem evidência → unknown |

## Fase C — Piloto de catálogo (após B)

Ordem mandatória da missão:

1. Bambu Lab (portfólio atual) — cataloged mínimo
2. Prusa Research — cataloged mínimo
3. Formlabs — cataloged mínimo
4. Revisar schema com aprendizados do piloto
5. Só então escalar Creality → demais OEMs

## Fase D — Escala

Creality, Anycubic, Elegoo, QIDI, FlashForge, demais consumer/prosumer, resin professional, industrial polymers, metal, binder/MJ, especialidades, discontinued.

## Rollback

- Validador: modo padrão sem `--strict` permanece link-only.
- Remediação FM: apenas adição de campos vazios / strip BOM / correção de 2 IDs — reversível por git.
- Não houve delete de legado.

## Riscos

| Risco | Mitigação |
|---|---|
| Strict falso-positivo em linguagem de segurança | Hard absolutes vs soft warnings; hedge de safety |
| Preencher sources com IDs genéricos demais | Só IDs existentes; claims ainda marcados heurística |
| Escala prematura do catálogo | Ledger exige piloto Bambu/Prusa/Formlabs antes |
