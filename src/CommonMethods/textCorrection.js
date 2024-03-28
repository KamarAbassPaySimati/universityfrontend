export default function addApostrophe (str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "'") {
            result += "''"; // Add an apostrophe
        } else {
            result += str[i];
        }
    }
    return result;
}
