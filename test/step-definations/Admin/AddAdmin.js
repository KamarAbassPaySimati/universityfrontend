/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When } = require('@cucumber/cucumber');
const webdriver = require('selenium-webdriver');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const Keys = webdriver.Key;
const { driver } = require('../Driver.js');
const { faker } = require('@faker-js/faker');

Given('I navigate to onboard admin user', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/users/admins/register-admin');
});

When('I enter first name as {string} for admin onboarding', async function (first_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    if (first_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);
    }
});
When('I enter middle name as {string} for admin onboarding', async function (middle_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    if (middle_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
    }
});

When('I enter last name as {string} for admin onboarding', async function (last_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    if (last_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
    }
});

When('I enter email address as {string} for admin onboarding', async function (email_address) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    if (email_address !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email_address);
    }
});

When('I enter phone number as {string} for admin onboarding', async function (phone_number) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    if (phone_number !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phone_number);
    }
});

When('I select the role as {string}', async function (role) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="role"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="role"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    switch (role) {
    case 'Super admin':
        await driver.wait(until.elementLocated(By.css('[data-testid="role_0"]'))).click();
        break;
    case 'Finance admin':
        await driver.wait(until.elementLocated(By.css('[data-testid="role_1"]'))).click();
        break;
    case 'Admin':
        await driver.wait(until.elementLocated(By.css('[data-testid="role_2"]'))).click();
        break;
    case 'Support admin':
        await driver.wait(until.elementLocated(By.css('[data-testid="role_3"]'))).click();
        break;
    default:
        break;
    }
});

When('I submit the onboard admin form', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 2000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I enter valid basic details for admin onboarding', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const firstName = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(firstName);

    const middleName = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middleName);

    const lastName = faker.person.lastName();
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(lastName);
});

When('I enter valid email address for admin onboarding', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]')));
    await driver.wait(until.elementIsVisible(element));

    const random_number = faker.string.alpha(10);
    const email = `bharath.shet+${random_number}@7edge.com`;
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email);
});

When('I enter valid phone number for admin onboarding', async function () {
    // Write code here that turns the phrase above into concrete actions
    let phoneNumber = faker.phone.number('#########');

    // Check if the phone number starts with '0'
    if (phoneNumber.startsWith('0')) {
        // Replace the first character with '9'
        phoneNumber = '9' + phoneNumber.substring(1);
    }

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phoneNumber);
});

When('I enter already existing {string}', async function (field) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]')));
    await driver.wait(until.elementIsVisible(element));

    let random_number;
    let email;
    switch (field) {
    case 'Email':
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.adminUser.email_address);

        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(faker.phone.number('+265#######'));
        break;
    case 'Phone Number':
        random_number = faker.string.alphanumeric(5);
        email = `bharath.shet+${random_number}@7edge.com`;
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email);

        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Keys.chord(Keys.CONTROL, 'a'), Keys.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(global.adminUser.phone_number_without_country_code.replaceAll(' ', ''));
        break;
    default:
        break;
    }
});
