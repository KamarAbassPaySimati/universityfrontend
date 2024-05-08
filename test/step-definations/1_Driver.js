/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const { AfterAll, BeforeAll, AfterStep, setDefaultTimeout, Before, After } = require('@cucumber/cucumber');
const chrome = require('selenium-webdriver/chrome');
const { Key, until, By } = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const { createCoverageMap } = require('istanbul-lib-coverage');
const fs = require('fs');
const path = require('path');
const service = new chrome.ServiceBuilder(chromedriver.path).build();
const options = new chrome.Options();
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--no-sandbox');
options.addArguments('--disable-features=VizDisplayCompositor');
options.addArguments('enable-automation');
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--headless'); // comment this line of code to run in local chrome browser
options.addArguments('--window-size=1920,1080');
options.addArguments('--disable-gpu');
options.addArguments('--disable-extensions');
options.addArguments('--dns-prefetch-disable');
options.addArguments('enable-features=NetworkServiceInProcess');
options.addArguments('--use-fake-device-for-media-stream');
options.addArguments('--use-fake-ui-for-media-stream');
const { v4: uuidv4 } = require('uuid');
global.driver = chrome.Driver.createSession(options, service);

const { faker } = require('@faker-js/faker');
const { getMFASecret, addAdminUser, deleteAdminAccount } = require('../bdd_api/index');
const {
    extractQRCodeData,
    generateTOTP,
    saveLocalStorageData,
    loadLocalStorageData
} = require('../bdd_modules/index');

setDefaultTimeout(40000);
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
BeforeAll(async function () {
    await driver.manage();
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.get('http://localhost:3000/');
    await driver.wait(until.elementLocated(By.id('root')));
    global.current_process_name = uuidv4();
    global.is_user_logged_in = false;
    await new Promise(resolve => setTimeout(resolve, 1500));

    const worldParametersIndex = process.argv.indexOf('--world-parameters');
    let worldParameters;
    if (worldParametersIndex !== -1 && process.argv.length > worldParametersIndex + 1) {
        worldParameters = JSON.parse(process.argv[worldParametersIndex + 1]);
        global.perform_login = worldParameters.login;
    }

    try {
        global.__coverage__ = await driver.executeScript('return __coverage__;');
        global.coverageMap = createCoverageMap(__coverage__);
    } catch (error) {
        throw new Error('::: __coverage__ ::: Coverage Mapping Object Not Found :::');
    }
});

AfterAll(async function () {
    const coverageDataDir = path.join(__dirname, 'coverageData');
    if (!fs.existsSync(coverageDataDir)) {
        fs.mkdirSync(coverageDataDir);
    }
    const coverageDataFile = path.join(coverageDataDir, `coverage_${global.current_process_name}.json`);
    const coverageData = global.coverageMap.toJSON();
    // Write coverage data to file
    fs.writeFile(coverageDataFile, JSON.stringify(coverageData), (err) => {
        if (err) {
            console.error('Error writing coverage data:', err);
        } else {
            console.log('Coverage data has been written to:', coverageDataFile);
        }
    });
    await driver.quit();
});

Before('@wait', async function () {
    await new Promise(resolve => setTimeout(resolve, 4000));
});

Before(async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
});

After(async function () {
    await new Promise(resolve => setTimeout(resolve, 2000));
});

AfterStep(async function () {
    await new Promise(resolve => setTimeout(resolve, 50));
    const updatedCoverageData = await driver.executeScript('return __coverage__;');
    const updatedCoverageMap = createCoverageMap(updatedCoverageData);
    global.coverageMap.merge(updatedCoverageMap);
});

After(function (scenario) {
    console.log('scenario.result.status', scenario.result.status);
    let failedScenarios = path.join(__dirname, 'failedScenarios');
    if (!fs.existsSync(failedScenarios)) {
        fs.mkdirSync(failedScenarios);
    }
    if (scenario.result.status === 'FAILED') {
        const world = this;
        return driver.takeScreenshot().then(function (screenShot, error) {
            if (!error) {
                world.attach(screenShot, 'image/png');
                failedScenarios = path.join(failedScenarios, `${scenario.pickle.id}_${scenario.pickle.name}.png`);
                fs.writeFile(failedScenarios, screenShot, 'base64', (err) => {
                    if (err) {
                        console.error('Error writing coverage data:', err);
                    } else {
                        console.log('Coverage data has been written to:', failedScenarios);
                    }
                });
            }
        });
    }
});

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

module.exports = {
    driver
};
