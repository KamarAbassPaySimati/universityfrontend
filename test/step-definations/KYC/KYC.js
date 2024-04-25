/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Given, When, Then } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const assert = require('assert');
const { driver } = require('../Driver');
const path = require('path');
const { getModifierKey } = require('../../bdd_modules/index.js');

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
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_address_details"]')));
    await driver.wait(until.elementIsVisible(element));
});

Given('I am in KYC address details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_address_details"]')));
    await driver.wait(until.elementIsVisible(element));
});

When('I click on save and continue button', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 1500));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I enter street name as {string}', async function (street_name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    if (street_name !== '') {
        await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]'))).sendKeys(street_name);
        await new Promise(resolve => setTimeout(resolve, 5000));
        await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]'))).sendKeys(Key.chord(Key.DOWN, Key.ENTER));
    }
});

When('I select the Nationality', async function () {
    // Write code here that turns the phrase above into concrete actions
    const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="nationality"]')));
    await driver.wait(until.elementIsVisible(monthly_income));
    await monthly_income.click();

    await new Promise(resolve => setTimeout(resolve, 100));

    await driver.wait(until.elementLocated(By.css('[data-testid="nationality_dropdown_list"] [data-testid="afghan"]'))).click();
});

When('I select the nature of permit as {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="nature_of_permit_dropdown"]')));
    await driver.wait(until.elementIsVisible(monthly_income));
    await monthly_income.click();

    await new Promise(resolve => setTimeout(resolve, 100));

    await driver.wait(until.elementLocated(By.css('[data-testid="nature_of_permit_dropdown_list"] [data-testid="single/multiple_entry_visa"]'))).click();
});

Then('I should see the town and district field getting pre-filled with google API data', async function () {
    // Write code here that turns the phrase above into concrete actions
    const street_name = await driver.wait(until.elementLocated(By.css('[data-testid="street_name"]')));
    await driver.wait(until.elementIsVisible(street_name));

    const town = await driver.wait(until.elementLocated(By.css('[data-testid="town_village_ta"]')));
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
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_identity_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

Given('I am in KYC identity document details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_identity_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
});

When('I select the ID document as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    if (type !== '') {
        const element = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown"]')));
        await driver.wait(until.elementIsVisible(element));
        await element.click();

        await new Promise(resolve => setTimeout(resolve, 500));

        let dropdownElement;
        switch (type) {
        case 'National ID':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="national_id"]')));
            break;
        case 'Passport':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="passport"]')));
            break;
        case 'Drivers licence':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="driver\'s_licence"]')));
            break;
        case 'Traffic register card':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="traffic_register_card"]')));
            break;
        case 'Birth certificate card':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="birth_certificate"]')));
            break;
        case 'Student ID':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="student_id"]')));
            break;
        case 'Employee ID':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="employee_id"]')));
            break;
        case 'Refugee ID':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="refugee_id"]')));
            break;
        case 'Asylum ID':
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="asylum_id"]')));
            break;
        default:
            dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="id_document_dropdown_list"] [data-testid="national_id"]')));
            break;
        }
        await driver.wait(until.elementIsVisible(dropdownElement));
        await dropdownElement.click();
    }
});

When('I upload the front image of document as {string}', async function (card_front) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (card_front !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_upload_document_front"]')));
        const filePath = path.join(__dirname, `../../support/${card_front}`);
        await element.sendKeys(filePath);
    }
});

Then('I upload the back image of document as {string}', async function (card_back) {
    // Write code here that turns the phrase above into concrete actions
    let element;
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (card_back !== '') {
        element = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_upload_document_back"]')));
        const filePath = path.join(__dirname, `../../support/${card_back}`);
        await element.sendKeys(filePath);
    }
});

