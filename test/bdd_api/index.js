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
        console.log('response of agent create', data);
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

async function createKYCSecure (payload) {
    const axiosOptions = await getToken();

    try {
        const data = await axios.post(`https:/${process.env.VITE_DOMAIN_NAME}/v1/agent-users/create-kyc-secure`, payload, { headers: axiosOptions });
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
    createKYCSecure
};
