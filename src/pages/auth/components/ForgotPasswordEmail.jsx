import React from 'react'
import { useState } from 'react'
import InputField from '../../../components/InputField/InputField'

const ForgotPasswordEmail = ({ setIsSuccess, isSuccess }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')

    // regex check for email and call the api
    const submitHandler = (e) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@(paymaart\.(net|com)|7edge\.com)$/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            setError('Invalid Email');
            setIsSuccess(false); // Set isSuccess to false since the email is invalid
        } else {
            setIsSuccess(true);
            // Make API call here
        }
    }
    // set the email
    const changeHandler = (e) => {
        setEmail(e.target.value)
    }
    
    const focusHandler = () => {
        setError('')
    }
    return (
        <div className='z-20 bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
            <div className='flex justify-center items-center mb-9'>
                <img src='/images/logo.svg' />
            </div>
            <div>
                <div className='mb-9'>
                    <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                        Reset Password
                    </div>
                    <div className='text-neutral-secondary font-[400] text-[14px] leading-[24px]'>
                        Enter registered email to reset your password
                    </div>
                </div>
                <form onSubmit={submitHandler} className='flex flex-col gap-[16px]'>
                    <InputField
                        value={email}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='email'
                        error={error}
                        label='Email'
                        placeholder='Enter email'
                    />
                    <button className='w-full text-[#fff] bg-primary-normal font-[600] text-[14px] leading-[24px] py-2
                                    rounded-[8px] mt-4'>
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}
export default ForgotPasswordEmail
