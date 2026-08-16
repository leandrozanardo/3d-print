---
id: "meta.index"
title: "Governança da base de conhecimento"
summary: "Portal da camada _meta: inventário, arquitetura, ontologia, políticas editoriais, cobertura, migração e protocolo de continuação da wiki de manufatura aditiva."
doc_type: "hub"
domain: ["meta", "governance"]
technology: []
process: []
applies_to: ["maintainers", "ai-agents"]
not_for: ["end-user-print-recipes"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "3-months"
sources: []
related: ["meta.architecture", "meta.ontology", "meta.continuation"]
prerequisites: []
supersedes: []
aliases_pt_br: ["governança", "meta da wiki"]
aliases_en: ["knowledge governance", "wiki meta"]
tags: ["meta", "governance"]
---

# Governança da base de conhecimento

Este diretório governa a construção e manutenção de `docs/`. Não contém receitas de impressão; contém regras, inventários, mapas e o estado de cobertura.

## Entradas obrigatórias por sessão

1. [continuacao.md](continuacao.md) — onde parar e retomar
2. [cobertura.md](cobertura.md) — status mensurável por domínio
3. [fila-de-trabalho.md](fila-de-trabalho.md) — próximo batch

## Mapa dos documentos _meta

| Documento | Função |
|---|---|
| [arquitetura-da-informacao.md](arquitetura-da-informacao.md) | Taxonomia e estrutura-alvo |
| [ontologia.md](ontologia.md) | Entidades e relações semânticas |
| [guia-editorial.md](guia-editorial.md) | Idioma, estilo, DoD de página |
| [politica-de-fontes.md](politica-de-fontes.md) | Hierarquia e registro de fontes |
| [politica-de-evidencias.md](politica-de-evidencias.md) | Classificação de claims e divergências |
| [politica-de-links.md](politica-de-links.md) | Interconexão e validação |
| [templates-de-conteudo.md](templates-de-conteudo.md) | Templates por tipo de página |
| [mapa-de-conhecimento.md](mapa-de-conhecimento.md) | Visão de hubs e fatias |
| [roteamento-de-consultas.md](roteamento-de-consultas.md) | Como a IA escolhe páginas |
| [montagem-de-contexto.md](montagem-de-contexto.md) | Como montar contexto RAG/humano |
| [inventario-existente.md](inventario-existente.md) | Auditoria factual do corpus legado |
| [plano-de-migracao.md](plano-de-migracao.md) | Mapa keep/split/merge/archive |
| [cobertura.md](cobertura.md) | Matriz de cobertura |
| [lacunas.md](lacunas.md) | Lacunas explícitas |
| [contradicoes.md](contradicoes.md) | Registro de divergências |
| [decisoes-editoriais.md](decisoes-editoriais.md) | Decisões A3 e escopos |
| [fila-de-trabalho.md](fila-de-trabalho.md) | Waves e batches |
| [registro-de-revisao.md](registro-de-revisao.md) | Histórico de revisões |
| [continuacao.md](continuacao.md) | Prompt curto de retomada |

## Relação com conteúdo legado

- `docs/projeto/` — wiki operacional A1 Mini (EN), permanece ativa até migração faseada
- `docs/ebook/` — Guia Maker (CC BY-SA 4.0), não é navegação canônica nova
- `docs/_arquivo/` — originais AsciiDoc/PDFs; não editar
- `docs/printers/` — registry de manuais convertidos

Ver [plano-de-migracao.md](plano-de-migracao.md).

## Relações com outros conceitos

- is-a → camada de governança da base
- governs → toda página canônica sob `docs/01`–`docs/23`
- depends-on → inventário e políticas antes de migração destrutiva
