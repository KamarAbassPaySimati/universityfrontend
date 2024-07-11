/* eslint-disable camelcase */
/* eslint-disable max-len */
const { Then, When } = require('@cucumber/cucumber');
const assert = require('assert');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const { driver } = require('../1_Driver.js');

When('I click on view pay-out request', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.recipient_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="recipient_paymaart_id"]'))).getText();
    this.amount = await driver.wait(until.elementLocated(By.css('[data-testid="amount"]'))).getText();

    await element.click();
});

Then('I should view Pay-out Request Details', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('this', this.recipient_paymaart_id, this.amount);
    const transaction_element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"]')));
    await driver.wait(until.elementIsVisible(transaction_element));

    const bank_element = await driver.wait(until.elementLocated(By.css('[data-testid="bank_details"]')));
    await driver.wait(until.elementIsVisible(bank_element));

    const actual_amount = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="Amount"]'))).getText();
    assert.equal(actual_amount, this.amount);

    const actual_recipient_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="Paymaart ID"]'))).getText();
    assert.equal(actual_recipient_paymaart_id, this.recipient_paymaart_id);
});
