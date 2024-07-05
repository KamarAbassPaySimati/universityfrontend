/* eslint-disable camelcase */
/* eslint-disable max-len */
const {Given, When, Then } = require('@cucumber/cucumber');
const { until, By, Key } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');
const { faker } = require('@faker-js/faker');
const assert = require('assert');

Given("I am in the add transaction for suspense account page", async function(){
    await driver.get("http://localhost:3000/paymaart-banks/suspense-account/view-suspense-account/PMSP/add-transaction");
});

When("I select the transaction type as {string}", async function(transactionType){

    if (transactionType !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        switch (transactionType) {
        case 'Pay-out to RBM for RBM Unclaimed FI Funds Account EM credit to PTBA1' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_0"]'))).click();
            break;
        case 'Pay-out to RBM for RBM Unclaimed FI Funds Account EM credit to PTBA2' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_1"]'))).click();
            break;
        case 'Pay-out to RBM for RBM Unclaimed FI Funds Account EM credit to PTBA3' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_2"]'))).click();
            break;
        case 'Pay-out to Agent Post DEL/DEACT from PTBA1 EM credit to PMCAT' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_3"]'))).click();
            break;
        case 'Pay-out to Agent Post DEL/DEACT from PTBA2 EM credit to PMCAT' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_4"]'))).click();
            break;
        case 'Pay-out to Agent Post DEL/DEACT from PTBA3 EM credit to PMCAT' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_5"]'))).click();
            break;
        case 'Pay-out to Customer Post DEL/DEACT from PTBA1 EM credit to PMCAT' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_6"]'))).click();
            break;
        case 'Pay-out to Customer Post DEL/DEACT from PTBA2 EM credit to PMCAT' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_7"]'))).click();
            break;
        case 'Pay-out to Customer Post DEL/DEACT from PTBA3 EM credit to PMCAT' :
            await driver.wait(until.elementLocated(By.css('[data-testid="transaction_type_8"]'))).click();
            break;
        default: throw new Error('Invalid Transaction type');
        }
    }
});



Then("I should see the paymaart id prefix as {string}", async function(paymaartIdPrefix){
    let paymaartIdTypeLabel = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id_type"]'))).getText();
    assert.equal(paymaartIdPrefix, paymaartIdTypeLabel)
});

When("I enter invalid beneficiary paymaart id as {string}", async function(invalid_id) {
    let paymaartIdField = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id_field"]')));
    await paymaartIdField.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await paymaartIdField.sendKeys(invalid_id)
});

When("I enter valid beneficiary paymaart id as {string}", async function(invalid_id) {
    let paymaartIdField = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id_field"]')));
    await paymaartIdField.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await paymaartIdField.sendKeys(invalid_id)
});