@api @booking
Feature: Booking API (restful-booker) via cy.request
  As an API consumer
  I want to create and read bookings over REST
  So that Cypress can cover the service layer too

  @smoke
  Scenario: Create a booking and read it back
    When I create a booking for "Hafiz" "QA" with total price 275
    Then the booking id is a positive number
    And fetching that booking returns the same first and last name

  Scenario: A missing booking returns 404
    When I fetch a booking with id 999999999
    Then the API response status is 404
