const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Given('I navigate to customer delete request listing screen', async function () {
    await driver.get('http://localhost:3000/verify/delete-account-requests?page_number=1&type=customers');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I click on view delete request of customer', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="name"]'))).getText();
    this.phoneNumber = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});