import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const tradeoff = path.join(root, "packages/formats/fixtures/goal-tradeoff.3mf");

test("QA-007 goal changes decision weights", async ({ page }) => {
  test.skip(!fs.existsSync(tradeoff), "goal-tradeoff fixture missing");

  async function runGoal(goal: string) {
    await page.goto("/");
    await page.getByTestId("goal-select").selectOption(goal);
    await page.getByTestId("file-input").setInputFiles(tradeoff);
    await page.getByTestId("optimize-button").click();
    await expect(page.getByTestId("result-panel")).toBeVisible({ timeout: 120_000 });
    const reportedGoal = await page.getByTestId("result-goal").getAttribute("data-goal");
    const orientationId = await page
      .getByTestId("orientation-id")
      .getAttribute("data-id");
    const totalCost = Number(
      await page.getByTestId("total-cost").getAttribute("data-value"),
    );
    return { reportedGoal, orientationId, totalCost };
  }

  const balanced = await runGoal("balanced");
  const height = await runGoal("minimize-height");
  const contact = await runGoal("maximize-bed-contact");

  expect(balanced.reportedGoal).toBe("balanced");
  expect(height.reportedGoal).toBe("minimize-height");
  expect(contact.reportedGoal).toBe("maximize-bed-contact");

  const ids = new Set([
    balanced.orientationId,
    height.orientationId,
    contact.orientationId,
  ]);
  const costs = new Set([balanced.totalCost, height.totalCost, contact.totalCost]);
  expect(ids.size + costs.size).toBeGreaterThan(2);
});
