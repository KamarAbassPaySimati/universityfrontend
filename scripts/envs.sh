# parameter_names=($(aws ssm describe-parameters --query "Parameters[*].Name" --output text --region $REGION))
# # Loop through each parameter
# for param_name in "${parameter_names[@]}"; do
#     echo "$param_name"
#     # Get parameter value
#     param_value=$(aws ssm get-parameter --name "$param_name" --query "Parameter.Value" --output text --region $REGION)

#     # Append to .env file
#     echo "${param_name##*/}=\"${param_value}\"" >> .env    # Write key-value pair to .env file
#     echo "VITE_${param_name##*/}=\"${param_value}\"" >> .env    # Write key-value pair to .env file
#     echo "Added $param_name to .env file with value: $param_value"
# done

specific_params=("ADMIN_COGNITO_USERPOOL_ID " "ADMIN_COGNITO_CLIENT_ID" "ADMIN_COGNITO_IDENTITY_POOL_ID", "DOMAIN_NAME ", "GOOGLE_API", "BUCKET_NAME", "CDN_URL", "PASSWORD_SECRET_KEY")

# Loop through each parameter
for param_name in "${specific_params[@]}"; do
    # Get parameter value
    param_value=$(aws ssm get-parameter --name "$param_name" --query "Parameter.Value" --output text --region $REGION)

    # Append to .env file
    echo "${param_name}=\"${param_value}\"" >> .env    # Write key-value pair to .env file
    echo "VITE_${param_name}=\"${param_value}\"" >> .env    # Write key-value pair to .env file
    echo "Added $param_name to .env file with value: $param_value"
done