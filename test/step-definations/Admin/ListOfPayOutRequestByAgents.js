const { Given, When } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { Key } = require('selenium-webdriver');
const { getModifierKey } = require('../../bdd_modules/index.js');

Given('I navigate to agent pay-out request listing screen', async function () {
    await driver.get('http://localhost:3000/transactions/pay-out-requests?page=1&type=agents');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I search for particular customer as {string}', async function (searchTerm) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys(searchTerm);
    await new Promise(resolve => setTimeout(resolve, 500));
});
