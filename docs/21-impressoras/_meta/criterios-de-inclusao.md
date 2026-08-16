---
id: meta.printer-inclusion-criteria
title: Critérios de inclusão do catálogo de impressoras
summary: 'Define o que conta como impressora catalogável no fix-my-print: identidade
  verificável, lifecycle, região, fabricante/fonte oficial e nível de cobertura. Impede
  declarar cobertura mundial sem denominador e evita duplicar SKUs, bundles e rebrands.'
doc_type: policy
domain:
- printers
- meta
technology: []
process: []
applies_to:
- catalog-maintainers
- ai-agents
not_for:
- complete-market-claim-without-denominator
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: high
last_reviewed: '2026-08-16'
review_cycle: per-batch
sources: []
related:
- meta.printer-progress
- hub.impressoras
- meta.source-policy
prerequisites:
- meta.source-policy
supersedes: []
aliases_pt_br:
- critérios de inclusão impressoras
aliases_en:
- printer catalog inclusion criteria
tags:
- catalog
- printers
- governance
---
# Critérios de inclusão do catálogo de impressoras

Hub: [Impressoras](../INDEX.md) · Ledger: [progresso.md](progresso.md)

## Definição operacional de “todas as impressoras”

Significa: **catálogo verificável** de modelos descobertos segundo estes critérios, em um **snapshot datado**, com lifecycle, região, fabricante, fonte oficial e nível de cobertura.

Nunca declarar o mercado inteiro coberto sem denominador e fontes do universo.

## Inclusão

Incluir quando houver **pelo menos**:

1. Nome comercial / modelo identificável
2. Organização responsável (OEM, open-hardware project, ou rebrand documentado)
3. Fonte primária ou secundária auditável da existência (página oficial, catálogo industrial, anúncio oficial)
4. Classificação de lifecycle no vocabulário controlado
5. Registro no ledger com data de descoberta

## Lifecycle controlado

`announced` · `preorder` · `current` · `region-limited` · `discontinued` · `legacy-supported` · `unsupported` · `unknown`

`current` só se, na data do snapshot, estiver oficialmente disponível para compra/orçamento/contratação em pelo menos uma região documentada.

Produto anunciado para o futuro ≠ `current`.

## Não criar novo modelo por

- combo / bundle / kit montado / variação só de acessórios
- SKU de tensão ou regional **sem** mudança de capability/segurança/compatibilidade
- marketing rename sem mudança de hardware

## Rebrands / white-labels

Relacionar por identidade; não duplicar como máquinas independentes sem aviso.

## DIY / open hardware

Voron, RatRig e similares: classe própria (`open-hardware` / DIY), não OEM tradicional.

## Níveis de cobertura (separados de knowledge_status)

`discovered` → `cataloged` → `documented` → `troubleshooting-mapped` → `review-ready` → `reviewed` → `verified`

Autor/agente **não** auto-promove para `reviewed`/`verified`.

## Exclusões

Ver [exclusoes.md](exclusoes.md).
