/**
 * Convert Guia Maker AsciiDoc chapters to GitHub-flavored Markdown.
 * Faithful port of core/convert_ebook_adoc.py.
 */
import * as fs from "node:fs";
import * as path from "node:path";

import { resolveInsideRepository, resolveRepoRoot } from "@fix-my-print/repo-guard";

export const ATTRIBUTION = `> **Fonte:** Guia Maker de Impressão 3D (Cláudio Luís Marques Sampaio) — CC BY-SA 4.0
> **Nota:** o arquivo AsciiDoc original (\`docs/_arquivo/ebook/\`) foi removido deste repositório.
> **Obra:** http://www.makerlinux.com.br/ebook
`;

export const CHAPTER_MAP: ReadonlyArray<readonly [string, string, string]> = [
  ["guia-maker-da-impressao-3d-prefacio.adoc", "01-prefacio.md", "Prefácio"],
  ["guia-maker-da-impressao-3d-introducao.adoc", "02-introducao.md", "Introdução"],
  ["guia-maker-da-impressao-3d-historico.adoc", "03-historico.md", "Histórico"],
  [
    "guia-maker-da-impressao-3d-universomaker.adoc",
    "04-universo-maker.md",
    "Universo Maker",
  ],
  [
    "guia-maker-da-impressao-3d-tecnologiafff.adoc",
    "05-tecnologia-fff.md",
    "Tecnologia FFF",
  ],
  [
    "guia-maker-da-impressao-3d-materiaisfff.adoc",
    "06-materiais-fff.md",
    "Materiais FFF",
  ],
  ["guia-maker-da-impressao-3d-malhas.adoc", "07-malhas.md", "Malhas"],
  ["guia-maker-da-impressao-3d-operacao.adoc", "08-operacao.md", "Operação"],
  ["guia-maker-da-impressao-3d-gcode.adoc", "09-gcode.md", "G-code"],
  ["guia-maker-da-impressao-3d-acabamento.adoc", "10-acabamento.md", "Acabamento"],
  ["guia-maker-da-impressao-3d-manutencao.adoc", "11-manutencao.md", "Manutenção"],
  ["guia-maker-da-impressao-3d-apendices.adoc", "12-apendices.md", "Apêndices"],
  ["guia-maker-da-impressao-3d-sobre.adoc", "13-sobre.md", "Sobre"],
];

const ADMONITION_LABELS: Record<string, string> = {
  NOTE: "Nota",
  TIP: "Dica",
  WARNING: "Atenção",
  CAUTION: "Cuidado",
  IMPORTANT: "Importante",
};

const SOURCES_REMOVED_WARNING =
  "AsciiDoc sources were removed from this repository; docs/ebook/*.md is canonical. Do not invent sources.";

export function unescapeAttrs(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Convert AsciiDoc inline markup to Markdown (order matters). */
export function convertInline(text: string): string {
  let result = unescapeAttrs(text);

  result = result.replace(
    /(?:latexmath|stem):\[((?:[^\\\]]|\\.)*)\]/g,
    (_m, body: string) => `$${body}$`,
  );

  result = result.replace(
    /(https?:\/\/[^\s[\]]+)\[([^\]]*)\]/g,
    (_m, url: string, label: string) => `[${label || url}](${url})`,
  );

  result = result.replace(
    /link:([^[]+)\[([^\]]*)\]/g,
    (_m, target: string, label: string) => `[${label || target}](${target})`,
  );

  result = result.replace(
    /mailto:([^[]+)\[([^\]]*)\]/g,
    (_m, email: string, label: string) => `[${label || email}](mailto:${email})`,
  );

  const inlineImage = (_m: string, imgPath: string, attrsRaw: string): string => {
    const attrs = attrsRaw ?? "";
    const trimmedPath = imgPath.trim();
    let alt = attrs ? (attrs.split(",")[0]?.trim() ?? "") : "";
    if (!alt) {
      alt = path.parse(trimmedPath).name;
    }
    const titleM = /title="([^"]*)"/.exec(attrs);
    if (titleM?.[1] !== undefined) {
      alt = unescapeAttrs(titleM[1]);
    }
    const name = path.basename(trimmedPath);
    return `![${alt}](imagens/${name})`;
  };

  // image:: (block macro used inline) then image: (inline macro)
  result = result.replace(/image::([^:[\s][^[\s]*)\[([^\]]*)\]/g, inlineImage);
  result = result.replace(/(?<![:])image:([^:[\s][^[\s]*)\[([^\]]*)\]/g, inlineImage);
  result = result.replace(/\+([^+]+)\+/g, "`$1`");
  result = result.replace(/pass:\[([^\]]*)\]/g, "$1");
  result = result.replace(/\^([^^]+)\^/g, "<sup>$1</sup>");

  // Bold: unconstrained then constrained
  result = result.replace(/\*\*([^*\n]+)\*\*/g, "**$1**");
  result = result.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "**$1**");

  // Italic
  result = result.replace(/(?<![/\w])__([^_\n]+)__(?!\w)/g, "*$1*");
  result = result.replace(/(?<![/\w])_([^_\n]+)_(?!\w)/g, "*$1*");

  result = result.replace(/\{(Revision|Date|Author|Email)\}/g, "*$1*");
  return result;
}

