export default function pinCheck (pin) {
    const pinRegex = /^\d{6}$/; // Matches exactly 6 digits
    if (!pinRegex.test(pin)) {
        return false;
    }
    return true;
}
