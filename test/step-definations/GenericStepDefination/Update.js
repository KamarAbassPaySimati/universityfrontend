/* eslint-disable max-len */
const { When } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../Driver.js');

When('I click on update {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    switch (type) {
    case 'Admin user':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="update_button"]')));
        await driver.wait(until.elementIsVisible(element));
        this.record_status = await element.getText();
        await element.click();
        break;
    default:
        break;
    }
});

When('I should see the update {string} button is hidden', async function (type) {
    let element;
    switch (type) {
    case 'Admin user':
        await new Promise(resolve => setTimeout(resolve, 5000));
        element = await driver.executeScript('return document.querySelector("[data-testid=\'update_button\']")');
        if (element == null || element === undefined) {
            return 'passed';
        } else {
            throw new Error('View button is not hidden');
        }
    default:
        break;
    }
});
