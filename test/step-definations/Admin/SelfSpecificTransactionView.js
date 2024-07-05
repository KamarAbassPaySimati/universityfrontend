const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

When('I click on the view button for first transaction in list',async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="viewButton"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

Then('I should be redirected to transaction details page',async function () {
  const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details_screen"]')));
  await driver.wait(until.elementIsVisible(element));
});