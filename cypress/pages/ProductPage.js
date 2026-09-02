class ProductPage {
  elements = {
    name: () => cy.get('[data-test="inventory-item-name"]'),
    price: () => cy.get('[data-test="inventory-item-price"]'),
    description: () => cy.get('[data-test="inventory-item-desc"]'),
    addToCart: () => cy.get('[data-test="add-to-cart"]'),
    remove: () => cy.get('[data-test="remove"]'),
    back: () => cy.get('[data-test="back-to-products"]'),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
  };

  assertLoaded() {
    cy.location('pathname').should('eq', '/inventory-item.html');
    this.elements.name().should('be.visible');
    return this;
  }

  assertName(expected) {
    this.elements.name().should('have.text', expected);
    return this;
  }

  assertPrice(price) {
    this.elements.price().should('have.text', `$${price.toFixed(2)}`);
    return this;
  }

  assertHasDescription() {
    this.elements.description().invoke('text').should('have.length.greaterThan', 0);
    return this;
  }

  addToCart() {
    this.elements.addToCart().click();
    return this;
  }

  assertButtonLabel(label) {
    (label === 'Remove' ? this.elements.remove() : this.elements.addToCart()).should('be.visible');
    return this;
  }

  assertCartBadge(count) {
    this.elements.cartBadge().should('have.text', String(count));
    return this;
  }

  backToProducts() {
    this.elements.back().click();
    cy.location('pathname').should('eq', '/inventory.html');
    return this;
  }
}

export default new ProductPage();
