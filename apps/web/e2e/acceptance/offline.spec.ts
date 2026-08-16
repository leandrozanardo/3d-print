import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const cube = path.join(root, "packages/formats/fixtures/cube.stl");

test("offline after asset load still processes", async ({ page, browserName, context }) => {
  test.skip(browserName !== "chromium", "offline gate on Chromium");
  await page.goto("/");
  await expect(page.getByTestId("app-shell")).toBeVisible();
  await context.setOffline(true);
  await page.getByTestId("file-input").setInputFiles(cube);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 60_000 });
});
