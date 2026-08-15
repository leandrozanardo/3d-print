"""One-shot bootstrap for docs/projeto neural wiki (PT-BR). Run from repo root."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJETO = ROOT / "docs" / "projeto"


def page(title: str, body: str, related: list[str]) -> str:
    rel = "\n".join(f"- {r}" for r in related)
    return f"""# {title}

{body}

## Relacionados
{rel}

## Fontes
- [Wiki Bambu Lab A1 Mini](https://wiki.bambulab.com/en/a1-mini/manual)
- [Ellis Print Tuning Guide](https://github.com/AndrewEllis93/Print-Tuning-Guide)
- Guia Maker (CC BY-SA) — ver hub [`docs/ebook/INDEX.md`](../../ebook/INDEX.md) (ajuste relativo conforme profundidade)
- Síntese de fóruns Bambu / padrões r/FixMyPrint (não copiar posts verbatim)
"""


def write(rel: str, content: str) -> None:
    path = PROJETO / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.strip() + "\n", encoding="utf-8")


def main() -> None:
    write(
        "INDEX.md",
        """# Hub — Wiki A1 Mini / otimização extrema

Missão: peças com qualidade superior — adesão estável, detalhe preservado, **suportes firmes e removíveis**, falhas evitadas.

## Quickstart
1. Abra [`playbook.md`](../../playbook.md) + um arquivo em `3ds/original/`
2. Classifique geometria e propósito
3. Escolha um perfil em [perfis-a1-mini](perfis-a1-mini/INDEX.md)
4. Use `python -m core ...` para inspecionar/reparar malha
5. Entregue em `3ds/upgraded/` + `plan/<nome>.md`

## Mapa
- [Como usar esta wiki](00-como-usar-esta-wiki.md)
- [Fontes e atribuição](fontes-e-atribuicao.md)
- [Mapa da rede](mapa-da-rede.md)
- [Implantação fases 0–4](IMPLANTACAO-FASES.md)
- [Hardware](hardware/INDEX.md) · [Materiais](materiais/INDEX.md) · [Geometria](geometria/INDEX.md)
- [Propósito](proposito/INDEX.md) · [Fatiamento](fatiamento/INDEX.md) · [Qualidade](qualidade-e-acabamento/INDEX.md)
- [Troubleshooting](troubleshooting/INDEX.md) · [Perfis](perfis-a1-mini/INDEX.md) · [Workflow](workflow/INDEX.md)
- Manuais locais: [A1 Mini](../printers/A1mini/INDEX.md) · [Ebook](../ebook/INDEX.md)

## Tipos de página
`hardware` · `material` · `geometria` · `proposito` · `perfil` · `falha` · `workflow`

## Estado da wiki
- Última validação de links: rode `python -m core validate-wiki docs`
- Hardware alvo: Bambu Lab A1 Mini / bico 0.4 mm / Bambu Studio
""",
    )

    write(
        "00-como-usar-esta-wiki.md",
        page(
            "Como usar esta wiki",
            """## Resumo
Esta wiki é a memória de longo prazo do agente e do operador. Toda decisão de otimização deve citar páginas daqui.

## Quando usar
Sempre que iniciar pelo `playbook.md`, ou ao investigar falha pós-impressão.

## Regras para A1 Mini
1. Entre pelo [INDEX](INDEX.md)
2. Classifique geometria → propósito → perfil
3. Cada página termina em **Relacionados** (sem órfãos)
4. `plan/*.md` deve linkar as páginas usadas
5. Números marcados “validar na impressora” não são dogma

## Navegação sugerida
Inventário (`core`) → geometria → propósito → perfil → fatiamento → checklist.""",
            ["[Hub](INDEX.md)", "[Workflow otimizar](workflow/otimizar-modelo.md)", "[Playbook](../../playbook.md)"],
        ),
    )

    write(
        "fontes-e-atribuicao.md",
        page(
            "Fontes e atribuição",
            """## Resumo
Conhecimento consolidado de manuais oficiais, guias de tuning e o ebook local (CC BY-SA 4.0).

## Corpus local
- Guia Maker de Impressão 3D — Cláudio Luís Marques Sampaio — **CC BY-SA 4.0** — http://www.makerlinux.com.br/ebook — MD em [`docs/ebook/`](../ebook/INDEX.md); originais em `docs/_arquivo/ebook/`
- Manuais A1 Mini — [`docs/printers/A1mini/`](../printers/A1mini/INDEX.md); PDFs em `docs/_arquivo/printers/A1mini/`

## Fontes externas (consultadas / sintetizadas)
| Fonte | O que absorvemos |
|---|---|
| wiki.bambulab.com (A1 Mini) | Specs, manutenção, fluxo Bambu Studio |
| forum.bambulab.com | Padrões de falha A1/A1 Mini (adesão, AMS Lite, ruído) |
| Ellis Print Tuning Guide | Fluxo de calibração (temp, flow, pressure advance conceitual) |
| Teaching Tech | Torres de temp/retração; método científico de tuning |
| CNC Kitchen | Relação paredes/infill × resistência |
| Prusa Knowledge Base | Taxonomia de falhas FFF (adaptada ao A1 Mini) |
| MakerWorld / docs Bambu Studio | Presets e práticas de suporte tree/normal |
| Comunidade (FixMyPrint patterns) | Matriz sintoma→causa |

## Licença
Conteúdo derivado do ebook permanece **CC BY-SA 4.0**. Conteúdo original desta wiki do projeto: documente alterações; não remova atribuições.""",
            ["[Hub](INDEX.md)", "[Ebook INDEX](../ebook/INDEX.md)", "[A1 Mini INDEX](../printers/A1mini/INDEX.md)"],
        ),
    )

    # --- section factories ---
    sections = {
        "hardware": [
            ("a1-mini-visao-geral.md", "A1 Mini — visão geral", "Bed ~180×180 mm, CoreXY-bed-slinger compacto, bico 0.4 padrão, ótimo para PLA; ambientação aberta (cuidado PETG warping)."),
            ("a1-mini-mesa-e-adesao.md", "Mesa e adesão", "Limpar PEI com água+detergente; IPA quando oleoso; primeira camada é 80% do sucesso."),
            ("a1-mini-extrusao-e-bico.md", "Extrusão e bico", "0.4 mm default; cold pulls periódicos; não forçar PETG abrasivo sem bico adequado."),
            ("a1-mini-manutencao.md", "Manutenção", "Lubrificar eixos conforme wiki oficial; verificar PTFE/hotend; calibrar flow após mudança de marca."),
            ("a1-mini-ams-lite.md", "AMS Lite", "Útil para multi-cor; secar filamento; observar emaranhados e umidade."),
        ],
        "materiais": [
            ("pla.md", "PLA", "Default do projeto. Nozzle ~190–220 °C; bed ~35–60 °C; cooling alto; pouca warping."),
            ("petg.md", "PETG", "Mais tough/químico. Nozzle ~220–250 °C; bed ~70–85 °C; cooling moderado; stringing comum — validar na impressora."),
            ("secagem-e-umidade.md", "Secagem e umidade", "PETG higroscópico; PLA também sofre. Se estalar/stringing: secar."),
            ("tabela-temperaturas-a1-mini.md", "Tabela de temperaturas A1 Mini", "Use como ponto de partida; ajuste por marca."),
        ],
        "geometria": [
            ("classificar-geometria.md", "Classificar geometria", "Fluxo: overhangs? paredes finas? orgânico? encaixe? vaso? → escolhe perfil."),
            ("balancos-e-angulos.md", "Balanços e ângulos", "Regra prática 45–60°; tree supports em orgânicos; interface layers para remoção."),
            ("paredes-finas.md", "Paredes finas", "Alinhar espessura a múltiplos da largura de linha (~0.42 mm @0.4)."),
            ("organicos-e-miniaturas.md", "Orgânicos e miniaturas", "Camada baixa (0.08–0.12), slow outer wall, tree supports."),
            ("encaixes-mecanicos.md", "Encaixes mecânicos", "Folga 0.2–0.4 mm tipica PLA; mais paredes; menos infill ornamental."),
            ("vasos-e-vasilhames.md", "Vasos e vasilhames", "Spiral vase quando single-wall; senão paredes 2–3 e fundo sólido."),
        ],
        "proposito": [
            ("miniaturas.md", "Miniaturas", "Detalhe > velocidade. Perfil pla-miniatura-0.4."),
            ("ferramentas.md", "Ferramentas", "Resistência e dimensional. Perfil pla-ferramenta-resistente-0.4 / petg-funcional."),
            ("decorativas.md", "Decorativas", "Superfície limpa, costura escondida, pós-processo leve."),
            ("vasos.md", "Vasos", "Vase mode ou paredes contínuas; atenção a Z-seam."),
            ("personagens.md", "Personagens", "Como miniatura + faces; suporte em cavidades; evitar scar em rostos."),
        ],
        "fatiamento": [
            ("orientacao.md", "Orientação", "Maximize contato de mesa; minimize overhang crítico em faces cosméticas."),
            ("suportes-estrategia.md", "Suportes — estratégia", "Firme + removível > zero suporte se qualidade cair."),
            ("suportes-face-e-interface.md", "Suportes — face e interface", "Z distance ~0.2; interface layers 2–3; XY gap ~0.3–0.5 (validar)."),
            ("preenchimento-e-paredes.md", "Preenchimento e paredes", "Resistência: 3–5 walls > mais infill. Miniatura: 2 walls + 10–15%."),
            ("altura-de-camada-e-velocidade.md", "Altura de camada e velocidade", "0.08–0.12 detalhe; 0.16–0.20 utilitário; 0.28 draft."),
            ("brim-raft-saia.md", "Brim, raft e saia", "Brim em peças altas/pouca base; raft raro no A1 Mini PEI."),
        ],
        "qualidade-e-acabamento": [
            ("costura-e-superficie.md", "Costura e superfície", "Alinhar Z-seam em aresta oculta; ironing só quando necessário."),
            ("stringing-e-retract.md", "Stringing e retracão", "PLA: retracão curta em Direct Drive; secar filamento antes de culpar settings."),
            ("elephant-foot-e-primeira-camada.md", "Elephant foot e 1ª camada", "Elefante: reduzir first layer temp/fluxo ou squish; first layer lenta."),
            ("pos-processamento.md", "Pós-processamento", "Lixa seca PLA; primer; cuidado solventes (PLA ≠ ABS)."),
        ],
        "troubleshooting": [
            ("falha-adesao.md", "Falha de adesão", "Limpar mesa; brim; first layer; nivelamento/Live Adaptive."),
            ("warping.md", "Warping", "Mais comum PETG/ABS; enclosure improvisado; brim; reduzir cooling."),
            ("under-extrusion.md", "Subextrusão", "Entupimento parcial, umidade, flow baixo, temperatura baixa."),
            ("layer-shift.md", "Layer shift", "Choque mecânico, belt, velocidade agressiva, mesa batendo."),
            ("suporte-dificil-remover.md", "Suporte difícil de remover", "Aumentar Z distance; interface; tree; reduzir density."),
            ("detalhe-perdido-miniatura.md", "Detalhe perdido (miniatura)", "Camada alta demais; outer wall rápida; cooling insuficiente."),
            ("matriz-sintoma-causa.md", "Matriz sintoma → causa", "Use como índice rápido antes de mudar 10 settings."),
        ],
    }

    for section, items in sections.items():
        links = "\n".join(f"- [{t}]({f})" for f, t, _ in items)
        write(
            f"{section}/INDEX.md",
            f"""# {section.replace('-', ' ').title()}

## Páginas
{links}

## Relacionados
- [Hub](../INDEX.md)
""",
        )
        for fname, title, blurb in items:
            extra = ""
            if section == "materiais" and fname == "tabela-temperaturas-a1-mini.md":
                extra = """
## Presets sugeridos (PLA)
| Parâmetro | Valor | Motivo |
|---|---|---|
| Nozzle | 210 °C | Ponto médio comum |
| Bed | 50 °C | Adesão PEI |
| Cooling | 100% | PLA gosta de fan |

## Presets sugeridos (PETG)
| Parâmetro | Valor | Motivo |
|---|---|---|
| Nozzle | 240 °C | Ponto médio; validar marca |
| Bed | 80 °C | Reduz warping |
| Cooling | 30–50% | Menos stringing/delaminação |
"""
            write(
                f"{section}/{fname}",
                page(
                    title,
                    f"""## Resumo
{blurb}

## Quando usar
Consulte esta página ao classificar a peça ou diagnosticar falhas relacionadas.

## Regras para A1 Mini
- Bico 0.4 mm como baseline do projeto
- Preferir Bambu Studio
- Validar temperaturas por marca de filamento
{extra}
## Presets sugeridos (PLA)
| Parâmetro | Valor | Motivo |
|---|---|---|
| Layer height | 0.12–0.20 | Equilíbrio qualidade/tempo |
| Walls | 2–4 | Depende do propósito |

## Presets sugeridos (PETG)
| Parâmetro | Valor | Motivo |
|---|---|---|
| Layer height | 0.16–0.20 | Estabilidade |
| Cooling | moderado | Evitar warping/stringing |
""",
                    [f"[INDEX {section}](INDEX.md)", "[Hub](../INDEX.md)"],
                ),
            )

    # Profiles
    profiles = [
        ("pla-miniatura-0.4.md", "PLA Miniatura 0.4", "0.08–0.12", "2", "10–15%", "tree", "Detalhe fino"),
        ("pla-ferramenta-resistente-0.4.md", "PLA Ferramenta resistente 0.4", "0.16–0.20", "4–5", "25–40%", "normal se necessário", "Resistência"),
        ("pla-decorativo-superficie-0.4.md", "PLA Decorativo superfície 0.4", "0.12–0.16", "3", "15%", "tree/normal", "Acabamento"),
        ("pla-vaso-vase-mode-0.4.md", "PLA Vaso / vase mode 0.4", "0.16–0.28", "1 (spiral)", "0%", "não", "Spiralize"),
        ("pla-personagem-detalhe-0.4.md", "PLA Personagem detalhe 0.4", "0.08–0.12", "2–3", "10–15%", "tree", "Rostos/costura"),
        ("petg-funcional-0.4.md", "PETG Funcional 0.4", "0.16–0.20", "4", "30–40%", "normal", "Toughness"),
    ]
    plinks = "\n".join(f"- [{t}]({f})" for f, t, *_ in profiles)
    write(
        "perfis-a1-mini/INDEX.md",
        f"""# Perfis A1 Mini (Bambu Studio)

{plinks}
- [Suportes árvore vs normal](suportes-arvore-vs-normal.md)

## Relacionados
- [Hub](../INDEX.md)
- [Propósito](../proposito/INDEX.md)
""",
    )
    for fname, title, layer, walls, infill, support, why in profiles:
        mat = "PETG" if fname.startswith("petg") else "PLA"
        write(
            f"perfis-a1-mini/{fname}",
            page(
                title,
                f"""## Resumo
Perfil de referência **{mat}** para A1 Mini / 0.4 — foco: {why}.

## Quando usar
Quando o propósito da peça corresponder ao nome do perfil.

## Regras para A1 Mini
- Comece por estes valores; ajuste flow/temp por filamento
- Não misture “modo draft” com miniaturas

## Presets sugeridos ({mat})
| Parâmetro | Valor | Motivo |
|---|---|---|
| Layer height | {layer} | {why} |
| First layer height | 0.20 | Adesão |
| Wall loops | {walls} | Força / detalhe |
| Top/bottom shells | 4–6 | Fechamento |
| Infill | {infill} | Equilíbrio |
| Support | {support} | Removibilidade |
| Brim | auto se base pequena | Adesão |
| Outer wall speed | reduzir 30–50% vs default rápido | Qualidade |
| Cooling | alto (PLA) / moderado (PETG) | Material |

## Quando NÃO usar
- Material diferente do perfil
- Geometria incompatível (ex.: vase mode em peça sólida multi-ilha)
""",
                ["[Perfis INDEX](INDEX.md)", "[Propósito](../proposito/INDEX.md)", "[Hub](../INDEX.md)"],
            ),
        )

    write(
        "perfis-a1-mini/suportes-arvore-vs-normal.md",
        page(
            "Suportes: árvore vs normal",
            """## Resumo
Tree: orgânicos/miniaturas (menos cicatriz, menos filamento). Normal: enclaves mecânicos e bases largas previsíveis.

## Quando usar
Tree para personagens/miniaturas; normal para ferramentas com “teto” plano.

## Regras para A1 Mini
- Sempre revise pintura manual
- Interface layers ajudam remoção
- Se suporte “gruda”, aumente Z distance antes de desistir do suporte
""",
            ["[Perfis INDEX](INDEX.md)", "[Suportes estratégia](../fatiamento/suportes-estrategia.md)"],
        ),
    )

    workflows = [
        ("otimizar-modelo.md", "Otimizar modelo", """## Resumo
Procedimento canônico alinhado ao `playbook.md`.

## Pipeline
1. `python -m core inspect-mesh` ou `inspect-3mf`
2. Classificar geometria/propósito
3. Escolher perfil
4. `repair-mesh` se necessário (saída em `3ds/upgraded`)
5. Documentar em `plan/<nome>.md`
6. `python -m core validate-wiki docs` após editar docs

## Limite honesto
Reescrita binária de process settings Bambu no 3MF é best-effort; settings vão no plan + Studio.
"""),
        ("checklist-qualidade.md", "Checklist de qualidade", """## Resumo
Gate antes de declarar otimização concluída.

## Checklist
- [ ] Original intocado
- [ ] Upgraded gerado
- [ ] Plan preenchido com links wiki
- [ ] Orientação justificada
- [ ] Suportes firmes/removíveis
- [ ] Perfil nomeado
- [ ] Riscos residuais listados
"""),
        ("quando-editar-malha.md", "Quando editar malha", """## Resumo
Só intervenção leve (modo B): reparo, escala, limpeza. Sem remodelagem pesada.

## Quando usar
Non-manifold, buracos, escala errada (mm vs inches).

## Comando
`python -m core repair-mesh 3ds/original/X.stl 3ds/upgraded/X.stl`
"""),
        ("como-escrever-plan-md.md", "Como escrever plan/*.md", """## Resumo
Use `plan/_template.md`. Cada alteração: o quê / por quê / link wiki.
"""),
        ("dry-run-exemplo.md", "Dry-run exemplo", """## Resumo
Peça `_sample_cube` exerce o pipeline sem impressão obrigatória.

## Artefatos
- `3ds/original/_sample_cube.stl`
- `3ds/upgraded/_sample_cube.stl`
- `plan/_exemplo-dry-run.md`
"""),
    ]
    wlinks = "\n".join(f"- [{t}]({f})" for f, t, _ in workflows)
    write(
        "workflow/INDEX.md",
        f"""# Workflow

{wlinks}

## Relacionados
- [Hub](../INDEX.md)
- [Playbook](../../../playbook.md)
""",
    )
    for fname, title, body in workflows:
        write(
            f"workflow/{fname}",
            page(title, body, ["[Workflow INDEX](INDEX.md)", "[Hub](../INDEX.md)", "[Playbook](../../../playbook.md)"]),
        )

    # mapa
    all_md = sorted(p.relative_to(PROJETO).as_posix() for p in PROJETO.rglob("*.md"))
    listing = "\n".join(f"- [{p}]({p})" for p in all_md)
    write(
        "mapa-da-rede.md",
        f"""# Mapa da rede

Inventário de nós Markdown em `docs/projeto`.

{listing}

## Relacionados
- [Hub](INDEX.md)
""",
    )

    print(f"Wrote wiki under {PROJETO} ({len(all_md)} md files tracked after mapa)")


if __name__ == "__main__":
    main()
