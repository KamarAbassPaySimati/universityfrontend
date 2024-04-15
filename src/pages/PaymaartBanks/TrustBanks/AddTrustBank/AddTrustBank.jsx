import React, { useEffect, useState } from 'react';
import CardHeader from '../../../../components/CardHeader';
import InputFieldWithDropDown from '../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import InputField from '../../../../components/InputField/InputField';
import Button from '../../../../components/Button/Button';

const AddTrustBank = () => {
    const initialState = {
        refNo: '',
        bankName: '',
        accountNumber: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);
    const [enteredLetter, setEnteredLetter] = useState();
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
        if (enteredLetter && (id === 'accountNumber') && /\d/.test(enteredLetter)) {
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
    const getBankIds = () => {
        // try {
        //     setIsLoading(true);
        //     const response = await dataService.PostAPI(updatePassword,
        //         { old_password: oldPassword, new_password: newPassword });
        //     if (!response.error) {
        //         setIsLoading(false);
        //         handleSignOut();
        //     } else if (response?.data.status === 401) {
        //         setOldPasswordError(response?.data?.data?.message);
        //         setIsLoading(false);
        //     } else if (response?.data.status === 400) {
        //         setNewPasswordError('Old password and new password cannot be the same');
        //         setIsLoading(false);
        //     } else {
        //         setIsLoading(false);
        //         setToastError('Something went wrong!');
        //     }
        // } catch (error) {
        //     setIsLoading(false);
        //     setToastError('Something went wrong!.....');
        // }
    };
    useEffect(() => {
        getBankIds();
    }, []);
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
                {/* {loading
                    ? <div className='flex flex-wrap'>
                        {[...Array(3)].map((_, ind) => (

                            <InputFieldShimmer key={ind}
                            />

                        ))}
                    </div> */}
                <div className='my-4 flex flex-wrap gap-[20px]'>
                    <div className="w-[339px] relative">
                        <InputFieldWithDropDown
                            labelName="Ref No."
                            value={formData.refNo}
                            placeholder="Enter Ref No."
                            error={formErrors.refNo}
                            options={['Super admin', 'Finance admin', 'Admin', 'Support admin']}
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
                            options={['Super admin', 'Finance admin', 'Admin', 'Support admin']}
                            id="refNo"
                            testId="refNo"
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
                <div>
                    <Button
                        text='Add'
                        testId='submit_button'
                        className='max-w-[200px] mt-[15px]'
                    />
                </div>

            </>
        </CardHeader>
    );
};

export default AddTrustBank;
