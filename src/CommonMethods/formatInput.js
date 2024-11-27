export function formatLastFourDigitID (input) {
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '');

    // Limit to maximum 4 digits
    const limitedDigits = digitsOnly.slice(0, 4);

    // If less than or equal to 2 digits, return as is
    if (limitedDigits.length <= 2) {
        return limitedDigits;
    }

    // If more than 2 digits, add space after first two
    return limitedDigits;
}

export function formatDate (input) {
    // Remove any non-numeric characters immediately
    const numericInput = input.replace(/[^0-9/]/g, '');

    // Handle cases with multiple slashes
    const slashCount = (numericInput.match(/\//g) || []).length;
    if (slashCount > 2) {
        // Remove extra slashes
        input = numericInput.replace(/\//g, (match, offset) => {
            return offset === 2 || offset === 5 ? match : '';
        });
    }

    // Check if the input already contains a slash after the first two digits
    if (numericInput.length > 2 && numericInput[2] === '/' && numericInput.replace(/\D/g, '').length <= 8) {
        // Check for second slash placement
        if (numericInput.length > 5 && numericInput[5] === '/' && numericInput.replace(/\D/g, '').length <= 8) {
            return numericInput;
        }
    }
    if (numericInput.length > 2 && numericInput[2] === '/' && numericInput.replace(/\D/g, '').length <= 8) {
        return numericInput;
    }

    // Remove all non-digit characters
    const digitsOnly = numericInput.replace(/\D/g, '');

    // Handle different input lengths progressively
    if (digitsOnly.length === 0) return '';
    if (digitsOnly.length <= 2) {
        return digitsOnly;
    }
    if (digitsOnly.length <= 4) {
        return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
    }
    if (digitsOnly.length <= 8) {
        return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4, 8)}`;
    }

    // Truncate to 8 digits if more are entered
    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4, 8)}`;
}
