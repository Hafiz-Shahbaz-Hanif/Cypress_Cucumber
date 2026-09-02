/**
 * Reusable, cross-cutting commands. Page-specific behaviour lives in the Page
 * Objects under `cypress/pages/`, not here.
 */

/**
 * Guarantee a clean SauceDemo session and empty cart. Cypress test isolation
 * clears storage, but SauceDemo keeps the cart under `cart-contents` and only
 * repaints once reloaded - so clear it explicitly after landing on a page.
 */
Cypress.Commands.add('clearSauceCart', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('cart-contents');
  });
  cy.reload();
});
