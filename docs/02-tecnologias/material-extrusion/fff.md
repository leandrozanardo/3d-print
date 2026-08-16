---
id: "tech.fff"
title: "FFF — Fused Filament Fabrication (extrusão de material)"
summary: "FFF é o processo genérico de manufatura aditiva por extrusão de termoplástico em filamento, depositado camada a camada. Pertence à categoria material extrusion. FDM é termo comercial histórico frequentemente usado como sinônimo popular, mas não deve ser tratado como categoria ISO distinta sem contexto. Esta página orienta mecanismo, limitações e navegação; profundidade de hardware/settings virá em waves seguintes."
doc_type: "technology"
domain: ["technologies", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "material-extrusion"]
not_for: ["vat-photopolymerization-rules", "powder-bed-rules"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry"]
related: ["printer.bambu-lab-a1-mini", "material.pla", "process.fff.first-layer"]
prerequisites: []
aliases_pt_br: ["FFF", "impressão por filamento", "extrusão de filamento"]
aliases_en: ["FFF", "Fused Filament Fabrication", "FDM"]
tags: ["fff", "material-extrusion"]
---

# FFF — Fused Filament Fabrication

Hub pai: [Tecnologias](../INDEX.md) · pasta [material-extrusion](./)

## O que é

Na **extrusão de material**, um feedstock é seletivamente dispensado através de um bico. Em desktop, o feedstock mais comum é **filamento** termoplástico → processo conhecido como **FFF**. O termo **FDM** (*Fused Deposition Modeling*) é marca/uso popular; nesta base preferimos **FFF** para o processo genérico e **material extrusion** para a categoria.

Referência de terminologia: [ISO/ASTM 52900 entrada](../../22-fontes/iso-astm-52900-entry.md) (texto normativo não reproduzido).

## Princípio físico (resumo)

1. Filamento é tracionado e fundido em zona quente
2. Cordão é depositado segundo toolpath do slicer
3. Solidificação e contração geram tensões; adesão entre cordões define anisotropia
4. Primeira camada define sucesso mecânico do restante

## Forças e limitações

| Forças | Limitações |
|---|---|
| Baixo custo relativo | Anisotropia Z |
| Ampla oferta de polímeros | Acabamento em camadas |
| Bom para protótipos e muitas peças finais leves | Geometrias com overhang exigem suporte |
| Ecossistema slicer maduro | Emissões/particulados a gerenciar |

## Defeitos característicos (entrada)

- Falha de primeira camada / adesão
- Empenamento (warping)
- Stringing, under/over-extrusion
- Layer shift, ringing
- Delaminação

Ver hub [Problemas](../../12-problemas-e-diagnostico/INDEX.md).

## Máquina de referência nesta base

[Bambu Lab A1 Mini](../../21-impressoras/bambu-lab-a1-mini.md)

## Relações com outros conceitos

- is-a → processo sob material extrusion
- applies-to → desktop e muitas industriais de filamento
- incompatible-with → aplicar regras de resina/pó sem adaptação
- related → [PLA](../../05-materiais/fff/pla.md), [PETG](../../05-materiais/fff/petg.md)

## Veja também

- [Primeira camada](../../10-processo-de-impressao/fff/primeira-camada.md)
- Legado ebook (CC BY-SA, não canônico): [ebook/05-tecnologia-fff.md](../../ebook/05-tecnologia-fff.md)

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)

## Lacunas

- Páginas profundas de cinemática, pressure advance, volumetric flow
- Comparativos formais com SLA/SLS
