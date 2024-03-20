/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const { driver } = require('./Driver.js');

When('I navigate to my profile page', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.get('http://localhost:3000/profile');
    await new Promise(resolve => setTimeout(resolve, 2000));
});

Then('I should see my profile card information', async function () {
    // Write code to verify that the profile card information is visible
    // This might involve checking the visibility of specific elements on the page
    await new Promise(resolve => setTimeout(resolve, 2000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"]')));
    await driver.wait(until.elementIsVisible(element));
});

Then('I should see my name', async function () {
    // Write code to verify that the name displayed matches the expected value
    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="name"]'))).getText();
    assert.equal(actual_name, global.adminUser.fullName);
});

Then('I should see my email address', async function () {
    // Write code to verify that the name displayed matches the expected value
    const actual_email = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="Email"]'))).getText();
    assert.equal(actual_email, global.adminUser.email_address);
});

Then('I should see my role', async function () {
    // Write code to verify that the name displayed matches the expected value
    const actual_role = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="Role"]'))).getText();
    assert.equal(actual_role, global.adminUser.role);
});

Then('I should see my phone number', async function () {
    // Write code to verify that the name displayed matches the expected value
    const actual_phone_number = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="Phone Number"]'))).getText();
    assert.equal(actual_phone_number, global.adminUser.phone_number);
});

Then('I should see my paymaart ID', async function () {
    // Write code to verify that the name displayed matches the expected value
    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, global.adminUser.paymaart_id);
});

Then('I should see the option to update my password', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="update_password"]')));
    await driver.wait(until.elementIsVisible(element));
});
