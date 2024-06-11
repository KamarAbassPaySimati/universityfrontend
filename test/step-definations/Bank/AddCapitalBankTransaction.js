/* eslint-disable camelcase */
/* eslint-disable max-len */
const { When, Then } = require('@cucumber/cucumber');
const { until, By, Key } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { faker } = require('@faker-js/faker');
const { getModifierKey } = require('../../bdd_modules/index.js');
const path = require('path');

Then('I navigate to add captial bank transaction screen', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.urlContains('http://localhost:3000/view/capital-bank/add-transaction'));
});

When('I select the transaction type as {string}', async function (transactionType) {
    let dropdownElement;
    if (transactionType !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        switch (transactionType) {
        case 'Settlement to Merchant Biller from PTBA1| EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_0"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Settlement to Merchant Biller from PTBA2| EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_1"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Settlement to Merchant Biller from PTBA3| EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_2"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Charge for Bank Services or Transactions by PTBA1 |  EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_3"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Charge for Bank Services or Transactions by PTBA2 |  EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_4"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Charge for Bank Services or Transactions by PTBA3 |  EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_5"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        default:
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_0"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        }
        await dropdownElement.click();
    }
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

When('I enter the valid transaction POP Ref.No', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="RefNo"]')));
    await driver.wait(until.elementIsVisible(element));

    const transactionPOPRefNo = `TRA${faker.finance.pin({ length: 12 })}`;
    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(transactionPOPRefNo);
});
When('I upload the transaction POP document as {string}', async function (document) {
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (document !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="profile_image"]')));
        const filePath = path.join(__dirname, `../../support/${document}`);
        await element.sendKeys(filePath);
    }
});

When('I submit the add capital bank transaction form', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I submit the add captial bank transaction form', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
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

When('I enter the transaction POP Ref.No as {string}', async function (refNo) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="RefNo"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (refNo !== '') {
        await element.sendKeys(refNo);
    }
});

When('I select valid merchant biller paymaart ID', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="biller_paymaartID"]'))).click();
    const dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="biller_paymaartID_1"]')));
    await driver.wait(until.elementIsVisible(dropdownElement));
    await dropdownElement.click();
});
