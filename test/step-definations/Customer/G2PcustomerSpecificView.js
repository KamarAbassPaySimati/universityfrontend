const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

When('I click on the view button for customer details',async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="customerDetailsViewButton"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.customerName = await driver.wait(until.elementLocated(By.css('[data-testid="customer_name"]'))).getText();

    await element.click();
  });

  Then('I should view G2P customer details',async function () {
    await new Promise(resolve => setTimeout(resolve, 5000));

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="customerDetailsCard"]')));
    await driver.wait(until.elementIsVisible(element));

    const actual_name = await driver.wait(until.elementLocated(By.css('[data-testid="customerDetailsCard"] [data-testid="customer_name"]'))).getText();
    assert.equal(actual_name, this.customerName);

    const actual_paymaart_ID = await driver.wait(until.elementLocated(By.css('[data-testid="customerDetailsCard"] [data-testid="paymaart_id"]'))).getText();
    assert.equal(actual_paymaart_ID, this.paymaart_id);
  });


  When('I click on view excel sheet overview',async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="view-sheet-overview"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();

  });

  When('I click on the delete sheet button',async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="sheetDeleteButton"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
  });

  Then('I should see a confirmation prompt for deleting excel sheet',async function () {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
    await driver.wait(until.elementIsVisible(element));

    let modalBody = await driver.wait(until.elementLocated(By.css('[data-testid="modal-body"]'))).getText();
    assert.equal(modalBody, "This will delete the uploaded sheet");
  });

  Then('I should view a viewer modal of excel sheet',async function () {
    this.element = await driver.wait(until.elementLocated(By.css('[data-testid="overview-modal"]')));
    await driver.wait(until.elementIsVisible(this.element));
  });

Then('I should see the image viewer modal of excel sheet getting closed', async function () {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const overviewModal = await driver.executeScript('return document.querySelector("[data-testid=\'overview-modal\']")');
    if (overviewModal == null || overviewModal === undefined) {
        return 'passed';
    } else {
        throw new Error('Overview modal is not hidden');
    }
});

  
