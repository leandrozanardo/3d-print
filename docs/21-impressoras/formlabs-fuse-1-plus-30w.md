---
id: printer.formlabs-fuse-1-plus-30w
title: Formlabs Fuse 1+ 30W
summary: 'Formlabs Fuse 1+ 30W (Fuse 1+ 30W) — lifecycle current, coverage
  documented com claims de catálogo/product page Formlabs (acesso 2026-08-16).
  Compact industrial SLS.'
doc_type: printer
domain:
- printers
technology:
- powder-bed-fusion
process:
- sls
applies_to:
- formlabs
- formlabs-fuse-1-plus-30w
not_for:
- invented-compatibility
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: current
coverage_level: documented
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
- Fuse 1+ 30W
aliases_en:
- Formlabs Fuse 1+ 30W
- Fuse 1+ 30W
tags:
- printer
- documented
- formlabs
- current
manufacturer_id: formlabs
model_name: Fuse 1+ 30W
family_status: fuse-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed with price From $24,999 on Formlabs printers catalog (accessed 2026-08-16).
---

# Formlabs Fuse 1+ 30W

Hub: [Impressoras](INDEX.md) · Fabricante: [Formlabs](manufacturer-formlabs.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Formlabs |
| Modelo | Fuse 1+ 30W |
| Processo | SLS / polymer powder |
| Lifecycle | `current` |
| coverage_level | `documented` |
| Fonte | [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) |
| URL oficial | https://formlabs.com/products/3d-printers/
| Nota | Compact industrial SLS. |

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
| availability_evidence | Listed with price From $24,999 on Formlabs printers catalog (accessed 2026-08-16). |

## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero.

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 165 × 165 × 300 mm ([source](../22-fontes/formlabs-official-products.md))| Formlabs catalog / product page |
| Layer thickness | 110 µm (compare table) ([source](../22-fontes/formlabs-official-products.md))| Formlabs compare table when listed |
| Lifecycle | current | product/support pages |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: SLS / polymer powder
- Compact industrial SLS.

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas

## Hardware

- Modelo: Fuse 1+ 30W
- Ecossistema Formlabs (tank/platform/cartridge ou powder unit conforme classe)

## Software

- PreForm (preparação) + Dashboard
- Versões pinadas: lacuna sem captura datada

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes)

## Slicer

- PreForm — não usar slicers FFF
- Fleet Control / Automation Ecosystem quando aplicável (Form 3+/4)

## Materiais

Nylon/SLS powder ecosystem Formlabs Fuse — consultar compatibilidade oficial.

## Manutenção

### SLS Fuse-class
- Extração, reclaim de pó, peneiramento, limpeza de câmara: workflow Formlabs Fuse
- Não misturar pós incompatíveis

## Segurança

- Pó SLS: inalação; contenção; EPI; SDS do pó
- Temperatura de processo; hot surfaces
- Critérios de parada: alarmes, odor de queima, falha de nitrogen/atmosphere se aplicável

## Known issues

Lifecycle `current` sincronizado FM/body.

Known issues públicos detalhados por serial: parcial — consultar Formlabs Support.
Não inventar falhas de campo sem artigo de support.

## Fontes

- [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) — https://formlabs.com/products/3d-printers/

## Lacunas

- Firmware versions pinadas
- Service manual completo público
- Troubleshooting-mapped com árvore oficial
- Specs elétricas/dimensões completas quando não na compare table
