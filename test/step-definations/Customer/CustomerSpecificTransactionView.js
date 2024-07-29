const { Then, When } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Then('I should see the transaction receipt', async function () {
    const Element = await driver.wait(until.elementLocated(By.css('[data-testid="transaction_details"]')));
    await driver.wait(until.elementIsVisible(Element));
});

When('I click on customer transaction history icon', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="customer-transaction-view-btn-0"]')));
    await driver.wait(until.elementIsVisible(element));

    this.paymaart_id = await driver.wait(until.elementLocated(By.css('[data-testid="paymaart_id"]'))).getText();
    this.name = await driver.wait(until.elementLocated(By.css('[data-testid="customer_name"]'))).getText();

    await element.click();
});