function parseImageBlock(line: string): string | null {
  const m = /^image::([^[]+)\[(.*)\]\s*$/.exec(line);
  if (!m) {
    return null;
  }
  const imgPath = m[1]!.trim();
  const attrs = m[2]!;
  const name = path.basename(imgPath);
  const titleM = /title="((?:[^"\\]|\\.)*)"/.exec(attrs);
  const altParts = attrs
    .split(",")
    .map((p) => p.trim())
    .filter((p) => !p.includes("=") && p.length > 0);
  const alt = altParts[0] ?? path.parse(name).name;
  if (titleM?.[1] !== undefined) {
    const caption = unescapeAttrs(titleM[1]);
    return `![${caption}](imagens/${name})\n\n*${caption}*`;
  }
  return `![${alt}](imagens/${name})`;
}

function convertTable(rows: string[]): string[] {
  const parsed: string[][] = [];
  for (const row of rows) {
    const trimmed = row.trim();
    if (!trimmed.startsWith("|")) {
      continue;
    }
    const cells = trimmed
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => convertInline(c.replace(/\t/g, " ").trim()));
    if (cells.length > 0) {
      parsed.push(cells);
    }
  }
  if (parsed.length === 0) {
    return ["<!-- empty table -->"];
  }
  const width = Math.max(...parsed.map((r) => r.length));
  for (const r of parsed) {
    while (r.length < width) {
      r.push("");
    }
  }
  const out = [
    `| ${parsed[0]!.join(" | ")} |`,
    `| ${Array.from({ length: width }, () => "---").join(" | ")} |`,
  ];
  for (const r of parsed.slice(1)) {
    out.push(`| ${r.join(" | ")} |`);
  }
  return out;
}

function isDelimiter(line: string, char: string): boolean {
  const s = line.trim();
  return s.length >= 4 && [...s].every((c) => c === char);
}

