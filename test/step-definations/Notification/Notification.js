/* eslint-disable max-len */
/* eslint-disable camelcase */
const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

When('I click on notification bell', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="notification_bell"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should view list of notifications', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="notification_list"]')));
    await driver.wait(until.elementIsVisible(element));
});

When('I click on view agent delete request notification', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view_delete_request_notification"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
    await new Promise(resolve => setTimeout(resolve, 2000));

});

Then('I should be redirected to view delete request screen', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.urlContains('http://localhost:3000/verify/delete-account-requests/'));
});

When('I click on view KYC request notification', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view_kyc_notification"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should be redirected to view KYC screen', async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.urlContains('http://localhost:3000/verify/kyc-registration/'));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="user_details"] [data-testid="paymaart_id"]')));
    await driver.wait(until.elementIsVisible(element));
});
