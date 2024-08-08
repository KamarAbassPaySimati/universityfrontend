/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
const { When, Given, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Given('I navigate to dashboard page', async function () {
    await driver.get('http://localhost:3000/dashboard');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I click on export button for {string}', async function (graphType) {
    switch (graphType) {
    case 'Agent Registrations':
        await driver.wait(until.elementLocated(By.css('[data-testid="Agent Registrations Export"]'))).click();
        break;
    case 'Customer Registrations':
        await driver.wait(until.elementLocated(By.css('[data-testid="Customer Registrations Export"]'))).click();
        break;
    case 'Agent Cash-in; Cash-out':
        await driver.wait(until.elementLocated(By.css('[data-testid="Agent Cash-in; Cash-out (MWK) Export"]'))).click();
        break;
    case 'Agent Pay-in; Pay-out':
        await driver.wait(until.elementLocated(By.css('[data-testid="Agent Pay-in; Pay-out (MWK) Export"]'))).click();
        break;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
});

Then('I should see {string} graph', async function (graphType) {
    switch (graphType) {
    case 'Agent Registrations':
        const agentGraph = await driver.wait(until.elementLocated(By.css('[data-testid="Agent Registrations"]')));
        await driver.wait(until.elementIsVisible(agentGraph));
        break;
    case 'Customer Registrations':
        const customerGraph = await driver.wait(until.elementLocated(By.css('[data-testid="Customer Registrations"]')));
        await driver.wait(until.elementIsVisible(customerGraph));
        break;
    case 'Agent Cash-in; Cash-out':
        const customerpayinGraph = await driver.wait(until.elementLocated(By.css('[data-testid="Agent Cash-in; Cash-out (MWK)"]')));
        await driver.wait(until.elementIsVisible(customerpayinGraph));
        break;
    case 'Agent Pay-in; Pay-out':
        const customerpayoutGraph = await driver.wait(until.elementLocated(By.css('[data-testid="Agent Pay-in; Pay-out (MWK)"]')));
        await driver.wait(until.elementIsVisible(customerpayoutGraph));
        break;
    }
});
