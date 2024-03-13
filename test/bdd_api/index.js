/* eslint-disable max-len */

const axios = require('axios')
const { getBddSignedToken } = require('../bdd_modules/index.js')
async function getMFASecret (payload) {
    const token = await getBddSignedToken()

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    try {
        const data = await axios.post(`${process.env.REACT_APP_DOMAIN_NAME_FRONT_END}/v1/admin-users/bdd/mfa-secret`, { payload }, { headers: axiosOptions })
        return data.data
    } catch (error) {
        console.log('API Error', error)
    }
}

module.exports = {
    getMFASecret
}
