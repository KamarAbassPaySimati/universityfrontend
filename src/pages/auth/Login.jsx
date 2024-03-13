import React, { useState } from 'react'
import InputField from '../../components/InputField/InputField'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const initailState = {
        email: '',
        password: ''
    }

    const navigate = useNavigate()
    // const [formData, setFormData] = useState(initailState)
    const [errors, setErrors] = useState(initailState)

    const submitHandler = (e) => {
        e.preventDefault()

        setErrors(prevState => {
            return { ...prevState, email: 'Invalid email' }
        })
    }

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
                        <form onSubmit={submitHandler} className='flex flex-col gap-[16px]'>
                            <InputField
                                setErrors={setErrors}
                                id='email' error={errors?.email}
                                label='Email'
                                placeholder='Enter email'
                            />
                            <InputField
                                setErrors={setErrors}
                                id='password'
                                error={errors?.password}
                                label='Password'
                                placeholder='Enter password'
                            />
                            <button className='w-full text-[#fff] bg-primary-normal font-[600] text-[14px] leading-[24px] py-2
                                    rounded-[8px] mt-8'>
                                Login
                            </button>
                        </form>
                        <div onClick={() => navigate('/ForgotPassword')} className='mt-6 cursor-pointer text-primary-normal font-[400] text-[14px] leading-[24px]
                            text-center'>
                            Forgot Password?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
