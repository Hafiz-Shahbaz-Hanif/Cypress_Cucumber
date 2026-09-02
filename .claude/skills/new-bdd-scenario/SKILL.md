---
name: new-bdd-scenario
description: Scaffold a new Gherkin scenario or feature for this Cypress + Cucumber + POM framework, wired to existing (or new, thin) step definitions and Page Objects.
---

# Add a BDD scenario

## 1. File and tags

- SauceDemo UI → `cypress/e2e/features/<area>.feature`, tag `@ui`
- restful-booker API → `cypress/e2e/features/api_<area>.feature`, tag `@api`
- One `@smoke` per area (a single happy path). `@e2e` for full journeys.

## 2. Write it as behaviour

- One capability per `Feature`; `Background` for shared setup
  (`Given I am signed in as the standard user`).
- Prefer a `Scenario Outline` with an `Examples` table for variations. Blank cells
  are empty strings (the step's `{string}` matches `""`).
- Steps read as behaviour: `When I add "Sauce Labs Backpack" to the cart`.

## 3. Reuse steps first

Search `cypress/e2e/step_definitions/` for a matching step. A new step is **one
Page Object call + one assertion** (via a `.should` in the Page Object, or
`expect(...)` on a returned value). Register `{string}` / `{int}` params in order.

## 4. New Page Object behaviour

Add an action/query to the relevant `cypress/pages/*.js`. If a whole screen is
missing, use the `page-object-author` agent.

## 5. Verify

```bash
npm run lint
npx cypress run --spec "cypress/e2e/features/<file>.feature"
```

For API scenarios, use `cy.request` with `failOnStatusCode: false` on negatives
and `.as(...)` aliases (no shared `let`s).

## Checklist

- [ ] Scenario is independent (`cy.resetAppState()` in the Given; owns its cart data)
- [ ] No `cy.get` / selector / `cy.wait(number)` in the step file
- [ ] No wrong-password spam on `standard_user` (SauceDemo locks after 3)
- [ ] Tags applied; targeted `--spec` run green
