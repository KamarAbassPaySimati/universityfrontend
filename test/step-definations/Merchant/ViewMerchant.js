/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../1_Driver.js');

When('I click on view merchant', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="merchant_name"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});

Then('I should view merchant information', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="name"]'))).getText();
    assert.equal(actual_name, this.name);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, this.paymaart_id);
});

Then('I should view basic details of merchant', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_email = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Email"]'))).getText();
    assert.notEqual(agent_email, '');

    const addressElement = await driver.wait(until.elementLocated(By.xpath('//*[@data-testid="basic_details"]//*[@data-testid="Address" or @data-testid="Malawi Address"]')));
    const address = await addressElement.getText();
    assert.notEqual(address, '');
});

Then('I should view option to activate or update a merchant', async function () {
    const activate_deactivate_button = await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]')));
    await driver.wait(until.elementIsVisible(activate_deactivate_button));

    const updateButton = await driver.wait(until.elementLocated(By.css('[data-testid="update_button"]')));
    await driver.wait(until.elementIsVisible(updateButton));
});

Then('I should view the KYC status as {string}', async function (status) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 4000));
    const actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="kyc_status"]'))).getText();
    assert.equal(actual_status, status);
});