export function convertAdoc(source: string, sourceName: string): string {
  const lines = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let pendingBlockTitle: string | null = null;
  let paraBuf: string[] = [];

  const flushPara = (): void => {
    if (paraBuf.length === 0) {
      return;
    }
    const text = convertInline(paraBuf.join(" "));
    paraBuf = [];
    if (out.length > 0 && out[out.length - 1] !== "") {
      out.push("");
    }
    out.push(text);
    out.push("");
  };

  const flushBlank = (): void => {
    flushPara();
    if (out.length > 0 && out[out.length - 1] !== "") {
      out.push("");
    }
  };

  while (i < lines.length) {
    const line = lines[i]!;
    const stripped = line.trim();

    if (
      /^:[^:]+:/.test(stripped) ||
      stripped.startsWith("ifdef::") ||
      stripped.startsWith("ifndef::") ||
      stripped.startsWith("endif::")
    ) {
      i += 1;
      continue;
    }

    if (/^\[#[^\]]+\]\s*$/.test(stripped) || /^\[\[[^\]]+\]\]\s*$/.test(stripped)) {
      i += 1;
      continue;
    }

    if (stripped === "<<<") {
      flushBlank();
      out.push("---");
      flushBlank();
      i += 1;
      continue;
    }

    // Block title (.Something) — not numbered list ". item"
    if (/^\.[^\s.].*/.test(stripped) && !/^\.\s+\S/.test(stripped)) {
      pendingBlockTitle = stripped.slice(1).trim();
      i += 1;
      continue;
    }

    const adm = /^\[(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]\s*$/.exec(stripped);
    if (adm) {
      flushPara();
      const kind = adm[1]!;
      const label =
        ADMONITION_LABELS[kind] ?? kind.charAt(0) + kind.slice(1).toLowerCase();
      i += 1;
      const bodyLines: string[] = [];
      if (i < lines.length && isDelimiter(lines[i]!, "=")) {
        i += 1;
        while (i < lines.length && !isDelimiter(lines[i]!, "=")) {
          bodyLines.push(lines[i]!);
          i += 1;
        }
        if (i < lines.length && isDelimiter(lines[i]!, "=")) {
          i += 1;
        }
      } else {
        while (i < lines.length && lines[i]!.trim()) {
          bodyLines.push(lines[i]!);
          i += 1;
        }
      }
      flushBlank();
      const title = pendingBlockTitle;
      pendingBlockTitle = null;
      const header = `**${label}:**` + (title ? ` ${title}` : "");
      out.push(`> ${header}`);
      out.push(">");
      const bodyMd = convertAdoc(bodyLines.join("\n"), `${sourceName}:admonition`);
      for (const bl of bodyMd.replace(/\n$/, "").split("\n")) {
        out.push(bl ? `> ${bl}` : ">");
      }
      flushBlank();
      continue;
    }

    const src = /^\[source(?:,\s*([^\]]+))?\]\s*$/.exec(stripped);
    if (src || (stripped.startsWith("[source") && stripped.endsWith("]"))) {
      flushPara();
      let lang = "";
      if (src) {
        lang = (src[1] ?? "").trim();
      } else {
        const mlang = /^\[source,\s*([^\]]+)\]/.exec(stripped);
        lang = mlang?.[1]?.trim() ?? "";
      }
      i += 1;
      const code: string[] = [];
      if (i < lines.length && isDelimiter(lines[i]!, "-")) {
        i += 1;
        while (i < lines.length && !isDelimiter(lines[i]!, "-")) {
          code.push(lines[i]!);
          i += 1;
        }
        if (i < lines.length && isDelimiter(lines[i]!, "-")) {
          i += 1;
        }
      } else {
        // Single-line listing without ---- fence
        while (
          i < lines.length &&
          lines[i]!.trim() &&
          !/^\[(NOTE|TIP|WARNING|CAUTION|IMPORTANT|source)/.test(lines[i]!.trim()) &&
          !/^=+\s+/.test(lines[i]!.trim()) &&
          !isDelimiter(lines[i]!, "=")
        ) {
          code.push(lines[i]!);
          i += 1;
          break;
        }
      }
      flushBlank();
      if (pendingBlockTitle) {
        out.push(`**${pendingBlockTitle}**`);
        out.push("");
        pendingBlockTitle = null;
      }
      out.push(`\`\`\`${lang}`);
      out.push(...code);
      out.push("```");
      flushBlank();
      continue;
    }

    if (isDelimiter(stripped, "-") && stripped.length >= 4) {
      flushPara();
      i += 1;
      const code: string[] = [];
      while (i < lines.length && !isDelimiter(lines[i]!, "-")) {
        code.push(lines[i]!);
        i += 1;
      }
      if (i < lines.length && isDelimiter(lines[i]!, "-")) {
        i += 1;
      }
      flushBlank();
      if (pendingBlockTitle) {
        out.push(`**${pendingBlockTitle}**`);
        out.push("");
        pendingBlockTitle = null;
      }
      out.push("```");
      out.push(...code);
      out.push("```");
      flushBlank();
      continue;
    }

    if (isDelimiter(stripped, "=") && stripped.length >= 4) {
      flushPara();
      i += 1;
      const body: string[] = [];
      while (i < lines.length && !isDelimiter(lines[i]!, "=")) {
        body.push(lines[i]!);
        i += 1;
      }
      if (i < lines.length && isDelimiter(lines[i]!, "=")) {
        i += 1;
      }
      flushBlank();
      if (pendingBlockTitle) {
        out.push(`**${pendingBlockTitle}**`);
        out.push("");
        pendingBlockTitle = null;
      }
      const bodyMd = convertAdoc(body.join("\n"), `${sourceName}:openblock`);
      out.push(...bodyMd.replace(/\n$/, "").split("\n"));
      flushBlank();
      continue;
    }

    if (stripped.startsWith("|===")) {
      flushPara();
      i += 1;
      const rows: string[] = [];
      while (i < lines.length && !lines[i]!.trim().startsWith("|===")) {
        if (lines[i]!.trim().startsWith("|")) {
          rows.push(lines[i]!);
        } else if (lines[i]!.trim() === "") {
          // skip blank
        } else if (rows.length > 0) {
          rows[rows.length - 1] = `${rows[rows.length - 1]} ${lines[i]!.trim()}`;
        }
        i += 1;
      }
      if (i < lines.length && lines[i]!.trim().startsWith("|===")) {
        i += 1;
      }
      flushBlank();
      if (pendingBlockTitle) {
        out.push(`**${pendingBlockTitle}**`);
        out.push("");
        pendingBlockTitle = null;
      }
      out.push(...convertTable(rows));
      flushBlank();
      continue;
    }

    const img = parseImageBlock(stripped);
    if (img) {
      flushPara();
      flushBlank();
      if (pendingBlockTitle) {
        out.push(`*${pendingBlockTitle}*`);
        out.push("");
        pendingBlockTitle = null;
      }
      out.push(img);
      flushBlank();
      i += 1;
      continue;
    }

    const hm = /^(=+)\s+(.*)$/.exec(stripped);
    if (hm) {
      flushPara();
      const level = hm[1]!.length;
      const title = convertInline(hm[2]!.trim());
      const hashes = "#".repeat(Math.min(level, 6));
      flushBlank();
      pendingBlockTitle = null;
      out.push(`${hashes} ${title}`);
      flushBlank();
      i += 1;
      continue;
    }

    if (/^-{3,}$/.test(stripped) && stripped.length < 12) {
      flushBlank();
      out.push("---");
      flushBlank();
      i += 1;
      continue;
    }

    if (!stripped) {
      flushPara();
      if (out.length > 0 && out[out.length - 1] !== "") {
        out.push("");
      }
      i += 1;
      continue;
    }

    const lm = /^(\*{1,5})\s+(.*)$/.exec(stripped);
    if (lm) {
      flushPara();
      const depth = lm[1]!.length;
      const content = convertInline(lm[2]!);
      i += 1;
      const cont: string[] = [];
      while (i < lines.length) {
        if (lines[i]!.trim() === "+") {
          i += 1;
          const para: string[] = [];
          while (
            i < lines.length &&
            lines[i]!.trim() &&
            !/^(\*{1,5}|\.{1,5})\s+/.test(lines[i]!.trim()) &&
            !lines[i]!.trim().startsWith("=") &&
            lines[i]!.trim() !== "+"
          ) {
            para.push(lines[i]!.trim());
            i += 1;
          }
          if (para.length > 0) {
            cont.push(para.join(" "));
          }
          continue;
        }
        break;
      }
      const indent = "  ".repeat(depth - 1);
      let lineOut = `${indent}- ${content}`;
      if (cont.length > 0) {
        lineOut += ` ${cont.map((c) => convertInline(c)).join(" ")}`;
      }
      out.push(lineOut);
      pendingBlockTitle = null;
      continue;
    }

    const om = /^(\.{1,5})\s+(.*)$/.exec(stripped);
    if (om) {
      flushPara();
      const depth = om[1]!.length;
      const content = convertInline(om[2]!);
      i += 1;
      const indent = "  ".repeat(depth - 1);
      out.push(`${indent}1. ${content}`);
      pendingBlockTitle = null;
      continue;
    }

    // Table/block attribute lines — skip (tables still parsed)
    if (/^\[[^\]]+\]\s*$/.test(stripped)) {
      i += 1;
      continue;
    }

    if (pendingBlockTitle) {
      flushPara();
      out.push(`**${pendingBlockTitle}**`);
      out.push("");
      pendingBlockTitle = null;
    }

    paraBuf.push(stripped);
    i += 1;
  }

  flushPara();

  const cleaned: string[] = [];
  let blanks = 0;
  for (const outLine of out) {
    if (outLine === "") {
      blanks += 1;
      if (blanks <= 2) {
        cleaned.push(outLine);
      }
    } else {
      blanks = 0;
      cleaned.push(outLine);
    }
  }
  while (cleaned.length > 0 && cleaned[0] === "") {
    cleaned.shift();
  }
  while (cleaned.length > 0 && cleaned[cleaned.length - 1] === "") {
    cleaned.pop();
  }
  return cleaned.join("\n") + "\n";
}

