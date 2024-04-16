/* eslint-disable max-len */
const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By, Key } = require('selenium-webdriver');
const { driver } = require('../Driver.js');
const { faker } = require('@faker-js/faker');

When('I click on add new trust bank', async function () {
    // Write code here that turns the phrase above into concrete actions
    const addBankButton = await driver.wait(until.elementLocated(By.css('[data-testid="add_new_bank"]')));
    await driver.wait(until.elementIsVisible(addBankButton));
    await addBankButton.click();
});

Then('I should be redirected to add new trust bank screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.urlIs('http://localhost:3000/paymaart-banks/trust-banks/add-trust-bank'));
});

Given('I navigate to onboard trust bank', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/paymaart-banks/trust-banks/add-trust-bank');
});

When('I select valid bank ref no.', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="refNo"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="refNo"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    global.bank_ref_no = await driver.wait(until.elementLocated(By.css('[data-testid="refNo_0"]'))).getText();
    await driver.wait(until.elementLocated(By.css('[data-testid="refNo_0"]'))).click();
});

When('I select bank name as {string}', async function (bankName) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="bankName"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="bankName"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    switch (bankName) {
    case 'CDH Investment Bank':
        await driver.wait(until.elementLocated(By.css('[data-testid="bankName_0"]'))).click();
        break;
    case 'Ecobank':
        await driver.wait(until.elementLocated(By.css('[data-testid="bankName_1"]'))).click();
        break;
    case 'FDH Bank':
        await driver.wait(until.elementLocated(By.css('[data-testid="bankName_2"]'))).click();
        break;
    case 'First Capital Bank':
        await driver.wait(until.elementLocated(By.css('[data-testid="bankName_3"]'))).click();
        break;
    case 'National Bank':
        await driver.wait(until.elementLocated(By.css('[data-testid="bankName_4"]'))).click();
        break;
    case 'Standard Bank':
        await driver.wait(until.elementLocated(By.css('[data-testid="bankName_5"]'))).click();
        break;
    case 'Centenary Bank':
        await driver.wait(until.elementLocated(By.css('[data-testid="bankName_6"]'))).click();
        break;
    default:
        break;
    }
});

When('I enter bank account number as {string}', async function (bankAccountNumber) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="accountNumber"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await element.sendKeys(bankAccountNumber);
});

When('I submit the onboard bank form', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I enter valid bank account number', async function () {
    // Write code here that turns the phrase above into concrete actions
    const bankAccountNumber = faker.finance.accountNumber({ length: 15 });

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="accountNumber"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await element.sendKeys(bankAccountNumber);
});
