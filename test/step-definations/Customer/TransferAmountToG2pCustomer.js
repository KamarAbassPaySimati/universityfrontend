const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../1_Driver.js');

When('I click on transfer amount button',async function () {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="transfer_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
  });

  When('I click on confirm button for transfer',async function () {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="confirmTransferButton"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
  });

  Then('I should see a confirmation prompt to execute payment',async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
    await driver.wait(until.elementIsVisible(element));

    const modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
    assert.equal(modalBody, 'Confirm to Execute Payment?');
  });

  When('I should read a message stating {string} for transfer',async function (message) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="success-message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();
    assert.equal(element_text,message);
  });