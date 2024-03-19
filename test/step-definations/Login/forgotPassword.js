/* eslint-disable max-len */
/* eslint-disable camelcase */
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const webdriver = require('selenium-webdriver');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const Keys = webdriver.Key;
const { driver } = require('../Driver.js');

Given('I click on forgot password', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="forgot_password_link"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I enter the email address as {string}', async function (email_address) {
    await new Promise(resolve => setTimeout(resolve, 1750));
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email_address);
});

When('I click on go back to login screen', async function () {
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="back_to_login"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should be redirected to login', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//p[text()="Login"]')));
    await driver.wait(until.urlIs('http://localhost:3000'));
});

When('I open a reset password link', async function () {
    await driver.get(global.reset_password_link);
});
When('I reopen the reset password link', async function () {
    await driver.get(global.reset_password_link);
});

Given('I am in reset password page', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]')));
    await driver.wait(until.elementIsVisible(element));
});
Given('I should see option to enter my new password', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]')));
    await driver.wait(until.elementIsVisible(element));
});

When('I enter password as {string} and confirm password as {string}', async function (new_password, confirm_new_password) {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="new_confirm_password"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);

    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]'))).sendKeys(new_password);
    await driver.wait(until.elementLocated(By.css('[data-testid="new_confirm_password"]'))).sendKeys(confirm_new_password);
});

Then('I should forgot password submit button as disabled', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await this.driver.wait(until.elementIsDisabled(element), 1000);

    // Check if the element is enabled
    const isEnabled = await element.isEnabled();
    assert(false, isEnabled);
});

When('I submit the forgot password form', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsDisabled(element));
    element.click();

    // Check if the element is enabled
    const isEnabled = await element.isEnabled();
    assert(true, isEnabled);
});
