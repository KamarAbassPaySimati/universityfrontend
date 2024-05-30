/* eslint-disable camelcase */
/* eslint-disable max-len */
const { When, Then } = require('@cucumber/cucumber');
const { until, By, Key } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { faker } = require('@faker-js/faker');
const { getModifierKey } = require('../../bdd_modules/index.js');
const path = require('path');

When('I click on view particular trust bank', async function () {
    const viewBank = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(viewBank));
    await viewBank.click();
});

Then('I should be redirected to view transaction listing screen of that trust bank', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.urlContains('http://localhost:3000/view/trust-bank/'));
});

When('I click on add trust bank transaction', async function () {
    const addTrustBankTransaction = await driver.wait(until.elementLocated(By.css('[data-testid="add_trust_bank_transaction"]')));
    await driver.wait(until.elementIsVisible(addTrustBankTransaction));
    await addTrustBankTransaction.click();
});

Then('I should be redirected to add transaction for trust bank page', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.urlContains('http://localhost:3000/view/trust-bank/add-transaction'));
});

When('I select the transaction type as {string}', async function (transactionType) {
    let dropdownElement;
    if (transactionType !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        switch (transactionType) {
        case 'Pay-in by Agent to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_0"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by Standard Customer to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_1"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by G2P Customer to PTBA1 | RMcredit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_2"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by Paymaart OBO Agent to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_3"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by Paymaart OBO Standard Customer to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_4"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by Paymaart OBO G2P Customer to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_5"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Inflow For E-money Float/other E-Funding to PTBA1 | RMey credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_6"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Inflow for Marketing Campaign Fund to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_7"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Receipt of Customer Balances Interest from PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_8"]')));
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

When('I enter valid agent paymaart ID', function () {
    return 'passed';
});

When('I enter valid customer paymaart ID', function () {
    return 'passed';
});

When('I enter the transaction amount as {string} for trust bank transaction', async function (amount) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="account_number"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (amount !== '') {
        await element.sendKeys(amount);
    }
});
When('I should see the entry by field should be disabled for add trust bank transaction', async function () {
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

When('I submit the add trust bank transaction form', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I enter the paymaart ID as {string} for trust bank transaction', async function (paymaart_id) {
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
