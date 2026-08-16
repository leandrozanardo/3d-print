---
id: "tech.binder-jetting-variants"
title: "Binder jetting — variantes metal e areia"
summary: "Binder jetting (BJ) deposita aglutinante líquido seletivamente sobre um leito de pó. Em metal, a peça “verde” tipicamente passa por cura, desaglutinação e sinterização (com encolhimento significativo); em areia, o foco é moldes e machos para fundição, muitas vezes sem a mesma rota de densificação metálica. A categoria é distinta de powder bed fusion: não há fusão seletiva por laser/feixe na impressão — a energia térmica vem depois, quando aplicável. Cobertura parcial: sem percentuais de shrink ou curvas de sinter por liga inventados."
doc_type: "technology"
domain: ["technologies", "metals", "casting"]
technology: ["binder-jetting"]
process: ["binder-jetting"]
applies_to: ["binder-jetting", "metal-powder", "foundry-sand"]
not_for: ["lpbf-melt-pool-tuning", "fff"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "high"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry", "source.niosh-am-entry"]
related: ["hub.tech.binder-jetting", "tech.lpbf-ebm", "material.powder-feedstocks", "post.depowdering-metal", "hazard.metal-powder", "tech.category-comparison"]
prerequisites: []
supersedes: []
aliases_pt_br: ["binder jetting metálico", "binder jetting de areia", "impressão de moldes em areia"]
aliases_en: ["metal binder jetting", "sand binder jetting", "BJ metal", "BJ sand"]
tags: ["binder-jetting", "metal", "sand", "sintering"]
---

# Binder jetting — variantes metal e areia

Hub pai: [Binder jetting](./INDEX.md)

## O que é

Na categoria **binder jetting**, cabeças de impressão depositam aglutinante em padrões 2D sobre pó espalhado. A coesão na impressora vem do binder, não de um melt pool de laser.

### Variante metal

1. Print → peça verde frágil
2. Cura do binder (quando previsto)
3. Depowdering cuidadoso
4. Debind + sinter (forno) → densificação e **encolhimento**
5. Opcional: infiltração, HIP, usinagem

### Variante areia (foundry)

1. Print de molde/macho em areia aglutinada
2. Remoção de pó solto
3. Uso em processo de fundição convencional
4. Não se espera a mesma cadeia de sinter metálico

## Quando escolher

| Cenário | Por quê BJ pode caber |
|---|---|
| Séries de metal com geometria complexa e custo vs LPBF | Produtividade de leito + sinter em lote |
| Moldes/machos complexos | Reduz usinagem de modelo |
| Prototipagem metálica com menos resolução que LPBF | Trade-off custo/qualidade |

## Forças e limitações

| Forças | Limitações |
|---|---|
| Escala de área de leito / produtividade | Shrink e distorção no sinter (metal) |
| Sem laser de fusão no print | Densidade/porosidade dependem da rota térmica |
| Areia: tooling digital para fundição | Acabamento e propriedades ≠ LPBF sem pós |
| Menos tensões de melt pool no print | Manuseio de pó + solventes/binder |

## Design (entrada)

- Compensar encolhimento de sinter **com dados do OEM/material** — não inventar %
- Evitar seções que prendam pó ou criem gradientes extremos de massa
- Em areia: considerar desmoldagem, gases e prática de fundição

## Segurança

- Pós metálicos: mesma família de riscos de combustão/inalação — [hazard.metal-powder](../../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md)
- Binders e solventes: VOC, inflamabilidade — SDS obrigatório
- Fornos de sinter: queimadura, atmosfera, emissões

## Defeitos típicos

Falha de binder, delaminação verde, warpage de sinter, porosidade residual, variação dimensional. Relacionar com [defeitos PBF](../../12-problemas-e-diagnostico/po-metal/defeitos-pbf.md) só quando o mecanismo for análogo (porosidade); muitos modos são específicos de BJ.

## Comparação com PBF metal

| | Binder jet metal | LPBF |
|---|---|---|
| Fusão no print | Não | Sim |
| Densidade as-printed | Verde → densifica no sinter | Alta no build |
| Resolução típica | processo-dependente | frequentemente superior em detalhe fino |
| Facility | print + forno | laser + inert gas |

## Fontes

- [source.iso-astm-52900-entry](../../22-fontes/iso-astm-52900-entry.md)
- [source.niosh-am-entry](../../22-fontes/niosh-additive-manufacturing.md)

## Lacunas

- Curvas de sinter e tabelas de shrink por liga: ausentes (exigir OEM)
- BJ de cerâmica/polímero: só mencionada, sem página dedicada
