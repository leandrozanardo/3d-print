---
id: printer.craftbot-flow-xl
title: Craftbot Flow XL
summary: Craftbot Flow XL (Craftbot Flow XL) — coverage documented com seções DoD, technology/process preenchidos (fff), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- craftbot
- craftbot-flow-xl
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
- source.craftbot-official-products
related:
- manufacturer.craftbot
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Craftbot Flow XL
aliases_en:
- Craftbot Flow XL
- Craftbot Flow XL
tags:
- printer
- documented
- craftbot
- current
manufacturer_id: craftbot
model_name: Craftbot Flow XL
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed on official manufacturer product listing https://craftbot.com/products (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
---

# Craftbot Flow XL

Hub: [Impressoras](INDEX.md) · Fabricante: [Craftbot](manufacturer-craftbot.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Craftbot (`manufacturer.craftbot`) |
| Modelo | Craftbot Flow XL |
| Título canônico | Craftbot Flow XL |
| Tecnologia (FM) | `material-extrusion` |
| Processo (FM) | `fff` |
| Lifecycle (FM) | `current` |
| coverage_level (FM) | `documented` |
| Fonte | [source.craftbot-official-products](../22-fontes/craftbot-official-products.md) |

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
| source id | `source.craftbot-official-products` |
| URL exata | https://craftbot.com/products |
| data de acesso | 2026-08-16 |
| availability signal | Listed on official manufacturer product listing https://craftbot.com/products (accessed 2026-08-16); treated as current catalog presence for this remediation pass. |
| lifecycle result | `current` |
| confidence | medium |

## Escopo e exclusões

**Inclui:** identidade do **Craftbot Flow XL**, sincronização FM≡body, seções DoD com conteúdo operacional da classe `fff` específico para o **Craftbot Flow XL**, lacunas explícitas.
**Exclui:** inventar temperatures/volumes/materiais não observados; misturar evidência de outro SKU no **Craftbot Flow XL**; promover marketing não citado.

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability ≠ certeza de processo no **Craftbot Flow XL**.

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume / envelope | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Craftbot Flow XL |
| Temperaturas / energia de processo | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Craftbot Flow XL |
| Materiais homologados (lista pinada) | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Craftbot Flow XL |
| Firmware / revisões de hardware | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Craftbot Flow XL |

## Tecnologia

- Classe: material extrusion / FFF para **Craftbot Flow XL** (`Craftbot Flow XL`)
- Fluxo típico: filamento → hotend → deposição camada a camada na mesa do **Craftbot Flow XL**
- Capability ≠ certeza de processo em qualquer filamento no **Craftbot Flow XL**

## Manuais

- Portal / support do fabricante para **Craftbot Flow XL**: partir da listagem `https://craftbot.com/products`
- Manual de operação/service completo do **Craftbot Flow XL**: frequentemente portal/NDA — **não republicado** aqui quando não público
- Se HTML público completo não foi capturado em 2026-08-16: declarado em Lacunas do **Craftbot Flow XL**

## Hardware

- Identidade de hardware: **Craftbot Flow XL** / `Craftbot Flow XL` sob `manufacturer.craftbot`
- Revisões de hardware pinadas por serial do **Craftbot Flow XL**: não publicadas nesta revisão
- Consumíveis típicos da classe `fff` aplicam-se ao **Craftbot Flow XL** apenas após confirmação OEM

## Software

- Ecossistema de software do fabricante aplicável ao **Craftbot Flow XL** (app/slicer/cloud conforme OEM)
- Versões pinadas: lacuna sem captura datada para o **Craftbot Flow XL**

## Firmware

- Canal oficial de release notes do **Craftbot Flow XL**: não pinado com versão datada nesta revisão
- Não inventar versão de firmware do **Craftbot Flow XL** sem captura datada

## Slicer

- Usar perfil/preset do **Craftbot Flow XL** no slicer suportado pelo OEM quando existir
- Não colar presets de outra família sem revisão dimensional/térmica do **Craftbot Flow XL**

## Materiais

Materiais compatíveis oficiais pinados para **Craftbot Flow XL**: não publicados pelo fabricante na evidência consultada em 2026-08-16 (exceto se listados na tabela de Especificações). Não inventar matriz PLA/ABS/ASA para o **Craftbot Flow XL**. TDS/SDS não são substituídos por esta página.

## Manutenção

### Calibração (classe FFF — Craftbot Flow XL)
- Primeira camada e leveling conforme procedimento do fabricante para **Craftbot Flow XL**
- Verificar tensão de correia/extrusor e fluxo antes de culpar o filamento no **Craftbot Flow XL**
- Manutenção preventiva: limpeza de nozzle, lubrificação de eixos conforme manual do **Craftbot Flow XL**

## Segurança

- Superfícies quentes (hotend/mesa) no **Craftbot Flow XL**
- Fumos de termoplásticos: ventilação adequada ao operar o **Craftbot Flow XL**
- Critérios de parada: smell anômalo, blob no hotend, falha de sensor, overtemp

## Known issues

Base pública de known-issues específica do **Craftbot Flow XL** não foi sistematizada nesta passagem.

| Tema | Nota |
|---|---|
| Specs incompletas | Ver Lacunas do **Craftbot Flow XL** |
| Transferência de presets | Não copiar de outro modelo para o **Craftbot Flow XL** sem adaptação |
| Troubleshooting de campo | Promover a `troubleshooting-mapped` só com árvore/support notes |

## Fontes

- [source.craftbot-official-products](../22-fontes/craftbot-official-products.md) — https://craftbot.com/products

## Lacunas

- Datasheet completo pinado do **Craftbot Flow XL** além dos claims da tabela (quando houver)
- Manuais de serviço / error codes do **Craftbot Flow XL**
- Firmware/software versions datadas do **Craftbot Flow XL**
- Known issues de campo com URLs de support
- Matriz de materiais homologados com TDS para o **Craftbot Flow XL**
