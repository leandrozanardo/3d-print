#!/usr/bin/env node
/**
 * Verifies the melhorar-docs-bambu-a1-mini demand slice from any CWD.
 * Usage: node scripts/verify-bambu-a1-mini-docs-demand.mjs <g1|g2|g3|g4|g5|g6>
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
process.chdir(root);

const gate = process.argv[2] ?? "";

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

if (gate === "g1") {
  const r = spawnSync(
    process.execPath,
    ["apps/cli/dist/bin.js", "validate-wiki", "docs", "--strict", "--json"],
    { encoding: "utf8", cwd: root },
  );
  if (!r.stdout) fail(r.stderr || "no stdout from validate-wiki");
  const j = JSON.parse(r.stdout);
  const paths = [
    "22-fontes/bambu-forum-a1-mini-patterns.md",
    "22-fontes/makerworld-profile-patterns.md",
    "22-fontes/bambu-a1-mini-wiki-nozzle-clog.md",
    "22-fontes/bambu-a1-mini-wiki-blob.md",
    "22-fontes/bambu-a1-mini-wiki-clump-detect.md",
    "21-impressoras/bambu-lab-a1-mini.md",
    "08-slicers-e-configuracoes/bambu-studio.md",
    "_meta/politica-de-fontes.md",
    "_meta/politica-de-evidencias.md",
  ];
  const bad = (j.issues || []).filter(
    (i) =>
      i.severity === "error" &&
      paths.some(
        (p) =>
          String(i.path || "")
            .replace(/\\/g, "/")
            .endsWith(p) || String(i.message || "").includes(p),
      ),
  );
  if (bad.length) fail(JSON.stringify(bad, null, 2));
  console.log("demand wiki slice verification passed");
  process.exit(0);
}

if (gate === "g2") {
  const p = "docs/projeto/workflow/makerworld-para-receita.md";
  const i = "docs/projeto/workflow/INDEX.md";
  if (!exists(p)) fail("missing playbook");
  const t = read(p);
  if (!/MakerWorld/i.test(t) || !/A1 Mini/i.test(t)) fail("playbook missing markers");
  if (!/makerworld-para-receita/.test(read(i))) fail("INDEX missing link");
  console.log("makerworld playbook verification passed");
  process.exit(0);
}

if (gate === "g3") {
  const t = read("docs/21-impressoras/bambu-lab-a1-mini.md");
  if (!/wiki\.bambulab\.com/i.test(t) || !/180/.test(t) || !/source\.bambu/.test(t)) {
    fail("canonical A1 Mini markers missing");
  }
  console.log("canonical a1-mini verification passed");
  process.exit(0);
}

if (gate === "g4") {
  const t = read("docs/projeto/fontes-e-atribuicao.md");
  if (
    !/forum\.bambulab\.com/i.test(t) ||
    !/validat/i.test(t) ||
    !(/hypothesis/i.test(t) || /heuristic/i.test(t) || /community/i.test(t))
  ) {
    fail("community source markers missing");
  }
  console.log("community evidence markers verification passed");
  process.exit(0);
}

if (gate === "g5") {
  for (const f of [
    "docs/projeto/troubleshooting/falha-adesao.md",
    "docs/projeto/troubleshooting/warping.md",
    "docs/projeto/qualidade-e-acabamento/stringing-e-retract.md",
    "docs/projeto/troubleshooting/suporte-dificil-remover.md",
  ]) {
    if (!exists(f)) fail("missing " + f);
  }
  console.log("troubleshooting coverage verification passed");
  process.exit(0);
}

if (gate === "g6") {
  const a = read("docs/projeto/INDEX.md");
  const b = read("docs/21-impressoras/bambu-lab-a1-mini.md");
  if (!/workflow/i.test(a)) fail("hub bridge markers missing");
  if (!(/projeto/i.test(b) || /optimization/i.test(b) || /playbook/i.test(b) || /makerworld/i.test(b))) {
    fail("hub bridge markers missing");
  }
  console.log("hub bridge verification passed");
  process.exit(0);
}

fail("usage: node scripts/verify-bambu-a1-mini-docs-demand.mjs <g1|g2|g3|g4|g5|g6>");
