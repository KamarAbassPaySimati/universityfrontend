/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const base32Decode = require('base32-decode');
const crypto = require('crypto');
const jsQR = require('jsqr');
require('dotenv').config();

async function getToken () {
    const keys = Object.keys(await driver.executeScript('return window.localStorage'));
    let token;

    for (key1 of keys) {
        if (key1.includes('idToken')) {
            token = await driver.executeScript(`return window.localStorage.getItem('${key1}')`);
        }
    }

    const axiosOptions = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axiosOptions;
}

async function getBddSignedToken () {
    const payload = {
        stage: process.env.VITE_STAGE
    };
    const token = jwt.sign(payload, process.env.VITE_BDD_TOKEN);

    return token;
}

function extractQRCodeData (canvas) {
    // Use the jsQR library to decode the QR code
    const code = jsQR(canvas.data, canvas.width, canvas.height);

    console.log('data', code);
    // Check if a QR code was found
    if (code) {
        return code.data;
    } else {
        return null;
    }
}
async function generateHOTP (secret, counter) {
    const decodedSecret = base32Decode(secret, process.env.VITE_OTP_ENCODING);
    const buffer = Buffer.alloc(8);
    for (let i = 0; i < 8; i += 1) {
        buffer[7 - i] = counter & 0xff;
        counter >>= 8;
    }

    // Step 1: Generate an HMAC-SHA-1 value
    const hmac = crypto.createHmac('sha1', Buffer.from(decodedSecret));
    hmac.update(buffer);
    const hmacResult = hmac.digest();

    // Step 2: Generate a 4-byte string (Dynamic Truncation)
    const offset = hmacResult[hmacResult.length - 1] & 0xf;
    const code = ((hmacResult[offset] & 0x7f) << 24) |
    ((hmacResult[offset + 1] & 0xff) << 16) |
    ((hmacResult[offset + 2] & 0xff) << 8) |
    (hmacResult[offset + 3] & 0xff);

    // Step 3: Compute an HOTP value
    return `${code % 10 ** 6}`.padStart(6, '0');
}

function generateTOTP (secret, window = 0) {
    const counter = Math.floor(Date.now() / 30000);
    return generateHOTP(secret, counter + window);
}

module.exports = {
    getToken,
    getBddSignedToken,
    extractQRCodeData,
    generateTOTP
};
