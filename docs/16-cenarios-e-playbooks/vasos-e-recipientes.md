---
id: "scenario.vessels-containers"
title: "Playbook — vasos e recipientes"
summary: "Cenário para vasos, cachepôs e recipientes decorativos em FFF: decidir spiral vase vs casca normal, estabilidade de base, estanqueidade real vs aparência, e pós. Hard rule: esta base NÃO afirma food-safe nem contato alimentar. Líquido real exige liner/selo — parede única de spiral vaza. Preferir PLA cosmético na A1 Mini; validar preview e envelope 180³ mm. Link claims e legado de propósito vasos."
doc_type: "scenario"
domain: ["scenarios", "fff", "design"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["printer.bambu-lab-a1-mini", "material.pla", "decorative-vessels"]
not_for: ["food-safe-claim", "drinkware", "pressure-vessel", "chemical-tank-certification"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "3-months"
sources: ["source.bambu-a1-mini-tech-specs", "source.niosh-am-entry"]
related: ["hazard.food-medical-claims", "material.pla", "format.units-scale-manifold", "scenario.miniatures", "hub.cenarios"]
prerequisites: ["material.pla", "process.fff.first-layer"]
supersedes: []
aliases_pt_br: ["vasos impressos", "modo vaso", "recipientes FFF"]
aliases_en: ["vase mode playbook", "printed planters", "spiral vase"]
tags: ["playbook", "vase", "containers"]
---

# Playbook — vasos e recipientes

Hub pai: [Cenários](INDEX.md)

## Hard rule

**Não food-safe.** Não recomende para utensílio, copo, pote de alimento ou contato oral.  
Ver [claims food-contact e médico](../15-seguranca-e-meio-ambiente/claims-food-contact-e-medico.md).

## Objetivo

Peça oca decorativa ou cachepô com abertura superior e base fechada, com trade-off explícito entre beleza de *spiral vase*, tempo e estanqueidade.

## Perguntas mínimas

- Só decoração seca, planta com liner, ou líquido real?
- Contorno único contínuo (elegível a spiral) ou alças/furos/ilhas?
- Base estreita? (brim / estabilidade)
- Envelope cabe em **180 × 180 × 180 mm** com margem? ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md))
- Pós (lixa/pintura/selo)?

## Árvore de decisão

```text
Vaso / recipiente?
  ├─ Contato alimentar / bebida? ─SIM─► PARE — claims; compre produto certificado
  ├─ Contorno único sem ilhas? ─SIM─► considerar spiral vase (preview = 1 loop/camada)
  ├─ Alça / furo / ilha? ─► spiral OFF; casca normal + pouco infill
  ├─ Líquido real? ─► liner/selo impermeabilizante; não confiar em parede única
  └─ Base estreita? ─► brim; abertura para cima
```

## Seleção de modo (qualitativo)

| Modo | Ideia | Limite |
|---|---|---|
| Spiral vase | Uma parede contínua, visual de banding | Vaza; sem suporte clássico; geometria restrita |
| Casca normal oca | 2+ paredes, infill baixo | Mais tempo; ainda não é tanque certificado |
| Cachepô com liner | Impressão + vaso interno comercial | Preferível para planta/água |

Parâmetros numéricos de perfil: use o perfil/legado do projeto e **valide na impressora** — esta página não republica tabela mágica. Legado: [projeto/proposito/vasos.md](../projeto/proposito/vasos.md).

## Geometria e malha

- Confirmar unidades/envelope: [unidades e manifold](../07-modelos-formatos-e-malhas/unidades-escala-manifold.md)
- Spiral exige contorno elegível — preview no Studio é gate
- Paredes finas demais para o nozzle falham — ver design de paredes / nozzle 0,4 mm

## Processo FFF (A1 Mini)

1. Perfil PLA adequado como base (cosmético)
2. Draft controlado (frame aberto) — trade warp vs emissões ([VOC](../15-seguranca-e-meio-ambiente/voc-ufp-e-ventilacao.md))
3. [Primeira camada](../10-processo-de-impressao/fff/primeira-camada.md) estável antes de peça alta
4. Velocidade de parede externa estável (espessura visual uniforme)
5. PETG só se houver motivo (tenacidade); secar; espere mais stringing interno

## Pós

- Remover brim com cuidado na borda cosméticas
- [Lixa](../14-pos-processamento/lixamento-e-acabamento.md) / [pintura](../14-pos-processamento/pintura-e-primer.md) com VOC controlado
- Impermeabilização: produto adequado ao uso **não alimentar**; siga SDS do coating
- Não annealing “para vedar” sem escopo — [annealing](../14-pos-processamento/annealing-fff.md)

## Checklist pré

- [ ] Hard rule food-contact compreendida
- [ ] Preview spiral OK **ou** modo normal consciente
- [ ] Envelope + brim dentro da mesa
- [ ] Plano de liner se houver água
- [ ] Cupom de parede se geometria nova

## Sinais de falha

| Sintoma | Ação |
|---|---|
| Spiral “quebra” no meio | Contorno extra → sair de spiral |
| Ondulação na parede | Estabilizar speed/temp/fluxo; secar |
| Tombamento | Brim / base mais larga |
| Vazamento | Esperado em spiral — liner |
| Gaps | [Subextrusão](../12-problemas-e-diagnostico/fff/subextrusao.md) / umidade |

## Segurança

- [NIOSH](../22-fontes/niosh-additive-manufacturing.md) · [EPA](../22-fontes/epa-3d-printing-research.md) para emissões
- Jobs altos: supervisione adesão inicial — [desacompanhada](../15-seguranca-e-meio-ambiente/eletrico-fogo-e-impressao-desacompanhada.md)

## Fontes

- [Bambu A1 mini tech specs](../22-fontes/bambu-a1-mini-tech-specs.md) — volume
- Legado: [vasos.md](../projeto/proposito/vasos.md), geometria de vasilhames no projeto

## Lacunas

- Coating impermeabilizante avaliado neste lab: não canônico
- Teste de vazamento padronizado: futuro
