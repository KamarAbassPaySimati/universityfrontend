/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { until, By, Key } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../Driver');
const { faker } = require('@faker-js/faker');

Before(async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
});

Given('I navigate to merchant onboarding screen', async function () {
    // Write code here that turns the phrase above into concrete action
    await driver.get('http://localhost:3000/users/merchants/register-merchant');
});

When('I enter the first name as {string} for merchant registration', async function (first_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (first_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);
    }
});

When('I enter the middle name as {string} for merchant registration', async function (middle_name) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (middle_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
    }
});

When('I enter the last name as {string} for merchant registration', async function (last_name) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (last_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
    }
});

When('I enter the email address as {string} for merchant registration', async function (email_address) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (email_address !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email_address);
    }
});

When('I enter the phone number as {string} for merchant registration', async function (phone_number) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="change_code"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (phone_number !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phone_number);
    }
});

When('I submit the merchant registration form', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I enter a valid email address for merchant registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const random_number = faker.string.alphanumeric(5);
    const email = `bharath.shet+${random_number}@7edge.com`;
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email);
});

When('I enter a valid phone number for merchant registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    let phone_number = `${faker.phone.number('#########')}`;
    if (phone_number.startsWith('0')) {
        // Replace the first character with '9'
        phone_number = '9' + phone_number.substring(1);
    }
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phone_number);
});

When('I enter a valid first name for merchant registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const first_name = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);
});

When('I enter a valid middle name for merchant registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const middle_name = faker.person.middleName();
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
});

When('I enter a valid last name for merchant registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const last_name = faker.person.lastName();
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
});

Then('I should read a message stating merchant registration successfully', async function () {
    // Write code here that turns the phrase above into concrete actions
    const expected_text = 'Registration is a vital step in realising our vision of universal e-payments. Thank you for joining us on this transformative journey. Please now complete online KYC registration to start';

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="registration_success_message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(expected_text, element_text);
});
