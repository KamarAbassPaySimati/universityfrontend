export const formatInputPhone = (inputPhoneNumber) => {
    // Remove all non-digit characters from the input
    const digitsOnly = inputPhoneNumber.replace(/\D/g, '');

    // Apply the desired formatting
    let formattedPhoneNumber = '';
    for (let i = 0; i < digitsOnly.length; i++) {
    // Insert space after every 3, 2, 3, 4 digits
        if (i === 3 || i === 5 || i === 8) {
            formattedPhoneNumber += ' ';
        }
        formattedPhoneNumber += digitsOnly[i];
    }

    // Add the country code prefix if it's missing
    if (!formattedPhoneNumber.startsWith('+')) {
        formattedPhoneNumber = `+${formattedPhoneNumber}`;
    }

    return formattedPhoneNumber;
};
