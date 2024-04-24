const invalidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
};

export default function verificationValidation (state, setErrorState, ignoreKey) {
    console.log(state, 'state');
    console.log(setErrorState, 'er');
    console.log(ignoreKey, 'ig');

    let isValid = true;
    const stateValiable = { ...state };
    delete stateValiable.profileImage;
    delete stateValiable.makeProfilePublic;
    for (const key in stateValiable) {
        if (key === ignoreKey) {
            continue;
        }
        console.log('key', key, state[key]);
        if (state[key]?.trim() === '') {
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
