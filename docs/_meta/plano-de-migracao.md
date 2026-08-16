---
id: meta.migration
title: Plano de migração
summary: Migração não destrutiva do corpus legado para a taxonomia 01–23. Categorias
  keep/split/merge/rewrite/move/archive/deprecate/delete-candidate. Nenhuma deleção
  sem confirmação do usuário.
doc_type: plan
domain:
- meta
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 1-month
related:
- meta.inventory
- meta.coverage
- meta.editorial-decisions
tags:
- migration
---
# Plano de migração

## Princípios

1. Sem big-bang destrutivo
2. Inventariar → classificar → destino canônico → corrigir facts → front matter → split/merge → links → validar → log
3. **Não (regra de segurança) delete** nesta iniciativa sem listar aqui e obter confirmação explícita do usuário
4. Preferir `git mv` quando mover
5. Ebook CC BY-SA: não copiar trechos sem atribuição/ShareAlike

## Categorias

| Código | Significado |
|---|---|
| keep-and-enrich | Permanece; enriquecer in-place ou espelhar canônico |
| split | Dividir página grande |
| merge | Unir duplicatas |
| rewrite-with-sources | Reescrever em pt-BR com fontes |
| move | Relocar path |
| archive | Isolar da navegação canônica |
| deprecate | Marcar supersedes |
| delete-candidate | Só após confirmação |

## Mapa inicial (não executado além do vertical slice)

| Origem | Destino | Ação | Status |
|---|---|---|---|
| — | `_meta/*`, hubs 01–23, INDEX, AGENT_GUIDE | create | **feito Wave 0** |
| `projeto/hardware/a1-mini-visao-geral.md` | `21-impressoras/bambu-lab-a1-mini.md` | rewrite-with-sources | **feito vertical slice** (legado intacto) |
| `projeto/materiais/pla.md` | `05-materiais/fff/pla.md` | rewrite-with-sources | **feito vertical slice** |
| `projeto/materiais/petg.md` | `05-materiais/fff/petg.md` | rewrite-with-sources | **feito vertical slice** |
| `projeto/qualidade.../elephant-foot-e-primeira-camada.md` | `10-processo.../fff/primeira-camada.md` | rewrite + split later elephant-foot | **primeira camada feita** |
| `projeto/troubleshooting/warping.md` | `12-problemas.../fff/empenamento.md` | rewrite-with-sources | **feito vertical slice** |
| `projeto/**` restante | taxonomia 01–23 | rewrite/move faseado | pending |
| `ebook/**` | navegação + fontes derivadas | archive (nav) | pending policy use |
| `_arquivo/**` | removido | — | deleted |
| `printers/**` | `21` + `22` | keep-and-enrich | pending |
| `context.md` | fora do KB AM | keep (ops) | n/a |
| `superpowers/**` | fora do KB AM | keep | n/a |

## Delete-candidate

_Nenhum arquivo listado para deleção nesta data._

## Log de migração (sessão)

| Data | Ação | Notas |
|---|---|---|
| 2026-08-15 | Create architecture + vertical slice canônico | Legado `projeto/` não movido nem apagado |
