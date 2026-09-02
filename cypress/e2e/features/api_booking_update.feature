@api @booking @data-driven
Feature: Updating bookings (restful-booker)

  Background:
    Given I am authenticated against the booking API

  Scenario Outline: Full replace with "<firstname> <lastname>" priced <price>
    Given a booking exists for "Seed" "Record" with total price 100
    When I fully update that booking to "<firstname>" "<lastname>" priced <price>
    Then the booking reads back as "<firstname>" "<lastname>" priced <price>

    Examples:
      | firstname | lastname  | price |
      | Ada       | Byron     | 150   |
      | Grace     | Murray    | 275   |
      | Joan      | Clarke    | 60    |
      | Radia     | Perlman   | 830   |
      | Hedy      | Lamarr    | 410   |
      | Annie     | Easley    | 95    |
      | Carol     | Shaw      | 333   |
      | Sophie    | Wilson    | 288   |

  Scenario Outline: Patch the price to <price> and keep the name
    Given a booking exists for "Grace" "Hopper" with total price 300
    When I patch that booking's total price to <price>
    Then the booking's total price is <price>
    And the booking's first name is still "Grace"

    Examples:
      | price |
      | 1     |
      | 50    |
      | 275   |
      | 999   |
      | 1234  |

  Scenario Outline: Patch the first name to "<name>" and keep the price
    Given a booking exists for "Old" "Name" with total price 275
    When I patch that booking's first name to "<name>"
    Then the booking's total price is 275

    Examples:
      | name      |
      | Katherine |
      | Dorothy   |
      | Christine |
      | Melba     |
