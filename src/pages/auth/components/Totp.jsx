/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
import React, { useState, useContext } from 'react';
import CircularNumber from './CircularNumber';
// import { QRCode } from 'react-qrcode-logo';
import QRCode from 'qrcode.react';
import Button from '../../../components/Button/Button';
import MFA from './MFA';
import { confirmSignIn, fetchUserAttributes, updateMFAPreference, updateUserAttribute } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { login, logout, setUser } from '../authSlice';
import Image from '../../../components/Image/Image';
import SuccessfulLogin from './SuccessfulLogin';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../../components/Context/GlobalContext';

const Totp = ({ Qrcode }) => {
    const [isScanPage, setIsScanPage] = useState(true);
    const { setToastError } = useContext(GlobalContext);

    const nextHandler = () => {
        setIsScanPage(false);
    };

    const [otp, setOtp] = useState(Array(6).fill(''));
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successfulLogin, setSuccessfulLogin] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleScanAgain = () => {
        setIsScanPage(true);
        setOtp(Array(6).fill(''));
    };

    async function handleUpdateMFAPreference () {
        try {
            await updateMFAPreference({ totp: 'PREFERRED' });
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUpdateUserAttribute (url) {
        try {
            // eslint-disable-next-line no-unused-vars
            const output = await updateUserAttribute({
                userAttribute: {
                    attributeKey: 'custom:mfa_secret',
                    value: url
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    const handleFetchUserAttributes = async () => {
        try {
            const userAttributes = await fetchUserAttributes();
            if (userAttributes) {
                dispatch(setUser(userAttributes));
                dispatch(login());
                navigate('/dashboard');
                setIsLoading(false);
            }
        } catch (error) {
            dispatch(setUser(''));
            dispatch(logout());
            setIsLoading(false);
        }
    };

    // OTP submit handler
    const handleTotpVerify = async (e) => {
        e.preventDefault();
        setOtpError('');
        const val = otp.toString().replace(/,/g, '');
        if (val.split('').length < 6) {
            setOtpError('Invalid code');
            setOtp(Array(6).fill(''));
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            // eslint-disable-next-line no-unused-vars
            const cognitoUserSession = await confirmSignIn({ challengeResponse: val });
            // don't forget to set TOTP as the preferred MFA method
            handleUpdateMFAPreference();
            if (Qrcode) {
                handleUpdateUserAttribute(Qrcode);
                setSuccessfulLogin(true);
            } else {
                handleFetchUserAttributes();
            }
        } catch (error) {
            if (error.message.includes('session is expired')) {
                setOtpError('session has expired');
            } else if (error.message.includes('mismatch')) {
                setOtpError('Invalid code');
            } else if (error.message.includes('Invalid code')) {
                setOtpError('Invalid code');
            } else if (error.message === 'Missing required parameter Session') {
                setOtpError('Missing required parameter Session');
            } else if (error.__type === 'CodeMismatchException') {
                setOtpError('Invalid code');
            } else {
                setToastError(error.message);
            }
            setOtp(Array(6).fill(''));
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div>
                <div className='sticky top-0 left-0 bg-[#fff] mb-10'>
                    <Image src='Header'/>
                    <div className='bg-primary-normal text-[#fff] px-[67px] py-3 font-[400] text-[24px] leading-[32px]'>
                        {Qrcode ? 'Setup Two-Factor Authentication (2FA)' : 'Two-Factor Authentication (2FA)'}
                    </div>
                </div>
                {Qrcode && !successfulLogin && <div className='flex gap-4 justify-center items-center mt-[106px] mb-[57px]'>
                    <CircularNumber text='1' active={isScanPage} />
                    <div className='text-neutral-primary'>
                        Scan QR Code
                    </div>
                    <Image src='line' />
                    <CircularNumber text='2' active={!isScanPage} />
                    <div className='text-neutral-primary'>
                        Authentication OTP
                    </div>
                </div>}
                <div className={`flex justify-center items-center ${Qrcode && !successfulLogin ? '' : 'min-h-[calc(100vh-152px)]'} ${successfulLogin ? 'flex-col' : ''}`}>
                    <>
                        {Qrcode
                            ? successfulLogin
                                ? <SuccessfulLogin handleFetchUserAttributes={handleFetchUserAttributes} />
                                : (isScanPage
                                    ? <div className='p-8 border border-neutral-outline max-w-[420px] rounded-[8px] mb-10'>
                                        <div className='text-center'>
                                            <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                                                Paymaart QR Code
                                            </div>
                                            <div className='text-neutral-secondary font-[400] text-[14px] leading-[24px]'>
                                                Scan QR Code using your Google Authenticator app
                                            </div>
                                        </div>
                                        <div data-testid="qr_code" className='flex justify-center mt-8'>
                                            <div className='relative'>
                                                <QRCode value={Qrcode} level="H" size={200}/>
                                                <Image
                                                    className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 h-[32px] w-[32px]'
                                                    src='qr_logo' />
                                            </div>
                                        </div>
                                        <Button testId='proceed_next_button' onClick={nextHandler} text='Next' className='mt-9' />
                                    </div>
                                    : <MFA
                                        isLoading={isLoading}
                                        handleSubmit={handleTotpVerify}
                                        otp={otp} setOtp={setOtp}
                                        setOtpError={setOtpError}
                                        otpError={otpError}
                                        handleScanAgain={handleScanAgain}
                                    />)
                            : <MFA
                                isLoading={isLoading}
                                isSecondTime={true}
                                handleSubmit={handleTotpVerify}
                                otp={otp} setOtp={setOtp}
                                setOtpError={setOtpError}
                                otpError={otpError}
                                handleScanAgain={handleScanAgain}
                            />
                        }
                    </>
                </div>
            </div>
        </div>
    );
};

export default Totp;
