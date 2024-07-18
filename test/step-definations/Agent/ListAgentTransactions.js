/* eslint-disable camelcase */
/* eslint-disable max-len */
const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

When('I click on transaction history icon', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="agent-transaction-view-btn-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="agent_name"]'))).getText();

    await element.click();
});

Then('I should be navigated to transaction history page', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction-history"]')));
    await driver.wait(until.elementIsVisible(element));

    await new Promise(resolve => setTimeout(resolve, 2000));
    const actual_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_id, this.paymaart_id);

    // const beneficiary_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="beneficiary_id"]'))).getText();
    // assert.equal(beneficiary_paymaart_id, this.paymaart_id);

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="name"]'))).getText();
    assert.equal(actual_name, this.name);
});

// When('I search for particular transaction as {string}', async function (searchTerm) {
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
//         .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     await driver.findElement(By.css('[data-testid="search"]')).sendKeys(searchTerm);
//     await driver.findElement(By.css('[data-testid="search"]')).sendKeys(Key.ENTER);
// });

// Given('I select filter by transaction type as {string}', async function (type) {
//     await driver.wait(until.elementLocated(By.css(`[data-testid='filter-modal'] [for='${type}']`))).click();
// });

Then('I should see list of transactions where type is {string}', async function (string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="transaction_type"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert.equal(data, string);
    });
});
