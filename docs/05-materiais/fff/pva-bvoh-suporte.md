---
id: "material.pva-bvoh-support"
title: "PVA / BVOH — filamentos de suporte solúvel"
summary: "PVA e BVOH (e marcas correlatas) são famílias usadas como suporte solúvel em FFF multi-material: imprimem interface e dissolvem em água (condições conforme TDS). Exigem controle de umidade, bicos/perfis compatíveis e tempo de dissolução. Na A1 Mini, PVA aparece como Ideal nas tech specs do fabricante — ainda assim não inventar receitas de temperatura universais. Não confundir com suporte breakaway seco."
doc_type: "material"
domain: ["materials", "fff", "supports"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "multi-material", "printer.bambu-lab-a1-mini"]
not_for: ["universal-dissolve-times", "food-contact-after-dissolve"]
materials: ["material.pva-bvoh-support"]
printers: ["printer.bambu-lab-a1-mini"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.bambu-a1-mini-tech-specs"]
related: ["material.drying-storage", "design.supports-fff", "material.pla", "material.petg", "printer.bambu-lab-a1-mini", "hub.materiais.fff"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["suporte PVA", "BVOH", "suporte solúvel"]
aliases_en: ["PVA support filament", "BVOH soluble support", "water-soluble support"]
tags: ["material", "pva", "bvoh", "support", "fff"]
---

# PVA / BVOH — filamentos de suporte solúvel

Hub pai: [Materiais FFF](INDEX.md)

## O que é

**PVA** (*polyvinyl alcohol*) e **BVOH** (butenediol vinyl alcohol copolymer; nomenclatura comercial varia) são termoplásticos usados tipicamente como **material de suporte solúvel** em impressão multi-extrusor / AMS-like: a peça fica em material modelo (ex.: PLA) e o suporte dissolve em água sob condições indicadas pelo fabricante do filamento.

“PVA” e “BVOH” são **famílias**; produtos de marca diferem em temperatura, higroscopia e velocidade de dissolução. Sempre leia o **TDS/SDS** do SKU.

## Quando faz sentido

- Cavidades internas / overhangs onde remoção mecânica destruiria a peça
- Interfaces difíceis de alcançar com alicate
- Quando o custo de tempo de dissolução < custo de pós-processamento manual

## Quando não faz sentido

- Single-extruder sem caminho confiável de troca (purge alto, contaminação)
- Peça que não pode molhar / dimensionalmente sensível à água
- Operador sem secagem/armazenamento — estes materiais são **muito higroscópicos**
- Expectativa de food-contact após dissolver — **não** torna a peça apta; ver [contato alimentar](../../18-aplicacoes-e-regulacao/contato-alimentar-limites.md)

## Compatibilidade A1 Mini

O fabricante lista **PVA** entre filamentos **Ideal** nas [tech specs A1 mini](../../22-fontes/bambu-a1-mini-tech-specs.md). Isso indica suporte de ecossistema, **não** uma receita numérica universal nesta wiki.

Use presets oficiais do [Bambu Studio](../../08-slicers-e-configuracoes/bambu-studio.md) / filamento pareado e valide interface (gap de suporte, purge, priming).

## Processo — pontos críticos

| Tema | Nota |
|---|---|
| Umidade | Secar e armazenar conforme TDS — [secagem](secagem-e-armazenamento.md) |
| Interface | Gap/estilo de suporte afetam solda e remoção |
| Purge / torre | Contaminação cruzada mancha cosmético |
| Dissolução | Água (temp/agitação) conforme fabricante; descarte responsável do efluente |
| Breakaway vs solúvel | Não são intercambiáveis |

DfAM ainda importa: menos suporte é melhor — [suportes](../../06-design-para-impressao-3d/suportes-fff.md), [overhangs](../../06-design-para-impressao-3d/overhangs-e-angulos-autofportantes.md).

## Segurança e descarte

- Consulte SDS (pó fino após secagem, aditivos)
- Não despejar efluente concentrado em rede sem checar regras locais
- Não ingerir; não food-contact

## O que não fazer

- Inventar temperaturas “padrão da internet” no lugar do preset/TDS
- Deixar bobina aberta por dias e culpar a impressora
- Misturar restos PVA com reciclagem doméstica de PLA sem controle

## Lacunas

- Tempos de dissolução medidos por geometria no projeto: abertos
- Comparativo PVA vs BVOH de marcas específicas: não pinado
