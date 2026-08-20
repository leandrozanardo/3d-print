---
id: defect.fff.spaghetti
title: Spaghetti (FFF)
summary: 'Spaghetti é o novelo de filamento no ar quando o nozzle continua o G-code
  após a peça descolar, um overhang colapsar ou o bico derrubar o modelo. Divida
  first-layer vs mid-print (warping, colapso de suporte, raspagem / Z hop). Na A1 Mini
  + Bambu Studio: limpar PEI, tipo de placa, Auto Bed Leveling, first layer ≤ 30 mm/s,
  brim 5–8 mm, suportes se overhang > 45°, Z hop type Normal.'
doc_type: troubleshooting
domain:
- fff
- quality
- troubleshooting
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- printer.bambu-lab-a1-mini
- slicer.bambu-studio
- material.pla
- material.petg
not_for:
- stringing-hairs-only
- resin-vat-failures
materials:
- material.pla
- material.petg
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
knowledge_status: draft
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-08-19'
review_cycle: 6-months
sources:
- source.bambu-wiki-spaghetti
- source.ellis-print-tuning-guide
related:
- defect.fff.adhesion-failure
- defect.fff.warping
- process.fff.first-layer
- setting.supports
- setting.brim-raft-skirt
- setting.speeds
- troubleshoot.fff-symptom-index
prerequisites:
- process.fff.first-layer
supersedes: []
aliases_pt_br:
- spaghetti
- macarrão
- novelo de filamento
- impressão no ar
aliases_en:
- spaghetti
- air printing
- nested filament mess
tags:
- spaghetti
- troubleshooting
- fff
symptom_tags:
- spaghetti-early
- spaghetti-mid-print
- air-print
cause_tags:
- dirty-pei
- missing-support
- z-hop
- unstable-footprint
setting_tags:
- first-layer-speed
- brim
- supports
- z-hop
---
# Spaghetti (FFF)

Hub pai: [Problemas e diagnóstico FFF](INDEX.md)

Números operacionais (30 mm/s, 60 mm/s, 5–8 mm, 45°) vêm da wiki oficial Bambu Lab; ver `sources`.

## Resumo de emergência

O nozzle está despejando filamento no ar e formando um novelo? **Pare o job** se o bico estiver batendo na peça solta (risco de blob no hotend). Separe o momento:

- Camadas 1–3 → [falha de adesão](falha-adesao-primeira-camada.md)
- Depois de alguma altura, cantos levantam → [empenamento](empenamento.md)
- Overhang/suporte caiu → esta página, ramo de suporte
- Estalo (“clunk”) e a peça tombou → Z hop / estabilidade

Várias peças na mesma placa e só algumas viraram spaghetti: use **Skip Objects** no ecossistema Bambu em vez de cancelar o job inteiro.

## Assinatura

- Visual: fios emaranhados no volume de impressão; peça incompleta ou ausente
- Momento: início (first-layer) **ou** após certa altura (mid-print)
- Áudio: possível impacto do nozzle (“clunk”) no ramo de raspagem

## Diferenciar

| Observação | Página |
|---|---|
| Cordão da 1ª camada não gruda / peel imediato | [Falha de adesão](falha-adesao-primeira-camada.md) |
| Base OK, cantos sobem depois e o nozzle derruba | [Empenamento](empenamento.md) + ramo warping abaixo |
| Fios finos entre torres, peça ainda no lugar | [Stringing](stringing.md) (não é spaghetti) |
| Overhang caiu / suporte insuficiente | Esta página — colapso de suporte |
| Degrau XY permanente | [Layer shift](layer-shift.md) |

## Riscos e parada

- Filamento no nozzle → blob e dano ao hotend/bed
- Peça solta sendo empurrada: interrompa
- Mesa/nozzle quentes: queimadura

## Facts a coletar

1. O spaghetti começou na 1ª camada ou depois de altura visível?
2. Placa (smooth vs textured) vs tipo selecionado no Bambu Studio
3. Última limpeza da PEI e se os dedos tocaram a face
4. Auto Bed Leveling recente; detritos no verso da placa
5. Filamento seco? (vapor no nozzle piora adesão e extrusão)
6. Preview: overhang > 45° sem suporte?
7. Z hop type atual (Printer → Extruder)
8. Área de contato da 1ª camada / brim

