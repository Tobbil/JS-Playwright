import { expect } from "@playwright/test";
import { isDesktopViewport } from "./helpers";

export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
    this.menuExpandBtn = page.locator('[data-qa="burger-button"]');
    this.navigationBarDesktop = page.locator('[data-qa="monitor-navigation"]')
    this.navigationBarMobile = page.locator('[data-qa="mobile-navigation"]')
  }

  async getBasketCount() {
    const textNumber = await this.basketCounter.innerText();
    return parseInt(textNumber, 10);
  }

  async goToCheckout() {
    if (!isDesktopViewport(this.page)) {
      await this.menuExpandBtn.click();
    }

    await this.checkoutLink.click();
    await expect(this.page).toHaveURL("/basket");
  }
}
