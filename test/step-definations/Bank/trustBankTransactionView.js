/* eslint-disable max-len */
const { When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');
const { getModifierKey } = require('../../bdd_modules/index.js');

When('I click on view button for bank details', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

// clear_filter
Then('I click on the apply filter button', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="apply_filter"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I should see prefilled fields for bank details', async function () {
    const refNo = await driver.wait(until.elementLocated(By.css('[data-testid="Ref No."]'))).getText();
    const Name = await driver.wait(until.elementLocated(By.css('[data-testid="Name"]'))).getText();
    const accountNumber = await driver.wait(until.elementLocated(By.css('[data-testid="Account Number"]'))).getText();
    const purpose = await driver.wait(until.elementLocated(By.css('[data-testid="Purpose"]'))).getText();
    const lastUpdateDate = await driver.wait(until.elementLocated(By.css('[data-testid="Last Update Date / Time"]'))).getText();
    const balance = await driver.wait(until.elementLocated(By.css('[data-testid="Balance"]'))).getText();

    await assert.notEqual(refNo, '-');
    await assert.notEqual(Name, '-');
    // await assert.notEqual(accountNumber, '-');
    await assert.notEqual(purpose, '-');
    await assert.notEqual(lastUpdateDate, '-');
    await assert.notEqual(balance, '-');

    await assert.notEqual(refNo, '');
    await assert.notEqual(Name, '');
    await assert.notEqual(accountNumber, '');
    await assert.notEqual(purpose, '');
    await assert.notEqual(lastUpdateDate, '');
    await assert.notEqual(balance, '');
});
Then('I should see prefilled fields for bank details for transaction', async function () {
    const refNo = await driver.wait(until.elementLocated(By.css('[data-testid="Ref No."]'))).getText();
    const Name = await driver.wait(until.elementLocated(By.css('[data-testid="Name"]'))).getText();
    const purpose = await driver.wait(until.elementLocated(By.css('[data-testid="Purpose"]'))).getText();
    const lastUpdateDate = await driver.wait(until.elementLocated(By.css('[data-testid="Last Update Date / Time"]'))).getText();
    const balance = await driver.wait(until.elementLocated(By.css('[data-testid="Balance"]'))).getText();

    await assert.notEqual(refNo, '-');
    await assert.notEqual(Name, '-');
    await assert.notEqual(purpose, '-');
    await assert.notEqual(lastUpdateDate, '-');
    await assert.notEqual(balance, '-');

    await assert.notEqual(refNo, '');
    await assert.notEqual(Name, '');
    await assert.notEqual(purpose, '');
    await assert.notEqual(lastUpdateDate, '');
    await assert.notEqual(balance, '');
});

Then('I should be navigated to bank details page', async function () {
    await driver.get('http://localhost:3000/paymartbanks/bankdetails');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

Then('I select start date as {string}', async function (start) {
    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="start_date"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="start_date"]'))).sendKeys(Key.chord(start, Key.ENTER));
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I select end date as {string}', async function (end) {
    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="end_date"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="end_date"]'))).sendKeys(Key.chord(end, Key.ENTER));
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I should see list of transactions where between {string} and {string}', async function (start, end) {
    const filterAppliedStartDate = new Date(start).getTime();
    const filterAppliedEndDate = new Date(end).getTime();

    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="dateRow"]'))); // replace with the table date row
    const itemtexts = await Promise.all(items.map(async (item) => {
        const a = await item.getText();
        return new Date(a.split(',')[0]).getTime();
    }));

    itemtexts.forEach(data => {
        assert.ok(data >= filterAppliedStartDate && data <= filterAppliedEndDate);
    });
});
