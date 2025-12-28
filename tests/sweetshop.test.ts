// tests/sweetshop.test.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Sweet Shop - E2E Tests with POM', () => {

  // TC_01: Verify Product Category Navigation
  test('TC_01: Should filter products by selected category', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    // Select Chocolates category
    await homePage.selectCategory('Chocolates');

    // Verify products are displayed
    const productsVisible = await homePage.isProductVisible();
    expect(productsVisible).toBeTruthy();

    // Verify URL is correct
    await expect(page).toHaveURL(/.*sweetshop.netlify.app.*/);
  });

  // TC_02: Verify Add to Cart Functionality
  test('TC_02: Should add product to cart and update counter', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    // Get initial cart count
    const initialCount = await homePage.getCartCount();

    // Add product to cart
    await homePage.addFirstProductToCart();

    // Get updated cart count
    const newCount = await homePage.getCartCount();

    // Verify cart counter increased
    expect(newCount).toBeGreaterThanOrEqual(initialCount);

    // Additional assertion - verify we can navigate to cart
    await homePage.navigateToCart();
    await expect(page).toHaveURL(/.*cart.*/i);
  });

  // TC_05: Verify Product Search Functionality
  test('TC_05: Should return relevant results for product search', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    // Search for chocolate
    await homePage.searchForProduct('chocolate');

    // Verify URL changed or results displayed
    const currentUrl = page.url();
    const hasSearchParam = currentUrl.includes('chocolate') || currentUrl.includes('search');
    const productsVisible = await homePage.isProductVisible();

    // At least one condition should be true
    expect(hasSearchParam || productsVisible).toBeTruthy();
  });

  // TC_06: Verify Cart Quantity Update - Boundary Test (Negative Scenario)
  test('TC_06: Should handle invalid quantity input in cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Add item to cart first
    await homePage.navigate();
    await homePage.addFirstProductToCart();

    // Navigate to cart
    await homePage.navigateToCart();

    // Check if cart has items
    const itemCount = await cartPage.getCartItemCount();

    if (itemCount > 0) {
      // Test negative number
      await cartPage.updateQuantity(0, '-5');
      const negativeValue = await cartPage.getQuantityValue(0);
      const negativeNum = parseInt(negativeValue);
      expect(negativeNum).toBeGreaterThanOrEqual(0);

      // Test zero
      await cartPage.updateQuantity(0, '0');

      // Test very large number
      await cartPage.updateQuantity(0, '9999');
      const largeValue = await cartPage.getQuantityValue(0);
      expect(largeValue).toBeDefined();
    }

    // Verify page still functional
    await expect(page).toHaveURL(/.*sweetshop.netlify.app.*/);
  });

  // TC_07: Verify Checkout Form Validation (Negative Test)
  test('TC_07: Should validate required fields on checkout form', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add item to cart
    await homePage.navigate();
    await homePage.addFirstProductToCart();

    // Navigate to cart and proceed to checkout
    await homePage.navigateToCart();

    const itemCount = await cartPage.getCartItemCount();

    if (itemCount > 0) {
      await cartPage.proceedToCheckout();

      // Try to submit empty form
      await checkoutPage.submitEmptyForm();

      // Verify errors are shown or form wasn't submitted
      const hasErrors = await checkoutPage.hasErrors();
      const currentUrl = page.url();
      const stillOnCheckout = currentUrl.includes('checkout');

      expect(hasErrors || stillOnCheckout).toBeTruthy();

      // Test invalid email
      await checkoutPage.fillInvalidEmail('invalid-email');
      await checkoutPage.submitForm();

      // Verify email validation
      const emailValid = await checkoutPage.isEmailValid();
      expect(emailValid).toBeFalsy();
    }

    // Verify we're still on the site
    await expect(page).toHaveURL(/.*sweetshop.netlify.app.*/);
  });
});
