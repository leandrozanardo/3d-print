---
id: "firmware.klipper-marlin-concepts"
title: "Klipper vs Marlin — conceitos"
summary: "Marlin e Klipper são stacks de firmware/controle amplamente usados em impressoras FFF abertas. Marlin concentra muita lógica no MCU; Klipper desloca planejamento de trajetória para um host (PC/SBC) e usa o MCU como executor de steps em tempo real, expondo configuração em arquivos de texto e macros. Esta página compara arquitetura em alto nível para orientação — sem afirmar internals proprietários de Bambu Lab nem recomendar ‘jailbreak’."
doc_type: "guide"
domain: ["firmware", "software"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "open-firmware"]
not_for: ["bambu-proprietary-internals", "warranty-void-howto"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: []
related: ["firmware.gcode-basics", "hub.software", "printer.bambu-lab-a1-mini"]
prerequisites: ["firmware.gcode-basics"]
supersedes: []
aliases_pt_br: ["Klipper versus Marlin", "firmwares FFF abertos"]
aliases_en: ["Klipper vs Marlin", "FFF firmware concepts"]
tags: ["klipper", "marlin", "firmware"]
---

# Klipper vs Marlin — conceitos

Hub pai: [Software, firmware e automação](./INDEX.md)

## Escopo e exclusões

- Cobre **conceitos** de ecossistemas abertos Marlin e Klipper
- **Não** documenta firmware interno de impressoras Bambu Lab
- **Não** instrui a substituir firmware OEM nem contornar bloqueios

A [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md) nesta base opera no ecossistema do fabricante; use documentação oficial Bambu para operação.

## Marlin (visão)

- Firmware clássico em MCU (8-bit historicamente; 32-bit comum hoje)
- Muitos recursos via `#define` / menus / G-code
- Host (OctoPrint, etc.) opcional para fila e câmera
- Amplo suporte comunitário em kits e máquinas DIY

## Klipper (visão)

- Host calcula cinética; MCU executa steps com timing preciso
- Configuração em `printer.cfg` (e includes)
- Macros potentes; input shaper e outros recursos populares no ecossistema
- Exige SBC/PC confiável + MCU compatível

## Comparação conceitual

| Aspecto | Marlin | Klipper |
|---|---|---|
| Onde vive o “cérebro” de path | sobretudo MCU | host + MCU |
| Configuração típica | compile-time + menus | arquivos texto no host |
| Macros | limitadas vs Klipper | central |
| Recuperação de falha de host | N/A se standalone | host cai → print em risco |
| Curva DIY | conhecida | conhecida, outro modelo mental |

## G-code

Ambos consomem G-code, mas macros e M-codes diferem. Fundamentos: [gcode-fundamentos.md](gcode-fundamentos.md).

## Quando a distinção importa nesta wiki

- Diagnóstico de “firmware open” vs “OEM fechado”
- Expectativa de input shaping / pressure advance: **nome do recurso e disponibilidade dependem do stack**
- Automação remota: segurança primeiro (incêndio, home sozinho)

## Fontes

Documentação oficial Marlin e Klipper (a pinagem `source.*` dedicada pode ser adicionada em batch de manutenção). Sem URLs inventadas de forks obscuros.

## Lacunas

- Tabela de features por versão: não mantida aqui
- Integração specific boards: fora de escopo
