# 01 — Matriz de gaps (wiki empresarial)

**Data:** 2026-08-16  

Legenda de severidade: `P0` bloqueia confiança empresarial · `P1` bloqueia escala do catálogo · `P2` qualidade · `P3` hygiene.

| ID | Dimensão | Gap | Severidade | Evidência | Estado neste batch |
|---|---|---|---|---|---|
| G01 | Front matter | Campos obrigatórios ausentes | P0 | 55+ páginas incompletas | Remediado estruturalmente (listas vazias / supersedes) |
| G02 | Encoding | UTF-8 BOM quebra parser de IDs | P0 | 11 arquivos | Removido |
| G03 | IDs | Related não resolvidos | P0 | 21 aparentes; 2 reais | 2 corrigidos; resto era BOM |
| G04 | Validator | Só links relativos | P0 | `wiki_links.py` | `--strict` implementado |
| G05 | Editorial status | Zero reviewed/verified | P1 | inventário KS | Intencional; falta processo humano |
| G06 | Cobertura | Matriz manual ≠ corpus | P1 | `cobertura.md` | Atualização parcial; derivação automática ainda P1 |
| G07 | Impressoras | Uma máquina profunda | P0 p/ missão catálogo | `21-impressoras/` | Ledger + metas criados; censo não iniciado |
| G08 | Fontes | Source pages incompletas vs template | P1 | campos faltantes | Campos estruturais preenchidos; ETag/licença ainda lacuna |
| G09 | Claims | Números sem citação próxima | P1 | warnings strict | 35 warnings restantes |
| G10 | Absolutos | sempre/nunca sem hedge | P2 | warnings | 6 warnings restantes |
| G11 | Aliases | Alias compartilhado entre IDs | P2 | 49 warnings | Não resolvido (precisa decisão editorial) |
| G12 | Órfãos | Detecção semântica limitada | P2 | política de links | Regra implementada; hubs excluidos |
| G13 | Anchors | Não validados antes | P1 | lacunas.md | Regra implementada |
| G14 | Prerequisites | Ciclos não detectados | P1 | — | Regra + fixture |
| G15 | Deprecated refs | Sem lint | P2 | — | Regra implementada |
| G16 | Review cycles | Sem enforcement | P2 | — | Overdue detectado quando aplicável |
| G17 | Promoção indevida | Risco de auto-verified | P0 | política | Bloqueado sem `reviewed_by` independente |
| G18 | Lifecycle impressoras | Campo ausente no schema vivo | P1 | missão | Enum no schema; A1 Mini ainda sem `lifecycle` explícito |
| G19 | Coverage levels | Não separados de knowledge_status | P1 | missão | Enum `coverage_level` no validator |
| G20 | Legado vs canônico | Duplicação de ranges | P1 | C-001/C-002 | Registrado; migração Maintenance B pendente |
| G21 | Licenças | CC BY-SA ebook | P1 | política fontes | Sem cópia indevida detectada; atribuição ainda operacional |
| G22 | Recuperação LLM | Hubs densos vs atômicos | P2 | AGENT_GUIDE | Parcial |
| G23 | Contradições | Poucos registros formais | P2 | contradicoes.md | Expandir com auditoria de claims |
| G24 | Catálogo mercado | Sem denominador/snapshot | P0 | missão | Ledger criado; snapshot seed apenas |

## Gaps explicitamente fora deste batch

- Ingestão factual de portfólios Bambu/Prusa/Formlabs
- Downloads de manuais/PDFs
- Promoção editorial humana
- Derivação automática completa da matriz de cobertura a partir do corpus
