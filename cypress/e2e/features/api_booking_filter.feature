@api @booking @data-driven
Feature: Filtering the booking list (restful-booker)

  Scenario Outline: A booking for "<firstname> <lastname>" is found by the name filter
    Given a booking exists for "<firstname>" "<lastname>"
    When I filter bookings by firstname "<firstname>" and lastname "<lastname>"
    Then the filtered results contain that booking

    Examples:
      | firstname    | lastname |
      | Filterone    | Alpha    |
      | Filtertwo    | Bravo    |
      | Filterthree  | Charlie  |
      | Filterfour   | Delta    |
      | Filterfive   | Echo     |
      | Filtersix    | Foxtrot  |
      | Filterseven  | Golf     |
      | Filtereight  | Hotel    |
      | Filternine   | India    |
      | Filterten    | Juliet   |
