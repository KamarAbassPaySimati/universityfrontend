import React, { useContext, useRef, useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import PasswordValidator from '../../../components/PasswordValidator/PasswordValidator';
import Button from '../../../components/Button/Button';
import { dataService } from '../../../services/data.services';
import passwordCheck from '../../../CommonMethods/passwordCheck';
import GlobalContext from '../../../components/Context/GlobalContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { siteKey } from '../../../config';

const NewPasswordSet = ({ setIsSuccess, token, setIsValidToken }) => {
    const reCaptchaRef = useRef();
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isCriteriaMet, setIsCriteriaMet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [enteredLetter, setEnteredLetter] = useState();
    const { setToastError } = useContext(GlobalContext);

    const handleClick = async (e) => {
        e.preventDefault();
        if (window.location.host !== 'localhost:3000') {
            await reCaptchaRef.current.executeAsync();
        }
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
            setNewPasswordError('Weak password. Check guidelines for strong passwords.');
        } else {
            // call api
            try {
                setIsLoading(true);
                const response = await dataService.PostAPIWithoutHeader('admin-users/reset-password',
                    { token, new_password: password });
                if (!response.error) {
                    setIsSuccess(true);
                } else if (response?.data?.status === 401) {
                    setIsValidToken(true);
                } else if (response?.data.status === 400) {
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
                setToastError('Something went wrong!');
                setIsSuccess(false);
            }
        }
        if (window.location.host !== 'localhost:3000') {
            await reCaptchaRef.current.reset();
        }
    };

    const changeHandler = (e, id) => {
        if (enteredLetter && enteredLetter === ' ') {
            return;
        }
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
    const asyncScriptOnLoad = () => {
        setRecaptchaLoaded(true);
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
                        setEnteredLetter={setEnteredLetter}
                    />
                    <div className='ml-[1px] mt-[0.5px] mb-[4px]'>
                        <PasswordValidator newPassword={password} setIsCriteriaMet={setIsCriteriaMet} />
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
                        setEnteredLetter={setEnteredLetter}
                    />
                    {(window.location.host !== 'localhost:3000') && (
                        <ReCAPTCHA
                            style={{ display: 'inline-block', height: '10px !important' }}
                            theme="dark"
                            size="invisible"
                            ref={reCaptchaRef}
                            sitekey={siteKey}
                            // onChange={handleChangeRecap}
                            asyncScriptOnLoad={asyncScriptOnLoad}
                        />
                    )}
                    <div className='mt-6'>
                        <Button
                            text="Reset"
                            testId= 'submit_button'
                            onClick={handleClick}
                            disabled={!recaptchaLoaded && window.location.host !== 'localhost:3000'}
                            isLoading={isLoading}
                        />
                    </div>

                </form>
            </div>
        </div>

    );
};
export default NewPasswordSet;
