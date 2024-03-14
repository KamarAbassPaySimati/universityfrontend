/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import isValid from './components/validation'
import LoginPage from './components/LoginPage'
import Totp from './components/Totp'
import { signIn, getCurrentUser, updateUserAttribute, setUpTOTP } from 'aws-amplify/auth'

const Login = () => {
    const initailState = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initailState)
    const [errors, setErrors] = useState(initailState)
    const [loginError, setloginError] = useState('')

    const [isLoginPage, setIsLoginPage] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setuserData] = useState('')
    const [Qrcode, setQrcode] = useState('')

    const { email, password } = formData

    async function handleUpdateUserAttribute (url) {
        try {
            const user = await getCurrentUser()
            console.log(url, 'url')
            const output = await updateUserAttribute({
                userAttribute: {
                  attributeKey: 'custom:mfa_secret',
                  value: url
                }
              })
            console.log('SUCCESS') // SUCCESS
        } catch (err) {
            console.log(err)
        }
    }

    function handleSignInNextSteps (output) {
        console.log(output, 'output')
        const { nextStep } = output
        switch (nextStep.signInStep) {
          // ...
          case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
            const totpSetupDetails = nextStep.totpSetupDetails
            console.log(totpSetupDetails, 'totp')
            const appName = 'my_app_name'
            const setupUri = totpSetupDetails.getSetupUri(appName)
            console.log(setupUri, 'upUri')
            // Open setupUri with an authenticator APP to retrieve an OTP code
            break
          // ...
        }
      }

    const handleLogin = async (e, key) => {
        e.preventDefault()
        setErrors(initailState)
        setloginError('')
        if (!isValid(formData, setErrors)) {
            return;
        }
        setIsLoading(true)
        try {
            const loginresponse = await signIn({
                username: email,
                password
            })
            handleSignInNextSteps(loginresponse)
            const totpSetupDetails = await setUpTOTP(loginresponse)
            const appName = 'my_app_name'
            const setupUri = totpSetupDetails.getSetupUri(appName)
            console.log(setupUri)
            // if (loginresponse.challengeName === undefined) {
            //     const res = await setUpTOTP(loginresponse)
            //     const authCode =
            //         'otpauth://totp/Admin?secret=' +
            //         res.sharedSecret +
            //         '&issuer=Paymaart'
            //     await handleUpdateUserAttribute(authCode)
            //     if (authCode) {
            //         // set qr ui
            //         setQrcode(authCode)
            //         setIsLoading(false)
            //     }
            // }
            setuserData(loginresponse)
            setIsLoading(false)
            setIsLoginPage(false)
            // Login successful, redirect or perform any other actions
        } catch (error) {
            if (error.name === 'UserNotConfirmedException') {
                // User is not confirmed
                // Show a message or redirect to a confirmation page
                setloginError("UserNotConfirmelocalStorage.setItem('login_time', moment());dException")
            } else if (
                error.name === 'NotAuthorizedException' &&
                error.message !== 'User is disabled.'
            ) {
                // Incorrect username or password
                // Show an error message
                setloginError('Invalid credentials')
            } else if (
                error.name === 'NotAuthorizedException' &&
                error.message === 'User is disabled.'
            ) {
                setloginError('Deactivated account. Please contact support')
            } else if (error.name === 'UserNotFoundException') {
                // User does not exist
                // Show an error message or redirect to a signup page
                setloginError('Invalid credentials')
            } else if (error.name === 'InvalidLambdaResponseException') {
                setloginError('User account is disabled. Please contact our support team for assistance.')
            } else if (error.name === 'UserLambdaValidationException') {
                // Handle other exceptions or display a generic error message
                setloginError('Invalid credentials')
            } else if (error.name === 'InvalidParameterException') {
                // Handle other exceptions or display a generic error message
                setloginError('Invalid credentials')
            } else {
                setloginError('Something went wrong')
            }
            console.log(error)
            setIsLoading(false)
        }
    }

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
