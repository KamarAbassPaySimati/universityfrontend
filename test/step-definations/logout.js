/* eslint-disable camelcase */
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const { driver } = require('./Driver.js');

Before('@perform_logout', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.executeScript('window.localStorage.clear();');
    await driver.executeScript('window.location.reload();');
    await new Promise(resolve => setTimeout(resolve, 2000));
});

Given('I am logged into the application', async function () {
    await driver.wait(until.urlIs('http://localhost:3000/dashboard'));
});

When('I click on logout', async function () {
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="logout"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I click on cancel', async function () {
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="cancel_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I click on confirm logout', async function () {
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="confirm_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});
Then('I should see a confirmation prompt for logout', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
    await driver.wait(until.elementIsVisible(element));

    const modal_body = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]'))).getText();
    assert.equal(modal_body, 'Confirm to Logout?');
});

Then('I should be redirected to login', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//p[text()="Login"]')));
    await driver.wait(until.urlIs('http://localhost:3000'));
});

Then('I should not be logged out', async function () {
    await driver.navigate().refresh();
    await new Promise(resolve => setTimeout(resolve, 750));
    await driver.wait(until.urlIs('http://localhost:3000/dashboard'));
});
