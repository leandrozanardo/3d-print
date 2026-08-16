---
id: printer.sovol-zero
title: Sovol Zero
summary: Sovol Zero (Sovol Zero) — coverage documented com seções DoD, technology/process preenchidos (fff), lifecycle `current`, evidência de listagem oficial acesso 2026-08-16.
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- sovol
- sovol-zero
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
- source.sovol-official-products
related:
- manufacturer.sovol
- hub.impressoras
- meta.printer-global-catalog
prerequisites:
- hub.impressoras
supersedes: []
aliases_pt_br:
- Sovol Zero
aliases_en:
- Sovol Zero
- Sovol Zero
tags:
- printer
- documented
- sovol
- current
manufacturer_id: sovol
model_name: Sovol Zero
family_status: unknown
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: >
  Listed on official manufacturer product listing https://www.sovol3d.com/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass.
---

# Sovol Zero

Hub: [Impressoras](INDEX.md) · Fabricante: [Sovol](manufacturer-sovol.md) · Catálogo: [_meta/catalogo-global.md](_meta/catalogo-global.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Sovol (`manufacturer.sovol`) |
| Modelo | Sovol Zero |
| Título canônico | Sovol Zero |
| Tecnologia (FM) | `material-extrusion` |
| Processo (FM) | `fff` |
| Lifecycle (FM) | `current` |
| coverage_level (FM) | `documented` |
| Fonte | [source.sovol-official-products](../22-fontes/sovol-official-products.md) |

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
| source id | `source.sovol-official-products` |
| URL exata | https://www.sovol3d.com/ |
| data de acesso | 2026-08-16 |
| availability signal | Listed on official manufacturer product listing https://www.sovol3d.com/ (accessed 2026-08-16); treated as current catalog presence for this remediation pass. |
| lifecycle result | `current` |
| confidence | medium |

## Escopo e exclusões

**Inclui:** identidade do **Sovol Zero**, sincronização FM≡body, seções DoD com conteúdo operacional da classe `fff` específico para o **Sovol Zero**, lacunas explícitas.
**Exclui:** inventar temperatures/volumes/materiais não observados; misturar evidência de outro SKU no **Sovol Zero**; promover marketing não citado.

## Especificações

Valores observados na evidência citada (acesso 2026-08-16). Capability ≠ certeza de processo no **Sovol Zero**.

| Capability | Valor observado | Fonte |
|---|---|---|
| Build volume / envelope | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Sovol Zero |
| Temperaturas / energia de processo | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Sovol Zero |
| Materiais homologados (lista pinada) | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Sovol Zero |
| Firmware / revisões de hardware | não publicado pelo fabricante na evidência consultada em 2026-08-16 | honest lacuna — Sovol Zero |

## Tecnologia

- Classe: material extrusion / FFF para **Sovol Zero** (`Sovol Zero`)
- Fluxo típico: filamento → hotend → deposição camada a camada na mesa do **Sovol Zero**
- Capability ≠ certeza de processo em qualquer filamento no **Sovol Zero**

## Manuais

- Portal / support do fabricante para **Sovol Zero**: partir da listagem `https://www.sovol3d.com/`
- Manual de operação/service completo do **Sovol Zero**: frequentemente portal/NDA — **não republicado** aqui quando não público
- Se HTML público completo não foi capturado em 2026-08-16: declarado em Lacunas do **Sovol Zero**

## Hardware

- Identidade de hardware: **Sovol Zero** / `Sovol Zero` sob `manufacturer.sovol`
- Revisões de hardware pinadas por serial do **Sovol Zero**: não publicadas nesta revisão
- Consumíveis típicos da classe `fff` aplicam-se ao **Sovol Zero** apenas após confirmação OEM

## Software

- Ecossistema de software do fabricante aplicável ao **Sovol Zero** (app/slicer/cloud conforme OEM)
- Versões pinadas: lacuna sem captura datada para o **Sovol Zero**

## Firmware

- Canal oficial de release notes do **Sovol Zero**: não pinado com versão datada nesta revisão
- Não inventar versão de firmware do **Sovol Zero** sem captura datada

## Slicer

- Usar perfil/preset do **Sovol Zero** no slicer suportado pelo OEM quando existir
- Não colar presets de outra família sem revisão dimensional/térmica do **Sovol Zero**

## Materiais

Materiais compatíveis oficiais pinados para **Sovol Zero**: não publicados pelo fabricante na evidência consultada em 2026-08-16 (exceto se listados na tabela de Especificações). Não inventar matriz PLA/ABS/ASA para o **Sovol Zero**. TDS/SDS não são substituídos por esta página.

## Manutenção

### Calibração (classe FFF — Sovol Zero)
- Primeira camada e leveling conforme procedimento do fabricante para **Sovol Zero**
- Verificar tensão de correia/extrusor e fluxo antes de culpar o filamento no **Sovol Zero**
- Manutenção preventiva: limpeza de nozzle, lubrificação de eixos conforme manual do **Sovol Zero**

## Segurança

- Superfícies quentes (hotend/mesa) no **Sovol Zero**
- Fumos de termoplásticos: ventilação adequada ao operar o **Sovol Zero**
- Critérios de parada: smell anômalo, blob no hotend, falha de sensor, overtemp

## Known issues

Base pública de known-issues específica do **Sovol Zero** não foi sistematizada nesta passagem.

| Tema | Nota |
|---|---|
| Specs incompletas | Ver Lacunas do **Sovol Zero** |
| Transferência de presets | Não copiar de outro modelo para o **Sovol Zero** sem adaptação |
| Troubleshooting de campo | Promover a `troubleshooting-mapped` só com árvore/support notes |

## Fontes

- [source.sovol-official-products](../22-fontes/sovol-official-products.md) — https://www.sovol3d.com/

## Lacunas

- Datasheet completo pinado do **Sovol Zero** além dos claims da tabela (quando houver)
- Manuais de serviço / error codes do **Sovol Zero**
- Firmware/software versions datadas do **Sovol Zero**
- Known issues de campo com URLs de support
- Matriz de materiais homologados com TDS para o **Sovol Zero**
