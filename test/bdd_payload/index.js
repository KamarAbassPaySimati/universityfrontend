/* eslint-disable camelcase */
const { faker } = require('@faker-js/faker');
const {
    verifyAgentOTP,
    sendAgentOTP,
    sendCustomerOTP,
    verifyCustomerOTP,
    verifyMerchantOTP,
    sendMerchantOTP
} = require('../bdd_api/index');

function replaceTextWithSpecialChars (text) {
    const regex = /[^\w\s]/g; // Matches any character that's not alphanumeric or whitespace
    return text.replace(regex, '');
}

async function getAgentPayload () {
    const random_alpha = faker.string.alpha(10);
    const email = `bharath.shet+${random_alpha}@7edge.com`;
    const first_name = replaceTextWithSpecialChars(faker.person.firstName());
    const middle_name = replaceTextWithSpecialChars(faker.person.middleName());
    const last_name = replaceTextWithSpecialChars(faker.person.lastName());
    let phone_number = `${faker.phone.number('## ### ####')}`;
    if (phone_number.startsWith('0')) {
    // Replace the first character with '9'
        phone_number = '9' + phone_number.substring(1);
    }
    let send_email_otp_response;
    let verify_email_otp_response;
    let send_sms_otp_response;
    let verify_sms_otp_response;

    const send_email_otp_payload = {
        first_name,
        middle_name,
        last_name,
        type: 'email',
        value: email.toLowerCase()
    };
    const send_sms_otp_payload = {
        country_code: '+265',
        first_name,
        middle_name,
        last_name,
        type: 'sms',
        value: replaceTextWithSpecialChars(phone_number)
    };

    console.log('send_email_otp_payload', send_email_otp_payload);
    console.log('send_sms_otp_payload', send_sms_otp_payload);
    try {
        send_email_otp_response = await sendAgentOTP(send_email_otp_payload);
    } catch (err) {
        console.log('send agent otp api failed', err);
    }
    console.log('send_email_otp_response', send_email_otp_response);

    try {
        verify_email_otp_response = await verifyAgentOTP(send_email_otp_response.token);
    } catch (err) {
        console.log('verify agent otp api failed', err);
    }

    console.log('verify_email_otp_response', verify_email_otp_response);

    try {
        send_sms_otp_response = await sendAgentOTP(send_sms_otp_payload);
    } catch (err) {
        console.log('send agent otp api failed', err);
    }

    console.log('send_sms_otp_response', send_sms_otp_response);
    try {
        verify_sms_otp_response = await verifyAgentOTP(send_sms_otp_response.token);
    } catch (err) {
        console.log('send agent otp api failed', err);
    }
    console.log('verify_sms_otp_response', verify_sms_otp_response);

    return {
        first_name,
        middle_name,
        last_name,
        country_code: '+265',
        phone_number: replaceTextWithSpecialChars(phone_number),
        email: email.toLowerCase(),
        email_otp_id: verify_email_otp_response.record_id,
        phone_otp_id: verify_sms_otp_response.record_id,
        security_questions: [
            {
                question_id: '655c5d8b-1f8c-4f9a-98c1-cc85a84c8b47',
                answer: 'ans1'
            },
            {
                question_id: 'b1417921-148d-4564-a991-4e6583ce5998',
                answer: 'ans2'
            },
            {
                question_id: 'bb24ce9a-836b-462e-8763-e3a205cd72f4',
                answer: 'ans3'
            },
            {
                question_id: 'be943ce4-0585-442e-bdf7-8b4ee92f8db9',
                answer: 'ans4'
            }
        ]
    };
}

