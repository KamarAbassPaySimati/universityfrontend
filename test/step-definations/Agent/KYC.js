/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../Driver');
const path = require('path');

Before(async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
});

Given('I click on verify KYC', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verify_KYC"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should be redirected to KYC verification screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="malawi_citizen"]')));
    await driver.wait(until.elementIsVisible(element));

    const element2 = await driver.wait(until.elementLocated(By.css('[data-testid="non_malawi_citizen"]')));
    await driver.wait(until.elementIsVisible(element2));
});

Then('I should be redirected to KYC address details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_address_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

Given('I am in KYC address details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_address_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

When('I click on save and continue button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="save_and_continue"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I enter street name as {string}', async function (street_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    if (street_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]'))).sendKeys(street_name);
        await driver.wait(until.elementLocated(By.css('[data-testid="street_name_list_0"]'))).click();
    }
});

Then('I should see the town and district field getting pre-filled with google API data', async function () {
    // Write code here that turns the phrase above into concrete actions
    const street_name = await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]')));
    await driver.wait(until.elementIsVisible(street_name));

    const town = await driver.wait(until.elementLocated(By.css('[data-testid="town"]')));
    await driver.wait(until.elementIsVisible(town));

    const district = await driver.wait(until.elementLocated(By.css('[data-testid="district"]')));
    await driver.wait(until.elementIsVisible(district));

    const street_name_value = street_name.getAttribute('value');
    const town_value = town.getAttribute('value');
    const district_value = district.getAttribute('value');

    assert.notEqual(street_name_value, '');
    assert.notEqual(town_value, '');
    assert.notEqual(district_value, '');
});

Then('I should be redirected to KYC identity details screen', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_identity_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

Given('I am in KYC identity document details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_identity_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

When('I select the ID document as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="ID_Document"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();

    switch (type) {
    case 'National ID':
        await driver.wait(until.elementLocated(By.css('[data-testid="list-0"]'))).click();
        break;
    case 'Passport':
        await driver.wait(until.elementLocated(By.css('[data-testid="list-1"]'))).click();
        break;
    default:
        break;
    }
});

When('I upload the front image of document as {string}', async function (card_front) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    if (card_front !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="browse_front"]')));
        const filePath = path.join(__dirname, `../support/${card_front}`);
        await element.sendKeys(filePath);
        await new Promise(resolve => setTimeout(resolve, 7000));
    }
});

Then('I upload the back image of document as {string}', async function (card_back) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    if (card_back !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="browse_back"]')));
        const filePath = path.join(__dirname, `../support/${card_back}`);
        await element.sendKeys(filePath);
        await new Promise(resolve => setTimeout(resolve, 7000));
    }
});

Then('I should be able to view the preview of the document front and back', async function () {
    // Write code here that turns the phrase above into concrete actions
    const document_front = await driver.wait(until.elementLocated(By.css('[data-testid="document_front"]')));
    await driver.wait(until.elementIsVisible(document_front));

    const document_back = await driver.wait(until.elementLocated(By.css('[data-testid="document_front"]')));
    await driver.wait(until.elementIsVisible(document_back));
});

When('I click on view document front preview', async function () {
    // Write code here that turns the phrase above into concrete actions
    const document_front = await driver.wait(until.elementLocated(By.css('[data-testid="document_front_view"]')));
    await driver.wait(until.elementIsVisible(document_front));
    await document_front.click();
});

Then('I should view the preview of the uploaded document', async function () {
    // Write code here that turns the phrase above into concrete actions
    const document_front = await driver.wait(until.elementLocated(By.css('[data-testid="preview_modal"] img')));
    await driver.wait(until.elementIsVisible(document_front));

    const close_button = await driver.wait(until.elementLocated(By.css('[data-testid="close_button"]')));
    await driver.wait(until.elementIsVisible(close_button));
    await close_button.click();
});

When('I click on capture', async function () {
    // Write code here that turns the phrase above into concrete actions
    const capture = await driver.wait(until.elementLocated(By.css('[data-testid="capture"]')));
    await driver.wait(until.elementIsVisible(capture));
    await capture.click();
});

