/* eslint-disable camelcase */
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const webdriver = require('selenium-webdriver');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const Keys = webdriver.Key;
const { faker } = require('@faker-js/faker');
const path = require('path');
const assert = require('assert');
const {
    extractQRCodeData,
    generateTOTP,
    saveLocalStorageData,
    loadLocalStorageData
} = require('../../bdd_modules/index.js');
const { getMFASecret, addAdminUser, deleteAdminAccount } = require('../../bdd_api/index.js');
const { driver } = require('../Driver.js');

async function login () {
    await driver.get('http://localhost:3000/');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Login"]')));

    await new Promise(resolve => setTimeout(resolve, 750));
    global.adminUser = {
        pass: 'Admin@123',
        email_address: 'bharath.shet+admin@7edge.com'
    };

    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.adminUser.email_address);
    await driver.wait(until.elementLocated(By.css('[data-testid="password"]'))).sendKeys(global.adminUser.pass);

    await driver.wait(until.elementLocated(By.css('[data-testid="login_button"]'))).click();

    const response = await getMFASecret({ username: global.adminUser.email_address });
    const secret = response.mfa_code;
    console.log('secret 123', secret);
    global.TOTP = await generateTOTP(secret, 0);

    await new Promise(resolve => setTimeout(resolve, 100));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Keys.BACK_SPACE);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    await driver.wait(until.elementLocated(By.id('digit-0')));
    for (let i = 0; i < global.TOTP.length; i++) {
        await driver.wait(until.elementLocated(By.id(`digit-${i}`))).sendKeys(global.TOTP[i]);
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_totp_form"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
}

async function create_new_user_and_login () {
    await driver.get('http://localhost:3000/');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Login"]')));

    await new Promise(resolve => setTimeout(resolve, 750));

    await new Promise(resolve => setTimeout(resolve, 750));
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.adminUser.email_address);
    await driver.wait(until.elementLocated(By.css('[data-testid="password"]'))).sendKeys(global.adminUser.pass);

    await driver.wait(until.elementLocated(By.css('[data-testid="login_button"]'))).click();

    await new Promise(resolve => setTimeout(resolve, 750));
    const qr_code = await driver.wait(until.elementLocated(By.css('[data-testid="qr_code"]')));
    await driver.wait(until.elementIsVisible(qr_code));

    const canvasElement = await driver.wait(until.elementLocated(By.css('canvas')));
    await driver.wait(until.elementIsVisible(canvasElement));

    const canvas_data = await driver.executeScript(() => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return imageData;
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    const qr_code_data = extractQRCodeData(canvas_data);

    console.log('qr_code_data', qr_code_data);
    // Split the URI by the '?' character to get the parameters
    const uriParts = qr_code_data.split('?');
    // Iterate through the parameters to find the 'secret' parameter
    let secret;
    for (const param of uriParts[1].split('&')) {
        const [key, value] = param.split('=');
        if (key === 'secret') {
            secret = value;
            break;
        }
    }

    global.TOTP = await generateTOTP(secret, 0);
    console.log('TOPTP', global.TOTP);

    await new Promise(resolve => setTimeout(resolve, 100));
    const proceed_to_next = await driver.wait(until.elementLocated(By.css('[data-testid="proceed_next_button"]')));
    await driver.wait(until.elementIsVisible(proceed_to_next));
    await proceed_to_next.click();

    await new Promise(resolve => setTimeout(resolve, 100));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Keys.BACK_SPACE);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    await driver.wait(until.elementLocated(By.id('digit-0')));
    for (let i = 0; i < global.TOTP.length; i++) {
        await driver.wait(until.elementLocated(By.id(`digit-${i}`))).sendKeys(global.TOTP[i]);
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_totp_form"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
    await new Promise(resolve => setTimeout(resolve, 2000));

    const done_button = await driver.wait(until.elementLocated(By.css('[data-testid="done_button"]')));
    await driver.wait(until.elementIsVisible(done_button));
    done_button.click();
}
Before('@perform_logout', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.executeScript('window.localStorage.clear();');
    await driver.executeScript('window.location.reload();');
    await new Promise(resolve => setTimeout(resolve, 2000));
});

Before('@login', async function () {
    const localStorageFilePath = path.join(__dirname, 'localStorageData.json');
    console.log('globale', global.is_user_logged_in === false && global.perform_login === true);
    if (global.is_user_logged_in === false && global.perform_login === true) {
        await login();
        await saveLocalStorageData(localStorageFilePath);
        global.is_user_logged_in = true;
    } else if (global.is_user_logged_in === false) {
        await loadLocalStorageData(localStorageFilePath);
        global.is_user_logged_in = true;
    }
});

Before('@add_admin_user', async function () {
    try {
        const random_number = faker.string.alphanumeric(5);
        const email = `bharath.shet+${random_number}@7edge.com`;
        const firstName = faker.person.firstName();
        const middleName = faker.person.middleName();
        const lastName = faker.person.lastName();
        const phoneNumber = `${faker.phone.number('+265#######')}`;
        const paymaartId = `PMT${faker.string.numeric({ length: { min: 5, max: 7 } })}`;
        const fullName = `${firstName} ${middleName} ${lastName.toUpperCase()}`;
        const payload = {
            first_name: firstName,
            username: email,
            middle_name: middleName,
            last_name: lastName,
            password: 'Admin@123',
            paymaart_id: paymaartId,
            email,
            role: 'Super Admin',
            phone_number: phoneNumber
        };

        global.adminUser = {
            pass: 'Admin@123',
            email_address: email,
            first_name: firstName,
            username: email,
            middle_name: middleName,
            last_name: lastName,
            role: 'Super Admin',
            phone_number: phoneNumber,
            paymaart_id: paymaartId,
            fullName
        };
        await addAdminUser(payload);
    } catch (error) {
        console.log('error', error);
    }
});

