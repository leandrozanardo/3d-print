---
id: "meta.printer-exclusions"
title: "Exclusões do catálogo de impressoras"
summary: "O que fica de fora do catálogo canônico de impressoras: stubs sem evidência, bundles sem hardware distinto, listagens de marketplace sem identidade OEM, e claims de cobertura total sem denominador."
doc_type: "policy"
domain: ["printers", "meta"]
technology: []
process: []
applies_to: ["catalog-maintainers"]
not_for: ["hide-discontinued-relevant-models"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "high"
last_reviewed: "2026-08-16"
review_cycle: "per-batch"
sources: []
related: ["meta.printer-inclusion-criteria", "meta.printer-progress"]
prerequisites: ["meta.printer-inclusion-criteria"]
supersedes: []
aliases_pt_br: ["exclusões catálogo impressoras"]
aliases_en: ["printer catalog exclusions"]
tags: ["exclusions", "catalog"]
---

# Exclusões do catálogo

## Excluir / não catalogar como impressora

- Anúncio sem modelo identificável
- Listing de marketplace sem fabricante/modelo verificável
- Acessório, upgrade kit ou toolhead vendido isoladamente (vai para componentes)
- Filamento/resina/pó (domínio materiais)
- Slicer/firmware (domínio software), salvo relação na página da máquina
- Página stub sem fonte

## Não excluir só por descontinuação

Modelos `discontinued` / `legacy-supported` relevantes para troubleshooting **permanecem** catalogáveis com lifecycle explícito.

## Exclusões registradas neste batch

Nenhuma exclusão factual de modelo específico ainda (censo não iniciado).
