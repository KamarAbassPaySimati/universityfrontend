import React, { useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import PassWordValidator from '../../../components/PasswordValidator/PassWordValidator';
import Button from '../../../components/Button/Button';
import { dataService } from '../../../services/data.services';
import passwordCheck from '../../../CommonMethods/passwordCheck';
const NewPasswordSet = ({ setIsSuccess, token, setIsValidToken }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isCriteriaMet, setIsCriteriaMet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        if (password.trim() === '' && confirmPassword.trim() === '') {
            setNewPasswordError('This field is mandatory');
            setConfirmPasswordError('This field is mandatory');
        } else if (password.trim() === '') {
            setNewPasswordError('This field is mandatory');
        } else if (confirmPassword.trim() === '') {
            setConfirmPasswordError('This field is mandatory');
        } else if (!isCriteriaMet) {
            // Pssword Criteria did not met
            setNewPasswordError('Password criteria is not met');
        } else if (password !== confirmPassword) {
            // passwords do not match
            setConfirmPasswordError('Password does not match');
        } else if (!passwordCheck(password)) {
            console.log('came here');
            setNewPasswordError('Weak password. Check guidelines for strong passwords.');
        } else {
            // call api
            try {
                setIsLoading(true);
                const response = await dataService.PostAPIWithoutHeader('reset-password',
                    { token, new_password: password });
                console.log(response, 'Set New Password response:');
                if (!response.error) {
                    setIsSuccess(true);
                } else if (response?.data?.status === 401) {
                    setIsValidToken(true);
                } else if (response?.data.status === 400) {
                    console.log('came here 400');
                    setNewPasswordError(response?.data?.data?.message);
                    setIsLoading(false);
                    setIsSuccess(false);
                } else {
                    setNewPasswordError(response?.data?.data?.message);
                    setIsLoading(false);
                    setIsSuccess(false);
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
                setIsSuccess(false);
            }
        }
    };

    const changeHandler = (e, id) => {
        if (id === 'New Password') {
            setPassword(e.target.value);
        } else {
            setConfirmPassword(e.target.value);
        }
    };
    const focusHandler = (id) => {
        if (id === 'New Password') {
            setNewPasswordError('');
        } else {
            setConfirmPasswordError('');
        }
    };
    return (
        <div className='z-20 mt-6 relative bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
            <div className='flex justify-center items-center mb-9'>
                <img src='/images/logo.svg' />
            </div>
            <div>
                <div className='mb-9'>
                    <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                        Reset Password
                    </div>
                </div>
                <form className='flex flex-col gap-[12px]'>
                    <InputField
                        value={password}
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
                        <PassWordValidator newPassword={password} setIsCriteriaMet={setIsCriteriaMet} />
                    </div>

                    <InputField
                        value={confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        id='Confirm New Password'
                        testId= 'new_confirm_password'
                        error={confirmPasswordError}
                        label='Confirm New Password'
                        placeholder='Re-enter new password'
                        givenType='password'
                    />
                    <div className='mt-6'>
                        <Button
                            text="Reset"
                            testId= 'submit_button'
                            onClick={handleClick}
                            isLoading={isLoading}
                        />
                    </div>

                </form>
            </div>
        </div>

    );
};
export default NewPasswordSet;
