import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const original = path.join(root, "3ds/original/one+Piece.3mf");
const upgraded = path.join(root, "3ds/upgraded/one+Piece-otimizado.3mf");

function sha256(filePath: string): string {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

test("QA-008 private one+Piece V2 honest optimize + reopen", async ({ page }) => {
  test.skip(!fs.existsSync(original), "private fixture missing");
  const beforeHash = sha256(original);
  expect(fs.statSync(original).size).toBe(6_844_854);

  await page.goto("/");
  await page.getByTestId("repair-safe-toggle").check();
  await page.getByTestId("goal-select").selectOption("balanced");
  await page.getByTestId("file-input").setInputFiles(original);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });

  const exact = Number(
    await page.getByTestId("exact-candidate-count").getAttribute("data-count"),
  );
  expect(exact).toBeGreaterThan(24);
  await expect(page.getByTestId("decision-kind")).toBeVisible();
  await expect(page.getByTestId("part-count")).toBeVisible();

  fs.mkdirSync(path.dirname(upgraded), { recursive: true });
  const downloadPromise = page.waitForEvent("download");
  await page.getByTestId("download-button").click();
  const download = await downloadPromise;
  await download.saveAs(upgraded);
  expect(fs.statSync(upgraded).size).toBeGreaterThan(0);

  await page.getByTestId("file-input").setInputFiles(upgraded);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });

  expect(sha256(original)).toBe(beforeHash);
});
