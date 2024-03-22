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

const OnboardAgent = () => {
    const initialState = {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [securityAnswers, setSecurityAnswers] = useState();
    const [securityQuestionError, setsecurityQuestionError] = useState();
    const [enteredLetter, setEnteredLetter] = useState();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [questionsLoading, setQuestionsLoading] = useState(false);

    const { setToastError } = useContext(GlobalContext);

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

        setFormData(prevState => {
            return { ...prevState, [id]: e.target.value };
        });
    };

    const handleAnswerChange = (e, id) => {
        console.log(id);
        setSecurityQuestions(prevState => {
            const updatedAnswers = [...prevState];
            const indexToUpdate = updatedAnswers.findIndex(question => question.id === id);

            if (indexToUpdate !== -1) {
                updatedAnswers[indexToUpdate].answer = e.target.value;
            }

            return updatedAnswers;
        });
    };

    const handleFocus = () => {

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
                        buttonText={'VERIFY'}
                        setEnteredLetter={setEnteredLetter}
                    />
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
                        buttonText={'VERIFY'}
                        setEnteredLetter={setEnteredLetter}
                    />
                    <div className='info-icon flex justify-between mt-2 mb-[2px]'>
                        <p className='text-header-dark font-[600] text-[18px] leading-[26px]'>Security Questions</p>
                        <Image src='info_icon' className='cursor-pointer' />
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
                                    onFocus={handleFocus}
                                    id={securityQuestion?.id}
                                    testId={securityQuestion?.question}
                                    showErrorBottom={false}
                                    error={securityQuestionError}
                                    label={securityQuestion?.question}
                                    placeholder='Answer'
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
                    <Button text='Register' className='w-[200px] mt-4' />
                </div>
            </>
        </CardHeader>
    );
};

export default OnboardAgent;
