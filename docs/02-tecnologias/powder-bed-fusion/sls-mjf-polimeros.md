---
id: "tech.sls-mjf"
title: "SLS e MJF — powder bed fusion de polímeros"
summary: "SLS (Selective Laser Sintering) e MJF (Multi Jet Fusion) são processos industriais de powder bed fusion para polímeros em pó — tipicamente poliamidas (ex.: PA12). Em SLS, um laser sinteriza/funde seletivamente; em MJF, agentes de fusão/detalhamento são jateados e uma fonte de energia infravermelha completa a fusão. Ambos dispensam suporte estrutural clássico de FFF porque o leito não sinterizado apoia a peça, mas exigem depowdering, reciclagem controlada de pó e higiene industrial. Esta página é visão de engenharia com profundidade parcial: não fornece receita de energia, temperatura de câmara ou percentuais de refresh sem datasheet do sistema."
doc_type: "technology"
domain: ["technologies", "polymers"]
technology: ["powder-bed-fusion"]
process: ["sls", "mjf"]
applies_to: ["powder-bed-fusion", "polymer-powder"]
not_for: ["fff-filament", "metal-lpbf-parameters", "home-diy-powder-printing"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry", "source.niosh-am-entry", "source.epa-3d-printing-research"]
related: ["hub.tech.powder-bed-fusion", "tech.lpbf-ebm", "material.powder-feedstocks", "defect.pbf", "post.depowdering-metal", "tech.category-comparison"]
prerequisites: ["hub.tech.powder-bed-fusion"]
supersedes: []
aliases_pt_br: ["SLS", "MJF", "sinterização seletiva a laser", "fusão multi-jato"]
aliases_en: ["SLS", "Selective Laser Sintering", "MJF", "Multi Jet Fusion"]
tags: ["sls", "mjf", "powder-bed-fusion", "polymer"]
---

# SLS e MJF — powder bed fusion de polímeros

Hub pai: [Powder bed fusion](./INDEX.md) · [Tecnologias](../INDEX.md)

## O que é / quando importa

**Powder bed fusion (PBF)** de polímeros produz peças a partir de pó termoplástico depositado em camadas finas. Dois processos industriais amplamente citados:

| Processo | Princípio (fato de categoria) | Nome comercial / OEM |
|---|---|---|
| **SLS** | Laser varre e sinteriza/funde regiões do leito | família genérica; várias marcas |
| **MJF** | Jato de agentes + energia IR funde seletivamente | associado a sistemas HP Multi Jet Fusion |

Quando importa: séries funcionais de nylon, geometrias complexas sem suporte de filamento, lotes médios onde custo de pó e pós-processamento compensam frente a FFF/usínagem.

## Princípio físico (resumo)

1. Recoater espalha camada de pó
2. Energia (laser ou IR + agentes) eleva temperatura local acima do ponto de sinterização/fusão da formulação
3. Câmara tipicamente aquecida reduz gradientes e warping
4. Após o job, a “cake” resfria; peça é liberada por **depowdering**
5. Pó não fundido pode ser peneirado e misturado com pó virgem (**refresh**) segundo política do OEM — não inventar % aqui

## Fluxo de fabricação

CAD → orientação (anisotropia e acabamento) → nesting em volume → build → cool-down → unpack/depowder → jateamento/tingimento/infiltração (opcional) → inspeção.

## Materiais (entrada)

Mais comum: **PA12** e variantes (filled, flame-retardant, etc.). Também aparecem PA11, TPU e outras famílias conforme plataforma. Propriedades mecânicas dependem de densidade, orientação, envelhecimento do pó e pós — ver [feedstocks](../../05-materiais/po/feedstocks-polimeros-e-metais.md).

## Forças e limitações

| Forças | Limitações |
|---|---|
| Geometrias internas complexas sem suporte removível clássico | Custo de máquina/pó alto vs FFF |
| Boa produtividade em nesting denso | Superfície granular; rugosidade típica de leito |
| Peças isótropas *relativamente* melhores que FFF em Z (ainda há anisotropia) | Controle de umidade, aging e refresh do pó |
| Escala industrial comprovada | Cool-down longo; footprint de facility |

**Heurística suportada (escopo industrial):** o leito não sinterizado atua como suporte — cavidades fechadas ainda precisam de escape de pó (design for powder removal).

## Design rules (entrada)

- Prever aberturas para saída de pó em cavidades
- Evitar paredes extremamente finas sem validação do OEM
- Orientação afeta rugosidade, resistência e warpage residual
- Tolerâncias funcionais exigem cupons e metrologia do processo — não copiar tolerâncias de FFF

## Defeitos característicos

Porosidade residual, warpage de cake, fusão incompleta, superfície irregular, contaminação cruzada de pó, inconsistência por refresh inadequado. Matriz: [defeitos PBF](../../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md) (seção polímeros).

## Pós-processamento

Depowdering, jateamento, tingimento, vapor polishing (quando aplicável e seguro), usinagem de faces críticas. Ver [depowdering e pós-metal](../../14-pos-processamento/depowdering-e-pos-metal.md) (parte comum de remoção de pó; tratamentos térmicos metálicos não se aplicam).

## Segurança

- Inalação de pó polimérico fino: controles de ventilação, PPE e limpeza a úmido/HEPA conforme SDS e política local
- Risco de combustão/explosão de nuvem de pó **existe** para muitos polímeros finos — não tratar como “só plástico inofensivo”
- Não aspirar com aspirador doméstico
- Ver também [NIOSH](../../22-fontes/niosh-additive-manufacturing.md) e [EPA](../../22-fontes/epa-3d-printing-research.md)

## Comparação rápida SLS vs MJF

| Aspecto | SLS (visão geral) | MJF (visão geral) |
|---|---|---|
| Mecanismo | laser seletivo | agentes + IR |
| Detalhe fino | depende de spot/estratégia | frequentemente forte em detalhe e produtividade em certas geometrias |
| Cor/acabamento | tipicamente natural + tingimento | workflows de coloração/acabamento próprios do ecossistema |
| Dados numéricos | **OEM-specific** | **OEM-specific** |

Não declarar superioridade absoluta; escolha por máquina instalada, material homologado e custo total.

## Relações

- is-a → processos sob powder bed fusion
- related → [LPBF/EBM metais](lpbf-ebm-metais.md), [comparação entre categorias](../comparacao-entre-categorias.md)
- incompatible-with → regras de nozzle/filamento FFF sem adaptação

## Veja também

- [Feedstocks polímeros e metais](../../05-materiais/po/feedstocks-polimeros-e-metais.md)
- [ISO/ASTM 52900 entrada](../../22-fontes/iso-astm-52900-entry.md)

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)
- [source.epa-3d-printing-research](../../22-fontes/epa-3d-printing-research.md)

## Lacunas / open questions

- Ranges de temperatura de câmara e refresh % por máquina/material não pinados
- Comparação quantitativa de anisotropia SLS vs MJF exige literatura/cupons por sistema
- Página dedicada PA12 pó ainda não criada
