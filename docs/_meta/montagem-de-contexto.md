---
id: meta.context-assembly
title: Montagem de contexto
summary: Como combinar summary, hard constraints, procedimentos e fontes em Markdown
  puro para resposta prudente de IA, com limites de profundidade de relações e anti-loop.
doc_type: policy
domain:
- meta
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 3-months
related:
- meta.query-routing
- meta.link-policy
tags:
- context
- rag
---
# Montagem de contexto

Somente Markdown — sem vector store obrigatório.

## Ordem de prioridade do pacote

1. Safety / hard constraints aplicáveis
2. Página canônica do conceito
3. Prerequisites diretos
4. Printer + material + slicer context pages (se citados)
5. Uma relação causal de cada lado (cause ↔ fix) se troubleshooting
6. Source pages dos claims numéricos usados
7. Contradiction/gap notes se existirem

## Limites

- Seguir no máximo **1 hop** de `related`/`prerequisites` além do canônico, salvo safety
- Evitar loops: não revisitar o mesmo `id`
- Aliases: resolver para o `id` canônico antes de expandir
- Conflito: incluir ambos os escopos + baixar confidence; não “escolher o meio”
- Citar knowledge IDs na resposta quando útil (`defect.fff.warping`)

## Recusa

Se faltar contexto que muda a recomendação (material molhado? primeira camada grudou?), perguntar **uma** coisa crítica por vez ou declarar assumptions explicitamente.

Se claim for food-contact / medical / safety-critical sem evidência de processo/certificação: **não** concluir adequação.
