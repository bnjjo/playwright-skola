// pages/CheckoutPage.ts
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessages: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form inputs
    this.nameInput = page.locator('input[name="name"], input[placeholder*="Name"]');
    this.emailInput = page.locator('input[type="email"], input[name="email"]');
    this.phoneInput = page.locator('input[type="tel"], input[name="phone"]');
    this.addressInput = page.locator('input[name="address"], textarea[name="address"]');
    this.cityInput = page.locator('input[name="city"]');
    this.zipInput = page.locator('input[name="zip"], input[name="postal"]');

    // Actions
    this.submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Place Order")');

    // Feedback
    this.errorMessages = page.locator('.error, .invalid-feedback, [class*="error"], .text-danger');
    this.successMessage = page.locator('.success, [class*="success"], text=/order placed|success/i');
  }

  async navigate() {
    await this.page.goto('https://sweetshop.netlify.app/checkout');
    await this.page.waitForLoadState('networkidle');
  }

  async fillCheckoutForm(data: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    zip?: string;
  }) {
    if (data.name && await this.nameInput.count() > 0) {
      await this.nameInput.fill(data.name);
    }
    if (data.email && await this.emailInput.count() > 0) {
      await this.emailInput.fill(data.email);
    }
    if (data.phone && await this.phoneInput.count() > 0) {
      await this.phoneInput.fill(data.phone);
    }
    if (data.address && await this.addressInput.count() > 0) {
      await this.addressInput.fill(data.address);
    }
    if (data.city && await this.cityInput.count() > 0) {
      await this.cityInput.fill(data.city);
    }
    if (data.zip && await this.zipInput.count() > 0) {
      await this.zipInput.fill(data.zip);
    }
  }

  async submitForm() {
    await this.submitButton.first().click();
    await this.page.waitForTimeout(500);
  }

  async hasErrors(): Promise<boolean> {
    return await this.errorMessages.first().isVisible().catch(() => false);
  }

  async getErrorMessages(): Promise<string[]> {
    const errors = await this.errorMessages.all();
    const messages: string[] = [];

    for (const error of errors) {
      const text = await error.textContent();
      if (text) messages.push(text);
    }

    return messages;
  }

  async isEmailValid(): Promise<boolean> {
    if (await this.emailInput.count() > 0) {
      return await this.emailInput.evaluate((el: HTMLInputElement) => {
        return el.validity.valid;
      });
    }
    return true;
  }

  async submitEmptyForm() {
    await this.submitForm();
  }

  async fillInvalidEmail(email: string) {
    if (await this.emailInput.count() > 0) {
      await this.emailInput.fill(email);
    }
  }
}
