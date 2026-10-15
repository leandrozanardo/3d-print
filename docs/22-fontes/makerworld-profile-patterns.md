---
id: source.makerworld-profile-patterns
title: Fonte — Padrões MakerWorld / presets Bambu
summary: Registro de descoberta sobre como creators e presets oficiais no MakerWorld
  refinaram 3MF/STL para Bambu (perfil máquina certo, plate, AMS, preview de suporte).
  Heurística operacional — validar na A1 Mini.
doc_type: source
domain:
- sources
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-10-15'
review_cycle: 6-months
related:
- printer.bambu-lab-a1-mini
- slicer.bambu-studio
tags:
- source
- makerworld
- community
technology: []
process: []
applies_to: []
not_for:
- hard-safety-rules
- blind-one-click-without-preview
sources: []
prerequisites: []
supersedes: []
aliases_pt_br: []
aliases_en: []
source_type: discovery-only
language: en
version: pattern-synthesis-2026-10-15
last_verified: '2026-10-15'
---
# Fonte — Padrões MakerWorld / presets Bambu

| Campo | Valor |
|---|---|
| source id | `source.makerworld-profile-patterns` |
| tipo | marketplace + official profile ecosystem (discovery) |
| organização | Bambu Lab MakerWorld |
| URL | https://makerworld.com/ |
| data de acesso | 2026-10-15 |
| accessed | 2026-10-15 |
| confiabilidade | média para fluxo operacional; baixa para números sem cupom |

## Tópicos sustentados

- 3MF MakerWorld costuma carregar printer/filament/process — **re-mapear para A1 Mini** se o arquivo veio de X1/P1/A1 full
- Ler notas do creator (plate, brim, supports painted, AMS mapping)
- Um clique no Handy/Studio não dispensa preview de first layer / supports / skirt
- Profiles oficiais Bambu são baseline; refinamentos comunitários exigem validação local

## Limites

- Popularidade ≠ qualidade dimensional ou segurança
- “Print profile included” pode assumir nozzle/plate diferentes
- Não substitui TDS do filamento nem wiki de manutenção

## Páginas que utilizam

- [Playbook MakerWorld → receita](../projeto/workflow/makerworld-para-receita.md)
- [fontes-e-atribuicao (projeto)](../projeto/fontes-e-atribuicao.md)
