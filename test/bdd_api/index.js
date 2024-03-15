/* eslint-disable max-len */

const axios = require('axios');
const { getBddSignedToken } = require('../bdd_modules/index.js');
async function getMFASecret (payload) {
    const token = await getBddSignedToken();

    console.log('token', token);
    console.log('payload', payload);
    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    try {
        const data = await axios.post(`https://${process.env.VITE_DOMAIN_NAME}/v1/bdd/fetch-mfa`, payload, { headers: axiosOptions });
        console.log('data', data.data);
        return data.data;
    } catch (error) {
        console.log('API Error', error);
    }
}

module.exports = {
    getMFASecret
};
