---
id: "setting.retraction"
title: "Retração (retraction)"
summary: "Retração puxa o filamento para reduzir pressão no nozzle em travels e cortar stringing. Em extrusores direct drive (A1 Mini) os comprimentos são curtos; copiar valores Bowden causa grind e jam. Conceito primeiro; no Bambu Studio: Retraction length/speed e opções de Z-hop/wipe (UI muda). Seque o filamento antes de torres — umidade mascara retract. TPU: retração mínima."
doc_type: "setting"
domain: ["slicing", "fff", "quality"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "slicer.bambu-studio", "printer.bambu-lab-a1-mini", "direct-drive"]
not_for: ["bowden-lengths-on-direct-drive", "retract-before-drying", "eternal-ui-path-pinning"]
settings: ["setting.retraction"]
slicers: ["slicer.bambu-studio"]
printers: ["printer.bambu-lab-a1-mini"]
materials: ["material.pla", "material.petg", "material.tpu"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide", "source.teaching-tech-calibration", "source.bambu-a1-mini-tech-specs"]
related: ["defect.fff.stringing", "material.drying-storage", "material.tpu", "setting.temperatures", "setting.speeds"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["retração", "retracão", "retract"]
aliases_en: ["retraction", "retract length", "retract speed", "Z-hop"]
tags: ["setting", "retraction", "stringing"]
---

# Retração (retraction)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

**Retraction** = recuo controlado do filamento para aliviar pressão no melt zone durante travels, reduzindo fio ([stringing](../../12-problemas-e-diagnostico/fff/stringing.md)). Parâmetros típicos: comprimento, velocidade, z-hop, wipe/coast (nomes variam).

## Nomes no Bambu Studio (notas)

Busque **Retraction length**, **Retraction speed**, **Z-hop**, wipe. Campos podem estar no filamento e/ou processo conforme versão — use busca; não pinne path eterno.

## Unidade / tipo

mm (length), mm/s (speed), bool/mm (Z-hop).

## Mecanismo

Direct drive: pouco filamento elástico entre engrenagem e nozzle → **comprimentos curtos** bastam. Bowden: comprimentos longos (vários mm) — **não copiar** para A1 Mini. Excess retract → air gap, click, [subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md) em TPU.

## Dependências

- [Secagem](../../05-materiais/fff/secagem-e-armazenamento.md) **antes**
- [Temperatura](temperaturas.md) (quente demais → ooze)
- Travel / combing
- Material ([TPU](../../05-materiais/fff/tpu.md): mínima)

## Faixas de partida (direct drive — validar)

Heurística metodológica (Ellis / Teaching Tech / preset Bambu): valores abaixo são **ponto de partida**, não metrologia.

| Material | Length (ordem) | Notas |
|---|---|---|
| PLA | ~0,4–1,2 mm | Partir do preset Bambu |
| PETG | ~0,6–1,4 mm | Só após secar |
| TPU | mínima / quase off | Evitar jam |

Ajuste ±0,1–0,2 mm por torre (heurística) — não saltos grandes.

## Efeitos

| ↑ retract | ↓ retract |
|---|---|
| Menos string até certo ponto; depois scars/gaps | Mais ooze/hairs |
| Risco de grind se exagerado | —

Z-hop: pode **aumentar** strings em alguns setups — teste on/off.

## Ordem de ataque (resumo)

1. Secar  
2. −5 °C se hairs (dentro do range)  
3. Torre de retract a partir do preset  
4. Combing / evitar travel em pele  
5. Z-hop por último  

Detalhe diagnóstico: [stringing](../../12-problemas-e-diagnostico/fff/stringing.md).

## Relações com outros conceitos

- mitigates → stringing
- worsened-by → moisture, high temp
- conflicts-with → long Bowden values on DD
- special-case → TPU

## Veja também

- [Stringing](../../12-problemas-e-diagnostico/fff/stringing.md)
- [Velocidades](velocidades.md)
- Legado: [stringing-e-retract.md](../../projeto/qualidade-e-acabamento/stringing-e-retract.md)

## Fontes

- Arquitetura direct drive vs Bowden (princípio)
- Presets A1 Mini / legado operacional
- Metodologia de torre (Ellis / Teaching Tech)

## Lacunas

- Valores medidos por SKU Bambu neste lab
- Interação AMS Lite wipe/flush vs retract
