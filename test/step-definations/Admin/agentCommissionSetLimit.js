const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');

Given("I navigate to agent commission setting screen", async function(){
    await driver.get("http://localhost:3000/commissionSetting")
    await new Promise(resolve => setTimeout(resolve, 4000));
})

Then('I should see the commission conversion duration fields prefilled',async function () {
    let element = await driver.wait(until.elementLocated(By.css('[data-testid="agentCommission"]')))
    let elementValue = element.getText()

    await assert.notEqual(elementValue, '')
    await assert.notEqual(elementValue, '-')
  });

Given('I click the update commission setting',async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="UpdateCommissionSettingButton"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
 });

 When('I enter {string} in first field and {string} in second field',async function (firstDate, secondDate) {
    await driver.wait(until.elementLocated(By.css('[data-testid="firstDateField"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="firstDateField"]'))).sendKeys(firstDate);

    await driver.wait(until.elementLocated(By.css('[data-testid="secondDateField"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="secondDateField"]'))).sendKeys(secondDate);
  });

  When('I submit the update commission setting',async function () {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const element = await driver.wait(until.elementLocated(By.css('[data-testid="updateSubmitButtion"]')));
        await driver.wait(until.elementIsVisible(element));
        await element.click();
        await new Promise(resolve => setTimeout(resolve, 100));
  });

  


