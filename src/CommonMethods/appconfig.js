import {
    AppConfigDataClient,
    StartConfigurationSessionCommand,
    GetLatestConfigurationCommand
} from '@aws-sdk/client-appconfigdata';
import { fetchAuthSession } from 'aws-amplify/auth';

async function getCredentials () {
    const credentials = await fetchAuthSession();
    const AccessKeyId = credentials.credentials.accessKeyId;
    const SecretKey = credentials.credentials.secretAccessKey;
    const SessionToken = credentials.credentials.sessionToken;
    return {
        AccessKeyId,
        SecretKey,
        SessionToken
    };
}

export async function fetchFeatureFlags () {
    try {
        // Step 1: Get temporary AWS credentials
        const credentials = await getCredentials();
        const { AccessKeyId, SecretKey, SessionToken } = credentials;
        const region = import.meta.env.VITE_REGION;

        // Step 2: Initialize AppConfig client
        const appConfig = new AppConfigDataClient({
            credentials: {
                accessKeyId: AccessKeyId,
                secretAccessKey: SecretKey,
                sessionToken: SessionToken
            },
            region
        });

        //   // Step 3: Start configuration session
        const startSessionCommand = new StartConfigurationSessionCommand({
            ApplicationIdentifier: import.meta.env.VITE_APPLICATION_ID,
            EnvironmentIdentifier: import.meta.env.VITE_ENVIORNMENT_ID,
            ConfigurationProfileIdentifier: import.meta.env.VITE_CONFIGURATION_ID
        });
        const session = await appConfig.send(startSessionCommand);

        // Fetch the configuration data
        const getConfigCommand = new GetLatestConfigurationCommand({
            ConfigurationToken: session.InitialConfigurationToken
        });
        const configData = await appConfig.send(getConfigCommand);
        // Step 5: Parse and return feature flags
        const configString = new TextDecoder('utf-8').decode(configData.Configuration);

        // Parse the string as JSON
        const featureFlags = JSON.parse(configString);
        return featureFlags;
    } catch (error) {
        console.error('Error fetching feature flags from AppConfig:', error);
        throw error;
    }
}
