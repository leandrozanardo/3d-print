---
id: setting.temperatures
title: Temperaturas (nozzle e bed)
summary: 'Temperaturas de nozzle e mesa definem viscosidade do melt, adesão à placa
  e solda entre camadas. Não existem temperaturas universais sagradas: use faixa do
  TDS/perfil do filamento como ponto de partida, torres/cupons, e respeite o teto
  da máquina (A1 Mini: bed max 80 °C nas tech specs). No Bambu Studio: Nozzle / Bed
  temperature e overrides de first layer. Subir temp não seca filamento úmido.'
doc_type: setting
domain:
- slicing
- fff
- process
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- slicer.bambu-studio
- printer.bambu-lab-a1-mini
not_for:
- universal-temp-gospel
- wet-filament-fixed-by-heat-alone
- exceed-machine-bed-cap
slicers:
- slicer.bambu-studio
printers:
- printer.bambu-lab-a1-mini
materials:
- material.pla
- material.petg
- material.tpu
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: medium
last_reviewed: '2026-08-16'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- material.pla
- material.petg
- material.drying-storage
- process.fff.first-layer
- setting.cooling
- defect.fff.stringing
- defect.fff.delamination
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- temperatura do bico
- temperatura da mesa
- nozzle temp
- bed temp
aliases_en:
- nozzle temperature
- bed temperature
- hotend temperature
tags:
- setting
- temperature
- slicer
setting_tags:
- temperatures
- bed-temperature
- nozzle-temperature
---
# Temperaturas (nozzle e bed)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

- **Nozzle / hotend temperature:** controla viscosidade e capacidade de soldar camadas / fluir em detalhes.
- **Bed / plate temperature:** favorece molhamento e adesão na [primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) e reduz lift precoce em alguns materiais.

Valores são **condicionais** a marca, cor, velocidade, umidade e sensor. Trate qualquer número desta base como **starting point**.

## Nomes no Bambu Studio (notas)

Busque **Nozzle temperature**, **Bed temperature**, first layer overrides, e temperaturas por filamento no preset de material. Paths de UI mudam entre versões.

## Unidade / tipo

°C. Rampas e waits de heatsoak são do firmware/perfil.

## Mecanismo

↑ nozzle → melt mais fluido → melhor flow em speed alto, mais ooze/[stringing](../../12-problemas-e-diagnostico/fff/stringing.md), risco de heat creep em extremos.
↓ nozzle → mais definição, risco de [subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md) e [delaminação](../../12-problemas-e-diagnostico/fff/delaminacao.md).
↑ bed (dentro do seguro) → melhor stick; excesso → [elephant foot](../../12-problemas-e-diagnostico/fff/elephant-foot.md).

## Limite duro A1 Mini

Bed máximo **80 °C** — [`source.bambu-a1-mini-tech-specs`](../../22-fontes/bambu-a1-mini-tech-specs.md). Hotend max **300 °C** é capability, não convite a qualquer polímero (ABS/ASA/PC/PA Not Recommended).

## Dependências

- Material + TDS + preset
- [Secagem](../../05-materiais/fff/secagem-e-armazenamento.md) antes de torres
- [Cooling](cooling.md) e [velocidades](velocidades.md)
- Tipo de placa (textured vs smooth)

## Faixas de partida (projeto / prática — validar TDS)

| Material (Ideal A1 Mini) | Nozzle (ordem) | Bed (ordem) |
|---|---|---|
| [PLA](../../05-materiais/fff/pla.md) | faixa típica de partida ~190–220 °C (orientação de bancada; confirmar no spool/TDS — sem fonte pinada nesta base) | faixa típica de partida ~35–60 °C (orientação de bancada; confirmar no spool/TDS — sem fonte pinada nesta base) |
| [PETG](../../05-materiais/fff/petg.md) | faixa típica de partida ~220–250 °C (orientação de bancada; confirmar no spool/TDS — sem fonte pinada nesta base) | faixa típica de partida ~70–80 °C, sem ultrapassar o teto da máquina (orientação de bancada; confirmar no spool/TDS — sem fonte pinada nesta base) |
| [TPU](../../05-materiais/fff/tpu.md) | faixa típica de partida ~210–230 °C (orientação de bancada; confirmar no spool/TDS — sem fonte pinada nesta base) | ~30–60 °C |

Para ABS/ASA/PC/PA: **não** há receita canônica nesta máquina — ver páginas de material e Not Recommended nas specs.

## Sintomas alto / baixo

| Nozzle alto | Nozzle baixo | Bed alto | Bed baixo |
|---|---|---|---|
| strings, sag, brilho excessivo | gaps, delaminação, click | elephant foot, scar na peça | peel, warp precoce |

## Calibração

1. Secar se necessário
2. Torre de temperatura ou cupons (passos curtos de temperatura — ponto de partida exploratório; sem fonte pinada)
3. Uma variável por vez
4. Registrar marca/cor/speed

## Segurança

- Queimadura; não tocar hotend/bed
- Não improvisar bed > capability
- Odor/irritação → parar e ventilar

## Relações com outros conceitos

- constrained-by → bed 80 °C A1 Mini
- couples-with → cooling, speed, drying
- must-not → gospel universal sem TDS

## Veja também

- [Cooling](cooling.md) · [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)
- Legado: [tabela-temperaturas-a1-mini](../../projeto/materiais/tabela-temperaturas-a1-mini.md)

## Fontes

- TDS do filamento
- Páginas canônicas PLA/PETG/TPU

## Lacunas

- Torres locais registradas por SKU
- Heatsoak / chamber temp (fora do escopo A1 Mini aberto)
