---
id: "defect.fff.elephant-foot"
title: "Elephant foot (pé de elefante) em FFF"
summary: "Elephant foot é o alargamento da base nas primeiras camadas por over-squish e/ou excesso de calor na mesa — estraga encaixes e furos na base. Oposto: Z alto demais causa peel. Na A1 Mini: limpe PEI, leia a first layer (linhas se beijando), só então use elephant foot compensation (ordem 0,1–0,2 mm) se a tolerância exigir. Não use raft para ‘consertar’ foot. Diferencie de warp e de erro dimensional no meio da peça."
doc_type: "troubleshooting"
domain: ["fff", "quality", "troubleshooting"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini", "material.pla", "material.petg"]
not_for: ["mid-part-dimensional-only", "raft-as-elephant-fix"]
symptoms: ["symptom.elephant-foot", "symptom.fat-base"]
causes: ["cause.over-squish", "cause.hot-bed", "cause.first-layer-flow"]
materials: ["material.pla", "material.petg"]
printers: ["printer.bambu-lab-a1-mini"]
slicers: ["slicer.bambu-studio"]
settings: ["setting.temperatures"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide", "source.bambu-a1-mini-tech-specs", "source.teaching-tech-calibration"]
related: ["process.fff.first-layer", "defect.fff.warping", "setting.temperatures", "defect.fff.layer-shift"]
prerequisites: ["process.fff.first-layer"]
supersedes: []
aliases_pt_br: ["elephant foot", "pé de elefante", "base alargada"]
aliases_en: ["elephant foot", "elephants foot", "fat first layer"]
tags: ["elephant-foot", "first-layer", "troubleshooting"]
---

# Elephant foot (pé de elefante) em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Base gorda / furos apertados só embaixo? Confirme squish visual na [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md): se estiver “panqueca” transparente, reduza squish (Z/live offset no fluxo Bambu). Se squish OK mas fit falha → elephant foot compensation ~0,1–0,2 mm — **validar** no cupom.

## Assinatura

- Visual: primeira(s) camada(s) mais largas que o corpo
- Funcional: tampa/eixo não entra só na base
- Não é: cantos subindo ([empenamento](empenamento.md))

## Diferenciar

| Observação | Página |
|---|---|
| Não gruda / ridges altos | [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) (pouco squish) |
| Erro só no meio da peça | flow/walls/temp — não foot |
| Degrau XY | [Layer shift](layer-shift.md) |

## Cause matrix

| Plausibilidade | Causa | Ação |
|---|---|---|
| Alta | Over-squish | Elevar Z / menos “crush”; recalibrar mesa |
| Alta | First layer quente demais + bed alto | Ajustar no range — [temperaturas](../../08-slicers-e-configuracoes/settings/temperaturas.md) |
| Média | Flow first layer alto | Reduzir override de first layer |
| Média | Sem chamfer na peça | Design: 0,2–0,5 mm chamfer (heurística) |
| Baixa-primeira | Raft | Não; mascara e piora controle |

## Árvore

```text
Linhas da first layer?
  ├─ Ridges / gaps → mais squish / limpeza / cal (adesão)
  ├─ Panqueca transparente → menos squish
  └─ Kiss OK mas furos apertados na base → compensation 0,1–0,2 mm
Fits críticos?
  ├─ SIM → cupom de encaixe — validar na impressora
  └─ NÃO → priorize adesão estável
```

## Heurísticas A1 Mini (partida)

- First layer height frequentemente ≥ layer nominal  
- First layer speed baixa  
- Bed no range do material (PETG ≤ 80 °C)  
- Compensation só após squish correto  

Legado EN: [elephant-foot-e-primeira-camada.md](../../projeto/qualidade-e-acabamento/elephant-foot-e-primeira-camada.md).

## Validação

Cupom com furo/pino; medir base vs altura média.

## Prevenção

- Design com filete/chamfer inferior  
- Não perseguir adesão com crush extremo  
- Placa limpa antes de números  

## Relações com outros conceitos

- opposite-of → first layer too high  
- depends-on → [process.fff.first-layer](../../10-processo-de-impressao/fff/primeira-camada.md)  
- related-to → bed temp, first layer flow  
- not-for → mid-print dimensional drift  

## Veja também

- [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)
- [Empenamento](empenamento.md)

## Fontes

- Legado qualidade A1 Mini
- Prática de compensation em slicers modernos

## Lacunas

- Nome exato do campo no Studio por versão
- Cupom STEP padronizado no repo
