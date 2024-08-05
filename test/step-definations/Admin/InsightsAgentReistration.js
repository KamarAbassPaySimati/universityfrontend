/* eslint-disable no-case-declarations */
const { When, Given, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');

Given('I navigate to dashboard page', async function () {
    await driver.get('http://localhost:3000/dashboard');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I click on export button for {string}', async function () {
    const button = await driver.wait(until.elementLocated(By.css('[data-testid="export_button"]')));
    await driver.wait(until.elementIsVisible(button));
    await button.click();
});

Then('I should see {string} graph', async function (graphType) {
    switch (graphType) {
    case 'Agent Registrations':
        const graph = await driver.wait(until.elementLocated(By.css('[data-testid="agent-registartion"]')));
        await driver.wait(until.elementIsVisible(graph));
    }
});
