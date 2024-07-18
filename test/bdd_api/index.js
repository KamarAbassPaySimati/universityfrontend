/* eslint-disable max-len */

const axios = require('axios');
const { getBddSignedToken, getToken } = require('../bdd_modules/index.js');
async function getMFASecret (payload) {
    const token = await getBddSignedToken();

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/bdd/fetch-mfa`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function addAdminUser (payload) {
    const token = await getBddSignedToken();

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/bdd/add_account`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function deletePayoutRequest (payload) {
    const token = await getBddSignedToken();

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/bdd/payouyt-request`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function deleteRequestBDDAPI (payload) {
    const token = await getBddSignedToken();

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/agent-users/bdd-delete-request`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}
async function payoutRequestBDDAPI (payload) {
    const token = await getBddSignedToken();

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    console.log('axiosOptions', axiosOptions);
    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/bdd/payout-request`, payload, { headers: axiosOptions });
        console.log('data_data', data);
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function deleteRequestCustomer (payload) {
    const token = await getBddSignedToken();

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/bdd/delete-user-request`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function createAdminAccountSecure (payload) {
    const token = await getToken();

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/admin-users/onboard-admin`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function deleteAdminAccount (payload) {
    const token = await getBddSignedToken();

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/bdd/delete_account`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}
async function deletePaymaartTrustBank (params) {
    const token = await getBddSignedToken();

    console.log('token', token);
    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.delete(`https://${process.env.VITE_DOMAIN_NAME}/v1/bdd/delete-trust-bank/${params}`, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function requestResetPassword (payload) {
    const axiosOptions = {
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/admin-users/send-reset-link`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function createAgentAccount (payload) {
    const axiosOptions = await getToken();

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/agent-users/create-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}
async function verifyAgentOTP (token) {
    const axiosOptions = await getToken();

    const payload = {
        otp: '355948',
        token
    };

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/agent-users/verify-otp-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function sendAgentOTP (payload) {
    const axiosOptions = await getToken();

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/agent-users/send-otp-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function createCustomerAccount (payload) {
    const axiosOptions = await getToken();

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/customer-user/create-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}
async function verifyCustomerOTP (token) {
    const axiosOptions = await getToken();

    const payload = {
        otp: '355948',
        token
    };

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/customer-user/verify-otp-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function sendCustomerOTP (payload) {
    const axiosOptions = await getToken();

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/customer-user/send-otp-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function createMerchantAccount (payload) {
    const axiosOptions = await getToken();

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/merchant-users/create-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}
async function verifyMerchantOTP (token) {
    const axiosOptions = await getToken();

    const payload = {
        otp: '355948',
        token
    };

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/merchant-users/verify-otp-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}
async function sendMerchantOTP (payload) {
    const axiosOptions = await getToken();

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/merchant-users/send-otp-secure`, payload, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function getKYCCompletedAgentList () {
    const axiosOptions = await getToken();

    try {
        const data = await axios.get(`https:/${process.env.VITE_DOMAIN_NAME}/v1/agent-users/get-agent-kyc-list?page=1&citizenship=all&simplifiedStatus=completed&fullStatus=completed`, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}
async function getKYCCompletedAgentActiveList () {
    const axiosOptions = await getToken();

    try {
        const data = await axios.get(`https:/${process.env.VITE_DOMAIN_NAME}/v1/admin-users/agent-list?page=1&status=active`, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function getKYCCompletedCustomerList () {
    const axiosOptions = await getToken();

    try {
        const data = await axios.get(`https:/${process.env.VITE_DOMAIN_NAME}/v1/admin-users/customer-kyc-list?page=1&citizenship=all&simplifiedStatus=completed&fullStatus=completed`, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}
async function getKYCDeactivateCustomerList () {
    const axiosOptions = await getToken();

    try {
        const data = await axios.get(`https:/${process.env.VITE_DOMAIN_NAME}/v1/admin-users/customer-list?page=1&status=inactive`, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function createTransactionList () {
    const axiosOptions = await getToken();

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/bdd/add-user-transactions`, null, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

async function deleteTransactionList () {
    const axiosOptions = await getToken();

    try {
        const data = await axios.delete(`https:/${process.env.VITE_DOMAIN_NAME}/v1/bdd/delete-user-transactions`, { headers: axiosOptions });
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

module.exports = {
    getMFASecret,
    addAdminUser,
    deleteAdminAccount,
    requestResetPassword,
    createAdminAccountSecure,
    deletePaymaartTrustBank,
    createAgentAccount,
    verifyAgentOTP,
    sendAgentOTP,
    verifyCustomerOTP,
    sendCustomerOTP,
    createCustomerAccount,
    createMerchantAccount,
    verifyMerchantOTP,
    sendMerchantOTP,
    deleteRequestBDDAPI,
    getKYCCompletedAgentList,
    getKYCCompletedCustomerList,
    deleteRequestCustomer,
    createTransactionList,
    deleteTransactionList,
    getKYCCompletedAgentActiveList,
    getKYCDeactivateCustomerList,
    deletePayoutRequest,
    payoutRequestBDDAPI
};
