const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../Driver.js');
const assert = require('assert');
Then('I should read a message stating that {string}', { timeout: 30000 }, async function (errorMessage) {
    // callback(null)
    let check = false;
    let retries = 200;

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

When('I should see table header containing {string}', { timeout: 10 * 1000 }, async function (tableHeader) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const arr = JSON.parse(tableHeader);
    const tableData = await driver.wait(until.elementLocated(By.xpath('//table/thead'))).getText();
    arr.forEach(element => {
        return assert(tableData.includes(element));
    });
});

When('I click on the sort by {string}', async function (sortBy) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 3000));
    switch (sortBy) {
    case 'Admin Name':
        await driver.wait(until.elementLocated(By.css('[data-testid="sort_admin_name"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    default:
        await driver.wait(until.elementLocated(By.css('[data-testid="sort_admin_name"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    }
});

When('I click on filter tab', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.css("[data-testid='filters-tab']"))).click();
});

Then('I should see filter popup modal', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.css("[data-testid='filters-modal']")));
});

When('I click on paginate next page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    await new Promise(resolve => setTimeout(resolve, 5000));
    // eslint-disable-next-line max-len
    const paginatorPages = await driver.executeScript('return document.querySelectorAll("[data-testid=\'paginator\'] ul > li > a")');
    if (paginatorPages == null || paginatorPages === undefined || paginatorPages.length === 0) {
        return 'skipped';
    }
    const page = paginatorPages[paginatorPages.length - 2];
    await new Promise(resolve => setTimeout(resolve, 500));
    this.lastPage = await page.getText();
    if (this.lastPage !== '1') {
        await driver.wait(until.elementLocated(By.css("[data-testid='paginate-next']"))).click();
    }
});

Then('I should be navigated to next page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 3000));
    // eslint-disable-next-line max-len
    const currentPage = await driver.wait(until.elementLocated(By.css("[data-testid='paginator'] [aria-current='page']"))).getText();
    assert.equal(currentPage, this.lastPage);
});

When('I click on paginate to previous page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (this.lastPage !== '1') {
        await driver.wait(until.elementLocated(By.css("[data-testid='paginate-prev']"))).click();
    }
});

Then('I should be navigated to page {int}', async function (expectedPage) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // eslint-disable-next-line max-len
    const currentPage = await driver.wait(until.elementLocated(By.css('[data-testid="paginator"] [aria-current="page"]'))).getText();
    assert.equal(currentPage, expectedPage);
});
