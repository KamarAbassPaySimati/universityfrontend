const { When, Then } = require('@cucumber/cucumber');
const { until, By, Key } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { faker } = require('@faker-js/faker');
const { getModifierKey } = require('../../bdd_modules/index.js');
const path = require('path');

When('I click on add Transaction for Transaction fee and commission bank', async function () {
    const addTransactionAndCommissionBankTransaction = await driver.wait(until.elementLocated(By.css('[data-testid="transaction-fees-and-commissions-transaction"]')));
    await driver.wait(until.elementIsVisible(addTransactionAndCommissionBankTransaction));
    await addTransactionAndCommissionBankTransaction.click();
});

Then('I should be redirected to add transaction for Transaction fee and commission banks page', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.urlContains('/paymaart-banks/transaction-fees-and-commissions/view-transaction-fees-and-commissions/PMTF/add-transaction'));
});

When('I select the transaction type as {string} for Transaction fee and commission banks', async function (transactionType) {
    let dropdownElement;
    if (transactionType !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        switch (transactionType) {
        case 'Balance EM Excess Return to Paymaart Main Capital Account for Float':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_0"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Balance EM Excess Return to Paymaart Main Capital Account for Payout':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_1"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        default:
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_0"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        }
        await dropdownElement.click();
        }
});

When('I enter the transaction amount as {string} for Transaction fee and commission banks transactions', async function (amount) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="amount"]')));
    await driver.wait(until.elementIsVisible(element));
    console.log('amount', amount);
    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (amount !== '') {
        await element.sendKeys(amount);
    }
});

When('I should see the entry by field should be disabled for Transaction fee and commission banks', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="entry_by"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementIsDisabled(element));
});

When('I enter the valid transaction POP Ref.No for Transaction fee and commission banks', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_pop_ref_number"]')));
    await driver.wait(until.elementIsVisible(element));

    const transactionPOPRefNo = `TRA${faker.finance.pin({ length: 12 })}`;
    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(transactionPOPRefNo);
});
When('I upload the transaction POP document as {string} for Transaction fee and commission banks', async function (document) {
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (document !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="pop_file_key"]')));
        const filePath = path.join(__dirname, `../../support/${document}`);
        await element.sendKeys(filePath);
    }
});

When('I submit the Transaction fee and commission banks form', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="add_transaction"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I enter the transaction POP Ref.No as {string} for Transaction fee and commission banks', async function (refNo) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_pop_ref_number"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (refNo !== '') {
        await element.sendKeys(refNo);
    }
});