Then('I should be able to view the preview of the document front and back', async function () {
    // Write code here that turns the phrase above into concrete actions
    const document_front = await driver.wait(until.elementLocated(By.css('[data-testid="view_kyc_upload_document_front"]')));
    await driver.wait(until.elementIsVisible(document_front));

    const document_back = await driver.wait(until.elementLocated(By.css('[data-testid="view_kyc_upload_document_back"]')));
    await driver.wait(until.elementIsVisible(document_back));
});

When('I click on view document front preview', async function () {
    // Write code here that turns the phrase above into concrete actions
    const document_front = await driver.wait(until.elementLocated(By.css('[data-testid="view_kyc_upload_document_front"]')));
    await driver.wait(until.elementIsVisible(document_front));
    await document_front.click();
});

Then('I should view the preview of the uploaded document', async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.wait(until.elementLocated(By.css('[data-testid="overview-modal"]')));
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.executeScript('return document.querySelector(\'[data-testid="close-button"]\').click()');
    await new Promise(resolve => setTimeout(resolve, 1500));
});

When('I click on capture', async function () {
    // Write code here that turns the phrase above into concrete actions
    const capture = await driver.wait(until.elementLocated(By.css('[data-testid="capture"]')));
    await driver.wait(until.elementIsVisible(capture));
    await capture.click();
});

Then('I should view the selfie capture modal', async function () {
    // Write code here that turns the phrase above into concrete actions
    const selfie_modal = await driver.wait(until.elementLocated(By.css('[data-testid="modal"]')));
    await driver.wait(until.elementIsVisible(selfie_modal));

    const selfieModalTitle = await driver.wait(until.elementLocated(By.css('[data-testid="modal-title"]')));
    await driver.wait(until.elementIsVisible(selfie_modal));

    await new Promise(resolve => setTimeout(resolve, 100));

    const selfieModalTitleText = await selfieModalTitle.getText();
    assert.equal(selfieModalTitleText, 'Biometrics | Live selfie');
});

When('I click on capture selfie', async function () {
    // Write code here that turns the phrase above into concrete actions
    const capture_selfie = await driver.wait(until.elementLocated(By.css('[data-testid="capture_selfie"]')));
    await driver.wait(until.elementIsVisible(capture_selfie));
    await capture_selfie.click();
});

Then('I should view re-capture or submit button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const capture_selfie = await driver.wait(until.elementLocated(By.css('[data-testid="re_capture_selfie"]')));
    await driver.wait(until.elementIsVisible(capture_selfie));

    const submit_button = await driver.wait(until.elementLocated(By.css('[data-testid="selfie_looks_good"]')));
    await driver.wait(until.elementIsVisible(submit_button));
});

When('I click on selfie looks good button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="selfie_looks_good"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I click on re-capture button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="re_capture_selfie"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should view selfie capture again', async function () {
    // Write code here that turns the phrase above into concrete actions
    const capture_selfie = await driver.wait(until.elementLocated(By.css('[data-testid="capture_selfie"]')));
    await driver.wait(until.elementIsVisible(capture_selfie));
});

Then('I should view the image getting captured', async function () {
    const uploaded_selfie = await driver.wait(until.elementLocated(By.css('[data-testid="uploaded_selfie"]')));
    await driver.wait(until.elementIsVisible(uploaded_selfie));
});

