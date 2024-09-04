export default function formatLocalPhoneNumber (countryCode, phoneNumber) {
    switch (countryCode) {
    case '+91': // India
        // Format: 12345 67890
        return phoneNumber.replace(/(\d{5})(\d{5})/, '$1 $2');

    case '+44': // United Kingdom (UK)
        // Format: 1234 567890
        return phoneNumber.replace(/(\d{4})(\d{6})/, '$1 $2');

    case '+1': // United States (US)
        // Format: 123-456-7890
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

    case '+234': // Nigeria
        // Format: 123 456 7890
        return phoneNumber.replace(/(\d{3})(\d{6})/, '$1 $2');

    case '+39': // Italy
        // Format: 123 456 7890
        return phoneNumber.replace(/(\d{3})(\d{6})/, '$1 $2');

        // case '+265': // Malawi
        //     // Format: 123 456 789
        //     return phoneNumber.replace(/(\d{3})(\d{3})(\d{5})/, '$1 $2 $3');

    case '+27': // South Africa
    case '+265': // Malawi
        // Format: 12 345 6789
        return phoneNumber.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');

    case '+46': // Sweden
        // Format: 12 345 67 89
        return phoneNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

    default:
        return `Invalid country code: ${countryCode}`;
    }
}
