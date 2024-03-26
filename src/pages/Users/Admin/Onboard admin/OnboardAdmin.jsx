import React, { useContext, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import InputField from '../../../../components/InputField/InputField';
import InputFieldWithPhoneNumber from '../../../../components/InputFieldWithPhoneNumber/InputFieldWithPhoneNumber';
import InputFieldWithDropDown from '../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import emailValidation from '../../../../CommonMethods/emailValidtion';
import Button from '../../../../components/Button/Button';
import { endpoints } from '../../../../services/endpoints';
import { dataService } from '../../../../services/data.services';
import GlobalContext from '../../../../components/Context/GlobalContext';
import { formatInputPhone } from '../../../../CommonMethods/phoneNumberFormat';
import { useNavigate } from 'react-router-dom';
import addBackslashBeforeApostrophe from '../../../../CommonMethods/textCorrection';

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
    const [isLoading, setIsLoading] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const { adminOnboard } = endpoints;
    const navigate = useNavigate();

    const handleChange = (e, id) => {
        if (enteredLetter && enteredLetter === ' ') {
            return;
        }
        if (enteredLetter && (id === 'firstName' || id === 'lastName' || id === 'middleName') && /\d/.test(enteredLetter)) {
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
        if (id === 'phoneNumber') {
            const formattedPhoneNumber = formatInputPhone(e.target.value);
            setFormData(prevState => {
                return { ...prevState, [id]: formattedPhoneNumber };
            });
        }
    };

    const handleClick = async (e) => {
        const errors = {};
        let hasError = false;

        // Validate each field
        Object.entries(formData).forEach(([fieldName, value]) => {
            if (!value) {
                errors[fieldName] = 'Required field';
                hasError = true;
            } else {
                errors[fieldName] = ''; // Reset error message if field is not empty
            }
        });
        if (formData.email && !emailValidation(formData.email)) {
            errors.email = 'Invalid email';
            hasError = true;
        }
        if (formData.phoneNumber && (formData.phoneNumber.replace(/\s/g, '').length < 9)) {
            errors.phoneNumber = 'Invalid phone number';
            hasError = true;
        }
        // Set the form errors
        setFormErrors(errors);
        if (!hasError) {
            try {
                setIsLoading(true);
                const payload = {
                    first_name: addBackslashBeforeApostrophe(formData.firstName),
                    middle_name: addBackslashBeforeApostrophe(formData.middleName),
                    last_name: addBackslashBeforeApostrophe(formData.lastName),
                    country_code: '+265',
                    email: formData.email,
                    role: formData.role,
                    phone_number: formData.phoneNumber.replace(/\s/g, '')
                };
                const response = await dataService.PostAPI(adminOnboard, payload);
                console.log(response, 'Set New Password response:');
                if (!response.error) {
                    setIsLoading(false);
                    setToastSuccess(`${formData.role} onboarded successfully `);
                    navigate('/users/admins');
                    // take back to listing
                } else if (response?.data?.status === 409) {
                    setIsLoading(false);
                    if (response?.data?.data?.message.includes('Email already exists')) {
                        errors.email = 'Email already exists';
                    } else {
                        errors.phoneNumber = response?.data?.data?.message;
                    }
                } else {
                    setToastError(response?.data?.data?.message);
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                setToastError('Something went wrong!');
            }
        }
    };

    const handleInput = (value) => {
        setFormErrors(prevState => {
            return { ...prevState, role: '' };
        });
        setFormData(prevState => {
            return { ...prevState, role: value };
        });
    };
    const handleFocus = (id) => {
        if (id === 'firstName') {
            setFormErrors(prevState => {
                return { ...prevState, [id]: '' };
            });
        } else if (id === 'middleName') {
            setFormErrors(prevState => {
                return { ...prevState, [id]: '' };
            });
        } else if (id === 'lastName') {
            setFormErrors(prevState => {
                return { ...prevState, [id]: '' };
            });
        } else if (id === 'email') {
            setFormErrors(prevState => {
                return { ...prevState, [id]: '' };
            });
        }
    };
    const clearPhoneNumberError = () => {
        setFormErrors(prevErrors => ({
            ...prevErrors,
            phoneNumber: '' // Clear phoneNumber error
        }));
    };

    return (
        <CardHeader
            activePath='Register Admin'
            paths={['Users', 'Admins']}
            pathurls={['users/admins']}
            header='Register Admin'
            minHeightRequired={true}
        >
            <>
                <h1 className='text-header-dark font-[600] text-[18px] leading-[26px] my-2'>
                    Basic Details
                </h1>
                <div className='my-4 flex flex-wrap gap-[20px]'>
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
                        maxLength="100"
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
                        maxLength="100"
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
                        maxLength="100"
                    />
                </div>
                <div className='my-4 flex flex-wrap gap-[20px]'>
                    <InputField
                        className='w-[339px]'
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        id='email'
                        testId='email_address'
                        error={formErrors.email}
                        label='Email'
                        placeholder='Enter email'
                        setEnteredLetter={setEnteredLetter}
                        maxLength="100"
                    />
                    <InputFieldWithPhoneNumber
                        className='w-[339px]'
                        maxLength="11"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        id='phoneNumber'
                        testId='phone_number'
                        error={formErrors.phoneNumber}
                        label='Phone Number'
                        placeholder='Enter phone number'
                        setEnteredLetter={setEnteredLetter}
                        notifyFocusChange={clearPhoneNumberError}
                    />
                    <div className="w-[339px] relative">
                        <InputFieldWithDropDown
                            labelName="Role"
                            value={formData.role}
                            placeholder="Select role"
                            error={formErrors.role}
                            options={['Super admin', 'Finance admin', 'Admin', 'Support admin']}
                            id="role"
                            testId="role"
                            handleInput={handleInput}
                        />
                    </div>
                </div>
                <div>
                    <Button
                        text="Register"
                        testId= 'submit_button'
                        className = 'max-w-[200px] mt-[15px]'
                        onClick={handleClick}
                        isLoading={isLoading}
                    />
                </div>

            </>
        </CardHeader>
    );
};

export default OnboardAdmin;
