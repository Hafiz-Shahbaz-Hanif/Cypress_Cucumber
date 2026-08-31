class InventoryPage {
  elements = {
    items: () => cy.get('[data-test="inventory-item"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    itemPrices: () => cy.get('[data-test="inventory-item-price"]'),
    sort: () => cy.get('[data-test="product-sort-container"]'),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
  };

  sortValues = {
    'Name (A to Z)': 'az',
    'Name (Z to A)': 'za',
    'Price (low to high)': 'lohi',
    'Price (high to low)': 'hilo',
  };

  assertLoaded() {
    cy.location('pathname').should('eq', '/inventory.html');
    this.elements.sort().should('be.visible');
    return this;
  }

  addToCart(productName) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    cy.get(`[data-test="add-to-cart-${slug}"]`).click();
    return this;
  }

  sortBy(label) {
    this.elements.sort().select(this.sortValues[label]);
    return this;
  }

  getItemNames() {
    return this.elements.itemNames().then(($els) => Cypress._.map($els, 'innerText'));
  }

  getItemPrices() {
    return this.elements
      .itemPrices()
      .then(($els) => Cypress._.map($els, (el) => parseFloat(el.innerText.replace('$', ''))));
  }

  openCart() {
    this.elements.cartLink().click();
    return this;
  }
}

export default new InventoryPage();
