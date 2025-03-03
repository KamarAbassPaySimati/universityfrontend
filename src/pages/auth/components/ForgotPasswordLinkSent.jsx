import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordLinkSent = () => {
    const navigate = useNavigate();
    return (
        <div className='z-20 bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
            <div className='flex justify-center items-center mb-9'>
                <img src='/images/logo.svg' loading='lazy'/>
            </div>
            <div>

                <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                    Reset Password
                </div>
                <div className='text-accent-positive font-[400] text-[14px] leading-[24px] max-w-[350px]'>
                    Check your email for a password reset link. The link will be active for 10 minutes.
                </div>
                <button data-testid="back_to_login" onClick={() =>
                    navigate('/')} className='w-full text-[#fff] bg-primary-normal font-semibold text-[14px] leading-[24px] py-2
                                    rounded-[8px] mt-8'>
                    Login
                </button>

            </div>
        </div>
    );
};
export default ForgotPasswordLinkSent;
