/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../1_Driver.js');

When('I click on view agent', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="agent_name"]'))).getText();
    this.phoneNumber = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});

Then('I should view agent information', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('this', this.paymaart_id, this.name, this.phoneNumber, this.status);
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="name"]'))).getText();
    assert.equal(actual_name, this.name);

    const actual_phoneNumber = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Phone Number"]'))).getText();
    assert.equal(actual_phoneNumber, this.phoneNumber);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, this.paymaart_id);
});

Then('I should view basic details of agent', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_email = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Email"]'))).getText();
    assert.notEqual(agent_email, '');

    const addressElement = await driver.wait(until.elementLocated(By.xpath('//*[@data-testid="basic_details"]//*[@data-testid="Address" or @data-testid="Malawi Address"]')));
    const address = await addressElement.getText();
    console.log('address', address);
    assert.notEqual(address, '');
});

Then('I should view the identification details of agent', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"]')));
    await driver.wait(until.elementIsVisible(element));
});

Then('I should view the personal details of agent', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"]')));
    await driver.wait(until.elementIsVisible(element));
});

Then('I should view option to activate or update a agent', async function () {
    const activate_deactivate_button = await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]')));
    await driver.wait(until.elementIsVisible(activate_deactivate_button));

    const updateButton = await driver.wait(until.elementLocated(By.css('[data-testid="update_button"]')));
    await driver.wait(until.elementIsVisible(updateButton));
});

Then('I click on complete pending KYC', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const updateButton = await driver.wait(until.elementLocated(By.css('[data-testid="update_button"]')));
    await driver.wait(until.elementIsVisible(updateButton));
    await updateButton.click();
});

// When('I should view monthly income and monthly withdrawal values as {string}', async function (expectedValue) {
//     // Write code here that turns the phrase above into concrete actions
//     if (this.actual_status !== 'In-progress') {
//         const monthlyIncome = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_income"]')));
//         await driver.wait(until.elementIsVisible(monthlyIncome));
//         const monthlyIncomeValue = await monthlyIncome.getAttribute('value');

//         assert.equal(monthlyIncomeValue, expectedValue);
//         await new Promise(resolve => setTimeout(resolve, 100));

//         const monthlyWithdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_withdrawal"]')));
//         await driver.wait(until.elementIsVisible(monthlyWithdrawal));
//         const monthlyWithdrawalValue = await monthlyIncome.getAttribute('value');
//         assert.equal(monthlyWithdrawalValue, expectedValue);
//     } else {
//         return 'skipped';
//     }
// });
