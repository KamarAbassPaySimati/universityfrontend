const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');
const { elementIsVisible } = require('selenium-webdriver/lib/until.js');

Given('I navigate to specific admin transaction', async function(){
    await driver.get('http://localhost:3000/users/admins/transaction-history/PMT28702');
});

Given('I navigate to specific agent transaction', async function(){
    await driver.get('http://localhost:3000/users/admins/transaction-history/AGT933252');
});

Given('I navigate to specific customer transaction', async function(){
    await driver.get('http://localhost:3000/users/admins/transaction-history/CMR99640640');
});

When('I click on flag transaction button', async function(){
    await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_button"]'))).click();
});

Then('I should see a select flag transaction reason pop up', async function(){
    await driver.wait.until(elementIsVisible(By.css('[data-testid="flagTransactionReasonPopUp"]')));
});

When('I click confirm flag transaction button', async function(){
    await driver.wait(until.elementLocated(By.css('[data-testid="confirm_button"]'))).click();
});

When('I select the reason for flag transaction as {string}', async function(reason){

    switch(reason){
        case 'Transaction & System Failures': await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_reason_one"]'))).click();
            break;
        case 'Policy Clarity & Customer Support': await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_reason_two"]'))).click();
            break;
        case 'Service Quality & Marketing Accuracy': await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_reason_three"]'))).click();
            break;
        case 'User Experience Challenges': await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_reason_four"]'))).click();
            break;
        default: throw new Error('Invalid flag transaction reason')
    }
});

Then('I should see the flag transaction button disabled', async function(){
    let disabledButton = await driver.wait(until.elementLocated(By.css('[data-testid="flag_transaction_button"]'))).isEnabled();
    assert.equal(disabledButton, false);
});