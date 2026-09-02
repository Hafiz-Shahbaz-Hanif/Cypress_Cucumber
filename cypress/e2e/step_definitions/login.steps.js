import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

Given('the login page is open', () => {
  LoginPage.visit();
});

When('I sign in as the standard user', () => {
  LoginPage.login(Cypress.env('standardUser'), Cypress.env('password'));
});

When('I sign in with username {string} and password {string}', (username, password) => {
  LoginPage.login(username, password);
});

Then('the inventory page is shown with {int} products', (count) => {
  InventoryPage.assertLoaded();
  InventoryPage.elements.items().should('have.length', count);
});

Then('I see the login error {string}', (message) => {
  LoginPage.expectError(message);
});

When('I sign out', () => {
  InventoryPage.logout();
});

Then('the login page is shown', () => {
  cy.location('pathname').should('eq', '/');
  LoginPage.elements.loginButton().should('be.visible');
});
