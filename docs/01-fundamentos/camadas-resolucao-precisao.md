---
id: "fund.layers-resolution-accuracy"
title: "Camadas, resolução e precisão"
summary: "Separa layer height, resolução aparente, precisão dimensional, repetibilidade e acurácia de posicionamento. Explica o que a altura de camada controla (e o que não controla) em FFF e como comparar métricas entre tecnologias sem falsa equivalência."
doc_type: "concept"
domain: ["fundamentals", "quality"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "quality-discussion"]
not_for: ["certified-metrology-procedures", "universal-tolerance-tables"]
materials: []
printers: []
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.ellis-print-tuning-guide", "source.teaching-tech-calibration"]
related: ["fund.digital-workflow", "fund.anisotropy", "hub.qualidade"]
prerequisites: ["fund.terminology"]
aliases_pt_br: ["resolução de impressão", "altura de camada", "precisão dimensional"]
aliases_en: ["layer height", "print resolution", "dimensional accuracy"]
tags: ["fundamentals", "layers", "metrology", "fff"]
supersedes: []
---

# Camadas, resolução e precisão

Hub pai: [Fundamentos](INDEX.md)

## O que é

Em manufatura aditiva, **camada** é a fatia discreta de construção. **Resolução**, **precisão** e **acurácia** são conceitos relacionados mas distintos. Confundi-los leva a settings absurdos (“layer 0,05 mm resolve encaixe”) ou a comparações injustas entre FFF e vat photopolymerization.

Esta página é **conceitual e orientada a decisão**. Não publica tabela universal de tolerâncias: tolerância depende de máquina, material, geometria, orientação, calibração e metrologia.

## Definições operacionais

| Conceito | Significado prático |
|---|---|
| **Layer height** | Espessura nominal de cada fatia no eixo de construção (Z em FFF típico) |
| **Resolução aparente** | Quanto detalhe o olho/slicer “vê” — fortemente influenciada por layer, linha e orientação |
| **Acurácia (accuracy)** | Quão perto a peça fica da dimensão alvo |
| **Precisão / repetibilidade** | Quão estáveis são peças sucessivas nas mesmas condições |
| **Resolução de malha** | Densidade de triângulos do STL/3MF — independente do layer height |
| **XY feature size** | Limitado por nozzle/largura de linha (FFF) ou spot/pixel (outras tech) |

## O que layer height controla (FFF)

**Controla bem:**

- Escada em superfícies inclinadas (staircase)
- Tempo de impressão (mais camadas → mais tempo, tudo o mais igual)
- Alguns overhangs e detalhes em Z
- Visibilidade de linhas em faces curvas

**Não controla sozinho:**

- Diâmetro de furos horizontais (contração, elephant foot, expansão)
- Resistência Z (mais ligada a bonding, temp, cooling, largura — ver [anisotropia](anisotropia-e-tensoes-residuais.md))
- Warping
- Acurácia XY absoluta

Regra de decisão: reduzir layer height para **cosmético Z** ou features pequenas em altura; para **encaixe crítico**, priorizar orientação, folgas no CAD, first layer e calibração — não só “mais fino”.

## Relação com diâmetro de nozzle

Em FFF, a **largura de extrusão** e o **diâmetro do nozzle** limitam o menor feature confiável em XY. Layer height tipicamente fica em fração do diâmetro do nozzle (heurística de processo — validar no perfil da máquina). Página de hardware: [nozzle 0,4 mm](../04-componentes-e-hardware/nozzle-0-4-mm-fff.md).

Layer muito baixo com nozzle largo pode ser válido cosméticamente, mas o ganho em XY é limitado: você ainda desenha com um “pincel” largo.

## Precisão dimensional: fontes de erro (FFF)

Ordem típica de investigação (não é ranking universal):

1. **Primeira camada** — esmagamento (elephant foot), Z offset, bed temp
2. **Fluxo / largura de linha** — over/under-extrusion
3. **Contração do polímero** e temperatura de peça
4. **Folga mecânica**, belts, skew
5. **Umidade do filamento** (dimensão e superfície)
6. **Orientação** — elipses em furos horizontais vs verticais

Guias de calibração citados nesta base: [Teaching Tech](../22-fontes/teaching-tech-calibration.md), [Ellis](../22-fontes/ellis-print-tuning-guide.md) — usar como método, não como número mágico.

## Comparar tecnologias sem falsa equivalência

| Afirmação de marketing | Leitura correta |
|---|---|
| “Resina 50 µm” | Frequentemente layer Z ou pixel XY — verificar eixo |
| “FFF 0,1 mm” | Layer height; XY ainda ~nozzle |
| “Metal ±0,1 mm” | Pode ser pós-sinter / usinagem; ler escopo do datasheet |
| “Mesma resolução” | Processos diferentes têm limites físicos diferentes |

Vat photopolymerization pode vencer em detalhe fino; FFF pode vencer em custo e materiais robustos de uso diário — a métrica certa depende da função da peça.

## Decisão rápida

| Objetivo | Alavanca preferencial |
|---|---|
| Menos linhas visíveis em curva | Layer menor **e/ou** orientação + pós |
| Furo vertical com encaixe | Folga CAD + paredes + validar diametro impresso |
| Face superior lisa | Ironing/perfil (se existir) + layer; não milagre |
| Peça estrutural | Orientação de carga + paredes; layer fino secundário |
| Tempo curto | Layer maior, infill racional, menos suporte |

## Metrologia mínima útil

- Medir no eixo e na feature que importam (não só o cubo de calibração)
- Registrar material, cor, umidade, perfil, orientação
- Separar erro sistemático (sempre +0,2 mm) de ruído
- Hub futuro: [11-qualidade](../11-qualidade-e-metrologia/INDEX.md)

## Relações

- related → [workflow digital](workflow-digital-cad-ate-peca.md), [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md)
- constrains → expectativas de DfAM e specs de peça

## Fontes

- [source.ellis-print-tuning-guide](../22-fontes/ellis-print-tuning-guide.md)
- [source.teaching-tech-calibration](../22-fontes/teaching-tech-calibration.md)

## Lacunas

- Protocolo de cupom dimensional canônico do projeto
- Tabela contextual A1 Mini + PLA/PETG (só após medições registradas)
- Comparativo formal FFF vs MSLA em features de referência
