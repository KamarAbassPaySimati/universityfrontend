const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

When('I click on the view button for first transaction in list', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="transaction_view"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I should be redirected to transaction details page', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="header-text"]')));
    await driver.wait(until.elementIsVisible(element));
});
