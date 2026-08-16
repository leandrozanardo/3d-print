import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const tilted = path.join(root, "packages/formats/fixtures/tilted-wedge.3mf");

test("QA-005 public non-orthogonal orientation improves vs V1", async ({ page }) => {
  test.skip(!fs.existsSync(tilted), "tilted wedge fixture missing");
  await page.goto("/");
  await page.getByTestId("file-input").setInputFiles(tilted);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });
  const exact = Number(
    await page.getByTestId("exact-candidate-count").getAttribute("data-count"),
  );
  expect(exact).toBeGreaterThan(24);
  await expect(page.getByTestId("orientation-orthogonal")).toHaveAttribute(
    "data-orthogonal",
    "false",
  );
  const improvement = Number(
    await page.getByTestId("relative-improvement").getAttribute("data-value"),
  );
  expect(improvement).toBeGreaterThanOrEqual(0.1);
});
