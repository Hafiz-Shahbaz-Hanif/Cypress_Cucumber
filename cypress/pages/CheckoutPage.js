class CheckoutPage {
  elements = {
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continue: () => cy.get('[data-test="continue"]'),
    finish: () => cy.get('[data-test="finish"]'),
    error: () => cy.get('[data-test="error"]'),
    total: () => cy.get('[data-test="total-label"]'),
    completeHeader: () => cy.get('[data-test="complete-header"]'),
  };

  fillInformation(first, last, postal) {
    this.elements.firstName().type(first);
    this.elements.lastName().type(last);
    this.elements.postalCode().type(postal);
    this.elements.continue().click();
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    return this;
  }

  continueWithoutInformation() {
    this.elements.continue().click();
    return this;
  }

  expectError(message) {
    this.elements.error().should('contain.text', message);
    return this;
  }

  finish() {
    this.elements.finish().click();
    cy.location('pathname').should('eq', '/checkout-complete.html');
    return this;
  }

  expectConfirmation(message) {
    this.elements.completeHeader().should('contain.text', message);
    return this;
  }
}

export default new CheckoutPage();
