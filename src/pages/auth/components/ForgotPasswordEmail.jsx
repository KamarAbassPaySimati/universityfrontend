import React from 'react'
import { useState } from 'react'
import InputField from '../../../components/InputField/InputField'

 const ForgotPasswordEmail = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [isSuccessPage, setIsSuccess] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        // when the error comes for email
        // setError('invalid Email')
        setIsSuccess(true)
        
        //api
    }

    const changeHandler = (e) => {
        setEmail(e.target.value)
    }

    const focusHandler = () => {
      console.log("error")
      setError('')
    }
    return (
        <div className='z-20 relative bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
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
                                    rounded-[8px] mt-8'>
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}
export default ForgotPasswordEmail
