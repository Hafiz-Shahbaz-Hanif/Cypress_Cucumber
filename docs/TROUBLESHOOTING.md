# Troubleshooting

Real issues hit while building this framework, and the fix that stuck.

## Cart state bleeds across `Scenario Outline` rows

**Symptom:** a cart-related scenario passes alone but fails when the full suite
runs, showing an item from a *previous* Examples row still in the cart.

**Cause:** SauceDemo's cart lives in `localStorage`, which Cypress does **not**
clear between scenarios by default (only between spec files). A `Given my cart
contains only "<product>"` that just clicks "Add to cart" leaves whatever was
already there.

**Fix:** `commands.js#clearSauceCart` clears `localStorage.cart-contents` and
reloads; it runs after every sign-in (see `common.steps.js`). The cart-seeding
Givens also navigate to the cart page and assert it before returning control to
the scenario, rather than trusting the badge count alone.

## "Reset App State" doesn't repaint the cart badge

**Symptom:** after clicking "Reset App State" from the burger menu, the badge
still shows the old count until you interact with the page.

**Cause:** the reset clears the underlying data but SauceDemo does not re-render
the badge component on its own.

**Fix:** `InventoryPage.resetAppState()` calls `cy.reload()` immediately after the
reset click, then re-asserts the page loaded.

## restful-booker returns something other than what you expect

The public demo is a shared, free service — it is occasionally slow or briefly
inconsistent under load. API steps use `failOnStatusCode: false` for mutating
calls precisely so a scenario can assert on the *actual* status rather than
Cypress throwing first. If a scenario is flaky only against this service (not
reproducible against a stable fixture), see `flaky_test.md` — it usually is not
a framework bug.

## A step doesn't match

`@badeball/cypress-cucumber-preprocessor` needs an exact match between the
`.feature` text and the step definition's cucumber-expression / regex,
including punctuation inside quoted values. Run the single spec
(`npx cypress run --spec "cypress/e2e/features/<file>.feature"`) and read the
"Step implementation missing" message — it prints the exact pattern Cypress
expected.
