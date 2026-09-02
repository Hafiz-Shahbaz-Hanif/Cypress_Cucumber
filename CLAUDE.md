# CLAUDE.md — working agreement for AI agents in this repo

This framework is developed with an **agentic-AI workflow**: Claude Code and the
subagents/skills in `.claude/` draft scenarios and page objects, triage failures,
and review diffs against the conventions below.

## What this project is

| | |
|---|---|
| UI under test | [SauceDemo](https://www.saucedemo.com) |
| API under test | [restful-booker](https://restful-booker.herokuapp.com) via `cy.request` |
| Runner / BDD | Cypress + `@badeball/cypress-cucumber-preprocessor` (Gherkin) |
| Bundler | `@bahmutov/cypress-esbuild-preprocessor` |
| Design | Page Object Model (`cypress/pages/`) |
| Reporting | `multiple-cucumber-html-reporter` from the cucumber JSON |

## Golden rules

1. **Behaviour in `.feature` files.** Prefer a `Scenario Outline` + `Examples` table
   for data variations — each row is one real test case.
2. **Page Object Model, strictly.** Step definitions never contain a `cy.get`,
   a selector, or a wait. They call an intent-revealing Page Object method and
   assert through it (or on its returned value).
3. **Selectors only in Page Objects**, as `[data-test="..."]`. No XPath. No text
   selectors for identifying controls.
4. **No `cy.wait(<number>)`.** Rely on Cypress retry-ability and assertion
   chains (`.should(...)`). Wait on state, never on time.
5. **Each Page Object is a singleton** exported as `export default new XPage();`
   with an `elements = { name: () => cy.get(...) }` map and action/query methods.
6. **Determinism.** `cy.resetAppState()` runs in each `Given`. Scenarios own the
   data they add (their own cart items); they must pass in any order.
7. **Config via `cypress.config.js` `env`** — `standardUser`, `password`,
   `apiBaseUrl`. No literals in steps or pages.
8. **API steps use `cy.request`** with `failOnStatusCode: false` for negative
   cases, and alias results with `.as(...)` rather than shared `let`s.

## Layout

```
cypress/
├── e2e/features/*.feature          Gherkin
├── e2e/step_definitions/*.steps.js  thin steps
├── pages/*.js                       Page Object Model
├── support/{e2e,commands}.js
scripts/report.js                    cucumber JSON -> HTML
cypress.config.js
```

## Commands

```bash
npm test                 # full run + HTML report
npm run test:smoke       # --env tags=@smoke
npm run cy:open          # interactive
npx cypress run --spec "cypress/e2e/features/api_booking.feature"
npm run lint
```

## Definition of done

- `npm run lint` clean
- The affected `--spec` (or tag) run green (note demo flakiness if any)
- New behaviour is Gherkin; new steps are one Page Object call + one assertion
- No `cy.get` / selector / `cy.wait(number)` in a step file
- Tags applied: `@ui`/`@api`, `@smoke` for one happy path per area
