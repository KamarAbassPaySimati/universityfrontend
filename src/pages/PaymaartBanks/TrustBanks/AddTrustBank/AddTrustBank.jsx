import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import InputFieldWithDropDown from '../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import InputField from '../../../../components/InputField/InputField';
import Button from '../../../../components/Button/Button';
import { dataService } from '../../../../services/data.services';
import GlobalContext from '../../../../components/Context/GlobalContext';
import { endpoints } from '../../../../services/endpoints';
import InputFieldShimmer from '../../../../components/InputFieldShimmer/InputFieldShimmer';
import { useNavigate } from 'react-router-dom';

const AddTrustBank = () => {
    const initialState = {
        refNo: '',
        bankName: '',
        accountNumber: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);
    const [enteredLetter, setEnteredLetter] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const { getBankId, addTrustBank } = endpoints;
    const [refNos, setRefNos] = useState([]);
    const navigate = useNavigate();

    const handleInput = (value, id) => {
        if (id === 'refNo') {
            setFormErrors(prevState => {
                return { ...prevState, refNo: '' };
            });
            setFormData(prevState => {
                return { ...prevState, refNo: value };
            });
        } else if (id === 'bankName') {
            setFormErrors(prevState => {
                return { ...prevState, bankName: '' };
            });
            setFormData(prevState => {
                return { ...prevState, bankName: value };
            });
        }
    };
    const handleChange = (e, id) => {
        if (enteredLetter && enteredLetter === ' ') {
            return;
        }
        if (id === 'accountNumber') {
            setFormData(prevState => {
                return { ...prevState, [id]: e.target.value.toUpperCase() };
            });

            return;
        }
        setFormData(prevState => {
            return { ...prevState, accountNumber: e.target.value };
        });
    };
    const handleFocus = (id) => {
        setFormErrors(prevState => {
            return { ...prevState, [id]: '' };
        });
    };
    const getBankIds = async () => {
        try {
            setIsLoading(true);
            const response = await dataService.GetAPI(getBankId);
            if (!response.error) {
                setIsLoading(false);
                setRefNos(response?.data?.ref_no);
            } else {
                setIsLoading(false);
                setToastError('Something went wrong!');
            }
        } catch (error) {
            setIsLoading(false);
            setToastError('Something went wrong!');
        }
    };
    useEffect(() => {
        getBankIds();
    }, []);
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
        // Set the form errors
        setFormErrors(errors);
        if (!hasError) {
            try {
                setIsUpdateLoading(true);
                const payload = {
                    ref_no: formData.refNo,
                    name: formData.bankName,
                    account_number: formData.accountNumber,
                    purpose: formData.refNo === 'PTBA1'
                        ? 'Trust Bank 1'
                        : formData.refNo === 'PTBA2' ? 'Trust Bank 2' : 'Trust Bank 3'
                };
                const response = (
                    await dataService.PostAPI(addTrustBank, payload));
                if (!response.error) {
                    setIsUpdateLoading(false);
                    setToastSuccess('Trust bank added successfully');
                    navigate('/paymaart-banks');
                    // take back to listing
                } else if (response?.data?.status === 409) {
                    setFormErrors(prevState => ({
                        ...prevState,
                        accountNumber: response?.data?.data?.message// Set your error message here
                    }));
                    // setFormErrors.accountNumber = response?.data?.data?.message;
                    setIsUpdateLoading(false);
                } else {
                    setToastError('Something went wrong!');
                    setIsUpdateLoading(false);
                }
            } catch (error) {
                setIsUpdateLoading(false);
                setToastError('Something went wrong!');
            }
        }
    };

    return (
        <CardHeader
            activePath={'Add Trust Bank'}
            paths={['Paymaart Banks', 'Trust Banks']}
            pathurls={['paymaart-banks']}
            header={'Add Trust Bank'}
            minHeightRequired={true}
            table={false}
        >
            <>
                {isLoading
                    ? <div className='flex flex-wrap'>
                        {[...Array(3)].map((_, ind) => (

                            <InputFieldShimmer key={ind}
                            />

                        ))}
                    </div>
                    : <div className='my-4 flex flex-wrap gap-[20px]'>
                        <div className="w-[339px] relative">
                            <InputFieldWithDropDown
                                labelName="Ref No."
                                value={formData.refNo}
                                placeholder="Enter Ref No."
                                error={formErrors.refNo}
                                options={refNos}
                                id="refNo"
                                testId="refNo"
                                handleInput={handleInput}
                            />
                        </div>
                        <div className="w-[339px] relative">
                            <InputFieldWithDropDown
                                labelName="Name"
                                value={formData.bankName}
                                placeholder="Select bank name"
                                error={formErrors.bankName}
                                options={[
                                    'CDH Investment Bank',
                                    'Ecobank',
                                    'FDH Bank',
                                    'First Capital Bank',
                                    'National Bank',
                                    'NBS Bank',
                                    'Standard Bank',
                                    'Centenary Bank'
                                ]}
                                id="bankName"
                                testId="bankName"
                                handleInput={handleInput}
                            />
                        </div>
                        <InputField
                            className='w-[339px]'
                            value={formData.accountNumber}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            id='accountNumber'
                            testId='accountNumber'
                            error={formErrors.accountNumber}
                            label='Account Number'
                            placeholder='Enter bank account number'
                            setEnteredLetter={setEnteredLetter}
                            maxLength="25"
                        />
                    </div>
                }
                <div>
                    {!isLoading &&
                    <Button
                        text='Add'
                        testId='submit_button'
                        className='max-w-[200px] mt-[12px]'
                        onClick={handleClick}
                        isLoading={isUpdateLoading}
                    />
                    }

                </div>

            </>
        </CardHeader>
    );
};

export default AddTrustBank;
