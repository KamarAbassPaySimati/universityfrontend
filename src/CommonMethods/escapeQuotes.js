export function escapeSingleQuotes (payload) {
    // Convert the payload to a string
    const jsonString = JSON.stringify(payload);
    // Escape single quotes in the string
    const escapedString = jsonString.replace(/'/g, "\\'");
    return escapedString;
};
