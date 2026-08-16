---
id: source.klipper-docs
title: Fonte — Klipper Documentation
summary: 'Documentação oficial do projeto Klipper (klipper3d.org): host-based motion
  planning, printer.cfg, macros e recursos como pressure advance. Usar para conceitos
  de stacks abertos Klipper. Não descreve firmware interno Bambu nem instrui jailbreak/substituição
  de OEM.'
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
- source.marlin-docs
aliases_en:
- Klipper docs
- klipper3d.org
tags:
- source
- klipper
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
# Fonte — Klipper Documentation

| Campo | Valor |
|---|---|
| source id | `source.klipper-docs` |
| arquivo | `klipper-docs.md` |
| tipo | project documentation (official) |
| projeto | Klipper |
| título | Klipper documentation hub |
| URL | https://www.klipper3d.org/ |
| data de acesso | 2026-08-15 |
| confiabilidade | boa para **conceitos e referência** do ecossistema Klipper; features e sintaxe variam por versão |

## Tópicos sustentados

- Modelo host + MCU (planejamento no host)
- Configuração via arquivos texto (`printer.cfg` e includes)
- Pressure advance e outros recursos documentados no site oficial
- Macros e ecossistema de configuração

## Uso permitido nesta base

- Proveniência ao comparar stacks abertos
- Apoiar [Klipper vs Marlin — conceitos](../17-software-firmware-e-automacao/klipper-vs-marlin-conceitos.md)
- Apoiar [flow / pressure advance](../08-slicers-e-configuracoes/settings/flow-e-pressure-advance.md) quando o stack for Klipper

## Limites

- **Não** é documentação Bambu Lab / A1 Mini
- Coeficientes de PA e exemplos de config **não** transferem automaticamente entre impressoras
- Host offline durante print = risco operacional — a doc oficial discute o modelo; esta entrada não é SOP de segurança de unattended print
- Não autoriza flash/jailbreak de equipamentos proprietários

## Páginas que utilizam

- [Klipper vs Marlin — conceitos](../17-software-firmware-e-automacao/klipper-vs-marlin-conceitos.md)
- [Flow e pressure advance](../08-slicers-e-configuracoes/settings/flow-e-pressure-advance.md)
- [G-code fundamentos](../17-software-firmware-e-automacao/gcode-fundamentos.md) (contexto)

## Lacunas

- Índice de subpáginas (Config Reference, Pressure Advance, etc.) pode ser detalhado em wave futura sem copiar o manual inteiro
