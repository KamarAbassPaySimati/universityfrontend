/* eslint-disable camelcase */
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const webdriver = require('selenium-webdriver');
const until = require('selenium-webdriver').until;
const By = require('selenium-webdriver').By;
const Keys = webdriver.Key;
const { faker } = require('@faker-js/faker');

const { extractQRCodeData, generateTOTP } = require('../../bdd_modules/index.js');
const { getMFASecret, addAdminUser, deleteAdminAccount } = require('../../bdd_api/index.js');
const { driver } = require('../Driver.js');

Before('@perform_logout', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.executeScript('window.localStorage.clear();');
    await driver.executeScript('window.location.reload();');
    await new Promise(resolve => setTimeout(resolve, 2000));
});

Before('@add_admin_user', async function () {
    try {
        const random_number = faker.string.alphanumeric(5);
        const email = `bharath+${random_number}@7edge.com`;

        const payload = {
            username: email,
            paymaart_id: `PMT${faker.string.numeric({ length: { min: 5, max: 7 } })}`,
            password: 'Admin@123',
            email,
            phno: `${faker.phone.number('+265#######')}`
        };

        global.adminUser = {
            pass: 'Admin@123',
            email_address: email
        };
        await addAdminUser(payload);
    } catch (error) {
        console.log('error', error);
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
    await new Promise(resolve => setTimeout(resolve, 100));
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
    await new Promise(resolve => setTimeout(resolve, 100));

    await driver.wait(until.elementLocated(By.id('digit-0')));
    for (let i = 0; i < global.TOTP.length; i++) {
        await driver.wait(until.elementLocated(By.id(`digit-${i}`))).sendKeys(global.TOTP[i]);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
});
