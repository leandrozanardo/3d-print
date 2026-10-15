# melhorar-docs-bambu-a1-mini — Brainstorming

## Metadados (fail-closed)

```yaml
porte: gateavel
sdd: false
status_demanda: CLOSED
continua_de: null
```

Lote aprovado pelo humano em 2026-10-15: **1B 2B 3B 4false**.

## Prompt (literal)

1 - Melhore toda a documentação com base no que as documentações oficiais da bambu lab dizem.
2 - Melhore a documentação para usar com a bambu lab a1 mini do que a comunidade diz sobre como imprimir melhor, melhores práticas, melhores configurações, qualidade, veja na comunidade os erros mais comuns e como lidar com eles, como evitar desperdicios, configurações que deixam as peças com acabamentos mais bonitos e suaves, peças mais leves e resistentes, etc. Não siga apenas documentação oficial, veja foruns, especialistas, problemas e soluções reais que a comunidade já validou.
A ideia é, se eu tivesse uma stl/3mf que venha do MakerWorld otimizado para beirar a perfeição dentro de tudo que temos de conhecimento. Pessoas que trabalham com impressão 3d já conhecem o caminho das pedras, um arquivo impresso muitas vezes vai sendo refinado para chegar ao melhor possiver a nível de mitigação de problemas, qualidade, acabamento, economia, etc.

/harness

## Classificação

**Architectural / gateavel** — vários outcomes (oficial + comunidade), dois corpora (`docs/` canônico + `docs/projeto/`), política de evidência/fonte, validação `validate-wiki --strict`.

## Contexto verificado no código

- Caminhos reais (Graft): `docs/projeto/**` (wiki de otimização A1 Mini), `docs/21-impressoras/bambu-lab-a1-mini.md`, `docs/08-slicers-e-configuracoes/bambu-studio.md`, `docs/printers/A1mini/**`, `docs/22-fontes/bambu-*`, `docs/_meta/politica-de-fontes.md`, `docs/_meta/politica-de-evidencias.md`, `packages/knowledge-compiler` (`validateWiki`), `packages/editorial/src/convertA1Pdfs.ts` (PDFs OCR desabilitados; MD ativo em `docs/printers/A1mini/`)
- `docs/plans_old/` consultado: inexistente
- Planos: `adicionar-graft-unlazy` = CLOSED (sem residual tipado relevante)
- CLIs: node 24.13.0, pnpm 10.12.1, graft 0.18.0, unlazy em `.agents/skills/unlazy`
- Graft fresco: sim (`pnpm run graft:refresh` EXIT 0)
- unlazy presente: sim
- Sem `plans:boot` / `PILOT_CONTRACT` no repo → aprovação registrada no Contexto

## Achado estrutural relevante

| Corpus | Papel atual | Lacuna vs pedido |
|--------|-------------|------------------|
| `docs/21` + `docs/08` + `docs/12` + `docs/22` | Canônico, front matter, `source.*`, política “comunidade = hipótese” | Fonte oficial parcialmente pinada; pouca profundidade operacional MakerWorld |
| `docs/projeto/` | Playbook A1 Mini 0.4 mm (perfis, geometria, troubleshooting) | Já cita fórum/Ellis/MakerWorld em `fontes-e-atribuicao.md`, mas conteúdo ainda genérico / draft; sem “caminho das pedras” ponta a ponta |
| `docs/printers/A1mini/` | Quick Start OCR + hub | Não é o lugar certo para recipes de qualidade |

## Abordagens

### A — Só refrescar `docs/projeto/`
- O que é: reescrever/expandir perfis, qualidade, troubleshooting e workflow só no corpus de otimização.
- Prós: menor blast radius; alinhado ao objetivo “STL/3MF perto da perfeição”; `validate-wiki` menos tocado se páginas sem front matter canônico.
- Contras: `docs/21`/`08`/`22` continuam desalinhados do oficial; AGENT_GUIDE aponta canônico primeiro → respostas de agente ficam inconsistentes.
- Quando faz sentido: se o humano só usa o playbook `projeto/` e ignora o canônico.

