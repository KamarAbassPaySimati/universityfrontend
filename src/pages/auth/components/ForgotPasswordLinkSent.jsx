import React from 'react'
import { useState } from 'react'
import InputField from '../../../components/InputField/InputField'

 const ForgotPasswordLinkSent = () => {
    const initailState = {
        email: '',
    }

    const [errors, setErrors] = useState(initailState)

    const submitHandler = (e) => {
        e.preventDefault()

        setErrors(prevState => {
            return { ...prevState, email: 'Invalid email' }
        })
    }
    return (
        <div className='z-20 bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
            <div className='flex justify-center items-center mb-9'>
                <img src='/images/logo.svg' />
            </div>
            <div>
              
                    <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                        Reset Password
                    </div>
                    <div className='text-accent-positive font-[400] text-[14px] leading-[24px]'>
                        Check your email for a password reset link. The link <br></br>will be active for 10 minutes.
                    </div>
                    <button onClick={() => navigate('/')}className='w-full text-[#fff] bg-primary-normal font-[600] text-[14px] leading-[24px] py-2
                                    rounded-[8px] mt-8'>
                        Login
                    </button>
                
            </div>
        </div>
    )
}
export default ForgotPasswordLinkSent
