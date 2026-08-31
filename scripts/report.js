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

report.generate({
  jsonDir,
  reportPath: path.join('cypress', 'reports', 'html'),
  pageTitle: 'Cypress + Cucumber - E2E Report',
  reportName: 'SauceDemo & restful-booker regression',
  displayDuration: true,
  metadata: {
    browser: { name: 'chrome', version: 'latest' },
    device: 'CI runner',
    platform: { name: process.platform },
  },
});
