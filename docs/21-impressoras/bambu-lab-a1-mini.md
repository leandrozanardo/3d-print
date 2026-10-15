---
id: printer.bambu-lab-a1-mini
title: Bambu Lab A1 Mini
summary: A Bambu Lab A1 Mini é uma impressora FFF compacta tipo bed-slinger com volume
  oficial 180×180×180 mm, extrusor direct drive, nozzle 0,4 mm incluso e mesa aquecida
  até 80 °C. Opera em frame aberto. O fabricante lista PLA, PETG, TPU e PVA como ideais
  e marca ABS/ASA/PC/PA e vários reforçados como não recomendados. Lifecycle current
  sustentado pela loja oficial US (acesso 2026-08-16).
doc_type: printer
domain:
- printers
- fff
technology:
- material-extrusion
process:
- fff
applies_to:
- bambu-lab-a1-mini
- bambu-studio
not_for:
- heated-chamber-materials-as-default
- x1c-speed-presets-unadapted
printers:
- printer.bambu-lab-a1-mini
slicers:
- slicer.bambu-studio
materials:
- material.pla
- material.petg
knowledge_status: draft
lifecycle: current
coverage_level: troubleshooting-mapped
evidence_status: manufacturer-specific
safety_level: caution
confidence: high
last_reviewed: '2026-10-15'
review_cycle: 6-months
sources:
- source.bambu-a1-mini-tech-specs
- source.bambu-wiki-a1-mini
- source.bambu-lab-official-products
- source.bambu-a1-mini-wiki-nozzle-clog
- source.bambu-a1-mini-wiki-blob
- source.bambu-a1-mini-wiki-clump-detect
- source.bambu-forum-a1-mini-patterns
- source.makerworld-profile-patterns
related:
- nozzle.0.4mm-fff
- material.pla
- material.petg
- tech.fff
- manufacturer.bambu-lab
- hub.impressoras
- slicer.bambu-studio
prerequisites:
- tech.fff
supersedes: []
aliases_pt_br:
- A1 Mini
- A1 mini
aliases_en:
- Bambu Lab A1 mini
- A1 mini
tags:
- printer
- bambu
- bed-slinger
- documented
manufacturer_id: bambu-lab
model_name: A1 mini
family_status: a-series
lifecycle_observed_at: '2026-08-16'
regions:
- US
availability_evidence: Listed for immediate purchase on official Bambu Lab US store
  product page https://us.store.bambulab.com/products/a1-mini (accessed 2026-08-16).
---
# Bambu Lab A1 Mini

Hub pai: [Impressoras](INDEX.md) · Fabricante: [Bambu Lab](manufacturer-bambu-lab.md)

## Identidade

| Campo | Valor |
|---|---|
| Fabricante | Bambu Lab (`manufacturer.bambu-lab`) |
| Modelo | A1 mini |
| Família | A-series (`family_status: a-series`) |
| Variantes conhecidas | A1 mini; A1 mini Combo (AMS lite) |
| SKU / model_number | unknown (não pinado nesta revisão) |
| Regiões observadas | US (loja oficial) |
| Aliases | A1 Mini, A1 mini |

## Lifecycle

| Campo | Valor |
|---|---|
| lifecycle | `current` |
| lifecycle_observed_at | 2026-08-16 |
| região | US |
| sinal de disponibilidade | listagem com compra imediata na loja oficial US |
| URL de evidência | https://us.store.bambulab.com/products/a1-mini |
| confiança | high |

**Não confundir:** página de marketing ainda online ≠ current; neste caso a loja oficial US oferece compra imediata na data de observação.

## Evidence locator

| Campo | Valor |
|---|---|
| source id | `source.bambu-lab-official-products` + loja US |
| URL exata (compra) | https://us.store.bambulab.com/products/a1-mini |
| URL specs | https://bambulab.com/en/a1-mini/tech-specs |
| nome observado | Bambu Lab A1 mini |
| data de acesso | 2026-08-16 |
| availability signal | add-to-cart / buy now na loja US |
| lifecycle result | `current` |
| nota | Revalidação de tech-specs em 2026-08-16 encontrou Cloudflare challenge (`blocked` temporário); claims numéricos abaixo usam acesso prévio 2026-08-15 + source page |

