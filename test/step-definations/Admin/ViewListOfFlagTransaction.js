const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Given('I am on the flagged transaction page', async function(){
    await driver.get('http://localhost:3000/transactions/flagged');
});

When('I search for an invalid flagged {string}', async function(id){
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys(id);
    await new Promise(resolve => setTimeout(resolve, 500));

});
Given('I select filter by flagged reason as {string}', async function (reason) {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css(`[data-testid='filter-modal'] [for='${reason}']`))).click();
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I click on apply button', async function(){
    await driver.wait(until.elementLocated(By.css('[data-testid="apply-filter"]'))).click();
});

Then('I should see list of flagged transaction of reason {string}', async function (reason) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="flaggedReason"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert.equal(data, reason);
    });
});

When('I search for an valid flagged paymaart id', async function(){
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys("74865444"); // valid flagged transaction/paymaart id
    await new Promise(resolve => setTimeout(resolve, 500));
});

When('I click on view most recent for flagged transaction',async function(){
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.transaction_id = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_id"]'))).getText();
    this.flagged_by = await driver.wait(until.elementLocated(By.css('[data-testid="flagged_by"]'))).getText();
    this.flagged_reason = await driver.wait(until.elementLocated(By.css('[data-testid="flagged_reason"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});

Then("I should see the transaction recipt of flagged transaction", async function(){
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('this', this.paymaart_id, this.name);
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_transaction_id = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="transactionId"]'))).getText();
    assert.equal(actual_transaction_id, this.transaction_id);

    const actual_flagged_by = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="flaggedBy"]'))).getText();
    assert.equal(actual_flagged_by, this.flagged_by);

    const actual_flagged_reason = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="flaggedReasons"]'))).getText();
    assert.equal(actual_flagged_reason, this.flagged_reason);

    const actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"] [data-testid="status"]'))).getText();
    assert.equal(actual_status, this.status);
});

When("I click on approve button", async function(){
    await driver.wait(until.elementLocated(By.css('[data-testid="approveButton"]'))).click();
});
When("I click on reject button", async function(){
    await driver.wait(until.elementLocated(By.css('[data-testid="rejectButton"]'))).click();
});