const { Given, When, Then } = require('@cucumber/cucumber');
const { until, By } = require('selenium-webdriver');

When('I click on view button for bank details',async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="view-0"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  // clear_filter
Then('I click on the apply filter button',async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="apply_filter"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

Then('I should see prefilled fields for bank details',async function () {
    const refNo = await driver.wait(until.elementLocated(By.css('[data-testid="refNoField"]'))).getText();
    const Name = await driver.wait(until.elementLocated(By.css('[data-testid="nameField"]'))).getText();
    const accountNumber = await driver.wait(until.elementLocated(By.css('[data-testid="accountNumberField"]'))).getText();
    const purpose = await driver.wait(until.elementLocated(By.css('[data-testid="purposeField"]'))).getText();
    const lastUpdateDate = await driver.wait(until.elementLocated(By.css('[data-testid="lastUpdateField"]'))).getText();
    const balance = await driver.wait(until.elementLocated(By.css('[data-testid="balanceField"]'))).getText();

    await assert.notEqual(refNo, '-');
    await assert.notEqual(Name, '-');
    await assert.notEqual(accountNumber, '-');
    await assert.notEqual(purpose, '-');
    await assert.notEqual(lastUpdateDate, '-');
    await assert.notEqual(balance, '-');

    await assert.notEqual(refNo, '');
    await assert.notEqual(Name, '');
    await assert.notEqual(accountNumber, '');
    await assert.notEqual(purpose, '');
    await assert.notEqual(lastUpdateDate, '');
    await assert.notEqual(balance, '');

  });

Then('I should be navigated to bank details page',async function () {
    await driver.get('http://localhost:3000/paymartbanks/bankdetails');
    await new Promise(resolve => setTimeout(resolve, 4000));
  });

Then('I select start date as {string}',async function (start) {
    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="startDate"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="startDate"]'))).sendKeys(Key.chord(start, Key.ENTER));
    await new Promise(resolve => setTimeout(resolve, 500));
  });

Then('I select end date as {string}',async function (end) {
    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="endDate"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="endDate"]'))).sendKeys(Key.chord(end, Key.ENTER));
    await new Promise(resolve => setTimeout(resolve, 500));
  });

Then('I should see list of transactions where between {string} and {string}',async function (start, end) {
    let filterAppliedStartDate = new Date(start);
    let filterAppliedEndDate = new Date(end);


    items = await driver.wait(until.elementsLocated(By.css(`[data-testid="dateRow"]`))); // replace with the table date row
    item_texts = await Promise.all(items.map((item) => {
        item.getText()
        return new Date(item)
    }));
    item_texts.map(data => {
        assert.ok(data >= filterAppliedStartDate && data <= filterAppliedEndDate)
    })
  });