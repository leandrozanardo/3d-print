---
id: hazard.solvents-ipa-vapors
title: Solventes, IPA e vapores
summary: 'Álcool isopropílico (IPA), acetona e outros solventes usados em limpeza
  de placa, lavagem de resina ou acabamento liberam vapores inflamáveis e irritantes.
  Hierarquia: substituir quando possível, ventilar/exaurir, controlar ignição, PPE
  conforme SDS — nunca ‘cheirar para testar’. NIOSH/EPA embasam cautela com exposição
  química e emissões; SDS do produto manda nos limites. Esta página não fornece diluições
  mágicas nem autoriza vapor smoothing improvisado.'
doc_type: guide
domain:
- safety
- environment
- postprocessing
technology:
- material-extrusion
- vat-photopolymerization
process:
- fff
applies_to:
- fff
- resin-wash
- plate-cleaning
- post-solvent-use
not_for:
- open-flame-near-solvents
- food-contact-after-solvent
- unventilated-acetone-bath
knowledge_status: draft
evidence_status: strong
safety_level: critical
confidence: high
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
- source.epa-3d-printing-research
related:
- hazard.voc-ufp-ventilation
- hazard.resin-ppe-disposal
- post.vapor-smoothing
- post.resin-wash-cure
- hub.seguranca
prerequisites: []
supersedes: []
aliases_pt_br:
- IPA segurança
- vapores de solvente
- álcool isopropílico impressão 3D
aliases_en:
- IPA vapors
- isopropyl alcohol safety
- solvent fumes 3D printing
tags:
- safety
- ipa
- solvents
- voc
- flammable
---
# Solventes, IPA e vapores

Hub pai: [Segurança e meio ambiente](INDEX.md)

## O que é

Uso de **solventes** (incluindo **IPA** — *isopropyl alcohol* / álcool isopropílico, acetona e blends de lavagem) em:

- Limpeza de placa PEI / resíduos
- Lavagem de peças de resina
- Acabamentos químicos (ex.: vapor de acetona em ABS — ver [vapor smoothing](../14-pos-processamento/vapor-smoothing.md))

Todos geram **vapores** com riscos de inflamabilidade, irritação e exposição acumulada. Impressão FFF já emite VOC/UFP; solvente **soma** carga química.

## Hierarquia de controles

1. **Substituir / reduzir:** água morna + detergente neutro na placa quando o fabricante permitir; menos volume de solvente; tampas fechadas
2. **Engenharia:** ventilação/exaustão para fora; longe de dormitório; sem recircula só no quarto
3. **Administrativo:** frasco rotulado; quantidade mínima; nunca deixar aberto perto de hotend/bed
4. **PPE:** luvas/óculos/respirador **conforme SDS** e treinamento — não improvise cartucho

## IPA — práticas seguras (conceitos)

| Faça | Não faça |
|---|---|
| Ler SDS do IPA que você comprou | Assumir que “álcool de farmácia” = mesmo risco/pureza sem ler |
| Molhar pano / usar pouca quantidade | Banhar a mesa da impressora com poça |
| Esperar evaporação completa antes de aquecer bed | Acender bed com placa encharcada de IPA |
| Armazenar longe de calor/chama | Guardar ao sol ao lado da impressora quente |
| Descarte conforme regra local de resíduos | Despejar rede pluvial / pia sem checar norma |

**Sem diluição mágica nesta página.** Concentração e procedimento vêm do SDS + orientação do fabricante da placa/resina.

## Acetona e outros

- Acetona: inflamável; vapor usado em smoothing de **ABS** é processo de risco — página dedicada, **não** como receita casual
- **Não** use vapor de acetona como fluxo primário em **PLA** (mito comum) — ver [vapor smoothing](../14-pos-processamento/vapor-smoothing.md)
- Blends de wash de resina: seguir fabricante da estação/resina + [PPE resina](resina-ppe-e-descarte.md)

## Inflamabilidade e ignição

Fontes típicas perto do hobby: bed/hotend quentes, faísca, cigarro, aquecedor, estática em casos extremos.  
**Regra:** solvente aberto e superfície quente **não** compartilham bancada no mesmo momento.

Ver também [elétrico/fogo](eletrico-fogo-e-impressao-desacompanhada.md).

## Exposição e evidência de agências

- [NIOSH Additive Manufacturing](../22-fontes/niosh-additive-manufacturing.md)  
  https://www.cdc.gov/niosh/manufacturing/additive/index.html
- [EPA 3D Printing Research](../22-fontes/epa-3d-printing-research.md)  
  https://www.epa.gov/chemical-research/3d-printing-research-epa

**Fato:** química de processos AM e solventes associados é objeto de higiene/pesquisa.  
**Não fato:** “IPA é sempre seguro porque evapora rápido”.

Se irritação ocular/respiratória, dor de cabeça ou tontura: **saia**, ventile, reavalie — não “acostume”.

## Food / pele / médico

Solvente na peça **não** cria utensílio food-safe. Ver [claims](claims-food-contact-e-medico.md).

## Aplicabilidade e exclusão

**Aplica-se a:** limpeza e pós com solventes no escopo desta KB.  
**Não se aplica a:** formulação de thinner automotivo; escolha de respirador sem SDS; legal disposal mapping por município (aponta autoridade local).

## Relações

- related-to → [VOC/UFP](voc-ufp-e-ventilacao.md), [lavagem resina](../14-pos-processamento/lavagem-e-pos-cura-resina.md), [vapor smoothing](../14-pos-processamento/vapor-smoothing.md)

## Lacunas

- Tabela SDS comentada por marca de IPA usada no lab do projeto: futura
- Medição de VOC local durante wash: não realizada
