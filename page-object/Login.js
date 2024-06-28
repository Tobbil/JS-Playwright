import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.goToRegisterPageBtn = page.locator('[data-qa="go-to-signup-button"]');
  }

  async goToRegisterPage() {
    await this.goToRegisterPageBtn.click();
    this.page.waitForURL(/\/signup?/, { timeout: 2000 });
  }
}
