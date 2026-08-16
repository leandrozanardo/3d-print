---
id: "printer.bambu-lab-a1-mini"
title: "Bambu Lab A1 Mini"
summary: "A Bambu Lab A1 Mini é uma impressora FFF compacta tipo bed-slinger com volume oficial 180×180×180 mm, extrusor direct drive, nozzle 0,4 mm incluso e mesa aquecida até 80 °C. Opera em frame aberto (sem câmara aquecida nativa). O fabricante lista PLA, PETG, TPU e PVA como ideais e marca ABS/ASA/PC/PA e vários reforçados como não recomendados. Nesta base é a máquina de referência operacional inicial com Bambu Studio."
doc_type: "printer"
domain: ["printers", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["bambu-lab-a1-mini", "bambu-studio"]
not_for: ["heated-chamber-materials-as-default", "x1c-speed-presets-unadapted"]
printers: ["printer.bambu-lab-a1-mini"]
slicers: ["slicer.bambu-studio"]
materials: ["material.pla", "material.petg"]
knowledge_status: "draft"
evidence_status: "manufacturer-specific"
safety_level: "caution"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.bambu-a1-mini-tech-specs", "source.bambu-wiki-a1-mini"]
related: ["nozzle.0.4mm-fff", "material.pla", "material.petg", "tech.fff"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["A1 Mini", "A1 mini"]
aliases_en: ["Bambu Lab A1 mini"]
tags: ["printer", "bambu", "bed-slinger"]
---

# Bambu Lab A1 Mini

Hub pai: [Impressoras](INDEX.md)

## O que é

Impressora desktop de **extrusão de material** (FFF) da Bambu Lab, arquitetura **bed-slinger** (mesa móvel em Y), hotend all-metal, extrusão **direct drive**, placa PEI magnética e recursos de assistência de calibração no ecossistema Bambu Studio / firmware do produto.

## Quando importa

- Cabe a peça no envelope com margem para brim/suportes/purge?
- O material está na lista Ideal do fabricante ou em Not Recommended?
- Há corrente de ar no frame aberto afetando adesão/empenamento?
- O perfil veio de outra máquina Bambu (X1/P1/A1 full) sem adaptação?

## Capabilities oficiais (fabricante)

Valores abaixo vêm das [Technical Specifications](../22-fontes/bambu-a1-mini-tech-specs.md) acessadas em 2026-08-15:

| Capability | Valor oficial | Nota editorial |
|---|---|---|
| Build volume | 180 × 180 × 180 mm | Deixar margem operacional para brim/torre |
| Nozzle incluso | 0,4 mm | Também lista 0,2 / 0,6 / 0,8 mm |
| Max hotend temp | 300 °C | Capability ≠ “imprima qualquer polímero” |
| Max bed temp | 80 °C | Limite duro para receitas desta máquina |
| Max toolhead speed | 500 mm/s | Marketing/capability; qualidade exige freio |
| Max acceleration | 10 000 mm/s² | Idem |
| Filamentos Ideal | PLA, PETG, TPU, PVA | Posição do fabricante |
| Filamentos Not Recommended | ABS, ASA, PC, PA, PET, CF/GF reinforced | Ver tech specs |
| Sensores (lista specs) | runout, odometry, tangle, power-loss recover, câmera low framerate | Detalhes de falha = páginas futuras |

Procedimentos de unboxing/primeiro print: [Wiki A1 mini](../22-fontes/bambu-wiki-a1-mini.md).

## O que fazer (regras desta base)

1. Começar de presets **A1 Mini** no Bambu Studio, não colar perfil de X1C/P1 sem revisão.
2. Assumir [nozzle 0,4 mm](../04-componentes-e-hardware/nozzle-0-4-mm-fff.md) até documentar outro diâmetro.
3. PLA como caminho de menor resistência; PETG com secagem e placa preferencialmente texturizada.
4. Tratar correntes de ar (ar-condicionado) como fator de processo — não há enclosure nativo.
5. Não recomendar ABS/ASA/PC/PA como default nesta máquina; se o usuário insistir, declarar desalinhamento com fabricante + riscos de warping/emissões (página de segurança ainda é lacuna profunda).

## Aplicabilidade

**Aplica-se a:** A1 Mini / A1 Mini Combo (AMS lite) no que for comum ao hardware base.  
**Não se aplica a:** transferir cegamente a outras cinemáticas; assumir câmara aquecida; usar bed > 80 °C.

## Segurança (resumo)

- Superfícies quentes (hotend/bed)
- Partes móveis
- Impressão desacompanhada: risco residual de falha catastrófica (blob) — monitoramento recomendado
- Emissões: mesmo PLA/PETG geram partículas/VOC em grau variável — ver hub de segurança (cobertura ainda parcial)

## Relação com legado

Conteúdo operacional anterior em inglês: [projeto/hardware/a1-mini-visao-geral.md](../projeto/hardware/a1-mini-visao-geral.md). Esta página é a candidata canônica pt-BR; o legado permanece até migração completa.

## Relações com outros conceitos

- is-a → impressora FFF desktop
- part-of → ecossistema Bambu Lab A series
- requires → [tech.fff](../02-tecnologias/material-extrusion/fff.md)
- compatible-with → [PLA](../05-materiais/fff/pla.md), [PETG](../05-materiais/fff/petg.md) (Ideal)
- depends-on → [nozzle 0,4 mm](../04-componentes-e-hardware/nozzle-0-4-mm-fff.md) no escopo atual
- sourced-from → [tech specs](../22-fontes/bambu-a1-mini-tech-specs.md), [wiki](../22-fontes/bambu-wiki-a1-mini.md)

## Veja também

- [Primeira camada](../10-processo-de-impressao/fff/primeira-camada.md)
- [Empenamento](../12-problemas-e-diagnostico/fff/empenamento.md)
- [Playbook vertical](../16-cenarios-e-playbooks/a1-mini-pla-petg-primeira-camada-empenamento.md)
- [Manuais convertidos](../printers/A1mini/INDEX.md)

## Fontes

- [source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md)
- [source.bambu-wiki-a1-mini](../22-fontes/bambu-wiki-a1-mini.md)

## Lacunas

- Revisão de hardware/firmware pinada por data de serial
- Página dedicada AMS lite
- Placas PEI smooth vs textured como páginas atômicas
- Medições locais de volumetric max / resonance nesta unidade
