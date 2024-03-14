import React, { useEffect } from 'react'
import InputField from '../../../components/InputField/InputField'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import { motion } from 'framer-motion'

const LoginPage = ({ handleSubmit, setFormData, formData, setErrors, errors, loginError, setloginError, isLoading }) => {
    const navigate = useNavigate()

    const handleFocus = (id) => {
        setloginError('')
        setErrors(prevState => {
            return { ...prevState, [id]: '' };
        });
    };

    const handleChange = (e, id) => {
        const value = e.target.value
        const enteredLetter = value[value.length - 1]
        if (id === 'password' && /\s|[.!?]/.test(enteredLetter)) {
            return;
        }
        setFormData(prevState => {
            return { ...prevState, [id]: value };
        });
    };

    return (
        <div className='bg-primary-normal'>
            <img className='fixed bottom-[30px] right-[100px] object-cover z-10' src='images/login_img.svg' />
            <div className='h-screen w-screen flex justify-center items-center'>
                <div className='z-20 bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
                    <div className='flex justify-center items-center mb-9'>
                        <img src='/images/logo.svg' />
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
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[16px]'>
                            <InputField
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                id='email'
                                error={errors?.email}
                                loginError={loginError}
                                label='Email'
                                placeholder='Enter email'
                            />
                            <InputField
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
                            />
                            <Button isLoading={isLoading} text='Login' className='mt-8' />
                        </form>
                        <div onClick={() => navigate('/forgot-password')}
                            className='mt-6 cursor-pointer text-primary-normal font-[400] text-[14px] leading-[24px]
                            text-center'>
                            Forgot Password?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
