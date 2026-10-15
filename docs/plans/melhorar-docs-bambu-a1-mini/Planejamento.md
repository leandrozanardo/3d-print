# melhorar-docs-bambu-a1-mini — Planejamento

> **For agentic workers:** SDD=false. Executar tarefas em ordem neste arquivo. Sem commits sem auth humana.

**Goal:** Alinhar a wiki canônica ao Bambu Lab oficial e aprofundar `docs/projeto/` com práticas comunitárias validadas + playbook MakerWorld→receita para A1 Mini 0.4 mm.

**Architecture:** Dual-track — (1) claims de hardware/procedimento no canônico + `source.*`; (2) heurísticas operacionais e “caminho das pedras” em `docs/projeto/` com classes de evidência; (3) ponte nos hubs.

**Tech Stack:** Markdown wiki PT-BR/EN existente, front matter knowledge-compiler, `pnpm validate:knowledge`, graft refresh.

**Spec:** `docs/plans/melhorar-docs-bambu-a1-mini/Brainstorming.md` (lote 1B/2B/3B/4false)

## Status do plano

PRONTO

## Branch prevista

working tree atual (sem branch nova obrigatória)

## Global Constraints

- Sem inventar URL, temperatura ou tolerância; citar fonte perto do claim
- Comunidade: `community hypothesis` ou `supported heuristic` + “validar na A1 Mini”; nunca hard safety
- Não mutar `3ds/original/**`
- Sem código de app salvo necessidade de fixture wiki
- Sem commit sem autorização
- Idioma docs: PT-BR nos planos; corpo das páginas segue padrão do arquivo (muitas em EN no `projeto/`)

## Mapa de arquivos

| Arquivo | Responsabilidade |
|---------|------------------|
| `docs/22-fontes/bambu-*.md` (+ novas `source.*` se necessário) | Pin oficial + fórum/MakerWorld como discovery |
| `docs/_meta/politica-de-fontes.md` / `politica-de-evidencias.md` | Parágrafo promoção hipótese→heuristic (se faltar) |
| `docs/21-impressoras/bambu-lab-a1-mini.md` | Specs/limites/known-issues oficiais |
| `docs/08-slicers-e-configuracoes/bambu-studio.md` | Perfis/process concepts alinhados ao Studio |
| `docs/12-problemas-e-diagnostico/fff/*` | Sintomas canônicos linkados a A1 Mini |
| `docs/projeto/workflow/makerworld-para-receita.md` (**criar**) | Playbook ponta a ponta |
| `docs/projeto/qualidade-e-acabamento/*` | Acabamento suave, seam, stringing, first layer |
| `docs/projeto/fatiamento/*` | Walls/infill leve+resistente, supports, speed |
| `docs/projeto/troubleshooting/*` | Erros comuns comunidade |
| `docs/projeto/perfis-a1-mini/*` | Recipes 0.4 mm refinados |
| `docs/projeto/fontes-e-atribuicao.md` + INDEX hubs | Fontes e links |

## Tarefas

### T1 — Pesquisa oficial Bambu Lab (A1 Mini + Studio)

1. Fetch wiki.bambulab.com A1 Mini manual/FAQ/tech specs + páginas relevantes (first print, maintenance, filament, AMS Lite)
2. Diff vs `docs/21-impressoras/bambu-lab-a1-mini.md`, `docs/22-fontes/bambu-*`, `docs/printers/A1mini/*`
3. Listar claims a corrigir/adicionar no Contexto
4. Evidência: URLs acessadas + notas em Contexto

### T2 — Pesquisa comunidade (práticas validadas)

1. Coletar padrões: forum.bambulab.com, Ellis, Teaching Tech, MakerWorld profile habits, síntese FixMyPrint
2. Mapear para: qualidade/suave, leve+resistente, economia, erros comuns
3. Classificar cada claim (hypothesis vs heuristic)
4. Evidência: tabela em Contexto (URL + tópico + classe)

### T3 — Fontes e política

1. Atualizar/criar páginas `docs/22-fontes/` para oficiais e discovery comunitário
2. Ajustar `politica-de-fontes` / `politica-de-evidencias` com regra explícita hipótese→heuristic (lote 2B)
3. Atualizar `docs/projeto/fontes-e-atribuicao.md`
4. Evidência: `pnpm validate:knowledge` (após T4 se IDs novos)

### T4 — Canônico A1 Mini + Bambu Studio + diagnóstico

1. Atualizar `bambu-lab-a1-mini.md` (specs, materiais, known issues oficiais)
2. Atualizar `bambu-studio.md` (conceitos, avisos X1C≠A1 Mini, version note)
3. Pontes em `docs/12-problemas-e-diagnostico/fff` onde faltar A1 Mini
4. Evidência: validate-wiki + revisão de links

### T5 — Playbook MakerWorld → receita

1. Criar `docs/projeto/workflow/makerworld-para-receita.md`
2. Fluxo: classificar intenção → geometria → material → orientação → supports → perfil nomeado → preview → checklist desperdício → pós-falha
3. Linkar perfis e troubleshooting existentes
4. Evidência: arquivo existe + link nos INDEX workflow/projeto

### T6 — Qualidade, fatiamento, perfis, troubleshooting

1. Refresh páginas-chave de qualidade/acabamento (seam, stringing, elephant foot, ironing)
2. Refresh walls/infill (leve vs resistente), supports, layer/speed
3. Ajustar 2–4 perfis PLA/PETG com notas de evidência
4. Matriz sintomas + páginas de falha comuns
5. Evidência: hubs INDEX atualizados; claims com classe

### T7 — Fecho verificação

1. `pnpm validate:knowledge`
2. `pnpm run graft:refresh`
3. Preencher Testes.md + GATES evidence
4. Concluido.md só com gates met

## Comandos de verificação

```bash
pnpm validate:knowledge
pnpm run graft:refresh
node .agents/skills/unlazy/scripts/gate-lint.mjs docs/plans/melhorar-docs-bambu-a1-mini/GATES.md
```

## Mapa aceite → tarefa → evidência

| AC/DoD | Tarefa | Evidência |
|--------|--------|-----------|
| AC-01 | T1, T3, T4 | canônico + sources oficiais |
| AC-02 | T5 | playbook MakerWorld |
| AC-03 | T2, T6 | troubleshooting + matriz |
| AC-04 | T2, T3, T6 | classes de evidência nas páginas |
| AC-05 | T7 | validate:knowledge EXIT 0 |
| AC-06 | T4, T5, T6 | hubs linkados |
| DoD-02 | GATES | ledger met |
| DoD-03 | T3 | source pages |
| DoD-05 | T7 | validate + graft |
