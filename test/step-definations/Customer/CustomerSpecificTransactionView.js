const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Then('I should see the transaction receipt',async function () {
    let Element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_Receipt"]')));
    await driver.wait(until.elementIsVisible(Element));
  });
