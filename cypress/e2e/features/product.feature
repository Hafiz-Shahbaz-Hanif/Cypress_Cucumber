@ui @product
Feature: SauceDemo product detail page
  As a signed-in shopper
  I want to open a product and read its details

  Background:
    Given I am signed in as the standard user

  @smoke
  Scenario: Opening a product shows its details
    When I open the "Sauce Labs Backpack" product
    Then the product page shows the name "Sauce Labs Backpack"
    And the product page shows the correct price for "Sauce Labs Backpack"
    And the product page shows a description

  Scenario Outline: The "<product>" page shows the right name, price and description
    When I open the "<product>" product
    Then the product page shows the name "<product>"
    And the product page shows the correct price for "<product>"
    And the product page shows a description

    Examples:
      | product                           |
      | Sauce Labs Backpack               |
      | Sauce Labs Bike Light             |
      | Sauce Labs Bolt T-Shirt           |
      | Sauce Labs Fleece Jacket          |
      | Sauce Labs Onesie                 |
      | Test.allTheThings() T-Shirt (Red) |

  Scenario Outline: Adding "<product>" to the cart from its page
    When I open the "<product>" product
    And I add the product to the cart from its page
    Then the product page cart badge shows "1"
    And the product page button reads "Remove"

    Examples:
      | product                           |
      | Sauce Labs Backpack               |
      | Sauce Labs Bike Light             |
      | Sauce Labs Bolt T-Shirt           |
      | Sauce Labs Fleece Jacket          |
      | Sauce Labs Onesie                 |
      | Test.allTheThings() T-Shirt (Red) |

  Scenario: Back to products returns to the catalogue
    When I open the "Sauce Labs Onesie" product
    And I go back to the catalogue
    Then the inventory page is shown with 6 products