## Escopo e exclusões

**Inclui:** identidade, lifecycle US, capabilities oficiais A1 mini, limites de material do fabricante, links a manuais/wiki, lacunas explícitas.

**Exclui:** transferir presets de X1C/P1 sem adaptação; assumir câmara aquecida; tratar “Not Recommended” como impossibilidade física absoluta; inventar firmware pinado por serial.

## Especificações

Valores oficiais da página de Technical Specifications ([source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md)), acesso editorial 2026-08-15:

| Capability | Valor oficial | Papel |
|---|---|---|
| Build volume | 180 × 180 × 180 mm | envelope máximo; deixar margem operacional |
| Nozzle incluso | 0,4 mm stainless | opções 0,2 / 0,6 / 0,8; hardened para CF/GF (FAQ) |
| Max hotend temp | 300 °C ([source.bambu-wiki-a1-mini](../22-fontes/bambu-wiki-a1-mini.md) FAQ) | capability ≠ compatibilidade de polímero |
| Max bed temp | 80 °C | limite duro desta máquina |
| Max toolhead speed | 500 mm/s | marketing/capability (tech specs) |
| Max acceleration | 10 000 mm/s² | marketing/capability (tech specs / product page) |

## Tecnologia

- Processo: FFF / material extrusion (`tech.fff`)
- Arquitetura: bed-slinger (mesa móvel em Y)
- Extrusão: direct drive
- Frame: aberto (sem câmara aquecida nativa)

## Manuais

- Wiki / quick start do fabricante: [source.bambu-wiki-a1-mini](../22-fontes/bambu-wiki-a1-mini.md)
- Legado convertido (não canônico): [printers/A1mini](../printers/A1mini/INDEX.md)
- Service manual público completo: lacuna

## Hardware

- Hotend all-metal (posição do ecossistema Bambu; detalhes de revisão por serial: lacuna)
- Placa PEI magnética
- Sensores listados nas specs: runout, odometry, tangle, power-loss recover, câmera low framerate
- Revisões de hardware pinadas: unknown

## Software

- Ecossistema: Bambu Studio / app Bambu
- Conta cloud / rede: seguir política de privacidade do fabricante (não expandido aqui)

## Firmware

- Canal oficial de release notes: não pinado nesta revisão (lacuna)
- Não inventar versão de firmware sem captura datada

## Slicer

- Primário: [Bambu Studio](../08-slicers-e-configuracoes/bambu-studio.md) (`slicer.bambu-studio`)
- Regra: começar de presets **A1 Mini**, não colar perfil de X1C/P1 sem revisão

## Materiais

Posição do fabricante nas tech specs:

| Classe | Materiais |
|---|---|
| Ideal | PLA, PETG, TPU, PVA |
| Not Recommended | ABS, ASA, PC, PA, PET; CF/GF abrasive no nozzle stainless (FAQ: hardened steel se insistir) |

FAQ (2026-10-15): frame aberto → ABS/ASA/PC/PA/PET tendem a warp, detach e fraqueza em Z. AMS lite: não usar TPU/TPE/PVA absorvente nem CF/GF frágeis no AMS — spool externo.

Páginas canônicas relacionadas: [PLA](../05-materiais/fff/pla.md), [PETG](../05-materiais/fff/petg.md). TDS/SDS do filamento não são substituídos por esta página.

## Manutenção

- Rotina preventiva dedicada: [a1-mini-rotina-preventiva](../13-manutencao/a1-mini-rotina-preventiva.md)
- Limpeza de placa, inspeção de nozzle e verificação de vibração: ver rotina + lacunas locais

## Segurança

- Superfícies quentes (hotend/bed)
- Partes móveis
- Impressão desacompanhada: risco residual de falha catastrófica (blob) — monitoramento recomendado
- Emissões/VOC/particulados: mesmo PLA/PETG variam; ver hub de segurança (cobertura parcial)
- Critérios de parada: odor anômalo intenso, fumaça, blob no hotend, colisão repetida, overheat reportado pelo firmware

## Known issues

Pesquisa oficial Bambu Wiki (acesso 2026-08-16). Comunidade não misturada como prova primária.

