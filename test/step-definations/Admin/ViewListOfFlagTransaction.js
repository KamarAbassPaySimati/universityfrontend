/* eslint-disable max-len */
const { Given } = require('@cucumber/cucumber');
const { driver } = require('../1_Driver.js');

Given('I am on the flagged transaction page', async function () {
    await driver.get('http://localhost:3000/transactions/flagged?page=1');
});

// When('I click on approve button', async function () {
//     await driver.wait(until.elementLocated(By.css('[data-testid="approveButton"]'))).click();
// });
// When('I click on reject button', async function () {
//     await driver.wait(until.elementLocated(By.css('[data-testid="rejectButton"]'))).click();
// });
