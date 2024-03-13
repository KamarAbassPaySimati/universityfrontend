import React from 'react'
import { useState } from 'react'
import InputField from '../../../components/InputField/InputField'

 const SetNewPassword = () => {
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
                <div className='mb-9'>
                    <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                        Set Reset Password
                    </div>
                    <div className='text-neutral-secondary font-[400] text-[14px] leading-[24px]'>
                        Enter registered email to reset your password
                    </div>
                </div>
                <form onSubmit={submitHandler} className='flex flex-col gap-[16px]'>
                    <InputField
                        setErrors={setErrors}
                        id='New Password' error={errors?.email}
                        label='Email'
                        placeholder='Enter new password'
                    />
                    <InputField
                        setErrors={setErrors}
                        id='Confirm New Password' error={errors?.email}
                        label='Email'
                        placeholder='Re-enter new password'
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
export default SetNewPassword
