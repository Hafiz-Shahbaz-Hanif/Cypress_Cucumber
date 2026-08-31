import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

Given('I am signed in as the standard user', () => {
  cy.resetAppState();
  LoginPage.visit().login(Cypress.env('standardUser'), Cypress.env('password'));
  InventoryPage.assertLoaded();
});

When('I sort the products by {string}', (order) => {
  InventoryPage.sortBy(order);
});

Then('the products are ordered by {string}', (order) => {
  if (order.startsWith('Name')) {
    InventoryPage.getItemNames().then((names) => {
      const expected = [...names].sort();
      if (order.includes('Z to A')) expected.reverse();
      expect(names).to.deep.equal(expected);
    });
  } else {
    InventoryPage.getItemPrices().then((prices) => {
      const expected = [...prices].sort((a, b) => a - b);
      if (order.includes('high to low')) expected.reverse();
      expect(prices).to.deep.equal(expected);
    });
  }
});

When('I add {string} to the cart', (product) => {
  InventoryPage.addToCart(product);
});

Then('the cart badge shows {string}', (count) => {
  InventoryPage.elements.cartBadge().should('have.text', count);
});

When('I open the cart', () => {
  InventoryPage.openCart();
  CartPage.assertLoaded();
});

Then('the cart contains {string}', (product) => {
  CartPage.assertContains(product);
});

Then('the cart has {int} items', (count) => {
  CartPage.assertItemCount(count);
});

When('I check out with {string}, {string}, {string}', (first, last, postal) => {
  CartPage.checkout();
  CheckoutPage.fillInformation(first, last, postal);
});

When('I finish the order', () => {
  CheckoutPage.finish();
});

Then('I see the confirmation {string}', (message) => {
  CheckoutPage.expectConfirmation(message);
});

When('I start checkout without entering information', () => {
  CartPage.checkout();
  CheckoutPage.continueWithoutInformation();
});

Then('I see the checkout error {string}', (message) => {
  CheckoutPage.expectError(message);
});
