let emailRegex;

if (import.meta.env.VITE_STAGE === 'dev' ||
     import.meta.env.VITE_STAGE === 'qa' ||
      import.meta.env.VITE_STAGE === 'pre-production' ||
       import.meta.env.VITE_STAGE === 'prod') {
    emailRegex = /^[^\s@]+@(paymaart\.(net|com)|7edge\.com)$/;
} else {
    emailRegex = /^[^\s@]+@paymaart\.(net|com)$/;
}

export default function emailValidation (email) {
    return emailRegex.test(email);
}
