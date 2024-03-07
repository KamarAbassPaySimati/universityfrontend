export const baseURL = 'https://' + import.meta.env.VITE_DOMAIN_NAME + '/v1/'
// export const exceptThisSymbols = ['e', 'E', '+', '-', '.',''];
// export const branchLiveKey =process.env.REACT_APP_BRANCH_LIVE_KEY
export const CDN = 'https://' + import.meta.env.VITE_CDN_URL + '/public/'
export const awsConfig = {
    Auth: {
        region: import.meta.env.VITE_REGION || 'us-east-1',
        userPoolId: import.meta.env.VITE_ADMIN_COGNITO_USERPOOL_ID,
        userPoolWebClientId: import.meta.env.VITE_ADMIN_COGNITO_CLIENT_ID,
        identityPoolId: import.meta.env.VITE_ADMIN_COGNITO_IDENTITY_POOL_ID,
        authenticationFlowType: 'CUSTOM_AUTH'
    },
    Storage: {
        AWSS3: {
            bucket: import.meta.env.VITE_BUCKET_NAME,
            region: import.meta.env.VITE_REGION || 'us-east-1'
        }
    }
}