Before('@create_new_user_and_login', async function () {
    try {
        await create_new_user_and_login();
    } catch (error) {
        console.log('err', error);
    }
});
After('@delete_admin_account', async function () {
    try {
        const payload = {
            username: global.adminUser.email_address
        };
        const response = await deleteAdminAccount(payload);
        console.log('response of deleted acc', response);
    } catch (error) {
        console.log('error', error);
    }
});

Given('I am on the login screen', async function () {
    await driver.get('http://localhost:3000');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Login"]')));
});

When('I enter valid email address and password', async function () {
    await new Promise(resolve => setTimeout(resolve, 750));
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.adminUser.email_address);
    await driver.wait(until.elementLocated(By.css('[data-testid="password"]'))).sendKeys(global.adminUser.pass);
});

When('I enter the email address as {string} and password as {string}', async function (email_address, password) {
    await new Promise(resolve => setTimeout(resolve, 750));
    global.adminUser = {
        pass: password,
        email_address
    };

    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.adminUser.email_address);
    await driver.wait(until.elementLocated(By.css('[data-testid="password"]'))).sendKeys(global.adminUser.pass);
});

When('I submit the login form', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="login_button"]'))).click();
});

Then('I should be presented with the authenticator QR Code', async function () {
    // await driver.wait(until.elementLocated(By.xpath(`//p[text()="Setup Two Factor Authenticator"]`)))
    await new Promise(resolve => setTimeout(resolve, 750));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="qr_code"]')));
    await driver.wait(until.elementIsVisible(element));
});

Given('I am presented with the authenticator QR Code', async function () {
    await new Promise(resolve => setTimeout(resolve, 750));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="qr_code"]')));
    await driver.wait(until.elementIsVisible(element));
});

When('I click on the proceed to authenticate button', async function () {
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="proceed_next_button"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

Then('I should be navigated to the TOTP screen', async function () {
    const element = await driver.wait(until.elementLocated(By.css('#digit-0')));
    await driver.wait(until.elementIsVisible(element));
});

When('I click on the scan QR code again', async function () {
    await new Promise(resolve => setTimeout(resolve, 100));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="scan_qr_code_again"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
});

When('I scan the QR code', { timeout: 20000 }, async function () {
    const canvasElement = await driver.wait(until.elementLocated(By.css('canvas')));
    await driver.wait(until.elementIsVisible(canvasElement));

    const canvas_data = await driver.executeScript(() => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return imageData;
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    const qr_code_data = extractQRCodeData(canvas_data);

    console.log('qr_code_data', qr_code_data);
    // Split the URI by the '?' character to get the parameters
    const uriParts = qr_code_data.split('?');
    // Iterate through the parameters to find the 'secret' parameter
    let secret;
    for (const param of uriParts[1].split('&')) {
        const [key, value] = param.split('=');
        if (key === 'secret') {
            secret = value;
            break;
        }
    }

    global.TOTP = await generateTOTP(secret, 0);
    console.log('TOPTP', global.TOTP);
});

Given('I am on the TOTP screen', async function () {
    const element = await driver.wait(until.elementLocated(By.css('#digit-0')));
    await driver.wait(until.elementIsVisible(element));
});

When('I enter TOTP as {string}', async function (OTP) {
    // clear already existing TOTP
    await new Promise(resolve => setTimeout(resolve, 100));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Keys.BACK_SPACE);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 100));

    for (let i = 0; i < OTP.length; i++) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(OTP);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
});

When('I enter a valid TOTP', async function () {
    // clear already existing TOTP
    await new Promise(resolve => setTimeout(resolve, 100));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Keys.BACK_SPACE);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 100));

    await driver.wait(until.elementLocated(By.id('digit-1')));
    for (let i = 0; i < global.TOTP.length; i++) {
        await driver.wait(until.elementLocated(By.id(`digit-${i}`))).sendKeys(global.TOTP[i]);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
});

When('I submit the TOTP form', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="submit_totp_form"]')));
    await driver.wait(until.elementIsVisible(element));
    await element.click();
    await new Promise(resolve => setTimeout(resolve, 3000));
});

When('I enter the TOTP obtained from the previously scanned device', async function () {
    const response = await getMFASecret({ username: global.adminUser.email_address });
    const secret = response.mfa_code;
    console.log('secret 123', secret);
    global.TOTP = await generateTOTP(secret, 0);

    await new Promise(resolve => setTimeout(resolve, 100));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Keys.BACK_SPACE);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    await driver.wait(until.elementLocated(By.id('digit-0')));
    for (let i = 0; i < global.TOTP.length; i++) {
        await driver.wait(until.elementLocated(By.id(`digit-${i}`))).sendKeys(global.TOTP[i]);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
});

Then('I should be presented with 2FA Enabled successfully page', async function () {
    const element_header = await driver.wait(until.elementLocated(By.css('[data-testid="2FA-enabled-header"]')));
    await driver.wait(until.elementIsVisible(element_header));
    const element_header_content = await element_header.getText();
    assert.equal(element_header_content, 'Successfully Enabled');

    const element_body = await driver.wait(until.elementLocated(By.css('[data-testid="2FA-enabled-content"]')));
    await driver.wait(until.elementIsVisible(element_body));
    const element_body_content = await element_header.getText();
    console.log('element_body_content', element_body_content);
    assert.notEqual(element_body_content, '');
});

When('I click on done button', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="done_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
});
