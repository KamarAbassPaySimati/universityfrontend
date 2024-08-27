/* eslint-disable camelcase */
/* eslint-disable max-len */
const { Then, When } = require('@cucumber/cucumber');
const assert = require('assert');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const { driver } = require('../1_Driver.js');

When('I click on view pending flagged transaction', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-pending"]')));
    await driver.wait(until.elementIsVisible(element));
    this.beneficiaryt_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="beneficiary_paymaart_id_pending"]'))).getText();
    await element.click();
});

Then('I should be redirected to flagged transaction details page', async function () {
    await new Promise((resolve) => setTimeout(resolve, 750));
    await driver.wait(until.elementLocated(By.xpath('//h1[text()="Flagged Details"]')));

    const to_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="beneficiary_paymaart_id"]'))).getText();
    assert.equal(to_paymaart_id, this.beneficiaryt_paymaart_id);
});

When('I click on the view button for first flagged transaction in list', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid^="view-"]')));
    await driver.wait(until.elementIsVisible(element));
    this.beneficiaryt_paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid^="beneficiary_paymaart_id_"]'))).getText();
    await element.click();
});
