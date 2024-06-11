// src/encryption.js

import { encryptionSecretKey } from '../config';

const encodePassword2 = async (string) => {
    const enc = new TextEncoder();

    // Convert the secret key to an ArrayBuffer
    const keyBuffer = enc.encode(encryptionSecretKey);
    const key = await window.crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
    );

    // Generate a random IV
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    // Encode the input string
    const encodedString = enc.encode(string);

    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encodedString
    );

    // Extract the encrypted data and authentication tag
    const authTag = new Uint8Array(encryptedData.slice(encryptedData.byteLength - 16));
    const encryptedDataWithoutTag = new Uint8Array(encryptedData.slice(0, encryptedData.byteLength - 16));

    // Concatenate encrypted data and auth tag
    const combinedData = new Uint8Array([...encryptedDataWithoutTag, ...authTag]);

    // Encode IV and combined data to base64
    const encodedIv = btoa(String.fromCharCode(...iv));
    const encodedData = btoa(String.fromCharCode(...combinedData));

    // Return the concatenated result
    return `${encodedIv}:${encodedData}`.replace(/\n/g, '');
};

export default encodePassword2;
