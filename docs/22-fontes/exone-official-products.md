---
id: source.exone-official-products
title: Fonte — ExOne listagem oficial de impressoras
summary: Registro de proveniência da listagem oficial de produtos de ExOne (binder
  jetting), acessada em 2026-08-16. Sustenta descoberta/catalogação de modelos; não
  substitui datasheets por SKU.
doc_type: source
domain:
- sources
- printers
technology: []
process: []
applies_to: []
not_for:
- use-as-complete-spec-sheet
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: normal
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
sources: []
related:
- manufacturer.exone
- hub.impressoras
prerequisites: []
supersedes: []
aliases_pt_br: []
aliases_en: []
tags:
- source
- catalog
source_type: manufacturer-product-listing
language: en
version: web-page-public
last_verified: '2026-08-16'
organization: ExOne
canonical_url: https://www.exone.com/en/
regions:
- global
access_status: ok
accessed_at: '2026-08-16'
---
# Fonte — ExOne listagem oficial

| Campo | Valor |
|---|---|
| source id | `source.exone-official-products` |
| organização | ExOne |
| tipo | manufacturer product listing |
| URL canônica | https://www.exone.com/en/ |
| sand casting solutions | https://www.exone.com/en/3d-printing-solutions_overview/3dp-solutions-sand-casting/ |
| homepage | https://www.exone.com/en/ |
| data de acesso | 2026-08-16 |
| status de acesso | ok |
| snapshot | market-snapshot-2026-08-16-census |
| licença | conteúdo do fabricante; não republicar integralmente |

## Claims sustentados

- Existência oficial de sistemas binder jetting ExOne (areia, metal, cerâmica, polímeros)
- Modelos/famílias observadas em páginas oficiais: S-Max Pro, S-Print Pro, VX1000, VX4000 (entre outras)
- Comunicação de unificação ExOne + voxeljet sob ExOne Global Holdings

## Limitações

- Portfólio misturado ExOne/voxeljet — reconciliar branding antes de abrir `printer.*`
- Não extrai temperatures/volumes/materiais desta página-resumo
- Catálogo pode ser parcial (JS/PDF/region)
