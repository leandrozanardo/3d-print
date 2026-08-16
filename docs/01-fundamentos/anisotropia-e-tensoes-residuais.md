---
id: "fund.anisotropy"
title: "Anisotropia e tensões residuais"
summary: "Por que peças aditivas raramente são isotrópicas: bonding entre camadas, orientação de fibras/cordões e tensões residuais de solidificação e gradientes térmicos. Orienta decisões de orientação, design e diagnóstico sem inventar valores de resistência universais."
doc_type: "concept"
domain: ["fundamentals", "mechanics"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "structural-parts", "orientation-decisions"]
not_for: ["certified-structural-allowables", "aerospace-qualification"]
materials: ["material.pla", "material.petg"]
printers: []
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "caution"
confidence: "medium"
last_reviewed: "2026-08-15"
review_cycle: "12-months"
sources: ["source.ellis-print-tuning-guide", "source.iso-astm-52900-entry"]
related: ["fund.layers-resolution-accuracy", "defect.fff.warping", "material.pla"]
prerequisites: ["fund.terminology"]
aliases_pt_br: ["anisotropia", "tensões residuais", "resistência entre camadas"]
aliases_en: ["anisotropy", "residual stress", "interlayer strength", "Z strength"]
tags: ["fundamentals", "mechanics", "anisotropy", "fff"]
---

# Anisotropia e tensões residuais

Hub pai: [Fundamentos](INDEX.md)

## O que é

**Anisotropia** significa que propriedades mecânicas (e às vezes térmicas/elétricas) dependem da **direção**. Em AM, a direção de construção e o toolpath criam planos preferenciais de falha.

**Tensões residuais** são tensões que permanecem na peça após o processo, tipicamente por contração diferencial, gradientes de temperatura e restrição (adesão à mesa, geometrias longas). Elas alimentam **empenamento**, delaminação e distorção dimensional.

Não há um único número de “resistência Z do PLA” válido para todos os SKUs, machines e settings. Use esta página para **raciocínio e priorização**, e valide com ensaio no contexto real quando a peça for estrutural.

## Por que FFF é anisotrópico

1. Cordões são depositados quentes e resfriam
2. A união **entre camadas** (e entre cordões vizinhos) depende de tempo, temperatura, pressão e química de superfície
3. Cooling agressivo melhora overhang, mas pode enfraquecer bonding
4. Infill esparso e poucas paredes criam caminhos de falha óbvios

Heurística frequente (não lei): falha sob tração tende a aparecer primeiro no eixo Z / interface de camada. Cisalhamento e impacto seguem a orientação das paredes.

## Tensões residuais no dia a dia FFF

| Sintoma | Mecanismo típico | Primeiras alavancas |
|---|---|---|
| Cantos levantam | contração + restrição na mesa | first layer, drafts, brim, material, splits — [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md) |
| Rachadura entre camadas | bonding fraco + tensão | temp contextual, cooling, velocidade, umidade |
| Peça “torcida” após soltar | liberação de tensão residual | orientação, geometria, resfriamento lento controlado (contextual) |
| Delaminação em cantiléver | momento + Z fraco | reorientar carga para XY / paredes |

## Orientação: a decisão de maior alavancagem

Antes de “mais infill”:

1. Coloque **cargas de tração principais** alinhadas às paredes/cordões (XY), não atravessando camadas
2. Aceite compromisso cosmético vs estrutural
3. Considere dividir a peça e unir com parafusos/cola se a orientação única for impossível

Para peças decorativas, anisotropia ainda importa em clips e engates finos.

## Design rules ligadas a anisotropia

- Evitar seções mínimas carregadas em Z
- Preferir filetes a cantos vivos em zonas de tensão
- Não confundir **densidade de infill** com **resistência de parede** — muitas vezes paredes extras vencem infill denso (heurística geométrica)
- Furos e rasgos: orientação altera ovalização e resistência à tração no parafuso

## Outras tecnologias (visão rápida)

| Tecnologia | Anisotropia / tensão — nota |
|---|---|
| Vat photopolymerization | Menor “camada óbvia” visualmente; propriedades ainda dependem de cura, orientação e pós-cura |
| Powder bed fusion (polímero/metal) | Orientação e estratégia de scan/recoating; metais: tensões altas, frequentemente stress relief |
| DED | Passes e HAZ; distorção e residual stress são centrais |
| Binder jetting | Estado verde frágil; densificação no sinter muda dimensões e tensões |

Não copie regras de FFF para metal PBF sem adaptação.

## O que não fazer

- Publicar allowables estruturais sem ensaio e rastreabilidade
- Afirmar isotropia porque “o slicer tem gyroid”
- Subir temperatura “no máximo” para bonding sem olhar degradação, stringing e TDS
- Ignorar umidade: filamento úmido altera bonding e poros

## Segurança e uso estrutural

Peças AM em aplicações de segurança (suporte de carga humana, pressão, medical) exigem processo qualificado. Esta base **não certifica**. Declare limites e peça validação experimental.

## Relações

- causes → warping, delaminação, distorção
- constrains → orientação e DfAM
- related → [PLA](../05-materiais/fff/pla.md), [PETG](../05-materiais/fff/petg.md), [camadas](camadas-resolucao-precisao.md)

## Fontes

- [source.ellis-print-tuning-guide](../22-fontes/ellis-print-tuning-guide.md) (tuning / processo FFF)
- [source.iso-astm-52900-entry](../22-fontes/iso-astm-52900-entry.md) (terminologia AM)

## Lacunas

- Cupons de tração XY vs Z documentados no projeto
- Efeito quantificado de cooling vs bonding para PLA/PETG na A1 Mini
- Página dedicada a stress relief em metal AM
