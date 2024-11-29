export default function formatLocalPhoneNumber (countryCode, phoneNumber) {
    switch (countryCode) {
    case '+91': // India
        // Format: 12345 67890
        return phoneNumber.replace(/(\d{5})(\d{5})/, '$1 $2');

    case '+44': // United Kingdom (UK)
        // Format: 1234 567890
        return phoneNumber.replace(/(\d{4})(\d{6})/, '$1 $2');

    case '+1': // United States (US)
    case '+234': // Nigeria
    case '+39': // Italy
        // Format: 123-456-7890
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

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

export function formatInputLocalPhoneNumber (input) {
    // Remove all non-digit characters, keep '+'
    const cleanedInput = input.replace(/[^\d+]/g, '');

    // Define country code formatting rules
    const countryRules = [
        {
            code: '+91', // India
            format: (digits) => {
                if (digits.length <= 3) return digits;
                if (digits.length <= 8) return `+91 ${digits.slice(3, 8)}`;
                return `+91 ${digits.slice(3, 8)} ${digits.slice(8)}`;
            }
        },
        {
            code: '+44', // United Kingdom
            format: (digits) => {
                if (digits.length <= 3) return digits;
                if (digits.length <= 7) return `+44 ${digits.slice(3, 7)}`;
                return `+44 ${digits.slice(3, 7)} ${digits.slice(7)}`;
            }
        },
        {
            code: '+1', // United States
            format: (digits) => {
                if (digits.length <= 2) return digits;
                if (digits.length <= 5) return `+1 ${digits.slice(2, 5)}`;
                if (digits.length <= 8) return `+1 ${digits.slice(2, 5)} ${digits.slice(5, 8)}`;
                return `+1 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
            }
        },
        {
            code: '+234', // Nigeria
            format: (digits) => {
                if (digits.length <= 4) return digits;
                if (digits.length <= 7) return `+234 ${digits.slice(4, 7)}`;
                if (digits.length <= 10) return `+234 ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
                return `+234 ${digits.slice(4, 7)} ${digits.slice(7, 10)} ${digits.slice(10)}`;
            }
        },
        {
            code: '+39', // Italy
            format: (digits) => {
                if (digits.length <= 3) return digits;
                if (digits.length <= 6) return `+39 ${digits.slice(3, 6)}`;
                if (digits.length <= 9) return `+39 ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
                return `+39 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
            }
        },
        {
            code: '+27', // South Africa
            format: (digits) => {
                if (digits.length <= 3) return digits;
                if (digits.length <= 5) return `+27 ${digits.slice(3, 5)}`;
                if (digits.length <= 8) return `+27 ${digits.slice(3, 5)} ${digits.slice(5, 8)}`;
                return `+27 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
            }
        },
        {
            code: '+265', // Malawi
            format: (digits) => {
                if (digits.length <= 4) return digits;
                if (digits.length <= 7) return `+265 ${digits.slice(4, 7)}`;
                if (digits.length <= 9) return `+265 ${digits.slice(4, 7)} ${digits.slice(7, 9)}`;
                return `+265 ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
            }
        },
        {
            code: '+46', // Sweden
            format: (digits) => {
                if (digits.length <= 3) return digits;
                if (digits.length <= 5) return `+46 ${digits.slice(3, 5)}`;
                if (digits.length <= 8) return `+46 ${digits.slice(3, 5)} ${digits.slice(5, 8)}`;
                return `+46 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)}`;
            }
        }
    ];

    // Find matching country rule
    const matchedRule = countryRules.find(rule => cleanedInput.startsWith(rule.code));

    // If a matching rule is found, return progressively formatted number
    return matchedRule ? matchedRule.format(cleanedInput) : cleanedInput;
}
