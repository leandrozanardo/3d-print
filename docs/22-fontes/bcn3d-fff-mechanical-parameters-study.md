---
id: source.bcn3d-fff-mechanical-parameters-study
title: 'Fonte — BCN3D study: FFF parameters vs mechanical properties'
summary: 'Estudo BCN3D com 495 corpos de prova (PLA/PETG/ABS) sobre densidade, paredes,
  padrão de infill e outros parâmetros. Sustenta que densidade aumenta resistência
  com retornos decrescentes (ex.: ABS 60%→80% sem ganho claro) e que número de paredes
  eleva tração de forma consistente.'
doc_type: source
domain:
- sources
- fff
- research
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- infill
not_for:
- universal-100-infill-rule
- metal-pbf
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: normal
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 12-months
sources: []
related:
- myth.100-infill-mais-forte
prerequisites: []
supersedes: []
aliases_pt_br: []
aliases_en: []
tags:
- source
- fff
- mechanical
- bcn3d
source_type: primary-research
organization: BCN3D Technologies
canonical_url: https://bcn3d.com/study-of-the-impact-of-3d-printing-parameters-on-the-mechanical-properties-of-fff-samples/
manufacturer_id: bcn3d
models_covered:
- BCN3D Epsilon W50 (test platform)
language: en
region: global
access_status: ok
last_verified: '2026-08-16'
accessed_at: '2026-08-16'
license_or_terms: Publisher web page / whitepaper terms; cite, do not republish full
  paper
primary_or_secondary: primary
version: unversioned
---
# Fonte — BCN3D FFF mechanical parameters study

| Campo | Valor |
|---|---|
| source id | source.bcn3d-fff-mechanical-parameters-study |
| organization | BCN3D Technologies |
| URL | https://bcn3d.com/study-of-the-impact-of-3d-printing-parameters-on-the-mechanical-properties-of-fff-samples/ |
| source_type | primary-research |
| accessed | 2026-08-16 |
| last_verified | 2026-08-16 |
| language | en |

## Claims sustentados

- Densidade de infill correlaciona com aumento de propriedades mecânicas em PLA/PETG; em ABS o ganho 60%→80% não assegurou melhor desempenho de tração no estudo
- Número de paredes aumentou resistência à tração de forma consistente nos materiais testados
- Padrão de infill (grid/gyroid/triangular) **não** mostrou efeito dominante universal no estudo

## Limitações

- Plataforma Epsilon W50; não generalizar a todas as impressoras
- Whitepaper OEM — não peer-reviewed journal
- Não prova o slogan de 100% infill como regra universal
