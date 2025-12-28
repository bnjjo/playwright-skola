// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly categoryButtons: Locator;
  readonly chocolatesCategory: Locator;
  readonly candiesCategory: Locator;
  readonly gummiesCategory: Locator;
  readonly addToCartButtons: Locator;
  readonly searchInput: Locator;
  readonly cartIcon: Locator;
  readonly cartCounter: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;

    // Category navigation
    this.categoryButtons = page.locator('button[class*="category"], nav button');
    this.chocolatesCategory = page.locator('button:has-text("Chocolates")');
    this.candiesCategory = page.locator('button:has-text("Candies")');
    this.gummiesCategory = page.locator('button:has-text("Gummies")');

    // Product interaction
    this.addToCartButtons = page.locator('button:has-text("Add to Cart"), button:has-text("Add")');
    this.productCards = page.locator('[data-testid="product-card"], .product-card, .product-item, .product');

    // Search
    this.searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]');

    // Cart
    this.cartIcon = page.locator('[data-testid="cart"], a[href*="cart"], button:has-text("Cart")');
    this.cartCounter = page.locator('[data-testid="cart-count"], .cart-count, .badge');
  }

  async navigate() {
    await this.page.goto('https://sweetshop.netlify.app/');
    await this.page.waitForLoadState('networkidle');
  }

  async selectCategory(category: 'Chocolates' | 'Candies' | 'Gummies') {
    const categoryMap = {
      'Chocolates': this.chocolatesCategory,
      'Candies': this.candiesCategory,
      'Gummies': this.gummiesCategory
    };

    const categoryButton = categoryMap[category];
    await categoryButton.click();
    await this.page.waitForTimeout(1000);
  }

  async addFirstProductToCart() {
    const firstAddButton = this.addToCartButtons.first();
    await firstAddButton.waitFor({ state: 'visible', timeout: 10000 });
    await firstAddButton.click();
    await this.page.waitForTimeout(1000);
  }

  async searchForProduct(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
    await this.page.waitForTimeout(1500);
  }

  async getCartCount(): Promise<number> {
    if (await this.cartCounter.count() > 0 && await this.cartCounter.isVisible()) {
      const countText = await this.cartCounter.textContent();
      return parseInt(countText || '0') || 0;
    }
    return 0;
  }

  async navigateToCart() {
    if (await this.cartIcon.count() > 0) {
      await this.cartIcon.first().click();
      await this.page.waitForTimeout(1000);
    }
  }

  async isProductVisible(): Promise<boolean> {
    return await this.productCards.first().isVisible({ timeout: 5000 }).catch(() => false);
  }
}
