/* eslint-disable camelcase */
/* eslint-disable max-len */
const { When, Then } = require('@cucumber/cucumber');
const { until, By, Key } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Then('I navigate to add captial bank transaction screen', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.get('http://localhost:3000/paymaart-banks/main-capital/view-main-capital/PMCA/add-transaction');
});

When('I enter the transaction amount as {string} for capital bank transaction', async function (amount) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="amount"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (amount !== '') {
        await element.sendKeys(amount);
    }
});
When('I should see the entry by field should be disabled for add capital bank transaction', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="entry_by"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementIsDisabled(element));
});

When('I submit the add capital bank transaction form', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="add_transaction"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I submit the add captial bank transaction form', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="add_transaction"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});
When('I enter the paymaart ID as {string} for capital bank transaction', async function (paymaart_id) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (paymaart_id !== '') {
        await element.sendKeys(paymaart_id);
    }
});

When('I select valid merchant biller paymaart ID', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="biller_paymaartID"]'))).click();
    const dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="biller_paymaartID_1"]')));
    await driver.wait(until.elementIsVisible(dropdownElement));
    await dropdownElement.click();
});
