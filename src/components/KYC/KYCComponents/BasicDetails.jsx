/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react';
import InputFieldWithButton from '../../InputFieldWithButton/InputFieldWithButton';
import GlobalContext from '../../Context/GlobalContext';
import addBackslashBeforeApostrophe from '../../../CommonMethods/textCorrection';
import { formatInputPhone } from '../../../CommonMethods/formatInputPhone';
import verificationValidation from '../../../pages/Users/Agent/Onboard Agent/verificationValidation';
import { endpoints } from '../../../services/endpoints';
import { dataService } from '../../../services/data.services';
import FelidDivision from '../../FelidDivision/FelidDivision';

const BasicDetails = ({
    role, states, verified, setVerified, formData, setFormData, countryCode, setCountryCode, setSubmitSelected,
    submitSelected
}) => {
    const [enteredLetter, setEnteredLetter] = useState();
    const initialErrorState = { phoneNumber: '', email: '' };
    const [formErrors, setFormErrors] = useState(initialErrorState);

    const [otp, setOtp] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');

    const [otpError, setOtpError] = useState();

    const [verify, setVerify] = useState({
        email: false,
        phoneNumber: false
    });
    const [loadingEmailVerify, setLoadingEmailVerify] = useState(false);
    const [loadingPhoneVerify, setLoadingPhoneVerify] = useState(false);
    const [loadingOtpVerify, setLoadingOtpVerify] = useState(false);
    const [loadingPhoneNoOtpVerify, setloadingPhoneNoOtpVerify] = useState(false);

    const [otpToken, setOtpToken] = useState('');
    const [timer, setTimer] = useState(0);
    const [resendCount, setResendCount] = useState(0);
    const [numberMaxLength, setNumberMaxLength] = useState(11);
    const [isResendLoading, setIsResendLoading] = useState(false);
    const [isPhoneOtpResendLoading, setisPhoneOtpResendLoading] = useState(false);

    useEffect(() => {
        let intervalId;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer]);

    const { setToastError, setToastInformation } = useContext(GlobalContext);

    const { sendOtp, verifyOtp } = endpoints;

    const handleChange = (e, id) => {
        if (enteredLetter && enteredLetter === ' ') {
            return;
        }
        if (id === 'email' && e.target.value.includes("'")) {
            e.preventDefault(); // Prevent entering the single quote
            return;
        }
        if (id === 'email') {
            setVerified(prevState => {
                return { ...prevState, [id]: false };
            });
            setFormData(prevState => {
                return { ...prevState, [id]: e.target.value.toLowerCase() };
            });
            setVerify(prevState => {
                return { ...prevState, phoneNumber: false };
            });
            return;
        }
        if (id === 'phoneNumber') {
            setVerified(prevState => {
                return { ...prevState, [id]: false };
            });
            const formattedPhoneNumber = formatInputPhone(e.target.value);
            setFormData(prevState => {
                return { ...prevState, [id]: formattedPhoneNumber };
            });
            return;
        };

        setFormData(prevState => {
            return { ...prevState, [id]: e.target.value };
        });
    };

    const handleFocus = (id) => {
        setFormErrors((prevState) => {
            return { ...prevState, [id]: '' };
        });
        setSubmitSelected(false);
    };

    const handleOtpChange = (e, id) => {
        const value = e.target.value;
        if (value.length > 6) {
            return;
        }
        setOtp(value);
    };
    const handlePhoneOtpChange = (e, id) => {
        const value = e.target.value;
        if (value.length > 6) {
            return;
        }
        setPhoneOtp(value);
    };

    const handleOtpFocus = (e, id) => {
        setOtpError('');
        setSubmitSelected(false);
    };

    const handleVerifyEmail = async (text) => {
        setFormErrors(initialErrorState);
        if (text === 'EDIT') {
            setVerify(prevState => {
                return { ...prevState, email: false };
            });
            setOtp('');
            setOtpError('');
            setResendCount(0);
            return;
        }
        if (!verificationValidation(formData, setFormErrors, 'phoneNumber')) {
            return;
        }

        setFormErrors((prevState) => {
            return { ...prevState, email: '' };
        });

        const payload = {
            first_name: states.first_name,
            middle_name: states.middle_name,
            last_name: states.last_name,
            type: 'email',
            value: addBackslashBeforeApostrophe(formData.email)
        };

        if (text.includes('Otp')) {
            setIsResendLoading(true);
        } else {
            setLoadingEmailVerify(true);
        }
        const endPoint = role === 'agent' ? 'agent-users' : role === 'merchant' ? 'merchant-users' : 'customer-user';
        const response = await dataService.PostAPI(`${endPoint}/${sendOtp}`, payload);
        if (!response.error) {
            setOtp('');
            setOtpError('');
            setVerify(prevState => {
                return { ...prevState, email: true };
            });
            setToastInformation(`Verification code has been sent to ${role}’s email. It's valid for 10 minutes`);
            setTimer(60 * 2);
            setOtpToken(response?.data?.token);
            setResendCount(prevState => prevState + 1);
        } else {
            if (response?.data?.status === 409 || response?.data?.status === 400) {
                setFormErrors(prevState => {
                    return { ...prevState, email: response?.data?.data?.message };
                });
            } else {
                setToastError('Something went wrong!');
            }
        }
        setLoadingEmailVerify(false);
        setIsResendLoading(false);
    };
    const handleVerifyPhoneNumber = async (text) => {
        if (text === 'EDIT') {
            setVerify(prevState => {
                return { ...prevState, phoneNumber: false };
            });
            setPhoneOtp('');
            setOtpError('');
            setResendCount(0);
            return;
        }
        if (!verified.email) {
            setFormErrors((prevState) => {
                return { ...prevState, email: 'Please verify your email address' };
            });
            return;
        }
        if (!verificationValidation(formData, setFormErrors, 'email')) {
            return;
        }

        setFormErrors((prevState) => {
            return { ...prevState, phoneNumber: '' };
        });

        const payload = {
            first_name: states.first_name,
            middle_name: states.middle_name,
            last_name: states.last_name,
            type: 'sms',
            country_code: countryCode,
            value: formData.phoneNumber.replace(/\s/g, '')
        };

        if (text.includes('Otp')) {
            setisPhoneOtpResendLoading(true);
        } else {
            setLoadingPhoneVerify(true);
        }
        const endPoint = role === 'agent' ? 'agent-users' : role === 'merchant' ? 'merchant-users' : 'customer-user';
        const response = await dataService.PostAPI(`${endPoint}/${sendOtp}`, payload);
        if (!response.error) {
            setPhoneOtp('');
            setOtpError('');
            setVerify(prevState => {
                return { ...prevState, phoneNumber: true };
            });
            setToastInformation(`Verification code has been sent to ${role}’s phone number. It's valid for 10 minutes`);
            setTimer(60 * 2);
            setResendCount(prevState => prevState + 1);
            setOtpToken(response?.data?.token);
        } else {
            if (response?.data?.status === 409 || response?.data?.status === 400) {
                setFormErrors(prevState => {
                    return { ...prevState, phoneNumber: response?.data?.data?.message };
                });
            } else {
                setToastError('Something went wrong!');
            }
        }
        setLoadingPhoneVerify(false);
        setisPhoneOtpResendLoading(false);
    };

    const handleVerifyOtp = async (text, id) => {
        if (id === 'emailOtp') {
            if (otp.trim().length < 6) {
                setOtpError('Invalid OTP');
                return;
            }
        } else if (id === 'phoneNumberOtp') {
            if (phoneOtp.trim().length < 6) {
                setOtpError('Invalid OTP');
                return;
            }
        }

        const payload = {
            otp: id === 'emailOtp' ? otp : phoneOtp,
            token: otpToken
        };
        if (id === 'emailOtp') {
            setLoadingOtpVerify(true);
        } else if (id === 'phoneNumberOtp') {
            setloadingPhoneNoOtpVerify(true);
        }
        const endPoint = role === 'agent' ? 'agent-users' : role === 'merchant' ? 'merchant-users' : 'customer-user';
        const response = await dataService.PostAPI(`${endPoint}/${verifyOtp}`, payload);
        if (id === 'emailOtp') {
            setLoadingOtpVerify(false);
        } else if (id === 'phoneNumberOtp') {
            setloadingPhoneNoOtpVerify(false);
        }
        if (id === 'emailOtp') {
            setOtp('');
        } else if (id === 'phoneNumberOtp') {
            setPhoneOtp('');
        }

        if (!response.error) {
            let key = '';
            if (id.includes('email')) {
                key = 'email';
            } else if (id.includes('phoneNumber')) {
                key = 'phoneNumber';
            }
            setResendCount(0);
            setFormErrors(prevState => {
                return { ...prevState, [key]: '' };
            });
            setVerified(prevState => {
                return { ...prevState, [key]: true };
            });
            setVerify(prevState => {
                return { ...prevState, [key]: false };
            });
        } else {
            if (response?.data?.status === 400) {
                setOtpError(response?.data?.data?.message);
            } else if (response?.data?.status === 401) {
                setOtpError('Otp expired');
            } else {
                setToastError('Something went wrong!');
            }
        }
    };

    const BasicDetails = {
        nothing_to_show: {
            first_name: {
                label: 'First Name',
                type: 'input',
                key: 'first_name',
                require: false,
                disable: true
            },
            middle_name: {
                label: 'Middle Name',
                type: 'input',
                key: 'middle_name',
                require: false,
                disable: true
            },
            last_name: {
                label: 'Last Name',
                type: 'input',
                key: 'last_name',
                require: false,
                disable: true
            }
        }
    };
    return (
        <div data-testid="basic_details_screen">
            <FelidDivision
                divisionClassName = {'w-1/3'}
                divisionObject = {BasicDetails}
                handleOnChange={() => {}}
                states={states}
                submitSelected={false}
            />
            <h1 className='font-medium text-[#A4A9AE] text-[14px] leading-[22px] ml-2 my-[22px]'>
                Enter a valid email and phone number. To confirm it’s you, we will send a verification code.</h1>
            <div className='flex gap-[20px] flex-wrap ml-2'>
                <InputFieldWithButton
                    className='w-[339px]'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    id='email'
                    testId='email_address'
                    buttonTestId='verify_email_address'
                    error={formErrors.email || (submitSelected && !verified.email ? 'Please verify your email address' : '') }
                    label='Email'
                    placeholder='Enter email'
                    value={formData.email}
                    buttonText={verify.email ? 'EDIT' : 'VERIFY'}
                    setEnteredLetter={setEnteredLetter}
                    onClick={handleVerifyEmail}
                    verified={verified.email}
                    inputDisabled={verify.email}
                    buttonDisabled={formData?.email?.length < 1 || isResendLoading || loadingOtpVerify}
                    isLoading={loadingEmailVerify}
                    maxLength={100}
                />
                {verify.email &&
                <InputFieldWithButton
                    className='w-[339px]'
                    onChange={handleOtpChange}
                    onFocus={handleOtpFocus}
                    id='emailOtp'
                    testId='otp'
                    buttonTestId='verify_OTP'
                    error={otpError}
                    label='Verification Code'
                    placeholder='_ _ _ _ _ _'
                    value={otp}
                    buttonText={'VERIFY'}
                    setEnteredLetter={setEnteredLetter}
                    type='number'
                    onClick={handleVerifyOtp}
                    inputDisabled={loadingOtpVerify}
                    buttonDisabled={otp.length < 1 || loadingOtpVerify || isResendLoading}
                    resend={true && resendCount <= 3}
                    timer={timer}
                    handleResend={handleVerifyEmail}
                    isLoading={loadingOtpVerify}
                />}
            </div>
            <div className='flex gap-[20px] flex-wrap my-6 ml-2'>
                <InputFieldWithButton
                    className='w-[294px]'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    id='phoneNumber'
                    testId='phone_number'
                    buttonTestId='verify_phone_number'
                    error={formErrors.phoneNumber ||
                        (submitSelected && !verified.phoneNumber ? 'Please verify your phone number' : '')}
                    label='Phone Number'
                    placeholder='Enter phone number'
                    value={formData.phoneNumber}
                    buttonText={verify.phoneNumber ? 'EDIT' : 'VERIFY'}
                    setEnteredLetter={setEnteredLetter}
                    onClick={handleVerifyPhoneNumber}
                    verified={verified.phoneNumber}
                    inputDisabled={verify.phoneNumber}
                    buttonDisabled={formData?.phoneNumber?.length < 1 || isPhoneOtpResendLoading || loadingPhoneNoOtpVerify}
                    isLoading={loadingPhoneVerify}
                    phoneNumber={true}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    maxLength={numberMaxLength}
                    setNumberMaxLength={setNumberMaxLength}
                    setVerified={setVerified}
                    verify={verify.phoneNumber}
                />
                {verify.phoneNumber && verified.email &&
                <InputFieldWithButton
                    className='w-[339px]'
                    onChange={handlePhoneOtpChange}
                    onFocus={handleOtpFocus}
                    id='phoneNumberOtp'
                    testId='otp'
                    buttonTestId='verify_OTP'
                    error={otpError}
                    label='Verification Code'
                    placeholder='_ _ _ _ _ _'
                    value={phoneOtp}
                    buttonText={'VERIFY'}
                    setEnteredLetter={setEnteredLetter}
                    type='number'
                    onClick={handleVerifyOtp}
                    inputDisabled={loadingPhoneNoOtpVerify}
                    buttonDisabled={phoneOtp.length < 1 || loadingPhoneNoOtpVerify || isResendLoading}
                    resend={true && resendCount <= 3}
                    timer={timer}
                    handleResend={handleVerifyPhoneNumber}
                    isLoading={loadingPhoneNoOtpVerify}
                />}
            </div>

        </div>
    );
};

export default BasicDetails;
