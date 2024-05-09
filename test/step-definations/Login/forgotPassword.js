/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When, Before } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { requestResetPassword } = require('../../bdd_api/index.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Before('@request_reset_password', async function () {
    try {
        const payload = {
            email_address: 'bharath.shet+admin@7edge.com'
        };
        const response = await requestResetPassword(payload);
        global.reset_password_link = response.token;
    } catch (err) {
        console.log('API Error', err);
    }
});

Given('I click on forgot password', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 2500));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="forgot_password_link"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I enter the email address as {string}', async function (email_address) {
    await new Promise(resolve => setTimeout(resolve, 1750));
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email_address);
});

When('I click on go back to login screen', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="back_to_login"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
});

When('I open a reset password link', async function () {
    await driver.get(`http://localhost:3000/set-new-password?token=${global.reset_password_link}`);
});

When('I reopen the reset password link', async function () {
    await driver.get(`http://localhost:3000/set-new-password?token=${global.reset_password_link}`);
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
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="new_confirm_password"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);

    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="new_password"]'))).sendKeys(new_password);
    await driver.wait(until.elementLocated(By.css('[data-testid="new_confirm_password"]'))).sendKeys(confirm_new_password);
});

When('I submit the forgot password form', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
});

When('I click on proceed button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="proceed_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});
