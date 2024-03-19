import React, { useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import PassWordValidator from '../../../components/PasswordValidator/PassWordValidator';
import Button from '../../../components/Button/Button';

const UpdateToNewPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [newConfirmPasswordError, setNewConfirmPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        // if (password.trim() === '' && confirmPassword.trim() === '') {
        //     setNewPasswordError('This field is mandatory');
        //     setConfirmPasswordError('This field is mandatory');
        // } else if (password.trim() === '') {
        //     setNewPasswordError('This field is mandatory');
        // } else if (confirmPassword.trim() === '') {
        //     setConfirmPasswordError('This field is mandatory');
        // } else if (!isCriteriaMet) {
        //     // Pssword Criteria did not met
        //     setConfirmPasswordError('Password criteria is not met');
        // } else if (password !== confirmPassword) {
        //     // passwords do not match
        //     setConfirmPasswordError('Passwords does not match');
        // } else if (!weakPasswordValidation.test(password)) {
        //     console.log('came here');
        //     setNewPasswordError('Weak password. Check guidelines for strong passwords.');
        // } else {
        //     // call api
        //     try {
        //         setIsLoading(true);
        //         const response = await dataService.PostAPIWithoutHeader('reset-password',
        //             { token, new_password: password });
        //         console.log(response, 'Set New Password response:');
        //         if (!response.error) {
        //             setIsSuccess(true);
        //         } else if (response?.data?.status === 401) {
        //             setIsValidToken(true);
        //         } else if (response?.data.status === 400) {
        //             console.log('came here 400');
        //             setNewPasswordError(response?.data?.data?.message);
        //             setIsLoading(false);
        //             setIsSuccess(false);
        //         } else {
        //             setNewPasswordError(response?.data?.data?.message);
        //             setIsLoading(false);
        //             setIsSuccess(false);
        //         }
        //     } catch (error) {
        //         setIsLoading(false);
        //         console.log(error);
        //         setIsSuccess(false);
        //     }
        // }
    };

    const changeHandler = (e, id) => {
        if (id === 'Old Password') {
            setOldPassword(e.target.value);
        } else if (id === 'New Password') {
            setNewPassword(e.target.value);
        } else {
            setConfirmNewPassword(e.target.value);
        }
    };
    const focusHandler = (id) => {
        if (id === 'Old Password') {
            setOldPasswordError('');
        } else if (id === 'New Password') {
            setNewPasswordError('');
        } else {
            setNewConfirmPasswordError('');
        }
    };
    return (
        <div className='mt-6 relative bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]  border-b border-neutral-outline'>
            <div>
                <form className='flex flex-col gap-[12px]'>
                    <InputField
                        value={oldPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='Old Password'
                        testId='new_password'
                        error={oldPasswordError}
                        label='Current Password'
                        placeholder='Enter current password'
                        givenType='password'
                    />
                    <InputField
                        value={newPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='New Password'
                        testId='new_password'
                        error={newPasswordError}
                        label='New Password'
                        placeholder='Enter new password'
                        givenType='password'
                    />
                    <div className='ml-[1px] mt-[0.5px] mb-[4px]'>
                        <PassWordValidator newPassword={newPassword} />
                    </div>

                    <InputField
                        value={confirmNewPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='Confirm New Password'
                        testId='new_confirm_password'
                        error={newConfirmPasswordError}
                        label='Confirm New Password'
                        placeholder='Re-enter new password'
                        givenType='password'
                    />
                    <div className='mt-6'>
                        <Button
                            text="Reset"
                            testId='submit_button'
                            onClick={handleClick}
                            isLoading={isLoading}
                        />
                    </div>

                </form>
            </div>
        </div>

    );
};
export default UpdateToNewPassword;
