import React from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordUpdateSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className='z-20 relative bg-[#FFFFFF] p-8 rounded-[8px] min-w-[550px] flex flex-col justify-center items-center'>
            <div className='flex mx-2 my-2 border border-gray-300 rounded p-10 gap-10'>
                <img src='/images/passwordUpdate.svg' alt="" className='w-[95px] h-[94px]' />
                <div className='flex flex-col mt-[20px]'>
                    <h2 className='font-[400] text-[20px] text-[#000000]'>Password Changed</h2>
                    <h2 className='font-[400] text-[14px] mt-[7.58px] text-[#A4A9AE]'>
                        Your password has been succesfully changed</h2>
                </div>
            </div>
            <button data-testid="back_to_login"
                onClick={() => navigate('/')}
                className='w-[191px] text-[#fff] bg-primary-normal font-[600] text-[14px] leading-[24px] py-2
                                rounded-[8px] mt-4'>
                Back to Login
            </button>
        </div>
    );
};
export default PasswordUpdateSuccess;
