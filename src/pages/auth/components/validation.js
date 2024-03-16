import emailValidation from '../../../CommonMethods/emailValidtion';

export default function isValid (formData, setErrors) {
    let isValid = true;
    for (const key in formData) {
        if (formData[key].trim() === '') {
            setErrors((prevState) => ({
                ...prevState,
                [key]: 'This field is mandatory'
            }));
            isValid = false;
        } else if (formData.email.trim() !== '' && !emailValidation(formData.email)) {
            setErrors(prevState => {
                return { ...prevState, email: 'Invalid email' };
            });
            isValid = false;
        }
    }
    return isValid;
}
