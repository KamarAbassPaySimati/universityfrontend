const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');

Given('I am in transactions log page', async function() {
    await driver.get('http://localhost:3000/transactions/transactions_log');
});

When('I click on pay in tab', async function(){
    await driver.wait(until.elementLocated(By.css('[data-testid="payinTab"]'))).click();
});

When('I click on pay out tab', async function(){
    await driver.wait(until.elementLocated(By.css('[data-testid="payoutTab"]'))).click();
});

When('I search for particular transaction logs as {string}', async function (searchTerm) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.findElement(By.css('[data-testid="search"]')).sendKeys(searchTerm);
    await driver.findElement(By.css('[data-testid="search"]')).sendKeys(Key.ENTER);
});

Then('I should see the transaction logs sorted in descending order based on {string}', async function (sortBy) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1500));
    let items;
    let itemTexts;
    let sortedItemTexts;
    switch (sortBy) {
    case 'Submission Date':
        // Write code here that turns the phrase above into concrete actions
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="submission_date"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort(customSortDateDesc);
        console.log('itemTexts', itemTexts);
        console.log('sortedItemTexts', sortedItemTexts);

        assert.deepStrictEqual(itemTexts, sortedItemTexts, 'Items are not sorted in descending order');
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    default:
        break;
    }
});

Then('I should see the transaction logs sorted in ascending order based on {string}', async function (sortBy) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    let items;
    let itemTexts;
    let sortedItemTexts;
    switch (sortBy) {
    case 'Submission Date':
        // Write code here that turns the phrase above into concrete actions
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="submission_date"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort(customSortDateAsc);
        console.log('itemTexts asc', itemTexts);
        console.log('sortedItemTexts asc', sortedItemTexts);
        assert.deepStrictEqual(itemTexts, sortedItemTexts, 'Items are not sorted in ascending order');
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    default:
        break;
    }
});