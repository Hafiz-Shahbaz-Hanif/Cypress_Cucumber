import { Given } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import CartPage from '../../pages/CartPage';

function signIn(username) {
  LoginPage.visit().login(username, Cypress.env('password'));
  InventoryPage.assertLoaded();
  cy.clearSauceCart();
  InventoryPage.assertLoaded();
  InventoryPage.assertCartBadge(0);
}

Given('I am signed in as the standard user', () => {
  signIn(Cypress.env('standardUser'));
});

Given('I am signed in as {string}', (username) => {
  signIn(username);
});

Given('my cart contains only {string}', (product) => {
  InventoryPage.addToCart(product);
  InventoryPage.openCart();
  CartPage.assertLoaded();
});

Given('my cart contains:', (table) => {
  table.hashes().forEach((row) => InventoryPage.addToCart(row.product));
  InventoryPage.openCart();
  CartPage.assertLoaded();
});
