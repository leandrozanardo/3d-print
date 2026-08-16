---
id: "meta.ontology"
title: "Ontologia da base de conhecimento"
summary: "Entidades e relações semânticas obrigatórias para manufatura aditiva: processo, tecnologia, impressora, material, setting, sintoma, causa, teste, correção, hazard e fonte. Linguagem consistente para front matter e seção Relações."
doc_type: "policy"
domain: ["meta"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
related: ["meta.architecture", "meta.link-policy", "meta.templates"]
tags: ["ontology", "rag"]
---

# Ontologia

## Entidades principais

| Entidade | ID prefix sugerido | Exemplo |
|---|---|---|
| additive process | `process.` | `process.material-extrusion` |
| technology | `tech.` | `tech.fff` |
| printer | `printer.` | `printer.bambu-lab-a1-mini` |
| printer capability | `capability.` | `capability.auto-bed-leveling` |
| kinematics | `kinematics.` | `kinematics.bed-slinger` |
| component | `component.` | `component.hotend` |
| nozzle | `nozzle.` | `nozzle.0.4mm` |
| build surface | `surface.` | `surface.pei-textured` |
| material family | `material.` | `material.pla` |
| material formulation | `formulation.` | `formulation.petg-cf` |
| manufacturer product | `product.` | `product.bambu-pla-basic` |
| slicer | `slicer.` | `slicer.bambu-studio` |
| setting | `setting.` | `setting.layer-height` |
| firmware feature | `firmware.` | `firmware.input-shaping` |
| geometry characteristic | `geometry.` | `geometry.overhang` |
| design requirement | `design.` | `design.press-fit` |
| purpose | `purpose.` | `purpose.miniature` |
| environment | `env.` | `env.open-frame-draft` |
| calibration | `cal.` | `cal.first-layer` |
| symptom | `symptom.` | `symptom.corner-lift` |
| defect | `defect.` | `defect.fff.warping` |
| cause | `cause.` | `cause.thermal-shrinkage` |
| diagnostic test | `test.` | `test.first-layer-visual` |
| corrective action | `fix.` | `fix.enable-brim` |
| maintenance action | `maint.` | `maint.clean-pei` |
| safety hazard | `hazard.` | `hazard.voc-ufp` |
| post-processing method | `post.` | `post.sanding` |
| measurement method | `measure.` | `measure.caliper` |
| scenario | `scenario.` | `scenario.a1-mini-pla-first-layer` |
| source | `source.` | `source.bambu-a1-mini-tech-specs` |
| claim | `claim.` | (uso interno em contradições) |
| experiment | `experiment.` | |
| limitation | `limit.` | `limit.no-heated-chamber` |

## Relações semânticas (vocabulário canônico)

Use estes predicados em front matter (`related` tipado em texto) e na seção **Relações com outros conceitos**:

| Relação | Significado |
|---|---|
| is-a | Especialização |
| part-of | Composição |
| applies-to | Escopo de validade |
| requires | Pré-requisito duro |
| compatible-with | Compatibilidade |
| incompatible-with | Incompatibilidade |
| causes | Causalidade direta |
| contributes-to | Fator contributivo |
| indicated-by | Sintoma indica |
| diagnosed-by | Teste diagnostica |
| mitigated-by | Mitigação parcial |
| fixed-by | Correção |
| worsened-by | Agravante |
| improves | Melhora métrica |
| trades-off-with | Trade-off |
| overrides | Precedência contextual |
| depends-on | Dependência |
| conflicts-with | Conflito |
| measured-by | Método de medição |
| sourced-from | Proveniência |
| supersedes | Substitui canonicamente |

## Regras de uso

1. Prefira IDs a paths no front matter; paths relativos no corpo Markdown.
2. Não invente relação causal sem mecanismo ou teste discriminante.
3. `supersedes` só após migração registrada; página antiga recebe `deprecated`/`archived`.
4. Safety hazards têm precedência: se `hazard.*` aplica, declare antes de receita.
5. Distinga `tech.fff` (processo genérico) de `process.material-extrusion` (categoria ISO/ASTM) e de marca FDM.
