import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "apps/web/dist/assets");
const worker = fs.readdirSync(assets).find((f) => f.startsWith("geometryWorker"));
if (!worker) {
  console.error("WORKER_MISSING");
  process.exit(1);
}
const text = fs.readFileSync(path.join(assets, worker), "utf8");
const report = {
  worker,
  size: text.length,
  hasNodeFs: text.includes("node:fs"),
  hasNodePath: text.includes("node:path"),
  hasNodeModule: text.includes("node:module"),
  hasBufferImport: text.includes("buffer/") || /from["']buffer["']/.test(text),
  hasPython: /\bpython3?\b/i.test(text),
};
const outDir = path.join(root, "artifacts/geometry-quality-v2");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "bundle-audit.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));
const bad =
  report.hasNodeFs ||
  report.hasNodePath ||
  report.hasNodeModule ||
  report.hasBufferImport ||
  report.hasPython;
process.exit(bad ? 1 : 0);
