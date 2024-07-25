/* eslint-disable camelcase */
/* eslint-disable max-len */
const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

When('I search for a agent', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys('640331'); // agent who made all the transaction types
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="searchButton"]'))).click();
});

When('I click on view agent transaction', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="agent_name"]'))).getText();

    await element.click();
});

Then('I should be redirected to transaction view page', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('this', this.paymaart_id, this.name);
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="name"]'))).getText();
    assert.equal(actual_name, this.name);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, this.paymaart_id);
});

Then('I should be able to view the wallet balance', async function () {
    await driver.wait(until.elementIsVisible(By.css('[[data-testid="wallet_balance_card"]]')));
});
Then('I should be able to view the gross agent commission', async function () {
    await driver.wait(until.elementIsVisible(By.css('[[data-testid="commission_card"]]')));
});

When('I search invalid beneficiary paymaart id', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys('47485647217234');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="searchButton"]'))).click();
});

Then('I should see list of agent transaction where status is {string}', async function (string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="status"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert(data, string);
    });
});

When('I click on view transaction for most recent transaction', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.transaction_id = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_id"]'))).getText();
    this.beneficiary_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="beneficiary_paymaart_id"]'))).getText();
    this.type = await driver.wait(until.elementLocated(By.css('[data-testid="type"]'))).getText();
    this.amount = await driver.wait(until.elementLocated(By.css('[data-testid="amount"]'))).getText();

    await element.click();
});

Then('I should see the transaction recipt', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('this', this.transaction_id, this.beneficiary_paymaart_id, this.type, this.amount);
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_transaction_id = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="transaction_id"]'))).getText();
    assert.equal(actual_transaction_id, this.transaction_id);

    const actual_beneficiary_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="beneficiary_paymaart_id"]'))).getText();
    assert.equal(actual_beneficiary_paymaart_id, this.beneficiary_paymaart_id);

    const actual_type = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="type"]'))).getText();
    assert.equal(actual_type, this.type);

    const actual_amount = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="amount"]'))).getText();
    assert.equal(actual_amount, this.amount);
});

Then('I should see the flag transaction and share button', async function () {
    await driver.wait(until.elementIsVisible(By.css('[data-testid="flag_transaction_buuton"]')));
    await driver.wait(until.elementIsVisible(By.css('[data-testid="share_transaction_button"]')));
});
