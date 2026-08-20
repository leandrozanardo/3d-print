---
id: glossary.initial
title: Glossário inicial (AM / FFF)
summary: Glossário operacional em pt-BR com termos EN estáveis para manufatura aditiva,
  com foco no corpus FFF desktop desta base. Cada entrada tem definição curta orientada
  a decisão e links quando existir página canônica. Não substitui SDS/TDS nem normas
  completas.
doc_type: glossary
domain:
- glossary
technology: []
process: []
applies_to:
- all-am
- fff
not_for:
- legal-definitions
- complete-iso-vocabulary
knowledge_status: draft
evidence_status: mixed
safety_level: normal
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.iso-astm-52900-entry
- source.niosh-am-entry
related:
- hub.glossario
- fund.terminology
prerequisites:
- fund.terminology
aliases_pt_br:
- extrusão de material
- bico
- PEI
- overhang
- Tg
- 3MF
- STL
- G-code
- suporte
- perímetro
- parede
- SDS
- TDS
aliases_en:
- material extrusion
- nozzle
- PEI
- overhang
- Tg
- 3MF
- STL
- G-code
- support
- perimeter
- wall
- SDS
- TDS
tags:
- glossary
- fff
- am
supersedes: []
---
# Glossário inicial (AM / FFF)

Hub pai: [Glossário](INDEX.md) · Conceito pai: [Terminologia](../01-fundamentos/terminologia-manufatura-aditiva.md)

Convenção: título da seção = termo preferido; sinônimos entre parênteses. IDs de páginas canônicas quando existirem.

---

## 3MF {#term-3mf}

Formato de arquivo moderno para manufatura aditiva que pode carregar malha e metadados (materiais, cores, objetos múltiplos). Preferível a STL quando o ecossistema (CAD/slicer) preservar o fluxo. Ver [workflow digital](../01-fundamentos/workflow-digital-cad-ate-peca.md).

## A1 Mini {#term-a1-mini}

Impressora FFF de referência operacional nesta base (Bambu Lab). Página: [bambu-lab-a1-mini](../21-impressoras/bambu-lab-a1-mini.md).

## Anisotropia {#term-anisotropy}

Propriedades que dependem da direção — em FFF, tipicamente Z (entre camadas) mais fraco que XY. Página: [anisotropia e tensões residuais](../01-fundamentos/anisotropia-e-tensoes-residuais.md).

## Bambu Studio {#term-bambu-studio}

Slicer / suite de preparação de job do ecossistema Bambu Lab. Settings e nomes de parâmetros são específicos de versão — não misturar com outros slicers sem mapear.

## Bed-slinger {#term-bed-slinger}

Arquitetura em que a mesa se move em Y (ou eixo equivalente) enquanto o gantry move X/Z. Contraste com CoreXY e deltas. Impacta massas móveis e, em alguns setups, vibração/warping por drafts na mesa.

## Brim {#term-brim}

Anel de material conectado à peça na primeira camada para aumentar adesão e resistir a levantamento de cantos. Diferente de **raft** (cama separada sob a peça).

## DED {#term-ded}

*Directed energy deposition* — energia focalizada funde material na deposição. Página: [DED](../02-tecnologias/directed-energy-deposition/directed-energy-deposition.md).

## Direct drive {#term-direct-drive}

Extrusor com motor de tração próximo ao hotend (curto path de filamento). Em geral facilita retracts curtos e materiais flexíveis vs Bowden longo — validar no hardware real.

## DLP {#term-dlp}

*Digital Light Processing* — variante de vat photopolymerization que projeta a fatia de uma vez. Ver [vat photopolymerization](../02-tecnologias/vat-photopolymerization/vat-photopolymerization.md).

## Elephant foot {#term-elephant-foot}

Alargamento da base da peça por esmagamento excessivo da primeira camada ou bed muito quente. Afeta encaixes. Relacionado a [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md).

## Empenamento (warping) {#term-warping}

Distorção por contração e tensões residuais; cantos levantam da mesa. Página: [empenamento](../12-problemas-e-diagnostico/fff/empenamento.md).

## FDM {#term-fdm}

*Fused Deposition Modeling* — termo comercial/popular frequentemente usado como sinônimo de FFF. Nesta base, preferir **FFF** para o processo genérico.

## FFF {#term-fff}

*Fused Filament Fabrication* — processo de extrusão de filamento termoplástico. Página: [FFF](../02-tecnologias/material-extrusion/fff.md).

## G-code {#term-gcode}

Linguagem / fluxo de comandos de máquina gerado pelo slicer (ou equivalente nativo). Específico de firmware e cinemática — não transferir entre impressoras sem reprocessar.

## Infill {#term-infill}

Estrutura interna esparsa ou densa que preenche o volume entre paredes. Densidade alta ≠ necessariamente peça forte; paredes e orientação importam mais em muitos casos.

## Input shaping {#term-input-shaping}

Técnica de controle que atenua vibração/ressonância do movimento para reduzir ringing/ghosting em altas acelerações. Depende de calibração e modelo dinâmico da máquina.

## Layer shift {#term-layer-shift}

Deslocamento lateral de camadas por perda de passos, colisão, belts ou falha mecânica/elétrica. Peça “cortada” em XY a partir de certa altura.

## LPBF {#term-lpbf}

*Laser Powder Bed Fusion* — fusão a laser de leito de pó metálico (família PBF). Ver [powder bed fusion](../02-tecnologias/powder-bed-fusion/powder-bed-fusion.md).

## Material extrusion {#term-material-extrusion}

