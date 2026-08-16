import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const fixture = path.join(root, "packages/formats/fixtures/cube.stl");

test("public mesh flow works across browsers", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("local-processing-badge")).toBeVisible();
  await page.getByTestId("file-input").setInputFiles(fixture);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 90_000 });
});