## Cause matrix (Bambu Wiki + proxies do motor)

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta (início) | PEI suja / gordura | Molhabilidade falha; causa mais comum de first-layer spaghetti |
| Alta (início) | Tipo de placa errado no slicer | Preset de adesão não bate com a superfície real |
| Alta (início) | Leveling / Z irregular | Gap desigual; cordão não ancora |
| Alta (início) | First layer rápida demais | Tempo de contato insuficiente; alvo OEM ≤ 30 mm/s |
| Alta (meio) | Warp → nozzle derruba | Contração; comum em ABS/ASA/PC/PA |
| Alta (meio) | Overhang sem suporte / cooling fraco | Colapso e cadeia de falha |
| Alta (meio) | Z hop insuficiente | Nozzle raspa a peça em travels |
| Média | Filamento úmido | Extrusão irregular na 1ª camada |
| Média | Centro de gravidade / base pequena | Mesmo contato “normal” do nozzle tomba a peça |

O motor (`assessSpaghettiRisk`) só vê geometria após orientação: contato pequeno, overhang ≥ 45°, instabilidade. **Não** vê sujeira da placa nem umidade.

## Árvore de decisão

```text
Quando o novelo começou?
  ├─ Camadas 1–3
  │    → limpar PEI (água morna + detergente; esponja sem gordura; não tocar a face)
  │    → tipo de placa no slicer = placa física
  │    → Calibration → Print Calibration → Auto Bed Leveling
  │    → secar filamento
  │    → initial layer ≤ 30 mm/s; infill da 1ª camada ≤ 60 mm/s
  └─ Depois de altura
       ├─ Cantos levantaram? → brim 5–8 mm + defect.fff.warping
       ├─ Overhang/suporte caiu?
       │    → Enable support se ângulo > 45°
       │    → Process → Speed → Slow down for overhangs
       │    → ↓ Support e Support interface
       │    → Type Normal (auto) se interface ruim; tree se orgânico
       └─ Ouviu clunk / peça tombou?
            → Printer → Extruder → Z hop type = Normal
            → brim Outer brim only 5–8 mm (mais largo se a base for menor)
            → Paint-on Supports em galhos / hastes
```

## Testes (barato → caro)

1. Abortar cedo e fotografar a 1ª camada
2. Lavar a placa; repetir só a first layer
3. Auto Bed Leveling; inspecionar o verso da placa
4. Preview de suporte em overhangs > 45°
5. Brim 5–8 mm (validar gap no preview)
6. Z hop type Normal (uma variável)
7. Reduzir overhang/support speed

## Correção por causa (uma variável por teste)

| Causa | Correção |
|---|---|
| Sujeira / gordura | Limpeza; reteste |
| Tipo de placa | Match exato no Studio |
| Leveling | Auto Bed Leveling; leveling manual do modelo se persistir |
| Velocidade 1ª camada | ≤ 30 mm/s (OEM) |
| Umidade | Secar; armazenar com dessecante |
| Warp | Brim + [empenamento](empenamento.md) |
| Overhang | Suportes + slow down |
| Raspagem | Z hop Normal + brim / paint-on |

## Validação

- First layer completa sem peel
- Overhangs no preview com suporte ou ângulo seguro
- Travels sem raspar a peça (Z hop)
- Job termina sem novelo; se multi-objeto, Skip Objects nas falhas isoladas

## Prevenção

- Limpeza regular da PEI pelas bordas
- Preset da impressora real (A1 Mini, não outro modelo embutido no 3MF)
- Revisar preview de suporte em figuras orgânicas
- Brim quando a base for pequena ou o CoG for alto

## Fontes

- [source.bambu-wiki-spaghetti](../../22-fontes/bambu-wiki-spaghetti.md) — procedimentos e números OEM
- [source.ellis-print-tuning-guide](../../22-fontes/ellis-print-tuning-guide.md) — método de uma variável

## Lacunas

- Paths de UI pinados a uma versão exata do Bambu Studio
- Cupom local first-layer vs mid-print no A1 Mini
- O motor não observa placa suja, tipo de placa nem umidade
