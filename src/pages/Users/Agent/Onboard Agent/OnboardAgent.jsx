import React, { useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import InputField from '../../../../components/InputField/InputField';
import InputFieldWithButton from '../../../../components/InputFieldWithButton/InputFieldWithButton';

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
    const [enteredLetter, setEnteredLetter] = useState();

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

    const handleFocus = () => {

    };

    useEffect(() => {
        console.log(formData, 'qqqqqqqqqqq');
        console.log(formData.email, 'aaaaaaaaaaaaa');
    }, [formData]);

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
                <div className='my-4 flex gap-[20px]'>
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
                <div>
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
                </div>
            </>
        </CardHeader>
    );
};

export default OnboardAgent;
