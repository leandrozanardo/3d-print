---
id: hub.software
title: Software, firmware e automação
summary: Firmware, G-code, hosts remotos e limites seguros de automação. Hub de navegação;
  a cobertura profunda depende da matriz em _meta/cobertura.md.
doc_type: hub
domain:
- hub
technology: []
process: []
applies_to: []
not_for:
- complete-coverage-claim
knowledge_status: draft
evidence_status: unknown
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 3-months
sources: []
related:
- meta.coverage
- meta.knowledge-map
prerequisites:
- meta.architecture
supersedes: []
aliases_pt_br:
- Software, firmware e automação
aliases_en: []
tags:
- hub
---
# Software, firmware e automação

## Escopo

Firmware, G-code, hosts remotos e limites seguros de automação.

## Status

Ver matriz em [_meta/cobertura.md](../_meta/cobertura.md). Este hub existe para navegação estável; páginas atômicas profundas entram por wave.

## Entradas recomendadas

- Portal humano: [docs/INDEX.md](../INDEX.md)
- Guia da IA: [docs/AGENT_GUIDE.md](../AGENT_GUIDE.md)
- Roteamento: [_meta/roteamento-de-consultas.md](../_meta/roteamento-de-consultas.md)
- Legado operacional A1 Mini: [projeto/INDEX.md](../projeto/INDEX.md) (até migração)

## Mapa local

| Página | ID | Status |
|---|---|---|
| [G-code — fundamentos](gcode-fundamentos.md) | `firmware.gcode-basics` | draft |
| [Klipper vs Marlin — conceitos](klipper-vs-marlin-conceitos.md) | `firmware.klipper-marlin-concepts` | draft |
| [Input shaping e ressonância](input-shaping-e-ressonancia.md) | `firmware.input-shaping-resonance` | draft |
| [Bed mesh e Z-offset](bed-mesh-e-z-offset.md) | `firmware.bed-mesh-z-offset` | draft |

## Relações com outros conceitos

- part-of → base canônica `docs/`
- depends-on → políticas em `_meta/`

## Lacunas

- Procedimentos versionados OEM (A1 Mini) pinados por firmware: abertos
- Cobertura deep adicional: ver `cobertura.md`
