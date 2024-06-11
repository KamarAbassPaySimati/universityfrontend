const { When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');
const { getModifierKey } = require('../../bdd_modules/index.js');

When('I click on view button for transaction details for capital bank', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I should see prefilled fields for bank details for capital bank', async function () {
    const refNo = await driver.wait(until.elementLocated(By.css('[data-testid="Ref No."]'))).getText();
    const Name = await driver.wait(until.elementLocated(By.css('[data-testid="Name"]'))).getText();
    const entryBy = await driver.wait(until.elementLocated(By.css('[data-testid="EntryBy"]'))).getText();
    const purpose = await driver.wait(until.elementLocated(By.css('[data-testid="Purpose"]'))).getText();
    const lastUpdateDate = await driver.wait(until.elementLocated(By.css('[data-testid="Last Update Date / Time"]'))).getText();
    const balance = await driver.wait(until.elementLocated(By.css('[data-testid="Balance"]'))).getText();

    await assert.notEqual(refNo, '-');
    await assert.notEqual(Name, '-');
    await assert.notEqual(entryBy, '-');
    await assert.notEqual(purpose, '-');
    await assert.notEqual(lastUpdateDate, '-');
    await assert.notEqual(balance, '-');

    await assert.notEqual(refNo, '');
    await assert.notEqual(Name, '');
    await assert.notEqual(entryBy, '');
    await assert.notEqual(purpose, '');
    await assert.notEqual(lastUpdateDate, '');
    await assert.notEqual(balance, '');
});