/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const report = require('multiple-cucumber-html-reporter');

const jsonDir = path.join('cypress', 'reports', 'cucumber');
const jsonFile = path.join(jsonDir, 'cucumber-report.json');

if (!fs.existsSync(jsonFile)) {
  console.log(`No cucumber report at ${jsonFile} - run the suite first.`);
  process.exit(0);
}

/** One-line pass/fail roll-up for the CI log, read from the cucumber JSON. */
function printSummary() {
  const features = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const tally = { passed: 0, failed: 0, skipped: 0, other: 0 };
  for (const feature of features) {
    for (const scenario of feature.elements || []) {
      if ((scenario.type || 'scenario') === 'background') continue;
      const steps = scenario.steps || [];
      const statuses = steps.map((s) => (s.result && s.result.status) || 'skipped');
      let status = 'passed';
      if (statuses.includes('failed')) status = 'failed';
      else if (statuses.includes('undefined') || statuses.includes('ambiguous')) status = 'other';
      else if (statuses.length === 0 || statuses.every((s) => s === 'skipped')) status = 'skipped';
      tally[status]++;
    }
  }
  const total = tally.passed + tally.failed + tally.skipped + tally.other;
  console.log(
    `Scenarios: ${total} | passed ${tally.passed} | failed ${tally.failed} | ` +
      `skipped ${tally.skipped}${tally.other ? ` | other ${tally.other}` : ''}`,
  );
}

printSummary();

report.generate({
  jsonDir,
  reportPath: path.join('cypress', 'reports', 'html'),
  pageTitle: 'Cypress + Cucumber - E2E Report',
  reportName: 'SauceDemo & restful-booker regression',
  displayDuration: true,
  metadata: {
    browser: {
      name: process.env.REPORT_BROWSER || 'chrome',
      version: process.env.REPORT_BROWSER_VERSION || 'latest',
    },
    device: process.env.REPORT_DEVICE || 'CI runner',
    platform: { name: process.platform },
  },
});
