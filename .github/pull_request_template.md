<!-- See CONTRIBUTING.md and CLAUDE.md for the full conventions. -->

## What & why

<!-- One or two lines. Link the issue if there is one. -->

## Checklist

- [ ] `npm run lint` clean
- [ ] The affected `--spec` (or tag) run green (note demo flakiness if any)
- [ ] New behaviour is Gherkin; new steps are one Page Object call + one assertion
- [ ] No `cy.get` / selector / `cy.wait(number)` in a step file
- [ ] Selectors are `[data-test="..."]` inside a Page Object only
- [ ] API steps use `cy.request` with `.as(...)` aliases (not shared `let`s)
- [ ] Tags applied (`@ui` / `@api`, `@smoke` for one happy path per area)

## Notes for the reviewer

<!-- Anything non-obvious: a demo quirk worked around, a deliberate deviation, follow-ups. -->
