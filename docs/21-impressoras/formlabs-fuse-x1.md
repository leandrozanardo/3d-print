---

id: printer.formlabs-fuse-x1
title: Formlabs Fuse X1
summary: 'Formlabs Fuse X1 (Fuse X1) — lifecycle current, coverage
  documented com claims de catálogo/product page Formlabs (acesso 2026-08-16).
  Large-format industrial SLS; AI Print Intelligence claim.'
doc_type: printer
domain:
- printers
technology:
- powder-bed-fusion
process:
- sls
applies_to:
- formlabs
- formlabs-fuse-x1
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
- Fuse X1
aliases_en:
- Formlabs Fuse X1
- Fuse X1
tags:
- printer
- cataloged
- formlabs
- current
manufacturer_id: formlabs
model_name: Fuse X1
family_status: fuse-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed as New with price $84,999 on Formlabs printers catalog (accessed 2026-08-16).
---

# Formlabs Fuse X1

Hub: [Impressoras](INDEX.md) · Fabricante: [Formlabs](manufacturer-formlabs.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Formlabs |
| Modelo | Fuse X1 |
| Processo | SLS / polymer powder |
| Lifecycle | `current` |
| coverage_level | `cataloged` |
| Fonte | [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) |
| URL oficial | https://formlabs.com/products/3d-printers/
| Nota | Large-format industrial SLS; AI Print Intelligence claim. |

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
| availability_evidence | Listed as New with price $84,999 on Formlabs printers catalog (accessed 2026-08-16). |

## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero. «printer.formlabs-fuse-x1»

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 330 × 330 × 565 mm (61.5 L) ([source](../22-fontes/formlabs-official-products.md))| Formlabs catalog / product page |
| Layer thickness | conforme material / tabela Formlabs | Formlabs compare table when listed |
| Lifecycle | current | product/support pages |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: SLS / polymer powder
- Large-format industrial SLS; AI Print Intelligence claim.

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas «printer.formlabs-fuse-x1»

## Hardware

- Modelo: Fuse X1
- Ecossistema Formlabs (tank/platform/cartridge ou powder unit conforme classe)

## Software

- PreForm (preparação) + Dashboard
- Versões pinadas: lacuna sem captura datada

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes) «printer.formlabs-fuse-x1»

## Slicer

- PreForm — não usar slicers FFF
- Fleet Control / Automation Ecosystem quando aplicável (Form 3+/4)

## Materiais

SLS powder ecosystem Fuse X1 — consultar Formlabs; não inventar pós.

## Manutenção

### SLS Fuse-class
- Extração, reclaim de pó, peneiramento, limpeza de câmara: workflow Formlabs Fuse
- Não misturar pós incompatíveis

## Segurança

- Pó SLS: inalação; contenção; EPI; SDS do pó
- Temperatura de processo; hot surfaces
- Critérios de parada: alarmes, odor de queima, falha de nitrogen/atmosphere se aplicável «printer.formlabs-fuse-x1»

## Known issues

Lifecycle `current` sincronizado FM/body.

Known issues públicos detalhados por serial: parcial — consultar Formlabs Support.
Não inventar falhas de campo sem artigo de support. «printer.formlabs-fuse-x1»

## Fontes

- [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) — https://formlabs.com/products/3d-printers/

## Lacunas

- Firmware versions pinadas
- Service manual completo público
- Troubleshooting-mapped com árvore oficial
- Specs elétricas/dimensões completas quando não na compare table «printer.formlabs-fuse-x1»

## Status editorial (remediação corretiva 2026-08-16)

A página **Fuse X1** (`printer.formlabs-fuse-x1`) foi reclassificada de `documented` para `cataloged` porque, nesta execução, a única evidência pinada era listagem genérica do fabricante (`source.formlabs-official-products`, tipicamente `manufacturer-product-listing`). Listagem P3 sustenta identidade/presença no catálogo, não especificações, manuais, firmware ou known issues do SKU. Pesquisa de página oficial específica do modelo foi registrada no ledger JSONL; até existir fonte P1/P2 aplicável, `documented` permanece injustificado.

<!-- editorial-fingerprint:printer.formlabs-fuse-x1:formlabs-fuse-x1.md -->

### Nota de especificidade — Formlabs Fuse X1

Este bloco existe para impedir documentação falsa-específica: o conteúdo operacional e as lacunas abaixo referem-se exclusivamente a **Formlabs Fuse X1** (`printer.formlabs-fuse-x1`, fabricante `formlabs`), não a irmãos de linha. Qualquer número fora das fontes listadas no front matter deve ser tratado como não publicado.
