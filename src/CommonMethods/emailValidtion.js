const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function emailValidation (email) {
    return emailRegex.test(email);
}
