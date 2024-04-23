import React, { useContext, useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import addBackslashBeforeApostrophe from '../../../../CommonMethods/textCorrection';
import { useDispatch, useSelector } from 'react-redux';
import { SpecificView } from '../Components/SpecificAdminViewSlice';
import InputFieldShimmer from '../../../../components/InputFieldShimmer/InputFieldShimmer';

const OnboardAdmin = ({ actionKey }) => {
    const initialState = {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        role: ''
    };
    const [enteredLetter, setEnteredLetter] = useState();
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const { adminOnboard, updateAdmin } = endpoints;
    const navigate = useNavigate();
    // const { View, userDetails, loading } = useSelector(state => state.SpecificAdminView); // to get the api respons
    const { View, loading } = useSelector(state => state.SpecificAdminView);
    const { id } = useParams();
    const dispatch = useDispatch();

    const checkCondition = () => {
        return (
            View?.first_name === formData.firstName &&
            View?.last_name === formData.lastName &&
            View?.middle_name === formData.middleName &&
            View?.user_type === formData.role
        );
    };
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
        if (id === 'phoneNumber') {
            const formattedPhoneNumber = formatInputPhone(e.target.value);
            setFormData(prevState => {
                return { ...prevState, [id]: formattedPhoneNumber };
            });
            return;
        }
        if (id === 'firstName' || id === 'middleName') {
            setFormData(prevState => {
                return { ...prevState, [id]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) };
            });
            return;
        }
        setFormData(prevState => {
            return { ...prevState, [id]: e.target.value };
        });
    };

    const handleClick = async (e) => {
        const errors = {};
        let hasError = false;
        // Validate each field
        Object.entries(formData).forEach(([fieldName, value]) => {
            if (!value) {
                if (fieldName !== 'countryCode') {
                    errors[fieldName] = 'Required field';
                    hasError = true;
                }
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
                    email: addBackslashBeforeApostrophe(formData.email),
                    role: formData.role,
                    phone_number: formData.phoneNumber.replace(/\s/g, '')
                };
                const updateAdminPayload = {
                    first_name: addBackslashBeforeApostrophe(formData.firstName),
                    middle_name: addBackslashBeforeApostrophe(formData.middleName),
                    last_name: addBackslashBeforeApostrophe(formData.lastName),
                    role: formData.role,
                    paymaart_id: id
                };

                const response = (actionKey === 'update'
                    ? await dataService.PatchAPI(updateAdmin, updateAdminPayload)
                    : await dataService.PostAPI(adminOnboard, payload));
                if (actionKey !== 'update') {
                    if (!response.error) {
                        setIsLoading(false);
                        setToastSuccess(`${formData.role} registered successfully`);
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
                } else {
                    setIsLoading(false);
                    if (!response.error) {
                        setToastSuccess('Admin profile updated successfully ');
                        navigate(`/users/admins/${id}`);
                    } else {
                        setToastError('Something went wrong!');
                    }
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
        setFormErrors(prevState => {
            return { ...prevState, [id]: '' };
        });
    };
    const clearPhoneNumberError = () => {
        setFormErrors(prevErrors => ({
            ...prevErrors,
            phoneNumber: '' // Clear phoneNumber error
        }));
    };
    const getAdminView = () => {
        try {
            // to get the data from authslice
            dispatch(SpecificView(id)).then((response) => {
                if (response.payload.error) {
                    setToastError('Something went wrong!');
                } else {
                    setFormData({
                        firstName: response.payload.data.data[0].first_name || '',
                        middleName: response.payload.data.data[0].middle_name || '',
                        lastName: response.payload.data.data[0].last_name || '',
                        email: response.payload.data.data[0].email || '',
                        phoneNumber: response.payload.data.data[0].phone_number || '',
                        countryCode: response.payload.data.data[0].country_code || '',
                        role: response.payload.data.data[0].user_type || ''
                    });
                }
            });
        } catch (error) {
            console.error('geterror', error);
            setToastError('Something went wrong!');
        }
    };
    useEffect(() => {
        if (actionKey === 'update') {
            getAdminView();
        }
    }, []);
    return (
        <CardHeader
            activePath={actionKey === 'update' ? 'Update Admin' : 'Register Admin'}
            paths={['Users', 'Admins']}
            pathurls={['users/admins']}
            header={actionKey === 'update' ? 'Update Admin' : 'Register Admin'}
            minHeightRequired={true}
        >
            <>
                <h1 className='text-header-dark font-[600] text-[18px] leading-[26px] my-2'>
                    Basic Details
                </h1>
                {actionKey === 'update' && loading
                    ? <div className='flex flex-wrap'>
                        {[...Array(3)].map((_, ind) => (

                            <InputFieldShimmer key={ind}
                            />

                        ))}
                    </div>
                    : <div className='my-4 flex flex-wrap gap-[20px]'>
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
                    </div>}

                { actionKey === 'update' && loading
                    ? <div className='flex flex-wrap'>
                        {[...Array(3)].map((_, ind) => (
                            <InputFieldShimmer key={ind}
                            />

                        ))}
                    </div>
                    : <div className='my-4 flex flex-wrap gap-[20px]'>
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
                            editAction={actionKey === 'update' ? 'yes' : 'no'}
                        />
                        <InputFieldWithPhoneNumber
                            className='w-[339px]'
                            maxLength="11"
                            value={actionKey === 'update' ? formatInputPhone(formData.phoneNumber) : formData.phoneNumber}
                            onChange={handleChange}
                            id='phoneNumber'
                            testId='phone_number'
                            error={formErrors.phoneNumber}
                            label='Phone Number'
                            placeholder='Enter phone number'
                            setEnteredLetter={setEnteredLetter}
                            notifyFocusChange={clearPhoneNumberError}
                            editAction={actionKey === 'update' ? 'yes' : 'no'}
                            countryCode={formData.countryCode !== '' ? '+265' : formData.countryCode}
                        />
                        <div className="w-[339px] relative">
                            <InputFieldWithDropDown
                                labelName="Role"
                                value={formData.role}
                                placeholder="Select role"
                                error={formErrors.role}
                                options={['Super admin', 'Finance admin', 'Admin', 'Support admin'].slice().sort()}
                                id="role"
                                testId="role"
                                handleInput={handleInput}
                            />
                        </div>
                    </div>
                }

                <div>
                    {
                        actionKey === 'update'
                            ? (
                                !loading && (
                                    <Button
                                        text='Update'
                                        testId='submit_button'
                                        className='max-w-[200px] mt-[15px]'
                                        onClick={handleClick}
                                        isLoading={isLoading}
                                        disabled={checkCondition()}
                                    />
                                )
                            )
                            : (
                                (
                                    <Button
                                        text='Register'
                                        testId='submit_button'
                                        className='max-w-[200px] mt-[15px]'
                                        onClick={handleClick}
                                        isLoading={isLoading}
                                    />
                                )
                            )
                    }
                </div>

            </>
        </CardHeader>
    );
};

export default OnboardAdmin;
