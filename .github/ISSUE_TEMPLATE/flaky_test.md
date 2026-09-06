---
name: Flaky test
about: A scenario that passes on rerun without a code change
title: "[flaky] "
labels: flaky
---

## Which scenario

<!-- feature : scenario (or Scenario Outline + Examples row) -->

## Evidence it is flaky

- [ ] Passed on rerun with no code change
- [ ] Fails only in CI / only headless / only in a full run (not in isolation)
- Rough failure rate: __ / 10 runs

## Failure detail

<!-- The failing assertion and the step it happened on. -->

## Suspected cause

<!-- missing `.should(...)` retry, cart state bleeding across Examples rows,
     `cy.resetAppState` timing, restful-booker instability. -->

## Notes

Link the CI run and the artifact. The `failure-triager` agent in `.claude/` is
built for this.
