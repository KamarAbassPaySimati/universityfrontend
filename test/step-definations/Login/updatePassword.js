/* eslint-disable max-len */
/* eslint-disable camelcase */
const assert = require('assert');
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Before('@wait_for_few_time', async function () {
    await new Promise(resolve => setTimeout(resolve, 3500));
});
Given('I navigate to update password page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/profile/update-password');
});

When('I enter current password as {string}', async function (current_password) {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="current_password"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);

    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="current_password"]'))).sendKeys(current_password);
});

When('I enter new password as {string} and confirm password as {string}', async function (new_password, confirm_new_password) {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="new_confirm_password"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);

    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]'))).sendKeys(new_password);
    await driver.wait(until.elementLocated(By.css('[data-testid="new_confirm_password"]'))).sendKeys(confirm_new_password);
});

When('I submit the update password form', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
});

Then('I should see update password button as disabled', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await this.driver.wait(until.elementIsDisabled(element), 1000);

    // Check if the element is enabled
    const isEnabled = await element.isEnabled();
    assert(false, isEnabled);
});
