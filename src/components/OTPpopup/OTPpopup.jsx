import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import Image from '../Image/Image';
import OtpInputField from '../../pages/auth/components/OtpInputField';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import formatTime from '../../CommonMethods/formatTimer';

export default function OTPpopup () {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [resend, setResend] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let intervalId;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setTimer(5);
    };
    const handleResendClick = () => {
        if (!isLoading) {
            setResend(resend + 1);
            setTimer(5);
        }
    };
    return (
        <Modal center open={true} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
            <div className='customModal '>
                <div className="p-6 w-full bg-white rounded-[8px]" data-testid="modal">
                    <Image src={'otp_img'} className={'mx-auto'}/>
                    <h1 className='font-normal text-[20px] leading-7 text-center'>One Time Password (OTP)</h1>
                    <p className='font-normal text-[14px] leading-6 text-[#A4A9AE] text-center'>
                        Enter the one time password sent to *** *** 1254</p>
                    <form className='flex flex-col gap-6 mt-6' onSubmit={(e) => handleSubmit(e)}>
                        <OtpInputField
                            // handleSubmit={handleSubmit}
                            numInputs={6}
                            otp={otp}
                            setOTP={setOtp}
                            setError={setOtpError}
                            otpError={otpError}
                        />
                        <Button testId='submit_totp_form' isLoading={isLoading} text='Verify' />
                    </form>
                    <div className={'flex items-center justify-center mt-6'}>
                        {error && <ErrorMessage error={error} />}
                        {(resend < 4
                            ? <div className='font-[400] text-[12px] leading-[20px] text-neutral-primary'>
                                Didn’t receive OTP?
                                {timer > 0
                                    ? <span> &nbsp;Resend in {formatTime(timer)}</span>
                                    : <span onClick={handleResendClick} className={`
                                    ${isLoading ? 'cursor-default' : 'cursor-pointer'} text-primary-normal`}
                                    >
                                            &nbsp;Resend
                                    </span>}
                            </div>
                            : <div className='text-accent-information font-[400] text-[12px] leading-[24px]'>
                                Resend limit is 3 times
                            </div>)}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
