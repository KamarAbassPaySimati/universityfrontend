/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

When('I click on view delete request', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="agent_name"]'))).getText();
    this.phoneNumber = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});
