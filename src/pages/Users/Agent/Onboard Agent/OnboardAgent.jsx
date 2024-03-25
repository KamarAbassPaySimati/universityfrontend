/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import InputField from '../../../../components/InputField/InputField';
import InputFieldWithButton from '../../../../components/InputFieldWithButton/InputFieldWithButton';
import Image from '../../../../components/Image/Image';
import { Tooltip } from 'react-tooltip';
import { baseURLAgent } from '../../../../config';
import axios from 'axios';
import GlobalContext from '../../../../components/Context/GlobalContext';
import Button from '../../../../components/Button/Button';
import SecurityQuestionsShimmer from '../../../../components/Shimmers/SecurityQuestionsShimmer';
import { formatInputPhone } from '../../../../CommonMethods/formatInputPhone';
import validation from './validation';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import verificationValidation from './verificationValidation';
import { dataService } from '../../../../services/data.services';
import { endpoints } from '../../../../services/endpoints';
import RegistrationSuccessful from './components/RegistrationSuccessful';

const OnboardAgent = () => {
    const initialState = {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    };
    const [enteredLetter, setEnteredLetter] = useState();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsAcceptedError, setTermsAcceptedError] = useState(false);
    const [questionsLoading, setQuestionsLoading] = useState(false);

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);

    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [securityQuestionError, setsecurityQuestionError] = useState(false);

    const [otp, setOtp] = useState('');

    const [otpError, setOtpError] = useState();

    const [verify, setVerify] = useState({
        email: false,
        phoneNumber: false
    });
    const [loadingEmailVerify, setLoadingEmailVerify] = useState(false);
    const [loadingPhoneVerify, setLoadingPhoneVerify] = useState(false);
    const [loadingOtpVerify, setLoadingOtpVerify] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otpId, setOtpId] = useState({
        email: '',
        phoneNumber: ''
    });
    const [verified, setVerified] = useState({
        email: false,
        phoneNumber: false
    });

    const [otpToken, setOtpToken] = useState('');
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
    const [timer, setTimer] = useState(0);
    const [resendCount, setResendCount] = useState(0);
    const [countryCode, setCountryCode] = useState('+265');
    const [numberMaxLength, setNumberMaxLength] = useState(11);
    const [isResendLoading, setIsResendLoading] = useState(false);

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

    const { sendOtp, verifyOtp, createAgent } = endpoints;

    const handleChange = (e, id) => {
        if (enteredLetter && enteredLetter === ' ') {
            return;
        }
        if (id === 'lastName') {
            setFormData(prevState => {
                return { ...prevState, [id]: e.target.value.toUpperCase() };
            });
            return;
        }
        if (id === 'email') {
            setFormData(prevState => {
                return { ...prevState, [id]: e.target.value.toLowerCase() };
            });
            return;
        }
        if (id === 'phoneNumber') {
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

    const handleAnswerChange = (e, id) => {
        setSecurityQuestions(prevState => {
            const updatedAnswers = [...prevState];
            const indexToUpdate = updatedAnswers.findIndex(question => question.id === id);

            if (indexToUpdate !== -1) {
                updatedAnswers[indexToUpdate].answer = e.target.value;
            }

            return updatedAnswers;
        });
    };

    const handleFocus = (id) => {
        setFormErrors((prevState) => {
            return { ...prevState, [id]: '' };
        });
    };

    const handleOtpChange = (e, id) => {
        const value = e.target.value;
        if (value.length > 6) {
            return;
        }
        setOtp(value);
    };

    const handleOtpFocus = (e, id) => {
        setOtpError('');
    };

    const handleVerifyEmail = async (text) => {
        setFormErrors(initialState);
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
        console.log('api call', text);

        const payload = {
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            type: 'email',
            value: formData.email
        };

        if (text.includes('Otp')) {
            setIsResendLoading(true);
        } else {
            setLoadingEmailVerify(true);
        }
        const response = await dataService.PostAPIAgent(sendOtp, payload);
        console.log(response);
        if (!response.error) {
            setVerify(prevState => {
                return { ...prevState, email: true };
            });
            setToastInformation("Verification code has been sent to agent’s email. It's valid for 10 minutes");
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
            setOtp('');
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
        console.log('api call');

        const payload = {
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            type: 'sms',
            country_code: countryCode,
            value: formData.phoneNumber.replace(/\s/g, '')
        };

        if (text.includes('Otp')) {
            setIsResendLoading(true);
        } else {
            setLoadingPhoneVerify(true);
        }
        const response = await dataService.PostAPIAgent(sendOtp, payload);
        console.log(response);
        if (!response.error) {
            setVerify(prevState => {
                return { ...prevState, phoneNumber: true };
            });
            setToastInformation("Verification code has been sent to agent’s phone number. It's valid for 10 minutes");
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
        setIsResendLoading(false);
    };

    const handleVerifyOtp = async (text, id) => {
        if (otp.trim().length < 6) {
            setOtpError('Invalid OTP');
            return;
        }
        console.log(otpToken, 'token');
        const payload = {
            otp,
            token: otpToken
        };
        setLoadingOtpVerify(true);
        const response = await dataService.PostAPIAgent(verifyOtp, payload);
        setLoadingOtpVerify(false);
        setOtp('');
        console.log(response);
        if (!response.error) {
            console.log(response.data);
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
            setOtpId(prevState => {
                return { ...prevState, [key]: response?.data?.record_id };
            });
        } else {
            console.log(response.data, 'error');
            if (response?.data?.status === 400) {
                setOtpError(response?.data?.data?.message);
            } else {
                setToastError('Something went wrong!');
            }
        }
    };

    useEffect(() => {
        const fetchSecurityQuestions = async () => {
            try {
                setQuestionsLoading(true);
                const data = await axios.get(`${baseURLAgent}security-questions`);
                setQuestionsLoading(false);
                if (data.status === 200) {
                    setSecurityQuestions(data.data.data);
                } else {
                    setToastError('Something went wrong!');
                }
            } catch (error) {
                setQuestionsLoading(false);
                setToastError('Something went wrong!');
            }
        };

        fetchSecurityQuestions();
    }, []);

    const transformArray = (array) => {
        return array
            .filter(item => item.answer) // Filter out objects without an answer property
            .map((item, index) => ({
                question_id: item.id,
                answer: item.answer
            }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validation(formData, setFormErrors, verified, securityQuestions, setsecurityQuestionError, termsAccepted, setTermsAcceptedError)) {
            return;
        }

        const payload = {
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            country_code: countryCode,
            phone_number: formData.phoneNumber.replace(/\s/g, ''),
            email: formData.email,
            email_otp_id: otpId.email,
            phone_otp_id: otpId.phoneNumber,
            security_questions: transformArray(securityQuestions)
        };

        console.log(payload);
        setIsLoading(true);
        const response = await dataService.PostAPIAgent(createAgent, payload);
        setIsLoading(false);
        if (!response.error) {
            setRegistrationSuccessful(true);
            console.log('successfull');
        }
        console.log(response, 'create');
    };

    useEffect(() => {
        console.log(resendCount, 'count');
    }, [resendCount]);

    return (
        <CardHeader
            activePath='Onboard Agent'
            paths={['Users', 'Agent']}
            pathurls={['users/agent']}
            header={registrationSuccessful ? false : 'Registration'}
        >
            {registrationSuccessful
                ? <RegistrationSuccessful email={formData.email} />
                : <>
                    <h1 className='text-header-dark font-[600] text-[18px] leading-[26px] my-2'>
                        Basic Details
                    </h1>
                    <div className='my-4 flex gap-[20px] flex-wrap'>
                        <InputField
                            className='w-[339px]'
                            value={formData.firstName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            id='firstName'
                            testId='first_name'
                            error={formErrors.firstName}
                            label='First Name'
                            placeholder='Enter first name'
                            setEnteredLetter={setEnteredLetter}
                            maxLength={100}
                        />
                        <InputField
                            className='w-[339px]'
                            value={formData.middleName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            id='middleName'
                            testId='middle_name'
                            error={formErrors.middleName}
                            label='Middle Name'
                            placeholder='Enter middle name'
                            setEnteredLetter={setEnteredLetter}
                            maxLength={100}
                        />
                        <InputField
                            className='w-[339px]'
                            value={formData.lastName}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            id='lastName'
                            testId='last_name'
                            error={formErrors.lastName}
                            label='Last Name'
                            placeholder='Enter last name'
                            setEnteredLetter={setEnteredLetter}
                            maxLength={100}
                        />
                    </div>
                    <p className='my-4 font-[500] text-[14px] leading-[22px] text-neutral-secondary'>
                        Enter a valid email and phone number. To confirm it’s you, we will send a verification code.
                    </p>
                    <div className='flex flex-col gap-6 w-[339px]'>
                        <div className='flex gap-[20px]'>
                            <InputFieldWithButton
                                className='w-[339px]'
                                onChange={handleChange}
                                onFocus={handleFocus}
                                id='email'
                                testId='email_address'
                                buttonTestId='verify_email_address'
                                error={formErrors.email}
                                label='Email'
                                placeholder='Enter email'
                                value={formData.email}
                                buttonText={verify.email ? 'EDIT' : 'VERIFY'}
                                setEnteredLetter={setEnteredLetter}
                                onClick={handleVerifyEmail}
                                verified={verified.email}
                                inputDisabled={verified.email || verify.email}
                                buttonDisabled={formData.email.length < 1 || isResendLoading}
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
                        <div className='flex gap-[20px]'>
                            <InputFieldWithButton
                                className='w-[294px]'
                                onChange={handleChange}
                                onFocus={handleFocus}
                                id='phoneNumber'
                                testId='phone_number'
                                buttonTestId='verify_phone_number'
                                error={formErrors.phoneNumber}
                                label='Phone Number'
                                placeholder='Enter phone number'
                                value={formData.phoneNumber}
                                buttonText={verify.phoneNumber ? 'EDIT' : 'VERIFY'}
                                setEnteredLetter={setEnteredLetter}
                                onClick={handleVerifyPhoneNumber}
                                verified={verified.phoneNumber}
                                inputDisabled={verified.phoneNumber || verify.phoneNumber}
                                buttonDisabled={formData.phoneNumber.length < 1 || isResendLoading}
                                isLoading={loadingPhoneVerify}
                                phoneNumber={true}
                                countryCode={countryCode}
                                setCountryCode={setCountryCode}
                                maxLength={numberMaxLength}
                                setNumberMaxLength={setNumberMaxLength}
                            />
                            {verify.phoneNumber &&
                            <InputFieldWithButton
                                className='w-[339px]'
                                onChange={handleOtpChange}
                                onFocus={handleOtpFocus}
                                id='phoneNumberOtp'
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
                                handleResend={handleVerifyPhoneNumber}
                                isLoading={loadingOtpVerify}
                            />}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between mt-2 mb-[2px]'>
                                <p className='text-header-dark font-[600] text-[18px] leading-[26px]'>Security Questions</p>
                                <Image src='info_icon' className='cursor-pointer info-icon' />
                            </div>
                            {securityQuestionError && <ErrorMessage error='Answer at least 3 questions' />}
                        </div>
                        <Tooltip
                            className='info-tooltip'
                            anchorSelect=".info-icon"
                            place='right-start'
                            effect="solid"
                            arrowColor="transparent"
                        >
                            <h1 className='mb-2'>Guide</h1>
                            <ul className='text-[14px] list-disc ml-6'>
                                <li>
                                    Please provide unique and memorable answers that are easy to remember, even years later.
                                </li>
                                <li>
                                    Answers should be clear and exact (preferably a single word),
                                    but they don&apos;t need to be truthful.
                                    Indeed, it&apos;s best to use fake answers for security questions to enhance security.
                                </li>
                            </ul>
                        </Tooltip>
                        { questionsLoading
                            ? <SecurityQuestionsShimmer />
                            : <div className='flex flex-col gap-6'>
                                {securityQuestions.map((securityQuestion, index) => (
                                    <InputField
                                        key={securityQuestion?.id}
                                        className='w-[339px]'
                                        value={securityQuestion?.answer || ''}
                                        onChange={handleAnswerChange}
                                        onFocus={() => setsecurityQuestionError(false)}
                                        id={securityQuestion?.id}
                                        testId={`security_question_${index + 1}`}
                                        showErrorBottom={false}
                                        error={securityQuestionError}
                                        label={securityQuestion?.question}
                                        placeholder='Answer'
                                        notShowErrorBottom={true}
                                    />))}
                            </div>}
                        {/* checkbox */}
                        <div className='flex flex-col gap-[14px]'>
                            <div className={`checkbox ${termsAcceptedError ? 'checkbox-error' : ''} w-full flex justify-start items-start  gap-4 relative`}>
                                <input
                                    type="checkbox"
                                    onChange={() => { setTermsAcceptedError(false); setTermsAccepted((prevState) => !prevState); }}
                                    className="w-4 cursor-pointer"
                                    id="termsAccepted"
                                    name='checkbox' />
                                <label data-testid="terms_and_conditions" className="text-neutral-primary text-[14px]
                            leading-[22px] font-[400] cursor-pointer" htmlFor="termsAccepted" >
                                    I have read and agree to Paymaart’s
                                    <a target='_blank' href='https://www.paymaart.net/agent-terms-conditions'
                                        className='text-accent-information' rel="noreferrer"> Terms & Conditions </a>
                                    and
                                    <a target='_blank' href='https://www.paymaart.net/privacy-policy'
                                        className='text-accent-information' rel="noreferrer"> Privacy Policy</a>.
                                </label>
                            </div>
                            {termsAcceptedError && <ErrorMessage error='Please accept the Terms & Conditions and Privacy Policies to continue.' />}
                        </div>
                        <Button testId='submit_button' isLoading={isLoading} onClick={handleSubmit} text='Register' className='w-[200px] mt-4' />
                    </div>
                </>}
        </CardHeader>
    );
};

export default OnboardAgent;
