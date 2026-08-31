@ui @checkout
Feature: SauceDemo cart and checkout
  As a signed-in shopper
  I want to manage my cart and check out
  So that I can complete a purchase

  Background:
    Given I am signed in as the standard user

  Scenario Outline: Products can be sorted
    When I sort the products by "<order>"
    Then the products are ordered by "<order>"

    Examples:
      | order               |
      | Name (A to Z)       |
      | Name (Z to A)       |
      | Price (low to high) |
      | Price (high to low) |

  Scenario: Adding products updates the cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge shows "2"
    When I open the cart
    Then the cart contains "Sauce Labs Backpack"
    And the cart has 2 items

  @smoke @e2e
  Scenario: Complete a purchase
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I check out with "Hafiz", "QA", "54000"
    And I finish the order
    Then I see the confirmation "Thank you for your order!"

  Scenario: Checkout requires customer information
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I start checkout without entering information
    Then I see the checkout error "First Name is required"
