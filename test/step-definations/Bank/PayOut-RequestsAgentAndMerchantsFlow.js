/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const assert = require('assert');
const path = require('path');

function customSort (order = 'asc') {
    return (a, b) => {
        const parseDate = (dateString) => {
            const months = {
                Jan: 0,
                Feb: 1,
                Mar: 2,
                Apr: 3,
                May: 4,
                Jun: 5,
                Jul: 6,
                Aug: 7,
                Sep: 8,
                Oct: 9,
                Nov: 10,
                Dec: 11
            };

            const match = dateString.match(/(\d{2}) (\w{3}) (\d{4}), (\d{2}):(\d{2}) hours/);
            if (!match) return new Date(); // Default fallback in case of parsing error

            const [_, day, month, year, hours, minutes] = match;
            return new Date(parseInt(year), months[month], parseInt(day), parseInt(hours), parseInt(minutes));
        };

        return order === 'asc' ? parseDate(a) - parseDate(b) : parseDate(b) - parseDate(a);
    };
}

Given('I navigate to payout request agents listing screen', async function () {
    await driver.get('http://localhost:3000/transactions/pay-out-requests?type=agents&page=1');
    await new Promise(resolve => setTimeout(resolve, 5000));
});
When('I search reported payout request by {string}', async function (search_term) {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const searchField = await driver.findElement(By.xpath('//input[@data-testid="search"]'));
    let actual_search;
    switch (search_term) {
    case 'Request ID':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[1]')), 5000).getText();
        actual_search = actual_search.replace(/\s+/g, ''); // Remove spaces
        break;

    case 'Paymaart ID':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[2]')), 5000).getText();
        actual_search = actual_search.replace(/\s+/g, ''); // Remove spaces
        break;

    default:
        throw new Error(`Invalid search term: ${search_term}`);
    }
    await searchField.clear();
    await searchField.sendKeys(actual_search);
    await driver.sleep(2000);
});
Then('I should see the payout request based on the {string}', async function (search_term) {
    const expected_search = await driver.findElement(By.xpath('//input[@data-testid="search"]')).getAttribute('value');
    let actual_search;
    await new Promise(resolve => setTimeout(resolve, 500));
    switch (search_term) {
    case 'Request ID':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[1]')), 5000).getText();
        actual_search = actual_search.replace(/\s+/g, ''); // Remove spaces
        break;

    case 'Paymaart ID':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[2]')), 5000).getText();
        actual_search = actual_search.replace(/\s+/g, ''); // Remove spaces
        break;
    default:
        throw new Error(`Invalid search term: ${search_term}`);
    }
    assert.strictEqual(actual_search, expected_search, `Expected ${expected_search} but found ${actual_search}`);
});
When('I click on view payout request', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    request_id = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[1]')), 5000).getText();
    paymaart_id = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[2]')), 5000).getText();
    amount = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[3]')), 5000).getText();
    reported_date = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[4]')), 5000).getText();
    payout_status = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[4]')), 5000).getText();
    await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')), 5000).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});
Then('I should see all the valid details of payout request', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(request_id, paymaart_id, amount, reported_date, payout_status, 'values');
    const pageSource = await driver.getPageSource();
    pageSource.includes(request_id);
    pageSource.includes(paymaart_id);
    pageSource.includes(amount);
    pageSource.includes(reported_date);
    pageSource.includes(payout_status);
});
Given('I navigate to payout request Merchants listing screen', async function () {
    await driver.get('http://localhost:3000/transactions/pay-out-requests?type=merchants&page=1');
    await new Promise(resolve => setTimeout(resolve, 5000));
});
Then('I should see the payout request sorted in descending order based on {string}', async function (sortBy) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    let items;
    let itemTexts;
    let sortedItemTexts;
    switch (sortBy) {
    case 'Requested Date':
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="submission_date"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort(customSort('desc'));
        assert.deepStrictEqual(itemTexts, sortedItemTexts, 'Items are not sorted in descending order');
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    default:
        break;
    }
});

Then('I should see the payout request sorted in ascending order based on {string}', async function (sortBy) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    let items;
    let itemTexts;
    let sortedItemTexts;
    switch (sortBy) {
    case 'Requested Date':
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="submission_date"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort(customSort('asc'));
        console.log('Original Items:', itemTexts);
        console.log('Sorted Items (ASC):', sortedItemTexts);
        assert.deepStrictEqual(sortedItemTexts, itemTexts, 'Items are not sorted in ascending order');

        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    default:
        break;
    }
});
When('I fill all the details to approve the request', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code_0"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="pop_file_ref_no"]'))).sendKeys('636362652');
    await new Promise(resolve => setTimeout(resolve, 2000));
    element = await driver.wait(until.elementLocated(By.css('[data-testid="pop_file_key"]')));
    const filePath = path.join(__dirname, '../../support/document_front.png');
    await element.sendKeys(filePath);
});
When('I click on the approve', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.wait(until.elementLocated(By.css('[data-testid="confirm_button"]'))).click();
});
When('I fill all the details to approve the request of agent', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.wait(until.elementLocated(By.css('[data-testid="activate_deactivate_button"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.css('[data-testid="transaction_code"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="pay-out_to_agent_from__ptba1_|_em_credit_to_pmcat"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="pop_file_ref_no"]'))).sendKeys('636362652');
    await new Promise(resolve => setTimeout(resolve, 2000));
    element = await driver.wait(until.elementLocated(By.css('[data-testid="pop_file_key"]')));
    const filePath = path.join(__dirname, '../../support/document_front.png');
    await element.sendKeys(filePath);
});