Then('I should view the selfie capture modal', async function () {
    // Write code here that turns the phrase above into concrete actions
    const selfie_modal = await driver.wait(until.elementLocated(By.css('[data-testid="selfie_modal"]')));
    await driver.wait(until.elementIsVisible(selfie_modal));
});

When('I click on capture selfie', async function () {
    // Write code here that turns the phrase above into concrete actions
    const capture_selfie = await driver.wait(until.elementLocated(By.css('[data-testid="capture_selfie"]')));
    await driver.wait(until.elementIsVisible(capture_selfie));
    await capture_selfie.click();
});

Then('I should view re-capture or submit button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const capture_selfie = await driver.wait(until.elementLocated(By.css('[data-testid="re-capture_selfie"]')));
    await driver.wait(until.elementIsVisible(capture_selfie));

    const submit_button = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(submit_button));
});

When('I click on re-capture button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="re-capture_selfie"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should view selfie capture again', async function () {
    // Write code here that turns the phrase above into concrete actions
    const capture_selfie = await driver.wait(until.elementLocated(By.css('[data-testid="capture_selfie"]')));
    await driver.wait(until.elementIsVisible(capture_selfie));
});

Then('I should view the image getting captured', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on verification documents tab', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verification_tab"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I select the verification document as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();

    switch (type) {
    case 'Driver’s licence':
        await driver.wait(until.elementLocated(By.css('[data-testid="list-0"]'))).click();
        break;
    case 'Traffic register card ':
        await driver.wait(until.elementLocated(By.css('[data-testid="list-1"]'))).click();
        break;
    case 'Birth certificate':
        await driver.wait(until.elementLocated(By.css('[data-testid="list-2"]'))).click();
        break;
    case 'Employer letter':
        await driver.wait(until.elementLocated(By.css('[data-testid="list-3"]'))).click();
        break;
    case 'Institute letter':
        await driver.wait(until.elementLocated(By.css('[data-testid="list-4"]'))).click();
        break;
    default:
        break;
    }
});

Then('I should be redirected to KYC personal details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_personal_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

Given('I am in KYC personal details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_personal_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

When('I select gender as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="gender-0"]')));
    await driver.wait(until.elementIsVisible(element));

    switch (type) {
    case 'male':
        await driver.wait(until.elementLocated(By.css('[data-testid="gender-0"]'))).click();
        break;
    case 'female':
        await driver.wait(until.elementLocated(By.css('[data-testid="gender-1"]'))).click();
        break;
    case 'other':
        await driver.wait(until.elementLocated(By.css('[data-testid="gender-2"]'))).click();
        break;
    default:
        break;
    }
});

When('I select the date of birth as {string}', async function (dob) {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="date_of_birth"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="date_of_birth"]'))).sendKeys(dob);
});

When('I select the Occupation as {string}', async function (type) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="occupation"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();

    switch (type) {
    case 'Employed':
        await driver.wait(until.elementLocated(By.css('[data-testid="occupation-0"]'))).click();
        break;
    case 'Self Employed':
        await driver.wait(until.elementLocated(By.css('[data-testid="occupation-1"]'))).click();
        break;
    case 'In full time education':
        await driver.wait(until.elementLocated(By.css('[data-testid="occupation-2"]'))).click();
        break;
    case 'Seeking employment':
        await driver.wait(until.elementLocated(By.css('[data-testid="occupation-3"]'))).click();
        break;
    case 'Ritired/Pensioner':
        await driver.wait(until.elementLocated(By.css('[data-testid="occupation-4"]'))).click();
        break;
    case 'Others':
        await driver.wait(until.elementLocated(By.css('[data-testid="occupation-5"]'))).click();
        break;
    default:
        break;
    }
});

When('I search and select institution as {string}', async function (instituion) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="instituion"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="search"]'))).sendKeys(instituion);

    await driver.wait(until.elementLocated(By.css('[data-testid="instituion-0"]'))).click();
});

