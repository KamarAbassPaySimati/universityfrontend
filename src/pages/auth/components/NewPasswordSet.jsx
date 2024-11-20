/* eslint-disable max-len */
import React, { useContext, useRef, useState } from 'react';
import InputField from '../../../components/InputField/InputField';
import PasswordValidator from '../../../components/PasswordValidator/PasswordValidator';
import Button from '../../../components/Button/Button';
import { dataService } from '../../../services/data.services';
import passwordCheck from '../../../CommonMethods/passwordCheck';
import GlobalContext from '../../../components/Context/GlobalContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { siteKey } from '../../../config';
import pinCheck from '../../../CommonMethods/pinCheck';

const AUTH_TYPES = {
    PIN: 'PIN',
    PASSWORD: 'Password'
};
const PasswordGuidelines = () => (
    <div className='z-20 left-0 ml-[80px] mb-5 w-max max-w-[calc(100vw-90px)] break-words place-self-start hidden md:block'>
        <h1 className='text-[#fff] font-[500] text-[16px]'>Note: Password Guidelines</h1>
        <ul className='text-[#fff] font-[400] text-[14px] marker:text-[#fff] list-outside list-disc ml-6'>
            <li>Passwords must not include spaces or any punctuation marks like &apos;.&apos;, &apos;!&apos;, or &apos;?&apos;.</li>
            <li>Avoid using easily guessable personal information such as your name, birthdate, or common words.</li>
            <li>Do not use simple patterns like &apos;12345678&apos;, &apos;22446688&apos;, &apos;password&apos;, or sequential keyboard patterns like &apos;qwerty&apos;.</li>
            <li>Make sure passwords are created with random combinations of characters for better security.</li>
        </ul>
    </div>
);

