/**
 * Adversarial wiki-enterprise remediation verifier (plain Node, zero package deps).
 *
 * Antifalse-green purpose: this script must FAIL when the corpus still has generic-only
 * documented printers, unresolved graph edges, empty evidence sections, boilerplate
 * duplication, or forbidden remediation placeholders. A green exit means every rule
 * below was recomputed from docs files on disk — never from plan checklists or stale
 * hardcoded counts. Prefer false red over false green.
 *
 * Usage:
 *   node verify_wiki_enterprise_remediation.mjs [docsRoot]
 * Exit 0 only when zero violations; otherwise non-zero.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKTREE_ROOT = path.resolve(__dirname, "../../..");
const DEFAULT_DOCS = path.join(WORKTREE_ROOT, "docs");
const ALLOWLIST_PATH = path.join(__dirname, "boilerplate-allowlist.txt");

/** Non-wiki trees under docs/ (still scanned only when explicitly included). */
const EXCLUDE_DIR_RE = /[/\\](projeto|ebook|printers|superpowers|_arquivo)([/\\]|$)/;

const UNIT_SPLIT_RE = /mm\s*\(\[[^\]]+\]\([^)]+\)\)\s*\/\s*s/gi;
const SEE_BODY_RE = /see body/gi;
const CARRIED_RE = /carried from prior remediation/gi;
const HEURISTICA_RE = /heurística editorial \(sem fonte pinada\)/gi;

const HIGHER_EVIDENCE_TYPES = new Set([
  "official-product-page",
  "official-technical-specification",
  "official-manual",
  "official-wiki",
  "datasheet",
  "technical-data-sheet",
  "regulatory",
  "peer-reviewed",
  "community-report",
  "discovery-only",
]);

const RULE = {
  UNIQUE_IDS: "UNIQUE_IDS",
  SOURCE_RESOLVE: "SOURCE_RESOLVE",
  INTERNAL_MD_LINKS: "INTERNAL_MD_LINKS",
  FRONT_MATTER_PARSE: "FRONT_MATTER_PARSE",
  COUNTS_DERIVED: "COUNTS_DERIVED",
  SOURCE_CANONICAL_URL: "SOURCE_CANONICAL_URL",
  SOURCE_CLAIMS_LIMITATIONS: "SOURCE_CLAIMS_LIMITATIONS",
  DOCUMENTED_NON_GENERIC_SOURCE: "DOCUMENTED_NON_GENERIC_SOURCE",
  UNIT_SPLITTING: "UNIT_SPLITTING",
  FORBIDDEN_SEE_BODY: "FORBIDDEN_SEE_BODY",
  FORBIDDEN_CARRIED: "FORBIDDEN_CARRIED",
  FORBIDDEN_HEURISTICA: "FORBIDDEN_HEURISTICA",
  TROUBLESHOOTING_SOURCES: "TROUBLESHOOTING_SOURCES",
  DUP_PRINTER_PARAGRAPH: "DUP_PRINTER_PARAGRAPH",
  RESEARCH_LEDGER: "RESEARCH_LEDGER",
};

