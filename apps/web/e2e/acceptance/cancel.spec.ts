import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const privateFixture = path.join(root, "3ds/original/one+Piece.3mf");
const cube = path.join(root, "packages/formats/fixtures/cube.stl");

test("cancel interrupts processing and allows a new job", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "cancel gate on Chromium");
  test.skip(!fs.existsSync(privateFixture), "private fixture required for durable cancel window");
  await page.goto("/");
  await page.getByTestId("file-input").setInputFiles(privateFixture);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("cancel-button")).toBeVisible();
  await page.getByTestId("cancel-button").click({ force: true });
  await expect(page.getByTestId("cancel-button")).toHaveCount(0);
  await page.getByTestId("file-input").setInputFiles(cube);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 60_000 });
  await expect(page.getByTestId("cancel-button")).toHaveCount(0);
});
