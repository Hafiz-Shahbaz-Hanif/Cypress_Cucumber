---
name: report-triage
description: Turn a Cypress run (cucumber JSON + screenshots + video) into a ranked failure summary for this framework, grouped by root cause.
---

# Triage a run

## 1. Run and gather

```bash
npm test            # runs the suite, then scripts/report.js builds the HTML
```

- `cypress/reports/cucumber/cucumber-report.json` — every scenario, step, status, error
- `cypress/reports/html/index.html` — the human view
- `cypress/screenshots/<spec>/<scenario> (failed).png` — the failing command
- `cypress/videos/<spec>.mp4` — the full run

## 2. Failure table

For each scenario in the JSON whose `elements[].steps[]` contains a `result.status`
of `failed`:

| field | source |
|---|---|
| scenario | `name` + feature `uri` |
| tags | `tags[]` |
| failed step | the step with `result.status == "failed"` |
| message | `result.error_message` (first line) |
| screenshot | `cypress/screenshots/.../<name> (failed).png` |
| duration | `result.duration` (flag long ones) |

## 3. Group by cause

Cluster failures with the same message or Page Object: selector drift (one
`[data-test]`), missing `.should` chain, SauceDemo account lockout, state bleed
(`resetAppState` not run), restful-booker contract drift / outage.

## 4. Rank

1. Real product bugs (deterministic wrong value)
2. Framework defects hitting many scenarios (one Page Object / step)
3. Single flaky scenario (passed on retry)
4. External (demo app / API down)

## Output

Ranked clusters → scenarios affected → cause → fix owner, plus the one command to
reproduce the top item (`npx cypress run --spec ...`). Hand fixes to `failure-triager`.
