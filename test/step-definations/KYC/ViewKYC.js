/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Given('I navigate to agent KYC registration screen', async function () {
    console.log('global.agent_registration_response.', global.agent_registration_response);
    await driver.get(`http://localhost:3000/users/agents/register-agent/kyc-registration/${global.agent_registration_response.paymaart_id}`);
});

Given('I navigate to customer KYC registration screen', async function () {
    await driver.get(`http://localhost:3000/users/customers/register-customer/kyc-registration/${global.customer_registration_response.paymaart_id}`);
});

Given('I navigate to merchant KYC registration screen', async function () {
    await driver.get(`http://localhost:3000/users/merchants/register-merchant/kyc-registration/${global.merchant_registration_response.paymaart_id}`);
});

When('I search for recently created agent', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys(global.agent_registration_response.paymaart_id);
    await new Promise(resolve => setTimeout(resolve, 500));
});

When('I search for recently created customer', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys(global.customer_registration_response.paymaart_id);
    await new Promise(resolve => setTimeout(resolve, 500));
});

When('I search for recently created merchant', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys(global.merchant_registration_response.paymaart_id);
    await new Promise(resolve => setTimeout(resolve, 500));
});

When('I click on view agent KYC', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="name"]'))).getText();
    this.kyc_type = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_type"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});

Then('I should view agent details', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('this', this.paymaart_id, this.name, this.kyc_type, this.status);
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="name"]'))).getText();
    assert.equal(actual_name, this.name);

    const actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="kyc_status"]'))).getText();
    assert.equal(actual_status, this.status);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, this.paymaart_id);
});

Then('I should view basic details of agent KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_kyc_phone_number = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Phone Number"]'))).getText();
    assert.notEqual(agent_kyc_phone_number, '');

    const agent_email = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Email"]'))).getText();
    assert.notEqual(agent_email, '');

    const addressElement = await driver.wait(until.elementLocated(By.xpath('//*[@data-testid="basic_details"]//*[@data-testid="Address" or @data-testid="Malawi Address"]')));
    const address = await addressElement.getText();
    console.log('address', address);
    assert.notEqual(address, '');

    console.log('basic details', agent_kyc_phone_number, agent_email, address);
});

Then('I should view the identification details of agent KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"]')));
    await driver.wait(until.elementIsVisible(element));

    try {
        const idDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="ID Document_0"]')));
        await driver.wait(until.elementIsVisible(idDocument));
        await idDocument.click();

        await driver.wait(until.elementLocated(By.css('[data-testid="overview-modal"]')));
        await new Promise(resolve => setTimeout(resolve, 2000));
        await driver.executeScript('return document.querySelector(\'[data-testid="close-button"]\').click()');
        await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
        throw new Error('Failed to view the front of ID document');
    }

    const verificationDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="Verification Document_0"]')));
    await driver.wait(until.elementIsVisible(verificationDocument));

    const selfieDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="Biometrics | Live Selfie_0"]')));
    await driver.wait(until.elementIsVisible(selfieDocument));
});

Then('I should view the personal details of agent KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_gender = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Gender"]'))).getText();
    assert.notEqual(agent_gender, '');

    const agent_dob = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Date of Birth"]'))).getText();
    assert.notEqual(agent_dob, '');

    const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Monthly Income"]'))).getText();
    assert.notEqual(monthly_income, '');
    assert.notEqual(monthly_income, '-');

    const monthly_withdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Monthly Withdrawal"]'))).getText();
    assert.notEqual(monthly_withdrawal, '');
    assert.notEqual(monthly_withdrawal, '-');
    console.log('personal details', agent_gender, agent_dob, monthly_income, monthly_withdrawal);
});

When('I should view monthly income and monthly withdrawal values as {string}', async function (expectedValue) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Monthly Income"]'))).getText();
    assert.notEqual(monthly_income, '');

    assert.equal(monthly_income, expectedValue);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const monthly_withdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Monthly Withdrawal"]'))).getText();
    assert.equal(monthly_withdrawal, expectedValue);
});

When('I click on view customer KYC', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="name"]'))).getText();
    this.kyc_type = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_type"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});

Then('I should view customer details', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('this', this.paymaart_id, this.name, this.kyc_type, this.status);
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="name"]'))).getText();
    assert.equal(actual_name, this.name);

    const actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="kyc_status"]'))).getText();
    assert.equal(actual_status, this.status);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, this.paymaart_id);
});

Then('I should view basic details of customer KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_kyc_phone_number = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Phone Number"]'))).getText();
    assert.notEqual(agent_kyc_phone_number, '');

    const agent_email = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Email"]'))).getText();
    assert.notEqual(agent_email, '');

    const addressElement = await driver.wait(until.elementLocated(By.xpath('//*[@data-testid="basic_details"]//*[@data-testid="Address" or @data-testid="Malawi Address"]')));
    const address = await addressElement.getText();
    console.log('address', address);
    assert.notEqual(address, '');

    console.log('basic details', agent_kyc_phone_number, agent_email, address);
});

