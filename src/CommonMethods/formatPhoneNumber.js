export default function formatPhoneNumber (phoneNumber) {
    if (phoneNumber === null) {
        if (phoneNumber.startsWith('+91')) {
            const remainingDigits = phoneNumber.slice(3);
            let formattedNumber = '+91 ';
            // Format in 3-digit segments
            formattedNumber += remainingDigits.slice(0, 3) + ' ';
            formattedNumber += remainingDigits.slice(3, 6) + ' ';
            formattedNumber += remainingDigits.slice(6);
            return formattedNumber;
        } else if (phoneNumber.startsWith('+265')) {
            const remainingDigits = phoneNumber.slice(4);
            let formattedNumber = '+265 ';
            // Format in 3-digit segments
            formattedNumber += remainingDigits.slice(0, 2) + ' ';
            formattedNumber += remainingDigits.slice(2, 5) + ' ';
            formattedNumber += remainingDigits.slice(5);
            return formattedNumber;
        }
        return phoneNumber;
    } else {
        return null;
    }
};
