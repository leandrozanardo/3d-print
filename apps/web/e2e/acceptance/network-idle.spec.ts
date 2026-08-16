import { expect, test } from "@playwright/test";

test("no periodic app XHR/fetch after idle", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Network attribution gate is Chromium-only");
  const requests: { url: string; resourceType: string; at: number }[] = [];
  page.on("request", (req) => {
    requests.push({
      url: req.url(),
      resourceType: req.resourceType(),
      at: Date.now(),
    });
  });

  await page.goto("/");
  await expect(page.getByTestId("app-shell")).toBeVisible();
  const readyAt = Date.now();
  await page.waitForTimeout(15_000);
  const idleXhr = requests.filter(
    (r) =>
      r.at >= readyAt &&
      (r.resourceType === "xhr" || r.resourceType === "fetch") &&
      !r.url.startsWith("data:"),
  );
  expect(idleXhr, JSON.stringify(idleXhr, null, 2)).toEqual([]);
});
