/* eslint-disable max-len */
const { Then, When } = require('@cucumber/cucumber');
const { Key, until, By } = require('selenium-webdriver');
const { getModifierKey } = require('../../bdd_modules');

When('I click on the unlock button for first account in the list', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="unlock_button_0"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('I should see a popup modal asking security questions', async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filter_modal = await driver.wait(until.elementLocated(By.css("[data-testid='security_question_modal']")));
});

When('I enter the security question answer for agent', async function () {
    let count = 2
    for (let i = 0; i < count; i++) {
        const questionElement = await driver.wait(until.elementLocated(By.css('[data-testid="security-question"]')));
        await driver.wait(until.elementIsVisible(questionElement));

        const displayedQuestion = await questionElement.getText();
        console.log('QuestionElement:', displayedQuestion);

        let agent_answer;

        switch (displayedQuestion) {
            case "What are the last four digits of your Paymaart ID?":
                agent_answer = "4545";
                count = count +1;
                break;
            case "What is the verified email address for your Paymaart account?":
                agent_answer = global.agent_registration_payload.email;
                break;
            case "What is the verified phone number for your Paymaart account?":
                const phone_number = global.agent_registration_payload.phone_number.replace(" ", "");
                agent_answer = `${global.agent_registration_payload.country_code}${phone_number}`;
                break;
            case "Please spell your Lastname as registered with your Paymaart/Paysimati account.":
                agent_answer = global.agent_registration_payload.last_name;
                break;
            case "Please spell your Middlename as registered with your Paymaart/Paysimati account.":
                agent_answer = global.agent_registration_payload.middle_name;
                break;    
            default:
                throw new Error(`No predefined answer found for the question: "${displayedQuestion}"`);
        }

        console.log('Agent Answer:', agent_answer);

        const answerElement = await driver.wait(until.elementLocated(By.css('[data-testid="security-question-answer"]')));
        await driver.wait(until.elementIsVisible(answerElement));
        
        // Clear the input field
        await answerElement.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);

        // Enter the answer
        await answerElement.sendKeys(agent_answer);

        await driver.wait(until.elementLocated(By.css('[data-testid="next_security_question"]'))).click();
        await new Promise(resolve => setTimeout(resolve, 1300));
    }
});


When('I enter the security question answer for customer', async function () {
    const questionElement = await driver.wait(until.elementLocated(By.css('[data-testid="security-question"]')));
    await driver.wait(until.elementIsVisible(questionElement));

    const displayedQuestion = await questionElement.getText();

    let customer_answer;

    switch (displayedQuestion) {
      case 'What are the last four digits of your Paymaart ID?':
          customer_answer = '4545';
          break;
      case 'What is the verified email address for your Paymaart account?':
          customer_answer = global.customer_registration_payload.email;
          break;
      case 'What is the verified phone number for your Paymaart account?':
          const phone_number = global.customer_registration_payload.phone_number.replace(' ', '');
          customer_answer = `${global.customer_registration_payload.country_code}${phone_number}`;
          break;
      case 'Please spell your Lastname as registered with your Paymaart/Paysimati account.':
          customer_answer = global.customer_registration_payload.last_name;
          break;
      case 'Please spell your Middlename as registered with your Paymaart/Paysimati account.':
          customer_answer = global.customer_registration_payload.middle_name;
          break;
      default:
          throw new Error(`No predefined answer found for the question: "${displayedQuestion}"`);
    }

    const answerElement = await driver.wait(until.elementLocated(By.css('[data-testid="security-question-answer"]')));
    await driver.wait(until.elementIsVisible(answerElement));

    await answerElement.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);

    await answerElement.sendKeys(customer_answer);
});

When('I enter the security question answer for merchant', async function () {
    const questionElement = await driver.wait(until.elementLocated(By.css('[data-testid="security-question"]')));
    await driver.wait(until.elementIsVisible(questionElement));

    const displayedQuestion = await questionElement.getText();

    let merchant_answer;

    switch (displayedQuestion) {
      case 'What are the last four digits of your Paymaart ID?':
          merchant_answer = '4545';
          break;
      case 'What is the verified email address for your Paymaart account?':
          merchant_answer = global.merchant_registration_payload.email;
          break;
      case 'What is the verified phone number for your Paymaart account?':
          const phone_number = global.merchant_registration_payload.phone_number.replace(' ', '');
          merchant_answer = `${global.merchant_registration_payload.country_code}${phone_number}`;
          break;
      case 'Please spell your Lastname as registered with your Paymaart/Paysimati account.':
          merchant_answer = global.merchant_registration_payload.last_name;
          break;
      case 'Please spell your Middlename as registered with your Paymaart/Paysimati account.':
          merchant_answer = global.merchant_registration_payload.middle_name;
          break;
      default:
          throw new Error(`No predefined answer found for the question: "${displayedQuestion}"`);
    }

    const answerElement = await driver.wait(until.elementLocated(By.css('[data-testid="security-question-answer"]')));
    await driver.wait(until.elementIsVisible(answerElement));

    await answerElement.sendKeys(Key.chord(getModifierKey(), 'a'), Key.DELETE);

    await answerElement.sendKeys(merchant_answer);
});

When('I click on the verify button security question', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="verify_security_question"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

When('I click on Request Reset Link', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="request_reset_link"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 1300));
});

When('I click on next button for next question', async function () {
    await driver.wait(until.elementLocated(By.css('[data-testid="next_security_question"]'))).click();
    await new Promise(resolve => setTimeout(resolve, 500));
});