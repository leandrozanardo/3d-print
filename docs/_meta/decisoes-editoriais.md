---
id: "meta.editorial-decisions"
title: "Decisões editoriais"
summary: "Decisões A3 da Wave 0: taxonomia 01–23, legado intacto, canônico pt-BR, fatia A1 Mini, ebook isolado sob CC BY-SA, sem delete, sem alterar core/."
doc_type: "decision-log"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
related: ["meta.migration", "meta.architecture"]
tags: ["decisions"]
technology: []
process: []
applies_to: []
not_for: []
sources: []
prerequisites: []
supersedes: []
aliases_pt_br: []
aliases_en: []
---

# Decisões editoriais

## D-001 — Dual-track legado + canônico

Manter `docs/projeto/` operacional até migração página a página. Criar taxonomia 01–23 em paralelo. Páginas novas **não** apagam as antigas nesta wave.

## D-002 — Idioma canônico pt-BR

Novas páginas canônicas em português do Brasil. Legado EN não é reescrito em massa nesta sessão.

## D-003 — Ebook CC BY-SA isolado

`docs/ebook/` e `docs/_arquivo/ebook/` permanecem. Vertical slice **não** copia texto do ebook. Reutilização futura exige atribuição + ShareAlike + registro.

## D-004 — Escopo operacional profundo inicial

A1 Mini + nozzle 0,4 mm + Bambu Studio + PLA/PETG + primeira camada + empenamento. Arquitetura cobre toda AM; cobertura mensurável declara o resto como lacuna.

## D-005 — Sem alteração de core/

Não modificar `core/`, testes ou automações. Lacunas do validador apenas documentadas.

## D-006 — Sem commit/push

Operações Git de commit/PR só sob pedido explícito do usuário.

## D-007 — Terminologia FFF vs FDM vs material extrusion

- **Material extrusion**: categoria ISO/ASTM
- **FFF**: processo genérico usado nesta base
- **FDM**: marca/termo comercial histórico — explicar relação, não tratar como categoria oficial distinta sem contexto
