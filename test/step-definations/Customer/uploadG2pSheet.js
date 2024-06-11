const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../1_Driver.js');
const path = require('path');
When('I upload the excel sheet as {string}', async function (sheet) {
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (sheet !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="excel_sheet"]')));
        const filePath = path.join(__dirname, `../../support/${sheet}`);
        await element.sendKeys(filePath);
    }
});

When('I should read a message stating {string}', async function (message) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="upload_message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();
    assert.equal(element_text, message);
});

When('I upload the valid excel sheet as {string}', async function (valid_sheet) {
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (valid_sheet !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="excel_sheet"]')));
        const filePath = path.join(__dirname, `../../support/${valid_sheet}`);
        await element.sendKeys(filePath);
    }
});
