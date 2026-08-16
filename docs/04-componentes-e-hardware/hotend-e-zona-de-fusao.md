---
id: "component.hotend"
title: "Hotend e zona de fusão (FFF)"
summary: "O hotend funde o filamento numa zona de fusão controlada por heater, sensor e heat break, e expulsa o polímero pelo nozzle. Temperatura de setpoint ≠ temperatura real do melt; vazão volumétrica alta demais causa under-extrusion a quente. Na A1 Mini o hotend all-metal tem capability até 300 °C, mas materiais Not Recommended e bed 80 °C ainda limitam o processo — capability não autoriza qualquer polímero."
doc_type: "component"
domain: ["hardware", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini"]
not_for: ["temp-as-only-fix-for-all-defects", "ignore-manufacturer-material-list"]
printers: ["printer.bambu-lab-a1-mini"]
materials: ["material.pla", "material.petg"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.bambu-a1-mini-tech-specs"]
related: ["nozzle.0.4mm-fff", "component.extruder-path", "component.part-cooling", "cal.fff-order", "material.pla", "material.petg", "printer.bambu-lab-a1-mini"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["hotend", "zona de fusão", "hotend all-metal"]
aliases_en: ["hotend", "melt zone", "heat break", "all-metal hotend"]
tags: ["hotend", "fff", "temperature"]
---

# Hotend e zona de fusão (FFF)

Hub pai: [Componentes e hardware](INDEX.md)

## O que é

O **hotend** é o conjunto heater block + sensor + heat break/heatsink + caminho até o [nozzle](nozzle-0-4-mm-fff.md). A **zona de fusão** (*melt zone*) é o trecho onde o sólido vira melt viscoso pronto para extrusão.

Na [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md): hotend all-metal, max hotend temp oficial **300 °C**, nozzle incluso 0,4 mm ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)).

## Quando importa

- Escolher temperatura no range do filamento ([PLA](../05-materiais/fff/pla.md) / [PETG](../05-materiais/fff/petg.md))
- Under-extrusion em velocidade alta (limite volumétrico)
- Clog, heat creep, stringing
- Troca de nozzle / manutenção

## Mecanismo (decisões)

1. **Setpoint vs realidade:** o termistor mede um ponto; o melt pode estar mais frio sob alta vazão → sobe temp **dentro do range do material**, não até o teto de 300 °C por hábito.
2. **Heat break:** isola o cold side; falha de cooling do heatsink → heat creep → clog em PLA.
3. **All-metal:** permite temps altas; exige atenção a creep e a materiais abrasivos (vários CF/GF: Not Recommended pelo fabricante na A1 Mini).
4. **Depende do** [caminho de extrusão](extrusao-direct-drive-vs-bowden.md): pressão de entrada vem do extrusor.

## Capabilities vs processo (A1 Mini)

| Spec | Uso correto |
|---|---|
| Max 300 °C | Teto de hardware; **não** receita |
| Ideal PLA/PETG/TPU/PVA | Janela operacional suportada |
| Not Recommended ABS/ASA/PC/PA… | Não “habilitar” só porque o hotend aguenta |
| Bed max 80 °C | Limita polímeros que pedem mesa mais quente |

## Sinais de falha

| Sintoma | Hipóteses no hotend |
|---|---|
| Extrusão irregular a quente | Temp baixa para vazão; clog parcial; sensor |
| Filamento amolece acima do break | Heat creep / fan do heatsink |
| Estalos / bolhas | Umidade do filamento (não só temp) |
| Nada sai, motor pula | Clog / nozzle frio / grind |

## O que fazer

1. Temperatura: torre/cupom no **range do TDS/preset**; validar na impressora — ver [ordem de calibração](../09-calibracao/ordem-de-calibracao-fff.md).
2. Separar **part cooling** (peça) de **heatsink fan** (cold side) — ver [cooling de peça](cooling-de-peca-fff.md).
3. Após clog: procedimento do fabricante; não “fogo livre” com chama.
4. Troca de nozzle: perfil e PID/assistências conforme ecossistema.

## Segurança

- Queimadura grave no block/nozzle.
- Nunca tocar para “testar se está quente”.
- Fumaça anômala / cheiro de elétrico: desligar e investigar — hub de segurança ainda parcial.

## Relações

- contains → nozzle, melt zone
- fed-by → extruder path
- couples-with → part cooling (qualidade de overhang ≠ temp só)

## Fontes

- [source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md)

## Lacunas

- Diagrama térmico do hotend A1 Mini
- Medição de max volumetric flow do projeto
- Átomo PID / thermistor fault
