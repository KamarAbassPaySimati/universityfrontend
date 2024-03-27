const invalidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
};

export default function verificationValidation (state, setErrorState, ignoreKey) {
    let isValid = true;

    for (const key in state) {
        if (key === ignoreKey) {
            console.log('ignored');
            continue;
        }
        if (state[key].trim() === '') {
            setErrorState((prevState) => ({
                ...prevState,
                [key]: 'Required field'
            }));
            isValid = false;
        }
    }
    if (ignoreKey === 'phoneNumber') {
        if (invalidEmail(state.email)) {
            setErrorState((prevState) => {
                return { ...prevState, email: 'Invalid email' };
            });
            isValid = false;
        }
    } else if (ignoreKey === 'email') {
        if (state?.phoneNumber.length < 11) {
            setErrorState((prevState) => {
                return { ...prevState, phoneNumber: 'Invalid phone number' };
            });
            isValid = false;
        }
    }

    return isValid;
}
