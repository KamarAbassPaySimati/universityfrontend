/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../Driver.js');

When('I click on view agent', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="name"]'))).getText();
    this.phoneNumber = await driver.wait(until.elementLocated(By.css('[data-testid="phone_number"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});

Then('I should view agent details', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="name"]'))).getText();
    assert.equal(actual_name, this.name);

    const actual_phoneNumber = await driver.wait(until.elementLocated(By.css('[data-testid="phoneNumber"]'))).getText();
    assert.equal(actual_phoneNumber, this.phoneNumber);

    this.actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();
    assert.equal(this.actual_status, this.status);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, this.paymaart_id);
});

Then('I should view basic details of agent', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_email = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="email"]'))).getText();
    assert.notEqual(agent_email, '');

    const address = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="address"]'))).getText();
    assert.notEqual(address, '');
});

Then('I should view the identification details of agent', async function () {
    if (this.actual_status !== 'In-progress') {
        const element = await driver.wait(until.elementLocated(By.css('[data-testid="identification_details"]')));
        await driver.wait(until.elementIsVisible(element));

        try {
            const idDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identification_details"] [data-testid="view_id_kyc_upload_document_front"]')));
            await driver.wait(until.elementIsVisible(idDocument));
            await idDocument.click();

            await driver.wait(until.elementLocated(By.css('[data-testid="overview-modal"]')));
            await new Promise(resolve => setTimeout(resolve, 2000));
            await driver.executeScript('return document.querySelector(\'[data-testid="close-button"]\').click()');
            await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (error) {
            throw new Error('Failed to view the front of ID document');
        }

        const verificationDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identification_details"] [data-testid="view_verification_kyc_upload_document_front"]')));
        await driver.wait(until.elementIsVisible(verificationDocument));

        const selfieDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identification_details"] [data-testid="view_selfie"]')));
        await driver.wait(until.elementIsVisible(selfieDocument));
    } else {
        return 'skipped';
    }
});

Then('I should view the personal details of agent', async function () {
    if (this.actual_status !== 'In-progress') {
        const element = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"]')));
        await driver.wait(until.elementIsVisible(element));

        const agent_gender = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="gender"]'))).getText();
        assert.notEqual(agent_gender, '');

        const agent_dob = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="dob"]'))).getText();
        assert.notEqual(agent_dob, '');

        const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="monthly_income"]'))).getText();
        assert.notEqual(monthly_income, '');

        const monthly_withdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="monthly_withdrawal"]'))).getText();
        assert.notEqual(monthly_withdrawal, '');
    } else {
        return 'skipped';
    }
});

Then('I should view option to activate or update a agent', async function () {
    const activate_deactivate_button = await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]')));
    await driver.wait(until.elementIsVisible(activate_deactivate_button));

    const updateButton = await driver.wait(until.elementLocated(By.css('[data-testid="update_button"]')));
    await driver.wait(until.elementIsVisible(updateButton));
});

When('I should view monthly income and monthly withdrawal values as {string}', async function (expectedValue) {
    // Write code here that turns the phrase above into concrete actions
    if (this.actual_status !== 'In-progress') {
        const monthlyIncome = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_income"]')));
        await driver.wait(until.elementIsVisible(monthlyIncome));
        const monthlyIncomeValue = await monthlyIncome.getAttribute('value');

        assert.equal(monthlyIncomeValue, expectedValue);
        await new Promise(resolve => setTimeout(resolve, 100));

        const monthlyWithdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_withdrawal"]')));
        await driver.wait(until.elementIsVisible(monthlyWithdrawal));
        const monthlyWithdrawalValue = await monthlyIncome.getAttribute('value');
        assert.equal(monthlyWithdrawalValue, expectedValue);
    } else {
        return 'skipped';
    }
});
