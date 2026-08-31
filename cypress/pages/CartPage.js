class CartPage {
  elements = {
    items: () => cy.get('[data-test="inventory-item"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    checkout: () => cy.get('[data-test="checkout"]'),
  };

  assertLoaded() {
    cy.location('pathname').should('eq', '/cart.html');
    return this;
  }

  assertContains(productName) {
    this.elements.itemNames().should('contain.text', productName);
    return this;
  }

  assertItemCount(count) {
    this.elements.items().should('have.length', count);
    return this;
  }

  checkout() {
    this.elements.checkout().click();
    return this;
  }
}

export default new CartPage();
