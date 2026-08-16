---
id: defect.resin.over-under-exposure
title: Over e under exposure (resina)
summary: 'Falha atômica em vat: energia por camada fora da janela. Under: features
  frágeis, falha de adesão entre camadas, tips fracos, detalhe ‘incompleto’. Over:
  bleeding/elefante em microdetalhe, perda de furos finos, aderência excessiva ao
  filme, peça gorducha. Calibre com matriz/cupom do fabricante — nunca copie tempo
  de fórum como universal. Diferencie de tipagem e de cupping. PPE ao manusear cupons
  não lavados.'
doc_type: troubleshooting
domain:
- troubleshooting
- resin
technology:
- vat-photopolymerization
process:
- sla
- dlp
- msla
applies_to:
- vat-photopolymerization
not_for:
- fff-temperature-tuning
- universal-exposure-tables
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
related:
- defect.resin.index
- defect.resin.nothing-on-plate
- defect.resin.island-loose-support
- defect.resin.suction-delamination
- setting.resin-exposure-supports
- material.resin-families
- post.resin-wash-cure
prerequisites:
- hazard.resin-ppe-disposal
- setting.resin-exposure-supports
supersedes: []
aliases_pt_br:
- superexposição resina
- subexposição resina
- bleeding MSLA
- cura insuficiente camada
aliases_en:
- resin overexposure
- resin underexposure
- MSLA bleeding
- exposure calibration
tags:
- troubleshooting
- resin
- exposure
- calibration
symptom_tags:
- underexposure-resin
- overexposure-bleed
- lost-fine-holes
cause_tags:
- wrong-exposure-time
- wrong-layer-height
- degraded-lcd
- resin-batch-shift
---
# Over e under exposure (resina)

Hub pai: [Problemas — resina](INDEX.md) · [Índice de falhas](indice-falhas-resina.md)

## Resumo de emergência

1. PPE com cupons molhados: [PPE](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md)
2. **Não** use tabela de tempo de fórum como verdade — use matriz do fabricante + máquina
3. Separe **bottom** (aderência à plataforma) de **normal exposure** (detalhe/camadas)
4. Se a plataforma veio vazia, resolva [nada na placa](nada-na-placa.md) antes de fine-tuning de detalhe

## Assinatura

| Modo | Sinais típicos |
|---|---|
| **Under** | Features quebradiças; tip arranca fácil; camadas “não soldam”; microdetalhe incompleto; falhas sem cupping óbvio |
| **Over** | Bleed/elefante em texto fino; furos menores que o CAD; bordas gordas; tendência a soldar no filme; perda de sharp edges |
| Ambos | Troca de layer height / lote / LCD sem recalibrar |

## Tecnologias afetadas

Vat (SLA/DLP/MSLA). A “dose” é tempo × irradiância efetiva × espectro × química da resina — por isso números não transferem entre máquinas.

## Diferenciar

| Parece exposição mas… | Vá para |
|---|---|
| Raft no FEP / placa vazia | [nada na placa](nada-na-placa.md) (bottom/level/film) |
| Ilha tipada que caiu | [ilha e suporte](ilha-e-suporte-solto.md) |
| Oco/copo com falha local | [sucção](succao-e-delaminacao.md) |
| Pegajosa após “cura UV” | [lavagem/pós-cura](../../14-pos-processamento/lavagem-e-pos-cura-resina.md) (não é só tempo de camada) |

## Riscos e parada

- Over-correction de bottom → peça soldada no FEP
- Under extremo em peça estrutural → falha mecânica pós-lavagem
- Avaliar cupom sem luvas

## Cause matrix (ordenada)

| Plausibilidade | Causa | Por quê |
|---|---|---|
| Alta | Tempo de exposição inadequado para layer height | Dose fora da janela |
| Alta | Troca de resina/lote/pigmento sem cupom | Cinética diferente |
| Média | LCD/máscara envelhecidos | Energia real cai; tempo nominal mente |
| Média | Temperatura da resina fora da janela TDS | Velocidade de cura muda |
| Média | Confundir bottom com normal | Corrige o parâmetro errado |
| Baixa-primeira | “Resina falsificada” | Só após processo + cupom controlado |

## Árvore de decisão

```text
Sintoma dominante?
  ├─ Placa vazia / raft no FEP → defect.resin.nothing-on-plate
  ├─ Detalhe sangrando / furos fechando → suspeita OVER → ↓ normal exposure (cupom)
  ├─ Fragilidade / falha de camada / tip fraco sem ilha óbvia → suspeita UNDER → ↑ via matriz
  └─ Ambíguo → imprimir matriz de exposição do fabricante ANTES de peça longa
Bottom só depois que normal estiver na janela de detalhe (ou conforme método do calibrador).
```

## Testes (barato → caro)

1. Confirmar layer height e perfil batem com a resina carregada
2. Imprimir **matriz/cupom** do fabricante (RERF, cones, XPFinder, etc. — o da sua máquina)
3. Avaliar detalhe **após** lavagem adequada (resíduo mascara leitura)
4. Ajustar **uma** variável (normal **ou** bottom)
5. Validar em cupom de furos + cupom de tip
6. Se drift com o tempo: diagnosticar LCD/filme antes de perseguir tempos

## Ações corretivas por causa

| Causa confirmada | Ação | Não faça junto |
|---|---|---|
| Under (normal) | ↑ exposição normal pelo passo do calibrador | ↑ bottom no mesmo salto |
| Over (normal) | ↓ exposição normal | Compensar com tips maiores |
| Bottom errado | Ajuste dedicado de base | Copiar % “de internet” |
| Layer height nova | Recalibrar do zero | Extrapolação linear inventada |
| LCD fraco | Manutenção OEM | Tempos extremos crônicos |

## ↑ / ↓ efeitos (qualitativo)

| Se ↑ normal exposure | Efeito típico |
|---|---|
| Até a janela | Melhor solda de camada / tips mais firmes |
| Além da janela | Bleed, perda de furo fino, gordura dimensional |

| Se ↑ bottom | Efeito típico |
|---|---|
| Até a janela | Raft estável na plataforma |
| Além | Solda no FEP / remoção traumática |

Sem números universais — ver TDS e [settings](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md).

## Validar correção

Cupom de detalhe + cupom de base estáveis; depois peça real curta. Registrar: resina/lote, layer height, normal, bottom, count, temperatura ambiente.

## Prevenção

- Recalibrar ao mudar marca, cor, layer height ou máquina
- Arquivar perfis com identificação de lote quando qualidade importa
- Não misturar “miniaturas” e “engineering resin” no mesmo tempo

## Relações com outros conceitos

- indicated-by → bleed vs fragilidade
- calibrated-by → matriz do fabricante
- interacts-with → tipagem, lift, temperatura
- feeds-into → [nada na placa](nada-na-placa.md), [suporte solto](ilha-e-suporte-solto.md)
- material-context → [famílias de resina](../../05-materiais/resina/familias-de-resina.md)

## Veja também

- [Índice de falhas — resina](indice-falhas-resina.md)
- [Pós-cura](../../14-pos-processamento/lavagem-e-pos-cura-resina.md)

## Fontes

- [NIOSH Additive Manufacturing](../../22-fontes/niosh-additive-manufacturing.md)
- Ordem de calibração: [resina — exposição e suportes](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)
- Valores de tempo: **somente** fabricante/calibrador — esta página deliberadamente omite tabela universal

## Lacunas

- Protocolo fotográfico padronizado de leitura de cupom
- Drift de LED/LCD: critérios de troca por OEM
