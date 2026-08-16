---
id: "setting.line-width"
title: "Largura de linha (line width)"
summary: "Largura de linha é a largura horizontal alvo do cordão extrudado. Afeta sobreposição de perímetros, adesão entre walls, preenchimento de tops e aparência. No Bambu Studio aparece como Line width (e subcampos por tipo de linha); nomes de UI mudam — busque o conceito. Valores costumam orbitar o diâmetro do nozzle (± margem); extremos demais causam under/over-extrusion aparente. Validar com cupom e preview."
doc_type: "setting"
domain: ["slicing", "fff", "quality"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "slicer.bambu-studio", "nozzle-0.4mm"]
not_for: ["resin-pixel-size", "eternal-ui-path-pinning"]
settings: ["setting.line-width"]
slicers: ["slicer.bambu-studio"]
printers: ["printer.bambu-lab-a1-mini"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.ellis-print-tuning-guide"]
related: ["setting.layer-height", "setting.walls-shells", "setting.infill", "defect.fff.under-extrusion"]
prerequisites: ["tech.fff"]
supersedes: []
aliases_pt_br: ["largura de linha", "largura de extrusão"]
aliases_en: ["line width", "extrusion width"]
tags: ["setting", "line-width", "slicer"]
---

# Largura de linha (line width)

Hub pai: [Settings](INDEX.md)

## Conceito semântico

**Line width** = largura planejada do cordão no plano XY. O slicer calcula fluxo para depositar essa largura à altura de camada e velocidade dadas. Perímetros, infill, top/bottom e first layer podem ter larguras distintas.

## Nomes no Bambu Studio (notas)

Procure **Line width** e variantes (Default / Wall / Infill / Top / First layer). A organização em abas muda entre versões — use a busca do Studio; não trate um path de menu antigo como canônico eterno.

## Unidade / tipo

Comprimento (mm). Com nozzle 0,4 mm, valores próximos de 0,40–0,55 mm são comuns como partida — **validar**; não copiar cegamente.

## Mecanismo

Largura maior → mais material por passada → melhor “ponte” entre gaps pequenos, mas pode obliterar detalhes finos e exigir mais volumetric. Largura menor → mais detalhe lateral, risco de falhas de união se overlap insuficiente.

## Dependências

- Diâmetro do nozzle (hard limit prático)
- [Altura de camada](altura-de-camada.md)
- [Paredes](paredes-e-cascas.md) e [infill](preenchimento.md)
- Flow/PA (pressure advance) após mudanças grandes

## Efeitos

| Direção | Efeito típico |
|---|---|
| ↑ width | união mais robusta; menos tempo em alguns casos; menos detalhe fino |
| ↓ width | mais detalhe; mais passes; risco de gaps se flow/speed inadequados |

## Sintomas

- Fendas entre perímetros → width baixa, flow baixo, ou temp — ver [subextrusão](../../12-problemas-e-diagnostico/fff/subextrusao.md)
- Detalhe engordado / letras fechadas → width/H altos ou over-extrusion
- Tops com buracos → top width/infill overlap + camadas de solid

## Heurísticas

1. Comece no preset A1 Mini do material
2. Altere width com objetivo (força de shell vs detalhe), uma família de linhas por vez
3. Confira **preview** de walls antes de imprimir
4. Recalibre flow se mudar width de forma agressiva

## Relações com outros conceitos

- couples-with → layer height, walls, flow
- trades-off-with → detalhe vs robustez de união
- diagnosed-via → preview + cupom de parede simples

## Veja também

- [Altura de camada](altura-de-camada.md)
- [Paredes e cascas](paredes-e-cascas.md)
- [Ellis Print Tuning Guide](../../22-fontes/ellis-print-tuning-guide.md)

## Fontes

- Metodologia de tuning (Ellis / comunidade calibrada) — heurística
- Presets Bambu Studio A1 Mini — ponto de partida por material

## Lacunas

- Tabela width × nozzle 0,2/0,6/0,8 quando forem canônicos
- Interação com Arachne vs clássico (se aplicável à versão)
