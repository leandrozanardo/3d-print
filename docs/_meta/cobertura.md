---
id: "meta.coverage"
title: "Matriz de cobertura"
summary: "Cobertura mensurável por domínio 01–23 após Waves 0–11 (parcial). Nenhum domínio declarado completo ou verified. Status: none/hub-only/draft/partial/deep."
doc_type: "coverage"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-16"
review_cycle: "per-batch"
related: ["meta.gaps", "meta.continuation", "meta.work-queue"]
tags: ["coverage"]
---

# Matriz de cobertura

Legenda: `none` | `hub-only` | `draft` | `partial` | `deep` | `verified`

**Nenhum domínio `verified`.** Waves 1–9 podem ter avançado em paralelo por outros agentes; esta matriz reflete o estado consolidado pós-Wave 10–11 neste batch + fatia Wave 0 conhecida.

## Por domínio (01–23)

| Domínio | Status canônico | Notas Wave | Legado útil |
|---|---|---|---|
| 01 fundamentos | hub-only → ? | W1 alvo; confirmar páginas profundas se peer criou | ebook parcial |
| 02 tecnologias | **partial** | W9–11: sete categorias; PBF/BJ/DED deep; comparação | ebook FFF |
| 03 máquinas/arquiteturas | hub-only | W3 | projeto hardware |
| 04 componentes | **partial** | nozzle 0.4 draft (W0) | projeto extrusão/mesa |
| 05 materiais | **partial** | PLA/PETG (W0) + feedstocks pó (W10) | projeto materiais |
| 06 DfAM | hub-only | W7 | projeto geometria |
| 07 modelos/formatos | hub-only | W7 | ebook malhas |
| 08 slicers/settings | hub-only | W5 | projeto fatiamento |
| 09 calibração | hub-only | W2–5 | projeto workflow |
| 10 processo | **partial** | primeira camada FFF (W0) | qualidade |
| 11 metrologia | hub-only | W7 | pouco |
| 12 problemas | **partial** | warping + adesão FFF; defeitos PBF (W10) | troubleshooting |
| 13 manutenção | hub-only | W3 | a1-mini-manutencao |
| 14 pós-processamento | **partial** | depowdering/pós-metal (W10) | qualidade pós |
| 15 segurança | **partial** | VOC/UFP, resina, food/medical (peer) + pós metálicos (W10) | ebook food prose |
| 16 cenários | **partial** | 1 playbook vertical (W0) | proposito/perfis |
| 17 software/firmware | **partial** | G-code + Klipper/Marlin conceitos (W11) | ebook gcode |
| 18 aplicações/regulação | **partial** | limites de qualificação (W11) | — |
| 19 economia | hub-only | W8 | — |
| 20 pesquisa/mitos | **partial** | mito PLA food-safe + mito 100% infill (W11) | — |
| 21 impressoras | **partial→catalog-scale** | Snapshot census 2026-08-16: 66 OEMs / 353 modelos `cataloged`; 0 `documented` DoD; A1 Mini profunda | projeto+printers |
| 22 fontes | **partial** | fatia W0 + NIOSH/EPA/FDA | fontes-e-atribuicao |
| 23 glossário | hub-only | W1 | — |

## Categorias tecnológicas (02)

| Categoria | Status | Páginas-chave |
|---|---|---|
| Material extrusion | partial | `tech.fff` |
| Vat photopolymerization | **partial** | `tech.vat-photopolymerization`, `tech.sla-dlp-msla` (peer W9) |
| Powder bed fusion | **partial** | `tech.powder-bed-fusion`, `tech.sls-mjf`, `tech.lpbf-ebm` |
| Binder jetting | **partial** | `tech.binder-jetting`, `tech.binder-jetting-variants` |
| Material jetting | **partial** | `tech.material-jetting` |
| Directed energy deposition | **partial** | `tech.directed-energy-deposition`, `tech.ded-waam` |
| Sheet lamination | **partial** | `tech.sheet-lamination` |
| Comparação | draft | `tech.category-comparison` |

## Fatia vertical FFF (Wave 0)

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

## Fatia pó/metal (Wave 10)

| Página | ID | Status |
|---|---|---|
| SLS/MJF | `tech.sls-mjf` | draft / partial depth |
| LPBF/EBM | `tech.lpbf-ebm` | draft / partial depth |
| Feedstocks pó | `material.powder-feedstocks` | draft |
| Defeitos PBF | `defect.pbf` | draft |
| Depowdering/pós-metal | `post.depowdering-metal` | draft |
| Hazard pó metal | `hazard.metal-powder` | draft |
| DED/WAAM | `tech.ded-waam` | draft |
| BJ variantes | `tech.binder-jetting-variants` | draft |

## Consolidação (Wave 11)

| Página | ID | Status |
|---|---|---|
| Comparação categorias | `tech.category-comparison` | draft |
| Mito PLA food-safe | `myth.pla-food-safe` | draft |
| Mito 100% infill | `myth.100-infill-stronger` | draft |
| Limites qualificação | `app.qualification-limits` | draft |
| G-code fundamentos | `firmware.gcode-basics` | draft |
| Klipper vs Marlin | `firmware.klipper-marlin-concepts` | draft |
| NIOSH entry | `source.niosh-am-entry` | draft (peer + uso W10) |
| EPA 3D printing research | `source.epa-3d-printing-research` | draft (peer; preferido) |
| FDA AM medical | `source.fda-am-medical-devices-entry` | draft |

**Não verificado em impressora/facility nesta sessão.**