Categoria ISO/ASTM: material dispensado por bico. Hub: [material-extrusion](../02-tecnologias/material-extrusion/INDEX.md).

## MJF {#term-mjf}

*Multi Jet Fusion* — processo comercial de PBF polímero com agentes e energia térmica. Ver [powder bed fusion](../02-tecnologias/powder-bed-fusion/powder-bed-fusion.md).

## MSLA {#term-msla}

*Masked SLA* / LCD resin — vat photopolymerization com máscara LCD. Ver [vat](../02-tecnologias/vat-photopolymerization/vat-photopolymerization.md).

## Nozzle (bico) {#term-nozzle}

Orifício de saída do hotend; diâmetro limita feature XY e flow. Ex.: [nozzle 0,4 mm (fonte oficial / fabricante / heuristic; ver `sources`) ](../04-componentes-e-hardware/nozzle-0-4-mm-fff.md).

## Overhang {#term-overhang}

Geometria que se estende além do suporte da camada anterior; exige cooling, ângulo favorável ou **support**.

## PEI {#term-pei}

Filme/superfície de mesa (polieterimida) comum em plates FFF; favorece adesão de vários filamentos quando limpa e na temperatura adequada. Não “cura” warping sozinha.

## Perimeter / wall (perímetro / parede) {#term-wall}

Contornos sólidos externos/internos da peça. Contagem de paredes costuma dominar resistência e qualidade de superfície vs infill.

## PETG {#term-petg}

Família de filamento copoliéster comum em FFF; mais tenaz/térmico que muitos PLAs de consumo, com trade-offs de stringing e adesão. Página: [PETG](../05-materiais/fff/petg.md).

## PLA {#term-pla}

Família de filamento de entrada em FFF. Página: [PLA](../05-materiais/fff/pla.md).

## Pressure advance {#term-pressure-advance}

Compensação de pressão no hotend para cantos e mudanças de velocidade (nomes variam: linear advance, etc.). Reduz bulging/under-extrusion em transientes — calibrar por material/hotend.

## Primeira camada (first layer) {#term-first-layer}

Camada inicial sobre a mesa; define adesão do resto do job. Página: [primeira camada](../10-processo-de-impressao/fff/primeira-camada.md).

## Raft {#term-raft}

Grade/cama sacrificial sob a peça para adesão ou superfícies irregulares. Consome material/tempo e deixa textura na base; brim costuma ser menos invasivo quando basta.

## SDS {#term-sds}

*Safety Data Sheet* — ficha de segurança do produto (riscos, EPI, derramamento, descarte). Obrigatória leitura para resinas/pós/químicos; não confundir com TDS.

## SLA {#term-sla}

Estereolitografia — vat photopolymerization com laser (uso amplo do termo). Ver [vat](../02-tecnologias/vat-photopolymerization/vat-photopolymerization.md).

## SLS {#term-sls}

*Selective Laser Sintering* — PBF de polímero com laser. Ver [powder bed fusion](../02-tecnologias/powder-bed-fusion/powder-bed-fusion.md).

## STL {#term-stl}

Formato de malha triangular legado para intercâmbio 3D. Sem metadados ricos de 3MF; qualidade depende da tessellação.

## Spaghetti {#term-spaghetti}

Novelo de filamento no ar quando o nozzle segue o G-code após a peça descolar, um overhang colapsar ou o bico derrubar o modelo. Distinto de stringing (fios finos com a peça no lugar). Página: [spaghetti](../12-problemas-e-diagnostico/fff/spaghetti.md).

## Stringing {#term-stringing}

Fios finos entre regiões por vazamento do nozzle em deslocamentos. Hipóteses: umidade, temperatura alta, retract inadequado — validar no contexto.

## Support (suporte) {#term-support}

Estrutura sacrificial para overhangs/bridges. Em FFF: interface e padrão importam; em PBF polímero o pó pode auto-suportar; em metal PBF suportes são estruturais/térmicos.

## TDS {#term-tds}

*Technical Data Sheet* — dados técnicos do produto (process window, propriedades sob condições de ensaio). Subordinar settings ao TDS/perfil do SKU; não universalizar.

## Tg {#term-tg}

Temperatura de transição vítrea — região em que o polímero amorfo amolece. Valores dependem da formulação e do método de medida; não usar um número de blog como limite de serviço de todos os PLAs.

## UFP {#term-ufp}

*Ultrafine particles* — partículas ultrafinas emitidas em alguns processos AM (incl. FFF aquecido). Ver [NIOSH AM](../22-fontes/niosh-additive-manufacturing.md) e práticas de ventilação.

## VOC {#term-voc}

*Volatile organic compounds* — compostos orgânicos voláteis em emissões. Relevante em FFF, resinas e solventes de lavagem. Fonte de orientação: [NIOSH AM](../22-fontes/niosh-additive-manufacturing.md).

## WAAM {#term-waam}

*Wire Arc Additive Manufacturing* — DED baseado em arco e arame. Ver [DED](../02-tecnologias/directed-energy-deposition/directed-energy-deposition.md).

---

## Como usar este glossário

1. Normalizar a linguagem do usuário (ex.: FDM → FFF)
2. Seguir o link canônico quando existir
3. Não inventar números a partir da definição curta
4. Para segurança química, abrir **SDS** do produto — não este glossário

## Lacunas

- Termos de calibração avançada (flow rate, PA tower) em páginas próprias
- Glossário metálico (HIP, hatch, recoater) expandido
- Equivalências de nomes de settings entre slicers
