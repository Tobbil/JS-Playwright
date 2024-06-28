import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";
import { isDesktopViewport } from "./helpers";

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitles = page.locator('[data-qa="product-title"]');
  }
  async visit() {
    await this.page.goto("/");
  }

  async addProductToBasket(index) {
    const button = this.addButtons.nth(index);
    await expect(button).toHaveText("Add to Basket");
    const navigation = new Navigation(this.page);
    if (isDesktopViewport(this.page)) {
      const basketCountBefore = await navigation.getBasketCount();
      await button.click();
      const basketCountAfter = await navigation.getBasketCount();
      expect(basketCountAfter).toBeGreaterThan(basketCountBefore);
    } else {
      await button.click();
    }

    await expect(button).toHaveText("Remove from Basket");
    return this.productTitles.nth(index).innerText();
  }

  async sortByCheapest() {
    const productTitlesBeforeSorting = await this.productTitles.allInnerTexts();
    await this.sortDropdown.selectOption("price-asc");
    const productTitlesAfterSorting = await this.productTitles.allInnerTexts();
    expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
  }
}