export function buildIndex(
  chapterTitles: ReadonlyArray<readonly [string, string]>,
): string {
  const lines = [
    "# Guia Maker de Impressão 3D",
    "",
    ATTRIBUTION.replace(/\n$/, ""),
    "",
    "Versão convertida para Markdown a partir dos originais AsciiDoc (v0.99.3).",
    "",
    "## Índice",
    "",
  ];
  for (const [fname, title] of chapterTitles) {
    lines.push(`- [${title}](${fname})`);
  }
  lines.push(
    "",
    "## Metadados",
    "",
    "- [Créditos e atribuição](CREDITOS.md)",
    "- [README da conversão](README.md)",
    "- [Licença CC BY-SA 4.0](LICENSE)",
    "",
  );
  return lines.join("\n");
}

export function buildCreditos(): string {
  return `# Créditos

## Obra original

- **Título:** Guia Maker de Impressão 3D — Teoria e Prática Consolidadas
- **Autor:** Cláudio Luís Marques Sampaio, MSc. (Patola)
- **Contato:** patola@makerlinux.com.br
- **Site oficial:** http://www.makerlinux.com.br/ebook
- **Repositório histórico:** https://github.com/Patola/ebook
- **Licença:** [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](LICENSE)

## Esta conversão

Os arquivos Markdown em \`docs/ebook/\` são obras derivadas dos fontes AsciiDoc originais,
convertidos para uso nesta wiki/playbook de impressão 3D.

Conforme a CC BY-SA 4.0:

1. **Atribuição** — crédito ao autor original (acima) é mantido em cada capítulo.
2. **ShareAlike** — o material derivado permanece sob CC BY-SA 4.0 (ver \`LICENSE\`).
3. **Originais** — o arquivo AsciiDoc em \`docs/_arquivo/ebook/\` foi removido deste repositório.

Ilustrações de terceiros mencionadas no texto original permanecem copyright de seus autores,
conforme notas do próprio guia.

## Arquivos relacionados

- [Índice](INDEX.md)
- [README](README.md)
- [Licença](LICENSE)
`;
}

