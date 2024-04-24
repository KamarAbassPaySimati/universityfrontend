/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../Driver.js');
const { faker } = require('@faker-js/faker');
const path = require('path');
const { getModifierKey } = require('../../bdd_modules/index.js');

Given('I navigate to customer onboarding screen', async function () {
    // Write code here that turns the phrase above into concrete action
    await driver.get('http://localhost:3000/users/customers/register-customer');
});

When('I enter the first name as {string} for customer registration', async function (first_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (first_name !== '') {
        await element.sendKeys(first_name);
    }
});

When('I enter the middle name as {string} for customer registration', async function (middle_name) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (middle_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
    }
});

When('I enter the last name as {string} for customer registration', async function (last_name) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (last_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
    }
});

When('I enter the email address as {string} for customer registration', async function (email_address) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (email_address !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email_address);
    }
});

When('I enter the phone number as {string} for customer registration', async function (phone_number) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="change_code"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (phone_number !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phone_number);
    }
});

When('I submit the customer registration form', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I enter a valid email address for customer registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const random_number = faker.string.alphanumeric(5);
    const email = `bharath.shet+${random_number}@7edge.com`;
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email);
});

When('I enter a valid phone number for customer registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    let phone_number = `${faker.phone.number('#########')}`;
    if (phone_number.startsWith('0')) {
        // Replace the first character with '9'
        phone_number = '9' + phone_number.substring(1);
    }
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phone_number);
});

When('I enter a valid first name for customer registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const first_name = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);
});

When('I enter a valid middle name for customer registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const middle_name = faker.person.middleName();
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
});

When('I enter a valid last name for customer registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const last_name = faker.person.lastName();
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
});

Then('I should read a message stating customer registration successfully', async function () {
    // Write code here that turns the phrase above into concrete actions
    const expected_text = 'Registration is a vital step in realising our vision of universal e-payments. Thank you for joining us on this transformative journey. Please now complete online KYC registration to start';

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="registration_success_message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(expected_text, element_text);
});

When('I upload the customer profile picture as {string}', async function (photo) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (photo !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="profile_image"]')));
        const filePath = path.join(__dirname, `../../support/${photo}`);
        await element.sendKeys(filePath);
    }
});
