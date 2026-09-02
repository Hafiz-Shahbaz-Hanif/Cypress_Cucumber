import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../../pages/InventoryPage';
import { priceOf } from '../../fixtures/products';

When('I sort the products by {string}', (order) => {
  InventoryPage.sortBy(order);
});

Then('the products are ordered by {string}', (order) => {
  if (order.startsWith('Name')) {
    InventoryPage.getItemNames().then((names) => {
      const expected = [...names].sort();
      if (order.includes('Z to A')) expected.reverse();
      expect(names).to.deep.equal(expected);
    });
  } else {
    InventoryPage.getItemPrices().then((prices) => {
      const expected = [...prices].sort((a, b) => a - b);
      if (order.includes('high to low')) expected.reverse();
      expect(prices).to.deep.equal(expected);
    });
  }
});

When('I add {string} to the cart', (product) => {
  InventoryPage.addToCart(product);
});

When('I remove {string} from the cart on the catalogue', (product) => {
  InventoryPage.removeFromCart(product);
});

Then('the cart badge shows {string}', (count) => {
  InventoryPage.assertCartBadge(Number(count));
});

Then('the cart badge is empty', () => {
  InventoryPage.assertCartBadge(0);
});

Then('the {string} catalogue button reads {string}', (product, label) => {
  InventoryPage.assertButtonLabel(product, label);
});

Then('the shelf price of {string} is correct', (product) => {
  InventoryPage.assertShelfPrice(product, priceOf(product));
});

When('I reset the app state', () => {
  InventoryPage.resetAppState();
});

When('I open the cart', () => {
  InventoryPage.openCart();
});
