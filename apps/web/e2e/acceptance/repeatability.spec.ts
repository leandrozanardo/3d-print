import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const cube = path.join(root, "packages/formats/fixtures/cube.stl");

test("three consecutive STL optimizations succeed", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "repeatability on Chromium");
  await page.goto("/");
  for (let i = 0; i < 3; i++) {
    // Clear then re-set so Chromium fires change for the same fixture path.
    await page.getByTestId("file-input").setInputFiles([]);
    await page.getByTestId("file-input").setInputFiles(cube);
    await expect(page.getByTestId("selected-file-card")).toBeVisible();
    await expect(page.getByTestId("optimize-button")).toBeEnabled();
    await page.getByTestId("optimize-button").click();
    await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 60_000 });
    await page.getByTestId("optimize-another-button").click();
    await expect(page.getByTestId("result-panel")).toHaveCount(0);
  }
});
