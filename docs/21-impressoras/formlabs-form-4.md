---

id: printer.formlabs-form-4
title: Formlabs Form 4
summary: 'Formlabs Form 4 (Form 4) — lifecycle current, coverage
  documented com claims de catálogo/product page Formlabs (acesso 2026-08-16).
  Masked SLA / LFD print engine.'
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
- formlabs-form-4
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
- Form 4
aliases_en:
- Formlabs Form 4
- Form 4
tags:
- printer
- cataloged
- formlabs
- current
manufacturer_id: formlabs
model_name: Form 4
family_status: form-4-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Buy Now / Contact an Expert on Form 4 product page (accessed 2026-08-16).
---

# Formlabs Form 4

Hub: [Impressoras](INDEX.md) · Fabricante: [Formlabs](manufacturer-formlabs.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Formlabs |
| Modelo | Form 4 |
| Processo | SLA / vat photopolymerization (LFD on Form 4-class) |
| Lifecycle | `current` |
| coverage_level | `cataloged` |
| Fonte | [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) |
| URL oficial | https://formlabs.com/3d-printers/form-4/
| Nota | Masked SLA / LFD print engine. |

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
| URL exata | https://formlabs.com/3d-printers/form-4/ |
| data de acesso | 2026-08-16 |
| availability signal | listagem / product page oficial |
| lifecycle result | `current` |
| availability_evidence | Buy Now / Contact an Expert on Form 4 product page (accessed 2026-08-16). |

## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero. «printer.formlabs-form-4»

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 20.0 × 12.5 × 21.0 cm (5.25 L) ([source](../22-fontes/formlabs-official-products.md))| Formlabs catalog / product page |
| Layer thickness | 25–200 µm ([source](../22-fontes/formlabs-official-products.md))| Formlabs compare table when listed |
| Lifecycle | current | product/support pages |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: SLA / vat photopolymerization (LFD on Form 4-class)
- Masked SLA / LFD print engine.

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas «printer.formlabs-form-4»

## Hardware

- Modelo: Form 4
- Ecossistema Formlabs (tank/platform/cartridge ou powder unit conforme classe)

## Software

- PreForm (preparação) + Dashboard
- Versões pinadas: lacuna sem captura datada

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes) «printer.formlabs-form-4»

## Slicer

- PreForm — não usar slicers FFF
- Fleet Control / Automation Ecosystem quando aplicável (Form 3+/4)

## Materiais

23+ Formlabs materials ou Open Material Mode (compare table catálogo).

## Manutenção

### SLA Form-class
- Nivelamento / Resin Tank / Build Platform care conforme support Formlabs
- Form Wash / Form Cure no pós-processamento
- Troca de tank/film conforme desgaste «printer.formlabs-form-4»

## Segurança

- Resina fotopolímera: irritante/sensibilizante — luvas, ventilação, SDS
- Luz UV/405 nm: não expor olhos/pele à fonte
- IPA/solventes de wash: inflamáveis
- Critérios de parada: vazamento de resina, odor extremo, falha de tank/film «printer.formlabs-form-4»

## Known issues

Lifecycle `current` sincronizado FM/body.

Known issues públicos detalhados por serial: parcial — consultar Formlabs Support.
Não inventar falhas de campo sem artigo de support. «printer.formlabs-form-4»

## Fontes

- [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) — https://formlabs.com/3d-printers/form-4/

## Lacunas

- Firmware versions pinadas
- Service manual completo público
- Troubleshooting-mapped com árvore oficial
- Specs elétricas/dimensões completas quando não na compare table «printer.formlabs-form-4»

## Status editorial (remediação corretiva 2026-08-16)

A página **Form 4** (`printer.formlabs-form-4`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.formlabs-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.formlabs-form-4:formlabs-form-4.md -->

### Nota de especificidade — Formlabs Form 4

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Formlabs Form 4** (`printer.formlabs-form-4`, fabricante `formlabs`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
