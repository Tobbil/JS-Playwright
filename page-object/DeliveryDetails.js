import { expect } from "@playwright/test";

export class DeliveryDetailsPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
    this.streetInput = page.locator('[data-qa="delivery-address-street"]');
    this.postCodeInput = page.locator('[data-qa="delivery-postcode"]');
    this.cityInput = page.locator('[data-qa="delivery-city"]');
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.saveAddressButton = page.locator('[data-qa="save-address-button"]');
    this.paymentButton = page.locator('[data-qa="continue-to-payment-button"]');
    this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');
    this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
    this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]');
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');
  }

  async fillDetails(data) {
    data.firstName && (await this.firstNameInput.fill(data.firstName));
    data.lastName && (await this.lastNameInput.fill(data.lastName));
    data.street && (await this.streetInput.fill(data.street));
    data.postCode && (await this.postCodeInput.fill(data.postCode));
    data.city && (await this.cityInput.fill(data.city));
    data.country && (await this.countryDropdown.selectOption(data.country));
  }

  async saveDetails() {
    const addressCountBefore = await this.savedAddressContainer.count();
    await this.saveAddressButton.click();
    await this.savedAddressContainer.waitFor();
    expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());
    expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());
    expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue());
    expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCodeInput.inputValue());
    expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue());
    expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());

    return (await this.savedAddressContainer.count()) === addressCountBefore + 1;
  }

  async goToPayment() {
    await this.paymentButton.click();
  }
}
