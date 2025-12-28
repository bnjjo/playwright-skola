# Sweet Shop Manual Test Cases

**Website Under Test:** https://sweetshop.netlify.app/

**Test Date:** 28. December 2025

**Tester:** Benjamin Sukalo

---

## Key Features Identified for Testing

1. **Product Browsing & Filtering** - Category navigation, product display, search functionality
2. **Shopping Cart Management** - Add to cart, update quantities, remove items, checkout
3. **User Authentication** - Login/Signup functionality and form validation

---

## Test Cases

### Test Case ID: TC_01

**Test Case Title:** Verify Product Category Navigation

**Description:** Validate that users can browse products by selecting different categories and that the correct products are displayed.

**Test Steps:**
1. Navigate to https://sweetshop.netlify.app/
2. Observe the category menu (e.g., Chocolates, Candies, Gummies)
3. Click on a specific category (e.g., "Chocolates")
4. Verify products are filtered by the selected category
5. Click on another category and verify the display updates

**Expected Results:**
- Only products from the selected category are displayed
- Product count updates accordingly
- Category remains highlighted in the navigation

**Pass/Fail Criteria:**
- **Pass:** Products displayed match the selected category, UI updates correctly
- **Fail:** Wrong products shown, no filtering occurs, or page doesn't respond

---

### Test Case ID: TC_02

**Test Case Title:** Verify Add to Cart Functionality

**Description:** Test that users can successfully add products to the shopping cart and the cart counter updates.

**Test Steps:**
1. Navigate to the homepage
2. Select any product
3. Click the "Add to Cart" button
4. Observe the cart icon/counter in the header
5. Add multiple quantities of the same product
6. Add different products to the cart

**Expected Results:**
- Cart counter increments with each addition
- Visual feedback confirms item was added
- Cart maintains accurate count of items

**Pass/Fail Criteria:**
- **Pass:** Cart counter updates correctly, items are stored
- **Fail:** Counter doesn't update, items not added, or incorrect count displayed

---

### Test Case ID: TC_03

**Test Case Title:** Verify Cart Total Calculation

**Description:** Validate that the shopping cart correctly calculates subtotal, taxes, and total amounts based on items added.

**Test Steps:**
1. Add multiple products with different prices to cart
2. Navigate to the cart page
3. Verify individual product prices are displayed
4. Check subtotal calculation
5. Verify tax calculation (if applicable)
6. Confirm total amount is correct

**Expected Results:**
- Subtotal = Sum of (price × quantity) for all items
- Tax calculated correctly on subtotal
- Total = Subtotal + Tax
- All amounts displayed with proper currency formatting

**Pass/Fail Criteria:**
- **Pass:** All calculations are mathematically correct
- **Fail:** Any calculation error, missing amounts, or incorrect formatting

---

### Test Case ID: TC_04

**Test Case Title:** Verify Remove Item from Cart

**Description:** Test that users can remove items from the shopping cart and totals update accordingly.

**Test Steps:**
1. Add 3 different products to the cart
2. Navigate to the cart page
3. Note the current total
4. Click the remove/delete button for one item
5. Verify the item is removed
6. Check that totals recalculate correctly

**Expected Results:**
- Selected item is removed from cart
- Cart counter decrements
- Subtotal and total update to reflect removal
- Remaining items stay in cart

**Pass/Fail Criteria:**
- **Pass:** Item removed, calculations correct, cart updates properly
- **Fail:** Item remains, wrong item removed, or calculations incorrect

---

### Test Case ID: TC_05

**Test Case Title:** Verify Product Search Functionality

**Description:** Test that the search feature returns relevant products based on user input.

**Test Steps:**
1. Navigate to the homepage
2. Locate the search input field
3. Enter a valid product name or keyword (e.g., "chocolate")
4. Submit the search
5. Verify search results are displayed
6. Test partial keyword search
7. Test case-insensitive search

**Expected Results:**
- Relevant products matching the search term are displayed
- No irrelevant products appear in results
- Search works with partial matches and different cases
- "No results" message appears for non-existent products

**Pass/Fail Criteria:**
- **Pass:** Relevant results returned, search works as expected
- **Fail:** No results shown, irrelevant results, or search doesn't function

---

### Test Case ID: TC_06

**Test Case Title:** Verify Cart Quantity Update Functionality

**Description:** Test boundary conditions for updating product quantities in the cart (minimum and maximum values).

**Test Steps:**
1. Add a product to cart
2. Navigate to cart page
3. Attempt to decrease quantity to 0
4. Attempt to increase quantity to maximum (e.g., 99 or system limit)
5. Try entering negative numbers (-1, -5)
6. Try entering non-numeric values (abc, special characters)
7. Test quantity of 1 (minimum valid value)

