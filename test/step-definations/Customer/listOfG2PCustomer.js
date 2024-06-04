const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Given('I navigate to G2P customer listing page', async function () {
    await driver.get('http://localhost:3000/financials/G2P');
    await new Promise(resolve => setTimeout(resolve, 4000));
});
