/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber')
const assert = require('assert')
const until = require('selenium-webdriver').until
const By = require('selenium-webdriver').By
const { driver } = require('./Driver.js')

When('I navigate to my profile page', async function () {
    // Write code to navigate to the profile page
    // This might involve clicking on a navigation link or button
    await driver.get('https://localhost:3000/my-profile')
})

Then('I should see my profile card information', async function () {
    // Write code to verify that the profile card information is visible
    // This might involve checking the visibility of specific elements on the page
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"]')))
    await driver.wait(until.elementIsVisible(element))
})

Then('I should see my name as {string}', async function (expected_name) {
    // Write code to verify that the name displayed matches the expected value
    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="name"]'))).getText()
    assert.equal(actual_name, expected_name)
})

Then('I should see my email address as {string}', async function (expected_email) {
    // Write code to verify that the name displayed matches the expected value
    const actual_email = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="email_address"]'))).getText()
    assert.equal(actual_email, expected_email)
})

Then('I should see my role as {string}', async function (expected_role) {
    // Write code to verify that the name displayed matches the expected value
    const actual_role = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="role"]'))).getText()
    assert.equal(actual_role, expected_role)
})

Then('I should see my phone number as {string}', async function (expected_phone_number) {
    // Write code to verify that the name displayed matches the expected value
    const actual_phone_number = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="phone_number"]'))).getText()
    assert.equal(actual_phone_number, expected_phone_number)
})

Then('I should see the option to update my password', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="profile_info_card"] [data-testid="update_password"]')))
    await driver.wait(until.elementIsVisible(element))
})