**Expected Results:**
- Quantity 0 should remove item or show minimum of 1
- Maximum quantity enforced with error message
- Negative numbers rejected
- Non-numeric input rejected or sanitized
- Price updates correctly with quantity changes

**Pass/Fail Criteria:**
- **Pass:** All boundary conditions handled properly, appropriate error messages shown
- **Fail:** System accepts invalid quantities, crashes, or calculates incorrectly

---

### Test Case ID: TC_07

**Test Case Title:** Verify Checkout Form Validation

**Description:** Test negative scenarios by submitting the checkout form with invalid or missing information.

**Test Steps:**
1. Add items to cart and proceed to checkout
2. Leave all required fields empty and submit
3. Enter invalid email format (e.g., "test@", "test.com")
4. Enter invalid phone number format
5. Submit with missing required fields one at a time
6. Test special characters in name fields
7. Test extremely long inputs in text fields

**Expected Results:**
- Form submission blocked when required fields are empty
- Appropriate error messages displayed for each field
- Invalid email/phone formats rejected with specific error messages
- Special characters and long inputs handled appropriately
- User cannot proceed without valid data

**Pass/Fail Criteria:**
- **Pass:** All validation works, clear error messages, no submission with invalid data
- **Fail:** Form submits with invalid data, no error messages, or unclear feedback

---

### Test Case ID: TC_08

**Test Case Title:** Verify Responsive Design - Mobile View

**Description:** Test usability by checking if the website is properly responsive and functional on mobile devices.

**Test Steps:**
1. Open the website on a mobile device or use browser dev tools (375x667 viewport)
2. Check if navigation menu collapses to hamburger icon
3. Verify product cards display properly
4. Test tap/click functionality on buttons
5. Check if images resize appropriately
6. Verify cart icon is accessible
7. Test horizontal scrolling (should not occur)

**Expected Results:**
- All content visible without horizontal scrolling
- Navigation transforms to mobile-friendly menu
- Buttons and links are easily tappable (min 44x44px)
- Text remains readable
- Images scale proportionally
- All functionality works on touch devices

**Pass/Fail Criteria:**
- **Pass:** Website fully functional and visually correct on mobile
- **Fail:** Layout broken, content hidden, or features unusable on mobile

---

### Test Case ID: TC_09

**Test Case Title:** Verify User Registration with Weak Password

**Description:** Test security by attempting to register with weak passwords to ensure password strength requirements are enforced.

**Test Steps:**
1. Navigate to the signup/registration page
2. Fill in all required fields
3. Enter password: "123" (too short)
4. Attempt to submit
5. Try password: "password" (common word)
6. Try password: "abcdefgh" (no numbers/special chars)
7. Try valid strong password (e.g., "SecureP@ss123")

**Expected Results:**
- Weak passwords rejected with specific error messages
- Error messages indicate password requirements (length, complexity)
- Strong password accepted
- Password requirements clearly displayed on the form

**Pass/Fail Criteria:**
- **Pass:** Weak passwords rejected, requirements enforced, clear messaging
- **Fail:** Weak passwords accepted, no validation, or unclear requirements

---

### Test Case ID: TC_10

**Test Case Title:** Verify Empty Cart Checkout Prevention

**Description:** Test that users cannot proceed to checkout with an empty shopping cart.

**Test Steps:**
1. Navigate to the website with an empty cart
2. Attempt to access the cart page
3. Look for checkout button
4. Try to click checkout button (if visible)
5. Alternatively, try accessing checkout URL directly
6. Verify appropriate messaging is displayed

**Expected Results:**
- "Your cart is empty" or similar message displayed
- Checkout button is disabled or not visible
- Direct URL access to checkout redirects to cart or homepage
- User is prompted to continue shopping
- Helpful links to products page provided

**Pass/Fail Criteria:**
- **Pass:** Empty cart checkout prevented, clear messaging, good UX
- **Fail:** User can proceed to checkout with empty cart, confusing experience

---

## Test Coverage Summary

| Test Type | Test Cases |
|-----------|------------|
| **Positive Tests** | TC_01, TC_02, TC_05 |
| **Negative Tests** | TC_07, TC_09 |
| **Boundary Tests** | TC_06 |
| **Usability Tests** | TC_08, TC_10 |
| **Security Tests** | TC_09 |
| **Functional Tests** | TC_03, TC_04 |

---

## Notes

- 5 of these test cases (TC_01, TC_02, TC_05, TC_06, TC_07) have been implemented as automated Playwright tests using the Page Object Model pattern.
- Test cases cover various aspects of functionality including positive scenarios, negative scenarios, boundary conditions, usability, and security.
- All test cases are designed to be executed manually or automated depending on project requirements.
