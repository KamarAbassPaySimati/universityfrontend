/* eslint-disable camelcase */
const { Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Then('I should be redirected to customer basic details screen', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});
