---
id: defect.fff.adhesion-failure
title: Falha de adesão na primeira camada (FFF)
summary: 'Falha de adesão na primeira camada é quando o cordão inicial não gruda,
  gruda aos pedaços ou solta nas camadas 1–3 — distinto de empenamento tardio. Causa-raiz
  usual: Z alto, PEI suja/errada, first layer rápida demais, bed fora do range, draft
  no frame aberto ou material inadequado à superfície. Na A1 Mini respeite bed ≤ 80
  °C, limpe PEI, valide squish e só então use brim; PETG prefere textured e remoção
  fria.'
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
- material.pla
- material.petg
not_for:
- late-corner-lift-only
- layer-shift
materials:
- material.pla
- material.petg
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- process.fff.first-layer
- defect.fff.warping
- surface.pei
- material.pla
- material.petg
- process.open-frame-env
- cal.fff-order
prerequisites:
- process.fff.first-layer
supersedes: []
aliases_pt_br:
- falha de adesão
- não gruda na mesa
- peel primeira camada
aliases_en:
- bed adhesion failure
- first layer not sticking
tags:
- adhesion
- troubleshooting
- fff
symptom_tags:
- no-stick
- peel-layer-1
- spaghetti-early
cause_tags:
- z-too-high
- dirty-pei
- cold-bed
- draft
- first-layer-too-fast
setting_tags:
- first-layer-speed
- bed-temperature
- brim
---
# Falha de adesão na primeira camada (FFF)

Hub pai: [Problemas e diagnóstico FFF](INDEX.md)

## Resumo de emergência

Peça **não gruda** ou solta nas camadas 1–3? Pare o job se o nozzle estiver “imprimindo no ar”. Limpe a [PEI](../../04-componentes-e-hardware/placa-pei-fff.md), confira Z/squish, reduza velocidade da first layer, confirme bed no range (**≤ 80 °C (fonte oficial / fabricante / heuristic; ver `sources`) ** na A1 Mini). Não trate como [empenamento](empenamento.md) até a base ter aderido de verdade.

## Assinatura

- Visual: cordões redondos que não se tocam; ilhas que descolam; spaghetti cedo; “rabisco” sem contato
- Momento: **início** do print (camada 1–3)
- Tato/remoção: peça sai inteira cedo demais ou nunca ancorou

## Diferenciar

| Observação | Página |
|---|---|
| Nao (regra de seguranca) grudou / peel imediato | **Esta página** + [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) |
| Base OK, cantos sobem depois | [Empenamento](empenamento.md) |
| Deslocamento em degrau XY | layer shift (legado; migração pendente) |
| Under-extrusion geral após camada boa | fluxo/hotend — [ordem de calibração](../../09-calibracao/ordem-de-calibracao-fff.md) |

## Riscos e parada

- Filamento acumulado no nozzle → **blob** e dano ao hotend/bed
- Peça solta sendo empurrada: **interrompa**
- Mesa/nozzle quentes: queimadura

## Facts a coletar

1. Material / marca / seco? ([PLA](../../05-materiais/fff/pla.md) / [PETG](../../05-materiais/fff/petg.md))
2. Placa smooth vs textured e última limpeza
3. Resultado das assistências de calibração / offset
4. First layer speed, bed, nozzle no [Bambu Studio](../../08-slicers-e-configuracoes/bambu-studio.md) (versão)
5. Corrente de ar / AC — [ambiente aberto](../../10-processo-de-impressao/fff/ambiente-frame-aberto.md)
6. Foto do squish das primeiras passadas

## Cause matrix (A1 Mini)

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | PEI oleosa / suja | Molhabilidade local falha |
| Alta | Z alto / pouco squish | Cordão “rola” sem ancorar |
| Alta | First layer rápida demais | Tempo de contato insuficiente |
| Alta | Draft no frame aberto | Resfria cordão/mesa localmente |
| Média | Bed frio demais para o material | Especialmente PETG perto do piso do range |
| Média | Área de contato mínima / orientação ruim | Ilhas — ver [orientação](../../06-design-para-impressao-3d/orientacao-fff.md) |
| Média (PETG) | Smooth + expectativa errada | Pode falhar **ou** soldar; textured preferida |
| Baixa-primeira | “Preciso de glue” | Só após esgotar limpeza/Z/velocidade |

Bed máximo oficial: **80 °C** ([tech specs](../../22-fontes/bambu-a1-mini-tech-specs.md)). Não invente receitas acima do cap.

## Árvore de decisão

```text
Camada 1 está grudando com squish "kiss"?
  ├─ NÃO → limpar PEI
  │         → recalibrar assistências / conferir Z
  │         → ↓ first layer speed (validar na impressora)
  │         → bed no range do material (≤80 °C)
  │         → bloquear draft
  │         → brim se área pequena
  │         → PETG? textured + filamento seco
  └─ SIM → se cantos sobem depois → defect.fff.warping
```

## Testes (barato → caro)

1. Abortar cedo e inspecionar foto da first layer
2. Lavar PEI (detergente; IPA se oleosidade — validar coating)
3. Rodar calibração/assistência do ecossistema
4. Um retângulo/disco de teste só de first layer
5. Brim (partida operacional comum 5–10 mm no legado — **validar** gap/preview)
6. Só então: ajuste fino de bed/nozzle **dentro do range**; raft como último recurso

Método geral: [Ellis](../../22-fontes/ellis-print-tuning-guide.md), [Teaching Tech](../../22-fontes/teaching-tech-calibration.md) — adaptar; não copiar números de outro firmware.

## Correção por causa (não mudar tudo junto)

| Causa | Correção |
|---|---|
| Sujeira | Limpeza; reteste |
| Z alto | Assistência / offset; squish visual |
| Velocidade | First layer mais lenta no Studio |
| Bed | Subir/descer **dentro** do range; cap 80 °C (fonte oficial/fabricante/heuristic; ver sources)  |
| Draft | Bloquear fluxo; ver ambiente aberto |
| Contato mínimo | Reorientar / brim |
| PETG em smooth | Textured; remoção fria se aderiu demais |

## Validação

- First layer completa sem peel manual leve nas bordas
- Segunda/terceira camada ancoram sem levantar
- Dimensão da base aceitável (sem elephant foot extremo) — ver página de first layer

## Prevenção

- Limpeza regular da PEI
- Preset A1 Mini + material Ideal
- Não posicionar a impressora no jato do ar-condicionado
- Seguir [ordem de calibração](../../09-calibracao/ordem-de-calibracao-fff.md) após manutenção

## Fontes

- [source.ellis-print-tuning-guide](../../22-fontes/ellis-print-tuning-guide.md)
- [source.teaching-tech-calibration](../../22-fontes/teaching-tech-calibration.md)

## Lacunas

- Matriz foto-anotada de squish bom/ruim do projeto
- Glue policy editorial (quando permitido)
- Sensor/filament odometry como fator de “falso air-print”
