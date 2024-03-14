const { Then } = require('@cucumber/cucumber');
const until = require('selenium-webdriver').until;
const { driver } = require('../Driver.js');
Then('I should read a message stating that {string}', async function (errorMessage) {
    // callback(null)
    let check = false;
    let retries = 70;

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

Then('I should be redirected to the {string} page', async function (url) {
    await driver.wait(until.urlIs(`http://localhost:3000/${url}`));
});
