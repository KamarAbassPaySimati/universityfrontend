import { fetchAuthSession } from 'aws-amplify/auth';

export default async function authHeader () {
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    const headers = {
        Authorization: `Bearer ${idToken.toString()}`
    };
    return headers;
};
