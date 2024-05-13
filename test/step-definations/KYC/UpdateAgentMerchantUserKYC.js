/* eslint-disable camelcase */
const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Then('I should view a modal asking for the OTP', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="otp_modal"]')));
    await driver.wait(until.elementIsVisible(element));
});
When('I click on submit TOTP form', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_OTP"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should be redirected to agent basic details screen', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

Then('I should view first name, middle name, last name is disabled', async function () {
    const first_name = await driver.wait(until.elementLocated(By.css('[data-testid="first_name"]')));
    await driver.wait(until.elementIsVisible(first_name));

    const middle_name = await driver.wait(until.elementLocated(By.css('[data-testid="middle_name"]')));
    await driver.wait(until.elementIsVisible(middle_name));

    const last_name = await driver.wait(until.elementLocated(By.css('[data-testid="last_name"]')));
    await driver.wait(until.elementIsVisible(last_name));

    await driver.wait(until.elementIsDisabled(first_name));
    await driver.wait(until.elementIsDisabled(middle_name));
    await driver.wait(until.elementIsDisabled(last_name));

    const first_name_value = await first_name.getAttribute('value');
    const middle_name_value = await middle_name.getAttribute('value');
    const last_name_value = await last_name.getAttribute('value');

    assert.notEqual(first_name_value, '');
    assert.notEqual(middle_name_value, '');
    assert.notEqual(last_name_value, '');

    assert.notEqual(first_name_value, '-');
    assert.notEqual(middle_name_value, '-');
    assert.notEqual(last_name_value, '-');

    assert.notEqual(first_name_value, ' ');
    assert.notEqual(middle_name_value, ' ');
    assert.notEqual(last_name_value, ' ');
});

Then('I should view the street name, district, town are already prefilled', async function () {
    // Write code here that turns the phrase above into concrete actions
    const street_name = await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]')));
    await driver.wait(until.elementIsVisible(street_name));

    const town = await driver.wait(until.elementLocated(By.css('[data-testid="town_village_ta"]')));
    await driver.wait(until.elementIsVisible(town));

    const district = await driver.wait(until.elementLocated(By.css('[data-testid="district"]')));
    await driver.wait(until.elementIsVisible(district));

    const street_name_value = await street_name.getAttribute('value');
    const town_value = await town.getAttribute('value');
    const district_value = await district.getAttribute('value');

    assert.notEqual(street_name_value, '');
    assert.notEqual(town_value, '');
    assert.notEqual(district_value, '');

    assert.notEqual(street_name_value, '-');
    assert.notEqual(town_value, '-');
    assert.notEqual(district_value, '-');

    assert.notEqual(street_name_value, ' ');
    assert.notEqual(town_value, ' ');
    assert.notEqual(district_value, ' ');
});

When('I should view the occupation field prefilled', async function () {
    // Write code here that turns the phrase above into concrete actions
    const occupation_dropdown = await driver.wait(until.elementLocated(By.css('[data-testid="occupation_dropdown"]')));
    await driver.wait(until.elementIsVisible(occupation_dropdown));

    const occupation_field_value = await occupation_dropdown.getAttribute('value');
    assert.notEqual(occupation_field_value, '');
});

When('I should view the monthly income and withdrawal prefilled', async function () {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const monthlyIncome = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_income"]')));
    await driver.wait(until.elementIsVisible(monthlyIncome));
    const monthlyIncomeValue = await monthlyIncome.getAttribute('value');

    assert.notEqual(monthlyIncomeValue, '-');
    await new Promise(resolve => setTimeout(resolve, 100));

    const monthlyWithdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_withdrawal"]')));
    await driver.wait(until.elementIsVisible(monthlyWithdrawal));
    const monthlyWithdrawalValue = await monthlyIncome.getAttribute('value');
    assert.notEqual(monthlyWithdrawalValue, '-');
});

Then('I should be redirected to merchant basic details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

Then('I should view the trading street name, district, town are already prefilled', async function () {
    // Write code here that turns the phrase above into concrete actions
    const street_name = await driver.wait(until.elementLocated(By.css('[data-testid="trading_street_name"]')));
    await driver.wait(until.elementIsVisible(street_name));

    const town = await driver.wait(until.elementLocated(By.css('[data-testid="trading_town_village_ta"]')));
    await driver.wait(until.elementIsVisible(town));

    const district = await driver.wait(until.elementLocated(By.css('[data-testid="trading_district"]')));
    await driver.wait(until.elementIsVisible(district));

    const street_name_value = await street_name.getAttribute('value');
    const town_value = await town.getAttribute('value');
    const district_value = await district.getAttribute('value');

    assert.notEqual(street_name_value, '');
    assert.notEqual(town_value, '');
    assert.notEqual(district_value, '');

    assert.notEqual(street_name_value, '-');
    assert.notEqual(town_value, '-');
    assert.notEqual(district_value, '-');

    assert.notEqual(street_name_value, ' ');
    assert.notEqual(town_value, ' ');
    assert.notEqual(district_value, ' ');
});

Then('I should see the trading types selected', async function () {
    // Write code here that turns the phrase above into concrete actions
    const street_name = await driver.wait(until.elementLocated(By.css('[data-testid="trading_street_name"]')));
    await driver.wait(until.elementIsVisible(street_name));

    const town = await driver.wait(until.elementLocated(By.css('[data-testid="trading_town_village_ta"]')));
    await driver.wait(until.elementIsVisible(town));

    const district = await driver.wait(until.elementLocated(By.css('[data-testid="trading_district"]')));
    await driver.wait(until.elementIsVisible(district));

    const street_name_value = await street_name.getAttribute('value');
    const town_value = await town.getAttribute('value');
    const district_value = await district.getAttribute('value');

    assert.notEqual(street_name_value, '');
    assert.notEqual(town_value, '');
    assert.notEqual(district_value, '');

    assert.notEqual(street_name_value, '-');
    assert.notEqual(town_value, '-');
    assert.notEqual(district_value, '-');

    assert.notEqual(street_name_value, ' ');
    assert.notEqual(town_value, ' ');
    assert.notEqual(district_value, ' ');
});
