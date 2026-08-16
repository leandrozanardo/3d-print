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
last_reviewed: '2026-08-16'
review_cycle: 6-months
sources:
- source.bambu-a1-mini-tech-specs
- source.bambu-wiki-a1-mini
- source.bambu-lab-official-products
- source.bambu-a1-mini-wiki-nozzle-clog
- source.bambu-a1-mini-wiki-blob
- source.bambu-a1-mini-wiki-clump-detect
related:
- nozzle.0.4mm-fff
- material.pla
- material.petg
- tech.fff
- manufacturer.bambu-lab
- hub.impressoras
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
| Nozzle incluso | 0,4 mm ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) | também lista 0,2 / 0,6 / 0,8 mm ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) |
| Max hotend temp | 300 °C ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) | capability ≠ compatibilidade de polímero |
| Max bed temp | 80 °C ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) | limite duro desta máquina |
| Max toolhead speed | 500 mm ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md))/s ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) | marketing/capability |
| Max acceleration | 10 000 mm ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md))/s² ([tech specs A1 mini](../22-fontes/bambu-a1-mini-tech-specs.md)) | marketing/capability |

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
| Not Recommended | ABS, ASA, PC, PA, PET, CF/GF reinforced |

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

### Evidência comunitária (separada)

- Não usada como root-cause primária nesta revisão.
- Relatos de fórum/Reddit: classificados como **relato isolado / não usados** como root-cause primária (não misturar com evidência oficial da tabela acima).

### Validação da solução

1. Reproduzir sintoma em cupom pequeno.
2. Seguir árvore oficial wiki correspondente.
3. Registrar se a correção restaurou extrusão/adesão sem novo blob.
4. Parar se houver risco térmico/elétrico além do guia oficial.


## Fontes

- [source.bambu-a1-mini-wiki-clump-detect](../22-fontes/bambu-a1-mini-wiki-clump-detect.md)

- [source.bambu-a1-mini-wiki-blob](../22-fontes/bambu-a1-mini-wiki-blob.md)

- [source.bambu-a1-mini-wiki-nozzle-clog](../22-fontes/bambu-a1-mini-wiki-nozzle-clog.md)

- [source.bambu-a1-mini-tech-specs](../22-fontes/bambu-a1-mini-tech-specs.md) — capabilities oficiais
- [source.bambu-wiki-a1-mini](../22-fontes/bambu-wiki-a1-mini.md) — onboarding
- [source.bambu-lab-official-products](../22-fontes/bambu-lab-official-products.md) — descoberta de catálogo
- Loja US (evidência de compra): https://us.store.bambulab.com/products/a1-mini

## Lacunas

### Residual (não bloqueia troubleshooting-mapped)

Known issues oficiais (wiki) já mapeados acima; itens abaixo são gaps de inventário/pinagem, não ausência de troubleshooting.

- model_number / SKU regionais pinados
- Firmware version + release notes datados
- Service manual / error code map completo
- Hardware revision por serial
- AMS lite como página atômica
- Medições locais (volumetric max / resonance) nesta unidade

## Relação com legado

Conteúdo operacional anterior em inglês: [projeto/hardware/a1-mini-visao-geral.md](../projeto/hardware/a1-mini-visao-geral.md). Esta página é a candidata canônica pt-BR.
