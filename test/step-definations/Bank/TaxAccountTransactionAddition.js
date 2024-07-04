/* eslint-disable camelcase */
/* eslint-disable max-len */
const { When, Then } = require('@cucumber/cucumber');
const { until, By, Key } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');
const path = require('path');
const assert = require('assert');

When('I click on add transaction button', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="addTransactionButton"]'))).click();
});

Then('I should see the enter by field is prefilled', async function () {
    const enterByTextField = await driver.wait(until.elementLocated(By.css('[data-testid="enterByField"]')));
    const isEnable = await enterByTextField.isEnabled();
    assert.notEqual(isEnable, false);
    const enterByValue = await enterByTextField.getAttribute('value');
    assert.notEqual(enterByValue, ' ');
});

When('I click on add button', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="addTransactionButton"]'))).click();
});

When('I select the {string} of transaction', async function (transactionType) {
    await driver.wait(until.elementLocated(By.css('[data-testid="transactionTypeField"]'))).click();
    await driver.wait(until.elementIsVisible(By.css('[data-testid="transactionTypeDropDown"]')));
    switch (transactionType) {
    case 'Balance EM Excess Return to Paymaart Main Capital Account for Float' :
        await driver.wait(until.elementLocated(By.css('[data-testid="transactionTypeOne"]'))).click();
        break;
    case 'Balance EM Excess Return to Paymaart Main Capital Account for Payout' :
        await driver.wait(until.elementLocated(By.css('[data-testid="transactionTypeTwo"]'))).click();
        break;
    default: throw new Error('Invalid Transaction type');
    }
});

When('I enter the transaction amount as {string}', async function (amount) {
    const amountField = await driver.wait(until.elementLocated(By.css('[data-testid="transactionAmountField"]')));
    await amountField.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await amountField.sendKeys(amount);
});

When('I enter the transaction POP ref. no as {string}', async function (transactionPOPNo) {
    const transactionPOPNoField = await driver.wait(until.elementLocated(By.css('[data-testid="transactionPOPNoField"]')));
    await transactionPOPNoField.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await transactionPOPNoField.sendKeys(transactionPOPNo);
});

When('I upload the valid transaction POP file as {string}', async function (valid_file) {
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (valid_file !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="transactionPOPDocumenentField"]')));
        const filePath = path.join(__dirname, `../../support/${valid_file}`);
        await element.sendKeys(filePath);
    }
});
