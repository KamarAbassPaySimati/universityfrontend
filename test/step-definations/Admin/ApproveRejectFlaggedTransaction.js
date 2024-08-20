/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');

Then('I should read a message stating {string} for flag transaction', async function (expected_text) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(expected_text, element_text);
});

When('I click on the view button for second transaction in list', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="transaction_view-1"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});