async function getCustomerPayload () {
    const random_alpha = faker.string.alpha(10);
    const email = `bharath.shet+cus${random_alpha}@7edge.com`;
    const first_name = replaceTextWithSpecialChars(faker.person.firstName());
    const middle_name = replaceTextWithSpecialChars(faker.person.middleName());
    const last_name = replaceTextWithSpecialChars(faker.person.lastName());
    let phone_number = `${faker.phone.number('## ### ####')}`;
    if (phone_number.startsWith('0')) {
    // Replace the first character with '9'
        phone_number = '9' + phone_number.substring(1);
    }
    let send_email_otp_response;
    let verify_email_otp_response;
    let send_sms_otp_response;
    let verify_sms_otp_response;

    const send_email_otp_payload = {
        first_name,
        middle_name,
        last_name,
        type: 'email',
        value: email.toLowerCase()
    };
    const send_sms_otp_payload = {
        country_code: '+265',
        first_name,
        middle_name,
        last_name,
        type: 'sms',
        value: replaceTextWithSpecialChars(phone_number)
    };

    console.log('send_email_otp_payload', send_email_otp_payload);
    console.log('send_sms_otp_payload', send_sms_otp_payload);
    try {
        send_email_otp_response = await sendCustomerOTP(send_email_otp_payload);
    } catch (err) {
        console.log('send customer otp api failed', err);
    }
    console.log('send_email_otp_response', send_email_otp_response);

    try {
        verify_email_otp_response = await verifyCustomerOTP(send_email_otp_response.token);
    } catch (err) {
        console.log('verify Customer otp api failed', err);
    }

    console.log('verify_email_otp_response', verify_email_otp_response);

    try {
        send_sms_otp_response = await sendCustomerOTP(send_sms_otp_payload);
    } catch (err) {
        console.log('send Customer otp api failed', err);
    }

    console.log('send_sms_otp_response', send_sms_otp_response);
    try {
        verify_sms_otp_response = await verifyCustomerOTP(send_sms_otp_response.token);
    } catch (err) {
        console.log('send Customer otp api failed', err);
    }
    console.log('verify_sms_otp_response', verify_sms_otp_response);

    return {
        first_name,
        middle_name,
        last_name,
        profile_pic: '',
        public_profile: false,
        country_code: '+265',
        phone_number: replaceTextWithSpecialChars(phone_number),
        email: email.toLowerCase(),
        email_otp_id: verify_email_otp_response.record_id,
        phone_otp_id: verify_sms_otp_response.record_id,
        security_questions: [
            {
                question_id: '655c5d8b-1f8c-4f9a-98c1-cc85a84c8b47',
                answer: 'ans1'
            },
            {
                question_id: 'b1417921-148d-4564-a991-4e6583ce5998',
                answer: 'ans2'
            },
            {
                question_id: 'bb24ce9a-836b-462e-8763-e3a205cd72f4',
                answer: 'ans3'
            },
            {
                question_id: 'be943ce4-0585-442e-bdf7-8b4ee92f8db9',
                answer: 'ans4'
            }
        ]
    };
}

async function getMerchantPayload () {
    const random_alpha = faker.string.alpha(10);
    const email = `bharath.shet+mer${random_alpha}@7edge.com`;
    const first_name = replaceTextWithSpecialChars(faker.person.firstName());
    const middle_name = replaceTextWithSpecialChars(faker.person.middleName());
    const last_name = replaceTextWithSpecialChars(faker.person.lastName());
    let phone_number = `${faker.phone.number('## ### ####')}`;
    if (phone_number.startsWith('0')) {
    // Replace the first character with '9'
        phone_number = '9' + phone_number.substring(1);
    }
    let send_email_otp_response;
    let verify_email_otp_response;
    let send_sms_otp_response;
    let verify_sms_otp_response;

    const send_email_otp_payload = {
        first_name,
        middle_name,
        last_name,
        type: 'email',
        value: email.toLowerCase()
    };
    const send_sms_otp_payload = {
        country_code: '+265',
        first_name,
        middle_name,
        last_name,
        type: 'sms',
        value: replaceTextWithSpecialChars(phone_number)
    };

    console.log('send_email_otp_payload', send_email_otp_payload);
    console.log('send_sms_otp_payload', send_sms_otp_payload);
    try {
        send_email_otp_response = await sendMerchantOTP(send_email_otp_payload);
    } catch (err) {
        console.log('send merchant otp api failed', err);
    }
    console.log('send_email_otp_response', send_email_otp_response);

    try {
        verify_email_otp_response = await verifyMerchantOTP(send_email_otp_response.token);
    } catch (err) {
        console.log('verify merchant otp api failed', err);
    }

    console.log('verify_email_otp_response', verify_email_otp_response);

    try {
        send_sms_otp_response = await sendMerchantOTP(send_sms_otp_payload);
    } catch (err) {
        console.log('send merchant otp api failed', err);
    }

    console.log('send_sms_otp_response', send_sms_otp_response);
    try {
        verify_sms_otp_response = await verifyMerchantOTP(send_sms_otp_response.token);
    } catch (err) {
        console.log('send merchant otp api failed', err);
    }
    console.log('verify_sms_otp_response', verify_sms_otp_response);

    return {
        first_name,
        middle_name,
        last_name,
        country_code: '+265',
        phone_number: replaceTextWithSpecialChars(phone_number),
        email: email.toLowerCase(),
        email_otp_id: verify_email_otp_response.record_id,
        phone_otp_id: verify_sms_otp_response.record_id,
        security_questions: [
            {
                question_id: '655c5d8b-1f8c-4f9a-98c1-cc85a84c8b47',
                answer: 'ans1'
            },
            {
                question_id: 'b1417921-148d-4564-a991-4e6583ce5998',
                answer: 'ans2'
            },
            {
                question_id: 'bb24ce9a-836b-462e-8763-e3a205cd72f4',
                answer: 'ans3'
            },
            {
                question_id: 'be943ce4-0585-442e-bdf7-8b4ee92f8db9',
                answer: 'ans4'
            }
        ]
    };
}
module.exports = {
    getAgentPayload,
    getCustomerPayload,
    getMerchantPayload
};
