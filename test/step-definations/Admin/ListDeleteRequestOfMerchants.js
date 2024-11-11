const { Given } = require('@cucumber/cucumber');
// const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Given('I navigate to merchant delete request listing screen', async function () {
    await driver.get('http://localhost:3000/verify/delete-account-requests?page=1&type=merchants');
    await new Promise(resolve => setTimeout(resolve, 4000));
});
