import React from 'react'
import { useState } from 'react'
import NewPasswordSet from './components/NewPasswordSet'
import ForgotPasswordEmail from './components/ForgotPasswordEmail'
import PasswordUpdateSuccess from './components/PasswordUpdateSuccess'

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
        <div className='bg-primary-normal'>
            <img className='fixed bottom-[30px] right-[100px] object-cover z-10' src='images/login_img.svg' />
            <div >
                <div className='h-screen w-screen flex flex-col justify-center items-center gap-20'>
                    {/* <NewPasswordSet /> */}
                    <PasswordUpdateSuccess/>
                    {/* <div className='z-20 left-0 ml-[80px] w-max max-w-[calc(100vw-90px)] break-words place-self-start'>
                        <h1 className='text-[#fff] font-[500] text-[16px]'>Note: Password Guidelines</h1>
                        <ul className='text-[#fff] font-[400] text-[14px]'>
                            <li>Passwords must not include spaces or any punctuation marks like '.', '!', or '?'.</li>
                            <li>Avoid using easily guessable personal information such as your name, birthdate, or common words.</li>
                            <li>Do not use simple patterns like '12345678', '22446688', 'password', or sequential keyboard patterns like 'qwerty'.</li>
                            <li>Make sure passwords are created with random combinations of characters for better security.</li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>


    )
}

export default SetNewPassword



