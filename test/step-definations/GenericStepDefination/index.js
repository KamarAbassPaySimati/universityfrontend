const { When, Then } = require('@cucumber/cucumber');
const until = require('selenium-webdriver').until;
const { driver } = require('../Driver.js');
Then('I should read a message stating that {string}', { timeout: 35000 }, async function (errorMessage) {
    // callback(null)
    let check = false;
    let retries = 400;

    while (retries > 0) {
        const pageSource = await driver.getPageSource();
        check = pageSource.includes(errorMessage);

        if (check) {
            return 'passed';
        } else {
            await new Promise(resolve => setTimeout(resolve, 300));
            retries--;
        }
    }
    throw new Error('Failed');
});

Then('I should be redirected to the {string} page', { timeout: 10000 }, async function (url) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.urlIs(`http://localhost:3000${url}`));
    console.log('url is ', `http://localhost:3000${url}`);
});

When('I am logged into the application', { timeout: 10000 }, async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.urlIs('http://localhost:3000/dashboard'));
});
