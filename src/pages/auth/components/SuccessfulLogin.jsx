import React from 'react';
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';

const SuccessfulLogin = () => {
    const dispatch = useDispatch();

    const handleDone = () => {
        dispatch(login());
    };

    return (
        <>
            <div className='border border-neutral-outline max-w-[627.5px] rounded-[8px] mb-10 flex justify-center items-center'>
                <Image src='security-icon' />
                <div className='flex items-center gap-[27px] font-[400]'>
                    <h1 className='text-[20px] leading-[28px] text-[#000000]'>
                        Successfully Enabled
                    </h1>
                    <p className='text-[14px] leading-[24px] text-neutral-secondary'>
                        Each time you log in using your email and password,
                        please enter the 6-digit code generated from Google Authenticator app
                    </p>
                </div>
            </div>
            <Button onClick={handleDone} text='Done' className='w-[167px]' />
        </>
    );
};

export default SuccessfulLogin;
