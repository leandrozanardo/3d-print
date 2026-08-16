---
id: printer.formlabs-form-3
title: Formlabs Form 3
summary: 'Formlabs Form 3 (Form 3 / Form 3+) — lifecycle legacy-supported, coverage
  documented com claims de catálogo/product page Formlabs (acesso 2026-08-16).
  Sucessor — Form 4. Não tratar como current.'
doc_type: printer
domain:
- printers
technology:
- vat-photopolymerization
process:
- sla
applies_to:
- formlabs
- formlabs-form-3
not_for:
- invented-compatibility
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: legacy-supported
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
- Form 3 / Form 3+
aliases_en:
- Formlabs Form 3
- Form 3 / Form 3+
tags:
- printer
- documented
- formlabs
- legacy-supported
manufacturer_id: formlabs
model_name: Form 3 / Form 3+
family_status: form-3-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Official Form 3+ page states succeeded by Form 4; Formlabs support article Ongoing support for Form 3 and Form 3B (consumables/support through at least Jan 2028; limited printer stock through 2026). Accessed 2026-08-16.
---

# Formlabs Form 3

Hub: [Impressoras](INDEX.md) · Fabricante: [Formlabs](manufacturer-formlabs.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

Relacionado: [Formlabs Form 3B](formlabs-form-3b.md).

| Campo | Valor |
|---|---|
| Fabricante | Formlabs |
| Modelo | Form 3 / Form 3+ |
| Processo | SLA / vat photopolymerization (LFD on Form 4-class) |
| Lifecycle | `legacy-supported` |
| coverage_level | `documented` |
| Fonte | [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) |
| URL oficial | https://formlabs.com/3d-printers/form-3/
| Nota | Sucessor: Form 4. Não tratar como current. |

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
| URL exata | https://formlabs.com/3d-printers/form-3/ |
| data de acesso | 2026-08-16 |
| availability signal | listagem / product page oficial |
| lifecycle result | `legacy-supported` |
| availability_evidence | Official Form 3+ page states succeeded by Form 4; Formlabs support article Ongoing support for Form 3 and Form 3B (consumables/support through at least Jan 2028; limited printer stock through 2026). Accessed 2026-08-16. |

## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero.

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 14.5 × 14.5 × 19.3 cm (4.05 L) ([source](../22-fontes/formlabs-official-products.md))| Formlabs catalog / product page |
| Layer thickness | conforme material / tabela Formlabs | Formlabs compare table when listed |
| Lifecycle | legacy-supported | product/support pages |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Processo: SLA / vat photopolymerization (LFD on Form 4-class)
- Sucessor: Form 4. Não tratar como current.

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas

## Hardware

- Modelo: Form 3 / Form 3+
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

Biblioteca SLA Formlabs (30+ materials claim na página Form 3+); Open Platform opcional.

## Manutenção

### SLA Form-class
- Nivelamento / Resin Tank / Build Platform care conforme support Formlabs
- Form Wash / Form Cure no pós-processamento
- Troca de tank/film conforme desgaste

## Segurança

- Resina fotopolímera: irritante/sensibilizante — luvas, ventilação, SDS
- Luz UV/405 nm: não expor olhos/pele à fonte
- IPA/solventes de wash: inflamáveis
- Critérios de parada: vazamento de resina, odor extremo, falha de tank/film

## Known issues

Lifecycle `legacy-supported` sincronizado FM/body.

Known issues públicos detalhados por serial: parcial — consultar Formlabs Support.
Não inventar falhas de campo sem artigo de support.

## Fontes

- [source.formlabs-official-products](../22-fontes/formlabs-official-products.md) — https://formlabs.com/3d-printers/form-3/

## Lacunas

- Firmware versions pinadas
- Service manual completo público
- Troubleshooting-mapped com árvore oficial
- Specs elétricas/dimensões completas quando não na compare table
