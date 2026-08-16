---
id: "setting.walls-shells"
title: "Paredes e cascas (walls / perimeters / shells)"
summary: "Paredes (perímetros, shells) são os contornos sólidos que formam a pele da peça. Número de walls e espessura de top/bottom dominam resistência prática e acabamento mais que infill esparso em muitos casos. No Bambu Studio: Wall loops / top-bottom shell thickness (nomes variam). Conceito: casca contínua vs núcleo; validar espessura mínima para furos e carga. Não confundir com infill percentual."
doc_type: "setting"
domain: ["slicing", "fff", "strength"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "slicer.bambu-studio"]
not_for: ["infill-percent-as-shell-substitute", "eternal-ui-path-pinning"]
settings: ["setting.walls-shells"]
slicers: ["slicer.bambu-studio"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: []
related: ["setting.infill", "setting.line-width", "setting.layer-height", "material.pla", "material.petg"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["paredes", "perímetros", "cascas", "shells"]
aliases_en: ["walls", "perimeters", "shells", "wall loops", "top bottom shells"]
tags: ["setting", "walls", "strength"]
---

# Paredes e cascas (walls / shells)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

**Walls / perimeters** = circuitos externos (e internos de buracos) sólidos. **Top/bottom shells** = camadas sólidas que fecham teto e piso. Juntos formam a **casca**. O núcleo pode ser [preenchimento](preenchimento.md) esparso.

Heurística suportada (escopo FFF desktop): para resistência sob flexão/impacto, **adicionar walls** frequentemente supera só subir infill de 15%→40% — validar na geometria e orientação de carga.

## Nomes no Bambu Studio (notas)

Busque **Wall loops**, **Top shell**, **Bottom shell**, espessuras em mm ou contagem de camadas. Rótulos e abas mudam; o conceito permanece.

## Unidade / tipo

Contagem (loops) e/ou mm de casca. Depende de [line width](largura-de-linha.md) e [layer height](altura-de-camada.md).

## Mecanismo

Cada wall adiciona um caminho contínuo de polímero na direção do perímetro. Cargas no plano XY e torsão se beneficiam de casca espessa. Cargas em Z ainda limitadas pela solda entre camadas — orientação importa.

## Dependências

- Line width × loops ≈ espessura de parede
- Solid top/bottom precisa de infill de suporte adequado sob o teto
- Cooling/temp afetam brilho e bonding da wall externa — [cooling](cooling.md), [temperaturas](temperaturas.md)

## Efeitos

| ↑ walls / shells | ↓ walls |
|---|---|
| Mais resistência e tempo; melhor furo tapado | Mais rápido; risco de “oco” visível e frágil |
| Melhor para clips/ferramentas | Aceitável em display oco |

## Sintomas

- Transparência / grid visível no teto → poucos tops ou infill baixo sob solid
- Quebra na pele → poucas walls para a carga
- Detalhe fino obliterado → walls+width demais em features estreitas

## Heurísticas de partida (validar)

| Propósito | Ordem de magnitude |
|---|---|
| Miniatura cosmética | 2 walls; tops suficientes para fechar |
| Ferramenta leve | 3–4+ walls; bottoms sólidos |
| Furos de parafuso | casca local espessa / modifiers |

Não tratar como especificação estrutural certificada.

## Relações com outros conceitos

- trades-off-with → [infill](preenchimento.md) (casca vs núcleo)
- couples-with → line width, orientation
- indicated-for → resistência prática desktop

## Veja também

- [Preenchimento](preenchimento.md)
- [PLA](../../05-materiais/fff/pla.md) · [PETG](../../05-materiais/fff/petg.md)

## Fontes

- Prática de design FFF / anisotropia (princípio)
- Presets Studio como baseline

## Lacunas

- Ensaios locais walls vs infill no cupom do projeto
- Página de modifiers / strength regions
