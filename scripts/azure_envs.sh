#!/bin/bash

# Get parameter names from AWS SSM
specific_params=("ADMIN_COGNITO_USERPOOL_ID" "ADMIN_COGNITO_CLIENT_ID" "ADMIN_S3_BUCKET" "ADMIN_DISTRIBUTION_ID" "ADMIN_COGNITO_IDENTITY_POOL_ID" "DOMAIN_NAME" "BUCKET_NAME" "CDN_URL" "PASSWORD_SECRET_KEY" "ADMIN_COGNITO_IDENTITY_POOL_ID" "REGION" "APPLICATION_ID" "ENVIORNMENT_ID" "CONFIGURATION_ID" "STAGE")

# Loop through each parameter
for param_name in "${specific_params[@]}"; do
    # Get parameter value
    param_value=$(aws ssm get-parameter --name "$param_name" --query "Parameter.Value" --output text --region $REGION)

    # Append to .env file
    echo "${param_name##*/}=\"${param_value}\"" >> .env  # Write key-value pair to .env file
    echo "VITE_${param_name##*/}=\"${param_value}\"" >> .env    # Write key-value pair to .env file
done

# unwanted_variables=("ADMIN_S3_BUCKET" "ADMIN_DISTRIBUTION_ID")
# for param_name in "${unwanted_variables[@]}"; do
#     # Get parameter value
#     param_value=$(aws ssm get-parameter --name "$param_name" --query "Parameter.Value" --output text --region $REGION)

#     # Append to .env file
#     echo "${param_name##*/}=\"${param_value}\"" >> .env  # Write key-value pair to .env file
# done