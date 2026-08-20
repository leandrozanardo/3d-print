---
id: source.bambu-wiki-spaghetti
title: 'Fonte — Bambu Lab Wiki, Troubleshooting Spaghetti'
summary: 'Registro da página oficial da Bambu Lab sobre spaghetti em FFF (first-layer
  e mid-print: warping, colapso de suporte e raspagem do nozzle), com velocidades
  de first layer, brim, Z hop e suportes no Bambu Studio.'
doc_type: source
domain:
- sources
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-19'
review_cycle: 6-months
related:
- defect.fff.spaghetti
- defect.fff.adhesion-failure
- defect.fff.warping
- printer.bambu-lab-a1-mini
- slicer.bambu-studio
tags:
- source
- bambu
- spaghetti
- print-quality
technology: []
process: []
applies_to: []
not_for: []
sources: []
prerequisites: []
supersedes: []
aliases_pt_br: []
aliases_en: []
source_type: official-knowledge-base
language: en
version: unknown
last_verified: '2026-08-19'
---
# Fonte — Bambu Lab Wiki, Troubleshooting Spaghetti

| Campo | Valor |
|---|---|
| source id | `source.bambu-wiki-spaghetti` |
| tipo | official knowledge base |
| título | Troubleshooting Spaghetti in 3D Printing |
| organização | Bambu Lab |
| URL | https://wiki.bambulab.com/en/filament-acc/filament/print-quality/spaghetti |
| data de acesso | 2026-08-19 |
| confiabilidade | alta para procedimentos e paths de UI do Bambu Studio / impressoras Bambu |

## Tópicos sustentados

- Spaghetti como extrusão no ar após falha de adesão, warp, colapso de overhang ou raspagem do nozzle
- First-layer: limpeza da placa, tipo de placa no slicer, Auto Bed Leveling, secagem, initial layer ≤ 30 mm/s e initial layer infill ≤ 60 mm/s
- Mid-print warping: brim, placa, leveling; filamentos de alta contração (ABS, ASA, PC, PA, PA-CF)
- Colapso de suporte: overhang > 45°, Enable support, Slow down for overhangs, velocidades de Support / Support interface, Normal (auto) vs tree
- Raspagem do nozzle: Z hop type **Normal**; brim 5–8 mm Outer brim only; Paint-on Supports
- Skip Objects quando só algumas peças na placa viram spaghetti

## Limites

- Paths de UI (Calibration, Printer → Extruder, Process → Speed/Support) mudam com versão do Studio e modelo
- Números (30 mm/s, 5–8 mm, 45°) são ponto de partida do fabricante, não perfil universal fora do ecossistema Bambu
- Limpeza da placa, umidade e leveling **não** são observáveis na malha; o motor só emite proxies geométricos

## Páginas que utilizam

- [Spaghetti (FFF)](../12-problemas-e-diagnostico/fff/spaghetti.md)
