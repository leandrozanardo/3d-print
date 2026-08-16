/**
 * Baseline reproduction script for wiki_enterprise_remediation_v2.
 * Reads docs/ (read-only) and writes baseline-metrics.json + prints markdown summary.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../..");
const DOCS = path.join(ROOT, "docs");
const OUT_JSON = path.join(__dirname, "baseline-metrics.json");
const OUT_MD = path.join(__dirname, "../00-baseline-reproduced.md");

const EXCLUDE_DIR_RE = /[/\\](projeto|ebook|printers|superpowers|_arquivo)([/\\]|$)/;

function walkMarkdown(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMarkdown(p, acc);
    else if (ent.name.endsWith(".md")) acc.push(p);
  }
  return acc;
}

function parsePage(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { path: filePath, fm: null, body: raw, raw };
  try {
    return { path: filePath, fm: yaml.parse(m[1]), body: m[2], raw };
  } catch (err) {
    return { path: filePath, fm: null, body: raw, raw, parseError: String(err) };
  }
}

function relDocs(p) {
  return path.relative(DOCS, p).split(path.sep).join("/");
}

function isCanonicalScope(page) {
  if (EXCLUDE_DIR_RE.test(page.path)) return false;
  if (path.basename(page.path) === "context.md") return false;
  return Boolean(page.fm && page.fm.id);
}

function isGenericSourceId(sid, srcById) {
  const id = String(sid || "");
  if (/-official-products$/.test(id)) return true;
  const src = srcById[id];
  if (src && src.fm?.source_type === "manufacturer-product-listing") return true;
  return false;
}

function extractSection(body, headingRe) {
  const m = body.match(headingRe);
  if (!m) return null;
  const start = m.index + m[0].length;
  const rest = body.slice(start);
  const next = rest.search(/\n##\s+/);
  return next === -1 ? rest : rest.slice(0, next);
}

function countLacunaBullets(body) {
  const section = extractSection(body, /^##\s+Lacunas\s*$/m);
  if (section == null) return 0;
  return [...section.matchAll(/^\s*[-*]\s+\S/gm)].length;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collectModelTokens(fm) {
  const toks = new Set();
  const add = (s) => {
    if (s == null) return;
    for (const w of String(s).split(/[^A-Za-z0-9]+/)) {
      if (w.length >= 3) toks.add(w.toLowerCase());
    }
  };
  add(fm.title);
  add(fm.model_name);
  add(fm.manufacturer_id);
  add(fm.organization);
  for (const a of fm.aliases_en || []) add(a);
  for (const a of fm.aliases_pt_br || []) add(a);
  // manufacturer slug from id printer.<mfr>-...
  if (typeof fm.id === "string" && fm.id.startsWith("printer.")) {
    const slug = fm.id.slice("printer.".length);
    add(slug);
    const parts = slug.split("-");
    if (parts[0]) add(parts[0]);
  }
  return [...toks].sort((a, b) => b.length - a.length);
}

function normalizeBody(page) {
  let b = String(page.body || "").toLowerCase();
  b = b.replace(/\s+/g, " ").trim();
  for (const tok of collectModelTokens(page.fm || {})) {
    b = b.replace(new RegExp(escapeRegExp(tok), "gi"), "MODEL");
  }
  return b;
}

function hasClaimsSection(body) {
  return /^##\s*(Claims sustentados|Claims|Alega[cç][oõ]es sustentadas)\s*$/im.test(body);
}

function hasLimitationsSection(body) {
  return /^##\s*(Limita[cç][oõ]es|Limitations)\s*$/im.test(body);
}

function countOccurrences(text, re) {
  const flags = re.flags.includes("g") ? re.flags : re.flags + "g";
  const r = new RegExp(re.source, flags);
  return [...text.matchAll(r)].length;
}

function main() {
  const pages = walkMarkdown(DOCS).map(parsePage);
  const canonical = pages.filter(isCanonicalScope);
  const printers = canonical.filter((p) => p.fm.doc_type === "printer");
  const sources = canonical.filter((p) => p.fm.doc_type === "source");
  const troubleshooting = canonical.filter((p) => p.fm.doc_type === "troubleshooting");
  const srcById = Object.fromEntries(sources.map((s) => [s.fm.id, s]));

  const coverage_level = {};
  for (const p of printers) {
    const k = p.fm.coverage_level ?? "(missing)";
    coverage_level[k] = (coverage_level[k] || 0) + 1;
  }

  const genericOnlyPrinters = [];
  for (const p of printers) {
    const srcs = Array.isArray(p.fm.sources) ? p.fm.sources : [];
    if (srcs.length === 0) continue;
    if (srcs.every((sid) => isGenericSourceId(sid, srcById))) {
      genericOnlyPrinters.push({
        file: relDocs(p.path),
        id: p.fm.id,
        sources: srcs,
      });
    }
  }

  let lacuna_bullets = 0;
  const lacuna_by_printer = [];
  for (const p of printers) {
    const n = countLacunaBullets(p.body || "");
    lacuna_bullets += n;
    if (n > 0) lacuna_by_printer.push({ file: relDocs(p.path), bullets: n });
  }

  // Unit-splitting: mm ([...])/s  — citation inserted between unit and /s
  const unitSplitRe = /mm\s*\(\[[^\]]*\](?:\([^)]*\))?\)\s*\/\s*s/gi;
  let unit_splitting_citations = 0;
  const unit_splitting_samples = [];
  for (const p of canonical) {
    const matches = [...(p.raw || "").matchAll(unitSplitRe)];
    unit_splitting_citations += matches.length;
    for (const m of matches) {
      if (unit_splitting_samples.length < 20) {
        unit_splitting_samples.push({ file: relDocs(p.path), match: m[0] });
      }
    }
  }

  let heuristica_editorial = 0;
  const heuristica_samples = [];
  for (const p of canonical) {
    const n = countOccurrences(p.raw || "", /heurística editorial \(sem fonte pinada\)/gi);
    heuristica_editorial += n;
    if (n > 0) heuristica_samples.push({ file: relDocs(p.path), count: n });
  }

  const sources_without_canonical_url = sources
    .filter((s) => !s.fm.canonical_url || String(s.fm.canonical_url).trim() === "")
    .map((s) => ({ file: relDocs(s.path), id: s.fm.id }));

  const sources_without_claims_or_limitations = [];
  for (const s of sources) {
    const claims = hasClaimsSection(s.body || "");
    const lim = hasLimitationsSection(s.body || "");
    if (!claims || !lim) {
      sources_without_claims_or_limitations.push({
        file: relDocs(s.path),
        id: s.fm.id,
        has_claims: claims,
        has_limitations: lim,
      });
    }
  }

  let see_body = 0;
  let carried_from_prior = 0;
  const see_body_files = [];
  const carried_files = [];
  for (const p of canonical) {
    const sb = countOccurrences(p.raw || "", /see body/gi);
    const cf = countOccurrences(p.raw || "", /carried from prior/gi);
    see_body += sb;
    carried_from_prior += cf;
    if (sb > 0) see_body_files.push({ file: relDocs(p.path), count: sb });
    if (cf > 0) carried_files.push({ file: relDocs(p.path), count: cf });
  }

  const troubleshooting_empty_sources = troubleshooting
    .filter((p) => !Array.isArray(p.fm.sources) || p.fm.sources.length === 0)
    .map((p) => ({ file: relDocs(p.path), id: p.fm.id }));

  // Body hash uniqueness (printers)
  const hashGroups = new Map();
  for (const p of printers) {
    const normalized = normalizeBody(p);
    const hash = crypto.createHash("sha256").update(normalized).digest("hex");
    if (!hashGroups.has(hash)) hashGroups.set(hash, []);
    hashGroups.get(hash).push(relDocs(p.path));
  }
  const duplicate_groups = [...hashGroups.entries()]
    .filter(([, members]) => members.length > 1)
    .map(([hash, members]) => ({
      hash,
      size: members.length,
      members: members.sort(),
    }))
    .sort((a, b) => b.size - a.size || a.members[0].localeCompare(b.members[0]));

  const unique_body_hashes = hashGroups.size;
  const printers_in_duplicate_groups = duplicate_groups.reduce((n, g) => n + g.size, 0);

  // Contradiction sample: Anycubic Kobra 3 (requested)
  const kobraPage = printers.find((p) => p.fm.id === "printer.anycubic-kobra-3");
  const kobraSource = sources.find((s) => s.fm.id === "source.anycubic-kobra-3");
  const kobraBody = kobraPage?.body || "";
  const kobraUnpublishedLines = (kobraBody.match(/^.*n[aã]o publicad[oa]s?.*$/gim) || []).map((l) =>
    l.trim()
  );
  const kobraSpecsHasSyncedTable =
    /##\s+Especifica/i.test(kobraBody) &&
    /Build volume/i.test(kobraBody) &&
    /source\.anycubic-kobra-3/i.test(kobraBody);
  const contradiction = {
    printer_page: kobraPage ? relDocs(kobraPage.path) : null,
    source_page: kobraSource ? relDocs(kobraSource.path) : null,
    printer_says_unpublished: kobraUnpublishedLines.length > 0,
    printer_unpublished_lines: kobraUnpublishedLines,
    specs_section_already_has_sourced_table: kobraSpecsHasSyncedTable,
    source_has_numeric_specs: kobraSource
      ? /Build volume:|Max print speed:|Max nozzle:|Max heatbed:/i.test(kobraSource.body || "")
      : false,
    evidence_excerpt: {
      printer_unpublished_examples: kobraUnpublishedLines.slice(0, 5),
      note:
        "Especificações may already mirror source claims; Manuais/Hardware/Materiais still assert unpublished vs listing while source.anycubic-kobra-3 pins numeric OEM claims.",
      source_claims: [
        "Build volume: 250 × 250 × 260 mm³",
        "Max print speed: Recommended 300 mm/s; Maximum 600 mm/s",
        "Max nozzle: 300 °C; 0.4 mm std (0.6/0.8 opcional)",
        "Max heatbed: 110 °C, PEI spring steel",
      ],
    },
  };

  // Supplemental near-miss counts (not the exact requested phrases)
  let sem_fonte_pinada = 0;
  for (const p of canonical) {
    sem_fonte_pinada += countOccurrences(p.raw || "", /sem fonte pinada/gi);
  }
  let mm_open_bracket_citations = 0;
  for (const p of canonical) {
    mm_open_bracket_citations += countOccurrences(p.raw || "", /mm\s*\(\[/gi);
  }

  const metrics = {
    generated_at: new Date().toISOString(),
    worktree: ".tmp/wiki-enterprise-final-c75213a",
    scope: {
      root: "docs/",
      excluded_dirs: ["projeto", "ebook", "printers", "superpowers", "_arquivo"],
      excluded_files: ["context.md"],
      definition: "Markdown under docs/ with YAML front matter field id, after exclusions",
    },
    counts: {
      canonical_pages_with_front_matter_id: canonical.length,
      printers_total: printers.length,
      printers_by_coverage_level: coverage_level,
      printers_sources_only_generic_official_products_or_manufacturer_listing:
        genericOnlyPrinters.length,
      lacuna_bullets_across_printers: lacuna_bullets,
      normalized_body_hash: {
        printers_hashed: printers.length,
        unique_hashes: unique_body_hashes,
        duplicate_group_count: duplicate_groups.length,
        printers_in_duplicate_groups,
        uniqueness_ratio:
          printers.length === 0 ? null : Number((unique_body_hashes / printers.length).toFixed(6)),
      },
      unit_splitting_citations_mm_bracket_slash_s: unit_splitting_citations,
      heuristica_editorial_sem_fonte_pinada: heuristica_editorial,
      sources_total: sources.length,
      sources_without_canonical_url: sources_without_canonical_url.length,
      sources_without_claims_or_limitations_sections:
        sources_without_claims_or_limitations.length,
      see_body_occurrences: see_body,
      carried_from_prior_occurrences: carried_from_prior,
      troubleshooting_pages_total: troubleshooting.length,
      troubleshooting_pages_with_empty_sources: troubleshooting_empty_sources.length,
    },
    supplemental_near_misses: {
      sem_fonte_pinada_occurrences: sem_fonte_pinada,
      mm_open_bracket_citation_occurrences: mm_open_bracket_citations,
      note:
        "Exact requested phrases for unit-splitting (mm ([…])/s) and 'heurística editorial (sem fonte pinada)' are 0 in canonical docs; these near-misses are recorded for remediation context only.",
    },
    top_10_duplicate_groups: duplicate_groups.slice(0, 10),
    samples: {
      generic_only_printers_first_20: genericOnlyPrinters.slice(0, 20).map((x) => x.file),
      unit_splitting: unit_splitting_samples,
      heuristica_editorial: heuristica_samples,
      sources_without_canonical_url,
      sources_without_claims_or_limitations: sources_without_claims_or_limitations.slice(0, 50),
      see_body_files,
      carried_from_prior_files: carried_files,
      troubleshooting_empty_sources,
      contradiction_anycubic_kobra_3: contradiction,
    },
    method_notes: {
      generic_source:
        "Source id ends with -official-products OR source_type === manufacturer-product-listing",
      body_normalization:
        "lowercase + collapse whitespace + replace title/model/manufacturer/alias/slug tokens (len>=3) with MODEL",
      unit_splitting_regex: String(unitSplitRe),
      lacuna_bullets: "Bullet lines under ## Lacunas on printer pages",
    },
  };

  fs.writeFileSync(OUT_JSON, JSON.stringify(metrics, null, 2) + "\n", "utf8");

  const topDupMd = metrics.top_10_duplicate_groups
    .map((g, i) => {
      const members = g.members.map((m) => `\`${m}\``).join(", ");
      return `${i + 1}. **size ${g.size}** — hash \`${g.hash.slice(0, 12)}…\`\n   - ${members}`;
    })
    .join("\n");

  const md = `# Baseline reproduced — wiki enterprise remediation v2

**Worktree:** \`.tmp/wiki-enterprise-final-c75213a\`
**Generated:** ${metrics.generated_at}
**Scope:** Markdown under \`docs/\` with front matter \`id\`, excluding \`projeto/\`, \`ebook/\`, \`printers/\`, \`superpowers/\`, \`_arquivo/\`, and \`context.md\`.
**Artifact:** \`research/baseline-metrics.json\`

## Exact counts

| # | Metric | Value |
|---|---|---|
| 1 | Canonical pages with front matter \`id\` | **${metrics.counts.canonical_pages_with_front_matter_id}** |
| 2 | Printers by \`coverage_level\` | ${Object.entries(coverage_level)
    .map(([k, v]) => `\`${k}\`: **${v}**`)
    .join("; ")} (total **${metrics.counts.printers_total}**) |
| 3 | Printers whose sources are ONLY \`*-official-products\` / \`manufacturer-product-listing\` (no model-specific source) | **${metrics.counts.printers_sources_only_generic_official_products_or_manufacturer_listing}** |
| 4 | Lacuna bullets across printers (\`## Lacunas\`) | **${metrics.counts.lacuna_bullets_across_printers}** |
| 5 | Normalized body hash uniqueness | unique **${unique_body_hashes}** / **${printers.length}** printers; duplicate groups **${duplicate_groups.length}**; printers in dup groups **${printers_in_duplicate_groups}**; ratio **${metrics.counts.normalized_body_hash.uniqueness_ratio}** |
| 6 | Unit-splitting citations (\`mm ([…])/s\`) | **${unit_splitting_citations}** |
| 7 | Occurrences of \`heurística editorial (sem fonte pinada)\` | **${heuristica_editorial}** |
| 8 | Sources without \`canonical_url\` in FM | **${sources_without_canonical_url.length}** / ${sources.length} |
| 9 | Sources without Claims and/or Limitações sections | **${sources_without_claims_or_limitations.length}** / ${sources.length} |
| 10 | \`see body\` / \`carried from prior\` | **${see_body}** / **${carried_from_prior}** |
| 11 | Troubleshooting pages with empty \`sources\` | **${troubleshooting_empty_sources.length}** / ${troubleshooting.length} |
| 12 | Sample contradiction (Anycubic Kobra 3) | see below |

## Top 10 duplicate body groups

${topDupMd || "_none_"}

## Metric 12 — Anycubic Kobra 3 contradiction

| Role | Path |
|---|---|
| Printer page | \`${contradiction.printer_page}\` |
| Source page | \`${contradiction.source_page}\` |

- \`printer_says_unpublished=${contradiction.printer_says_unpublished}\` (lines still asserting **não publicado** in Manuais / Hardware / Materiais).
- \`specs_section_already_has_sourced_table=${contradiction.specs_section_already_has_sourced_table}\`.
- \`source_has_numeric_specs=${contradiction.source_has_numeric_specs}\` on \`source.anycubic-kobra-3\` **Claims sustentados** (build volume, speeds, nozzle/bed temps).
- Residual contradiction: source pins numeric OEM claims while printer sections still say hardware/manuals/material matrix are unpublished on listing evidence.

### Unpublished lines (printer)

${(contradiction.printer_unpublished_lines || []).map((l) => `- ${l}`).join("\n") || "_none_"}

## Supplemental near-misses (not exact requested phrases)

| Near-miss | Value |
|---|---|
| \`sem fonte pinada\` (any wording) | **${sem_fonte_pinada}** |
| \`mm ([\` citation openings | **${mm_open_bracket_citations}** |

## Method notes

- **Generic source:** id ends with \`-official-products\` **or** linked source page has \`source_type: manufacturer-product-listing\`.
- **Body normalization:** lowercase, collapse whitespace, replace title / model_name / manufacturer_id / aliases / printer slug tokens (length ≥ 3) with \`MODEL\`, then SHA-256.
- **Unit-splitting regex:** \`mm\\s*\\(\\[[^\\]]*\\](?:\\([^)]*\\))?\\)\\s*/\\s*s\`
- **Lacuna bullets:** lines matching \`^\\s*[-*]\\s+\\S\` under \`## Lacunas\` on \`doc_type: printer\` pages.
- Script: \`research/compute-baseline.mjs\`

## Troubleshooting empty sources (detail)

${
  troubleshooting_empty_sources.length
    ? troubleshooting_empty_sources.map((x) => `- \`${x.file}\` (\`${x.id}\`)`).join("\n")
    : "_none_"
}

## Unit-splitting samples

${
  unit_splitting_samples.length
    ? unit_splitting_samples.map((x) => `- \`${x.file}\`: \`${x.match}\``).join("\n")
    : "_none_"
}
`;

  fs.writeFileSync(OUT_MD, md, "utf8");
  console.log(JSON.stringify(metrics.counts, null, 2));
  console.log("Wrote", OUT_JSON);
  console.log("Wrote", OUT_MD);
}

main();
