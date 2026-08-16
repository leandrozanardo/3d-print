---
id: "hazard.electrical-fire-unattended"
title: "Elétrico, fogo e impressão desacompanhada"
summary: "Impressoras FFF aquecem nozzle/bed, movem eixos e consomem energia contínua — há risco de falha elétrica, ignição de material acumulado (blob/skirt) e agravamento se a máquina roda sem supervisão. Esta página prioriza controles práticos: instalação elétrica adequada, área limpa, detecção de fumaça, plano de parada e política de jobs desacompanhados. Não garante ‘impressão segura 100%’; NIOSH/EPA cobrem sobretudo emissões/química — não substituem código elétrico local nem SDS."
doc_type: "guide"
domain: ["safety", "environment", "fff"]
technology: ["material-extrusion"]
process: ["fff"]
applies_to: ["fff", "printer.bambu-lab-a1-mini", "indoor-printing"]
not_for: ["guarantee-unattended-safe", "disable-smoke-alarm", "home-electrical-rewire-advice"]
knowledge_status: "draft"
evidence_status: "mixed"
safety_level: "critical"
confidence: "high"
last_reviewed: "2026-08-15"
review_cycle: "6-months"
sources: ["source.niosh-am-entry", "source.epa-3d-printing-research", "source.bambu-wiki-a1-mini"]
related: ["hazard.voc-ufp-ventilation", "maint.a1-mini-preventive", "printer.bambu-lab-a1-mini", "hub.seguranca"]
prerequisites: []
supersedes: []
aliases_pt_br: ["impressão sozinha", "risco de fogo impressora 3D", "segurança elétrica FFF"]
aliases_en: ["unattended 3D printing", "printer fire risk", "electrical safety FFF"]
tags: ["safety", "fire", "electrical", "unattended"]
---

# Elétrico, fogo e impressão desacompanhada

Hub pai: [Segurança e meio ambiente](INDEX.md)

## O que é

Riscos **elétricos** e de **fogo/calor** associados a impressão FFF desktop, mais a decisão de deixar a máquina **desacompanhada** (sem pessoa acordada e capaz de intervir). Frame aberto (ex.: A1 Mini) não elimina esses riscos — apenas muda o perfil (mais draft/emissões; ainda há hotend quente e movimento).

## Princípios (safety first)

1. Trate impressora como equipamento térmico elétrico contínuo, não como “gadget inofensivo”.
2. Supervisão humana é controle administrativo; câmera ajuda a observar, **não** substitui presença quando o risco for alto.
3. Pare imediatamente em cheiro de queimado, fumaça, faísca, trip de disjuntor, impacto de cabeça, blob crescente.
4. Esta base **não** garante segurança de jobs overnight.

## Controles elétricos (heurísticas)

| Faça | Evite |
|---|---|
| Tomada/circuito adequados ao equipamento; cabo original ou especificado | Gambiarra, extensão subdimensionada, T em cascata |
| Piso seco; cabo sem esmagamento por rodízio/mesa | Cabo sob tapete gerando calor |
| Acesso ao interruptor / plugue para corte rápido | Máquina atrás de móvel sem acesso |
| Seguir avisos do fabricante ([Wiki A1 mini](../22-fontes/bambu-wiki-a1-mini.md)) | Abrir PSU sem qualificação |

**Não fato aqui:** dimensionamento de disjuntor da sua casa — consulte eletricista / normas locais.

## Controles de fogo / calor

- Área ao redor limpa: sem papel solto, solventes abertos, isopor, tecido pingando no hotend
- Remover **blob** / “plástico armadura” antes do próximo job ([manutenção](../13-manutencao/a1-mini-rotina-preventiva.md))
- Detector de fumaça no ambiente (não desative para “não incomodar”)
- Extintor adequado ao local — treine uso; não invente classe sem etiqueta do equipamento
- Não deixe IPA/acetona abertos perto de superfície quente — [solventes](solventes-ipa-e-vapores.md)

## Impressão desacompanhada — política editorial

| Cenário | Postura desta base |
|---|---|
| Cupom curto, máquina estável, você na mesma residência atento | Menor risco relativo — ainda não “zero” |
| Job longo overnight sem ninguém acordado | **Desencorajado**; se ocorrer, é risco aceito pelo operador, não endossado |
| Primeira peça após manutenção / material novo / malha duvidosa | **Supervisione** as primeiras camadas no mínimo |
| Histórico recente de shift, peel, clog | Não desacompanhe até estabilizar |

Câmera low-framerate (capability listada nas specs A1 mini) é auxílio de observação — latência e ângulo limitam resposta a fogo.

## Sinais de parada imediata

- Fumaça / cheiro de elétrico queimado
- Chama ou brilho anormal no hotend/bed
- Cabeça batendo em peça solta (risco de motor forçando + material fundido acumulando)
- Estouro / trip de energia
- Irritação forte — reavaliar também [VOC/UFP](voc-ufp-e-ventilacao.md)

## Relação com agências

- [NIOSH — Additive Manufacturing](../22-fontes/niosh-additive-manufacturing.md)  
  https://www.cdc.gov/niosh/manufacturing/additive/index.html  
  Higiene ocupacional / controles em AM — **não** é checklist elétrico residencial brasileiro.
- [EPA — 3D Printing Research](../22-fontes/epa-3d-printing-research.md)  
  https://www.epa.gov/chemical-research/3d-printing-research-epa  
  Pesquisa de emissões/ambiente — **não** certifica operação unattended.

## O que esta página não faz

- Projeto de instalação elétrica
- Escolha de marca de câmera/relay “anti-fogo”
- Autorização de ABS/solventes em quarto fechado
- Garantia de power-loss recover como proteção contra incêndio

## Relações

- related-to → [manutenção A1 Mini](../13-manutencao/a1-mini-rotina-preventiva.md), [VOC/UFP](voc-ufp-e-ventilacao.md)
- printer → [A1 Mini](../21-impressoras/bambu-lab-a1-mini.md)

## Lacunas

- Matriz de cenários residenciais BR (NR / código elétrico): fora do escopo maker — apontar profissional
- Teste de câmera + alerta automatizado neste projeto: não implementado como requisito
