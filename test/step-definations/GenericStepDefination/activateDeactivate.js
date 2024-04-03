/* eslint-disable max-len */
const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../Driver.js');
const assert = require('assert');

Given('I click on deactivate {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    switch (type) {
    case 'Admin user':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]')));
        await driver.wait(until.elementIsVisible(element));
        this.record_status = await element.getText();
        await element.click();
        break;
    default:
        break;
    }
});

Then('I should see a confirmation prompt for deactivating {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    let modalBody;
    switch (type) {
    case 'Admin user':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, "This action will temporarily suspend the admin user's account.");
        break;
    default:
        break;
    }
});

When('I click on activate {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    switch (type) {
    case 'Admin user':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]')));
        await driver.wait(until.elementIsVisible(element));
        this.record_status = await element.getText();
        await element.click();
        break;
    default:
        break;
    }
});

Then('I should see a confirmation prompt for activate {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    let modalBody;
    switch (type) {
    case 'Admin user':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, "This action will activate the admin user's account.");
        break;
    default:
        break;
    }
});

Then('The admin user record must remain in the system with its previous status', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]')));
    await driver.wait(until.elementIsVisible(element));
    const actualStatus = await element.getText();
    assert.equal(this.record_status, actualStatus);
});

Then('I should see the deactivate {string} button is hidden', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    switch (type) {
    case 'Admin user':
        await new Promise(resolve => setTimeout(resolve, 5000));
        element = await driver.executeScript('return document.querySelector("[data-testid=\'activate_deactivate_button\']")');
        if (element == null || element === undefined) {
            return 'passed';
        } else {
            throw new Error('View button is not hidden');
        }
    default:
        break;
    }
});