When('I click on verification documents tab', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document_tab"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I select the verification document as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document_dropdown"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();

    await new Promise(resolve => setTimeout(resolve, 1000));

    let dropdownElement;
    switch (type) {
    case 'Driver’s licence':
        dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document_dropdown_list"] [data-testid="driver\'s_licence"]')));
        await driver.wait(until.elementIsVisible(dropdownElement));
        await dropdownElement.click();
        break;
    case 'Traffic register card':
        dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document_dropdown_list"] [data-testid="traffic_register_card"]')));
        await driver.wait(until.elementIsVisible(dropdownElement));
        await dropdownElement.click();
        break;
    case 'Birth certificate card':
        dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document_dropdown_list"] [data-testid="birth_certificate"]')));
        await driver.wait(until.elementIsVisible(dropdownElement));
        await dropdownElement.click();
        break;
    case 'Employer letter':
        dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document_dropdown_list"] [data-testid="employer_letter"]')));
        await driver.wait(until.elementIsVisible(dropdownElement));
        await dropdownElement.click();
        break;
    case 'Institute letter':
        dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document_dropdown_list"] [data-testid="institute_letter"]')));
        await driver.wait(until.elementIsVisible(dropdownElement));
        await dropdownElement.click();
        break;
    case 'Religious Institution/ District Commissioner Letter':
        dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="verification_document_dropdown_list"] [data-testid="religious_institution/_district_commissioner_letter"]')));
        await driver.wait(until.elementIsVisible(dropdownElement));
        await dropdownElement.click();
        break;
    default:
        dropdownElement = await driver.wait(until.elementLocated(By.css('[data-testid="driver\'s_licence"]')));
        await driver.wait(until.elementIsVisible(dropdownElement));
        await dropdownElement.click();
        break;
    }
});

Then('I should be redirected to KYC personal details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_personal_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));
    await new Promise(resolve => setTimeout(resolve, 500));

    await driver.executeScript('window.location.reload();');

    const element2 = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_personal_details_screen"]')));
    await driver.wait(until.elementIsVisible(element2));
    await new Promise(resolve => setTimeout(resolve, 500));
});

Given('I am in KYC personal details screen', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_personal_details_screen"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.executeScript('window.location.reload();');

    const element2 = await driver.wait(until.elementLocated(By.css('[data-testid="kyc_personal_details_screen"]')));
    await driver.wait(until.elementIsVisible(element2));
    await new Promise(resolve => setTimeout(resolve, 1000));
});

When('I select gender as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[for="Male"]')));
    await driver.wait(until.elementIsVisible(element));

    await new Promise(resolve => setTimeout(resolve, 500));

    switch (type) {
    case 'male':
        await driver.wait(until.elementLocated(By.css('[for="Male"]'))).click();
        break;
    case 'female':
        await driver.wait(until.elementLocated(By.css('[for="Female"]'))).click();
        break;
    case 'other':
        await driver.wait(until.elementLocated(By.css('[for="Undisclosed"]'))).click();
        break;
    default:
        await driver.wait(until.elementLocated(By.css('[for="Undisclosed"]'))).click();
        break;
    }
});

When('I select the date of birth as {string}', async function (dob) {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 100));
    await driver.wait(until.elementLocated(By.css('[data-testid="date_of_birth"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="date_of_birth"]'))).sendKeys(Key.chord(dob, Key.ENTER));
    await new Promise(resolve => setTimeout(resolve, 500));
});

When('I select the Occupation as {string}', async function (type) {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="occupation_dropdown"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();

    await new Promise(resolve => setTimeout(resolve, 1000));

    switch (type) {
    case 'Employed':
        await driver.wait(until.elementLocated(By.css('[data-testid="employed"]'))).click();
        break;
    case 'Self Employed':
        await driver.wait(until.elementLocated(By.css('[data-testid="self_employed"]'))).click();
        break;
    case 'In Full time education':
        await driver.wait(until.elementLocated(By.css('[data-testid="in_full-time_education"]'))).click();
        break;
    case 'Seeking employment':
        await driver.wait(until.elementLocated(By.css('[data-testid="seeking_employment"]'))).click();
        break;
    case 'Retired/Pensioner':
        await driver.wait(until.elementLocated(By.css('[data-testid="retired/pensioner"]'))).click();
        break;
    case 'Others':
        await driver.wait(until.elementLocated(By.css('[data-testid="others"]'))).click();
        break;
    default:
        await driver.wait(until.elementLocated(By.css('[data-testid="others"]'))).click();
        break;
    }
});

