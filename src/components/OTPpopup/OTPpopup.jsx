import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import Image from '../Image/Image';
import OtpInputField from '../../pages/auth/components/OtpInputField';
import Button from '../Button/Button';

export default function OTPpopup () {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Modal center open={true} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
            <div className='customModal '>
                <div className="p-6 w-full bg-white rounded-[8px]" data-testid="modal">
                    <Image src={'otp_img'} className={'mx-auto'}/>
                    <h1 className='font-normal text-[20px] leading-7 text-center'>One Time Password (OTP)</h1>
                    <p className='font-normal text-[14px] leading-6 text-[#A4A9AE] text-center'>
                        Enter the one time password sent to *** *** 1254</p>
                    <form className='flex flex-col gap-6 mt-6' onSubmit={() => {}}>
                        <OtpInputField
                            handleSubmit={() => {}}
                            numInputs={6}
                            otp={otp}
                            setOTP={setOtp}
                            setError={setOtpError}
                            otpError={otpError}
                        />
                        <Button testId='submit_totp_form' isLoading={isLoading} text='Verify' />
                    </form>
                </div>
            </div>
        </Modal>
    );
}
