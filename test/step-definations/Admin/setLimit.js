/* eslint-disable max-len */
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Given('I navigate to set limit screen', async function () {
    await driver.get('http://localhost:3000/financials/set-limit');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

Then('I should see the Maximum Account Balance field for {string} prefilled', async function (userType) {
    let element;
    let elementValue;
    switch (userType) {
    case 'Agent':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="agentMaxLimit"]')));
        elementValue = await element.getText();
        break;
    case 'Merchant':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="merchantMaxLimit"]')));
        elementValue = await element.getText();
        break;
    case 'Customer':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="agentMaxLimit"]')));
        elementValue = await element.getText();
        break;
    }
    await assert.notEqual(elementValue, '');
    await assert.notEqual(elementValue, '-');
});

When('I select the Full KYC tab', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="fullKycTab"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

When('I select the Simplified KYC tab', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="simplified KycTab"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I should see a static text stating {string}', async function (string) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="staticMessage"]')));
    await driver.wait(until.elementIsVisible(element));
    const elementValue = await element.getText();
    await assert.equal(elementValue, string);
});

Then('I should see the Transaction Limit field for {string} prefilled', async function (userType) {
    let element;
    let elementValue;
    switch (userType) {
    case 'Agent':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="agentTransactionLimit"]')));
        elementValue = await element.getText();
        break;
    case 'Merchant':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="MerchantTransactionLimit"]')));
        elementValue = await element.getText();
        break;
    case 'Customer':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="CustomerTransactionLimit"]')));
        elementValue = await element.getText();
        break;
    default:
        break;
    }
    await assert.notEqual(elementValue, '');
    await assert.notEqual(elementValue, '-');
});

When('I click the update set limit button', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="Update"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I submit the update transaction limit form', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="updateSubmitButtion"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I update the Maximum Account Balance field for {string} to {string}', async function (userType, limit) {
    switch (userType) {
    case 'Agent':
        await driver.wait(until.elementLocated(By.css('[data-testid="agentMaxLimit"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="agentMaxLimit"]'))).sendKeys(limit);
        break;
    case 'Merchant':
        await driver.wait(until.elementLocated(By.css('[data-testid="merchantMaxLimit"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="merchantMaxLimit"]'))).sendKeys(limit);
        break;
    case 'Customer':
        await driver.wait(until.elementLocated(By.css('[data-testid="agentMaxLimit"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="agentMaxLimit"]'))).sendKeys(limit);
        break;
    default:
        break;
    }
});

Then('I update the Transaction Limit field for {string} to {string}', async function (userType, limit) {
    switch (userType) {
    case 'Agent':
        await driver.wait(until.elementLocated(By.css('[data-testid="agentTransactionLimit"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="agentTransactionLimit"]'))).sendKeys(limit);
        break;
    case 'Merchant':
        await driver.wait(until.elementLocated(By.css('[data-testid="MerchantTransactionLimit"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="MerchantTransactionLimit"]'))).sendKeys(limit);
        break;
    case 'Customer':
        await driver.wait(until.elementLocated(By.css('[data-testid="CustomerTransactionLimit"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="CustomerTransactionLimit"]'))).sendKeys(limit);
        break;
    default:
        break;
    }
});
