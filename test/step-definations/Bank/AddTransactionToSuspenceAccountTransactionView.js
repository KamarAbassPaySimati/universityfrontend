// /* eslint-disable camelcase */
// /* eslint-disable max-len */
// const { Given } = require('@cucumber/cucumber');
// const { driver } = require('../1_Driver.js');
// const { When } = require('@cucumber/cucumber');
// const { until, By, Key } = require('selenium-webdriver');
// const { getModifierKey } = require('../../bdd_modules/index.js');

// Given('I am in the add transaction for suspense account page', async function () {
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     await driver.get('http://localhost:3000/paymaart-banks/suspense-account/view-suspense-account/PMSP/add-transaction');
// });

// When('I enter the transaction amount as {string} for suspense account transaction', async function (amount) {
//     const element = await driver.wait(until.elementLocated(By.css('[data-testid="amount"]')));
//     await driver.wait(until.elementIsVisible(element));
//     console.log('amount', amount);
//     await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
//     if (amount !== '') {
//         await element.sendKeys(amount);
//     }
// });

// When('I enter the paymaart ID as {string} for suspense account transaction', async function (paymaart_id) {
//     const element = await driver.wait(until.elementLocated(By.css('[data-testid="entry_for"]')));
//     await driver.wait(until.elementIsVisible(element));

//     await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
//     if (paymaart_id !== '') {
//         await element.sendKeys(paymaart_id);
//     }
// });
