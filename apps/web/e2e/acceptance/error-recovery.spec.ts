import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { zipSync, strToU8 } from "fflate";
import * as fs from "node:fs";

import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const tmp = path.join(root, "artifacts/product-recovery/security/bad.3mf");

test("invalid archive shows recoverable error", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "error recovery on Chromium");
  fs.mkdirSync(path.dirname(tmp), { recursive: true });
  const bad = zipSync({
    "[Content_Types].xml": strToU8("<Types xmlns='http://schemas.openxmlformats.org/package/2006/content-types'></Types>"),
    "_rels/.rels": strToU8("<Relationships xmlns='http://schemas.openxmlformats.org/package/2006/relationships'></Relationships>"),
  });
  fs.writeFileSync(tmp, bad);
  await page.goto("/");
  await page.getByTestId("file-input").setInputFiles(tmp);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("error-alert")).toBeVisible({ timeout: 60_000 });
  const cube = path.join(root, "packages/formats/fixtures/cube.stl");
  await page.getByTestId("retry-button").click();
  await page.getByTestId("file-input").setInputFiles(cube);
  await page.getByTestId("optimize-button").click();
  await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 60_000 });
});