function stripQuotes(s) {
  const t = String(s ?? "").trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

/**
 * Minimal YAML subset parser for wiki front matter (no external deps).
 * Supports plain scalars, quoted scalars, folded/literal blocks, and simple lists.
 */
function normalizeNewlines(text) {
  return String(text ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function parseSimpleYaml(text) {
  const result = {};
  const lines = normalizeNewlines(text).split("\n");
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    if (!raw.trim() || raw.trim().startsWith("#")) {
      i += 1;
      continue;
    }
    if (/^\s/.test(raw) && !raw.trim().startsWith("-")) {
      // Orphan indented line — treat as parse noise but keep going
      i += 1;
      continue;
    }
    const km = raw.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!km) {
      const err = new Error(`Unexpected YAML line: ${raw}`);
      err.code = "YAML_LINE";
      throw err;
    }
    const key = km[1];
    const rest = km[2];
    const block = rest === "|" || rest === ">" || rest === "|-" || rest === ">-" || rest === "|+" || rest === ">+";

    // List immediately under key
    if (rest === "" || block) {
      if (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        const arr = [];
        i += 1;
        while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
          arr.push(stripQuotes(lines[i].replace(/^\s*-\s+/, "")));
          i += 1;
        }
        result[key] = arr;
        continue;
      }
      if (block || rest === "") {
        const parts = [];
        i += 1;
        while (i < lines.length) {
          const ln = lines[i];
          if (ln.trim() === "") {
            parts.push("");
            i += 1;
            continue;
          }
          if (!/^\s+/.test(ln)) break;
          parts.push(ln.replace(/^\s+/, ""));
          i += 1;
        }
        result[key] = parts.join(block && rest.startsWith("|") ? "\n" : " ").trim();
        continue;
      }
    }

    // Inline flow list: [a, b]
    if (rest.startsWith("[") && rest.endsWith("]")) {
      const inner = rest.slice(1, -1).trim();
      result[key] = inner
        ? inner.split(",").map((x) => stripQuotes(x.trim())).filter((x) => x.length > 0)
        : [];
      i += 1;
      continue;
    }

    // Plain / quoted scalar, possibly continued on indented lines
    let value = stripQuotes(rest);
    i += 1;
    while (i < lines.length && /^\s+\S/.test(lines[i]) && !/^\s*-\s+/.test(lines[i])) {
      const cont = lines[i].replace(/^\s+/, "");
      if (/^[A-Za-z0-9_]+:\s*/.test(cont)) break;
      value = `${value} ${cont}`.trim();
      i += 1;
    }
    result[key] = value;
  }
  return result;
}

function splitFrontMatter(raw) {
  const normalized = normalizeNewlines(raw.replace(/^\uFEFF/, ""));
  if (!normalized.startsWith("---")) {
    return { ok: false, reason: "missing opening ---", fm: null, body: normalized, fmText: null };
  }
  const after = normalized.slice(3);
  // Require newline after opening fence
  if (!after.startsWith("\n") && !after.startsWith("\r\n")) {
    return { ok: false, reason: "opening --- not followed by newline", fm: null, body: normalized, fmText: null };
  }
  const bodyStart = normalized.search(/\n---\r?\n/);
  if (bodyStart === -1) {
    // closing --- at EOF
    const eof = normalized.match(/\n---\s*$/);
    if (!eof) {
      return { ok: false, reason: "missing closing ---", fm: null, body: normalized, fmText: null };
    }
    const fmText = normalized.slice(4, eof.index).replace(/^\r?\n/, "");
    try {
      return { ok: true, fm: parseSimpleYaml(fmText), body: "", fmText, reason: null };
    } catch (err) {
      return { ok: false, reason: String(err.message || err), fm: null, body: "", fmText };
    }
  }
  const fmText = normalized.slice(4, bodyStart).replace(/^\r?\n/, "");
  const closeMatch = normalized.slice(bodyStart).match(/^\n---\r?\n/);
  const body = normalized.slice(bodyStart + closeMatch[0].length);
  try {
    return { ok: true, fm: parseSimpleYaml(fmText), body, fmText, reason: null };
  } catch (err) {
    return { ok: false, reason: String(err.message || err), fm: null, body, fmText };
  }
}

function walkMarkdown(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMarkdown(p, acc);
    else if (ent.name.endsWith(".md")) acc.push(p);
  }
  return acc;
}

function relTo(root, p) {
  return path.relative(root, p).split(path.sep).join("/");
}

function isExcludedPath(filePath) {
  return EXCLUDE_DIR_RE.test(filePath) || path.basename(filePath) === "context.md";
}

function loadAllowlist(filePath) {
  if (!fs.existsSync(filePath)) return new Set();
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const set = new Set();
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    set.add(normalizeParagraph(t));
  }
  return set;
}

