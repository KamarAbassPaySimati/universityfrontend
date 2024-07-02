const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Given('I navigate to customer delete request listing screen', async function () {
    await driver.get('http://localhost:3000/verify/delete-account-requests?page_number=1&type=customer');
    await new Promise(resolve => setTimeout(resolve, 4000));
});