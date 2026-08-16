# Change log — wiki enterprise remediation v2

## Citation cleanup (2026-08-16)

### Objetivo

Eliminar marcadores artificiais de citação que burlavam validadores, restaurar unidades técnicas legíveis e substituir por citações Markdown reais ou rótulo editorial honesto.

### Escopo

- **67** ocorrências do padrão `(fonte oficial/fabricante/heuristic; ver sources)` (e variantes com espaços / `` `sources` ``)
- **29** páginas em `docs/**` (sem `core/**`)

### Ações aplicadas

1. **Remoção total** dos marcadores artificiais — resíduo proibido = **0** em `docs/**`.
2. **Unidades restauradas** onde o marcador partia a unidade:
   - `500 mm … /s` → `500 mm/s`
   - `10 000 mm … /s²` → `10 000 mm/s²`
3. **Caps A1 Mini** (bed 80 °C, volume 180³, hotend 300 °C, etc.): link Markdown real `([tech specs A1 mini](…/22-fontes/bambu-a1-mini-tech-specs.md))` quando a claim é de máquina e ainda não havia citação útil no trecho (~18 inserções).
4. **P1S**: intro da tabela de specs passou a apontar `[source.bambu-p1s-us-store](../22-fontes/bambu-p1s-us-store.md)`; valores limpos sem marcador fake.
5. **Números sem fonte pinada** (ranges PLA/PETG/TPU, passos ±5 °C, cupons, retract Bowden, exemplos de layer): mantidos com rótulo **`heurística editorial (sem fonte pinada)`** — sem usar as palavras-cue proibidas.

### Arquivos tocados (29)

`docs/01-fundamentos/camadas-resolucao-precisao.md`, `terminologia-manufatura-aditiva.md`; `docs/04-componentes-e-hardware/{extrusao-direct-drive-vs-bowden,hotend-e-zona-de-fusao,nozzle-0-4-mm-fff,placa-pei-fff}.md`; `docs/05-materiais/fff/{pc,petg,secagem-e-armazenamento,tpu}.md`; `docs/08-slicers-e-configuracoes/bambu-studio.md`, `settings/{altura-de-camada,temperaturas}.md`; `docs/09-calibracao/ordem-de-calibracao-fff.md`; `docs/10-processo-de-impressao/fff/{ambiente-frame-aberto,primeira-camada}.md`; `docs/12-problemas-e-diagnostico/fff/{delaminacao,elephant-foot,empenamento,falha-adesao-primeira-camada,stringing,subextrusao}.md`; `docs/16-cenarios-e-playbooks/{a1-mini-pla-petg-primeira-camada-empenamento,miniaturas-detalhe-fino,pecas-funcionais-brackets,vasos-e-recipientes}.md`; `docs/21-impressoras/{bambu-lab-a1-mini,bambu-lab-p1s}.md`; `docs/23-glossario/glossario-inicial.md`.

### Verificação

| Check | Resultado |
|---|---|
| Marcadores artificiais restantes | 0 |
| `500 mm/s` / `mm/s²` nas specs A1/P1S | OK |
| Sem commit | conforme pedido |

### Não-objetivos deste passo

- Não reescrever política de evidências completa
- Não alterar `core/**`
- Não fazer commit
- 2026-08-16: batch promote remaining printers to documented


## Completion pass (2026-08-16)

- All printers raised to documented / troubleshooting-mapped
- Manufacturers CEAD/ExOne/RatRig/RegenHU/Voron added
- Missing sources (HP MJF 1200, EOS metal, Bambu P1S/wiki) added
- Artificial citation markers removed
- Ebook broken image links replaced with editorial notes
- Ledgers 00–12 finalized
