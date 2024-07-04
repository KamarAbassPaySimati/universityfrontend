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
    await driver.wait(until.urlContains('http://localhost:3000/paymaart-banks/trust-banks/view-trust-bank/'));
});

When('I click on add trust bank transaction', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const addTrustBankTransaction = await driver.wait(until.elementLocated(By.css('[data-testid="trust-bank-transaction"]')));
    await driver.wait(until.elementIsVisible(addTrustBankTransaction));
    await addTrustBankTransaction.click();
});

Then('I should be redirected to add transaction for trust bank page', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.urlContains('/paymaart-banks/trust-banks/view-trust-bank/'));
});

When('I select the transaction type as {string}', async function (transactionType) {
    let dropdownElement;
    if (transactionType !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        switch (transactionType) {
        case 'Pay-in by Agent to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_0"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by Standard Customer to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_1"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by G2P Customer to PTBA1 | RMcredit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_2"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by Paymaart OBO Agent to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_3"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by Paymaart OBO Standard Customer to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_4"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Pay-in by Paymaart OBO G2P Customer to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_5"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Inflow For E-money Float/other E-Funding to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_6"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Inflow for Marketing Campaign Fund to PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_7"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Receipt of Customer Balances Interest from PTBA1 | RM credit':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_8"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Settlement to Merchant Biller from PTBA1| EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.xpath('//*[text()="Settlement to Merchant Biller from PTBA1 | EM credit to PMCAT"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Settlement to Merchant Biller from PTBA2| EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.xpath('//*[text()="Settlement to Merchant Biller from PTBA2 | EM credit to PMCAT"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Settlement to Merchant Biller from PTBA3| EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.xpath('//*[text()="Settlement to Merchant Biller from PTBA3 | EM credit to PMCAT"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Payout to Paymaart Operations for excess Float in PMCA to PTBA1':
            dropdownElement = await driver.wait(until.elementLocated(By.xpath('//*[text()="Payout to Paymaart Operations for excess Float in PMCA to PTBA1"]')));
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
        case 'Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.xpath('//*[text()="Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.xpath('//*[text()="Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT':
            dropdownElement = await driver.wait(until.elementLocated(By.xpath('//*[text()="Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT"]')));
            await driver.wait(until.elementIsVisible(dropdownElement));
            break;
        case 'Inflow For EM Float/Funding for Transaction fee and Commission| EM credit to PMTF':
            dropdownElement = await driver.wait(until.elementLocated(By.xpath('//*[text()="Inflow For EM Float/Funding for Transaction fee and Commission| EM credit to PMTF"]')));
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

When('I enter valid agent paymaart ID', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="entry_for"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(global.agentList.data[0].paymaart_id.substring(3, 11));
});

When('I enter valid customer paymaart ID', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="entry_for"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(global.customerList.data[0].paymaart_id.substring(3, 11));
});

When('I enter the transaction amount as {string} for trust bank transaction', async function (amount) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="amount"]')));
    await driver.wait(until.elementIsVisible(element));
    console.log('amount', amount);
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
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_pop_ref_number"]')));
    await driver.wait(until.elementIsVisible(element));

    const transactionPOPRefNo = `TRA${faker.finance.pin({ length: 12 })}`;
    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(transactionPOPRefNo);
});
When('I upload the transaction POP document as {string}', async function (document) {
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (document !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="pop_file_key"]')));
        const filePath = path.join(__dirname, `../../support/${document}`);
        await element.sendKeys(filePath);
    }
});

When('I submit the add trust bank transaction form', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="add_transaction"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I enter the paymaart ID as {string} for trust bank transaction', async function (paymaart_id) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="entry_for"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (paymaart_id !== '') {
        await element.sendKeys(paymaart_id);
    }
});

When('I enter the transaction POP Ref.No as {string}', async function (refNo) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_pop_ref_number"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (refNo !== '') {
        await element.sendKeys(refNo);
    }
});