| Tema | Classificação | Fonte oficial | Correção / validação |
|---|---|---|---|
| Nozzle / hotend clog (incl. heat creep) | causa mecânica/térmica comum | [wiki nozzle clog](https://wiki.bambulab.com/en/a1-mini/troubleshooting/nozzle-clog) | pin tool / cold pull / substituir hotend; validar extrusão manual |
| Extrusão anormal (subextrusão, click do extruder) | diagnóstico em árvore | [wiki extrusion abnormal](https://wiki.bambulab.com/en/a1-mini/troubleshooting/how-to-check-which-part-is-clogged) | isolar hotend vs extruder vs first-layer too close |
| Hotend blob / clumping | falha de adesão → acúmulo no hotend | [wiki blob](https://wiki.bambulab.com/en/a1-mini/maintenance/hotend_blob) | limpeza em maintenance mode; prevenir com placa limpa |
| Nozzle clumping detection / HMS | sensor de força; falsos positivos possíveis | [wiki detection](https://wiki.bambulab.com/en/a1-mini/manual/nozzle-warp-detection) | inspecionar nozzle/placa; não desligar detecção permanentemente sem causa |
| Empenamento / corrente de ar (frame aberto) | hipótese de processo | playbook local + limites bed 80 °C | isolar ambiente; validar cupom |

### Evidência comunitária (classificada — não root-cause de hardware)

Síntese pinada em [source.bambu-forum-a1-mini-patterns](../22-fontes/bambu-forum-a1-mini-patterns.md). **Nunca** hard safety.

| Padrão | Classe | Ação operacional |
|---|---|---|
| PEI: sabão + água quente; evitar óleo dos dedos; IPA sozinho redistribui gordura | supported heuristic | Ver [falha-adesao](../projeto/troubleshooting/falha-adesao.md) |
| PETG: secar antes de caçar stringing; cooling alto prejudica bond | supported heuristic | [stringing](../projeto/qualidade-e-acabamento/stringing-e-retract.md) |
| Avoid Crossing Walls / wall order em PETG | community hypothesis → validate | Bambu Studio Quality → Advanced |
| Não colar cooling/speed de X1C | supported heuristic | Preset **A1 Mini** only |
| Textured bed ~+5 °C vs smooth | community hypothesis | Cupom de adesão |

Playbook MakerWorld → receita: [projeto/workflow/makerworld-para-receita.md](../projeto/workflow/makerworld-para-receita.md).

### Validação da solução

1. Reproduzir sintoma em cupom pequeno.
2. Seguir árvore oficial wiki correspondente para hardware.
3. Para processo/qualidade: uma variável + classe de evidência.
4. Registrar se a correção restaurou extrusão/adesão sem novo blob.
5. Parar se houver risco térmico/elétrico além do guia oficial.


## Fontes

- [source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md) — capabilities oficiais
- [source.bambu-wiki-a1-mini](../22-fontes/bambu-wiki-a1-mini.md) — onboarding / FAQ
- [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) — descoberta de catálogo
- [source.bambu-forum-a1-mini-patterns](../22-fontes/bambu-forum-a1-mini-patterns.md) — padrões comunitários
- [source.makerworld-profile-patterns](../22-fontes/makerworld-profile-patterns.md) — remap de 3MF
- Loja US (evidência de compra): https://us.store.bambulab.com/products/a1-mini

## Lacunas

- model_number / SKU regionais pinados
- Firmware version + release notes datados
- Service manual / error code map completo
- Hardware revision por serial
- AMS lite como página atômica canônica
- Medições locais (volumetric max / resonance) nesta unidade

## Relação com legado / optimization wiki

- Hardware legado EN: [projeto/hardware/a1-mini-visao-geral.md](../projeto/hardware/a1-mini-visao-geral.md)
- Optimization hub: [projeto/INDEX.md](../projeto/INDEX.md)
- Playbook MakerWorld: [projeto/workflow/makerworld-para-receita.md](../projeto/workflow/makerworld-para-receita.md)

Esta página é a candidata canônica pt-BR para identidade/limits; receitas operacionais vivem em `docs/projeto/`.
