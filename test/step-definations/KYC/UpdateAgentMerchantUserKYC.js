/* eslint-disable camelcase */
const assert = require('assert');
const { Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

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
