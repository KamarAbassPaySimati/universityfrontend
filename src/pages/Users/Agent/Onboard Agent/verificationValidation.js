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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(state.email)) {
            setErrorState((prevState) => {
                return { ...prevState, email: 'Invalid email' };
            });
            isValid = false;
        }
    }

    return isValid;
}
