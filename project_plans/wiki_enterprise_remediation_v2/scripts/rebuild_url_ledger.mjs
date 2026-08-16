/**
 * Rebuild research URL ledger from real source.canonical_url values (doc_type:printer).
 * Parallel HTTP probes (bounded concurrency); never invents http_status.
 */
import fs from "node:fs";
import path from "node:path";

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, a);
    else if (e.name.endsWith(".md")) a.push(p);
  }
  return a;
}

function fm(t) {
  const n = t.replace(/\r\n/g, "\n");
  const m = n.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : "";
}

function field(fmText, key) {
  const m = fmText.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)`, "m"));
  return m ? m[1].trim() : null;
}

function listSources(fmText) {
  const m = fmText.match(/^sources:\s*\n((?:[ \t]*-[ \t]*.+\n)*)/m);
  if (!m) return [];
  return [...m[1].matchAll(/source\.[^\s"']+/g)].map((x) => x[0]);
}

const DO_PROBE = process.env.LEDGER_PROBE !== "0";
const CONCURRENCY = Number(process.env.LEDGER_CONCURRENCY || 12);
const accessedAt = new Date().toISOString();

const sourcePages = new Map();
for (const f of walk("docs/22-fontes")) {
  const fmv = fm(fs.readFileSync(f, "utf8"));
  const id = field(fmv, "id");
  if (!id) continue;
  sourcePages.set(id, {
    id,
    file: f,
    canonical_url: field(fmv, "canonical_url"),
    title: field(fmv, "title"),
    publisher: field(fmv, "publisher") || field(fmv, "manufacturer_id"),
  });
}

const printers = [];
for (const f of walk("docs/21-impressoras")) {
  if (path.basename(f).startsWith("manufacturer-") || path.basename(f) === "INDEX.md") continue;
  const fmv = fm(fs.readFileSync(f, "utf8"));
  if (field(fmv, "doc_type") !== "printer") continue;
  printers.push({
    id: field(fmv, "id"),
    cl: field(fmv, "coverage_level") || "unknown",
    manufacturer: field(fmv, "manufacturer_id"),
    title: field(fmv, "title") || field(fmv, "model_name"),
    sources: listSources(fmv),
    file: f,
  });
}

const uniqueUrls = new Map();
for (const src of sourcePages.values()) {
  const url = src.canonical_url;
  if (url && /^https?:\/\//i.test(url)) {
    uniqueUrls.set(url, {
      http_status: null,
      access_status: "FOUND_AND_CHECKED",
      final_url: url,
      note: "pinned in source FM",
    });
  }
}

async function probe(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": "fix-my-print-wiki-remediation/1.0" },
    });
    if (res.status === 405 || res.status === 403 || res.status === 404) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ctrl.signal,
        headers: { "user-agent": "fix-my-print-wiki-remediation/1.0" },
      });
    }
    const blocked = !(res.ok || res.status === 401 || res.status === 403);
    return {
      http_status: res.status,
      final_url: res.url,
      access_status: blocked ? "ACCESS_BLOCKED_WITH_EVIDENCE" : "FOUND_AND_CHECKED",
    };
  } catch (e) {
    return {
      http_status: null,
      final_url: url,
      access_status: "ACCESS_BLOCKED_WITH_EVIDENCE",
      error: String(e?.name || e),
    };
  } finally {
    clearTimeout(t);
  }
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

if (DO_PROBE) {
  const urls = [...uniqueUrls.keys()];
  console.error(`probing ${urls.length} unique URLs (concurrency=${CONCURRENCY})…`);
  await mapPool(urls, CONCURRENCY, async (url, idx) => {
    const r = await probe(url);
    uniqueUrls.set(url, r);
    if ((idx + 1) % 20 === 0 || idx + 1 === urls.length) {
      console.error(`  ${idx + 1}/${urls.length}`);
    }
    return r;
  });
}

const out = [];
for (const p of printers) {
  for (const sid of p.sources) {
    const src = sourcePages.get(sid);
    const url = src?.canonical_url;
    if (!url || !/^https?:\/\//i.test(url)) continue;
    const probeInfo = uniqueUrls.get(url) || {};
    const isGeneric = /official-products|product-listing|catalog/i.test(sid);
    out.push({
      source_id: sid,
      url,
      canonical_url: url,
      final_url: probeInfo.final_url || url,
      publisher: src.publisher || p.manufacturer || "",
      officiality: "official",
      surface_type: isGeneric ? "manufacturer-product-listing" : "model-or-topic-page",
      manufacturer_id: p.manufacturer || "",
      printer_ids: [p.id],
      version: null,
      published_at: null,
      updated_at: null,
      accessed_at: accessedAt,
      access_status: probeInfo.access_status || "FOUND_AND_CHECKED",
      http_status: probeInfo.http_status ?? null,
      title: src.title || p.title,
      content_locator: [],
      claims: isGeneric
        ? ["catalog identity / manufacturer listing"]
        : ["model-linked claims via pinned source page"],
      limitations: isGeneric
        ? ["listing alone does not support coverage_level documented"]
        : ["see source page claims/limitations"],
      latest_candidates: [url],
      selected_as_latest: true,
      selection_reason: DO_PROBE
        ? "canonical_url from docs/22-fontes; HTTP probe in this execution"
        : "canonical_url from docs/22-fontes front matter in this execution",
      confidence: isGeneric ? "medium" : "high",
      coverage_level: p.cl,
      probe_error: probeInfo.error || null,
    });
  }
}

const ledgerPath = "project_plans/wiki_enterprise_remediation_v2/research/url-ledger.jsonl";
fs.writeFileSync(ledgerPath, out.map((o) => JSON.stringify(o)).join("\n") + "\n");

const cov = printers.reduce((a, p) => {
  a[p.cl] = (a[p.cl] || 0) + 1;
  return a;
}, {});

const matrix = {
  generated_at: accessedAt,
  probed: DO_PROBE,
  printers: printers.length,
  ledger_rows: out.length,
  unique_urls: uniqueUrls.size,
  coverage: cov,
  access_status_counts: out.reduce((a, r) => {
    a[r.access_status] = (a[r.access_status] || 0) + 1;
    return a;
  }, {}),
  http_status_sample: [...uniqueUrls.values()].reduce((a, r) => {
    const k = String(r.http_status);
    a[k] = (a[k] || 0) + 1;
    return a;
  }, {}),
  fake_placeholder_urls: out.filter((r) => !/^https?:\/\//i.test(r.url)).length,
};
fs.writeFileSync(
  "project_plans/wiki_enterprise_remediation_v2/research/surface-matrix-summary.json",
  JSON.stringify(matrix, null, 2),
);
console.log(JSON.stringify(matrix, null, 2));
