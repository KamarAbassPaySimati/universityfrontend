/* eslint-disable camelcase */
/* eslint-disable max-len */
const { When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');
const { getModifierKey } = require('../../bdd_modules/index.js');

When('I click on approve {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    switch (type) {
    case 'Agent KYC':
    case 'Customer KYC':
    case 'Merchant KYC':
    case 'Agent Delete Request':
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
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
    await driver.wait(until.elementIsVisible(element));

    const modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
    switch (type) {
    case 'Agent KYC':
        assert.equal(modalBody, 'This will allow Agent to gain access to Paymaart');
        break;
    case 'Customer KYC':
        assert.equal(modalBody, 'This will allow Customer to gain access to Paymaart');
        break;
    case 'Merchant KYC':
        assert.equal(modalBody, 'This will allow Merchant to gain access to Paymaart');
        break;
    case 'Agent Delete Request':
        assert.equal(modalBody, 'Reason for approval');
        break;
    default:
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
    case 'Merchant KYC':
    case 'Agent Delete Request':
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
    case 'Merchant KYC':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, 'Select the reason for rejection');
        break;
    case 'Agent Delete Request':
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, 'Reason for rejection');
        break;
    default:
        element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
        await driver.wait(until.elementIsVisible(element));

        modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
        assert.equal(modalBody, 'Select the reason for rejection');
        break;
    }
});

When('I enter the reason for rejecting as {string}', async function (reason) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="reason"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(reason);
});

When('I enter the reason for approving as {string}', async function (reason) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="reason"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(reason);
});

Then('I should see the delete request status changed to {string}', async function (status) {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_status"]'))).getText();
    assert.equal(actual_status, status);
});
