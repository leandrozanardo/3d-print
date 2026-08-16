import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const multi = path.join(root, "packages/formats/fixtures/two-cubes.3mf");

test("QA-006 public multiobject preserves part count", async ({ page }) => {
  test.skip(!fs.existsSync(multi), "two-cubes fixture missing");
  await page.goto("/");
  await page.getByTestId("file-input").setInputFiles(multi);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });
  await expect(page.getByTestId("part-count")).toHaveAttribute("data-count", "2");
  const downloadPromise = page.waitForEvent("download");
  await page.getByTestId("download-button").click();
  const download = await downloadPromise;
  const outPath = path.join(root, ".tmp/geometry-quality-v2/e2e-multi.3mf");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await download.saveAs(outPath);
  await page.getByTestId("file-input").setInputFiles(outPath);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });
  await expect(page.getByTestId("part-count")).toHaveAttribute("data-count", "2");
});
