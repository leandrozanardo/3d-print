---
id: firmware.gcode-basics
title: G-code — fundamentos
summary: G-code é a linguagem de comandos de movimento e periféricos enviada do slicer
  (ou host) ao firmware da impressora. Em FFF, linhas típicas incluem G0/G1 (movimento),
  temperaturas (M104/M109, M140/M190), extrusão E, unidades e modos de posicionamento.
  Dialetos variam (Marlin, Klipper via macros, firmwares OEM). Esta página ensina
  conceitos seguros — não incentiva editar G-code de máquinas fechadas sem documentação,
  nem inventar comandos proprietários Bambu.
doc_type: guide
domain:
- firmware
- software
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- gcode
not_for:
- invented-oem-opcodes
- bypass-safety-interlocks
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources: []
related:
- firmware.klipper-marlin-concepts
- hub.software
- tech.fff
prerequisites: []
supersedes: []
aliases_pt_br:
- fundamentos de G-code
- código G
aliases_en:
- G-code basics
- CNC G-code for FFF
tags:
- gcode
- firmware
- fff
---
# G-code — fundamentos

Hub pai: [Software, firmware e automação](./INDEX.md)

## O que é

**G-code** (família RS-274 e extensões) descreve trajetórias e ações: mover eixos, aquecer, extrudar, esperar. O slicer gera o arquivo; o firmware interpreta.

## Anatomia de uma linha (exemplo didático)

```text
G1 X10 Y20 Z0.2 E0.05 F1800
```

| Token | Papel típico |
|---|---|
| `G1` | movimento interpolado |
| `X Y Z` | posição |
| `E` | eixo extrusor (comprimento ou volume conforme modo) |
| `F` | feedrate |

Comandos `M` controlam máquinas (temperaturas, ventiladores, etc.). **Números exatos e disponibilidade dependem do firmware** — consulte a referência do dialeto em uso.

## Conceitos que importam

1. **Absolut vs relativo** (`G90`/`G91`, `M82`/`M83`) — erro aqui gera over/under-extrusion catastrófico
2. **Unidades** — mm é padrão em FFF consumer
3. **Aquecimento bloqueante vs não bloqueante** — esperar setpoint evita movimento a frio
4. **Homings e limites** — colisão se mal usados
5. **Macros / start-end G-code** — ponto comum de customização e de bugs

## Segurança

- Não remova checagens térmicas / interlocks
- Não envie movimentos manuais sem saber workspace
- Em OEMs fechados, prefira UI oficial a patches de G-code não documentados
- Legado ebook `docs/ebook/09-gcode.md` existe sob CC BY-SA — **não copiado** aqui; use como leitura auxiliar com atribuição se derivar

## Relação com Klipper/Marlin

Ver [Klipper vs Marlin (conceitos)](klipper-vs-marlin-conceitos.md): Klipper frequentemente usa G-code + macros host; Marlin interpreta muitos M-codes no MCU.

## Fontes

Referências oficiais Marlin/Klipper docs quando for citar opcode específico (ainda não pinadas como páginas `source.*` individuais além desta orientação).

## Lacunas

- Tabela completa de opcodes: fora de escopo
- Dialeto Bambu/proprietary: **não inventado** nesta base
- Start G-code A1 Mini pinado por versão: pendente
