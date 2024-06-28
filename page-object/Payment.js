import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.itemList = page.locator('[class="pl-6"]');
    this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
    this.discountInput = page.locator('[data-qa="discount-code-input"]');
    this.submitDiscountBtn = page.locator('[data-qa="submit-discount-button"]');
    this.payBtn = page.locator('[data-qa="pay-button"]');
    this.discountActivatedMsg = this.page.locator('[data-qa="discount-active-message"]');
    this.totalValue = this.page.locator('[data-qa="total-value"]');
    this.totalValueDiscount = this.page.locator('[data-qa="total-with-discount-value"]');
    this.specialOfferMsg = this.page.getByText(/Special/);
    this.fullNameInput = this.page.locator('[data-qa="credit-card-owner"]');
    this.cardNumberInput = this.page.locator('[data-qa="credit-card-number"]');
    this.cardExpInput = this.page.locator('[data-qa="valid-until"]');
    this.cardCVCInput = this.page.locator('[data-qa="credit-card-cvc"]');
  }

  async activateDiscount() {
    await expect(this.discountActivatedMsg).toBeHidden();
    await expect(this.totalValueDiscount).toBeHidden();
    const code = await this.discountCode.innerText();
    await this.discountInput.fill(code);
    await expect(this.discountInput).toHaveValue(code);
    // Option 2 for laggy input: slow typing
    // await this.discountInput.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // Side note - Can also do this:
    // await this.page.keyboard.down("Control")
    // await this.page.keyboard.down("c")
    // await this.page.keyboard.up("Control")
    await this.submitDiscountBtn.click();
    await expect(this.discountActivatedMsg).toHaveText("Discount activated!");
    await expect(this.totalValueDiscount).toBeVisible();
    const totalValueConverted = await this.convertValue(this.totalValue);
    const totalValueDiscountConverted = await this.convertValue(this.totalValueDiscount);
    expect(totalValueDiscountConverted).toBeLessThan(totalValueConverted);
  }

  async convertValue(locator) {
    const valueText = await locator.innerText();
    const valueConverted = parseInt(valueText.replace("$", ""), 10);
    return valueConverted;
  }

  async fillPaymentDetails(data) {
    data.fullName && (await this.fullNameInput.fill(data.fullName));
    data.cardNumber && (await this.cardNumberInput.fill(data.cardNumber));
    data.cardExpiryDate && (await this.cardExpInput.fill(data.cardExpiryDate));
    data.cardCVC && (await this.cardCVCInput.fill(data.cardCVC));
  }

  async completePayment() {
    await this.payBtn.click();
    await this.page.waitForURL(/\/thank-you/);
  }
}
