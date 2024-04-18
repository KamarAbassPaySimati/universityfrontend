import React, { useState } from 'react';
import Button from '../Button/Button';
import KYCRegistrationPopup from './KYCRegistrationPopup';
import KYCRegistrationStatusPart from './KYCRegistrationStatusPart';
import { useNavigate } from 'react-router-dom';

export default function KYCFinalPage () {
    const [registrationProcess, setRegistrationProcess] = useState(false);
    const Navigate = useNavigate();
    return (
        <div className='flex w-full py-8 h-heightFullWithPadding'>
            <KYCRegistrationStatusPart status={'In review'}/>
            <div className='w-[60%] bg-[#ffffff] px-[80px] flex flex-col items-center'>
                <p className='font-normal text-[24px] leading-[32px] py-[26px]'>KYC Registration</p>
                <p className='mt-[70px] font-bold text-[30px] leading-10 text-accent-positive'>Submission Successful!</p>
                <p data-testid="KYC_success_message"
                    className='text-center text-[18px] leading-[26px] font-normal text-neutral-secondary mt-[18px] mb-[112px]'>
                    Thank you for providing your information. This is received into our review process.
                    We will confirm its acceptance
                    or otherwise shortly. To your registered email address.
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
            </div>
            <KYCRegistrationPopup handleClose={() => setRegistrationProcess(false)} isModalOpen={registrationProcess}/>
        </div>
    );
}
