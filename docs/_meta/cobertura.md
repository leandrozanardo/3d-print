---
id: "meta.coverage"
title: "Matriz de cobertura"
summary: "Cobertura mensurável por domínio 01–23 e fatia A1 Mini. Nenhum domínio declarado completo. Status: none/stub/draft/partial/deep."
doc_type: "coverage"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "per-batch"
related: ["meta.gaps", "meta.continuation", "meta.work-queue"]
tags: ["coverage"]
---

# Matriz de cobertura

Legenda: `none` | `hub-only` | `draft` | `partial` | `deep` | `verified`

| Domínio | Status canônico novo | Legado útil | Prioridade |
|---|---|---|---|
| 01 fundamentos | hub-only | ebook parcial | Wave 1 |
| 02 tecnologias | hub-only + FFF draft | ebook FFF | Wave 1–2 |
| 03 máquinas/arquiteturas | hub-only | projeto hardware | Wave 3 |
| 04 componentes | hub-only + nozzle 0.4 draft | projeto extrusão/mesa | Wave 2–3 |
| 05 materiais | **partial** (PLA/PETG draft) | projeto materiais | Wave 2/4 |
| 06 DfAM | hub-only | projeto geometria | Wave 7 |
| 07 modelos/formatos | hub-only | ebook malhas | Wave 7 |
| 08 slicers/settings | hub-only | projeto fatiamento/perfis | Wave 5 |
| 09 calibração | hub-only | projeto workflow | Wave 2–5 |
| 10 processo | **partial** (primeira camada) | qualidade | Wave 2 |
| 11 metrologia | hub-only | pouco | Wave 7 |
| 12 problemas | **partial** (empenamento) | troubleshooting | Wave 6 |
| 13 manutenção | hub-only | a1-mini-manutencao | Wave 3 |
| 14 pós-processamento | hub-only | qualidade pós | Wave 8 |
| 15 segurança | hub-only | ebook food-safety prose | Wave 8 |
| 16 cenários | **partial** (1 playbook vertical) | proposito/perfis | Wave 2/8 |
| 17 software/firmware | hub-only | ebook gcode | Wave 3/5 |
| 18 aplicações/regulação | hub-only | — | Wave 11 |
| 19 economia | hub-only | — | Wave 8 |
| 20 pesquisa/mitos | hub-only | — | Wave 11 |
| 21 impressoras | **partial** (A1 Mini draft) | projeto+printers | Wave 2 |
| 22 fontes | **partial** (fontes da fatia) | fontes-e-atribuicao | contínuo |
| 23 glossário | hub-only | — | Wave 1 |

## Fatia vertical (critério Wave 0)

| Página | ID | Status |
|---|---|---|
| A1 Mini | `printer.bambu-lab-a1-mini` | draft |
| Nozzle 0.4 | `nozzle.0.4mm-fff` | draft |
| PLA | `material.pla` | draft |
| PETG | `material.petg` | draft |
| Primeira camada | `process.fff.first-layer` | draft |
| Empenamento | `defect.fff.warping` | draft |
| Playbook vertical | `scenario.a1-mini-pla-petg-first-layer-warp` | draft |
| FFF overview | `tech.fff` | draft |

**Não verificado em impressora nesta sessão.** `knowledge_status: verified` bloqueado até evidência local ou fonte manufacturer-specific completa + DoD.
