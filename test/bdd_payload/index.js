/* eslint-disable camelcase */
const { faker } = require('@faker-js/faker');
const { verifyAgentOTP, sendAgentOTP } = require('../bdd_api/index');

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

async function getAgentKycPayload () {
    return {
        kyc_type: 'full',
        citizen: 'Malawian',
        street_name: 'M1 Road',
        town_village_ta: 'Blantyre',
        district: 'Blantyre',
        address_details_status: 'completed',
        id_document_front: 'kyc_data/AGT735348/2f09da43-ce93-4ea0-b397-f37a2cf50f80/document_back.png',
        verification_document_front: 'kyc_data/AGT735348/6859dc4e-e62a-4efe-b90f-7cc312aaff8d/document_back.png',
        selfie: '1ec3205d-0ea3-4c91-82d0-e9f7860209f9/0dc1b44c-86cd-4956-b871-bcb3fc7e5424/95-6bb7f132692d.jpeg',
        id_document: 'Passport',
        verification_document: 'Birth Certificate',
        id_details_status: 'completed',
        gender: 'Male',
        dob: '1714501800',
        occupation: 'In Full-time Education',
        // eslint-disable-next-line max-len
        purpose_of_relation: 'Send and/or receive e-payments to/from individuals and enterprises and/or groups of individuals and/or enterprises',
        monthly_income: '1,000,000.00 to 2,500,000.00 MWK',
        monthly_withdrawal: '300,000.00 to 1,000,000.00 MWK',
        paymaart_id: global.agent_registration_response.paymaart_id,
        info_details_status: 'completed',
        institute: 'Others (Please Specify)',
        institute_specify: 'bdd institute',
        bank_name: 'Ecobank',
        account_number: '123456789',
        account_name: 'BDD Account'
    };
}

module.exports = {
    getAgentPayload,
    getAgentKycPayload
};
