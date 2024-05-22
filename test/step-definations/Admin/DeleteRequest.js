const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Given('I navigate to agent delete request listing screen', async function () {
    await driver.get('http://localhost:3000/verify/delete-account-requests?page_number=1&type=agents');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I select filter the delete request as {string}', async function (request) {
    // Write code here that turns the phrase above into concrete actions
    switch (request) {
    case 'Pending':
        await driver.wait(until.elementLocated(By.css('[data-testid=\'filter-modal\'] [for=\'pending\']'))).click();
        break;
    default:
        break;
    }
});

Then('I should see list of delete request where status is {string}', async function (string) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="status"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert.equal(data, string);
    });
});
