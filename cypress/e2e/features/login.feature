@ui @login
Feature: SauceDemo authentication
  As a shopper
  I want to sign in to the store
  So that I can browse and buy products

  # SauceDemo locks an account after 3 failed attempts, so the negative
  # scenarios keep wrong-password attempts on standard_user to a minimum.

  Background:
    Given the login page is open

  @smoke
  Scenario: Standard user signs in
    When I sign in as the standard user
    Then the inventory page is shown with 6 products

  Scenario Outline: "<username>" can sign in and reach the catalogue
    When I sign in with username "<username>" and password "secret_sauce"
    Then the inventory page is shown with 6 products

    Examples:
      | username                |
      | standard_user           |
      | problem_user            |
      | performance_glitch_user |
      | error_user              |
      | visual_user             |

  Scenario Outline: Sign in is rejected for bad input
    When I sign in with username "<username>" and password "<password>"
    Then I see the login error "<message>"

    Examples:
      | username        | password       | message                                                     |
      | locked_out_user | secret_sauce   | Sorry, this user has been locked out.                        |
      | standard_user   | wrong_password | Username and password do not match any user in this service  |
      |                 | secret_sauce   | Username is required                                         |
      | standard_user   |                | Password is required                                        |

  Scenario: Signing out returns to the login page
    When I sign in as the standard user
    And I sign out
    Then the login page is shown
