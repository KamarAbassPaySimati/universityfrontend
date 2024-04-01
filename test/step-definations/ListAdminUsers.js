const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('./Driver.js');

Given('I navigate to admin users listing screen', async function () {
    await driver.get('http://localhost:3000/users/admins/?page=1');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I search for particular admin as {string}', async function (searchTerm) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.findElement(By.css('[data-testid="search"]')).sendKeys(searchTerm);
    await driver.findElement(By.css('[data-testid="search"]')).sendKeys(Key.ENTER);
});

Then('I should see the admin user sorted in descending order based on {string}', async function (sortBy) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    let items;
    let itemTexts;
    let sortedItemTexts;
    switch (sortBy) {
    case 'Admin Name':
        // Write code here that turns the phrase above into concrete actions
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="admin_name"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort().reverse();
        assert.deepStrictEqual(itemTexts, sortedItemTexts, 'Items are not sorted in descending order');
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    default:
        break;
    }
});

Then('I should see the admin user sorted in ascending order based on {string}', async function (sortBy) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    let items;
    let itemTexts;
    let sortedItemTexts;
    switch (sortBy) {
    case 'Admin Name':
        // Write code here that turns the phrase above into concrete actions
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="admin_name"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort();
        assert.deepStrictEqual(itemTexts, sortedItemTexts, 'Items are not sorted in ascending order');
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    default:
        break;
    }
});

Then('I should see list of admin users where status is {string}', async function (string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="status"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();

    sortedItemTexts.map(data => {
        return assert(data, string);
    });
});

Given('I select filter by admin role as {string}', async function (role) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css(`[data-testid='filter-modal'] [for='${role}']`))).click();
});
