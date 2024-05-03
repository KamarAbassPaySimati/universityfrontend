const { getAgentPayload, getCustomerPayload, getMerchantPayload } = require('../../bdd_payload/index');
const { createAgentAccount, createCustomerAccount, createMerchantAccount } = require('../../bdd_api/index');
const { Before } = require('@cucumber/cucumber');

Before('@register_new_agent', async function () {
    try {
        global.agent_registration_payload = await getAgentPayload();
        global.agent_registration_response = await createAgentAccount(global.agent_registration_payload);
    } catch (error) {
        console.log('Registration of agent failed', error);
    }
});

Before('@register_new_customer', async function () {
    try {
        global.customer_registration_payload = await getCustomerPayload();
        global.customer_registration_response = await createCustomerAccount(global.customer_registration_payload);
        console.log('global.customer_registration_response', global.customer_registration_response);
    } catch (error) {
        console.log('Registration of agent failed', error);
    }
});

Before('@register_new_merchant', async function () {
    try {
        global.merchant_registration_payload = await getMerchantPayload();
        global.merchant_registration_response = await createMerchantAccount(global.merchant_registration_payload);
        console.log('global.merchant_registration_response', global.merchant_registration_response);
    } catch (error) {
        console.log('Registration of agent failed', error);
    }
});
