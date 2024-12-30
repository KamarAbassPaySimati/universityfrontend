import { fetchAuthSession } from "aws-amplify/auth";
import { AppConfigDataClient, StartConfigurationSessionCommand, GetLatestConfigurationCommand} from "@aws-sdk/client-appconfigdata";
import AWS from "aws-sdk";

async function getCredentials() {
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    const identityPoolId = import.meta.env.VITE_ADMIN_COGNITO_IDENTITY_POOL_ID 
    const providerName = import.meta.env.VITE_EMPLOYEE_COGNITO_LOGIN_URL // Replace with your User Pool provider name
    const region = import.meta.env.VITE_REGION; // Load the region from the environment variable
    const cognitoIdentity = new AWS.CognitoIdentity({ region });
    const identityIdResponse = await cognitoIdentity.getId({
        IdentityPoolId: identityPoolId,
        Logins: {
          [providerName]: idToken.toString(),
        },
      }).promise();
      const identityId = identityIdResponse.IdentityId;

      // Step 5: Retrieve AWS temporary credentials
      const credentialsResponse = await cognitoIdentity.getCredentialsForIdentity({
        IdentityId: identityId,
        Logins: {
          [providerName]: idToken.toString(),
        },
      }).promise();
  
      const { AccessKeyId, SecretKey, SessionToken } = credentialsResponse.Credentials;
      // Step 6: Return the credentials or use them directly
      return {
        AccessKeyId,
        SecretKey,
        SessionToken,
      };

}

export default async function fetchFeatureFlags() {

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
          sessionToken: SessionToken,
        },
        region: region
      });
      
    //   // Step 3: Start configuration session
      const startSessionCommand = new StartConfigurationSessionCommand({
        ApplicationIdentifier: import.meta.env.VITE_APPLICATION_ID,
        EnvironmentIdentifier: import.meta.env.VITE_ENVIORNMENT_ID,
        ConfigurationProfileIdentifier: import.meta.env.VITE_CONFIGURATION_ID,
      });
      const session = await appConfig.send(startSessionCommand);
      
      // Fetch the configuration data
      const getConfigCommand = new GetLatestConfigurationCommand({
        ConfigurationToken: session.InitialConfigurationToken,
      });
      const configData = await appConfig.send(getConfigCommand);
      // Step 5: Parse and return feature flags
      const configString = new TextDecoder("utf-8").decode(configData.Configuration);

      // Parse the string as JSON
      const featureFlags = JSON.parse(configString);
      console.log("Fetched Feature Flags:", featureFlags);
      return featureFlags;
  
    } catch (error) {
      console.error("Error fetching feature flags from AppConfig:", error);
      throw error;
    }
  }