Then('I should view the identification details of customer KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"]')));
    await driver.wait(until.elementIsVisible(element));

    try {
        const idDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="ID Document_0"]')));
        await driver.wait(until.elementIsVisible(idDocument));
        await idDocument.click();

        await driver.wait(until.elementLocated(By.css('[data-testid="overview-modal"]')));
        await new Promise(resolve => setTimeout(resolve, 2000));
        await driver.executeScript('return document.querySelector(\'[data-testid="close-button"]\').click()');
        await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
        throw new Error('Failed to view the front of ID document');
    }

    const verificationDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="Verification Document_0"]')));
    await driver.wait(until.elementIsVisible(verificationDocument));

    const selfieDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="Biometrics | Live Selfie_0"]')));
    await driver.wait(until.elementIsVisible(selfieDocument));
});

Then('I should view the personal details of customer KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_gender = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Gender"]'))).getText();
    assert.notEqual(agent_gender, '');

    const agent_dob = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Date of Birth"]'))).getText();
    assert.notEqual(agent_dob, '');

    const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Monthly Income"]'))).getText();
    assert.notEqual(monthly_income, '');
    assert.notEqual(monthly_income, '-');

    const monthly_withdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Monthly Withdrawal"]'))).getText();
    assert.notEqual(monthly_withdrawal, '');
    assert.notEqual(monthly_withdrawal, '-');
    console.log('personal details', agent_gender, agent_dob, monthly_income, monthly_withdrawal);
});

When('I click on view merchant KYC', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="name"]'))).getText();
    this.kyc_type = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_type"]'))).getText();
    this.status = await driver.wait(until.elementLocated(By.css('[data-testid="status"]'))).getText();

    await element.click();
});

Then('I should view merchant details', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('this', this.paymaart_id, this.name, this.kyc_type, this.status);
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="name"]'))).getText();
    assert.equal(actual_name, this.name);

    const actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="kyc_status"]'))).getText();
    assert.equal(actual_status, this.status);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, this.paymaart_id);
});

Then('I should view basic details of merchant KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_kyc_phone_number = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Phone Number"]'))).getText();
    assert.notEqual(agent_kyc_phone_number, '');

    const agent_email = await driver.wait(until.elementLocated(By.css('[data-testid="basic_details"] [data-testid="Email"]'))).getText();
    assert.notEqual(agent_email, '');

    const addressElement = await driver.wait(until.elementLocated(By.xpath('//*[@data-testid="basic_details"]//*[@data-testid="Address" or @data-testid="Malawi Address"]')));
    const address = await addressElement.getText();
    console.log('address', address);
    assert.notEqual(address, '');

    console.log('basic details', agent_kyc_phone_number, agent_email, address);
});

Then('I should view the identification details of merchant KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"]')));
    await driver.wait(until.elementIsVisible(element));

    try {
        const idDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="ID Document_0"]')));
        await driver.wait(until.elementIsVisible(idDocument));
        await idDocument.click();

        await driver.wait(until.elementLocated(By.css('[data-testid="overview-modal"]')));
        await new Promise(resolve => setTimeout(resolve, 2000));
        await driver.executeScript('return document.querySelector(\'[data-testid="close-button"]\').click()');
        await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
        throw new Error('Failed to view the front of ID document');
    }

    const verificationDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="Verification Document_0"]')));
    await driver.wait(until.elementIsVisible(verificationDocument));

    const selfieDocument = await driver.wait(until.elementLocated(By.css('[data-testid="identity_details"] [data-testid="Biometrics | Live Selfie_0"]')));
    await driver.wait(until.elementIsVisible(selfieDocument));
});

Then('I should view the personal details of merchant KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const agent_gender = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Gender"]'))).getText();
    assert.notEqual(agent_gender, '');

    const agent_dob = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Date of Birth"]'))).getText();
    assert.notEqual(agent_dob, '');

    const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Monthly Income"]'))).getText();
    assert.notEqual(monthly_income, '');
    assert.notEqual(monthly_income, '-');

    const monthly_withdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="personal_details"] [data-testid="Monthly Withdrawal"]'))).getText();
    assert.notEqual(monthly_withdrawal, '');
    assert.notEqual(monthly_withdrawal, '-');
    console.log('personal details', agent_gender, agent_dob, monthly_income, monthly_withdrawal);
});

Then('I should view the trading details of merchant KYC', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="trading_details"]')));
    await driver.wait(until.elementIsVisible(element));

    const merchant_trading_type = await driver.wait(until.elementLocated(By.css('[data-testid="trading_details"] [data-testid="merchant_trading_type"]'))).getText();
    assert.notEqual(merchant_trading_type, '');

    const merchant_trading_address = await driver.wait(until.elementLocated(By.css('[data-testid="trading_details"] [data-testid="merchant_trading_address"]'))).getText();
    assert.notEqual(merchant_trading_address, '');
});
