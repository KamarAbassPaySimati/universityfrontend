/* eslint-disable camelcase */
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
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
const { getModifierKey } = require('../../bdd_modules/index.js');

function replaceTextWithSpecialChars (text) {
    const regex = /[^\w\s]/g; // Matches any character that's not alphanumeric or whitespace
    return text.replace(regex, '');
}

async function login () {
    await driver.get('http://localhost:3000/');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Login"]')));

    await new Promise(resolve => setTimeout(resolve, 750));
    global.admin_user = {
        pass: 'Admin@123',
        email_address: 'bharath.shet+admin@7edge.com'
    };

    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.admin_user.email_address);
    await driver.wait(until.elementLocated(By.css('[data-testid="password"]'))).sendKeys(global.admin_user.pass);

    await driver.wait(until.elementLocated(By.css('[data-testid="login_button"]'))).click();

    const response = await getMFASecret({ username: global.admin_user.email_address });
    const secret = response.mfa_code;
    global.TOTP = await generateTOTP(secret, 0);

    await new Promise(resolve => setTimeout(resolve, 100));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Key.BACK_SPACE);
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

    const email = await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]')));
    await driver.wait(until.elementIsVisible(email));

    const password = await driver.wait(until.elementLocated(By.css('[data-testid="password"]')));
    await driver.wait(until.elementIsVisible(password));

    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.admin_user.email_address);
    await driver.wait(until.elementLocated(By.css('[data-testid="password"]'))).sendKeys(global.admin_user.pass);

    await driver.wait(until.elementLocated(By.css('[data-testid="login_button"]'))).click();

    await new Promise(resolve => setTimeout(resolve, 750));
    const qr_code = await driver.wait(until.elementLocated(By.css('[data-testid="qr_code"]')));
    await driver.wait(until.elementIsVisible(qr_code));

    const canvasElement = await driver.wait(until.elementLocated(By.css('canvas')));
    await driver.wait(until.elementIsVisible(canvasElement));
    await new Promise(resolve => setTimeout(resolve, 750));

    const canvas_data = await driver.executeScript(() => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return imageData;
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    const qr_code_data = extractQRCodeData(canvas_data);

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

    await new Promise(resolve => setTimeout(resolve, 100));
    const proceed_to_next = await driver.wait(until.elementLocated(By.css('[data-testid="proceed_next_button"]')));
    await driver.wait(until.elementIsVisible(proceed_to_next));
    await proceed_to_next.click();

    await new Promise(resolve => setTimeout(resolve, 750));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Key.BACK_SPACE);
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

    await new Promise(resolve => setTimeout(resolve, 2000));
}
Before('@perform_logout', async function () {
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.executeScript('window.localStorage.clear();');
    await driver.executeScript('window.location.reload();');
    await new Promise(resolve => setTimeout(resolve, 2000));
});

Before('@login', async function () {
    const localStorageFilePath = path.join(__dirname, 'localStorageData.json');
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
        const random_alpha = faker.string.alpha(10);
        const email = `bharath.shet+${random_alpha}@7edge.com`;
        const first_name = replaceTextWithSpecialChars(faker.person.firstName());
        const middle_name = replaceTextWithSpecialChars(faker.person.middleName());
        const last_name = replaceTextWithSpecialChars(faker.person.lastName());
        let phone_number = `${faker.phone.number('## ### ####')}`;
        const paymaart_ID = `PMT${faker.string.numeric({ length: { min: 5, max: 7 } })}`;
        const full_name = `${first_name} ${middle_name} ${last_name.toUpperCase()}`;
        const countryCode = '+265';
        if (phone_number.startsWith('0')) {
            // Replace the first character with '9'
            phone_number = '9' + phone_number.substring(1);
        }
        const main_phone_number = `${countryCode} ${phone_number}`;

        const payload = {
            first_name,
            username: email.toLowerCase(),
            middle_name,
            last_name,
            password: 'Admin@123',
            paymaart_id: paymaart_ID,
            email: email.toLowerCase(),
            country_code: countryCode,
            role: 'Super admin',
            phone_number: phone_number.replaceAll(' ', '')
        };

        global.admin_user = {
            first_name,
            middle_name,
            last_name,
            full_name,
            pass: 'Admin@123',
            email_address: email.toLowerCase(),
            username: email.toLowerCase(),
            role: 'Super Admin',
            phone_number: main_phone_number,
            paymaart_id: paymaart_ID,
            phone_number_without_country_code: phone_number
        };
        await addAdminUser(payload);
        await new Promise(resolve => setTimeout(resolve, 4000));
    } catch (error) {
        console.log('API Error', error);
    }
});