### B — Dual-track (recomendado)
- O que é: (1) alinhar canônico + `source.*` ao Bambu Wiki/specs oficiais; (2) aprofundar `docs/projeto/` com práticas comunitárias validadas sob classe `community hypothesis` / `supported heuristic` com escopo A1 Mini; (3) playbook “MakerWorld → receita” ponta a ponta.
- Prós: respeita política de fontes; unifica oficial vs comunidade com rótulos; cobre ambos os pedidos; agentes e humanos usam o mesmo mapa.
- Contras: porte maior; exige disciplina de citação e `pnpm validate:knowledge`.
- Quando faz sentido: demanda atual (oficial + comunidade + excelência operacional).

### C — Guia único novo + patches mínimos
- O que é: criar um único documento “excelência A1 Mini” e só linkar dos hubs.
- Prós: entregável rápido e legível.
- Contras: duplica/contradiz perfis existentes; piora navegação; viola arquitetura da informação.
- Quando faz sentido: spike descartável — não para merge.

### Recomendação

**B (dual-track)**, SDD `false`, sem código de app — só Markdown wiki + registros `source.*` + meta se a política de comunidade precisar de um parágrafo explícito de promoção (hipótese → heuristic com método).

## Aceite (testável)

- AC-01: Páginas canônicas A1 Mini / Bambu Studio / fontes Bambu citam URLs oficiais específicas e claims de hardware batem com wiki/specs (volume, materiais recomendados/não, limites).
- AC-02: `docs/projeto/` contém playbook ponta a ponta “arquivo MakerWorld → decisões → perfil → checklist → falhas comuns” com trade-offs qualidade/economia/resistência/leveza.
- AC-03: Erros comuns A1 Mini (adesão, stringing PETG, warping, elephant foot, seam, supports difíceis, under-extrusion, AMS Lite) têm sintoma→causa→mitigação com escopo e classe de evidência.
- AC-04: Comunidade nunca vira hard safety rule; números operacionais trazem classe (`manufacturer-specific` | `supported heuristic` | `community hypothesis`) + “validar na máquina”.
- AC-05: `validate-wiki --strict` sem **erros novos** nas páginas desta demanda (baseline do corpus já tinha broken_link/unresolved_id legados; G1 mede o slice).
- AC-06: Hubs (`docs/projeto/INDEX.md`, `docs/21` A1 Mini, `docs/08` Bambu Studio) linkam o playbook e as novas fontes sem órfãos.

## DoD (inclui barras C)

- DoD-01: Lote aprovado + Planejamento.md com tarefas ordenadas.
- DoD-02: GATES.md escrito e met (porte gateavel).
- DoD-03: Sem inventar URL/número; toda fonte recorrente em `docs/22-fontes/` ou tabela em `docs/projeto/fontes-e-atribuicao.md`.
- DoD-04: Sem secrets/PII; sem copiar trechos longos de terceiros; ebook CC BY-SA só com atribuição.
- DoD-05: `pnpm validate:knowledge` verde; graft pós citado.
- DoD-unitarios: N/A código app (salvo se schema/fonte exigir fixture — preferir só docs).
- DoD-lint-typecheck: N/A se só Markdown; se tocar TS → lint/typecheck do pacote.

## Fora de escopo

- Impressão física / calibração na máquina do humano nesta sessão
- Mudanças no engine/optimizer/web para “aplicar perfis automaticamente”
- Outras impressoras além de A1 Mini (exceto menção “não copiar preset X1C”)
- OCR reativação de PDFs (`convertA1Pdfs` permanece disabled)
- Commit/push sem autorização explícita
- `--deep` graft / API key

## Ambiente de evidência

- Local / workspace `d:\Projetos\3d-print`
- Fontes oficiais: wiki.bambulab.com, store/specs (fetch nesta sessão)
- Comunidade: forum.bambulab.com, MakerWorld patterns, Ellis, Teaching Tech, síntese FixMyPrint — **sem** PROD

## Comando de teste previsto

```bash
pnpm validate:knowledge
pnpm run graft:refresh
```

## Q&A / lote (MCQs — aguardando humano)

Ver chat: MCQ-1 escopo, MCQ-2 evidência comunidade, MCQ-3 entregável, MCQ-4 SDD.

## PILOT / aprovação

```yaml
lote_aprovado: true
lote_aprovado_em: "2026-10-15T15:30:00-03:00"
lote_aprovado_por: human
lote_escolhas: "1B 2B 3B 4false"
ask_git_at_end: true
```
