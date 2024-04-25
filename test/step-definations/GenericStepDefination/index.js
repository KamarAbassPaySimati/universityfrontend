const { When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../Driver.js');
const assert = require('assert');
Then('I should read a message stating that {string}', { timeout: 35000 }, async function (errorMessage) {
    let check = false;
    let retries = 400;

    while (retries > 0) {
        const pageSource = await driver.getPageSource();
        check = pageSource.includes(errorMessage);

        if (check) {
            return 'passed';
        } else {
            await new Promise(resolve => setTimeout(resolve, 100));
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
    case 'Agent Name':
        await driver.wait(until.elementLocated(By.css('[data-testid="sort_agent_name"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    case 'Merchant Name':
        await driver.wait(until.elementLocated(By.css('[data-testid="sort_merchant_name"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    case 'Submission Date':
        await driver.wait(until.elementLocated(By.css('[data-testid="sort_submission_date"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    case 'Customer Name':
        await driver.wait(until.elementLocated(By.css('[data-testid="sort_customer_name"]'))).click();
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
    const element = await driver.wait(until.elementLocated(By.css("[data-testid='filter-tab']")));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should see filter popup modal', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filter_modal = await driver.wait(until.elementLocated(By.css("[data-testid='filter-modal']")));
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

Then('I should view {string} page not found screen', async function (page) {
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Page Not Found"]')));
});

When('I click on clear search', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search-close"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should see list of table records', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('tbody tr')));
    await driver.wait(until.elementIsVisible(element));
});

When('I click on clear filter', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="clear-filter"]')));
    await driver.wait(until.elementIsVisible(element));
    await driver.wait(until.elementIsEnabled(element));
    await element.click();
});

Then('I should see all the filters getting cleared', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 100));
    const checkboxes = await driver.wait(until.elementsLocated(By.css('[data-testid="filter-modal"] input[type="checkbox"]')));
    let allUnchecked = true;

    checkboxes.map(async (checkbox) => {
        if (await checkbox.isSelected()) { // If checkbox is selected/checked
            allUnchecked = false;
        }
    });

    if (allUnchecked === true) {
        return 'passed';
    } else {
        throw new Error('All the checkbox are not checked');
    }
});

Then('I should see filter popup modal closed', async function () {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const filterModal = await driver.executeScript('return document.querySelector("[data-testid=\'filter-modal\']")');
    if (filterModal == null || filterModal === undefined) {
        return 'passed';
    }
});

When('I click on cancel button', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="cancel_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I click on confirm button', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="confirm_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I log out from the application', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.executeScript('window.localStorage.clear();');
    await driver.executeScript('window.location.reload();');
    await new Promise(resolve => setTimeout(resolve, 2000));
});

Then('I should see {string} button is hidden', async function (type) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    let element;
    switch (type) {
    case 'onboard admin user':
        element = await driver.executeScript('return document.querySelector("[data-testid=\'Register Admin\']")');
        if (element == null || element === undefined) {
            return 'passed';
        } else {
            throw new Error('Onboard Admin button is not hidden');
        }
    default:
        break;
    }
});