When('I enter the other institution name as {string}', async function (name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="Other_instituion"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await element.sendKeys(name);
});

When('I select the applicable purpose and nature of business', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="purpose-0"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="purpose-0"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="purpose-1"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="purpose-2"]'))).click();
});

When('I select valid monthly income and monthly withdrawal', async function () {
    // Write code here that turns the phrase above into concrete actions
    const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_income"]')));
    await driver.wait(until.elementIsVisible(monthly_income));
    await monthly_income.click();
    await driver.wait(until.elementLocated(By.css('[data-testid="monthly_income_0"]'))).click();

    const monthly_withdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_withdrawal"]')));
    await driver.wait(until.elementIsVisible(monthly_withdrawal));
    await monthly_withdrawal.click();
    await driver.wait(until.elementLocated(By.css('[data-testid="monthly_widthdrawal_0"]'))).click();
});

Then('I should read a message stating KYC submission successful', async function () {
    // Write code here that turns the phrase above into concrete actions
    const expected_text = 'Thank you for providing your information. This is received into our review process. We will confirm its acceptance or otherwise shortly. To your registered email address.';

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_success_message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(expected_text, element_text);
});

Then('I should view the status of the KYC as {string}', async function (expected_text) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_status"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(expected_text, element_text);
});

Then('I should be able to view the preview of the document front', async function () {
    // Write code here that turns the phrase above into concrete actions
    const document_front = await driver.wait(until.elementLocated(By.css('[data-testid="document_front"]')));
    await driver.wait(until.elementIsVisible(document_front));
});

When('I enter the other occupation as {string}', async function (occupation) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="Other_occupation"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await element.sendKeys(occupation);
});

When('I select employed as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="employed"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();

    switch (type) {
    case 'Admin/Administrative /Clerical':
        await driver.wait(until.elementLocated(By.css('[data-testid="employed-0"]'))).click();
        break;
    case 'Trainee/Intern/Apprentice':
        await driver.wait(until.elementLocated(By.css('[data-testid="employed-1"]'))).click();
        break;
    case 'Professionals/Technical':
        await driver.wait(until.elementLocated(By.css('[data-testid="employed-2"]'))).click();
        break;
    case 'Professionals/Technical/Manager':
        await driver.wait(until.elementLocated(By.css('[data-testid="employed-3"]'))).click();
        break;
    case 'Board Level/Non-Executive':
        await driver.wait(until.elementLocated(By.css('[data-testid="employed-4"]'))).click();
        break;
    default:
        break;
    }
});

When('I enter employer name as {string}', async function (name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="employer_name"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    await element.sendKeys(name);
});

When('I select industry sector as {string}', async function (sector) {
    // Write code here that turns the phrase above into concrete actions
    if (sector !== '') {
        const element = await driver.wait(until.elementLocated(By.css('[data-testid="industry_sector"]')));
        await driver.wait(until.elementIsVisible(element));
        await element.click();

        switch (sector) {
        case 'Education Services ':
            await driver.wait(until.elementLocated(By.css('[data-testid="industry-0"]'))).click();
            break;
        case 'Transport & Storage Services':
            await driver.wait(until.elementLocated(By.css('[data-testid="industry-1"]'))).click();
            break;
        case 'Real Estate Activities':
            await driver.wait(until.elementLocated(By.css('[data-testid="industry-2"]'))).click();
            break;
        case 'Information & Communication':
            await driver.wait(until.elementLocated(By.css('[data-testid="industry-3"]'))).click();
            break;
        case 'Healthcare Services':
            await driver.wait(until.elementLocated(By.css('[data-testid="industry-4"]'))).click();
            break;
        default:
            break;
        }
    }
});

When('I select valid town and district', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]'))).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);

    await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]'))).sendKeys('Maple Avenue');
    await driver.wait(until.elementLocated(By.css('[data-testid="street_name_list_0"]'))).click();
});

When('I click on skip button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="skip_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});
