let emailRegex;
console.log('import.meta.env.VITE_STAGE ', import.meta.env.VITE_STAGE);
if (import.meta.env.VITE_STAGE === 'dev' || import.meta.env.VITE_STAGE === 'qa') {
    emailRegex = /^[^\s@]+@(paymaart\.(net|com)|7edge\.com)$/;
} else {
    emailRegex = /^[^\s@]+@paymaart\.(net|com)$/;
}

export default function emailValidation (email) {
    return emailRegex.test(email);
}
