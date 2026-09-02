/**
 * SauceDemo's fixed inventory, with catalogue prices - safe to assert against.
 */
export const SAUCEDEMO_PRODUCTS = {
  'Sauce Labs Backpack': 29.99,
  'Sauce Labs Bike Light': 9.99,
  'Sauce Labs Bolt T-Shirt': 15.99,
  'Sauce Labs Fleece Jacket': 49.99,
  'Sauce Labs Onesie': 7.99,
  'Test.allTheThings() T-Shirt (Red)': 15.99,
};

export const ALL_PRODUCT_NAMES = Object.keys(SAUCEDEMO_PRODUCTS);

export const priceOf = (name) => SAUCEDEMO_PRODUCTS[name];
