/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import isValid from './components/validation';
import LoginPage from './components/LoginPage';
import Totp from './components/Totp';
import { signIn } from 'aws-amplify/auth';

const Login = () => {
    const initailState = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initailState);
    const [errors, setErrors] = useState(initailState);
    const [loginError, setloginError] = useState('');

    const [isLoginPage, setIsLoginPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [Qrcode, setQrcode] = useState('');

    const { email, password } = formData;

    function handleSignInNextSteps (output) {
        const { nextStep } = output;
        switch (nextStep.signInStep) {
          // ...
          case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
            const totpSetupDetails = nextStep.totpSetupDetails;
            const appName = 'Paymaart';
            const setupUri = totpSetupDetails.getSetupUri(appName);
            setQrcode(setupUri.href);
            // Open setupUri with an authenticator APP to retrieve an OTP code
            break;
          // ...
        }
      }

    const handleLogin = async (e, key) => {
        e.preventDefault();
        setErrors(initailState);
        setloginError('');
        if (!isValid(formData, setErrors)) {
            return;
        }
        setIsLoading(true);
        try {
            const loginresponse = await signIn({
                username: email,
                password
            });
            handleSignInNextSteps(loginresponse);
            setIsLoading(false);
            setIsLoginPage(false);
            // Login successful, redirect or perform any other actions
        } catch (error) {
            if (error.name === 'UserNotConfirmedException') {
                // User is not confirmed
                // Show a message or redirect to a confirmation page
                setloginError("UserNotConfirmelocalStorage.setItem('login_time', moment());dException");
            } else if (
                error.name === 'NotAuthorizedException' &&
                error.message !== 'User is disabled.'
            ) {
                // Incorrect username or password
                // Show an error message
                setloginError('Invalid credentials');
            } else if (
                error.name === 'NotAuthorizedException' &&
                error.message === 'User is disabled.'
            ) {
                setloginError('Deactivated account. Please contact support');
            } else if (error.name === 'UserNotFoundException') {
                // User does not exist
                // Show an error message or redirect to a signup page
                setloginError('Invalid credentials');
            } else if (error.name === 'InvalidLambdaResponseException') {
                setloginError('User account is disabled. Please contact our support team for assistance.');
            } else if (error.name === 'UserLambdaValidationException') {
                // Handle other exceptions or display a generic error message
                setloginError('Invalid credentials');
            } else if (error.name === 'InvalidParameterException') {
                // Handle other exceptions or display a generic error message
                setloginError('Invalid credentials');
            } else {
                setloginError('Something went wrong');
            }
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {

    }, [formData]);

    return (
        <>
            {isLoginPage
                ? <LoginPage handleSubmit={handleLogin} formData={formData} setErrors={setErrors} errors={errors}
                        setFormData={setFormData} loginError={loginError} setloginError={setloginError} isLoading={isLoading} />
                : <Totp Qrcode={Qrcode} />
            }
        </>
    );
};

export default Login;
