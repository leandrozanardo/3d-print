---
id: source.marlin-docs
title: Fonte — Marlin Firmware Documentation
summary: Documentação oficial do firmware Marlin (introdução e docs em marlinfw.org).
  Usar para conceitos de G-code, configuração e recursos como Linear Advance em stacks
  abertos baseados em Marlin. Não descreve firmware proprietário Bambu nem autoriza
  flash/jailbreak.
doc_type: source
domain:
- sources
- firmware
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
related:
- firmware.klipper-marlin-concepts
- firmware.gcode-basics
- setting.flow-pressure-advance
- source.klipper-docs
aliases_en:
- Marlin docs
- marlinfw.org
tags:
- source
- marlin
- firmware
technology: []
process: []
applies_to: []
not_for: []
sources: []
prerequisites: []
supersedes: []
aliases_pt_br: []
source_type: discovery-only
language: unknown
version: unknown
last_verified: '2026-08-16'
---
# Fonte — Marlin Firmware Documentation

| Campo | Valor |
|---|---|
| source id | `source.marlin-docs` |
| arquivo | `marlin-docs.md` |
| tipo | project documentation (official) |
| projeto | Marlin Firmware |
| título | Introduction (docs hub) |
| URL | https://marlinfw.org/docs/basics/introduction.html |
| site | https://marlinfw.org/ |
| data de acesso | 2026-08-15 |
| confiabilidade | boa para **conceitos e referência** do ecossistema Marlin; detalhes variam por versão |

## Tópicos sustentados

- Visão geral da arquitetura MCU-centric do Marlin
- Navegação para G-code, configuração e features documentadas no site oficial
- Contexto para Linear Advance / compensação de pressão quando o stack for Marlin

## Uso permitido nesta base

- Citar como proveniência ao discutir firmware aberto vs OEM
- Apoiar [Klipper vs Marlin — conceitos](../17-software-firmware-e-automacao/klipper-vs-marlin-conceitos.md)
- Apoiar discussão semântica de [flow / pressure advance](../08-slicers-e-configuracoes/settings/flow-e-pressure-advance.md) **quando** o leitor estiver em Marlin

## Limites

- **Não** é documentação Bambu Lab / A1 Mini
- Números de K-factor / features dependem da **versão** — verificar a página específica da versão em uso
- Não autoriza substituir firmware de impressoras proprietárias nem contornar travas
- Não usar para afirmar paridade de comportamento com calibradores assistidos OEM

## Páginas que utilizam

- [Klipper vs Marlin — conceitos](../17-software-firmware-e-automacao/klipper-vs-marlin-conceitos.md)
- [Flow e pressure advance](../08-slicers-e-configuracoes/settings/flow-e-pressure-advance.md)
- [G-code fundamentos](../17-software-firmware-e-automacao/gcode-fundamentos.md) (contexto)

## Lacunas

- Pinagem de páginas filhas por feature (LA, input shaping se aplicável à versão) pode ser expandida em waves futuras
