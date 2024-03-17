import React from 'react';
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const SuccessfulLogin = () => {
    const navigate = useNavigate();

    const handleDone = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <div className='border border-neutral-outline max-w-[627.5px] gap-[27px] rounded-[8px] mb-10 flex p-12'>
                <Image src='security-icon' />
                <div className='flex flex-col items-start justify-center font-[400]'>
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
