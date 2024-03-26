// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
// 4 consecutive numbers

// function hasFourConsecutiveCharacters (input) {
//     if (input.length < 4) {
//         return false; // Not enough characters for consecutive check
//     }

//     for (let i = 0; i <= input.length - 4; i++) {
//         // Check for four consecutive characters
//         if (isConsecutive(input.slice(i, i + 4))) {
//             console.log('Consecutive');
//             return true;
//         }
//     }
//     return false;
// }

// function isConsecutive (substring) {
//     let previousCharCode = substring.charCodeAt(0);
//     for (let i = 1; i < substring.length; i++) {
//         const currentCharCode = substring.charCodeAt(i);
//         // Check if the characters are consecutive alphabets or digits
//         if ((previousCharCode + 1 !== currentCharCode) ||
//             (!isLetterOrDigit(previousCharCode) && !isLetterOrDigit(currentCharCode))) {
//             return false; // Not consecutive
//         }
//         // Skip non-alphanumeric characters
//         while (!isLetterOrDigit(previousCharCode) && i < substring.length - 1) {
//             i++;
//             previousCharCode = substring.charCodeAt(i);
//         }
//         previousCharCode = currentCharCode;
//     }
//     return true; // Consecutive
// }

// function isLetterOrDigit (charCode) {
//     return (charCode >= 48 && charCode <= 57) || // Digits 0-9
//            (charCode >= 65 && charCode <= 90) || // Uppercase letters A-Z
//            (charCode >= 97 && charCode <= 122); // Lowercase letters a-z
// }

// checks for repetative numbers
// function hasFourRepeatedConsecutiveChars (str) {
//     for (let i = 0; i <= str.length - 4; i++) {
//         if (str[i] === str[i + 1] && str[i] === str[i + 2] && str[i] === str[i + 3]) {
//             return true;
//         }
//     }
//     return false;
// }

// checks if it has 1 lowercase, 1 uppercase and 1 number
function containsNumberAndLetter (str) {
    return /[a-z]/.test(str) && /[A-Z]/.test(str) && /\d/.test(str);
}

function hasFourConsecutiveNumbers (input) {
    for (let i = 0; i < input.length - 3; i++) {
        if (input[i + 1] - input[i] === 1 &&
            input[i + 2] - input[i + 1] === 1 &&
            input[i + 3] - input[i + 2] === 1) {
            return true;
        }
    }
    return false;
}
function hasThreeRepeatedConsecutiveDigits (str) {
    for (let i = 0; i <= str.length - 4; i++) {
        if (/(\d)\1{3}/.test(str.slice(i, i + 4))) {
            return true;
        }
    }
    return false;
}
// Check contains common values
function containsCommonPasswords (str) {
    return /(qwerty|password)/i.test(str);
}

export default function passwordCheck (password) {
    if (password.length < 8 || password.length > 12) {
        return false;
    } else if (hasFourConsecutiveNumbers(password)) {
        return false;
    } else if (!containsNumberAndLetter(password)) {
        return false;
    } else if (/[!.? ]/.test(password)) {
        return false;
    } else if (hasThreeRepeatedConsecutiveDigits(password)) {
        return false;
    } else if (containsCommonPasswords(password)) {
        return false;
    }
    return true;
}
