import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketRemoveItemBtn = page.locator(
      "[data-qa='basket-card-remove-item']"
    );
    this.continueToCheckoutBtn = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }

  async removeCheapestProduct() {
    await this.basketItemPrice.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();
    const justNumbers = allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
    });
    const smallestPrice = Math.min(justNumbers);
    const smallestPriceIndex = justNumbers.indexOf(smallestPrice);
    const specificRemoveBtn = this.basketRemoveItemBtn.nth(smallestPriceIndex);
    await specificRemoveBtn.click();
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
  }

  async continueToCheckout() {
    await this.continueToCheckoutBtn.click();
    await this.page.waitForURL(/\/login/, {timeout: 2000});
  }
}
