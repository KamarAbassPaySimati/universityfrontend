const { Given } = require('@cucumber/cucumber');
const { driver } = require('../1_Driver.js');

Given('I navigate to G2P customer listing page', async function () {
    await driver.get('http://localhost:3000/financials/G2P');
    await new Promise(resolve => setTimeout(resolve, 4000));
});
