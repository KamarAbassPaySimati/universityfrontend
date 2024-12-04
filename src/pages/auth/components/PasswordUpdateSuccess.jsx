/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import capitalizeFirstLetter from '../../../CommonMethods/capitalizeFirstLetter';

const PasswordUpdateSuccess = ({ activeType = 'PASSWORD' }) => {
    const navigate = useNavigate();
    return (
        <div className='z-20 relative bg-[#FFFFFF] p-8 rounded-[8px] flex flex-col justify-center items-center
        md:w-auto md:min-w-[425px] mx-[12px] md:mx-0'>
            <div className='flex md:flex-row flex-col mx-2 my-2 md:border md:border-gray-300 rounded p-10 gap-10 justify-center items-center md:text-left text-center '>
                <img src='/images/passwordUpdate.svg' alt="" className='w-[95px] h-[94px]' />
                <div className='flex flex-col'>
                    <h2 className='font-[400] text-[20px] text-[#000000]'>{`${capitalizeFirstLetter(activeType)} Changed`}</h2>
                    <h2 className='font-[400] text-[14px] mt-[7.58px] text-[#A4A9AE]'>
                        {`Your ${capitalizeFirstLetter(activeType)} has been successfully changed`}
                    </h2>
                </div>
            </div>
            <div className='mt-4'>
                <button data-testid="back_to_login"
                    onClick={() => navigate('/')}
                    className='w-[191px] text-[#fff] bg-primary-normal font-semibold text-[14px] leading-[24px] py-2
                                rounded-[8px]  hidden md:block'>
                    Back to Login
                </button>
            </div>
        </div>
    );
};
export default PasswordUpdateSuccess;