export function buildReadme(): string {
  return `# Ebook — Guia Maker de Impressão 3D (Markdown)

Conversão do ebook AsciiDoc **Guia Maker de Impressão 3D** (Cláudio Luís Marques Sampaio)
para Markdown, sob a mesma licença **CC BY-SA 4.0**.

## Como foi convertido

1. Preferência: \`pandoc -f asciidoc -t gfm\` (não disponível neste ambiente).
2. Conversor Python: \`python core/convert_ebook_adoc.py\` — headings, listas, imagens, tabelas,
   blocos \`NOTE\`/\`TIP\`/\`WARNING\`/\`IMPORTANT\`, listagens \`[source]\`, links e \`latexmath\`/\`stem\`.
3. Cada capítulo começa com bloco de atribuição CC BY-SA apontando para o arquivo dos originais.
4. Imagens permanecem em \`imagens/\` com caminhos relativos \`imagens/<arquivo>\`.
5. Fontes SVG originais e \`.adoc\` viviam em \`docs/_arquivo/ebook/\` (árvore removida do repositório).

## Estrutura ativa

| Arquivo | Conteúdo |
|---|---|
| \`INDEX.md\` | Índice / capa |
| \`01-prefacio.md\` … \`13-sobre.md\` | Capítulos |
| \`CREDITOS.md\` | Atribuição detalhada |
| \`LICENSE\` | Texto CC BY-SA 4.0 |
| \`imagens/\` | Figuras referenciadas pelos capítulos |

## Editar

Edite apenas os \`.md\` e assets ativos nesta pasta.

Obra original: http://www.makerlinux.com.br/ebook
`;
}

function hasChapterAdoc(dir: string): boolean {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return false;
  }
  return CHAPTER_MAP.some(([adocName]) => fs.existsSync(path.join(dir, adocName)));
}

function writeTextFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content.endsWith("\n") ? content : `${content}\n`, {
    encoding: "utf8",
  });
}

/**
 * Convert AsciiDoc ebook chapters to Markdown under docs/ebook/.
 * When sources are absent (canonical MD already present), returns exitCode 2.
 */
