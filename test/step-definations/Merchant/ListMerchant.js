/* eslint-disable camelcase */
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { driver } = require('../1_Driver.js');
const { getModifierKey } = require('../../bdd_modules/index.js');
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

Given('I navigate to merchant users listing screen', async function () {
    await driver.get('http://localhost:3000/users/merchants?page=1&type=all+merchants');
    await new Promise(resolve => setTimeout(resolve, 4000));
});
Given('I navigate to reported merchant users listing screen', async function () {
    await driver.get('http://localhost:3000/users/merchants?page=1&type=reported+merchants&sortBy=name&order_by=DESC');
    await new Promise(resolve => setTimeout(resolve, 4000));
});

When('I search for particular merchant as {string}', async function (searchTerm) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="search"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]')))
        .sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys(searchTerm);
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I should see the merchant user sorted in descending order based on {string}', async function (sortBy) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1500));
    let items;
    let itemTexts;
    let sortedItemTexts;
    switch (sortBy) {
    case 'Merchant Name':
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="merchant_name"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort(customSort('asc'));
        assert.deepStrictEqual(itemTexts, sortedItemTexts, 'Items are not sorted in descending order');
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    case 'Reported Date':
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="reported_date"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort(customSort('desc'));
        assert.deepStrictEqual(itemTexts, sortedItemTexts, 'Items are not sorted in descending order');
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    default:
        break;
    }
});

Then('I should see the merchant user sorted in ascending order based on {string}', async function (sortBy) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    let items;
    let itemTexts;
    let sortedItemTexts;
    switch (sortBy) {
    case 'Merchant Name':
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="merchant_name"]')));
        itemTexts = await Promise.all(items.map((item) => item.getText()));
        sortedItemTexts = [...itemTexts].sort();
        assert.deepStrictEqual(itemTexts, sortedItemTexts, 'Items are not sorted in ascending order');
        await new Promise(resolve => setTimeout(resolve, 500));
        break;
    case 'Reported Date':
        items = await driver.wait(until.elementsLocated(By.css('[data-testid="reported_date"]')));
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

Then('I should see list of merchant users where status is {string}', async function (string) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const items = await driver.wait(until.elementsLocated(By.css('[data-testid="status"]')));
    const itemTexts = await Promise.all(items.map((item) => item.getText()));
    const sortedItemTexts = [...itemTexts].sort();
    sortedItemTexts.map(data => {
        return assert(data, string);
    });
});
When('I search reported merchant users by {string}', async function (search_term) {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const searchField = await driver.findElement(By.xpath('//input[@data-testid="search"]'));
    let actual_search;
    switch (search_term) {
    case 'paymaart ID':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[1]')), 5000).getText();
        actual_search = actual_search.replace(/\s+/g, ''); // Remove spaces
        break;

    case 'Merchant Name':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[2]')), 5000).getText();
        break;

    case 'Phone Number':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[3]')), 5000).getText();
        actual_search = actual_search.replace(/\s+/g, ''); // Remove spaces
        break;

    case 'Email':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[4]')), 5000).getText();
        break;

    default:
        throw new Error(`Invalid search term: ${search_term}`);
    }
    await searchField.clear();
    await searchField.sendKeys(actual_search);
    await driver.sleep(2000);
});

Then('I should see the reported merchant user based on the {string}', async function (search_term) {
    const expected_search = await driver.findElement(By.xpath('//input[@data-testid="search"]')).getAttribute('value');
    let actual_search;
    await new Promise(resolve => setTimeout(resolve, 500));
    switch (search_term) {
    case 'paymaart ID':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[1]')), 5000).getText();
        actual_search = actual_search.replace(/\s+/g, ''); // Remove spaces
        break;

    case 'Merchant Name':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[2]')), 5000).getText();
        break;

    case 'Phone Number':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[3]')), 5000).getText();
        actual_search = actual_search.replace(/\s+/g, ''); // Remove spaces
        break;

    case 'Email':
        actual_search = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[4]')), 5000).getText();
        break;

    default:
        throw new Error(`Invalid search term: ${search_term}`);
    }
    assert.strictEqual(actual_search, expected_search, `Expected ${expected_search} but found ${actual_search}`);
});

When('I click on view reported merchant', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    id = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[1]')), 5000).getText();
    merchant_name = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[2]')), 5000).getText();
    phone_number = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[4]')), 5000).getText();
    email = await driver.wait(until.elementLocated(By.xpath('//tbody/tr[1]/td[4]')), 5000).getText();
    await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]')), 5000).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});
Then('I should see all the valid details of reported merchant', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(id ,merchant_name ,phone_number,email,"values" )
    const pageSource = await driver.getPageSource();
    pageSource.includes(id);
    pageSource.includes(merchant_name);
    pageSource.includes(phone_number);
    pageSource.includes(email);
});
