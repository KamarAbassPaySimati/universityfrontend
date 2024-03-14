/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import isValid from './components/validation';
import LoginPage from './components/LoginPage';
import Totp from './components/Totp';

const Login = () => {
    const initailState = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initailState);
    const [errors, setErrors] = useState(initailState);

    const [isLoginPage, setIsLoginPage] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!isValid(formData, setErrors)) {
            return;
        }

        console.log(isValid(formData, setErrors));
    };

    useEffect(() => {

    }, [formData]);

    return (
        <>
            {isLoginPage
                ? <LoginPage submitHandler = {submitHandler} formData={formData} setErrors={setErrors}
                        errors={errors} setFormData={setFormData} />
                : <Totp />
            }
        </>
    );
};

export default Login;
