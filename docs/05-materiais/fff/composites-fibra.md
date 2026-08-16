---
id: "material.composites-fiber"
title: "Compósitos e filamentos com fibra (CF/GF) em FFF"
summary: "Filamentos com fibra de carbono (CF), fibra de vidro (GF) e outros fillers aumentam rigidez/abrasividade e mudam cosmética — mas o polímero base ainda manda na janela térmica e na umidade. Na A1 Mini o fabricante marca reforçados CF/GF como Not Recommended; desgaste abrasivo de nozzle é o risco operacional central mesmo em bases Ideal (ex.: PLA-CF). Sem receita completa de engenharia filled na A1 Mini; explicar wear, hardened nozzle e quando migrar de máquina."
doc_type: "material"
domain: ["materials", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "abrasive-filaments", "hardened-nozzle-workflows"]
not_for: ["soft-brass-nozzle-long-cf-gf-runs", "full-a1-mini-cf-gf-engineering-recipe", "carbon-equals-heat-resistance-myth"]
materials: ["material.composites-fiber"]
printers: ["printer.bambu-lab-a1-mini"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.bambu-a1-mini-tech-specs"]
related: ["nozzle.0.4mm-fff", "material.pa", "material.petg", "material.pla", "defect.fff.under-extrusion", "printer.bambu-lab-a1-mini"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["filamento com fibra", "CF", "GF", "compósito FFF", "carbon fiber", "glass fiber"]
aliases_en: ["filled filament", "CF", "GF", "carbon fiber filament", "glass fiber filament", "composite filament"]
tags: ["composites", "abrasive", "cf", "gf", "nozzle-wear"]
---

# Compósitos e filamentos com fibra (CF/GF) em FFF

Hub pai: [Materiais FFF](INDEX.md)

## O que é

**Compósitos FFF** aqui = filamento com **carga abrasiva** (CF, GF, metal-fill, etc.) dispersa em polímero base (PLA, PETG, PA, PC…). A etiqueta “carbon” **não** cria resistência térmica mágica: o **base polymer** define Tg/HDT e necessidade de câmara. Leia o TDS: família base + %/tipo de filler + abrasividade.

## Quando importa

- Peças que pedem maior rigidez / menor creep cosmético matte
- Quando o usuário aceita wear de hardware e retune de flow
- Estética metal/wood/glow (muitas vezes PLA-based) com abrasão leve a moderada

## Quando não usar

- Nozzle de latão macio em tiragens longas de CF/GF
- Assumir que CF-PLA aguenta o mesmo calor que PC/PA
- CF-PA sem disciplina de [secagem](secagem-e-armazenamento.md) e sem máquina adequada a PA
- Como default na A1 Mini para engenharia filled

## Compatibilidade A1 Mini (fabricante)

[`source.bambu-a1-mini-tech-specs`](../../22-fontes/bambu-a1-mini-tech-specs.md): filamentos **CF/GF reinforced** = **Not Recommended**. A mesma página lista PLA/PETG/TPU/PVA como Ideal (bases sem reforço de fibra na lista Ideal).

**Implicação editorial:** não oferecer receita completa de processo para PA-CF, PET-CF, etc. na A1 Mini. Explicar risco, wear e migração. Cosméticos levemente filled sobre base Ideal ainda exigem honesty sobre abrasão e validação — sem tratar como endosso do fabricante aos reforçados listados como Not Recommended.

## Desgaste abrasivo (mecanismo)

Partículas duras no melt erodem o furo e o canal do nozzle:

1. Diâmetro interno **aumenta** com o tempo → flow real ≠ flow calibrado
2. Sintoma clássico: [subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md) progressiva após horas/dias
3. Qualidade superficial piora; paredes “magras”; tops falhos
4. Mitigação de hardware: nozzle **hardened** / OEM abrasive-rated; recalibrar após troca
5. Velocidade/temp: seguir base polymer + TDS; retune — não gospel universal

Ver também [nozzle 0,4 mm](../../04-componentes-e-hardware/nozzle-0-4-mm-fff.md).

## Tipos de filler (visão)

| Filler | Efeito típico | Nota |
|---|---|---|
| CF curto | rigidez, matte, abrasivo | base polymer manda no calor |
| GF | rígido, abrasivo, pode fragilizar | idem |
| Metal-fill | densidade, cosmética, abrasivo | pós-processo ≠ força metálica |
| Wood-fill | textura, abrasão leve–média | base costuma ser PLA |
| Glow | possível abrasão leve | validar marca |

## Quando outra máquina / setup é necessário

- Base = PA/PC/ABS e a specs da A1 Mini marca o polímero ou CF/GF como Not Recommended — migrar para enclosed/high-temp adequada
- Tiragens longas de fibra sem nozzle endurecido disponível
- Requisito estrutural certificado (ensaio) além de “parece carbono”

Para funções leves na A1 Mini: preferir [PLA](pla.md) / [PETG](petg.md) **não reforçados** (Ideal).

## Processo (conceitual — não receita CF/GF A1 Mini)

1. Identificar **polímero base** → ler página da família
2. Confirmar posição do fabricante da **impressora** para aquele filled
3. Hardened nozzle se abrasivo
4. Secar como a base exige
5. Recalibrar flow após mudança de nozzle
6. Aceitar que bonding e anisotropia mudam — teste mecânico > feeling

## Assinatura de falhas

| Sintoma | Hipótese | Ação |
|---|---|---|
| Gaps piorando ao longo do spool | wear de nozzle | Trocar hardened; medir/inspecionar |
| Clog / grind | partícula + temp + path | Purge; temp no range TDS; ↓ speed |
| Fraco / poroso | úmido (base) | [secagem](secagem-e-armazenamento.md) |
| Warp severo em PA-CF | polímero + aberto | Não forçar A1 Mini — [PA](pa-nylon.md) |

## Segurança

- Pó de lixamento CF/GF: PPE respiratório/ocular; não soprar pó
- Fibras/condutividade: não assumir isolamento elétrico
- Hotend/abrasão: falha de extrusão pode virar blob se ignorada
- SDS do produto filled

## Relações com outros conceitos

- specializes → materiais base (PLA/PETG/PA/…)
- causes → nozzle wear → under-extrusion
- conflicts-with → CF/GF Not Recommended na A1 Mini (specs)
- depends-on → hardened nozzle + TDS
- myth-busts → “carbon = high temp”

## Veja também

- [PA](pa-nylon.md) · [PETG](petg.md) · [PLA](pla.md)
- [Subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md)
- Legado: [composites.md](../../projeto/materiais/composites.md)

## Fontes

- [source.bambu-a1-mini-tech-specs](../../22-fontes/bambu-a1-mini-tech-specs.md) — CF/GF Not Recommended
- TDS/SDS + guia abrasivo do OEM do filamento/nozzle
- Legado EN: [composites.md](../../projeto/materiais/composites.md)

## Lacunas

- Horas até wear mensurável por liga de nozzle (dado local)
- Distinção PLA-CF cosmético vs PA-CF estrutural em matriz
- Perfis enclosed para filled neste repo