Before('@add_finance_admin_user', async function () {
    try {
        const random_alpha = faker.string.alpha(10);
        const email = `bharath.shet+${random_alpha}@7edge.com`;
        const first_name = replaceTextWithSpecialChars(faker.person.firstName());
        const middle_name = replaceTextWithSpecialChars(faker.person.middleName());
        const last_name = replaceTextWithSpecialChars(faker.person.lastName());
        let phone_number = `${faker.phone.number('## ### ####')}`;
        const paymaart_ID = `PMT${faker.string.numeric({ length: { min: 5, max: 7 } })}`;
        const full_name = `${first_name} ${middle_name} ${last_name.toUpperCase()}`;
        const countryCode = '+265';
        if (phone_number.startsWith('0')) {
            // Replace the first character with '9'
            phone_number = '9' + phone_number.substring(1);
        }
        const main_phone_number = `${countryCode} ${phone_number}`;

        const payload = {
            first_name,
            username: email.toLowerCase(),
            middle_name,
            last_name,
            password: 'Admin@123',
            paymaart_id: paymaart_ID,
            email: email.toLowerCase(),
            country_code: countryCode,
            role: 'Finance admin',
            phone_number: phone_number.replaceAll(' ', '')
        };

        global.admin_user = {
            first_name,
            middle_name,
            last_name,
            full_name,
            pass: 'Admin@123',
            email_address: email.toLowerCase(),
            username: email.toLowerCase(),
            role: 'Finance Admin',
            phone_number: main_phone_number,
            paymaart_id: paymaart_ID,
            phone_number_without_country_code: phone_number
        };
        await addAdminUser(payload);
        await new Promise(resolve => setTimeout(resolve, 4000));
    } catch (error) {
        console.log('API Error', error);
    }
});

Before('@add_support_admin_user', async function () {
    try {
        const random_alpha = faker.string.alpha(10);
        const email = `bharath.shet+${random_alpha}@7edge.com`;
        const first_name = replaceTextWithSpecialChars(faker.person.firstName());
        const middle_name = replaceTextWithSpecialChars(faker.person.middleName());
        const last_name = replaceTextWithSpecialChars(faker.person.lastName());
        let phone_number = `${faker.phone.number('## ### ####')}`;
        const paymaart_ID = `PMT${faker.string.numeric({ length: { min: 5, max: 7 } })}`;
        const full_name = `${first_name} ${middle_name} ${last_name.toUpperCase()}`;
        const countryCode = '+265';
        if (phone_number.startsWith('0')) {
            // Replace the first character with '9'
            phone_number = '9' + phone_number.substring(1);
        }
        const main_phone_number = `${countryCode} ${phone_number}`;

        const payload = {
            first_name,
            username: email.toLowerCase(),
            middle_name,
            last_name,
            password: 'Admin@123',
            paymaart_id: paymaart_ID,
            email: email.toLowerCase(),
            country_code: countryCode,
            role: 'Support admin',
            phone_number: phone_number.replaceAll(' ', '')
        };

        global.admin_user = {
            first_name,
            middle_name,
            last_name,
            full_name,
            pass: 'Admin@123',
            email_address: email.toLowerCase(),
            username: email.toLowerCase(),
            role: 'Support Admin',
            phone_number: main_phone_number,
            paymaart_id: paymaart_ID,
            phone_number_without_country_code: phone_number
        };
        await addAdminUser(payload);
        await new Promise(resolve => setTimeout(resolve, 4000));
    } catch (error) {
        console.log('API Error', error);
    }
});

