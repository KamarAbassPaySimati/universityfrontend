// /* eslint-disable camelcase */
// const assert = require('assert');
// const { When, Then } = require('@cucumber/cucumber');
// const { until, By } = require('selenium-webdriver');
// const { driver } = require('../1_Driver.js');

// When('I select the type as {string}', async function (type) {
//     // Write code here that turns the phrase above into concrete actions
//     const element = await driver.wait(until.elementLocated(By.css('[data-testid="type"]')));
//     await driver.wait(until.elementIsVisible(element));
//     await driver.wait(until.elementLocated(By.css('[data-testid="type"]'))).click();
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     switch (type) {
//     case 'Pay-out to Agent from PTBA1 EM credit to PMCAT':
//         await driver.wait(until.elementLocated(By.css('[data-testid="PTBA1"]'))).click();
//         break;
//     case 'Pay-out to Agent from PTBA2 EM credit to PMCAT':
//         await driver.wait(until.elementLocated(By.css('[data-testid="PTBA2"]'))).click();
//         break;
//     case 'Pay-out to Agent from PTBA3 EM credit to PMCAT':
//         await driver.wait(until.elementLocated(By.css('[data-testid="PTBA3"]'))).click();
//         break;
//     default:
//         break;
//     }
// });

// When('I click on approve button for confirming', async function () {
//     const element = await driver.wait(until.elementLocated(By.css('[data-testid="approve_button_submit"]')));
//     await driver.wait(until.elementIsVisible(element));
//     await element.click();
// });

// When('I click on reject button for confirming', async function () {
//     const element = await driver.wait(until.elementLocated(By.css('[data-testid="approve_button_submit"]')));
//     await driver.wait(until.elementIsVisible(element));
//     await element.click();
// });

// Then('I should see the pay-out request status changed to{string}', async function (status) {
//     await new Promise(resolve => setTimeout(resolve, 4000));
//     const actual_status = await driver.wait(until.elementLocated(By.css('[data-testid="pay_out_status"]'))).getText();
//     assert.equal(actual_status, status);
// });
