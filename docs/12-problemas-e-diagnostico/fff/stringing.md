---
id: defect.fff.stringing
title: Stringing (fios / cabelo) em FFF
summary: Stringing são fios finos entre regiões da peça causados por ooze durante
  travels. Na A1 Mini (direct drive) a ordem correta é secar → ajustar temperatura
  → torre de retração curta a partir do preset — nunca copiar comprimentos Bowden.
  PETG é especialmente sensível à umidade. Z-hop pode piorar. Diferencie de subextrusão
  (gaps) e de detalhe derretido sem fios.
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
- material.tpu
not_for:
- gaps-without-hairs
- bowden-retract-copy
materials:
- material.pla
- material.petg
- material.tpu
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.ellis-print-tuning-guide
- source.teaching-tech-calibration
related:
- setting.retraction
- material.drying-storage
- defect.fff.under-extrusion
- material.petg
- process.fff.first-layer
prerequisites:
- material.drying-storage
supersedes: []
aliases_pt_br:
- stringing
- fio de cabelo
- teia
- oozing
aliases_en:
- stringing
- whiskers
- hairs
- oozing
tags:
- stringing
- troubleshooting
- fff
symptom_tags:
- stringing
- whiskers
cause_tags:
- moisture
- high-temp
- retraction
- travel
setting_tags:
- retraction
- temperatures
---
# Stringing (fios / cabelo) em FFF

Hub pai: [Problemas FFF](INDEX.md) · [Índice por sintoma](indice-por-sintoma.md)

## Resumo de emergência

Fios entre torres/peças? **Seque** o filamento, depois −5 °C (fonte oficial / fabricante / heuristic; ver `sources`)  no range, depois torre de [retração](../../08-slicers-e-configuracoes/settings/retracao.md) curta (direct drive). Não suba retract para 5–8 mm (fonte oficial/fabricante/heuristic; ver sources) .

## Assinatura

- Visual: cabelos, teias, bigodes entre features
- Momento: após travels; piora com PETG úmido
- Áudio: pops sugerem umidade concomitante

## Diferenciar

| Parece stringing mas… | Vá para |
|---|---|
| Gaps / falta material | [Subextrusão](subextrusao.md) |
| Detalhe mole sem fios | velocidade/temp/walls (legado detalhe) |
| Só first layer ruim | [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md) |

## Cause matrix

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Umidade | Vapor + ooze — [secagem](../../05-materiais/fff/secagem-e-armazenamento.md) |
| Alta | Nozzle quente demais | Baixa viscosidade |
| Alta | Retract curto/lento demais (após seco) | Pressão residual |
| Média | Travel atravessando pele | Puxa fio |
| Média | Z-hop | Pode alongar strings |
| Baixa-primeira | “Filamento ruim” | Só após processo |

## Árvore

```text
1 Seco / sem pops? ─NÃO─► secar → retestar
2 Ainda fios? ─► nozzle −5 °C (no range TDS/preset)
3 Ainda? ─► retract ±0,1–0,2 mm / speed a partir do preset A1 Mini
4 Ainda? ─► combing / evitar travel na pele
5 Ainda? ─► Z-hop off/on (validar — pode piorar)
```

## Testes barato → caro

1. Ouvir pops; secar  
2. Cupom de duas torres  
3. Uma mudança de temp  
4. Torre de retract  
5. Revisar wipe/AMS só depois  

## PLA vs PETG vs TPU

| Alavanca | PLA | PETG | TPU |
|---|---|---|---|
| Secagem | alta | crítica | alta |
| Retract | curto DD | curto–médio DD | mínima |
| Fan para “matar fio” | ajuda cosmético | trade vs bonding | caso a caso |
| Fio residual aceitável | baixo em mini | maior em ferramenta | comum |

## Não faça

- Cinco knobs de uma vez  
- Bowden lengths em DD  
- Max fan em PETG só por stringing  
- Ignorar umidade  

## Validação

Mesmo cupom; foto before/after; registrar temp/retract/secagem.

## Prevenção

- Estocar seco; secar PETG antes de jobs limpos  
- Preset do material A1 Mini  
- Purge em trocas de material  

## Relações com outros conceitos

- caused-by → moisture, high temp, retract, travel  
- mitigated-by → drying, retract tuning  
- settings → [retracao](../../08-slicers-e-configuracoes/settings/retracao.md), [temperaturas](../../08-slicers-e-configuracoes/settings/temperaturas.md)  
- related-to → [empenamento](empenamento.md) só se draft/cooling extremos (secundário)

## Veja também

- Legado: [stringing-e-retract.md](../../projeto/qualidade-e-acabamento/stringing-e-retract.md)

## Fontes

- Prática DD vs Bowden; legado operacional
- Presets Bambu Studio

## Lacunas

- Valores por SKU medidos
- Flush AMS vs stringing colorido
