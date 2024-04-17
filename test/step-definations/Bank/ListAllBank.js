/* eslint-disable max-len */
const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../Driver.js');

Given('I navigate to banks listing', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/paymaart-banks?type=trust-banks');
    await new Promise(resolve => setTimeout(resolve, 4000));
});
Given('I navigate to capital bank listing', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/paymaart-banks?type=main-capital');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

Then('I should view all the trust banks', async function () {
    // Write code here that turns the phrase above into concrete actions
    const trustBank1 = await driver.wait(until.elementLocated(By.css('[data-testid="Trust Banks"]')));
    const trustBank2 = await driver.wait(until.elementLocated(By.css('[data-testid="Main Capital"]')));
    const trustBank3 = await driver.wait(until.elementLocated(By.css('[data-testid="Suspense"]')));
    const trustBank4 = await driver.wait(until.elementLocated(By.css('[data-testid="Transaction fees & Commissions"]')));
    const trustBank5 = await driver.wait(until.elementLocated(By.css('[data-testid="Taxes"]')));

    await driver.wait(until.elementIsVisible(trustBank1));
    await driver.wait(until.elementIsVisible(trustBank2));
    await driver.wait(until.elementIsVisible(trustBank3));
    await driver.wait(until.elementIsVisible(trustBank4));
    await driver.wait(until.elementIsVisible(trustBank5));
});

When('I click on view bank overview', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-bank-overview"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should view a image viewer modal', async function () {
    // Write code here that turns the phrase above into concrete actions
    this.element = await driver.wait(until.elementLocated(By.css('[data-testid="overview-modal"]')));
    await driver.wait(until.elementIsVisible(this.element));
});

When('I click on close image viewer', async function () {
    // Write code here that turns the phrase above into concrete actions
    const closeButton = await driver.wait(until.elementLocated(By.css('[data-testid="close-button"]')));
    await driver.wait(until.elementIsVisible(closeButton));
    await closeButton.click();
});

Then('I should see the image viewer modal getting closed', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 5000));
    const overviewModal = await driver.executeScript('return document.querySelector("[data-testid=\'overview-modal\']")');
    if (overviewModal == null || overviewModal === undefined) {
        return 'passed';
    } else {
        throw new Error('Overview modal is not hidden');
    }
});
