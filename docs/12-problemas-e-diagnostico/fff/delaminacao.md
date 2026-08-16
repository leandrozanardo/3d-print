---
id: "defect.fff.delamination"
title: "Delaminação (separação de camadas) em FFF"
summary: "Delaminação é a separação entre camadas (solda Z fraca): fendas horizontais, split ao flexionar, casca que ‘abre’. Causas comuns: part cooling alto, nozzle frio, filamento úmido, speed alto demais para a temp, e draft em frame aberto. Em PETG é clássico. Diferencie de empenamento (lift de canto com base parcialmente livre) e de subextrusão (falta de material). Trate umidade e cooling antes de ‘subir walls’."
doc_type: "troubleshooting"
domain: ["fff", "quality", "troubleshooting"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini", "material.pla", "material.petg"]
not_for: ["corner-lift-only-warping", "xy-layer-shift"]
symptoms: ["symptom.delamination", "symptom.layer-split", "symptom.weak-z"]
causes: ["cause.high-cooling", "cause.cold-nozzle", "cause.moisture", "cause.draft"]
materials: ["material.pla", "material.petg"]
printers: ["printer.bambu-lab-a1-mini"]
slicers: ["slicer.bambu-studio"]
settings: ["setting.cooling", "setting.temperatures", "setting.speeds"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide", "source.teaching-tech-calibration"]
related: ["setting.cooling", "material.drying-storage", "defect.fff.warping", "defect.fff.under-extrusion", "material.petg", "setting.temperatures"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["delaminação", "separação de camadas", "layer splitting"]
aliases_en: ["delamination", "layer separation", "poor layer adhesion"]
tags: ["delamination", "troubleshooting", "fff"]
---

# Delaminação (separação de camadas) em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Camadas abrindo / peça racha no plano XY ao flexionar? Seque o filamento, reduza [cooling](../../08-slicers-e-configuracoes/settings/cooling.md) (especialmente PETG), confirme [temperatura](../../08-slicers-e-configuracoes/settings/temperaturas.md) no range, bloqueie draft. Não trate automaticamente como [empenamento](empenamento.md).

## Assinatura

- Visual: fenda horizontal entre layers; casca “descascando”
- Mecânico: baixa resistência Z; split limpo entre camadas
- Momento: mid-print ou na demolição/uso

## Diferenciar

| Observação | Página |
|---|---|
| Cantos sobem; base parcialmente livre | [Empenamento](empenamento.md) |
| Gaps / falta de filamento | [Subextrusão](subextrusao.md) |
| Degrau XY offset | [Layer shift](layer-shift.md) |
| Pops + porosidade | [Secagem](../../05-materiais/fff/secagem-e-armazenamento.md) primeiro |

## Cause matrix

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta (PETG) | Fan alto | Interface fria |
| Alta | Umidade | Vapor / bonding ruim |
| Alta | Nozzle frio / speed alto | Viscosidade + tempo curto |
| Média | Draft AC | Cooling assimétrico (A1 Mini aberta) |
| Média | Óleo/contaminação | Raro; path sujo |
| Baixa-primeira | “Infill baixo” | Walls/orientação primeiro para força; bonding é térmico |

## Árvore

```text
Pops / bobina duvidosa?
  ├─ SIM → secar → cupom de flexão Z
  └─ NÃO → PETG com fan alto?
        ├─ SIM → ↓ fan; early layers baixos
        └─ NÃO → temp no range? speed moderado?
              ├─ NÃO → +5 °C / −speed (uma variável)
              └─ SIM → bloquear draft; reorientar carga se possível
```

## Testes

1. Cupom de parede / flexão entre layers  
2. Mesmo G-code com fan −20–40% (PETG)  
3. Secagem controlada se suspeita  

## PLA vs PETG

| | PLA | PETG |
|---|---|---|
| Fan alto | geralmente OK cosmética | risco clássico de Z fraco |
| Umidade | contribui | contribui forte |
| Draft | menos crítico | mais crítico com fan |

## Segurança

- Peça estrutural delaminada pode falhar em uso — não certifique carga  
- Se split ocorrer com nozzle ainda imprimindo e peça móvel → risco de colisão  

## Validação

Cupom flexiona sem abrir layers; superfície sem fendas horizontais.

## Prevenção

- Preset do material (não PLA fan em PETG)  
- Secar  
- Controle de corrente de ar  
- Orientar cargas no plano XY quando possível  

## Relações com outros conceitos

- caused-by → cooling, cold, moisture, draft  
- related-to → [empenamento](empenamento.md) (ambos térmicos; assinaturas diferentes)  
- settings → cooling, temperatures, speeds  
- material-bias → PETG  

## Veja também

- [Cooling](../../08-slicers-e-configuracoes/settings/cooling.md)
- [PETG](../../05-materiais/fff/petg.md)
- [Índice por sintoma](indice-por-sintoma.md)

## Fontes

- Mecanismo de interlayer welding (princípio)
- Legado matriz sintoma (delaminação ↔ cooling/úmido)
- Páginas de material PETG/PLA

## Lacunas

- Ensaio quantitativo de Z-strength local
- Página de orientação de carga / DfAM
