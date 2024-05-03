/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../1_Driver.js');
const { faker } = require('@faker-js/faker');
const { getModifierKey } = require('../../bdd_modules/index.js');

Given('I navigate to agent onboarding screen', async function () {
    // Write code here that turns the phrase above into concrete action
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.get('http://localhost:3000/users/agents/register-agent');
});

When('I enter the first name as {string} for agent registration', async function (first_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (first_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);
    }
});

When('I enter the middle name as {string} for agent registration', async function (middle_name) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (middle_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
    }
});

When('I enter the last name as {string} for agent registration', async function (last_name) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (last_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
    }
});

When('I enter the email address as {string} for agent registration', async function (email_address) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (email_address !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email_address);
    }
});

When('I enter the phone number as {string} for agent registration', async function (phone_number) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="change_code"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (phone_number !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phone_number);
    }
});

When('I agree to the terms and conditions', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="terms_and_conditions"]'))).click();
});

When('I submit the agent registration form', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I answer the security question one as {string}', async function (security_question_1) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="security_question_1"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (security_question_1 !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="security_question_1"]'))).sendKeys(security_question_1);
    }
});

When('I answer the security question two as {string}', async function (security_question_2) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="security_question_2"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (security_question_2 !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="security_question_2"]'))).sendKeys(security_question_2);
    }
});

When('I answer the security question three as {string}', async function (security_question_3) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="security_question_3"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (security_question_3 !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="security_question_3"]'))).sendKeys(security_question_3);
    }
});

When('I answer the security question four as {string}', async function (security_question_4) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="security_question_4"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (security_question_4 !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="security_question_4"]'))).sendKeys(security_question_4);
    }
});

When('I click on verify email address', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 2000));

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_email_address"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I click on verify {string}', async function (field) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 3000));
    let element;
    if (field === 'email') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_email_address"]')));
    } else {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_phone_number"]')));
    }
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I enter a valid email address for agent registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const random_number = faker.string.alphanumeric(5);
    const email = `bharath.shet+${random_number}@7edge.com`;
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email);
});

When('I enter the valid OTP and verify', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 2000));
    const OTP_field = await driver.wait(until.elementLocated(By.css('[data-testid="otp"]')));
    await driver.wait(until.elementIsVisible(OTP_field));

    await new Promise(resolve => setTimeout(resolve, 1000));

    await driver.wait(until.elementLocated(By.css('[data-testid="otp"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="otp"]'))).sendKeys('355948');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_OTP"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should see the verify email address button text changed to {string}', async function (actual_text) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 6000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_email_address"]')));
    await driver.wait(until.elementIsVisible(element));
    const elementText = await element.getText();

    assert.equal(actual_text, elementText);
});

When('I click on verify phone number', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 2000));

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_phone_number"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I enter a valid phone number for agent registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    let phone_number = `${faker.phone.number('#########')}`;
    if (phone_number.startsWith('0')) {
        // Replace the first character with '9'
        phone_number = '9' + phone_number.substring(1);
    }
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phone_number);
});

When('I enter the OTP as {string}', async function (OTP) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));

    await driver.wait(until.elementLocated(By.css('[data-testid="otp"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="otp"]'))).sendKeys(OTP);
});

When('I click on verify OTP', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_OTP"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should see the verify phone number button text changed to {string}', async function (actual_text) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 6000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_phone_number"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(actual_text, element_text);
});

When('I enter a valid first name for agent registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const first_name = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);
});

When('I enter a valid middle name for agent registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const middle_name = faker.person.middleName();
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
});

When('I enter a valid last name for agent registration', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const last_name = faker.person.lastName();
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
});

Then('I should read a message stating registration successfully', async function () {
    // Write code here that turns the phrase above into concrete actions
    const expected_text = 'Registration is a vital step in realising our vision of universal e-payments. Thank you for joining us on this transformative journey. Please now complete online KYC registration to start';

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="registration_success_message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(expected_text, element_text);
});
