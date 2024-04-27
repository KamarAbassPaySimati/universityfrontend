const { Given } = require('@cucumber/cucumber');
const { driver } = require('../Driver.js');

Given('I navigate to merchant users listing screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get('http://localhost:3000/users/merchants');
    await new Promise(resolve => setTimeout(resolve, 4000));
});
