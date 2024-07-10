/* eslint-disable camelcase */
/* eslint-disable max-len */
const { Given } = require('@cucumber/cucumber');
const { driver } = require('../1_Driver.js');

Given('I am in the add transaction for suspense account page', async function () {
    await driver.get('http://localhost:3000/paymaart-banks/suspense-account/view-suspense-account/PMSP/add-transaction');
});
