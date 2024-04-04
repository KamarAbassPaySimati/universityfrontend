/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../Driver.js');
const { faker } = require('@faker-js/faker');

When('I enter first name as {string} for update admin user', async function (first_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (first_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);
    }
});
When('I enter middle name as {string} for update admin user', async function (middle_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (middle_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);
    }
});

When('I enter last name as {string} for update admin user', async function (last_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (last_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
    }
});

When('I submit the update admin form', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 2000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
    await new Promise(resolve => setTimeout(resolve, 100));
});

Then('I should be be navigated to update admin user', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="update_button"]')));
    await driver.wait(until.elementIsVisible(element));
});

Then('I should see update email address and phone number fields to be disabled', async function () {
    // Write code here that turns the phrase above into concrete actions
    const email = await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]')));
    await driver.wait(until.elementIsVisible(email));

    const phone = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]')));
    await driver.wait(until.elementIsVisible(phone));

    await driver.wait(until.elementIsDisabled(email));
    await driver.wait(until.elementIsDisabled(phone));
});

When('I enter valid firstname, middle name, last name for update admin user', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(element));

    const first_name = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]'))).sendKeys(first_name);

    const middle_name = faker.person.firstName();
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]'))).sendKeys(middle_name);

    const last_name = faker.person.lastName();
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]'))).sendKeys(last_name);
});
