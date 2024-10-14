export default function formatPhoneNumber (phoneNumber) {
    if (phoneNumber.startsWith('+91')) { // India
        const remainingDigits = phoneNumber.slice(3);
        let formattedNumber = '+91 ';
        formattedNumber += remainingDigits.slice(0, 5) + ' ';
        formattedNumber += remainingDigits.slice(5);
        return formattedNumber;
    } else if (phoneNumber.startsWith('+265')) { // Malawi
        const remainingDigits = phoneNumber.slice(4);
        let formattedNumber = '+265 ';
        formattedNumber += remainingDigits.slice(0, 2) + ' ';
        formattedNumber += remainingDigits.slice(2, 5) + ' ';
        formattedNumber += remainingDigits.slice(5);
        return formattedNumber;
    } else if (phoneNumber.startsWith('+44')) { // United Kingdom
        const remainingDigits = phoneNumber.slice(3);
        let formattedNumber = '+44 ';
        formattedNumber += remainingDigits.slice(0, 5) + ' ';
        formattedNumber += remainingDigits.slice(5);
        return formattedNumber;
    } else if (phoneNumber.startsWith('+1')) { // United States
        const remainingDigits = phoneNumber.slice(2);
        let formattedNumber = '+1 ';
        formattedNumber += remainingDigits.slice(0, 3) + ' ';
        formattedNumber += remainingDigits.slice(3, 6) + ' ';
        formattedNumber += remainingDigits.slice(6);
        return formattedNumber;
    } else if (phoneNumber.startsWith('+234')) { // Nigeria
        const remainingDigits = phoneNumber.slice(4);
        let formattedNumber = '+234 ';
        formattedNumber += remainingDigits.slice(0, 3) + ' ';
        formattedNumber += remainingDigits.slice(3);
        return formattedNumber;
    } else if (phoneNumber.startsWith('+39')) { // Italy
        const remainingDigits = phoneNumber.slice(3);
        let formattedNumber = '+39 ';
        formattedNumber += remainingDigits.slice(0, 3) + ' ';
        formattedNumber += remainingDigits.slice(3);
        return formattedNumber;
    } else if (phoneNumber.startsWith('+27')) { // South Africa
        const remainingDigits = phoneNumber.slice(3);
        let formattedNumber = '+27 ';
        formattedNumber += remainingDigits.slice(0, 3) + ' ';
        formattedNumber += remainingDigits.slice(3);
        return formattedNumber;
    } else if (phoneNumber.startsWith('+46')) { // Sweden
        const remainingDigits = phoneNumber.slice(3);
        let formattedNumber = '+46 ';
        formattedNumber += remainingDigits.slice(0, 3) + ' ';
        formattedNumber += remainingDigits.slice(3);
        return formattedNumber;
    }
    return phoneNumber; // Return unformatted if no matches
};
