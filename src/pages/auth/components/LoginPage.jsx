import React, { useEffect, useRef, useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Image from '../../../components/Image/Image';
import ReCAPTCHA from 'react-google-recaptcha';
import { siteKey } from '../../../config';

const DELAY = 1500;

const LoginPage = ({ handleSubmit, setFormData, formData, setErrors, errors, loginError, setloginError, isLoading }) => {
    const navigate = useNavigate();
    const [enteredLetter, setEnteredLetter] = useState();

    const handleFocus = (id) => {
        setloginError('');
        setErrors(prevState => {
            return { ...prevState, [id]: '' };
        });
    };

    const handleChange = (e, id) => {
        if (id === 'password' && /\s|[.!?]/.test(enteredLetter)) {
            return;
        }
        if (enteredLetter && enteredLetter === ' ') {
            return;
        }
        setFormData(prevState => {
            return { ...prevState, [id]: e.target.value };
        });
    };
    const reCaptchaRef = useRef();
    const [load, setLoad] = useState(false);
    const [value, setValue] = useState('[empty]');
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoad(true);
        }, DELAY);
        return () => clearTimeout(timer);
    }, []);
    const handleChangeRecap = (value) => {
        console.log('onChange prop - Captcha value:', value);
        setValue(value);
        if (value === null) alert('Token Expired');
    };

    const asyncScriptOnLoad = () => {
        setRecaptchaLoaded(true);
    };
    const onSubmitValue = (e) => {
        if (window.location.href !== 'http://localhost:3000/') {
            const token = reCaptchaRef.current.execute();
            console.log('token', value, token);
            if (value) {
                handleSubmit(e);
            } else {
                alert('Invisible reCAPTCHA active—prove you\'re human to proceed!');
            }
        } else {
            handleSubmit(e);
        }
    };
    console.log('windowww', window.location.href !== 'http://localhost:3000/');
    return (
        <div className='bg-primary-normal'>
            <Image className='fixed bottom-[30px] right-[100px] object-cover z-10' src='login_img' />
            <div className='h-screen w-screen flex justify-center items-center'>
                <div className='z-20 bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
                    <div className='flex justify-center items-center mb-9'>
                        <Image src='logo' />
                    </div>
                    <div>
                        <div className='mb-9'>
                            <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                                Login
                            </div>
                            <div className='text-neutral-secondary font-[400] text-[14px] leading-[24px]'>
                                Welcome back!
                            </div>
                        </div>
                        <form className='flex flex-col gap-[16px]' onSubmit={onSubmitValue}>
                            <InputField
                                autoComplete='off'
                                testId='email_address'
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                id='email'
                                error={errors?.email}
                                loginError={loginError}
                                label='Email'
                                placeholder='Enter email'
                                setEnteredLetter={setEnteredLetter}
                            />
                            <InputField
                                autoComplete='off'
                                testId='password'
                                givenType='password'
                                value={formData.password}
                                type='password'
                                onChange={handleChange}
                                onFocus={handleFocus}
                                id='password'
                                error={errors?.password}
                                loginError={loginError}
                                label='Password'
                                placeholder='Enter password'
                                showLoginError={true}
                                setEnteredLetter={setEnteredLetter}
                            />
                            {(load && window.location.href !== 'http://localhost:3000/') && (
                                <ReCAPTCHA
                                    style={{ display: 'inline-block', height: '10px !important' }}
                                    theme="dark"
                                    size="invisible"
                                    ref={reCaptchaRef}
                                    sitekey={siteKey}
                                    onChange={handleChangeRecap}
                                    asyncScriptOnLoad={asyncScriptOnLoad}
                                />
                            )}
                            <Button
                                disabled={!recaptchaLoaded && window.location.href !== 'http://localhost:3000/'}
                                testId='login_button' isLoading={isLoading} text='Login' className='mt-4' />
                        </form>
                        {/* <div data-testid="forgot_password_link" onClick={() => navigate('/forgot-password')}
                            className='mt-6 cursor-pointer text-primary-normal font-[400] text-[14px] leading-[24px]
                            text-center'>
                            Forgot Password?
                        </div> */}
                        <div className='mt-6 text-primary-normal font-[400] text-[14px] leading-[24px] text-center'
                            style={{ userSelect: 'none' }}>
                            <a href="/forgot-password" data-testid="forgot_password_link"
                                onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }} className='cursor-pointer'>
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
