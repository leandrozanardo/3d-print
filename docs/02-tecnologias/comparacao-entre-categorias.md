---
id: "tech.category-comparison"
title: "Comparação entre categorias de manufatura aditiva"
summary: "Comparação honesta e parcial das sete categorias ISO/ASTM de AM: material extrusion, vat photopolymerization, powder bed fusion, binder jetting, material jetting, directed energy deposition e sheet lamination. Orienta escolha por geometria, material, custo, facility e risco — sem crowning de ‘melhor tecnologia’. Profundidade limitada fora de FFF e da fatia PBF/DED/BJ desta wave."
doc_type: "technology"
domain: ["technologies"]
technology: []
process: []
applies_to: ["additive-manufacturing"]
not_for: ["single-best-tech-claim"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.iso-astm-52900-entry"]
related: ["hub.tecnologias", "tech.fff", "tech.sls-mjf", "tech.lpbf-ebm", "tech.binder-jetting-variants", "tech.ded-waam", "tech.material-jetting", "tech.sheet-lamination", "tech.vat-photopolymerization"]
prerequisites: ["hub.tecnologias"]
supersedes: []
aliases_pt_br: ["comparação de tecnologias AM", "qual processo escolher"]
aliases_en: ["AM process comparison", "seven AM categories"]
tags: ["comparison", "iso-astm-52900"]
---

# Comparação entre categorias de manufatura aditiva

Hub pai: [Tecnologias](./INDEX.md)

## Como usar esta página

Escolha por **requisito** (material, geometria, volume, facility, regulação), não por marketing. Valores de precisão/custo aqui são **ordens de grandeza qualitativas**, não specs.

## Matriz qualitativa

| Categoria | Feedstock típico | Força relativa | Limitação relativa | Risco especial |
|---|---|---|---|---|
| [Material extrusion](material-extrusion/INDEX.md) | filamento/pellet | baixo custo, acessível | anisotropia Z, suporte | VOC/UFP, queimadura |
| Vat photopolymerization | resina | detalhe fino | mecânica/UV aging, sticky | resina sensibilizante — ver [vat](vat-photopolymerization/INDEX.md) |
| [Powder bed fusion](powder-bed-fusion/INDEX.md) | pó polímero/metal | geometria complexa, metal denso | facility, pó, custo | pó combustível |
| [Binder jetting](binder-jetting/INDEX.md) | pó + binder | produtividade / moldes areia | sinter shrink (metal) | pó + químicos |
| [Material jetting](material-jetting/INDEX.md) | gotas fotopolímero | estética multi-material | custo, durabilidade | resina |
| [DED](directed-energy-deposition/INDEX.md) | pó/arame + energia | grande porte, reparo | resolução | fumos/laser/arco |
| [Sheet lamination](sheet-lamination/INDEX.md) | folhas | nicho / embedding | anisotropia de folha | corte/fumos |

## Árvore de decisão rápida

```text
Precisa metal estrutural denso e detalhe fino?
  └─ LPBF/EBM (PBF metal) — facility crítica
Grande peça / reparo metálico?
  └─ DED / WAAM
Série polímero complexa sem suporte FFF?
  └─ SLS / MJF
Molde de areia / sinter metal em lote?
  └─ Binder jetting
Protótipo visual / multi-durometer?
  └─ Material jetting ou vat
Baixo custo desktop / iteração rápida?
  └─ Material extrusion (FFF)
Nicho folhas / UAM?
  └─ Sheet lamination
```

## FFF vs PBF polímero (heurística)

| | FFF | SLS/MJF |
|---|---|---|
| Capex | baixo–médio | alto |
| Suporte | frequentemente necessário | leito apoia |
| Superfície | camadas visíveis | granular |
| Operação | maker/prosumer | industrial |

## Metal: LPBF vs BJ vs DED

| | LPBF | BJ metal | DED/WAAM |
|---|---|---|---|
| Densidade as-built | alta | via sinter | variável |
| Detalhe | alto | médio | baixo–médio |
| Envelope | limitado | leito + forno | grande |
| Reparo | raro | não típico | forte |

## Segurança na escolha

Qualquer rota a pó/metal eleva `safety_level` — ver [hazard.metal-powder](../15-seguranca-e-meio-ambiente/pos-metais-e-risco-explosao.md). Claims food/medical: [limites de qualificação](../18-aplicacoes-e-regulacao/limites-de-qualificacao.md).

## Fontes

- [source.iso-astm-52900-entry](../22-fontes/iso-astm-52900-entry.md)

## Lacunas

- Defeitos resina e materiais fotopolímeros atômicos ainda rasos
- Custos unitários e tolerâncias numéricas por setor: não pinados
