export function escapeSingleQuotes (payload) {
    // Convert the payload to a string
    var jsonString = JSON.stringify(payload);
    // Escape single quotes in the string
    var escapedString = jsonString.replace(/'/g, "\\'");
    return escapedString;
};
