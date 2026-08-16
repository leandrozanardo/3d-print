---
id: printer.hp-mjf-1200
title: HP MJF 1200
summary: HP Multi Jet Fusion 1200 é sistema MJF compacto 12 L (320×165×230 mm) em
  early access na product page oficial US. GA planejada para early 2027 — lifecycle
  announced (não current). Coverage documented com claims somente da product page
  (acesso 2026-08-16).
doc_type: printer
domain:
- printers
- powder-bed-fusion
technology:
- powder-bed-fusion
process:
- mjf
applies_to:
- hp
- hp-mjf-1200
not_for:
- treat-as-current-shelf-sku
- invented-compatibility
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: announced
coverage_level: documented
sources:
- source.hp-mjf-1200-product-page
- source.hp-official-products
related:
- manufacturer.hp
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- HP MJF 1200
aliases_en:
- HP Multi Jet Fusion 1200
- HP MJF 1200
tags:
- printer
- documented
- hp
- mjf
- announced
manufacturer_id: hp
model_name: MJF 1200
family_status: mjf-1200
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: HP official product page states planned availability in early
  2027; early access booking is not immediate purchase (accessed 2026-08-16).
---
# HP Multi Jet Fusion 1200

Hub: [Impressoras](INDEX.md) · Fabricante: [HP](manufacturer-hp.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | HP |
| Modelo | HP Multi Jet Fusion 1200 (MJF 1200) |
| Processo | Multi Jet Fusion (MJF) / powder bed fusion — polymer |
| Lifecycle | `announced` |
| coverage_level | `documented` |
| Fonte | [source.hp-mjf-1200-product-page](../22-fontes/hp-mjf-1200-product-page.md) |
| URL oficial | https://www.hp.com/us-en/printers/3d-printers/products/multi-jet-fusion-1200.html


## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `announced` |
| lifecycle_observed_at | 2026-08-16 |
| evidência | ver Evidence locator |
| confiança | medium–high (listagem/product page oficial) |

## Evidence locator

| Campo | Valor |
|---|---|
| source id | `source.hp-mjf-1200-product-page` |
| URL exata | https://www.hp.com/us-en/printers/3d-printers/products/multi-jet-fusion-1200.html |
| data de acesso | 2026-08-16 |
| availability signal | listagem / product page oficial |
| lifecycle result | `announced` |
| observação | Early access / priority booking; GA early 2027; **não** tratar como current |
| confidence | high para announced |

## Escopo e exclusões

**Inclui:** identidade, lifecycle, claims publicados na fonte citada, seções DoD com conteúdo operacional honesto da classe.
**Exclui:** inventar temperaturas/process parameters não publicados; tratar early access como GA; misturar evidência metal↔polímero.

## Especificações

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume | 12 L — 320 × 165 × 230 mm ([source](../22-fontes/hp-mjf-1200-product-page.md))| product page HP |
| Print time (claim) | < 12 h (disclaimer de marketing) ([source](../22-fontes/hp-mjf-1200-product-page.md))| product page |
| Launch price point (claim) | < US$ 60K (disclaimer) ([source](../22-fontes/hp-mjf-1200-product-page.md))| product page |
| Powder reusability (claim) | HP 3D HR PA 12 by Evonik — até 80% reusability ([source](../22-fontes/hp-mjf-1200-product-page.md))| product page |
| GA planejada | early 2027 (FAQ / comunicado na página) ([source](../22-fontes/hp-mjf-1200-product-page.md))| product page |
| Commercial signal | Book / early access; sem pagamento adiantado obrigatório na oferta observada | product page |

Claims numéricos além da tabela: **não inventados**. Onde o fabricante não publicou detalhe pinável nesta revisão, ver Lacunas.

## Tecnologia

- Tecnologia: HP Multi Jet Fusion (agents + fusing; claims de isotropia e tempos previsíveis na product page)
- Classe: impressora industrial compacta de polímero em pó (12 L)
- Early access / priority booking ≠ general availability em prateleira

## Manuais

- Portal / documentação do fabricante: mapear a partir da página de produto/listagem
- Manuais de operação/service completos: frequentemente sob NDA / customer portal — não republicados aqui
- Não publicado pelo fabricante em HTML público completo nesta revisão (quando aplicável): declarado em Lacunas

## Hardware

- Sistema compacto 12 L; footprint sem infraestrutura de fábrica (claim marketing)
- Natural Cooling Unit + MMS para unpacking automatizado (workflow de 4 passos na página)
- Automated powder management (claim)

## Software

- Build-preparation software intuitivo (drag files / arrange / send) — nome de SKU de software não pinado além da descrição da product page
- FAQ menciona software incluso: detalhe de versão não extraído nesta revisão

## Firmware

- Versão de firmware/controller pinada: não publicada nesta página sem captura datada do fabricante
- Atualizações: canal oficial do OEM (customer portal / release notes)

## Slicer

- Preparação de build HP (ecossistema MJF) — não é slicer FFF
- Não aplicar presets FFF/SLA a este sistema

## Materiais

Material mencionado na product page para launch: **HP 3D HR PA 12 by Evonik** (reusability claim até 80%). Outros materiais de launch: FAQ existe na página mas detalhe completo **não extraído** nesta revisão — ver Lacunas. SDS/TDS do pó não substituídos por esta página.

## Manutenção

### Operação (classe MJF / pó)
- Seguir workflow guiado on-system do fabricante (prepare → print → cool → unpack)
- Gestão de pó: contenção, reuse ratio conforme procedimento HP; não improvisar recycle ratios
- Manutenção preventiva detalhada: tipicamente portal/customer — **não publicada** integralmente aqui

## Segurança

- Pó polimérico: inalação/particulados — EPI e contenção conforme SDS e manuais HP
- Superfícies quentes / energia de fusão
- Early access: procedimentos finais podem mudar até GA early 2027
- Critérios de parada: alarmes do sistema, odor anômalo, falha de contenção de pó, overtemp

## Known issues

Produto **announced** / early access — não há base de known-issues de campo GA nesta revisão.

| Tema | Nota |
|---|---|
| Early access ≠ current shelf | Booking sem GA |
| Specs/datas sujeitas a mudança | Disclaimers HP na página |
| Troubleshooting de produção | Lacuna até GA + support notes |

## Fontes

- [source.hp-official-products](../22-fontes/hp-official-products.md)

- [source.hp-mjf-1200-product-page](../22-fontes/hp-mjf-1200-product-page.md) — https://www.hp.com/us-en/printers/3d-printers/products/multi-jet-fusion-1200.html

## Lacunas

- Datasheet de produção completo (além dos claims da product page)
- Lista completa de materiais no launch
- Manuais de serviço / error codes
- Firmware/software versions pinadas
- Known issues de campo pós-GA
