/**
 * Reusable, cross-cutting commands. Page-specific behaviour lives in the Page
 * Objects under `cypress/pages/`, not here.
 */

Cypress.Commands.add('resetAppState', () => {
  // SauceDemo persists the cart and session in localStorage between visits.
  cy.clearLocalStorage();
  cy.clearCookies();
});
