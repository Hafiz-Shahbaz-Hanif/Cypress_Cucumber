const slugOf = (name) => name.toLowerCase().replace(/\s+/g, '-');

class CartPage {
  elements = {
    items: () => cy.get('[data-test="inventory-item"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    itemPrices: () => cy.get('[data-test="inventory-item-price"]'),
    checkout: () => cy.get('[data-test="checkout"]'),
    continueShopping: () => cy.get('[data-test="continue-shopping"]'),
    removeButton: (name) => cy.get(`[data-test="remove-${slugOf(name)}"]`),
  };

  assertLoaded() {
    cy.location('pathname').should('eq', '/cart.html');
    return this;
  }

  assertContains(name) {
    this.elements.itemNames().should('contain.text', name);
    return this;
  }

  assertNotContains(name) {
    this.elements.items().should('not.contain.text', name);
    return this;
  }

  assertItemCount(count) {
    if (count === 0) {
      this.elements.items().should('not.exist');
    } else {
      this.elements.items().should('have.length', count);
    }
    return this;
  }

  remove(name) {
    this.elements.removeButton(name).click();
    return this;
  }

  assertPricesMatch(priceOf) {
    this.elements.items().each(($row) => {
      const name = $row.find('[data-test="inventory-item-name"]').text().trim();
      const price = parseFloat($row.find('[data-test="inventory-item-price"]').text().replace('$', ''));
      expect(price).to.eq(priceOf(name));
    });
    return this;
  }

  continueShopping() {
    this.elements.continueShopping().click();
    cy.location('pathname').should('eq', '/inventory.html');
    return this;
  }

  checkout() {
    this.elements.checkout().click();
    cy.location('pathname').should('eq', '/checkout-step-one.html');
    return this;
  }
}

export default new CartPage();