Before('@add_normal_admin_user', async function () {
    try {
        const random_alpha = faker.string.alpha(10);
        const email = `bharath.shet+${random_alpha}@7edge.com`;
        const first_name = replaceTextWithSpecialChars(faker.person.firstName());
        const middle_name = replaceTextWithSpecialChars(faker.person.middleName());
        const last_name = replaceTextWithSpecialChars(faker.person.lastName());
        let phone_number = `${faker.phone.number('## ### ####')}`;
        const paymaart_ID = `PMT${faker.string.numeric({ length: { min: 5, max: 7 } })}`;
        const full_name = `${first_name} ${middle_name} ${last_name.toUpperCase()}`;
        const countryCode = '+265';
        if (phone_number.startsWith('0')) {
            // Replace the first character with '9'
            phone_number = '9' + phone_number.substring(1);
        }
        const main_phone_number = `${countryCode} ${phone_number}`;

        const payload = {
            first_name,
            username: email.toLowerCase(),
            middle_name,
            last_name,
            password: 'Admin@123',
            paymaart_id: paymaart_ID,
            email: email.toLowerCase(),
            country_code: countryCode,
            role: 'Admin',
            phone_number: phone_number.replaceAll(' ', '')
        };

        global.admin_user = {
            first_name,
            middle_name,
            last_name,
            full_name,
            pass: 'Admin@123',
            email_address: email.toLowerCase(),
            username: email.toLowerCase(),
            role: 'Admin',
            phone_number: main_phone_number,
            paymaart_id: paymaart_ID,
            phone_number_without_country_code: phone_number
        };
        await addAdminUser(payload);
        await new Promise(resolve => setTimeout(resolve, 4000));
    } catch (error) {
        console.log('API Error', error);
    }
});

Before('@create_new_user_and_login', async function () {
    try {
        await create_new_user_and_login();
    } catch (error) {
        console.log('API Error', error);
    }
});

After('@delete_admin_account', async function () {
    try {
        const payload = {
            username: global.admin_user.email_address
        };
        await deleteAdminAccount(payload);
    } catch (error) {
        console.log('API Error', error);
    }
});

Given('I am on the login screen', async function () {
    await driver.get('http://localhost:3000');
    await new Promise(resolve => setTimeout(resolve, 500));
    await driver.wait(until.elementLocated(By.xpath('//*[text()="Login"]')));
});

When('I enter valid email address and password', async function () {
    await new Promise(resolve => setTimeout(resolve, 750));
    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.admin_user.email_address);
    await driver.wait(until.elementLocated(By.css('[data-testid="password"]'))).sendKeys(global.admin_user.pass);
});

When('I enter the email address as {string} and password as {string}', async function (email_address, password) {
    await new Promise(resolve => setTimeout(resolve, 750));
    global.admin_user = {
        pass: password,
        email_address
    };

    await driver.wait(until.elementLocated(By.css('[data-testid="email_address"]'))).sendKeys(global.admin_user.email_address);
    await driver.wait(until.elementLocated(By.css('[data-testid="password"]'))).sendKeys(global.admin_user.pass);
});

When('I submit the login form', async function () {
    await new Promise(resolve => setTimeout(resolve, 700));
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
    await new Promise(resolve => setTimeout(resolve, 750));
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

    // Split the URI by the '?' character to get the parameters
    const uriParts = qr_code_data.split('?');
    // Iterate through the parameters to find the 'secret' parameter
    global.secret = '';
    for (const param of uriParts[1].split('&')) {
        const [key, value] = param.split('=');
        if (key === 'secret') {
            global.secret = value;
            break;
        }
    }

    global.TOTP = await generateTOTP(global.secret, 0);
});

Given('I am on the TOTP screen', async function () {
    const element = await driver.wait(until.elementLocated(By.css('#digit-0')));
    await driver.wait(until.elementIsVisible(element));
});

When('I enter TOTP as {string}', async function (OTP) {
    // clear already existing TOTP
    await new Promise(resolve => setTimeout(resolve, 100));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Key.BACK_SPACE);
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
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Key.BACK_SPACE);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    global.TOTP = await generateTOTP(global.secret, 0);

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
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await getMFASecret({ username: global.admin_user.email_address });
    const secret = response.mfa_code;
    global.TOTP = await generateTOTP(secret, 0);

    await new Promise(resolve => setTimeout(resolve, 100));
    for (let i = 5; i >= 0; i--) {
        await driver.wait(until.elementLocated(By.css(`#digit-${i}`))).sendKeys(Key.BACK_SPACE);
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
    assert.notEqual(element_body_content, '');
});

When('I click on done button', async function () {
    const element = await driver.wait(until.elementLocated(By.css('[data-testid="done_button"]')));
    await driver.wait(until.elementIsVisible(element));
    element.click();
});