export function convertEbookAdoc(options?: { startDir?: string }): {
  exitCode: number;
  warnings: string[];
  written: string[];
} {
  const warnings: string[] = [];
  const written: string[] = [];
  const warn = (msg: string): void => {
    warnings.push(msg);
  };

  const startDir = options?.startDir ?? process.cwd();
  const root = resolveRepoRoot(startDir);
  const ebookRel = path.join("docs", "ebook");
  const archiveRel = path.join("docs", "_arquivo", "ebook");
  // Probe with join only: archive tree may be absent (resolveInsideRepository needs parent).
  const archiveProbe = path.join(root, archiveRel);
  const ebookProbe = path.join(root, ebookRel);

  const archiveHasSources = hasChapterAdoc(archiveProbe);
  const ebookHasSources = hasChapterAdoc(ebookProbe);

  if (!archiveHasSources && !ebookHasSources) {
    warn(SOURCES_REMOVED_WARNING);
    return { exitCode: 2, warnings, written };
  }

  const firstAdoc = CHAPTER_MAP[0]![0];
  const sourceDir = fs.existsSync(path.join(archiveProbe, firstAdoc))
    ? archiveProbe
    : ebookProbe;

  if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
    warn(`Missing sources in ${archiveRel} or ${ebookRel}`);
    return { exitCode: 1, warnings, written };
  }

  const ebook = resolveInsideRepository(root, ebookRel);
  fs.mkdirSync(ebook, { recursive: true });
  const chapterTitles: Array<[string, string]> = [];

  for (const [adocName, mdName, defaultTitle] of CHAPTER_MAP) {
    const srcPath = path.join(sourceDir, adocName);
    if (!fs.existsSync(srcPath)) {
      warn(`missing source ${adocName}`);
      continue;
    }
    const text = fs.readFileSync(srcPath, "utf8");
    let title = defaultTitle;
    for (const rawLine of text.split(/\r?\n/)) {
      const m = /^=\s+(.*)$/.exec(rawLine.trim());
      if (m) {
        title = m[1]!.trim();
        break;
      }
    }
    const body = convertAdoc(text, adocName);
    const mdLines = body.split("\n");
    let assembled: string;
    if (mdLines[0]?.startsWith("# ")) {
      assembled = mdLines[0] + "\n\n" + ATTRIBUTION + "\n" + mdLines.slice(1).join("\n");
    } else {
      assembled = `# ${title}\n\n${ATTRIBUTION}\n${body}`;
    }
    if (!assembled.endsWith("\n")) {
      assembled += "\n";
    }
    const dest = resolveInsideRepository(root, path.join(ebookRel, mdName));
    writeTextFile(dest, assembled);
    chapterTitles.push([mdName, title]);
    written.push(path.relative(root, dest).split(path.sep).join("/"));
  }

  const indexPath = resolveInsideRepository(root, path.join(ebookRel, "INDEX.md"));
  writeTextFile(indexPath, buildIndex(chapterTitles));
  written.push(path.relative(root, indexPath).split(path.sep).join("/"));

  const creditosPath = resolveInsideRepository(root, path.join(ebookRel, "CREDITOS.md"));
  writeTextFile(creditosPath, buildCreditos());
  written.push(path.relative(root, creditosPath).split(path.sep).join("/"));

  const readmePath = resolveInsideRepository(root, path.join(ebookRel, "README.md"));
  writeTextFile(readmePath, buildReadme());
  written.push(path.relative(root, readmePath).split(path.sep).join("/"));

  // Keep full English CC BY-SA text as docs/ebook/LICENSE
  const licenseDest = resolveInsideRepository(root, path.join(ebookRel, "LICENSE"));
  const archiveLicense = path.join(archiveProbe, "LICENSE");
  if (fs.existsSync(licenseDest) && fs.statSync(licenseDest).size >= 5000) {
    // keep existing
  } else if (fs.existsSync(archiveLicense) && fs.statSync(archiveLicense).size >= 5000) {
    fs.copyFileSync(archiveLicense, licenseDest);
    written.push(path.relative(root, licenseDest).split(path.sep).join("/"));
  } else {
    warn("LICENSE missing or too short in docs/ebook/ — restore CC BY-SA 4.0 full text");
  }

  return { exitCode: 0, warnings, written };
}

/** CLI-style entry matching Python main(). */
export function main(options?: { startDir?: string }): number {
  const result = convertEbookAdoc(options);
  for (const w of result.warnings) {
    console.error(`WARNING: ${w}`);
  }
  if (result.warnings.length > 0 && result.exitCode === 0) {
    console.error(`\n${result.warnings.length} warnings`);
  }
  for (const w of result.written) {
    console.log(`Wrote ${w}`);
  }
  return result.exitCode;
}
