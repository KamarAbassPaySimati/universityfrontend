export const baseURL = 'https://' + import.meta.env.VITE_DOMAIN_NAME + '/v1/admin-users/';
export const baseURLAgent = 'https://' + import.meta.env.VITE_DOMAIN_NAME + '/v1/agent-users/';
// export const exceptThisSymbols = ['e', 'E', '+', '-', '.',''];
// export const branchLiveKey =process.env.REACT_APP_BRANCH_LIVE_KEY
export const CDN = 'https://' + import.meta.env.VITE_CDN_URL + '/public/';
export const GOOGLE_API = import.meta.env.VITE_GOOGLE_API;
export const awsConfig = {
    Auth: {
        Cognito: {
            region: import.meta.env.VITE_REGION || 'us-east-1',
            userPoolId: import.meta.env.VITE_ADMIN_COGNITO_USERPOOL_ID,
            userPoolClientId: import.meta.env.VITE_ADMIN_COGNITO_CLIENT_ID,
            identityPoolId: import.meta.env.VITE_ADMIN_COGNITO_IDENTITY_POOL_ID
        }
    },
    Storage: {
        S3: {
            bucket: import.meta.env.VITE_BUCKET_NAME,
            region: import.meta.env.VITE_REGION || 'us-east-1'
        }
    }
};
