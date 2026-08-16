import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const screenshots = path.join(root, "artifacts/product-recovery/screenshots");

const viewports = [
  { name: "360x800", width: 360, height: 800 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
];

test("responsive shells have no horizontal overflow", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "responsive gate on Chromium");
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    });
    expect(overflow, vp.name).toBe(false);
    await page.screenshot({
      path: path.join(screenshots, `responsive-${vp.name}.png`),
      fullPage: true,
    });
  }
});
