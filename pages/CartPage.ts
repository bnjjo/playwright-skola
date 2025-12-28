// pages/CartPage.ts
import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly quantityInputs: Locator;
  readonly removeButtons: Locator;
  readonly subtotalElement: Locator;
  readonly totalElement: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Cart items
    this.cartItems = page.locator('[data-testid="cart-item"], .cart-item, .item');
    this.quantityInputs = page.locator('input[type="number"], input[name*="quantity"]');
    this.removeButtons = page.locator('button:has-text("Remove"), button:has-text("Delete"), .remove-btn');

    // Price elements
    this.subtotalElement = page.locator('[data-testid="subtotal"], .subtotal, text=/subtotal/i');
    this.totalElement = page.locator('[data-testid="total"], .total, text=/total/i');

    // Actions
    this.checkoutButton = page.locator('button:has-text("Checkout"), a:has-text("Checkout")');
    this.emptyCartMessage = page.locator('text=/empty cart|no items/i');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping"), a:has-text("Shop")');
  }

  async navigate() {
    await this.page.goto('https://sweetshop.netlify.app/cart');
    await this.page.waitForLoadState('networkidle');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async updateQuantity(index: number, quantity: string) {
    const input = this.quantityInputs.nth(index);
    await input.fill(quantity);
    await this.page.waitForTimeout(500);
  }

  async removeItem(index: number) {
    const removeBtn = this.removeButtons.nth(index);
    await removeBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async getQuantityValue(index: number): Promise<string> {
    const input = this.quantityInputs.nth(index);
    return await input.inputValue();
  }

  async proceedToCheckout() {
    await this.checkoutButton.first().click();
    await this.page.waitForTimeout(1000);
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible().catch(() => false);
  }

  async getSubtotal(): Promise<string | null> {
    if (await this.subtotalElement.count() > 0) {
      return await this.subtotalElement.textContent();
    }
    return null;
  }

  async getTotal(): Promise<string | null> {
    if (await this.totalElement.count() > 0) {
      return await this.totalElement.textContent();
    }
    return null;
  }
}
