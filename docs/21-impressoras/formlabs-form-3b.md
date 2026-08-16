---

id: printer.formlabs-form-3b
title: Formlabs Form 3B
summary: 'Formlabs Form 3B (Form 3B / Form 3B+) — lifecycle legacy-supported, coverage
  documented com claims de catálogo/product page Formlabs (acesso 2026-08-16).
  Healthcare/biocompatible focus; sucessor Form 4B.'
doc_type: printer
domain:
- printers
technology:
- vat-photopolymerization
process:
- sla
applies_to:
- formlabs
- formlabs-form-3b
not_for:
- invented-compatibility
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: legacy-supported
coverage_level: cataloged
sources:
- source.formlabs-official-products
related:
- manufacturer.formlabs
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Form 3B / Form 3B+
aliases_en:
- Formlabs Form 3B
- Form 3B / Form 3B+
tags:
- printer
- cataloged
- formlabs
- legacy-supported
manufacturer_id: formlabs
model_name: Form 3B / Form 3B+
family_status: form-3-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Official Form 3B+ page states succeeded by Form 4B; support article Ongoing support for Form 3 and Form 3B (accessed 2026-08-16).
---

# Formlabs Form 3B

Hub: [Impressoras](INDEX.md) · Fabricante: [Formlabs](manufacturer-formlabs.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Formlabs |
| Modelo | Form 3B / Form 3B+ |
| Processo | SLA / vat photopolymerization (LFD on Form 4-class) |
| Lifecycle | `legacy-supported` |
| coverage_level | `cataloged` |
| Fonte | [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) |
| URL oficial | https://formlabs.com/3d-printers/form-3b/
| Nota | Healthcare/biocompatible focus; sucessor Form 4B. |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `legacy-supported` |
| lifecycle_observed_at | 2026-08-16 |
| evidência | ver Evidence locator |
| confiança | medium–high (listagem/product page oficial) |

## Evidence locator

| Campo | Valor |
|---|---|
| source id | `source.formlabs-official-products` |
| URL exata | https://formlabs.com/3d-printers/form-3b/ |
| data de acesso | 2026-08-16 |
| availability signal | listagem / product page oficial |
| lifecycle result | `legacy-supported` |
| availability_evidence | Official Form 3B+ page states succeeded by Form 4B; support article Ongoing support for Form 3 and Form 3B (accessed 2026-08-16). |

## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero. «printer.formlabs-form-3b»

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | mesmo envelope desktop Form 3-class (confirmar TDS; não inventar mm além da família) ([source](../22-fontes/formlabs-official-products.md))| Formlabs catalog / product page |
| Layer thickness | conforme material / tabela Formlabs | Formlabs compare table when listed |
| Lifecycle | legacy-supported | product/support pages |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: SLA / vat photopolymerization (LFD on Form 4-class)
- Healthcare/biocompatible focus; sucessor Form 4B.

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas «printer.formlabs-form-3b»

## Hardware

- Modelo: Form 3B / Form 3B+
- Ecossistema Formlabs (tank/platform/cartridge ou powder unit conforme classe)

## Software

- PreForm (preparação) + Dashboard
- Versões pinadas: lacuna sem captura datada

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes) «printer.formlabs-form-3b»

## Slicer

- PreForm — não usar slicers FFF
- Fleet Control / Automation Ecosystem quando aplicável (Form 3+/4)

## Materiais

Biblioteca biocompatível / healthcare Formlabs; validado em workflows FDA-cleared (claim página).

## Manutenção

### SLA Form-class
- Nivelamento / Resin Tank / Build Platform care conforme support Formlabs
- Form Wash / Form Cure no pós-processamento
- Troca de tank/film conforme desgaste «printer.formlabs-form-3b»

## Segurança

- Resina fotopolímera: irritante/sensibilizante — luvas, ventilação, SDS
- Luz UV/405 nm: não expor olhos/pele à fonte
- IPA/solventes de wash: inflamáveis
- Critérios de parada: vazamento de resina, odor extremo, falha de tank/film «printer.formlabs-form-3b»

## Known issues

Lifecycle `legacy-supported` sincronizado FM/body.

Known issues públicos detalhados por serial: parcial — consultar Formlabs Support.
Não inventar falhas de campo sem artigo de support. «printer.formlabs-form-3b»

## Fontes

- [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) — https://formlabs.com/3d-printers/form-3b/

## Lacunas

- Firmware versions pinadas
- Service manual completo público
- Troubleshooting-mapped com árvore oficial
- Specs elétricas/dimensões completas quando não na compare table «printer.formlabs-form-3b»

## Status editorial (remediação corretiva 2026-08-16)

A página **Form 3B / Form 3B+** (`printer.formlabs-form-3b`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.formlabs-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.formlabs-form-3b:formlabs-form-3b.md -->

### Nota de especificidade — Formlabs Form 3B

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Formlabs Form 3B** (`printer.formlabs-form-3b`, fabricante `formlabs`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