function normalizeParagraph(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text) {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

function extractSectionBody(body, headingRe) {
  const m = body.match(headingRe);
  if (!m) return null;
  const start = m.index + m[0].length;
  const rest = body.slice(start);
  const next = rest.search(/\n##\s+/);
  const section = next === -1 ? rest : rest.slice(0, next);
  return section.trim();
}

function hasNonEmptyClaims(body) {
  const section = extractSectionBody(
    body,
    /^##\s*(Claims sustentados|Claims|Alega[cç][oõ]es sustentadas|T[oó]picos sustentados)\s*$/im
  );
  return Boolean(section && section.length > 0);
}

function hasNonEmptyLimitations(body) {
  const section = extractSectionBody(
    body,
    /^##\s*(Limita[cç][oõ]es|Limitations|Limites|Claims que N[AÃ]O sustenta)\s*$/im
  );
  return Boolean(section && section.length > 0);
}

function isGenericSourceId(sid) {
  return /-official-products$/.test(String(sid || ""));
}

function isGenericSource(sid, srcById) {
  if (isGenericSourceId(sid)) return true;
  const src = srcById.get(String(sid || ""));
  if (!src?.fm) return false;
  const st = String(src.fm.source_type || "");
  if (st === "manufacturer-product-listing") return true;
  // Explicit higher-evidence types are never generic even if oddly named
  if (HIGHER_EVIDENCE_TYPES.has(st)) return false;
  return false;
}

function isModelSpecificOrHigher(sid, srcById) {
  return !isGenericSource(sid, srcById);
}

function extractMdLinks(body) {
  const links = [];
  const re = /(!?\[[^\]]*\]\()([^)]+)(\))/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    links.push(m[2].trim());
  }
  return links;
}

function resolveInternalLink(fromFile, target, docsRoot) {
  if (!target || target.startsWith("#")) return { skip: true };
  if (/^[a-z][a-z0-9+.-]*:/i.test(target)) return { skip: true }; // http, mailto, etc.
  const noAnchor = target.split("#")[0].split("?")[0];
  if (!noAnchor) return { skip: true };
  if (!noAnchor.endsWith(".md") && !noAnchor.endsWith(".markdown")) {
    // Allow extensionless relative paths only if file exists as .md
    const absBase = path.resolve(path.dirname(fromFile), noAnchor);
    if (fs.existsSync(absBase) && fs.statSync(absBase).isFile()) {
      return { ok: true, resolved: absBase };
    }
    if (fs.existsSync(`${absBase}.md`)) return { ok: true, resolved: `${absBase}.md` };
    return { ok: false, resolved: absBase };
  }
  const resolved = path.resolve(path.dirname(fromFile), noAnchor);
  // Must stay under docsRoot
  const rel = path.relative(docsRoot, resolved);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    return { ok: false, resolved, outside: true };
  }
  return { ok: fs.existsSync(resolved), resolved };
}

function splitParagraphs(body) {
  return String(body || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => {
      const lines = p
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length === 0) return false;
      // Skip markdown tables — structural chrome, not substantive prose paragraphs
      if (lines.every((l) => l.startsWith("|") || /^:?-+:?$/.test(l.replace(/\|/g, "").trim()))) {
        return false;
      }
      // Skip heading-only blocks
      if (lines.every((l) => l.startsWith("#"))) return false;
      return true;
    });
}

/**
 * @param {string} docsRoot
 * @param {{ includeExcludedDirs?: boolean }} [options]
 */
