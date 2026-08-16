---
id: "design.supports-fff"
title: "Suportes em FFF (normal vs tree)"
summary: "Suportes em FFF sustentam overhangs e pontes que a geometria/orientação não resolvem. Normal (grid/retilíneo) e tree (árvore) trocam previsibilidade, consumo de material, tempo e padrão de cicatriz. Decida primeiro se dá para reorientar ou redesenhar; depois tipo de suporte, densidade, interface e acesso para remoção. Cicatrizes em faces A são falha de planejamento, não só de setting."
doc_type: "design"
domain: ["dfam", "fff", "slicers"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini", "slicer.bambu-studio"]
not_for: ["zero-scar-guarantee", "support-as-substitute-for-bad-orientation"]
printers: ["printer.bambu-lab-a1-mini"]
slicers: ["slicer.bambu-studio"]
materials: ["material.pla", "material.petg"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "normal"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.bambu-a1-mini-tech-specs"]
related: ["design.orientation-fff", "slicer.bambu-studio", "process.fff.first-layer", "material.pla", "material.petg", "component.part-cooling"]
prerequisites: ["design.orientation-fff"]
supersedes: []
aliases_pt_br: ["suportes FFF", "support FFF", "suporte árvore"]
aliases_en: ["supports", "tree supports", "normal supports", "organic supports"]
tags: ["supports", "dfam", "fff"]
---

# Suportes em FFF (normal vs tree)

Hub pai: [Design para impressão 3D](INDEX.md)

## O que é

**Suportes** são estruturas descartáveis geradas pelo slicer (ou modeladas) para sustentar material sobre vazio: overhangs, pontes longas, ilhas e arcos. Em FFF o suporte toca a peça numa **interface**; remover deixa **cicatriz** (scar) e pode danificar detalhes finos.

## Quando usar / quando evitar

**Usar quando:** preview mostra overhangs que falharão mesmo com cooling adequado; ilhas sem caminho de construção; orientação já otimizada.

**Evitar / reduzir quando:** dá para [reorientar](orientacao-fff.md); dá para chanfro/filete; dá para dividir a peça; a face tocada é cosmética crítica e não há acesso de remoção.

## Normal vs tree (decisão)

| Aspecto | Normal (grid / snug / retangular) | Tree (organic / árvore) |
|---|---|---|
| Forma | Colunas/paredes sob a região | Ramos desde a mesa ou peça até o ponto |
| Previsibilidade | Alta; fácil de entender no preview | Depende do algoritmo/versão do Studio |
| Material / tempo | Pode ser pesado em áreas largas | Frequentemente mais leve em overhangs locais |
| Cicatriz | Padrão regular sob a face | Pontos de contato menores (ainda cicatriz) |
| Remoção | Às vezes “tijolo” difícil em cavidades | Ramos quebram; cuidado com galhos dentro de furos |
| Melhor para | Bases largas, engenharia previsível | Miniaturas, detalhes, menos volume de suporte |

**Regra prática:** peça técnica com faces planas inferiores → comece **normal**; figura/miniatura/overhangs pontuais → avalie **tree**. Sempre inspecionar preview de contato.

Paths e nomes exatos variam por versão do [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md) — declare a versão ao diagnosticar.

## Acesso e remoção

1. Planeje **ferramenta e ângulo** de remoção antes de fatiar (alicate de bico, pinça, estilete com cuidado).
2. Cavidades fechadas: suporte interno sem acesso = peça refém; redesenhe furos de escape ou split.
3. Interface Z (gap / top Z distance) e densidade de interface: ↑ gap → remove mais fácil, piora qualidade da face inferior; ↓ gap → melhor face, solda no suporte. **Validar no material** (PLA vs PETG: PETG tende a grudar mais).
4. Remova suporte **frio**; em PETG evite forçar contra [PEI](../04-componentes-e-hardware/placa-pei-fff.md) se a peça ainda estiver na mesa.
5. Lixe/apare cicatrizes só após confirmar dimensões críticas.

## Cicatrizes (scars) — o que aceitar

| Situação | Decisão |
|---|---|
| Face A cosmética | Zero suporte nessa face; oriente ou use sacrificial face |
| Face B oculta / fundo | Aceitar scar; priorizar remoção fácil |
| Encaixe dimensional | Evitar suporte na superfície de mate; ou pós-processar e medir |
| Pintura | Scar pode aparecer sob tinta fina — teste cupom |

Cooling alto ajuda overhangs **sem** suporte em PLA; não substitui suporte estrutural — ver [cooling de peça](../04-componentes-e-hardware/cooling-de-peca-fff.md).

## Envelope A1 Mini

Volume oficial 180³ mm ([tech specs](../22-fontes/bambu-a1-mini-tech-specs.md)). Tree/normal + brim podem estourar a margem: no arrange, confirme bounding box.

## Fluxo de decisão

```text
Dá para orientar/redesenhar sem suporte?
  ├─ SIM → faça isso (design.orientation-fff)
  └─ NÃO → face tocada é crítica?
        ├─ SIM → sacrificial surface / split / tree com contato mínimo
        └─ NÃO → normal se área larga; tree se pontos locais
Acesso de remoção existe?
  ├─ NÃO → redesenhar
  └─ SIM → fatiar → preview contato → cupom se lote
```

## Segurança

- Lâminas e força: risco de corte e quebra de peça com pontas.
- Não “queimar” suporte com nozzle como hábito.

## Relações

- depends-on → [orientação](orientacao-fff.md)
- configured-by → [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md)
- trades-off-with → tempo, material, cicatriz, resistência local

## Fontes

- [source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md) (envelope)
- Comportamento tree/normal: documentação do slicer na versão em uso + preview empírico

## Lacunas

- Átomo `setting.support-*` com defaults seguros por material
- Soluble supports (PVA) — Ideal na A1 Mini segundo fabricante, mas fluxo AMS/dual ainda não canônico aqui
- Paint-on supports como procedimento passo a passo por versão
