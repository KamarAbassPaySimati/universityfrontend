/* eslint-disable max-len */
const { When } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

When('I click on flag transaction button', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_button"]'))).click();
});

When('I select the reason for flag transaction as {string}', async function (reason) {
    switch (reason) {
    case 'Transaction & System Failures':await driver.wait(until.elementLocated(By.xpath('//*[text()="Transaction & System Failures"]'))).click();
        break;
    case 'Policy Clarity & Customer Support': await driver.wait(until.elementLocated(By.xpath('//*[text()="Policy Clarity & Customer Support"]'))).click();
        break;
    case 'Service Quality & Marketing Accuracy': driver.wait(until.elementLocated(By.xpath('//*[text()="Service Quality & Marketing Accuracy"]'))).click();
        break;
    case 'User Experience Challenges': driver.wait(until.elementLocated(By.xpath('//*[text()="User Experience Challenges"]'))).click();
        break;
    default: throw new Error('Invalid flag transaction reason');
    }
});
