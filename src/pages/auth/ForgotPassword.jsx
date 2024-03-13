import React, { useState } from 'react'
import ForgotPasswordEmail from '../auth/components/ForgotPasswordEmail'
import ForgotPasswordLinkSent from './components/ForgotPasswordLinkSent'

const ForgotPassword = () => {
    

    return (
        <div className='bg-primary-normal'>
            <img className='fixed bottom-[30px] right-[100px] object-cover z-10' src='images/login_img.svg' />
            <div className='h-screen w-screen flex justify-center items-center'>
                {/* <ForgotPasswordEmail/> */}
                <ForgotPasswordLinkSent/>
            </div>
        </div>
    )
}

export default ForgotPassword