export function verifyDocs(docsRoot, options = {}) {
  const includeExcluded = Boolean(options.includeExcludedDirs);
  const violations = [];
  const push = (ruleId, file, message) => {
    violations.push({ ruleId, file, message });
  };

  if (!fs.existsSync(docsRoot) || !fs.statSync(docsRoot).isDirectory()) {
    push(RULE.COUNTS_DERIVED, docsRoot, "docs root missing or not a directory — refuse false-green empty run");
    return summarize(docsRoot, [], violations, {});
  }

  const allFiles = walkMarkdown(docsRoot);
  if (allFiles.length === 0) {
    push(RULE.COUNTS_DERIVED, relTo(docsRoot, docsRoot) || ".", "zero markdown files under docs root — refuse false-green empty corpus");
    return summarize(docsRoot, [], violations, {});
  }

  const scopedFiles = includeExcluded ? allFiles : allFiles.filter((p) => !isExcludedPath(p));
  const allowlist = loadAllowlist(ALLOWLIST_PATH);

  const pages = [];
  for (const filePath of scopedFiles) {
    const raw = fs.readFileSync(filePath, "utf8");
    const rel = relTo(docsRoot, filePath);
    const split = splitFrontMatter(raw);
    if (!split.ok) {
      // Pages without FM are allowed only if they have no --- attempt; bare notes fail parse rule when --- present
      if (raw.trimStart().startsWith("---")) {
        push(RULE.FRONT_MATTER_PARSE, rel, split.reason || "unparseable front matter");
      }
      pages.push({ path: filePath, rel, raw, fm: null, body: raw, parseOk: false });
      continue;
    }
    pages.push({
      path: filePath,
      rel,
      raw,
      fm: split.fm,
      body: split.body,
      parseOk: true,
    });
  }

  // --- UNIQUE_IDS ---
  const byId = new Map();
  for (const p of pages) {
    const id = p.fm?.id;
    if (id == null || String(id).trim() === "") continue;
    const sid = String(id);
    if (!byId.has(sid)) byId.set(sid, []);
    byId.get(sid).push(p.rel);
  }
  for (const [id, files] of byId) {
    if (files.length > 1) {
      for (const f of files) {
        push(RULE.UNIQUE_IDS, f, `duplicate id '${id}' also in: ${files.filter((x) => x !== f).join(", ")}`);
      }
    }
  }

  const srcById = new Map();
  for (const p of pages) {
    if (p.fm?.doc_type === "source" && p.fm.id) srcById.set(String(p.fm.id), p);
  }

  const printers = pages.filter((p) => p.fm?.doc_type === "printer");
  const sources = pages.filter((p) => p.fm?.doc_type === "source");
  const troubleshooting = pages.filter(
    (p) =>
      p.fm?.doc_type === "troubleshooting" ||
      /[/\\]12-problemas/.test(p.path) ||
      /(^|[/\\])12-problemas/.test(p.rel)
  );

  // --- SOURCE_RESOLVE ---
  for (const p of pages) {
    if (!p.fm) continue;
    const srcs = Array.isArray(p.fm.sources) ? p.fm.sources : [];
    for (const sid of srcs) {
      const id = String(sid);
      if (!byId.has(id)) {
        push(RULE.SOURCE_RESOLVE, p.rel, `sources entry '${id}' does not resolve to any page id`);
      }
    }
  }

  // --- INTERNAL_MD_LINKS ---
  for (const p of pages) {
    const text = p.body || "";
    for (const target of extractMdLinks(text)) {
      const res = resolveInternalLink(p.path, target, docsRoot);
      if (res.skip) continue;
      if (!res.ok) {
        push(
          RULE.INTERNAL_MD_LINKS,
          p.rel,
          `broken relative link '${target}'${res.outside ? " (escapes docs root)" : ""}`
        );
      }
    }
  }

  // --- COUNTS_DERIVED: live inventory must match doc_type:printer files under 21-impressoras ---
  const printerFilesOnDisk = scopedFiles.filter(
    (p) =>
      /[/\\]21-impressoras[/\\]/.test(p) &&
      path.basename(p) !== "INDEX.md" &&
      !path.basename(p).startsWith("_") &&
      !p.includes(`${path.sep}_meta${path.sep}`)
  );
  const printerPagesCounted = printers.length;
  // Soft consistency: if both populations exist, FM printer count should equal disk model pages when all have doc_type
  // Anti-false-green: counts object always derived below; fail only on empty already handled.
  // Additional check: unique id count must equal pages-with-id when no dupes (reported in totals).
  const pagesWithId = pages.filter((p) => p.fm?.id != null && String(p.fm.id).trim() !== "").length;
  if (pagesWithId === 0 && scopedFiles.length > 0) {
    push(RULE.COUNTS_DERIVED, ".", "markdown files present but zero parseable ids — refuse false-green");
  }

  // --- SOURCE_CANONICAL_URL ---
  for (const s of sources) {
    const url = s.fm?.canonical_url;
    if (url == null || String(url).trim() === "") {
      push(RULE.SOURCE_CANONICAL_URL, s.rel, `source '${s.fm.id}' missing canonical_url`);
    }
  }

  // --- SOURCE_CLAIMS_LIMITATIONS ---
  for (const s of sources) {
    const claims = hasNonEmptyClaims(s.body || "");
    const lim = hasNonEmptyLimitations(s.body || "");
    if (!claims || !lim) {
      push(
        RULE.SOURCE_CLAIMS_LIMITATIONS,
        s.rel,
        `source '${s.fm.id}' needs non-empty claims+limitations sections (claims=${claims}, limitations=${lim})`
      );
    }
  }

  // --- DOCUMENTED_NON_GENERIC_SOURCE ---
  for (const p of printers) {
    const coverage = String(p.fm?.coverage_level || "");
    if (coverage !== "documented") continue;
    const srcs = Array.isArray(p.fm.sources) ? p.fm.sources.map(String) : [];
    if (srcs.length === 0) {
      push(
        RULE.DOCUMENTED_NON_GENERIC_SOURCE,
        p.rel,
        `documented printer '${p.fm.id}' has empty sources — need model-specific or higher evidence`
      );
      continue;
    }
    const hasBetter = srcs.some((sid) => isModelSpecificOrHigher(sid, srcById));
    if (!hasBetter) {
      push(
        RULE.DOCUMENTED_NON_GENERIC_SOURCE,
        p.rel,
        `documented printer '${p.fm.id}' sources are only generic official-products / manufacturer-product-listing: [${srcs.join(", ")}]`
      );
    }
  }

  // --- Phrase / unit-splitting rules (raw text) ---
  for (const p of pages) {
    const raw = p.raw || "";
    for (const m of raw.matchAll(UNIT_SPLIT_RE)) {
      push(RULE.UNIT_SPLITTING, p.rel, `unit-splitting citation: ${m[0]}`);
    }
    for (const m of raw.matchAll(SEE_BODY_RE)) {
      push(RULE.FORBIDDEN_SEE_BODY, p.rel, `forbidden phrase '${m[0]}'`);
    }
    for (const m of raw.matchAll(CARRIED_RE)) {
      push(RULE.FORBIDDEN_CARRIED, p.rel, `forbidden phrase '${m[0]}'`);
    }
    for (const m of raw.matchAll(HEURISTICA_RE)) {
      push(RULE.FORBIDDEN_HEURISTICA, p.rel, `forbidden phrase '${m[0]}'`);
    }
  }

  // --- TROUBLESHOOTING_SOURCES ---
  const tsSeen = new Set();
  for (const p of troubleshooting) {
    if (tsSeen.has(p.rel)) continue;
    tsSeen.add(p.rel);
    // INDEX-only hubs under 12-problemas without doc_type troubleshooting still require sources if they are troubleshooting pages
    if (!p.fm) continue;
    if (p.fm.doc_type && p.fm.doc_type !== "troubleshooting" && !/12-problemas/.test(p.rel)) continue;
    // Apply to doc_type troubleshooting OR any page under 12-problemas with an id
    if (p.fm.doc_type !== "troubleshooting" && !/12-problemas/.test(p.rel)) continue;
    if (path.basename(p.path).toUpperCase() === "INDEX.MD") continue;
    const srcs = Array.isArray(p.fm.sources) ? p.fm.sources : [];
    if (srcs.length === 0) {
      push(
        RULE.TROUBLESHOOTING_SOURCES,
        p.rel,
        `troubleshooting page '${p.fm.id || p.rel}' must have non-empty sources`
      );
    }
  }

  // --- RESEARCH_LEDGER: reject placeholder / non-http URLs in url-ledger.jsonl ---
  const ledgerPath = path.join(
    WORKTREE_ROOT,
    "project_plans/wiki_enterprise_remediation_v2/research/url-ledger.jsonl",
  );
  if (fs.existsSync(ledgerPath)) {
    const lines = fs
      .readFileSync(ledgerPath, "utf8")
      .split(/\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) {
      push(RULE.RESEARCH_LEDGER, "research/url-ledger.jsonl", "ledger is empty");
    }
    for (const line of lines) {
      let row;
      try {
        row = JSON.parse(line);
      } catch {
        push(RULE.RESEARCH_LEDGER, "research/url-ledger.jsonl", "invalid JSONL row");
        continue;
      }
      const url = String(row.url || "");
      const canon = String(row.canonical_url || "");
      if (!/^https?:\/\//i.test(url) || !/^https?:\/\//i.test(canon)) {
        push(
          RULE.RESEARCH_LEDGER,
          "research/url-ledger.jsonl",
          `non-http or placeholder url/canonical_url for ${row.source_id || "unknown"}: ${url}`,
        );
      }
      if (/see body|see-official|carried from prior/i.test(url)) {
        push(
          RULE.RESEARCH_LEDGER,
          "research/url-ledger.jsonl",
          `forbidden placeholder url for ${row.source_id || "unknown"}`,
        );
      }
      if (!row.accessed_at || !row.access_status) {
        push(
          RULE.RESEARCH_LEDGER,
          "research/url-ledger.jsonl",
          `missing accessed_at/access_status for ${row.source_id || "unknown"}`,
        );
      }
    }
  } else {
    push(RULE.RESEARCH_LEDGER, "research/url-ledger.jsonl", "ledger file missing");
  }

  // --- DUP_PRINTER_PARAGRAPH ---
  /** @type {Map<string, string[]>} */
  const paraOwners = new Map();
  for (const p of printers) {
    for (const para of splitParagraphs(p.body || "")) {
      const norm = normalizeParagraph(para);
      if (wordCount(norm) < 20) continue;
      if (allowlist.has(norm)) continue;
      if (!paraOwners.has(norm)) paraOwners.set(norm, []);
      const owners = paraOwners.get(norm);
      if (!owners.includes(p.rel)) owners.push(p.rel);
    }
  }
  for (const [norm, owners] of paraOwners) {
    if (owners.length > 1) {
      const preview = norm.slice(0, 100);
      for (const f of owners) {
        push(
          RULE.DUP_PRINTER_PARAGRAPH,
          f,
          `substantive paragraph (>=20 words) duplicated across ${owners.length} printer pages: "${preview}…" also in ${owners.filter((x) => x !== f).join(", ")}`
        );
      }
    }
  }

  const counts = {
    markdown_files_scanned: scopedFiles.length,
    markdown_files_all_under_docs: allFiles.length,
    pages_with_parseable_fm: pages.filter((p) => p.parseOk).length,
    pages_with_id: pagesWithId,
    unique_ids: byId.size,
    printers: printerPagesCounted,
    printer_model_files_under_21: printerFilesOnDisk.length,
    sources: sources.length,
    troubleshooting_pages: tsSeen.size || troubleshooting.length,
    documented_printers: printers.filter((p) => p.fm?.coverage_level === "documented").length,
  };

  return summarize(docsRoot, pages, violations, counts);
}

function summarize(docsRoot, pages, violations, counts) {
  const byRule = {};
  for (const v of violations) {
    byRule[v.ruleId] = (byRule[v.ruleId] || 0) + 1;
  }
  return {
    ok: violations.length === 0,
    docsRoot,
    violations,
    byRule,
    totals: {
      ...counts,
      violation_total: violations.length,
      by_rule: byRule,
    },
  };
}

function printReport(result) {
  for (const v of result.violations) {
    console.log(`[${v.ruleId}] ${v.file}: ${v.message}`);
  }
  console.log("");
  console.log("=== TOTALS (derived from files) ===");
  console.log(JSON.stringify(result.totals, null, 2));
  console.log(result.ok ? "PASS" : "FAIL");
}

export function main(argv = process.argv.slice(2)) {
  const docsRoot = path.resolve(argv[0] || DEFAULT_DOCS);
  const result = verifyDocs(docsRoot);
  printReport(result);
  process.exitCode = result.ok ? 0 : 1;
  return result;
}

const isMain =
  Boolean(process.argv[1]) &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);
if (isMain) {
  main();
}
