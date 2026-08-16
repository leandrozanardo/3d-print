---
id: myth.more-temp-more-adhesion
title: Mito — mais temperatura sempre aumenta adesão
summary: 'Subir nozzle/mesa ‘no máximo’ não garante adesão: molhabilidade tem janela;
  excesso causa stringing, elephant foot, degradação, odores e falhas cosméticas.
  Adesão mesa↔peça e bonding Z são problemas distintos. Status: overgeneralization
  perigosa. Prefira first layer, limpeza, Z/mesh e range do TDS/preset.'
doc_type: research
domain:
- research
- fff
- thermal
technology:
- material-extrusion
process:
- fff
applies_to:
- fff
- first-layer
- layer-bonding
not_for:
- max-temp-as-default-fix
- ignore-tds-sds
knowledge_status: draft
evidence_status: mixed
safety_level: caution
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 12-months
sources:
- source.ellis-print-tuning-guide
related:
- fund.heat-transfer-fff
- fund.wetting-first-layer
- process.fff.first-layer
- myth.enclosure-required-pla
- hub.pesquisa
prerequisites: []
supersedes: []
aliases_pt_br:
- mais temperatura mais adesão
- subir temp para grudar
aliases_en:
- higher temperature better adhesion myth
- max temp adhesion
tags:
- myth
- temperature
- adhesion
- fff
---
# Mito — mais temperatura sempre aumenta adesão

Hub pai: [Pesquisa e mitos](./INDEX.md)

## Claim exato

> “Se não gruda, é só aumentar a temperatura (nozzle e/ou mesa). Quanto mais quente, melhor a adesão.”

## Origem

Observação parcial verdadeira em janelas estreitas (polímero frio demais não molha) generalizada para “monotônico crescente”. Fóruns reforçam o atalho porque mexer em °C é fácil e visível.

## Quando parece verdadeiro

- First layer claramente sub-aquecida vs preset/TDS do SKU
- Filamento exigindo temp mínima de fluxo (ainda dentro do range)
- Bonding Z fraco por cooling excessivo — onde **reduzir fan** ou subir um pouco a temp *dentro da janela* ajuda

## Evidência contra a forma absoluta

| Fato / limitação | Implicação |
|---|---|
| Adesão depende de Z, limpeza, velocidade e área | Temp não é a única alavanca — [molhabilidade](../01-fundamentos/adesao-molhabilidade-primeira-camada.md) |
| Excesso de calor → elephant foot, blobs, stringing | “Grudou” com geometria arruinada |
| Degradação / fumaça / odor | Risco de saúde e qualidade; respeitar SDS |
| Mesa quente demais em PLA | Pode amolecer base / piorar detalhe sem curar sujeira |
| Bonding Z ≠ adesão à mesa | Diagnóstico errado — [transferência de calor](../01-fundamentos/transferencia-de-calor-fff.md) |

## O que se pode concluir

- Existe **janela** térmica por material/SKU/máquina — não uma rampa infinita
- Antes de subir temp: limpeza, mesh/offset, first-layer speed, drafts
- Mudanças térmicas devem ser **incrementais** e testadas em cupom
- Presets oficiais + TDS > lore de fórum

## O que não se pode concluir

- Que a temperatura máxima da UI é o setpoint correto
- Que PETG/ABS “sempre” precisam do teto da máquina
- Que cheiro forte = “melhor fusão”

## Status

**Mito / overgeneralization** — rejeitar a forma “sempre”. Disciplina: [correlação vs causa](../01-fundamentos/correlacao-vs-causa-troubleshooting.md).

## Fontes

- [source.ellis-print-tuning-guide](../22-fontes/ellis-print-tuning-guide.md)

## Lacunas

- Curvas adesão vs temp medidas no projeto: abertas
- Limites térmicos pinados por SKU Bambu: usar TDS do produto, não esta página
