# Sweet Shop Testing Project

Automated testing for [Sweet Shop](https://sweetshop.netlify.app/) using Playwright and Page Object Model (POM) design pattern.

## Project Structure

```
sweetshop-testing/
├── README.md
├── package.json
├── playwright.config.ts
├── manual-test-cases.md
├── pages/
│   ├── HomePage.ts          # Home page interactions
│   ├── CartPage.ts           # Shopping cart operations
│   └── CheckoutPage.ts       # Checkout form handling
└── tests/
    └── sweetshop.test.ts     # Test scenarios
```

## Test Cases

### Manual Test Cases (10 Total)
See `manual-test-cases.md` for detailed documentation of all 10 test cases covering:
- Positive scenarios
- Negative scenarios
- Boundary testing
- Usability testing
- Security testing

### Automated Test Cases (5 Implemented)

1. **TC_01**: Product Category Navigation (Positive)
2. **TC_02**: Add to Cart Functionality (Positive + Assertions)
3. **TC_05**: Product Search (Form Interaction)
4. **TC_06**: Cart Quantity Boundaries (Negative + Boundary)
5. **TC_07**: Checkout Form Validation (Negative)

## Page Object Model (POM)

The project follows POM design pattern with dedicated page classes:

### HomePage
- Navigate to site
- Select product categories
- Add products to cart
- Search functionality
- Access cart

### CartPage
- View cart items
- Update quantities
- Remove items
- View totals
- Proceed to checkout

### CheckoutPage
- Fill checkout form
- Submit order
- Handle validation errors
- Verify form fields

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests with UI
npm run test:ui

# View test report
npm run report
```

## Note on OS Compatibility

This project was developed on Arch Linux. If you encounter issues running Playwright on your system, the test code follows Playwright best practices and can be executed on any supported platform (Windows, macOS, Linux with compatible architecture).

## Requirements Met

✅ Page Object Model structure  
✅ test.describe() organization  
✅ Proper expect() assertions  
✅ Form interactions  
✅ Button/navigation interactions  
✅ Negative test scenarios  
✅ Locator and URL assertions  
✅ Reusable page methods  
✅ TypeScript implementation  

## Technologies

- Playwright Test Framework
- TypeScript
- Page Object Model Pattern
- HTML Reporting

---

**Author**: Benjamin Sukalo  
**Course**: SE302
**Date**: 28. December 2025