const NewPasswordSet = ({ setIsSuccess, token, setIsValidToken, isWithPin }) => {
    const reCaptchaRef = useRef();
    const [activeType, setActiveType] = useState('PIN');
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [newPinError, setNewPinError] = useState('');
    const [confirmPinError, setConfirmPinError] = useState('');
    const [isCriteriaMet, setIsCriteriaMet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [enteredLetter, setEnteredLetter] = useState();
    const { setToastError } = useContext(GlobalContext);

    const handleClick = async (e) => {
        e.preventDefault();
        if (window.location.host !== 'localhost:3000') {
            await reCaptchaRef.current.executeAsync();
        }
        if (activeType === 'PIN') {
            if (pin.trim() === '' && confirmPin.trim() === '') {
                setNewPinError('This field is mandatory');
                setConfirmPinError('This field is mandatory');
            } else if (pin.trim() === '') {
                setNewPinError('This field is mandatory');
            } else if (confirmPin.trim() === '') {
                setConfirmPinError('This field is mandatory');
            } else if (pin !== confirmPin) {
            // passwords do not match
                setConfirmPasswordError('Pin does not match');
            } else if (!pinCheck(pin)) {
                setNewPasswordError('The PIN must be 6 digits and numeric only.');
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
        } else {
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
                        { token, new_pin: pin });
                    if (!response.error) {
                        setIsSuccess(true);
                    } else if (response?.data?.status === 401) {
                        setIsValidToken(true);
                    } else if (response?.data.status === 400) {
                        setNewPinError(response?.data?.data?.message);
                        setIsLoading(false);
                        setIsSuccess(false);
                    } else {
                        setNewPinError(response?.data?.data?.message);
                        setIsLoading(false);
                        setIsSuccess(false);
                    }
                } catch (error) {
                    setIsLoading(false);
                    setToastError('Something went wrong!');
                    setIsSuccess(false);
                }
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
        const value = e.target.value.trim();
        const inputMap = {
            PIN: {
                'New Pin': setPin,
                'Confirm Pin': setConfirmPin
            },
            PASSWORD: {
                'New Password': setPassword,
                'Confirm Password': setConfirmPassword
            }
        };
        const setter = inputMap[activeType]?.[id];
        if (setter) {
            setter(value);
        }
    };
    const focusHandler = (id) => {
        const errorMap = {
            PIN: {
                'New Pin': setNewPinError,
                'Confirm Pin': setConfirmPinError
            },
            PASSWORD: {
                'New Password': setNewPinError,
                'Confirm Password': setConfirmPinError
            }
        };
        const errorSetter = errorMap[activeType]?.[id];
        if (errorSetter) {
            errorSetter('');
        }
    };
    const asyncScriptOnLoad = () => {
        setRecaptchaLoaded(true);
    };

    const getTabClassName = (type) => {
        const baseClasses = 'w-[50%] py-[8.5px] px-[10px] text-center duration-200';
        const activeClasses = 'border border-[#3B2A6F] bg-[#F0ECFF] cursor-default';
        const inactiveClasses = 'cursor-pointer';

        return `${baseClasses} ${activeType === type ? activeClasses : inactiveClasses} ${(activeType === type && activeType === 'PASSWORD') ? 'rounded-r' : 'rounded-l'}`;
    };
    return (
        isWithPin
            ? (<>
                <div className='z-20 mt-6 relative bg-[#FFFFFF] p-8 rounded-[8px] w-[calc(100%-24px)] md:w-auto md:min-w-[425px] mx-[12px] md:mx-0'>
                    <div className='flex justify-center items-center mb-9'>
                        <img src='/images/logo.svg' />
                    </div>
                    <div>
                        <div className='mb-9 flex justify-evenly'>
                            {Object.entries(AUTH_TYPES).map(([key, value]) => (
                                <div
                                    key={key}
                                    className={getTabClassName(key)}
                                    onClick={() => setActiveType(key)}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                        <div className='mb-9'>
                            <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                                {activeType === 'PIN' ? 'Set New PIN' : 'Set New Password'}
                            </div>
                        </div>
                        {activeType === 'PIN'
                            ? (<form className='flex flex-col gap-[12px]'>
                                <InputField
                                    value={pin}
                                    onChange={changeHandler}
                                    onFocus={focusHandler}
                                    id='New Pin'
                                    testId='new_pin'
                                    error={newPinError}
                                    label='New Pin'
                                    placeholder='Enter new pin'
                                    givenType='pin'
                                    setEnteredLetter={setEnteredLetter}
                                />
                                {/* <div className='ml-[1px] mt-[0.5px] mb-[4px]'>
                            <PasswordValidator newPassword={password} setIsCriteriaMet={setIsCriteriaMet} />
                        </div> */}
                                <InputField
                                    value={confirmPin}
                                    onChange={changeHandler}
                                    onFocus={focusHandler}
                                    id='Confirm New Pin'
                                    testId='new_confirm_pin'
                                    error={confirmPinError}
                                    label='Confirm New Pin'
                                    placeholder='Re-enter new pin'
                                    givenType='pin'
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
                                        testId='submit_button'
                                        onClick={handleClick}
                                        disabled={!recaptchaLoaded && window.location.host !== 'localhost:3000'}
                                        isLoading={isLoading}
                                    />
                                </div>
                            </form>)
                            : (
                                <>
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
                                        {/* <div className='ml-[1px] mt-[0.5px] mb-[4px]'>
                            <PasswordValidator newPassword={password} setIsCriteriaMet={setIsCriteriaMet} />
                        </div> */}
                                        <InputField
                                            value={confirmPassword}
                                            onChange={changeHandler}
                                            onFocus={focusHandler}
                                            id='Confirm New Password'
                                            testId='new_confirm_password'
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
                                                testId='submit_button'
                                                onClick={handleClick}
                                                disabled={!recaptchaLoaded && window.location.host !== 'localhost:3000'}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    </form>
                                </>)
                        }
                    </div>
                </div>
                {activeType === 'PASSWORD' &&
                    <PasswordGuidelines />
                }
            </>)
            : (<div className='z-20 mt-6 relative bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
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
                            testId='new_confirm_password'
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
                                testId='submit_button'
                                onClick={handleClick}
                                disabled={!recaptchaLoaded && window.location.host !== 'localhost:3000'}
                                isLoading={isLoading}
                            />
                        </div>
                    </form>
                </div>
            </div>)
    );
};
export default NewPasswordSet;

// const AUTH_TYPES = {
//     PIN: 'PIN',
//     PASSWORD: 'PASSWORD'
// };

// const formConfig = {
//     [AUTH_TYPES.PIN]: [
//         {
//             id: 'New Pin',
//             testId: 'new_pin',
//             value: pin,
//             error: newPinError,
//             label: 'New Pin',
//             placeholder: 'Enter new pin',
//             givenType: 'pin'
//         },
//         {
//             id: 'Confirm New Pin',
//             testId: 'new_confirm_pin',
//             value: confirmPin,
//             error: confirmPinError,
//             label: 'Confirm New Pin',
//             placeholder: 'Re-enter new pin',
//             givenType: 'pin'
//         }
//     ],
//     [AUTH_TYPES.PASSWORD]: [
//         {
//             id: 'New Password',
//             testId: 'new_password',
//             value: password,
//             error: newPasswordError,
//             label: 'New Password',
//             placeholder: 'Enter new password',
//             givenType: 'password'
//         },
//         {
//             id: 'Confirm New Password',
//             testId: 'new_confirm_password',
//             value: confirmPassword,
//             error: confirmPasswordError,
//             label: 'Confirm New Password',
//             placeholder: 'Re-enter new password',
//             givenType: 'password'
//         }
//     ]
// };

// const AuthForm = () => {
//     const fields = formConfig[activeType];

//     return (
//         <form className='flex flex-col gap-[12px]'>
//             {fields.map((field) => (
//                 <InputField
//                     key={field.id}
//                     {...field}
//                     onChange={changeHandler}
//                     onFocus={focusHandler}
//                     setEnteredLetter={setEnteredLetter}
//                 />
//             ))}
//             {window.location.host !== 'localhost:3000' && (
//                 <ReCAPTCHA
//                     style={{ display: 'inline-block', height: '10px !important' }}
//                     theme="dark"
//                     size="invisible"
//                     ref={reCaptchaRef}
//                     sitekey={siteKey}
//                     asyncScriptOnLoad={asyncScriptOnLoad}
//                 />
//             )}
//             <div className='mt-6'>
//                 <Button
//                     text="Reset"
//                     testId='submit_button'
//                     onClick={handleClick}
//                     disabled={!recaptchaLoaded && window.location.host !== 'localhost:3000'}
//                     isLoading={isLoading}
//                 />
//             </div>
//         </form>
//     );
// };
