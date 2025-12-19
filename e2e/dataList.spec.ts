import { test, expect } from "@playwright/test";

test("paginates users from API and shows 20 items per page", async ({ page }) => {
  await page.goto("/");

  // Wait for user cards to appear (API fetch + render).
  const userCards = page.getByTestId("user-card");
  await expect(userCards).toHaveCount(20);

  // Capture the full name from the first card on page 1.
  const firstCardNameLocator = userCards.first().locator("h2");
  const firstCardName = await firstCardNameLocator.textContent();

  if (!firstCardName) {
    throw new Error("Expected first user card to have a name");
  }

  // Go to next page.
  await page.getByRole("button", { name: /Next page/i }).click();

  // Ensure the first card on the new page has a different name.
  await expect(userCards.first().locator("h2")).not.toHaveText(firstCardName);

  // Still exactly 20 items on the second page.
  await expect(userCards).toHaveCount(20);
});


