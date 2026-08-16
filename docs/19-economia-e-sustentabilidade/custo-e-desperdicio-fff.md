---
id: "econ.fff-cost-waste"
title: "Custo e desperdício em FFF"
summary: "Custo FFF real combina filamento, tempo de máquina, energia, falhas, suportes e retrabalho — não só R$/kg do spool. Desperdício cai com DfAM (menos suporte), cupons antes de peças longas, secagem adequada e critérios de aceite claros. Reciclar falhas domésticas tem limites (contaminação, segurança). Emissões e resíduos ainda importam (EPA/NIOSH). Não use economia como desculpa para pular ventilação ou claims food-safe falsos."
doc_type: "guide"
domain: ["economics", "sustainability", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini"]
not_for: ["ignore-safety-to-save-money", "claim-zero-waste-printing"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.epa-3d-printing-research", "source.niosh-am-entry"]
related: ["scenario.speed-vs-quality", "post.support-removal-fff", "quality.test-coupons", "hazard.voc-ufp-ventilation"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["custo de impressão FFF", "desperdício de filamento", "quando não imprimir"]
aliases_en: ["FFF cost", "filament waste", "print economics"]
tags: ["economics", "waste", "fff", "sustainability"]
---

# Custo e desperdício em FFF

Hub pai: [Economia e sustentabilidade](INDEX.md)

## O que compõe o custo

| Componente | Notas |
|---|---|
| Filamento na peça | Volume × densidade × preço |
| Suporte / brim / purge | Frequentemente invisível no “R$/peça” mental |
| Falhas | Quase o job inteiro + tempo |
| Tempo de máquina | Oportunidade + desgaste |
| Energia | Menor que falhas tipicamente, mas não zero |
| Pós | Lixa, tinta, inserts, solventes |
| Saúde/ambiente | Controles de [VOC/UFP](../15-seguranca-e-meio-ambiente/voc-ufp-e-ventilacao.md) — não externalizar |

## Heurísticas de redução de desperdício

1. **Cupom antes de peça longa** ([cupons](../11-qualidade-e-metrologia/cupons-e-ensaios.md))
2. **Menos suporte** via orientação ([remoção](../14-pos-processamento/remocao-de-suportes-fff.md))
3. **Secar** PETG/umidade — falha cosmética/stringing custa filamento
4. **Aceite escrito** — evita reprint “mais um pouco”
5. **Speed consciente** ([playbook](../16-cenarios-e-playbooks/impressao-rapida-vs-qualidade.md)) — falha aos 90% é o pior ROI
6. **Lote só após N=1–2 OK** em features críticas

## Quando não imprimir

- Peça comercial barata já resolve
- Carga/risco acima do que FFF desktop valida
- Única motivação é “food-safe DIY” ([claims](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md))
- Você não tem como ventilar/armazenar material perigoso (resina)

## Resíduos

- Purge/suporte PLA: verificar coleta local; não queimar
- Peças com tinta/solventes: residual químico — não tratar como “só plástico limpo”
- Pesquisa ambiental: [EPA 3D printing research](../22-fontes/epa-3d-printing-research.md)
- Higiene: [NIOSH](../22-fontes/niosh-additive-manufacturing.md)

## Reciclagem doméstica — limites

- Reextrusão caseira exige controle de contaminação e temperatura — não trivial
- Misturar PLA+PETG “no mesmo recycling” piora lote
- Esta base **não** afirma economia circular fechada no hobby

## Conta mental rápida (exemplo qualitativo)

Falha de 200 g + 6 h &gt; cupom de 15 g + 30 min. Otimizar falha &gt; caçar 2% de infill.

## Lacunas

- Planilha de custo energizado A1 Mini: não publicada
- LCA formal: fora de escopo
