export class MyAccountPage {
  constructor(page) {
    this.page = page;
    this.pageHeading = page.getByRole("heading", { name: "My Account" });
    this.errorMsg = page.locator('[data-qa="error-message"]');
  }

  async visit() {
    await this.page.goto("/my-account");
  }
}
