---
id: "material.pc"
title: "PC (policarbonato) em FFF"
summary: "Policarbonato (PC) traz tenacidade e resistência térmica elevadas em graus de engenharia, mas exige processo quente, adesão agressiva e preferencialmente câmara. Na A1 Mini o fabricante lista PC como Not Recommended; bed máximo 80 °C e frame aberto desalinhados com janelas típicas de PC desktop. Esta página explica limitações, segurança e migração de máquina — sem receita completa de impressão para A1 Mini."
doc_type: "material"
domain: ["materials", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "high-temp-enclosed-printers"]
not_for: ["printer.bambu-lab-a1-mini-as-default", "miniature-pla-workflow", "full-a1-mini-print-recipe"]
materials: ["material.pc"]
printers: ["printer.bambu-lab-a1-mini"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.bambu-a1-mini-tech-specs"]
related: ["printer.bambu-lab-a1-mini", "material.petg", "material.abs-asa", "material.drying-storage", "defect.fff.warping"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["PC", "policarbonato"]
aliases_en: ["PC", "polycarbonate"]
tags: ["material", "pc", "fff", "high-temp"]
---

# PC (policarbonato) em FFF

Hub pai: [Materiais FFF](INDEX.md)

## O que é

**PC** (*polycarbonate*) é família de filamento FFF de engenharia. Graus ópticos, “PC-ABS”, blends e filled mudam transparência, fluidez e abrasividade. Resistência térmica real = **dado do TDS**, não do marketing do spool.

## Quando importa

- Fixtures e capas que falharam termicamente em PETG **com evidência**
- Tenacidade / impacto em graus adequados — validar ensaio, não assunção
- Workflow em impressora high-temp + câmara alinhada ao fabricante

## Quando não usar

- “Dia 1” na A1 Mini
- Miniaturas / cooling de PLA
- Sem secagem e sem plano de adesão/câmara
- Como substituto genérico de “plástico forte”

## Compatibilidade A1 Mini (fabricante)

[`source.bambu-a1-mini-tech-specs`](../../22-fontes/bambu-a1-mini-tech-specs.md): **PC = Not Recommended**. Capabilities relevantes: bed max **80 °C**, hotend max 300 °C (capability ≠ compatibilidade de material), frame aberto.

### Por quê não tratar como operacional aqui

1. Janelas típicas de PC desktop pedem **mesa/câmara quentes** acima do que um bed-slinger aberto com teto de 80 °C oferece com margem.
2. Warp e delaminação sob draft são severos.
3. Umidade degrada superfície e bonding.
4. Risco de falha de adesão → peça solta → colisão/blob.

**Não publicar receita completa (perfil numérico pronto) de PC na A1 Mini.** Preferir migrar o job.

## Quando outra máquina é necessária

- Câmara aquecida / enclosure de engenharia com perfil OEM para PC
- Bed e nozzle dentro da janela do TDS (frequentemente acima do teto prático da A1 Mini para bed)
- Ventilação adequada a temperaturas e emissões mais altas
- Operador preparado para adesão agressiva e remoção segura da peça

Até lá: [PETG](petg.md) (Ideal) ou redesenho térmico da peça.

## Umidade

PC é sensível a umidade. Secar conforme TDS/secador; ver [secagem e armazenamento](secagem-e-armazenamento.md). Não “corrigir” bobina úmida só subindo temperatura.

## Comportamento (conceito)

| Propriedade | Consequência |
|---|---|
| Alta resistência térmica (grau) | Processo quente |
| Toughness | Útil quando impresso corretamente |
| Shrink / stress | Warp — [empenamento](../../12-problemas-e-diagnostico/fff/empenamento.md) |
| Claridade óptica | Settings de força ≠ settings de óptica |

Ranges OEM (nozzle/bed/chamber) = **starting points em máquina adequada** + TDS. Nunca gospel universal.

## Assinatura de falhas

| Sintoma | Hipótese | Ação |
|---|---|---|
| Não gruda / solta | processo frio demais / superfície | Outra máquina; first-layer em material Ideal |
| Cantos / rachadura | shrink + aberto | Não forçar A1 Mini |
| Bolhas / frágil | úmido | Secar |
| Odor / irritação | emissões | Parar; ventilar; SDS |

## Segurança

- Temperaturas elevadas → queimadura / falha térmica de componentes se improvisar enclosure inseguro
- VOC/UFP: não declarar seguro; SDS + ventilação
- Remoção de peça: risco de adesão extrema em algumas superfícies — esfriar; não forçar de forma insegura
- Precedência de segurança sobre “provar que dá”

## Relações com outros conceitos

- is-a → família FFF high-temp
- conflicts-with → default [A1 Mini](../../21-impressoras/bambu-lab-a1-mini.md)
- trades-off-with → [PETG](petg.md), [ABS/ASA](abs-asa.md)
- requires → secagem + máquina adequada
- sourced-from → `source.bambu-a1-mini-tech-specs`

## Veja também

- [ABS/ASA](abs-asa.md) · [PA](pa-nylon.md) · [PETG](petg.md)
- Legado: [pc.md](../../projeto/materiais/pc.md)

## Fontes

- [source.bambu-a1-mini-tech-specs](../../22-fontes/bambu-a1-mini-tech-specs.md)
- TDS/SDS do SKU
- Legado EN: [pc.md](../../projeto/materiais/pc.md)

## Lacunas

- Graus ópticos vs estruturais
- Perfis enclosed de referência neste repositório
- Dados locais de HDT por peça impressa (anisotropia)
