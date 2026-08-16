import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("accessibility: zero critical/serious on shell", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "axe gate on Chromium");
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const bad = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  expect(bad, JSON.stringify(bad, null, 2)).toEqual([]);
});
