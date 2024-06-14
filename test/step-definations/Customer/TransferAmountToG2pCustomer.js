/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../1_Driver.js');

When('I click on transfer amount button', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction-0"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I click on confirm button for transfer', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="confirm_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should see a confirmation prompt to execute payment', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
    await driver.wait(until.elementIsVisible(element));

    const modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
    assert.equal(modalBody, 'This will complete settlement of G2P request.');
});

When('I should read a message stating {string} for transfer', async function (message) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="success-message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();
    assert.equal(element_text, message);
});
