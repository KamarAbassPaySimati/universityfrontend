export const formatInputPhone = (inputPhoneNumber) => {
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
};
