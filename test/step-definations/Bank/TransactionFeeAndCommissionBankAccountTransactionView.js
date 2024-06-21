const { When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');
const { getModifierKey } = require('../../bdd_modules/index.js');

Then('I should see prefilled fields for Transaction fee and commision bank details for transaction',async function () {
    const refNo = await driver.wait(until.elementLocated(By.css('[data-testid="Ref No."]'))).getText();
    const Name = await driver.wait(until.elementLocated(By.css('[data-testid="Name"]'))).getText();
    const purpose = await driver.wait(until.elementLocated(By.css('[data-testid="Purpose"]'))).getText();
    const lastUpdateDate = await driver.wait(until.elementLocated(By.css('[data-testid="Last Update Date / Time"]'))).getText();
    const balance = await driver.wait(until.elementLocated(By.css('[data-testid="Balance"]'))).getText();

    await assert.notEqual(refNo, '-');
    await assert.notEqual(Name, '-');
    await assert.notEqual(purpose, '-');
    await assert.notEqual(lastUpdateDate, '-');
    await assert.notEqual(balance, '-');

    await assert.notEqual(refNo, '');
    await assert.notEqual(Name, '');
    await assert.notEqual(purpose, '');
    await assert.notEqual(lastUpdateDate, '');
    await assert.notEqual(balance, '');
  });