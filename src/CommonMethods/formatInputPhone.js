import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const formatInputPhone = (inputPhoneNumber, countryCodeAlpha, role) => {
    if (role !== 'customer') {
        // Remove all non-digit characters from the input
        const digitsOnly = inputPhoneNumber.replace(/\D/g, '');

        // Apply the desired formatting
        let formattedPhoneNumber = '';
        for (let i = 0; i < digitsOnly.length; i++) {
        // Restrict entering 0 at the beginning
            if (i === 0 && digitsOnly[i] === '0') {
                continue; // Skip adding 0 at the beginning
            }
            // Insert space after every third, sixth, and ninth digit
            if (i === 2 || i === 5 || i === 9) {
                formattedPhoneNumber += ' ';
            }
            formattedPhoneNumber += digitsOnly[i];
        }

        return formattedPhoneNumber;
    } else {
        try {
            // Parse the phone number with the given country code
            const phoneNumber = parsePhoneNumberFromString(inputPhoneNumber, countryCodeAlpha);

            // Check if the phone number is valid
            if (phoneNumber && phoneNumber.isValid()) {
                // Format the phone number in the desired format
                return phoneNumber.formatNational(); // or use formatInternational() for international format
            } else {
                return inputPhoneNumber; // Return the original input if the number is not valid
            }
        } catch (error) {
            console.error('Error parsing phone number:', error);
            return inputPhoneNumber; // Return the original input in case of an error
        }
    }
};
