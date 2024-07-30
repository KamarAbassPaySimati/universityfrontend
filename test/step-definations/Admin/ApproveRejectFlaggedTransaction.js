const { When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');
const { getModifierKey } = require('../../bdd_modules/index.js');

Then('I should read a message stating {string} for flag transaction',async function (expected_text) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(expected_text, element_text);
  });