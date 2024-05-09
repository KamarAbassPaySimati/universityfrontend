/* eslint-disable max-len */
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');

When('I click on approve {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    switch (type) {
    case 'Agent KYC':
    case 'Customer KYC':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="approve_button"]')));
        await driver.wait(until.elementIsVisible(element));
        await element.click();
        break;
    default:
        element = await driver.wait(until.elementLocated(By.css('[data-testid="approve_button"]')));
        await driver.wait(until.elementIsVisible(element));
        await element.click();
        break;
    }
});

Then('I should see a confirmation prompt for approving {string}', async function (type) {
    let element;
    let modalBody;
    switch (type) {
    case 'Agent KYC':
    case 'Customer KYC':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, 'This will allow Agent to gain access to Paymaart');
        break;
    default:
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, 'This will allow Agent to gain access to Paymaart');
        break;
    }
});

When('I click on reject {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    switch (type) {
    case 'Agent KYC':
    case 'Customer KYC':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="reject_button"]')));
        await driver.wait(until.elementIsVisible(element));
        await element.click();
        break;
    default:
        element = await driver.wait(until.elementLocated(By.css('[data-testid="reject_button"]')));
        await driver.wait(until.elementIsVisible(element));
        await element.click();
        break;
    }
});

Then('I should see a confirmation prompt for reject {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    let modalBody;
    switch (type) {
    case 'Agent KYC':
    case 'Customer KYC':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, 'Select the reason for rejection');
        break;
    default:
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, 'Select the reason for rejection');
        break;
    }
});
