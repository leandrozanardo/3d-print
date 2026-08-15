# Plano de otimização — <basename = stem do original>

> **Regra:** se o original é `3ds/original/one+Piece.3mf`, este arquivo é `3ds/plan/one+Piece.md` e os upgraded são `3ds/upgraded/one+Piece.stl` / `one+Piece.3mf`. Nunca trocar o stem.

## Entrada
- Arquivo: `3ds/original/<basename>.(stl|3mf)`
- Formato: STL | 3MF
- Material alvo: PLA | PETG
- Propósito:
- Resumo da geometria:

## Diagnóstico
- Modos de falha prováveis:
- Restrições (estética, tolerância de encaixe, orçamento de tempo):
- Relatório `core` (colar resumo JSON):

## Alterações aplicadas
| # | Alteração | Por quê | Página da wiki |
|---|---|---|---|
| 1 |  |  |  |

## Perfil Bambu Studio
- Página do perfil:
- Desvios do perfil (se houver):

## Malha
- Ops leves:
- Comando:

## Artefatos (mesmo basename = stem do original)
- `3ds/upgraded/<basename>.stl` (se houver)
- `3ds/upgraded/<basename>.3mf` (preferencial no Studio)
- `3ds/plan/<basename>.md` (este arquivo)

## Resultado esperado
- Qualidade de superfície:
- Suportes (tipo / removibilidade):
- Riscos residuais:

## Como imprimir / validar
1. Abrir o artefato em `3ds/upgraded/` no Bambu Studio (A1 Mini / 0.4)
2. Aplicar o perfil citado
3. Revisar pintura de suportes
4. Imprimir teste ou peça completa
5. Devolver padrões de falha novos para a wiki

## Relacionados
- [Playbook](../../playbook.md)
- [Checklist de qualidade](../../docs/projeto/workflow/checklist-qualidade.md)
