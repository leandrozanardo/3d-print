---

id: printer.formlabs-form-3l
title: Formlabs Form 3L
summary: 'Formlabs Form 3L (Form 3L) — lifecycle legacy-supported, coverage
  documented com claims de catálogo/product page Formlabs (acesso 2026-08-16).
  Large-format LFS/SLA gen-3; prefer Form 4L para new buys.'
doc_type: printer
domain:
- printers
technology:
- vat-photopolymerization
process:
- sla
applies_to:
- formlabs
- formlabs-form-3l
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
- Form 3L
aliases_en:
- Formlabs Form 3L
- Form 3L
tags:
- printer
- cataloged
- formlabs
- legacy-supported
manufacturer_id: formlabs
model_name: Form 3L
family_status: form-3-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Still listed on Formlabs printers catalog with price (accessed 2026-08-16); treated as legacy-supported relative to Form 4L generation succession.
---

# Formlabs Form 3L

Hub: [Impressoras](INDEX.md) · Fabricante: [Formlabs](manufacturer-formlabs.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Formlabs |
| Modelo | Form 3L |
| Processo | SLA / vat photopolymerization (LFD on Form 4-class) |
| Lifecycle | `legacy-supported` |
| coverage_level | `cataloged` |
| Fonte | [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) |
| URL oficial | https://formlabs.com/products/3d-printers/
| Nota | Large-format LFS/SLA gen-3; prefer Form 4L para new buys. |

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
| URL exata | https://formlabs.com/products/3d-printers/ |
| data de acesso | 2026-08-16 |
| availability signal | listagem / product page oficial |
| lifecycle result | `legacy-supported` |
| availability_evidence | Still listed on Formlabs printers catalog with price (accessed 2026-08-16); treated as legacy-supported relative to Form 4L generation succession. |

## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero. «printer.formlabs-form-3l»

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 33.5 × 20 × 32 cm (21.4 L) ([source](../22-fontes/formlabs-official-products.md))| Formlabs catalog / product page |
| Layer thickness | conforme material / tabela Formlabs | Formlabs compare table when listed |
| Lifecycle | legacy-supported | product/support pages |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: SLA / vat photopolymerization (LFD on Form 4-class)
- Large-format LFS/SLA gen-3; prefer Form 4L para new buys.

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas «printer.formlabs-form-3l»

## Hardware

- Modelo: Form 3L
- Ecossistema Formlabs (tank/platform/cartridge ou powder unit conforme classe)

## Software

- PreForm (preparação) + Dashboard
- Versões pinadas: lacuna sem captura datada

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes) «printer.formlabs-form-3l»

## Slicer

- PreForm — não usar slicers FFF
- Fleet Control / Automation Ecosystem quando aplicável (Form 3+/4)

## Materiais

Biblioteca SLA Formlabs compatível com Form 3L (claim catálogo).

## Manutenção

### SLA Form-class
- Nivelamento / Resin Tank / Build Platform care conforme support Formlabs
- Form Wash / Form Cure no pós-processamento
- Troca de tank/film conforme desgaste «printer.formlabs-form-3l»

## Segurança

- Resina fotopolímera: irritante/sensibilizante — luvas, ventilação, SDS
- Luz UV/405 nm: não expor olhos/pele à fonte
- IPA/solventes de wash: inflamáveis
- Critérios de parada: vazamento de resina, odor extremo, falha de tank/film «printer.formlabs-form-3l»

## Known issues

Lifecycle `legacy-supported` sincronizado FM/body.

Known issues públicos detalhados por serial: parcial — consultar Formlabs Support.
Não inventar falhas de campo sem artigo de support. «printer.formlabs-form-3l»

## Fontes

- [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) — https://formlabs.com/products/3d-printers/

## Lacunas

- Firmware versions pinadas
- Service manual completo público
- Troubleshooting-mapped com árvore oficial
- Specs elétricas/dimensões completas quando não na compare table «printer.formlabs-form-3l»

## Status editorial (remediação corretiva 2026-08-16)

A página **Form 3L** (`printer.formlabs-form-3l`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.formlabs-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.formlabs-form-3l:formlabs-form-3l.md -->

### Nota de especificidade — Formlabs Form 3L

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Formlabs Form 3L** (`printer.formlabs-form-3l`, fabricante `formlabs`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
