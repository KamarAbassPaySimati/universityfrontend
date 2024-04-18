/* eslint-disable camelcase */
const { After } = require('@cucumber/cucumber');

const { deletePaymaartTrustBank } = require('../../bdd_api/index.js');

After('@delete_trust_bank', async function () {
    try {
        const response = await deletePaymaartTrustBank(global.bank_ref_no);
        console.log('bank delete response', response);
    } catch (error) {
        console.log('API Error', error);
    }
});
