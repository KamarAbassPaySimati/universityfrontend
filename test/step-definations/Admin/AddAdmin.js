/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When, Before } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { faker } = require('@faker-js/faker');
const { createAdminAccountSecure } = require('../../bdd_api/index.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Before('@create_new_admin_account', async function () {
    try {
        const random_alpha = faker.string.alpha(10);
        const first_name = faker.person.firstName();
        const middle_name = faker.person.middleName();
        const last_name = faker.person.lastName();
        const full_name = `${first_name} ${middle_name} ${last_name.toUpperCase()}`;
        const email = `bharath.shet+${random_alpha}@7edge.com`;
        let phone_number = `${faker.phone.number('## ### ####')}`;
        const countryCode = '+265';
        if (phone_number.startsWith('0')) {
            // Replace the first character with '9'
            phone_number = '9' + phone_number.substring(1);
        }
        const main_phone_number = `${countryCode} ${phone_number}`;

        const payload = {
            first_name,
            middle_name,
            last_name,
            country_code: '+265',
            email: email.toLowerCase(),
            role: 'Super admin',
            phone_number: phone_number.replaceAll(' ', '')
        };

        global.admin_user = {
            email_address: email.toLowerCase(),
            first_name,
            username: email.toLowerCase(),
            middle_name,
            last_name,
            role: 'Super Admin',
            phone_number: main_phone_number,
            full_name,
            phone_number_without_country_code: phone_number
        };
        await createAdminAccountSecure(payload);
        await new Promise(resolve => setTimeout(resolve, 4000));
    } catch (error) {
        console.log('API Error', error);
    }
});

Given('I navigate to onboard admin user', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/users/admins/register-admin');
});

When('I enter first name as {string} for admin onboarding', async function (first_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (first_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);
    }
});
When('I enter middle name as {string} for admin onboarding', async function (middle_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (middle_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
    }
});

When('I enter last name as {string} for admin onboarding', async function (last_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (last_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
    }
});

When('I enter email address as {string} for admin onboarding', async function (email_address) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (email_address !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email_address);
    }
});

When('I enter phone number as {string} for admin onboarding', async function (phone_number) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
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
        await driver.wait(until.elementLocated(By.css('[data-testid="super_admin"]'))).click();
        break;
    case 'Finance admin':
        await driver.wait(until.elementLocated(By.css('[data-testid="finance_admin"]'))).click();
        break;
    case 'Admin':
        await driver.wait(until.elementLocated(By.css('[data-testid="admin"]'))).click();
        break;
    case 'Support admin':
        await driver.wait(until.elementLocated(By.css('[data-testid="support_admin"]'))).click();
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
    await element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

When('I enter valid basic details for admin onboarding', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const first_name = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);

    const middle_name = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);

    const last_name = faker.person.lastName();
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
});

When('I enter valid email address for admin onboarding', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]')));
    await driver.wait(until.elementIsVisible(element));

    const random_number = faker.string.alpha(10);
    const email = `bharath.shet+${random_number}@7edge.com`;
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email);
});

When('I enter valid phone number for admin onboarding', async function () {
    // Write code here that turns the phrase above into concrete actions
    let phone_number = faker.phone.number('#########');

    // Check if the phone number starts with '0'
    if (phone_number.startsWith('0')) {
        // Replace the first character with '9'
        phone_number = '9' + phone_number.substring(1);
    }

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(phone_number);
});

When('I enter already existing {string}', async function (field) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]')));
    await driver.wait(until.elementIsVisible(element));

    let random_number;
    let email;
    switch (field) {
    case 'Email':
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.admin_user.email_address);

        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(faker.phone.number('+265#######'));
        break;
    case 'Phone Number':
        random_number = faker.string.alphanumeric(5);
        email = `bharath.shet+${random_number}@7edge.com`;
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(email);

        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
        await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).sendKeys(global.admin_user.phone_number_without_country_code.replaceAll(' ', ''));
        break;
    default:
        break;
    }
});
