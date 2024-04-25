import React, { useState } from 'react';
import Button from '../Button/Button';
import KYCRegistrationPopup from './KYCRegistrationPopup';
import KYCRegistrationStatusPart from './KYCRegistrationStatusPart';
import { useNavigate } from 'react-router-dom';

export default function KYCFinalPage ({ states, handleBackPage, buttonText }) {
    const [registrationProcess, setRegistrationProcess] = useState(false);
    const Navigate = useNavigate();
    return (
        <div className='flex w-full py-8 h-heightFullWithPadding'>
            <KYCRegistrationStatusPart buttonText={buttonText}/>
            <div className='w-[60%] bg-[#ffffff] px-[80px] flex flex-col items-center'>
                <p className='font-normal text-[24px] leading-[32px] py-[26px]'>KYC Registration</p>
                {buttonText === 'In review' &&
                <p className='mt-[70px] font-bold text-[30px] leading-10 text-accent-positive'>Submission Successful!</p>}
                <p data-testid="KYC_success_message"
                    className='text-center text-[18px] leading-[26px] font-normal text-neutral-secondary mt-[18px] mb-[112px]'>
                    {buttonText === 'In review'
                        ? `Thank you for providing your information. This is received into our review process.
                    We will confirm its acceptance
                    or otherwise shortly. To your registered email address.`
                        : 'Complete registration now for full access to  Paymaart services'}
                </p>
                <div className='w-[500px]'>
                    <Button
                        className=' text-[#F6F8F9] h-10 rounded-md
                                 bg-primary-normal p-1 text-[14px] leading-[24px] font-medium'
                        testId='kyc-btn'
                        text={'Finish'}
                        onClick={() => Navigate('/users/agents')}
                    />
                </div>
                {buttonText !== 'In review' &&
                <div
                    className='mt-6 text-[#3B2A6F] font-normal text-[14px] leading-6 cursor-pointer'
                    onClick={handleBackPage}
                >
                    Complete KYC Registration
                </div>}
            </div>
            <KYCRegistrationPopup handleClose={() => setRegistrationProcess(false)} isModalOpen={registrationProcess}/>
        </div>
    );
}
