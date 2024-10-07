/* eslint-disable eol-last */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

When('I select the type as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    switch (type) {
    case 'Pay-out to Agent from PTBA1 EM credit to PMCAT':
        await driver.wait(until.elementLocated(By.css('[data-testid="pay-out_to_agent_from__ptba1_|_em_credit_to_pmcat"]'))).click();
        break;
    case 'Pay-out to Agent from PTBA2 EM credit to PMCAT':
        await driver.wait(until.elementLocated(By.css('[data-testid="pay-out_to_agent_from__ptba2_|_em_credit_to_pmcat"]'))).click();
        break;
    case 'Pay-out to Agent from PTBA3 EM credit to PMCAT':
        await driver.wait(until.elementLocated(By.css('[data-testid="pay-out_to_agent_from__ptba3_|_em_credit_to_pmcat"]'))).click();
        break;
    default:
        break;
    }
});

When('I click on confirm button for approving', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="confirm_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I click on reject button for confirming', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="confirm_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

// Then('I should see the pay-out request status changed to {string}', async function (status) {
//     await new Promise(resolve => setTimeout(resolve, 4000));
//     const actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="pay_out_status"]'))).getText();
//     assert.equal(actual_status, status);
// });

When('I enter the transaction POP ref. no as {string} for payout request', async function (transactionPOPNo) {
    const transactionPOPNoField = await driver.wait(until.elementLocated(By.css('[data-testid="pop_file_ref_no"]')));
    await transactionPOPNoField.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await transactionPOPNoField.sendKeys(transactionPOPNo);
});

When('I click on approve Agent Pay-out request', async function () {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should see a confirmation prompt for approving Agent Pay-out request', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
    await driver.wait(until.elementIsVisible(element));
});