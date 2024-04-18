/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const { AfterAll, BeforeAll, AfterStep, setDefaultTimeout, Before, After } = require('@cucumber/cucumber');
const chrome = require('selenium-webdriver/chrome');
const { By, until } = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const { faker } = require('@faker-js/faker');
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

global.driver = chrome.Driver.createSession(options, service);
setDefaultTimeout(35000);
BeforeAll(async function () {
    await driver.manage();
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.get('http://localhost:3000/');
    await driver.wait(until.elementLocated(By.id('root')));
    global.current_process_name = faker.string.alpha({ count: 10, casing: 'upper' });
    global.is_user_logged_in = false;

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
    await new Promise(resolve => setTimeout(resolve, 1500));
});

After(async function () {
    await new Promise(resolve => setTimeout(resolve, 1500));
});

AfterStep(async function () {
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

module.exports = {
    driver
};
