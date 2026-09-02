@api @booking @negative
Feature: Booking API error handling (restful-booker)

  Scenario Outline: Creating a booking without the "<field>" field is rejected
    When I create a booking missing the <field> field
    Then the API response status is an error

    Examples:
      | field        |
      | firstname    |
      | lastname     |
      | totalprice   |
      | depositpaid  |
      | bookingdates |

  Scenario Outline: Fetching a non-existent booking id <id> returns 404
    When I fetch a booking with id <id>
    Then the API response status is 404

    Examples:
      | id        |
      | 999999999 |
      | 888888888 |
      | 123456789 |

  Scenario: Updating a booking without a token is forbidden
    Given a booking exists for "Locked" "Down"
    When I attempt to update that booking without a token
    Then the API response status is 403
