const slugOf = (name) => name.toLowerCase().replace(/\s+/g, '-');

class InventoryPage {
  elements = {
    items: () => cy.get('[data-test="inventory-item"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    itemPrices: () => cy.get('[data-test="inventory-item-price"]'),
    sort: () => cy.get('[data-test="product-sort-container"]'),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
    burger: () => cy.get('#react-burger-menu-btn'),
    resetLink: () => cy.get('[data-test="reset-sidebar-link"]'),
    logoutLink: () => cy.get('[data-test="logout-sidebar-link"]'),
    addButton: (name) => cy.get(`[data-test="add-to-cart-${slugOf(name)}"]`),
    removeButton: (name) => cy.get(`[data-test="remove-${slugOf(name)}"]`),
    itemLink: (name) =>
      cy.contains('[data-test="inventory-item-name"]', new RegExp(`^${escapeRe(name)}$`)),
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

  addToCart(name) {
    this.elements.addButton(name).click();
    return this;
  }

  removeFromCart(name) {
    this.elements.removeButton(name).click();
    return this;
  }

  assertButtonLabel(name, label) {
    const selector = label === 'Remove' ? this.elements.removeButton : this.elements.addButton;
    selector(name).should('be.visible');
    return this;
  }

  assertShelfPrice(name, price) {
    this.elements
      .itemNames()
      .contains(new RegExp(`^${escapeRe(name)}$`))
      .parents('[data-test="inventory-item"]')
      .find('[data-test="inventory-item-price"]')
      .should('have.text', `$${price.toFixed(2)}`);
    return this;
  }

  openProduct(name) {
    this.elements.itemLink(name).click();
    cy.location('pathname').should('eq', '/inventory-item.html');
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

  assertCartBadge(count) {
    if (count === 0) {
      this.elements.cartBadge().should('not.exist');
    } else {
      this.elements.cartBadge().should('have.text', String(count));
    }
    return this;
  }

  openCart() {
    this.elements.cartLink().click();
    cy.location('pathname').should('eq', '/cart.html');
    return this;
  }

  resetAppState() {
    this.elements.burger().click();
    this.elements.resetLink().should('be.visible').click();
    // SauceDemo clears the cart but only repaints the badge after a reload.
    cy.reload();
    this.assertLoaded();
    return this;
  }

  logout() {
    this.elements.burger().click();
    this.elements.logoutLink().should('be.visible').click();
    cy.location('pathname').should('eq', '/');
    return this;
  }
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default new InventoryPage();
