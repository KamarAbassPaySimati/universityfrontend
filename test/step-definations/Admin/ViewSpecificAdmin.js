/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const { driver } = require('../Driver.js');

Given('I am viewing the admin user profile', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get(`http://localhost:3000/admins/view-admin/${global.create_admin_response.data._id}`);
});

Then('I should view my paymaart ID and name', async function () {
    // Write code here that turns the phrase above into concrete actions
    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="name"]'))).getText();
    assert.equal(actual_name, global.admin_user.full_name);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    assert.notEqual(actual_paymaart_ID, '');
});

Then('I should view basic details', async function () {
    // Write code here that turns the phrase above into concrete actions

    const actual_phone_number = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="Phone Number"]'))).getText();
    assert.equal(actual_phone_number, global.admin_user.phone_number);

    const actual_role = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="Role"]'))).getText();
    assert.equal(actual_role, global.admin_user.role);

    const actual_email = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="Email"]'))).getText();
    assert.equal(actual_email, global.admin_user.email_address);
});

Given('I view a non-existing admin user profile', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/admins/view-admin/1232179e8yuiqwuey218');
});

Then('I should be redirected back to admin user listing', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.urlContains('users/admins?page=1'));
});
