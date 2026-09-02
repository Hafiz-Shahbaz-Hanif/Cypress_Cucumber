@ui @checkout
Feature: SauceDemo checkout
  As a signed-in shopper
  I want to check out the items in my cart

  Background:
    Given I am signed in as the standard user

  @smoke @e2e
  Scenario: Complete a purchase
    Given my cart contains:
      | product               |
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    When I check out with "Hafiz", "QA", "54000"
    And I finish the order
    Then I see the confirmation "Thank you for your order!"

  Scenario Outline: Buying just "<product>" checks out and charges 8% tax
    Given my cart contains only "<product>"
    When I check out with "Hafiz", "QA", "54000"
    Then the checkout overview lists "<product>"
    And the subtotal equals the catalogue price of "<product>"
    And the tax is 8% of the subtotal
    And the total is the subtotal plus tax
    When I finish the order
    Then I see the confirmation "Thank you for your order!"

    Examples:
      | product                           |
      | Sauce Labs Backpack               |
      | Sauce Labs Bike Light             |
      | Sauce Labs Bolt T-Shirt           |
      | Sauce Labs Fleece Jacket          |
      | Sauce Labs Onesie                 |
      | Test.allTheThings() T-Shirt (Red) |

  Scenario Outline: Checkout information is validated - "<missing>" is required
    Given my cart contains only "Sauce Labs Backpack"
    When I start checkout and continue with first "<first>", last "<last>", postal "<postal>"
    Then I see the checkout error "<message>"

    Examples:
      | missing     | first | last | postal | message                 |
      | first name  |       | QA   | 54000  | First Name is required  |
      | last name   | Hafiz |      | 54000  | Last Name is required   |
      | postal code | Hafiz | QA   |        | Postal Code is required |

  Scenario: Cancelling on the information step returns to the cart
    Given my cart contains only "Sauce Labs Backpack"
    When I start the checkout
    And I cancel on the information step
    Then the cart page is shown

  Scenario: Cancelling on the overview step returns to the catalogue
    Given my cart contains only "Sauce Labs Backpack"
    When I check out with "Hafiz", "QA", "54000"
    And I cancel on the overview step
    Then the inventory page is shown with 6 products

  Scenario: The overview lists every product being bought
    Given my cart contains:
      | product                  |
      | Sauce Labs Backpack      |
      | Sauce Labs Fleece Jacket |
      | Sauce Labs Onesie        |
    When I check out with "Hafiz", "QA", "54000"
    Then the checkout overview lists "Sauce Labs Backpack"
    And the checkout overview lists "Sauce Labs Fleece Jacket"
    And the checkout overview lists "Sauce Labs Onesie"
    And the tax is 8% of the subtotal
    And the total is the subtotal plus tax
