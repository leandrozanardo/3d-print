---
id: "meta.editorial-guide"
title: "Guia editorial"
summary: "Convenções de idioma pt-BR, nomes técnicos em inglês, filenames kebab-case, front matter, tamanho de página, distinção fato/heurística/hipótese e Definition of Done de página."
doc_type: "policy"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
related: ["meta.templates", "meta.evidence-policy", "meta.source-policy"]
tags: ["editorial"]
---

# Guia editorial

## Idioma

- Conteúdo editorial: **português do Brasil**.
- Na primeira ocorrência de termo relevante, inclua o canônico em inglês: empenamento (warping).
- Settings, G-code, formatos, produtos e recursos de UI: **não traduzir** se a tradução impedir localizar no software.
- Código, chaves, IDs e filenames: inglês / kebab-case sem acento.

## Front matter (núcleo)

Campos obrigatórios em páginas canônicas: `id`, `title`, `summary`, `doc_type`, `domain`, `technology`, `process`, `applies_to`, `not_for`, `knowledge_status`, `evidence_status`, `safety_level`, `confidence`, `last_reviewed`, `review_cycle`, `sources`, `related`, `prerequisites`, `supersedes`, `aliases_pt_br`, `aliases_en`, `tags`.

Valores controlados:

- `knowledge_status`: planned | draft | reviewed | verified | deprecated | archived
- `evidence_status`: strong | mixed | limited | manufacturer-specific | experimental | unknown
- `confidence`: high | medium | low | unknown
- `safety_level`: normal | caution | high | critical

`last_reviewed` nunca é inventado retroativamente. `verified` só com DoD completo.

## Estrutura de página

1. Summary (100–250 palavras, autocontido)
2. O que é / quando importa / o que fazer
3. Aplicabilidade e exclusão
4. Corpo com headings semânticos únicos
5. Procedimentos e trade-offs
6. Segurança (quando aplicável)
7. Relações com outros conceitos
8. Veja também
9. Fontes
10. Lacunas / open questions

## Tamanho

- Atômica comum: 600–1.800 palavras
- Acima de ~2.500: considerar split
- Hub: pode ser maior, sem virar depósito
- Proibido: arquivo de duas frases só para inflar contagem; proibido stub vazio “para completar árvore”

## Distinções obrigatórias

| Marcação | Uso |
|---|---|
| Fato | Definição, princípio físico, spec de fabricante citada |
| Heurística suportada | Regra prática com escopo e fonte/método |
| Hipótese comunitária | Sintoma/caso; não vira hard rule |
| Observação local | Resultado deste projeto; marcar máquina/lote |
| Desconhecido | Explicitar “não há evidência suficiente” |

Números exigem unidade, condição, equipamento/material, fonte, e se são ponto inicial / limite / nominal / medido.

## Absolutos indevidos

Evitar “sempre/nunca/garantia/100%/totalmente seguro” salvo norma de segurança ou regra lógica dura (ex.: não chisel coating). Preferir condicionais.

## Definition of Done (página)

Ver checklist do prompt mestre §33. Resumo: ID único, front matter válido, pt-BR, summary, applies/not-for, fontes, procedimentos quando aplicável, links, hub alcançável, sem placeholder, coverage atualizado.
