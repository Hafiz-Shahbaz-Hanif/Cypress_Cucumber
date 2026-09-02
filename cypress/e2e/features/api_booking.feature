@api @booking
Feature: Booking API lifecycle (restful-booker) via cy.request
  As an API consumer
  I want to manage bookings over REST
  So that Cypress covers the service layer too

  @smoke
  Scenario: Create a booking and read it back
    When I create a booking for "Hafiz" "QA" with total price 275
    Then the booking id is a positive number
    And fetching that booking returns the same first and last name

  Scenario: Authenticated full update of a booking
    Given I am authenticated against the booking API
    And a booking exists for "Ada" "Lovelace"
    When I fully update that booking to "Ada" "Byron" priced 300
    Then the booking reads back as "Ada" "Byron" priced 300

  Scenario: Partial update only changes the supplied field
    Given I am authenticated against the booking API
    And a booking exists for "Grace" "Hopper" with total price 300
    When I patch that booking's total price to 450
    Then the booking's total price is 450
    And the booking's first name is still "Grace"

  Scenario: Delete a booking
    Given I am authenticated against the booking API
    And a booking exists for "Temp" "Record"
    When I delete that booking
    Then fetching that booking returns status 404

  Scenario: The service health endpoint is up
    Then the health endpoint reports the service is up

  Scenario: A booking response honours its shape and a time budget
    Given a booking exists for "Contract" "Check" with total price 199
    Then the booking response has the expected shape
    And fetching that booking responds within 3000 ms
