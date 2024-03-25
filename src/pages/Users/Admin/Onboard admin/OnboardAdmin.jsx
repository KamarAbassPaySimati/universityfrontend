import React, { useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import InputField from '../../../../components/InputField/InputField';
import InputFieldWithPhoneNumber from '../../../../components/InputFieldWithPhoneNumber/InputFieldWithPhoneNumber';

const OnboardAdmin = () => {
    const initialState = {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: ''
    };
    const [enteredLetter, setEnteredLetter] = useState();
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);

    const handleChange = (e, id) => {
        if (enteredLetter && enteredLetter === ' ') {
            return;
        }
        if (id === 'email') {
            console.log(' ');
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

    return (
        <CardHeader
            activePath='Onboard Admin'
            paths={['Users', 'Admin']}
            pathurls={['users/admin']}
            header='Onboard Admin'
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
                <div className='my-4 flex gap-[20px]'>
                    <InputField
                        className='w-[339px]'
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        id='email'
                        testId='email'
                        error={formErrors.email}
                        label='Email'
                        placeholder='Enter email'
                        setEnteredLetter={setEnteredLetter}
                    />
                    <InputFieldWithPhoneNumber
                        className='w-[339px]'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        id='phoneNumber'
                        testId='Phone Number'
                        error={formErrors.email}
                        label='Phone Number'
                        placeholder='Enter phone number'
                        setEnteredLetter={setEnteredLetter}
                    />

                </div>

            </>
        </CardHeader>
    );
};

export default OnboardAdmin;
