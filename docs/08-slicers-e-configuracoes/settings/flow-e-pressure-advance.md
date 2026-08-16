---
id: "setting.flow-pressure-advance"
title: "Flow e pressure advance"
summary: "Flow (extrusion multiplier) escala o volume comando→filamento; pressure advance (PA) / linear advance compensa pressão no melt zone em aceleração/desaceleração para cantos nítidos e menos blob. Conceitos distintos: não ‘suba flow’ para consertar PA, nem o inverso. Em ecossistemas Bambu, calibrações assistidas podem encapsular esses efeitos — trate nomes de UI como mapeamento, não como física nova. Método: Ellis/Teaching Tech; valores não são universais entre hotends."
doc_type: "setting"
domain: ["slicing", "fff", "calibration"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "slicer.bambu-studio", "printer.bambu-lab-a1-mini"]
not_for: ["copy-pa-between-hotends", "flow-to-fix-moisture", "eternal-ui-path-pinning"]
settings: ["setting.flow", "setting.pressure-advance"]
slicers: ["slicer.bambu-studio"]
printers: ["printer.bambu-lab-a1-mini"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide", "source.teaching-tech-calibration", "source.marlin-docs", "source.klipper-docs"]
related: ["setting.retraction", "setting.speeds", "setting.temperatures", "defect.fff.under-extrusion", "defect.fff.stringing", "firmware.klipper-marlin-concepts", "hub.slicers.settings"]
prerequisites: ["process.fff.first-layer"]
supersedes: []
aliases_pt_br: ["fluxo", "extrusion multiplier", "pressure advance", "linear advance", "compensação de pressão"]
aliases_en: ["flow rate", "extrusion multiplier", "pressure advance", "linear advance"]
tags: ["setting", "flow", "pressure-advance", "calibration"]
---

# Flow e pressure advance

Hub pai: [Settings](INDEX.md)

## Conceito semântico

| Conceito | O que faz |
|---|---|
| **Flow / extrusion multiplier** | Escala global (ou por feature) do volume extrudado vs o calculado pelo slicer |
| **Pressure advance (PA)** | Modelo que atrasa/adianta extrusão com a velocidade para estabilizar pressão no nozzle |
| **Linear Advance (Marlin)** | Família de compensação de pressão no stack Marlin (K-factor) — ver [Marlin docs](../../22-fontes/marlin-docs.md) |
| **Pressure Advance (Klipper)** | Implementação no stack Klipper — ver [Klipper docs](../../22-fontes/klipper-docs.md) |

Bambu Studio / firmware OEM podem expor calibração assistida com outros rótulos — mapeie para a física acima; não assuma paridade 1:1 com Klipper DIY.

## Nomes no Bambu Studio (notas)

Busque **Flow**, **Flow ratio**, calibrações de dinâmicas/PA conforme versão. UI muda; use o assistente oficial quando disponível.

## Unidade / tipo

Flow: fator adimensional (ex.: ratio) ou %. PA/LA: coeficiente com unidade dependente do stack — **não misture** número de um firmware em outro.

## Mecanismo

- Sub-flow → gaps, paredes fracas ([subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md))
- Over-flow → elefante, bulging, overlapping
- PA mal ajustado → cantos rombudos ou gaps em mudanças de velocidade; blobs em junções
- Umidade e temperatura errada **mascaram** flow/PA — seque e estabilize temp primeiro

## Dependências

- [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) e Z offset estáveis
- [Temperaturas](temperaturas.md) na janela do filamento
- [Velocidades](velocidades.md) / aceleração (PA interage com dinâmica)
- [Retração](retracao.md) depois que flow/PA não estão absurdos
- Secagem do filamento

## Decisão: o que calibrar primeiro

```text
Filamento seco + temp OK + first layer OK?
  ├─ NÃO → corrigir isso
  └─ SIM → paredes/top com over/under uniforme?
        ├─ SIM padrão volumétrico → ajustar FLOW (cupom)
        └─ Problema só em cantos/acelerações → PA/LA (cupom dinâmico)
Não use flow para “consertar” stringing (veja retract/temp).
```

## Ordem de ataque (método)

1. Secar filamento  
2. Estabilizar temperatura (preset)  
3. Cupom de flow / wall calibration (Ellis / Teaching Tech como método)  
4. Cupom de pressure advance / linear advance no stack que você realmente usa  
5. Só então fine-tuning de retract  

Fontes de método: [Ellis](../../22-fontes/ellis-print-tuning-guide.md), [Teaching Tech](../../22-fontes/teaching-tech-calibration.md).

## Efeitos (qualitativo)

| ↑ flow | ↓ flow |
|---|---|
| Mais material; risco de overfill | Gaps; under-extrusion |
| | |

| PA alto demais / baixo demais | Sintoma típico |
|---|---|
| Fora da janela | Cantos ruins, gaps ou bulges em mudanças de velocidade |

Sem coeficientes universais — cada hotend/filamento/temp.

## Firmware aberto vs OEM

| Stack | Onde ler |
|---|---|
| Conceitos Marlin vs Klipper | [klipper-vs-marlin](../../17-software-firmware-e-automacao/klipper-vs-marlin-conceitos.md) |
| Docs Marlin | [source.marlin-docs](../../22-fontes/marlin-docs.md) |
| Docs Klipper | [source.klipper-docs](../../22-fontes/klipper-docs.md) |
| A1 Mini | Perfis/calibradores Bambu — não “flash Klipper” como passo desta wiki |

## Relações com outros conceitos

- sets-volume → flow
- compensates-pressure → PA/LA
- confused-with → retract, moisture
- verified-by → cupons de parede e canto

## Veja também

- [Subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md)
- [Stringing](../../12-problemas-e-diagnostico/fff/stringing.md)
- [Ordem de calibração FFF](../../09-calibracao/ordem-de-calibracao-fff.md)

## Fontes

- [source.ellis-print-tuning-guide](../../22-fontes/ellis-print-tuning-guide.md)
- [source.teaching-tech-calibration](../../22-fontes/teaching-tech-calibration.md)
- [source.marlin-docs](../../22-fontes/marlin-docs.md)
- [source.klipper-docs](../../22-fontes/klipper-docs.md)

## Lacunas

- Mapeamento explícito campo-a-campo Bambu Studio ↔ PA (por versão)
- Cupons locais versionados no repo
