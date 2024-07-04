const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Given('I navigate to Transaction History Page', async function () {
    await driver.get('http://localhost:3000/financials/transaction-history');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I search for particular transaction as {string}', async function (searchTerm) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.findElement(By.css('[data-testid="search"]')).sendKeys(searchTerm);
    await driver.findElement(By.css('[data-testid="search"]')).sendKeys(Key.ENTER);
});

Given('I select filter by Transaction type as {string}', async function (transactionType) {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css(`[data-testid='filter-modal'] [for='${transactionType}']`))).click();
    await new Promise(resolve => setTimeout(resolve, 4000));
});

Then('I should see list of transactions where transaction type is {string}', async function (string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="transaction_type"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert(data, string);
    });
});

Then('I click on export button for transaction History', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="export-transaction-button"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 2000));
});
