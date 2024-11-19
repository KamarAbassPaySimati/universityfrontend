const { Then, When } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');

When("I click on the unlock button for first account in the list", async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="unlock_button"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
})

Then('I should see a popup modal asking security questions',async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filter_modal = await driver.wait(until.elementLocated(By.css("[data-testid='security-question-modal']")));
  });

When('I enter the security question answer as {string}',async function (answer) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="security_question_answer"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementLocated(By.css('[data-testid="security_question_answer"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="security_question_answer"]'))).sendKeys(answer);
    
  });

When('I click on the verify button security question',async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="verify_security_question"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

Then('I should see the verify security question button text changed to {string}',async function (actual_text) {
    await new Promise(resolve => setTimeout(resolve, 6000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_security_question"]')));
    await driver.wait(until.elementIsVisible(element));
    const elementText = await element.getText();

    assert.equal(actual_text, elementText);
  });

  When('I click on Request Reset Link',async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="request_reset_link"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
  });