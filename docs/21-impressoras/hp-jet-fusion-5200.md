---
id: printer.hp-jet-fusion-5200
title: HP Jet Fusion 5200
summary: HP Jet Fusion 5200 (Jet Fusion 5200) — coverage documented com seções DoD, technology/process preenchidos (mjf), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
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
- hp-jet-fusion-5200
not_for:
- invented-compatibility
- treat-lacuna-as-spec
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 3-months
lifecycle: current
coverage_level: documented
sources:
- source.hp-official-products
related:
- manufacturer.hp
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Jet Fusion 5200
aliases_en:
- HP Jet Fusion 5200
- Jet Fusion 5200
tags:
- printer
- documented
- hp
- current
manufacturer_id: hp
model_name: Jet Fusion 5200
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed on HP official MJF/Metal Jet products portfolio https://www.hp.com/us-en/printers/3d-printers/products.html (accessed 2026-08-16).
---

# HP Jet Fusion 5200

Hub: [Impressoras](INDEX.md) · Fabricante: [HP](manufacturer-hp.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | HP (`manufacturer.hp`) |
| Modelo | Jet Fusion 5200 |
| Título canônico | HP Jet Fusion 5200 |
| Tecnologia (FM) | `powder-bed-fusion` |
| Processo (FM) | `mjf` |
| Lifecycle (FM) | `current` |
| coverage_level (FM) | `documented` |
| Fonte | [source.hp-official-products](../22-fontes/hp-official-products.md) |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| região | US |
| evidência | ver Evidence locator |
| confiança | medium |

## Evidence locator

| Campo | Valor |
|---|---|
| source id | `source.hp-official-products` |
| URL exata | https://www.hp.com/us-en/printers/3d-printers/products.html |
| data de acesso | 2026-08-16 |
| availability signal | Listed on HP official MJF/Metal Jet products portfolio https://www.hp.com/us-en/printers/3d-printers/products.html (accessed 2026-08-16). |
| lifecycle result | `current` |
| confidence | medium |

## Escopo e exclusões

**Inclui:** identidade do **HP Jet Fusion 5200**, sincronização FM≡body, seções DoD com conteúdo operacional da classe `mjf` específico para o **Jet Fusion 5200**, lacunas explícitas.
**Exclui:** inventar temperatures/volumes/materiais não observados; misturar evidência de outro SKU no **Jet Fusion 5200**; promover marketing não citado.

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability ≠ certeza de processo no **HP Jet Fusion 5200**.

| Capability | Valor observado | Fonte |
|---|---|---|
| Effective build volume | 380×284×380 mm | spec fabricante HP MJF compare page US |
| Print time modes (claim) | 9.40 / 12 / 13.50 hrs (Fast/Balanced/Robust) | spec fabricante HP MJF compare page US |
| Positioning claim | >200 parts/week production environments | spec fabricante HP MJF compare page US |
| Materials (examples on page) | PA11, PA12 variants, PP, TPU grades | spec fabricante HP MJF compare page US |

## Tecnologia

- Classe: powder bed fusion (polímero) — **HP Jet Fusion 5200**
- Fluxo: powder → fusão seletiva (laser/agents) → cool/unpack no **Jet Fusion 5200**
- Packing density e reuse ratio são parâmetros de processo, não inventados aqui para **HP Jet Fusion 5200**

## Manuais

- Portal / support do fabricante para **HP Jet Fusion 5200**: partir da listagem `https://www.hp.com/us-en/printers/3d-printers/products.html`
- Manual de operação/service completo do **Jet Fusion 5200**: frequentemente portal/NDA — **não republicado** aqui quando não público
- Se HTML público completo não foi capturado em 2026-08-16: declarado em Lacunas do **HP Jet Fusion 5200**

## Hardware

- Identidade de hardware: **HP Jet Fusion 5200** / `Jet Fusion 5200` sob `manufacturer.hp`
- Revisões de hardware pinadas por serial do **Jet Fusion 5200**: não publicadas nesta revisão
- Consumíveis típicos da classe `mjf` aplicam-se ao **HP Jet Fusion 5200** apenas após confirmação OEM

## Software

- Suite de build/fleet do OEM aplicável ao **HP Jet Fusion 5200**
- Versões pinadas: lacuna sem captura datada do **Jet Fusion 5200**

## Firmware

- Canal oficial de release notes do **HP Jet Fusion 5200**: não pinado com versão datada nesta revisão
- Não inventar versão de firmware do **Jet Fusion 5200** sem captura datada

## Slicer

- Build preparation OEM (não slicer FFF) para **HP Jet Fusion 5200**
- Nesting/packing: seguir limites do **Jet Fusion 5200**

## Materiais

Pós/materiais oficiais do **HP Jet Fusion 5200**: apenas o que estiver na evidência citada; resto = lacuna. SDS do pó obrigatório para o **Jet Fusion 5200**.

## Manutenção

### Operação (classe PBF polímero — Jet Fusion 5200)
- Seguir workflow prepare → print → cool → unpack do fabricante no **HP Jet Fusion 5200**
- Contenção de pó e housekeeping do **Jet Fusion 5200**; não improvisar recycle ratios
- Manutenção de filtros/recirculação conforme portal OEM

## Segurança

- Pó polímero: inalação/particulados — EPI e contenção no **HP Jet Fusion 5200**
- Superfícies quentes / energia de processo no **Jet Fusion 5200**
- Parada: alarme OEM, odor anômalo, falha de contenção

## Known issues

Base pública de known-issues específica do **Jet Fusion 5200** não foi sistematizada nesta passagem.

| Tema | Nota |
|---|---|
| Specs incompletas | Ver Lacunas do **HP Jet Fusion 5200** |
| Transferência de presets | Não copiar de outro modelo para o **Jet Fusion 5200** sem adaptação |
| Troubleshooting de campo | Promover a `troubleshooting-mapped` só com árvore/support notes |

## Fontes

- [source.hp-official-products](../22-fontes/hp-official-products.md) — https://www.hp.com/us-en/printers/3d-printers/products.html

## Lacunas

- Datasheet completo pinado do **HP Jet Fusion 5200** além dos claims da tabela (quando houver)
- Manuais de serviço / error codes do **Jet Fusion 5200**
- Firmware/software versions datadas do **HP Jet Fusion 5200**
- Known issues de campo com URLs de support
- Matriz de materiais homologados com TDS para o **Jet Fusion 5200**
