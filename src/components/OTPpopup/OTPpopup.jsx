import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import Image from '../Image/Image';
import OtpInputField from '../../pages/auth/components/OtpInputField';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import formatTime from '../../CommonMethods/formatTimer';
import { dataService } from '../../services/data.services';

export default function OTPpopup ({ isOpen, handleClose, encryptedCode, basicViewDetails, handleTabChangeOtp, navigationPath }) {
    const [otp, setOtp] = useState(Array(6).fill(''));
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (otp.join('') === '') {
            setError('Required field');
            setIsLoading(false);
        } else {
            try {
                const res = await dataService.PostAPI('kyc-update/verify-otp-secure', {
                    otp: otp.join(''),
                    encryptedOTP: encryptedCode
                });
                setIsLoading(false);
                if (res.error) {
                    setError(res.data.data.message);
                } else {
                    setTimer(2 * 60);
                    handleTabChangeOtp();
                    handleClose();
                }
            } catch (error) {
            // setError(error.message);
                console.log('ennnnnnrr', error);
            }
        }
    };
    const handleResendClick = () => {
        if (!isLoading) {
            setResend(resend + 1);
            setTimer(2 * 60);
        }
    };
    useEffect(() => {
        if (encryptedCode !== '') {
            setTimer(2 * 60);
        }
    }, [encryptedCode]);
    return (
        <div className='merchant'>
            <Modal center open={isOpen} onClose={navigationPath} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal ' data-testid="otp_modal">
                    <img src="/images/gray-close.svg"
                        alt="close-icon" onClick={navigationPath} className='absolute top-4 right-2.5 cursor-pointer'/>
                    <div className="p-6 w-full bg-white rounded-[8px]" data-testid="modal">
                        <Image src={'otp_img'} className={'mx-auto'}/>
                        <h1 className='font-normal text-[20px] leading-7 text-center'>One Time Password (OTP)</h1>
                        <p className='font-normal text-[14px] leading-6 text-[#A4A9AE] text-center'>
                            Enter the one time password sent to
                            {basicViewDetails?.phone_number
                                ? ` ${'*'.repeat(Math.max(0, basicViewDetails?.phone_number?.toString().length - 4))}
                        ${basicViewDetails?.phone_number?.toString().slice(-4)}`
                                : '********* '}</p>
                        <form className='flex flex-col mt-6' onSubmit={(e) => handleSubmit(e)}>
                            <OtpInputField
                                numInputs={6}
                                otp={otp}
                                setOTP={setOtp}
                                setError={setError}
                                testId={'opt'}
                            />
                            {error && <ErrorMessage error={error} />}
                            <Button testId="verify_OTP"
                                className={'mt-4'} disabled={encryptedCode === ''} isLoading={isLoading} text='Verify' />
                        </form>
                        <div className={'flex items-center justify-center mt-6'}>
                            {(resend < 4
                                ? <div className='font-[400] text-[12px] leading-[20px] text-neutral-primary'>
                                    Didn’t receive OTP?
                                    {timer > 0
                                        ? <span> &nbsp;Resend in {formatTime(timer)}</span>
                                        : <button onClick={handleResendClick} disabled={(resend === 0 || isLoading)} className={`
                                    ${(isLoading || resend === 0) ? 'cursor-default' : 'cursor-pointer'} text-primary-normal`}
                                        >
                                            &nbsp;Resend
                                        </button>}
                                </div>
                                : <div className='text-accent-information font-[400] text-[12px] leading-[24px]'>
                                    Resend limit is 3 times
                                </div>)}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
