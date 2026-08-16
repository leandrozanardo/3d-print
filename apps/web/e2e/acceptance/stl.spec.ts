import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const cube = path.join(root, "packages/formats/fixtures/cube.stl");

test("public STL flow downloads optimized binary", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("file-input").setInputFiles(cube);
  await expect(page.getByTestId("selected-file-card")).toContainText("cube.stl");
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 60_000 });
  const downloadPromise = page.waitForEvent("download", { timeout: 30_000 });
  await page.getByTestId("download-button").click();
  const download = await downloadPromise;
  const suggested = download.suggestedFilename();
  expect(suggested.toLowerCase()).toMatch(/\.stl$/);
});
