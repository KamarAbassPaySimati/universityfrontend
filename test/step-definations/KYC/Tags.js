/* eslint-disable max-len */
const { getAgentPayload, getCustomerPayload, getMerchantPayload } = require('../../bdd_payload/index');
const { createAgentAccount, createCustomerAccount, createMerchantAccount, deleteRequestBDDAPI, deleteRequestCustomer, payoutRequestBDDAPI, deleteRequestMerchant, lockingAccount } = require('../../bdd_api/index');
const { Before } = require('@cucumber/cucumber');

Before('@register_new_agent', async function () {
    try {
        global.agent_registration_payload = await getAgentPayload();
        global.agent_registration_response = await createAgentAccount(global.agent_registration_payload);
    } catch (error) {
        console.log('Registration of agent failed', error);
    }
});

Before('@register_new_agent_and_lock_that_agent', async function () {
    try {
        global.agent_registration_payload = await getAgentPayload();
        global.agent_registration_response = await createAgentAccount(global.agent_registration_payload);
        global.lock_agent_accountt_response = await lockingAccount(global.agent_registration_response.paymaart_id);
    } catch (error) {
        console.log('Locking of agent user failed', error);
    }
});

Before('@register_new_customer_and_lock_that_customer', async function () {
    try {
        global.customer_registration_payload = await getCustomerPayload();
        global.customer_registration_response = await createCustomerAccount(global.customer_registration_payload);
        global.lock_customer_account_response = await lockingAccount(global.customer_registration_response.paymaart_id);
        console.log('global.customer_registration_response', global.customer_registration_response);
    } catch (error) {
        console.log('Locking of agent user failed', error);
    }
});

Before('@register_new_merchant_and_lock_that_merchant', async function () {
    try {
        global.merchant_registration_payload = await getMerchantPayload();
        global.merchant_registration_response = await createMerchantAccount(global.merchant_registration_payload);
        global.lock_merchant_account_response = await lockingAccount(global.merchant_registration_response.paymaart_id);
        console.log('global.merchant_registration_response', global.merchant_registration_response);
    } catch (error) {
        console.log('Locking of agent user failed', error);
    }
});

Before('@register_new_agent_and_send_delete_request_for_that_agent', async function () {
    try {
        global.agent_registration_payload = await getAgentPayload();
        global.agent_registration_response = await createAgentAccount(global.agent_registration_payload);

        const deleteRequestPayload = {
            reasons: ['Deleted For BDD'],
            user_id: global.agent_registration_response.paymaart_id
        };
        console.log('deleteRequestPayload', deleteRequestPayload);
        global.delete_request_response = await deleteRequestBDDAPI(deleteRequestPayload);
        console.log('delete request response', global.delete_request_response);
    } catch (error) {
        console.log('Delete Request API Failed', error);
    }
});

Before('@register_new_customer_and_send_delete_request_for_that_customer', async function () {
    try {
        global.customer_registration_payload = await getCustomerPayload();
        global.customer_registration_response = await createCustomerAccount(global.customer_registration_payload);

        const deleteRequestPayload = {
            reasons: ['Deleted For BDD'],
            user_id: global.customer_registration_response.paymaart_id
        };
        console.log('deleteRequestPayload', deleteRequestPayload);
        global.delete_request_response = await deleteRequestCustomer(deleteRequestPayload);
        console.log('delete request response', global.delete_request_response);
    } catch (error) {
        console.log('Delete Request API Failed', error);
    }
});

Before('@register_new_merchant_and_send_delete_request_for_that_merchant', async function () {
    try {
        global.merchant_registration_payload = await getMerchantPayload();
        global.merchant_registration_response = await createMerchantAccount(global.merchant_registration_payload);

        const deleteRequestPayload = {
            reasons: ['Deleted For BDD'],
            user_id: global.merchant_registration_response.paymaart_id
        };
        console.log('deleteRequestPayload', deleteRequestPayload);
        global.delete_request_response = await deleteRequestMerchant(deleteRequestPayload);
        console.log('delete request response', global.delete_request_response);
    } catch (error) {
        console.log('Delete Request API Failed', error);
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

Before('@register_new_customer_and_send_delete_request_for_that_customer', async function () {
    try {
        global.customer_registration_payload = await getCustomerPayload();
        global.customer_registration_response = await createCustomerAccount(global.customer_registration_payload);

        const deleteRequestPayload = {
            reasons: ['Deleted For BDD'],
            user_id: global.customer_registration_response.paymaart_id
        };
        console.log('deleteRequestPayload', deleteRequestPayload);
        global.delete_request_response = await deleteRequestBDDAPI(deleteRequestPayload);
        console.log('delete request response', global.delete_request_response);
    } catch (error) {
        console.log('Delete Request API Failed', error);
    }
});
Before('@register_new_agent_and_send_payout_request_for_that_agent', async function () {
    try {
        // global.agent_registration_payload = await getAgentPayload();
        // global.agent_registration_response = await createAgentAccount(global.agent_registration_payload);
        // console.log('global.agent_registration_response', global.agent_registration_response);
        const deleteRequestPayload = {
            password: 'Admin@123',
            amount: 1000.7,
            bank_account_id: 'c1f5804e-a4a8-412f-994c-374777d775ac'
        };
        console.log('deleteRequestPayload', deleteRequestPayload);
        global.delete_request_response = await payoutRequestBDDAPI(deleteRequestPayload);
        console.log('delete request response', global.delete_request_response);
    } catch (error) {
        console.log('Delete Request API Failed', error);
    }
});
