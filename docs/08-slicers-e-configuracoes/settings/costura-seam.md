---
id: "setting.seam"
title: "Costura (seam)"
summary: "A costura (seam/Z-seam) é o ponto onde o perímetro de uma camada inicia/termina — aparece como linha ou ponto vertical se alinhada. Conceito: posicionamento (aligned, rear, nearest, random, painted) e trade-off entre cicatriz previsível vs distribuída. No Bambu Studio: Seam position / scarfing options conforme versão. Não é defeito de extrusão por si; interage com retract, wipe, PA e geometria. Escolha alinhada em face oculta para peças cosméticas."
doc_type: "setting"
domain: ["slicing", "fff", "quality"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "slicer.bambu-studio"]
not_for: ["calling-seam-under-extrusion", "eternal-ui-path-pinning"]
settings: ["setting.seam"]
slicers: ["slicer.bambu-studio"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide", "source.teaching-tech-calibration"]
related: ["setting.retraction", "setting.flow-pressure-advance", "setting.walls-shells", "setting.speeds", "defect.fff.stringing", "hub.slicers.settings"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["costura", "z-seam", "linha de costura", "seam painting"]
aliases_en: ["seam", "Z-seam", "seam position", "scarf seam"]
tags: ["setting", "seam", "cosmetics", "fff"]
---

# Costura (seam)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

**Seam** = junção de início/fim de loop de perímetro por camada. Se o slicer **alinha** esses pontos no mesmo lugar XY ao longo de Z, forma-se uma **linha** visível; se **randomiza** ou pinta, a cicatriz se espalha.

## Nomes no Bambu Studio (notas)

Busque **Seam**, **Seam position**, opções de scarf/wipe relacionadas. UI muda — conceito > path.

## Unidade / tipo

Enum de estratégia (aligned/rear/nearest/random/painted), às vezes ângulo ou face preferida; booleans de scarf.

## Mecanismo

Em cada layer change/perímetro: extrusão liga/desliga ou muda path → pequeno excesso/falta de material e/ou marca de wipe. PA e retract influenciam o **tamanho** da marca; a **estratégia de seam** controla **onde** ela aparece.

## Dependências

- [Flow / PA](flow-e-pressure-advance.md) — cantos e pressão na junção
- [Retração](retracao.md) / wipe — strings saindo da seam
- [Paredes](paredes-e-cascas.md) — mais paredes ≠ esconder seam magicamente
- Geometria: cantos vivos escondem melhor que cilindros lisos

## Decisão de posicionamento

| Estratégia | Use quando | Evite quando |
|---|---|---|
| **Aligned / rear** | Quer uma linha previsível em face oculta | Cilindro cosmético 360° |
| **Nearest** | Otimizar travels | Precisa controle estético fino |
| **Random** | Distribuir marcas em peças técnicas | Inspeção visual exige face limpa definida |
| **Painted** | Controle artístico/mecânico por face | Sem tempo de preparar painting |

## Heurísticas

1. Identifique a face que ninguém vê → force seam ali  
2. Em vasos/cilindros: random ou scarf (se disponível) + aceitar trade-off  
3. Se a seam “blob”: calibre PA/flow antes de culpar só o seam mode  
4. Não confunda seam com [layer shift](../../12-problemas-e-diagnostico/fff/layer-shift.md) nem com gap de subextrusão  

## Efeitos

| Alinhar | Randomizar |
|---|---|
| Uma linha; fácil de lixar/orientar | Marcas espalhadas; sem “coluna” |
| Ruim se cair em face hero | Pode parecer “áspero” sob luz rasante |

## Ordem de ataque (estética)

1. Orientar peça (seam candidate face down/back)  
2. Escolher posição aligned/rear/paint  
3. Ajustar wipe/retract se hairs na junção  
4. PA se blob/gap no ponto  
5. Pós: lixamento local se necessário ([acabamento](../../14-pos-processamento/lixamento-e-acabamento.md))  

## Relações com outros conceitos

- places → cosmetic scar
- worsened-by → over-extrusion, PA ruim
- mitigated-by → hidden face, paint, scarf
- not-the-same-as → stringing global, elephant foot

## Veja também

- [Retração](retracao.md)
- [Flow e pressure advance](flow-e-pressure-advance.md)
- [Stringing](../../12-problemas-e-diagnostico/fff/stringing.md)

## Fontes

- [source.ellis-print-tuning-guide](../../22-fontes/ellis-print-tuning-guide.md) (leitura de artefatos de superfície)
- [source.teaching-tech-calibration](../../22-fontes/teaching-tech-calibration.md)

## Lacunas

- Scarf seam: detalhe por versão do Studio
- Cupom fotográfico de aligned vs random no lab
