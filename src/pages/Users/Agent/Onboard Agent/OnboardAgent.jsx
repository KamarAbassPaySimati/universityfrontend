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
import securityAnswersCheck from './securityAnswersCheck';
import verificationValidation from './verificationValidation';
import { dataService } from '../../../../services/data.services';
import { endpoints } from '../../../../services/endpoints';

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
    const [otpId, setOtpId] = useState({
        email: '',
        phoneNumber: ''
    });
    const [verified, setVerified] = useState({
        email: false,
        phoneNumber: false
    });

    const [otpToken, setOtpToken] = useState('');

    const { setToastError, setToastWarning } = useContext(GlobalContext);

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
            return;
        }
        if (!verificationValidation(formData, setFormErrors, 'phoneNumber')) {
            return;
        }
        console.log('api call');

        const payload = {
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            type: 'email',
            value: formData.email
        };

        setLoadingEmailVerify(true);
        const response = await dataService.PostAPIAgent(sendOtp, payload);
        setLoadingEmailVerify(false);
        console.log(response);
        if (!response.error) {
            setVerify(prevState => {
                return { ...prevState, email: true };
            });
            setOtpToken(response?.data?.token);
        }
    };

    const handleVerifyPhoneNumber = async (text) => {
        if (text === 'EDIT') {
            setVerify(prevState => {
                return { ...prevState, phoneNumber: false };
            });
            setOtp('');
            return;
        }
        if (!verified.email) {
            setFormErrors((prevState) => {
                return { ...prevState, email: 'Please verify your email' };
            });
            return;
        }
        if (!verificationValidation(formData, setFormErrors, 'email')) {
            return;
        }
        console.log('api call');

        let country_code;
        let value;
        if (formData.phoneNumber.startsWith(+91)) {
            country_code = '+91';
            value = formData.phoneNumber.slice(3);
        } else {
            country_code = '+265';
            value = formData.phoneNumber.slice(4);
        }

        const payload = {
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            type: 'sms',
            country_code,
            value
        };

        setLoadingPhoneVerify(true);
        const response = await dataService.PostAPIAgent(sendOtp, payload);
        setLoadingPhoneVerify(false);
        console.log(response);
        if (!response.error) {
            setVerify(prevState => {
                return { ...prevState, phoneNumber: true };
            });
            setOtpToken(response?.token);
        }
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
        return array.map((item, index) => ({
            question_id: item.id,
            answer: item.answer
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validation(formData, setFormErrors, verified, securityQuestions, setsecurityQuestionError)) {
            return;
        }
        if (!termsAccepted) {
            setToastWarning('Please accept the terms and conditions');
        }
        const payload = {
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            phone_number: formData.phoneNumber,
            email: formData.email,
            email_otp_id: otpId.email,
            phone_otp_id: otpId.phoneNumber,
            security_questions: transformArray(securityQuestions)
        };

        console.log(payload);
        const response = await dataService.PostAPIAgent(createAgent, payload);
        console.log(response, 'create');
    };

    useEffect(() => {
        console.log(securityQuestions);
    }, [securityQuestions]);

    return (
        <CardHeader
            activePath='Onboard Agent'
            paths={['Users', 'Agent']}
            pathurls={['users/agent']}
            header='Registration'
        >
            <>
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
                        testId='firstName'
                        error={formErrors.firstName}
                        label='First Name'
                        placeholder='Enter first name'
                        setEnteredLetter={setEnteredLetter}
                    />
                    <InputField
                        className='w-[339px]'
                        value={formData.middleName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        id='middleName'
                        testId='middleName'
                        error={formErrors.middleName}
                        label='Middle Name'
                        placeholder='Enter middle name'
                        setEnteredLetter={setEnteredLetter}
                    />
                    <InputField
                        className='w-[339px]'
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        id='lastName'
                        testId='lastName'
                        error={formErrors.lastName}
                        label='Last Name'
                        placeholder='Enter last name'
                        setEnteredLetter={setEnteredLetter}
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
                            testId='email'
                            error={formErrors.email}
                            label='Email'
                            placeholder='Enter email'
                            value={formData.email}
                            buttonText={verify.email ? 'EDIT' : 'VERIFY'}
                            setEnteredLetter={setEnteredLetter}
                            onClick={handleVerifyEmail}
                            verified={verified.email}
                            inputDisabled={verified.email || verify.email || loadingEmailVerify}
                            buttonDisabled={formData.email.length < 1 || loadingEmailVerify}
                        />
                        {verify.email &&
                        <InputFieldWithButton
                            className='w-[339px]'
                            onChange={handleOtpChange}
                            onFocus={handleOtpFocus}
                            id='emailOtp'
                            testId='emailOtp'
                            error={otpError}
                            label='Verification Code'
                            placeholder='_ _ _ _ _ _'
                            value={otp}
                            buttonText={'VERIFY'}
                            setEnteredLetter={setEnteredLetter}
                            type='number'
                            onClick={handleVerifyOtp}
                            inputDisabled={loadingOtpVerify}
                            buttonDisabled={otp.length < 1 || loadingOtpVerify}
                        />}
                    </div>
                    <div className='flex gap-[20px]'>
                        <InputFieldWithButton
                            className='w-[339px]'
                            onChange={handleChange}
                            onFocus={handleFocus}
                            id='phoneNumber'
                            testId='phoneNumber'
                            error={formErrors.phoneNumber}
                            label='Phone Number'
                            placeholder='Enter phone number'
                            value={formData.phoneNumber}
                            buttonText={verify.phoneNumber ? 'EDIT' : 'VERIFY'}
                            setEnteredLetter={setEnteredLetter}
                            onClick={handleVerifyPhoneNumber}
                            verified={verified.phoneNumber}
                            inputDisabled={verified.phoneNumber || verify.phoneNumber || loadingPhoneVerify}
                            buttonDisabled={formData.phoneNumber.length < 1 || loadingPhoneVerify}
                        />
                        {verify.phoneNumber &&
                        <InputFieldWithButton
                            className='w-[339px]'
                            onChange={handleOtpChange}
                            onFocus={handleOtpFocus}
                            id='phoneNumberOtp'
                            testId='phoneNumberOtp'
                            error={otpError}
                            label='Verification Code'
                            placeholder='_ _ _ _ _ _'
                            value={otp}
                            buttonText={'VERIFY'}
                            setEnteredLetter={setEnteredLetter}
                            type='number'
                            inputDisabled={loadingOtpVerify}
                            buttonDisabled={otp.length < 1 || loadingOtpVerify}
                        />}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='info-icon flex justify-between mt-2 mb-[2px]'>
                            <p className='text-header-dark font-[600] text-[18px] leading-[26px]'>Security Questions</p>
                            <Image src='info_icon' className='cursor-pointer' />
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
                            {securityQuestions.map((securityQuestion) => (
                                <InputField
                                    key={securityQuestion?.id}
                                    className='w-[339px]'
                                    value={securityQuestion?.answer || ''}
                                    onChange={handleAnswerChange}
                                    onFocus={() => setsecurityQuestionError(false)}
                                    id={securityQuestion?.id}
                                    testId={securityQuestion?.question}
                                    showErrorBottom={false}
                                    error={securityQuestionError}
                                    label={securityQuestion?.question}
                                    placeholder='Answer'
                                    notShowErrorBottom={true}
                                />))}
                        </div>}
                    {/* checkbox */}
                    <div className="checkbox w-full flex justify-start items-start  gap-4 relative">
                        <input
                            data-testid="agree_status"
                            type="checkbox"
                            onChange={() => { setTermsAccepted((prevState) => !prevState); }}
                            className="w-4 cursor-pointer"
                            id="termsAccepted"
                            name='checkbox' />
                        <label className="text-neutral-primary text-[14px]
                            leading-[22px] font-[400] cursor-pointer" htmlFor="termsAccepted" >
                            I have read and agree to Paymaart’s
                            <a target='_blank' href='https://www.paymaart.net/agent-terms-conditions'
                                className='text-accent-information' rel="noreferrer"> Terms & Conditions </a>
                            and
                            <a target='_blank' href='https://www.paymaart.net/privacy-policy'
                                className='text-accent-information' rel="noreferrer"> Privacy Policy</a>.
                        </label>
                    </div>
                    <Button onClick={handleSubmit} text='Register' className='w-[200px] mt-4' />
                </div>
            </>
        </CardHeader>
    );
};

export default OnboardAgent;
