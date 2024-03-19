import React from 'react';
import Button from '../../../components/Button/Button';
import Button2 from '../../../components/Button2/Button2';
import OtpInputField from './OtpInputField';
import Image from '../../../components/Image/Image';

const MFA = ({ handleSubmit, otp, setOtp, setOtpError, otpError, handleScanAgain, isSecondTime, isLoading }) => {
    return (
        <div className='p-8 border border-neutral-outline max-w-[420px] rounded-[8px] mb-10'>
            <div className='flex justify-center'>
                <Image src='blueKey' alt='Key' />
            </div>
            <div className='mt-9 flex gap-6 flex-col'>
                <div className='font-[400]'>
                    <div className='text-[20px] leading-[28px] text-[#000000]'>
                        Two-Factor Authentication (2FA)
                    </div>
                    <div className='text-neutral-secondary text-[14px] leading-[24px]'>
                        Open your Google Authenticator app and enter the
                        6-digit code generated for this account
                    </div>
                </div>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <OtpInputField
                        handleSubmit={handleSubmit}
                        numInputs={6}
                        otp={otp}
                        setOTP={setOtp}
                        setError={setOtpError}
                        otpError={otpError}
                    />
                    <Button testId='submit_totp_form' isLoading={isLoading} text='Submit' />
                </form>
                {!isSecondTime && <Button2 testId='scan_qr_code_again' onClick={handleScanAgain} text='Scan Again' />}
            </div>
        </div>
    );
};

export default MFA;