When('I search and select institution as {string}', async function (instituion) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="institute"]')));
    await driver.wait(until.elementIsVisible(element));

    await new Promise(resolve => setTimeout(resolve, 100));

    await driver.wait(until.elementLocated(By.css('[data-testid="institute"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await driver.wait(until.elementLocated(By.css('[data-testid="institute"]'))).sendKeys(instituion);

    await driver.wait(until.elementLocated(By.css('[data-testid="institute_0"]'))).click();
});

When('I enter the other institution name as {string}', async function (name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="institute_specify"]')));
    await driver.wait(until.elementIsVisible(element));

    await new Promise(resolve => setTimeout(resolve, 100));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(name);
});

When('I enter the reference number as {string}', async function (name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="ref_no"]')));
    await driver.wait(until.elementIsVisible(element));

    await new Promise(resolve => setTimeout(resolve, 100));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(name);
});

When('I select the applicable purpose and nature of business', async function () {
    // Write code here that turns the phrase above into concrete actions
    await new Promise(resolve => setTimeout(resolve, 100));

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="purpose_0"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="purpose_0"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="purpose_1"]'))).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="purpose_2"]'))).click();
});

When('I select valid monthly income and monthly withdrawal', async function () {
    // Write code here that turns the phrase above into concrete actions
    const monthly_income = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_income"]')));
    await driver.wait(until.elementIsVisible(monthly_income));
    await monthly_income.click();

    await new Promise(resolve => setTimeout(resolve, 100));

    await driver.wait(until.elementLocated(By.css('[data-testid="monthly_income_dropdown_list"] [data-testid="300,000.00_to_1,000,000.00_mwk"]'))).click();

    const monthly_withdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_withdrawal"]')));
    await driver.wait(until.elementIsVisible(monthly_withdrawal));
    await monthly_withdrawal.click();

    await new Promise(resolve => setTimeout(resolve, 100));

    await driver.wait(until.elementLocated(By.css('[data-testid="monthly_withdrawal_dropdown_list"] [data-testid="300,000.00_to_1,000,000.00_mwk"]'))).click();
});

Then('I should read a message stating KYC submission successful', async function () {
    // Write code here that turns the phrase above into concrete actions
    const expected_text = 'Thank you for providing your information. This is received into our review process. We will confirm its acceptance or otherwise shortly. To your registered email address.';

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="KYC_success_message"]')));
    await driver.wait(until.elementIsVisible(element));
    const element_text = await element.getText();

    assert.equal(element_text, expected_text);
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
    const document_front = await driver.wait(until.elementLocated(By.css('[data-testid="view_kyc_upload_document_front"]')));
    await driver.wait(until.elementIsVisible(document_front));
});

When('I enter the other occupation as {string}', async function (occupation) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="occupation_specify"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(occupation);
});

When('I enter the other self employed occupation as {string}', async function (occupation) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="self_employed_specify"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(occupation);
});

When('I select employed as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="employed_role"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();

    await new Promise(resolve => setTimeout(resolve, 500));

    switch (type) {
    case 'Admin/Administrative/Clerical':
        await driver.wait(until.elementLocated(By.css('[data-testid="admin/administrative/clerical"]'))).click();
        break;
    case 'Trainee/Intern/Apprentice':
        await driver.wait(until.elementLocated(By.css('[data-testid="trainee/intern/apprentice"]'))).click();
        break;
    case 'Professionals/Technical':
        await driver.wait(until.elementLocated(By.css('[data-testid="professionals/technical"]'))).click();
        break;
    case 'Professionals/Technical/Manager':
        await driver.wait(until.elementLocated(By.css('[data-testid="professionals/technical/manager"]'))).click();
        break;
    case 'Board Level/Non-Executive':
        await driver.wait(until.elementLocated(By.css('[data-testid="board_level/non-executive"]'))).click();
        break;
    default:
        await driver.wait(until.elementLocated(By.css('[data-testid="board_level/non-executive"]'))).click();
        break;
    }
});

