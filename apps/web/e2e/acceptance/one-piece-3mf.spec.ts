import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const privateFixture = path.join(root, "3ds/original/one+Piece.3mf");
const upgradedDir = path.join(root, "3ds/upgraded");
const screenshots = path.join(root, "artifacts/product-recovery/screenshots");
const downloads = path.join(root, "artifacts/product-recovery/downloads");

test.describe("private one+Piece 3MF flow", () => {
  test.skip(!fs.existsSync(privateFixture), "Copy one+Piece.3mf to 3ds/original/one+Piece.3mf");

  test("upload → optimize → download → reupload", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Private full flow is gated on Chromium");
    fs.mkdirSync(upgradedDir, { recursive: true });
    fs.mkdirSync(screenshots, { recursive: true });
    fs.mkdirSync(downloads, { recursive: true });

    const beforeHash = createHash("sha256")
      .update(fs.readFileSync(privateFixture))
      .digest("hex");

    await page.goto("/");
    await expect(page.getByTestId("app-shell")).toBeVisible();
    await expect(page.getByText("Browser shell")).toHaveCount(0);
    await page.screenshot({
      path: path.join(screenshots, "desktop-upload.png"),
      fullPage: true,
    });

    await page.getByTestId("file-input").setInputFiles(privateFixture);
    await expect(page.getByTestId("selected-file-card")).toContainText("one+Piece.3mf");
    await page.getByTestId("printer-preset").selectOption("bambu-a1-mini");

    await page.getByTestId("optimize-button").click();
    await expect(page.getByTestId("processing-panel")).toBeVisible();
    await page.screenshot({
      path: path.join(screenshots, "desktop-processing.png"),
      fullPage: true,
    });

    await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });
    await expect(page.getByTestId("validation-badge")).toContainText("Arquivo validado");
    await page.screenshot({
      path: path.join(screenshots, "desktop-success.png"),
      fullPage: true,
    });

    const downloadPromise = page.waitForEvent("download", { timeout: 30_000 });
    await page.getByTestId("download-button").click();
    const download = await downloadPromise;
    const outPath = path.join(upgradedDir, "one+Piece-otimizado.3mf");
    await download.saveAs(outPath);
    await download.saveAs(path.join(downloads, "one+Piece-otimizado.3mf"));

    const outBytes = fs.readFileSync(outPath);
    expect(outBytes.byteLength).toBeGreaterThan(1000);
    expect(outBytes[0]).toBe(0x50);
    expect(outBytes[1]).toBe(0x4b);
    const outHash = createHash("sha256").update(outBytes).digest("hex");
    fs.writeFileSync(
      path.join(root, "artifacts/product-recovery/validation/output.sha256"),
      outHash,
    );

    // Reupload optimized file and process again.
    await page.getByTestId("optimize-another-button").click();
    await page.getByTestId("file-input").setInputFiles(outPath);
    await page.getByTestId("optimize-button").click();
    await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });

    const afterHash = createHash("sha256")
      .update(fs.readFileSync(privateFixture))
      .digest("hex");
    expect(afterHash).toBe(beforeHash);
  });
});
