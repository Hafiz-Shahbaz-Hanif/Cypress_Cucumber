# Contributing

Thanks for looking at this project. It is a portfolio framework, but it is built
to real standards and PRs are welcome.

## Ground rules

The conventions in [`CLAUDE.md`](CLAUDE.md) are the contract — read it first. In
short:

- **Behaviour in `.feature` files.** Prefer a `Scenario Outline` + `Examples`
  table for data variations — each row is one real test case.
- **Page Object Model, strictly.** No `cy.get`, selector or wait in a step
  definition; steps call an intent-revealing Page Object method.
- **Selectors only in Page Objects**, as `[data-test="..."]`. No XPath, no text
  selectors for identifying controls.
- **No `cy.wait(<number>)`** — rely on Cypress retry-ability and `.should(...)`.
- **Each Page Object is a singleton** (`export default new XPage();`) with an
  `elements` map and action/query methods.
- **API steps use `cy.request`** with `failOnStatusCode: false` for negative
  cases and `.as(...)` aliases, not shared `let`s.

## Getting set up

```bash
npm ci
npm run test:smoke        # --env tags=@smoke
npm run cy:open           # interactive
```

## Adding a scenario

1. Add or extend a `.feature` under `cypress/e2e/features`. Data variations go in
   an `Examples` table.
2. Reuse existing step text (`grep cypress/e2e/step_definitions/`). New steps are
   **one Page Object call + one assertion**.
3. New UI surface → a Page Object method (or a new `cypress/pages/*.js`
   singleton). New API surface → a helper in `cypress/support/bookingApi.js`.
4. Tag it: `@ui` / `@api`, plus `@smoke` for one happy path per area.

## Before you open a PR

```bash
npm run lint
npx cypress run --spec "cypress/e2e/features/<affected>.feature"
```

- [ ] `npm run lint` clean
- [ ] New behaviour is Gherkin; steps stay thin
- [ ] No `cy.get` / selector / `cy.wait(number)` in a step file
- [ ] Tags applied
- [ ] Commit messages are conventional (`feat(pages): …`, `test(api): …`, `docs: …`)

## AI-assisted workflow

`.claude/` contains the subagents and skills used to develop this repo
(`failure-triager`, `page-object-author`, and the `new-bdd-scenario` /
`report-triage` skills). They encode the same rules as this document.
