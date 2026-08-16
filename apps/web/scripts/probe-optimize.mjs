/**
 * Diagnostic-only Playwright probe for "Otimizar modelo does nothing".
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const cube = path.join(root, "packages/formats/fixtures/cube.stl");
const outDir = path.join(root, ".tmp/optimize-debug");
fs.mkdirSync(outDir, { recursive: true });

const baseURL = process.env.DEBUG_BASE_URL ?? "http://127.0.0.1:5175";

async function main() {
  const logs = [];
  const log = (line) => {
    logs.push(line);
    console.log(line);
  };

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => log(`[console.${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (err) => log(`[pageerror] ${err.message}`));
  page.on("requestfailed", (req) =>
    log(`[requestfailed] ${req.url()} ${req.failure()?.errorText ?? ""}`),
  );

  log(`baseURL=${baseURL}`);
  log(`cubeExists=${fs.existsSync(cube)}`);

  try {
    await page.goto(baseURL, { waitUntil: "networkidle", timeout: 30_000 });
  } catch (e) {
    log(`[goto-failed] ${e instanceof Error ? e.message : String(e)}`);
    fs.writeFileSync(path.join(outDir, "probe.log"), logs.join("\n"));
    await browser.close();
    process.exit(2);
  }

  await page.screenshot({ path: path.join(outDir, "01-loaded.png"), fullPage: true });

  await page.getByTestId("file-input").setInputFiles(cube);
  await page.getByTestId("selected-file-card").waitFor({ timeout: 10_000 });

  const before = await page.evaluate(() => {
    const btn = document.querySelector('[data-testid="optimize-button"]');
    return {
      disabled: btn ? btn.disabled : null,
      text: btn ? btn.textContent : null,
      hasProcessing: !!document.querySelector('[data-testid="processing-panel"]'),
      hasResult: !!document.querySelector('[data-testid="result-panel"]'),
      hasError: !!document.querySelector('[data-testid="error-alert"]'),
      bodySnippet: (document.body?.innerText || "").slice(0, 500),
    };
  });
  log(`[before-click] ${JSON.stringify(before)}`);
  await page.screenshot({ path: path.join(outDir, "02-file-ready.png"), fullPage: true });

  await page.getByTestId("optimize-button").click({ force: true });
  log("[clicked] optimize-button");

  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(500);
    const snap = await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="optimize-button"]');
      return {
        disabled: btn ? btn.disabled : null,
        hasProcessing: !!document.querySelector('[data-testid="processing-panel"]'),
        hasResult: !!document.querySelector('[data-testid="result-panel"]'),
        hasError: !!document.querySelector('[data-testid="error-alert"]'),
        progressText:
          document.querySelector('[data-testid="progress-stage"]')?.textContent ?? null,
        errorText:
          document.querySelector('[data-testid="error-alert"]')?.textContent ?? null,
      };
    });
    log(`[t+${(i + 1) * 500}ms] ${JSON.stringify(snap)}`);
    if (snap.hasProcessing || snap.hasResult || snap.hasError) break;
  }

  await page.screenshot({
    path: path.join(outDir, "03-after-click.png"),
    fullPage: true,
  });
  fs.writeFileSync(path.join(outDir, "probe.log"), logs.join("\n"));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
