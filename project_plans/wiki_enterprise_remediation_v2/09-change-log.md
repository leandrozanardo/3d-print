# Change log — wiki enterprise remediation v2

## Source corpus + troubleshooting empty sources (2026-08-16)

### Objetivo

Fechar gaps de schema nas páginas `doc_type: source` e nas 2 troubleshooting com `sources: []`.

### Fontes (`docs/22-fontes/`)

- **75** arquivos ajustados (de 130 sources no corpus).
- `canonical_url` preenchido a partir da primeira URL `https` do corpo (tabelas URL/URL canônica) quando ausente.
- Seções `## Claims sustentados` / `## Limitações|Limites` garantidas com conteúdo não vazio (claims vazios/ausentes → texto honesto a partir do summary/`Tópicos sustentados`).
- `last_verified` em `YYYY-MM-DD` (2026-08-16 quando a página já usava essa data de acesso).
- `source_type`, `language`, `version` presentes (já cobertos na maioria; sem remoção de `unknown` onde já existia).
- **Restantes sem `canonical_url`:** 0.

### Troubleshooting

- `docs/12-problemas-e-diagnostico/fff/layer-shift.md` — sources: ellis, teaching-tech, bambu-wiki-a1-mini; body materializado (Sintomas, Causas, Ordem diagnóstica, Correções, Condições de parada).
- `docs/12-problemas-e-diagnostico/fff/indice-por-sintoma.md` — sources: ellis, teaching-tech; mesmas seções PT + `symptom_tags`/`cause_tags`/`setting_tags`.

### Não-objetivos

- Sem commit; INDEX hubs com `sources: []` não alterados (não eram os 2 do baseline).

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

## Unit-split citations + OEM specs sync (2026-08-16)

### Objetivo

Corrigir citações Markdown que partiam unidades compostas; sincronizar páginas de impressora Anycubic/Elegoo/Prusa/Creality com claims já pinados em `docs/22-fontes/`; eliminar o rótulo `heurística editorial (sem fonte pinada)`.

### Ações

1. **Unit-split:** `500 mm ([…])/s ([…])` → `500 mm/s ([…])`; `10 000 mm ([…])/s² ([…])` → `10 000 mm/s² ([…])` em `docs/21-impressoras/bambu-lab-a1-mini.md`.
2. **Specs OEM:** **30** páginas em `docs/21-impressoras/` (Anycubic Kobra/Photon, Elegoo Neptune/Centauri/Mars/Saturn/Jupiter/OrangeStorm, Prusa CORE One+/L+/MK4S/XL+) passaram a tabelar valores da fonte modelo-específica, com citação **após** a unidade completa.
3. **Heurísticas:** todas as ocorrências de `heurística editorial (sem fonte pinada)` reescritas como ponto de partida / orientação de bancada com hedge explícito (sem falsa precisão de datasheet).
4. **Não alterado:** Prusa MINI+/HT90/SL1S SPEED — fontes só de listagem, sem células numéricas pináveis.

### Verificação

| Check | Resultado |
|---|---|
| Resíduo `])/s` / `mm ([`…`)/s` | 0 |
| Resíduo `heurística editorial (sem fonte pinada)` | 0 |
| Kobra 3 + irmãos com fonte numérica | specs sincronizadas |
