---
id: "firmware.bed-mesh-z-offset"
title: "Bed mesh e Z-offset (conceitos)"
summary: "Bed mesh (malha de nivelamento) compensa desvios de planicidade da mesa ao longo de XY; Z-offset (ou equivalente) ajusta a distância nozzle↔superfície na first layer. São ferramentas complementares, não substitutas de mesa danificada, sujeira ou homing falho. Conceitos gerais FFF; em A1 Mini preferir o fluxo oficial do fabricante — sem inventar códigos proprietários."
doc_type: "concept"
domain: ["firmware", "calibration", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "first-layer", "printer.bambu-lab-a1-mini"]
not_for: ["invented-oem-mesh-opcodes", "replace-damaged-bed-with-mesh-only"]
printers: ["printer.bambu-lab-a1-mini"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.teaching-tech-calibration", "source.ellis-print-tuning-guide"]
related: ["process.fff.first-layer", "fund.wetting-first-layer", "hw.pei-sheet-fff", "firmware.gcode-basics", "hub.software"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["malha da mesa", "bed leveling mesh", "z-offset"]
aliases_en: ["bed mesh", "Z offset", "ABL mesh"]
tags: ["firmware", "calibration", "bed-mesh", "z-offset", "fff"]
---

# Bed mesh e Z-offset (conceitos)

Hub pai: [Software, firmware e automação](./INDEX.md)

## O que é

**Bed mesh** — mapa de alturas (ou desvios) da build surface amostrado em uma grade XY. Durante a impressão, o firmware interpola correções de Z para manter a first layer mais uniforme apesar de leve empenamento/inclinação da mesa.

**Z-offset** (nome varia: baby-stepping, live Z, “nozzle offset”) — deslocamento global que aproxima ou afasta o nozzle da superfície **depois** do homing/probe. Ajusta o “squish” médio.

Mesh corrige **variação espacial**; offset corrige **bias global**. Confundi-los gera over-squish num canto e under-squish noutro.

## Quando cada um importa

| Situação | Tendência |
|---|---|
| First layer boa no centro, ruim nas bordas | Mesh / planicidade / placa |
| First layer igualmente alta/baixa em toda a área | Offset / homing / probe bias |
| Uma zona sempre falha | Embasamento local, sujeira, placa torta, clip |
| Muda após trocar placa ou remover PEI | Refazer referência do fabricante |

Fundamento de adesão: [molhabilidade](../01-fundamentos/adesao-molhabilidade-primeira-camada.md). Processo: [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md).

## Limites do mesh

- Não conserta mesa quebrada, PEI bolha, clip deformando a placa
- Não substitui limpeza
- Mesh antiga após manutenção mecânica pode piorar o resultado
- Grade grosseira demais não captura “vale” local sob a peça

## Relação com probe / homing

Sistemas com auto-level usam sensor (indutivo, strain, toque, etc.) para amostrar pontos. Erros de probe (sujeira no bico, temperatura inconsistente, cabo) contaminam a malha. Sempre valide com **inspeção visual da first layer**, não só com “mesh OK” no display.

## Ecossistemas

| Ecossistema | Nota editorial |
|---|---|
| Marlin / Klipper (aberto) | Comandos e fluxos documentados publicamente; nomes (`G29`, `BED_MESH_CALIBRATE`, etc.) dependem da config |
| Bambu Lab A1 Mini | Possui **nivelamento / compensação de mesa e ajustes de first layer na experiência oficial**. Esta página **não inventa** sequência de botões, G-code interno nem valores numéricos proprietários |

Siga o manual e a UI da sua versão de firmware/slicer.

## Ordem prática segura (heurística)

1. Placa limpa e bem assentada — [PEI](../04-componentes-e-hardware/placa-pei-fff.md)
2. Homing / calibração recomendada pelo fabricante
3. Avaliar first layer (cupom de base)
4. Ajustar offset/equivalente se o bias for global
5. Só então desconfiar de mesh desatualizada ou hardware
6. Evitar empilhar glue + offset extremo + mesh antiga

## Segurança

- Não comandar Z negativo agressivo “no escuro” — risco de crash nozzle↔mesa
- Em OEM fechado, prefira UI oficial a scripts de fórum

## Fontes

- [source.teaching-tech-calibration](../22-fontes/teaching-tech-calibration.md)
- [source.ellis-print-tuning-guide](../22-fontes/ellis-print-tuning-guide.md)

## Lacunas

- Procedimento versionado A1 Mini (UI): pendente de fonte fabricante pinada
- Tolerâncias numéricas de mesh “aceitáveis”: não inventadas aqui