When('I enter employer name as {string}', async function (name) {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="employer_name"]')));
    await driver.wait(until.elementIsVisible(element));

    await element.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);
    await element.sendKeys(name);
});

When('I select industry sector as {string}', async function (sector) {
    // Write code here that turns the phrase above into concrete actions
    if (sector !== '') {
        const element = await driver.wait(until.elementLocated(By.css('[data-testid="industry"]')));
        await driver.wait(until.elementIsVisible(element));
        await element.click();

        await new Promise(resolve => setTimeout(resolve, 500));

        switch (sector) {
        case 'Education services':
            await driver.wait(until.elementLocated(By.css('[data-testid="education_services"]'))).click();
            break;
        case 'Transport & Storage Services':
            await driver.wait(until.elementLocated(By.css('[data-testid="transport_&_storage_services"]'))).click();
            break;
        case 'Real Estate Activities':
            await driver.wait(until.elementLocated(By.css('[data-testid="real_estate_activities"]'))).click();
            break;
        case 'Information & Communication':
            await driver.wait(until.elementLocated(By.css('[data-testid="information_&_communication"]'))).click();
            break;
        case 'Healthcare Services':
            await driver.wait(until.elementLocated(By.css('[data-testid="healthcare_service"]'))).click();
            break;
        default:
            await driver.wait(until.elementLocated(By.css('[data-testid="healthcare_service"]'))).click();
            break;
        }
    }
});

When('I select valid town and district', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="occupation_town"]')));
    await driver.wait(until.elementIsVisible(element));

    await driver.wait(until.elementLocated(By.css('[data-testid="occupation_town"]'))).sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);

    await driver.wait(until.elementLocated(By.css('[data-testid="occupation_town"]'))).sendKeys('M');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await driver.wait(until.elementLocated(By.css('[data-testid="occupation_town"]'))).sendKeys(Key.chord(Key.DOWN, Key.ENTER));
});

When('I click on skip button', async function () {
    // Write code here that turns the phrase above into concrete actions
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="skip_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I select the citizenship type as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    if (type !== '') {
        switch (type) {
        case 'Malawi':
            await driver.wait(until.elementLocated(By.css('[data-testid="malawi_citizen"]'))).click();
            break;
        case 'Non-Malawi':
            await driver.wait(until.elementLocated(By.css('[data-testid="non_malawi_citizen"]'))).click();
            break;
        default:
            await driver.wait(until.elementLocated(By.css('[data-testid="non_malawi_citizen"]'))).click();
            break;
        }
    }
});

When('I select the KYC type as {string}', async function (type) {
    // Write code here that turns the phrase above into concrete actions
    if (type !== '') {
        switch (type) {
        case 'Full KYC':
            await driver.wait(until.elementLocated(By.css('[for="Full KYC"]'))).click();
            break;
        case 'Simplified KYC':
            await driver.wait(until.elementLocated(By.css('[for="Simplified KYC"]'))).click();
            break;
        default:
            await driver.wait(until.elementLocated(By.css('[for="Simplified KYC"]'))).click();
            break;
        }
    }
});

When('I should view monthly income and monthly withdrawal selected as {string}', async function (expectedValue) {
    // Write code here that turns the phrase above into concrete actions
    const monthlyIncome = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_income"]')));
    await driver.wait(until.elementIsVisible(monthlyIncome));
    const monthlyIncomeValue = await monthlyIncome.getAttribute('value');

    assert.equal(monthlyIncomeValue, expectedValue);
    await new Promise(resolve => setTimeout(resolve, 100));

    const monthlyWithdrawal = await driver.wait(until.elementLocated(By.css('[data-testid="monthly_withdrawal"]')));
    await driver.wait(until.elementIsVisible(monthlyWithdrawal));
    const monthlyWithdrawalValue = await monthlyIncome.getAttribute('value');
    assert.equal(monthlyWithdrawalValue, expectedValue);
});
