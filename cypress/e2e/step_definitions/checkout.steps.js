import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';
import { priceOf } from '../../fixtures/products';

When('I check out with {string}, {string}, {string}', (first, last, postal) => {
  CartPage.checkout();
  CheckoutPage.fillInformation(first, last, postal);
});

When('I start the checkout', () => {
  CartPage.checkout();
});

When(
  'I start checkout and continue with first {string}, last {string}, postal {string}',
  (first, last, postal) => {
    CartPage.checkout();
    CheckoutPage.continueWithout(first, last, postal);
  },
);

When('I finish the order', () => {
  CheckoutPage.finish();
});

Then('I see the confirmation {string}', (message) => {
  CheckoutPage.expectConfirmation(message);
});

Then('I see the checkout error {string}', (message) => {
  CheckoutPage.expectError(message);
});

Then('the checkout overview lists {string}', (product) => {
  CheckoutPage.assertOverviewContains(product);
});

Then('the subtotal equals the catalogue price of {string}', (product) => {
  CheckoutPage.assertSubtotal(priceOf(product));
});

Then('the tax is 8% of the subtotal', () => {
  CheckoutPage.assertTaxIsEightPercentOfSubtotal();
});

Then('the total is the subtotal plus tax', () => {
  CheckoutPage.assertTotalIsSubtotalPlusTax();
});

When('I cancel on the information step', () => {
  CheckoutPage.cancelInformationStep();
});

When('I cancel on the overview step', () => {
  CheckoutPage.cancelOverviewStep();
});

Then('the cart page is shown', () => {
  cy.location('pathname').should('eq', '/cart.html');
});
