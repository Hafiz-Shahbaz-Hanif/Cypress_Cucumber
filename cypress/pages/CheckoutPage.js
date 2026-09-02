const money = (text) => parseFloat(text.split('$')[1]);

class CheckoutPage {
  elements = {
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continue: () => cy.get('[data-test="continue"]'),
    finish: () => cy.get('[data-test="finish"]'),
    cancel: () => cy.get('[data-test="cancel"]'),
    error: () => cy.get('[data-test="error"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    subtotal: () => cy.get('[data-test="subtotal-label"]'),
    tax: () => cy.get('[data-test="tax-label"]'),
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

  continueWithout(first, last, postal) {
    if (first) this.elements.firstName().type(first);
    if (last) this.elements.lastName().type(last);
    if (postal) this.elements.postalCode().type(postal);
    this.elements.continue().click();
    return this;
  }

  expectError(message) {
    this.elements.error().should('contain.text', message);
    return this;
  }

  assertOverviewContains(name) {
    this.elements.itemNames().should('contain.text', name);
    return this;
  }

  assertSubtotal(expected) {
    this.elements.subtotal().invoke('text').then((t) => {
      expect(money(t)).to.be.closeTo(expected, 0.01);
    });
    return this;
  }

  assertTaxIsEightPercentOfSubtotal() {
    this.elements.subtotal().invoke('text').then((sub) => {
      this.elements.tax().invoke('text').then((tax) => {
        expect(money(tax)).to.be.closeTo(Math.round(money(sub) * 8) / 100, 0.01);
      });
    });
    return this;
  }

  assertTotalIsSubtotalPlusTax() {
    this.elements.subtotal().invoke('text').then((sub) => {
      this.elements.tax().invoke('text').then((tax) => {
        this.elements.total().invoke('text').then((total) => {
          expect(money(total)).to.be.closeTo(money(sub) + money(tax), 0.01);
        });
      });
    });
    return this;
  }

  cancelInformationStep() {
    this.elements.cancel().click();
    cy.location('pathname').should('eq', '/cart.html');
    return this;
  }

  cancelOverviewStep() {
    this.elements.cancel().click();
    cy.location('pathname').should('eq', '/inventory.html');
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
