import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const openCube = path.join(root, "packages/formats/fixtures/open-cube-safe-hole.3mf");

test("QA-004 public repair: safe hole commits and round-trips", async ({ page }) => {
  test.skip(!fs.existsSync(openCube), "public open-cube fixture missing");
  await page.goto("/");
  await page.getByTestId("repair-safe-toggle").check();
  await page.getByTestId("file-input").setInputFiles(openCube);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });
  await expect(page.getByTestId("repair-status")).toHaveAttribute(
    "data-status",
    "committed",
  );
  await expect(page.getByTestId("decision-kind")).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByTestId("download-button").click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.3mf$/i);
});
