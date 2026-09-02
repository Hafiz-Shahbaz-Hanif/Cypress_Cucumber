import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../../pages/InventoryPage';
import ProductPage from '../../pages/ProductPage';
import { priceOf } from '../../fixtures/products';

When('I open the {string} product', (product) => {
  InventoryPage.openProduct(product);
  ProductPage.assertLoaded();
});

Then('the product page shows the name {string}', (name) => {
  ProductPage.assertName(name);
});

Then('the product page shows the correct price for {string}', (product) => {
  ProductPage.assertPrice(priceOf(product));
});

Then('the product page shows a description', () => {
  ProductPage.assertHasDescription();
});

When('I add the product to the cart from its page', () => {
  ProductPage.addToCart();
});

Then('the product page cart badge shows {string}', (count) => {
  ProductPage.assertCartBadge(Number(count));
});

Then('the product page button reads {string}', (label) => {
  ProductPage.assertButtonLabel(label);
});

When('I go back to the catalogue', () => {
  ProductPage.backToProducts();
});
