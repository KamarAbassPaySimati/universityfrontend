import securityAnswersCheck from './securityAnswersCheck';

export default function validation (state, setErrorState, verified, securityQuestions, setsecurityQuestionError,
    termsAccepted, setTermsAcceptedError) {
    let isValid = true;

    for (const key in state) {
        if (state[key].trim() === '') {
            setErrorState((prevState) => ({
                ...prevState,
                [key]: 'Required field'
            }));
            isValid = false;
        } else if (key === 'email' && !verified[key]) {
            console.log('yes');
            setErrorState((prevState) => ({
                ...prevState,
                [key]: ' Please verify your email address'
            }));
            isValid = false;
        } else if (key === 'phoneNumber' && !verified[key]) {
            setErrorState((prevState) => ({
                ...prevState,
                [key]: 'Please verify your phone number'
            }));
            isValid = false;
        }
    }
    if (!securityAnswersCheck(securityQuestions)) {
        setsecurityQuestionError(true);
        isValid = false;
    }
    if (!termsAccepted) {
        setTermsAcceptedError(true);
        isValid = false;
    }

    return isValid;
}
