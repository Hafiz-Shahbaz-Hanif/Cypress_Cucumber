import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CartPage from '../../pages/CartPage';
import { priceOf } from '../../fixtures/products';

Then('the cart contains {string}', (product) => {
  CartPage.assertContains(product);
});

Then('the cart has {int} items', (count) => {
  CartPage.assertItemCount(count);
});

Then('the cart has {int} item', (count) => {
  CartPage.assertItemCount(count);
});

When('I remove {string} from the cart', (product) => {
  CartPage.remove(product);
});

Then('the cart is empty', () => {
  CartPage.assertItemCount(0);
});

When('I continue shopping', () => {
  CartPage.continueShopping();
});

Then('every cart price matches the catalogue', () => {
  CartPage.assertPricesMatch(priceOf);
});
