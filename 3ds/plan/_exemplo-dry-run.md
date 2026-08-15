# Plano de otimização — _sample_cube

## Entrada
- Arquivo: `3ds/original/_sample_cube.stl`
- Formato: STL
- Material alvo: PLA
- Propósito: dry-run do pipeline / smoke test de adesão
- Resumo da geometria: cubo sólido 20×20×20 mm, faces planas, sem balanços críticos

## Diagnóstico
- Modos de falha prováveis: nenhum estrutural; geometria trivial
- Restrições: demo de documentação; impressão física opcional
- Relatório `core`: cubo watertight, ~12 faces, bounds ≈ 20 mm, volume 8000 mm³

## Alterações aplicadas
| # | Alteração | Por quê | Página da wiki |
|---|---|---|---|
| 1 | `repair-mesh` leve → `3ds/upgraded/_sample_cube.stl` | Exercitar write-guards + limpeza | [quando editar malha](../../docs/projeto/workflow/quando-editar-malha.md) |
| 2 | Perfil: PLA ferramenta resistente 0.4 | Tijolo funcional simples | [pla-ferramenta-resistente-0.4](../../docs/projeto/perfis-a1-mini/pla-ferramenta-resistente-0.4.md) |
| 3 | Sem suportes; brim off | Base plana no PEI basta | [brim / raft / saia](../../docs/projeto/fatiamento/brim-raft-saia.md) |

## Perfil Bambu Studio
- Página do perfil: `docs/projeto/perfis-a1-mini/pla-ferramenta-resistente-0.4.md`
- Desvios: nenhum

## Malha
- Ops: merge_vertices / process / fill_holes (best-effort)
- Comando: `python -m core repair-mesh 3ds/original/_sample_cube.stl 3ds/upgraded/_sample_cube.stl --json`

## Artefatos (mesmo basename)
- `3ds/upgraded/_sample_cube.stl`
- `3ds/upgraded/_sample_cube.3mf`
- `3ds/plan/_sample_cube.md`

## Resultado esperado
- Qualidade de superfície: alta (trivial)
- Suportes: nenhum
- Riscos residuais: nenhum relevante

## Como imprimir / validar
1. Abrir `3ds/upgraded/_sample_cube.3mf` (ou `.stl`) no Bambu Studio
2. Aplicar o perfil citado
3. Fatiar e checar tempo/filamento
4. Opcional: imprimir como smoke test de adesão no PEI

## Relacionados
- [Playbook](../../playbook.md)
- [Dry-run workflow](../../docs/projeto/workflow/dry-run-exemplo.md)
