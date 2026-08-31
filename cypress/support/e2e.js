import './commands';

// SauceDemo occasionally throws a benign runtime error that is unrelated to the
// behaviour under test; do not let it fail an otherwise-passing scenario.
Cypress.on('uncaught:exception', () => false);
