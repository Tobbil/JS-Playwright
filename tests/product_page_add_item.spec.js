import { test, expect } from "@playwright/test";

test.skip("Product Page Add To Basket", async ({ page }) => {
  await page.goto("/"); // ustawiane w playwright.config.js

  const button = page.locator('[data-qa="product-button"]').first();
  const counter = page.locator('[data-qa="header-basket-count"]');

  await expect(button).toHaveText("Add to Basket");
  await expect(counter).toHaveText("0");

  await button.click();
  await expect(button).toHaveText("Remove from Basket");
  await expect(counter).toHaveText("1");

  const checkoutLink = page.getByRole("link", { name: "Checkout" });
  await checkoutLink.click();
  await expect(page).toHaveURL("/basket");
});
