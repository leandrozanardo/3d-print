---

id: printer.formlabs-form-4bl
title: Formlabs Form 4BL
summary: 'Formlabs Form 4BL (Form 4BL) — lifecycle current, coverage
  documented com claims de catálogo/product page Formlabs (acesso 2026-08-16).
  Large-format medical Form 4-class.'
doc_type: printer
domain:
- printers
technology:
- vat-photopolymerization
process:
- sla
- lfd
applies_to:
- formlabs
- formlabs-form-4bl
not_for:
- invented-compatibility
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: current
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
- Form 4BL
aliases_en:
- Formlabs Form 4BL
- Form 4BL
tags:
- printer
- cataloged
- formlabs
- current
manufacturer_id: formlabs
model_name: Form 4BL
family_status: form-4-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed with price on Formlabs printers catalog (accessed 2026-08-16).
---

# Formlabs Form 4BL

Hub: [Impressoras](INDEX.md) · Fabricante: [Formlabs](manufacturer-formlabs.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Formlabs |
| Modelo | Form 4BL |
| Processo | SLA / vat photopolymerization (LFD on Form 4-class) |
| Lifecycle | `current` |
| coverage_level | `cataloged` |
| Fonte | [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) |
| URL oficial | https://formlabs.com/products/3d-printers/
| Nota | Large-format medical Form 4-class. |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| evidência | ver Evidence locator |
| confiança | medium–high (listagem/product page oficial) |

## Evidence locator

| Campo | Valor |
|---|---|
| source id | `source.formlabs-official-products` |
| URL exata | https://formlabs.com/products/3d-printers/ |
| data de acesso | 2026-08-16 |
| availability signal | listagem / product page oficial |
| lifecycle result | `current` |
| availability_evidence | Listed with price on Formlabs printers catalog (accessed 2026-08-16). |

## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero. «printer.formlabs-form-4bl»

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 35.3 × 19.6 × 35.0 cm (24.2 L) ([source](../22-fontes/formlabs-official-products.md))| Formlabs catalog / product page |
| Layer thickness | conforme material / tabela Formlabs | Formlabs compare table when listed |
| Lifecycle | current | product/support pages |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: SLA / vat photopolymerization (LFD on Form 4-class)
- Large-format medical Form 4-class.

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas «printer.formlabs-form-4bl»

## Hardware

- Modelo: Form 4BL
- Ecossistema Formlabs (tank/platform/cartridge ou powder unit conforme classe)

## Software

- PreForm (preparação) + Dashboard
- Versões pinadas: lacuna sem captura datada

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes) «printer.formlabs-form-4bl»

## Slicer

- PreForm — não usar slicers FFF
- Fleet Control / Automation Ecosystem quando aplicável (Form 3+/4)

## Materiais

Healthcare materials library (claim catálogo).

## Manutenção

### SLA Form-class
- Nivelamento / Resin Tank / Build Platform care conforme support Formlabs
- Form Wash / Form Cure no pós-processamento
- Troca de tank/film conforme desgaste «printer.formlabs-form-4bl»

## Segurança

- Resina fotopolímera: irritante/sensibilizante — luvas, ventilação, SDS
- Luz UV/405 nm: não expor olhos/pele à fonte
- IPA/solventes de wash: inflamáveis
- Critérios de parada: vazamento de resina, odor extremo, falha de tank/film «printer.formlabs-form-4bl»

## Known issues

Lifecycle `current` sincronizado FM/body.

Known issues públicos detalhados por serial: parcial — consultar Formlabs Support.
Não inventar falhas de campo sem artigo de support. «printer.formlabs-form-4bl»

## Fontes

- [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) — https://formlabs.com/products/3d-printers/

## Lacunas

- Firmware versions pinadas
- Service manual completo público
- Troubleshooting-mapped com árvore oficial
- Specs elétricas/dimensões completas quando não na compare table «printer.formlabs-form-4bl»

## Status editorial (remediação corretiva 2026-08-16)

A página **Form 4BL** (`printer.formlabs-form-4bl`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.formlabs-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.formlabs-form-4bl:formlabs-form-4bl.md -->

### Nota de especificidade — Formlabs Form 4BL

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Formlabs Form 4BL** (`printer.formlabs-form-4bl`, fabricante `formlabs`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
