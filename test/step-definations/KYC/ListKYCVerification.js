const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../Driver.js');

Given('I navigate to agent KYC listing screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/kyc-verification?tab=agent');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I select filter by citizenship as {string}', async function (citizenship) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css(`[data-testid='filter-modal'] [for='${citizenship}']`))).click();
    await new Promise(resolve => setTimeout(resolve, 4000));
});

Then('I should see list of KYC where citizenship is {string}', async function (citizenship) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="kyc_type"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert.ok(data.startsWith(citizenship), `Expected '${data}' to start with ${citizenship}`);
    });
});

When('I select filter by KYC status as {string}', async function (status) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css(`[data-testid='filter-modal'] [for='${status}']`))).click();
    await new Promise(resolve => setTimeout(resolve, 4000));
});

Then('I should see list of KYC where status is {string}', async function (status) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="kyc_status"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert.equal(data, status);
    });
});
