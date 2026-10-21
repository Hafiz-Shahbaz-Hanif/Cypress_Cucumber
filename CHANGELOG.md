# Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 2026-10-21

### Changed
- Dependabot config tuned after its first weekly run opened ~9 separate PRs:
  `cypress`, `@badeball/*`, `@bahmutov/*` and `esbuild` now move in one PR (the
  Cucumber preprocessor and bundler have to agree with the Cypress version); the
  remaining minor/patch bumps are batched; GitHub Actions updates are batched;
  commit messages use the repo's `chore(deps)` / `ci(deps)` convention.
- Major bumps of `eslint` and `eslint-plugin-cypress` are no longer auto-proposed:
  the lint config is `.eslintrc.json`, ESLint 10 no longer ships the eslintrc
  loader, and eslint-plugin-cypress 4+ requires ESLint 9+. These need a deliberate
  flat-config migration. The config was validated against the official Dependabot
  JSON schema.

## 2026-10-04

### Fixed
- README and `CLAUDE.md` now document the `test:ui`, `test:api` and `test:chrome`
  scripts — they existed in `package.json` (the first two since 2026-09-07) but
  were listed in neither doc. Every UI feature is tagged `@ui` and every API
  feature `@api`, so the filters cover all 11 feature files between them.

## 2026-09-25

### Added
- `Report` (Cucumber HTML) and `scenarios-147` badges to the README badge row
  (this repo had no reporting badge at all, unlike the Allure-based repos).

## 2026-09-24

### Fixed
- README's "~145 scenarios" line was stale; the coverage table already summed
  to the correct 147 — recounted directly from every `.feature` file to confirm.

## 2026-09-23

### Fixed
- `package.json` `engines.node` now matches `.nvmrc` (`>=20`) — it was undeclared.

## 2026-09-22

### Added
- Cancel superseded CI runs on the same branch (`concurrency` group in the workflow).

## 2026-09-19

### Added
- Dependabot for `npm` and `github-actions`.

## 2026-09-16

### Added
- `SECURITY.md`.

## 2026-09-13

### Added
- This changelog.

## 2026-09-11

### Added
- `docs/TROUBLESHOOTING.md` — cart state bleeding across `Scenario Outline` rows,
  the "Reset App State" badge repaint, restful-booker flakiness, step-matching.

## 2026-09-08

### Added
- `scripts/report.js` prints a one-line scenario pass/fail roll-up to the CI log.

## 2026-09-07

### Added
- `test:ui` / `test:api` npm scripts; report browser metadata now reads from
  `REPORT_BROWSER` / `REPORT_BROWSER_VERSION` / `REPORT_DEVICE` env vars.

## 2026-09-06

### Added
- `.github/ISSUE_TEMPLATE/{bug_report,flaky_test}.md`,
  `.github/pull_request_template.md`.

## 2026-09-05

### Added
- `.editorconfig` mirroring `.prettierrc`.

## 2026-09-03

### Added
- `CONTRIBUTING.md` (Page Object Model rules, PR checklist).

## 2026-09-02

### Added
- `.claude/` AI-assisted workflow: `failure-triager`, `page-object-author`
  subagents; `new-bdd-scenario`, `report-triage` skills.
- Support: SauceDemo catalogue fixture, restful-booker `cy.request` helpers,
  cart-reset command; `ProductPage`; menu/reset/logout/remove/price/tax helpers.
- UI: user-type login matrix and sign-out; shared cart-seeding Givens; per-product
  inventory coverage (sort, add/remove, shelf prices, reset state); product detail
  page suite; data-driven cart suite; per-product checkout with 8% tax/total math,
  field validation and cancel flows.
- API: data-driven create/update/patch/filter, negative and auth suites.
- README coverage table and `.claude/` layout.

## 2026-08-31

### Added
- Initial scaffold: Cypress + Cucumber (BDD) with the esbuild preprocessor;
  cross-cutting commands.
- Page Object Model for the SauceDemo store; login, product sorting, cart and
  checkout BDD scenarios.
- restful-booker scenarios via `cy.request`.
- HTML report generation from the cucumber JSON.
- GitHub Actions running the suite on Chrome.
- Framework overview and run instructions.
