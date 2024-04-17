import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';

export default async function authHeader () {
    try {
        // eslint-disable-next-line no-unused-vars
        const userAttributes = await fetchUserAttributes();
        const { idToken } = (await fetchAuthSession()).tokens ?? {};
        const headers = {
            Authorization: `Bearer ${idToken.toString()}`
        };
        return headers;
    } catch (error) {
        if (((error.message.includes('User needs to be authenticated')) || (error.name === 'UserUnAuthenticatedException') ||
        (error.message.includes('Access Token has been revoked')) || (error.name === 'NotAuthorizedException'))) {
            console.log(error);
            window.location.reload();
        }
    }
};
