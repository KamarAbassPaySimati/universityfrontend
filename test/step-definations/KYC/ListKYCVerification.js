/* eslint-disable max-len */
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../Driver.js');
const { customSortDateDesc, customSortDateAsc } = require('../../bdd_modules/index.js');

Given('I navigate to agent KYC listing screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/verify/kyc-registration?page=1&type=agents&citizen=all');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I select filter by citizenship as {string}', async function (citizenship) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css(`[data-testid='filter-modal'] [data-testid='${citizenship}']`))).click();
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
    let element;
    switch (status) {
    case 'Full KYC In Progress':
        element = await driver.wait(until.elementLocated(By.css("[data-testid='filter-modal'] [for='In-progress']")));
        await driver.wait(until.elementIsVisible(element));
        break;
    case 'Full KYC Completed':
        element = await driver.wait(until.elementLocated(By.css("[data-testid='filter-modal'] [for='Completed']")));
        await driver.wait(until.elementIsVisible(element));
        break;
    case 'Full KYC Further Information Required':
        element = await driver.wait(until.elementLocated(By.css("[data-testid='filter-modal'] [for='Further Information Required']")));
        await driver.wait(until.elementIsVisible(element));
        break;
    case 'Simplified KYC In Progress':
        element = await driver.wait(until.elementLocated(By.css("[data-testid='filter-modal'] [for='Simplifiedkyc_In-progress']")));
        await driver.wait(until.elementIsVisible(element));
        break;
    case 'Simplified KYC Completed':
        element = await driver.wait(until.elementLocated(By.css("[data-testid='filter-modal'] [for='Simplifiedkyc_Completed']")));
        await driver.wait(until.elementIsVisible(element));
        break;
    case 'Simplified KYC Further Information Required':
        element = await driver.wait(until.elementLocated(By.css("[data-testid='filter-modal'] [for='Simplifiedkyc_Further Information Required']")));
        await driver.wait(until.elementIsVisible(element));
        break;
    default:
        element = await driver.wait(until.elementLocated(By.css("[data-testid='filter-modal'] [for='In-progress']")));
        await driver.wait(until.elementIsVisible(element));
        break;
    }

    await element.click();
    await new Promise(resolve => setTimeout(resolve, 4000));
});

Then('I should see list of KYC where status is {string}', async function (status) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="status"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert.equal(data, status);
    });
});

Then('I should see the KYC sorted in descending order based on {string}', async function (sortBy) {
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

Then('I should see the KYC sorted in ascending order based on {string}', async function (sortBy) {
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
