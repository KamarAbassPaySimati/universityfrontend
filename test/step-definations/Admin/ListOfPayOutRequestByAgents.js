const { Given } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Given('I navigate to agent pay-out request listing screen', async function () {
    await driver.get('http://localhost:3000/transactions/pay-out-requests?page_number=1&type=agent');
    await new Promise(resolve => setTimeout(resolve, 4000));
});
