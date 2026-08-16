---
id: firmware.input-shaping-resonance
title: Input shaping e ressonância (conceitos)
summary: 'Input shaping / compensação de vibração reduz ringing (ghosting) ao filtrar
  comandos de aceleração perto das frequências naturais da máquina. Conceito compartilhado
  por firmwares abertos (ex.: Klipper) e por recursos de fabricante em impressoras
  consumer. Esta página explica mecanismo, sintomas e limites — sem inventar procedimentos
  ou parâmetros proprietários da Bambu Lab / A1 Mini.'
doc_type: concept
domain:
- firmware
- motion
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- motion-systems
- printer.bambu-lab-a1-mini
not_for:
- invented-bambu-calibration-steps
- bypass-mechanical-faults-with-filters
printers:
- printer.bambu-lab-a1-mini
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources: []
related:
- firmware.klipper-marlin-concepts
- firmware.gcode-basics
- kinematics.bed-slinger
- defect.fff.layer-shift
- hub.software
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- input shaping
- compensação de vibração
- ringing ghosting
aliases_en:
- input shaping
- resonance compensation
- ringing suppression
tags:
- firmware
- motion
- resonance
- fff
---
# Input shaping e ressonância (conceitos)

Hub pai: [Software, firmware e automação](./INDEX.md)

## O que é

**Ressonância** mecânica: a estrutura da impressora (eixos, mesa, belts, frame) oscila quando excitada por acelerações do toolhead/mesa.

**Input shaping** (e nomes comerciais equivalentes de “vibration compensation”) é uma família de técnicas de controle que **modificam o perfil de aceleração/comando** para reduzir a excitação dessas frequências, atenuando **ringing/ghosting** nas paredes.

Não é magia: não conserta belt frouxa, parafuso solto, mesa folgada nem colisão.

## Sintomas tipicamente associados

| Sintoma | Nota |
|---|---|
| Ecos / ondas após cantos e letras | Ringing clássico |
| Artefatos que mudam com velocidade/aceleração | Sugere dinâmica, não só flow |
| Vibração audível em movimentos rápidos | Pode ser mecânica + ressonância |

Sempre separar de: over-extrusion cosmético, Z-banding por mecânica Z, underextrusion, e [layer shift](../12-problemas-e-diagnostico/fff/layer-shift.md) (perda de passos / mecânica).

## Ideia do mecanismo (alto nível)

1. Identificar (medir ou estimar) frequências dominantes do sistema
2. Aplicar filtro/shaper aos setpoints de movimento
3. Validar em cupom de cantos/letras em velocidades representativas

Detalhes de algoritmo (ZV, MZV, EI, etc.) variam por implementação — consulte a documentação do **firmware/ecossistema em uso**.

## Firmwares abertos vs OEM

| Contexto | O que esta base pode dizer |
|---|---|
| Klipper (típico) | Possui fluxo documentado de medição + shapers; ver docs oficiais Klipper — conceitos em [Klipper vs Marlin](klipper-vs-marlin-conceitos.md) |
| Marlin | Capacidades e nomes diferem por versão/config; não assumir paridade |
| Bambu Lab / A1 Mini | O fabricante oferece **recursos de calibração/compensação de vibração na UI/firmware oficiais**. Esta wiki **não inventa** passos, G-codes internos, frequências-alvo nem “valores ideais” proprietários |

Para A1 Mini: use o fluxo e a documentação do fabricante / Bambu Studio. Se o recurso existir na sua versão de firmware, trate-o como **caixa do fabricante**, não como tutorial Klipper colado.

## Limites e trade-offs

- Shaper agressivo demais pode arredondar cantos ou limitar aceleração efetiva
- Mudança mecânica (trocar mesa, adicionar peso, folga) **invalida** calibração anterior
- Bed-slinger: massa da mesa participa da dinâmica — [cinemática](../03-maquinas-e-arquiteturas/cinematica-bed-slinger.md)
- Qualidade ainda depende de velocidade, jerk/accel policies do slicer e rigidez real

## Ordem de diagnóstico sugerida

1. Apertos, belts, path livre, rodas/trilhos conforme manual
2. Cupom em velocidade moderada vs alta
3. Só então compensação de vibração do ecossistema
4. Não use shaping para “esconder” crash / shift

Disciplina: [correlação vs causa](../01-fundamentos/correlacao-vs-causa-troubleshooting.md).

## Segurança

- Não desative limites/interlocks para “calibrar mais forte”
- Não envie macros de terceiros não auditadas em máquinas OEM fechadas

## Lacunas

- Página operacional pinada à versão de firmware A1 Mini: pendente (fonte fabricante)
- Comparativo medido ringing com/sem compensação no projeto: aberto

## Fontes

Documentação oficial do firmware/OEM em uso. Entradas `source.*` específicas de input shaping ainda não pinadas nesta base — não inventar.
