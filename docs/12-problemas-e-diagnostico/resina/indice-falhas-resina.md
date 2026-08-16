---
id: defect.resin.index
title: Índice de falhas — resina (vat)
summary: 'Mapa de sintomas comuns em SLA/DLP/MSLA: falha de aderência à plataforma,
  print colado no FEP, camadas faltantes, suporte arrancado, elefante/bleeding por
  superexposição, nuvens/cure incompleta e irritação por manuseio. Cada linha aponta
  mecanismo, teste barato e página relacionada. Segurança primeiro: luva, SDS, ventilação.
  Não copie tempos de exposição de fóruns sem calibrador.'
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
- fff-defect-matrix
- medical-device-failures
knowledge_status: draft
evidence_status: mixed
safety_level: high
confidence: medium
last_reviewed: '2026-08-15'
review_cycle: 6-months
sources:
- source.niosh-am-entry
related:
- tech.sla-dlp-msla
- setting.resin-exposure-supports
- post.resin-wash-cure
- hazard.resin-ppe-disposal
- material.resin-families
- defect.resin.nothing-on-plate
- defect.resin.island-loose-support
- defect.resin.suction-delamination
- defect.resin.over-under-exposure
prerequisites:
- hazard.resin-ppe-disposal
- tech.sla-dlp-msla
supersedes: []
aliases_pt_br:
- falhas impressão resina
- troubleshooting MSLA
- print não gruda na plataforma
aliases_en:
- resin print failures
- MSLA troubleshooting
- FEP stuck print
tags:
- troubleshooting
- resin
- index
---
# Índice de falhas — resina

Hub pai: [Problemas e diagnóstico](../INDEX.md) · pasta [resina](INDEX.md)

## Resumo de emergência

Pare se houver vazamento no LCD, cheiro irritante forte, contato cutâneo massivo ou peça colada que exija força perigosa. PPE: [resina PPE](../../15-seguranca-e-meio-ambiente/resina-ppe-e-descarte.md).

## Páginas atômicas

| Sintoma-chave | Página |
|---|---|
| Plataforma vazia / raft no FEP | [Nada na placa](nada-na-placa.md) |
| Ilha / tip arrancado / feature no tanque | [Ilha e suporte solto](ilha-e-suporte-solto.md) |
| Cupping / camadas em cavidade / peel extremo | [Sucção e delaminação](succao-e-delaminacao.md) |
| Bleed vs fragilidade / calibrar dose | [Over / under exposure](over-under-exposure.md) |

## Matriz sintoma → hipótese → próximo passo

| Sintoma | Hipóteses altas | Teste / ação |
|---|---|---|
| Nada na plataforma; raft no FEP | Bottom exposure baixa; nivelamento; FEP/film; lift | Ver [nada na placa](nada-na-placa.md); matriz; nivelar; filme ([settings](../../08-slicers-e-configuracoes/resina-exposicao-e-suportes.md)) |
| Peça soldada no FEP | Bottom/exposure alta; lift inadequado | [Over exposure](over-under-exposure.md); ↓ bottom; lift care; não arrancar com metal no LCD |
| Camadas faltando / buracos | Subexposição; suporte fraco; sucção (cupping) | [Sucção](succao-e-delaminacao.md) / [under](over-under-exposure.md) / [ilha](ilha-e-suporte-solto.md) |
| Detalhe derretido / bleeding | Superexposição; resina errada | [Over/under](over-under-exposure.md); cupom de detalhe |
| Suporte arranca da peça | Tips fracos; ângulo ruim; peel alto | [Ilha e suporte](ilha-e-suporte-solto.md) |
| Peça quebradiça pós-cura | Cura excessiva ou resina frágil; lavagem má | Revisar [cura](../../14-pos-processamento/lavagem-e-pos-cura-resina.md); família ([materiais](../../05-materiais/resina/familias-de-resina.md)) |
| Pegajosa após “cura” | Lavagem incompleta; UV insuficiente; tempo/distância | Relavar; re-curar conforme TDS; não pintar ainda |
| Linhas/estrias LCD | Máscara/LED; FEP nublado | Manutenção OEM; substituir consumíveis |
| Falha no meio do Z | Pouca resina; temperatura baixa; suporte; sucção | Volume; TDS térmica; [suporte](ilha-e-suporte-solto.md) / [sucção](succao-e-delaminacao.md) |

## Diferenciar de FFF

| Parece… | Mas em resina… |
|---|---|
| “Warping” | Frequentemente peel/suction/adesão — não draft de mesa FFF |
| “Under-extrusion” | Subcura / falha de suporte, não extrusor |
| Stringing | Não aplica igual; veja bleeding/exposição |

## Árvore curta

```text
Print falhou
  ├─ Contato com pele/olho? → descontaminação SDS + médico se preciso; pare o job
  ├─ Resina sob o tanque / LCD molhado? → emergência OEM; não ligar
  ├─ Raft ficou no FEP? → bottom / level / film
  ├─ Raft na plataforma mas peça incompleta? → exposição, suporte, cupping
  └─ Peça completa mas ruim? → exposição fina, lavagem/cura, resina errada
```

## Testes barato → caro

1. Inspecionar FEP (nuvens, furos) e nível de resina
2. Reimprimir cupom de exposição do fabricante
3. Reorientar + retipar suporte
4. Trocar film / filtrar resina
5. Contatar suporte OEM

## Segurança e parada

- Nunca usar solvente inflamável perto de ignição
- Não aquecer resina com soprador improvisado
- Fontes: [NIOSH](../../22-fontes/niosh-additive-manufacturing.md)

## Relações

- Tecnologia: [SLA/DLP/MSLA](../../02-tecnologias/vat-photopolymerization/sla-dlp-msla.md)
- Pós: [lavagem e pós-cura](../../14-pos-processamento/lavagem-e-pos-cura-resina.md)

## Lacunas

- Páginas atômicas cobertas para os quatro modos acima; restantes (LCD stripes, pegajosidade pós-cura dedicada) ainda index-only
- Fotos de referência locais: pendente
