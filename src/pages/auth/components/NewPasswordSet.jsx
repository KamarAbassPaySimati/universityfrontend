/* eslint-disable max-len */
import React, { useContext, useRef, useState } from 'react';
import { dataService } from '../../../services/data.services';
import passwordCheck from '../../../CommonMethods/passwordCheck';
import GlobalContext from '../../../components/Context/GlobalContext';
import pinCheck from '../../../CommonMethods/pinCheck';
import NewPasswordForm from './NewPasswordForm';
import PasswordGuidelines from './PasswordGuidelines';

const AUTH_TYPES = {
    PIN: 'PIN',
    PASSWORD: 'Password'
};

const NewPasswordSet = ({ setIsSuccess, token, setIsValidToken, isWithPin, activeType, setActiveType }) => {
    const reCaptchaRef = useRef();
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [errors, setErrors] = useState({
        newPassword: '',
        confirmPassword: '',
        newPin: '',
        confirmPin: ''
    });
    const [isCriteriaMet, setIsCriteriaMet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [enteredLetter, setEnteredLetter] = useState();
    const { setToastError } = useContext(GlobalContext);

    const validatePin = () => {
        const newErrors = { ...errors };
        let isValid = true;

        if (pin.trim() === '') {
            newErrors.newPin = 'This field is mandatory';
            isValid = false;
        } else if (!pinCheck(pin)) {
            newErrors.newPin = 'The PIN must be 6 digits and numeric only.';
            isValid = false;
        }

        if (confirmPin.trim() === '') {
            newErrors.confirmPin = 'This field is mandatory';
            isValid = false;
        } else if (pin !== confirmPin) {
            newErrors.confirmPin = 'PIN does not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const validatePassword = () => {
        const newErrors = { ...errors };
        let isValid = true;

        if (password.trim() === '') {
            newErrors.newPassword = 'This field is mandatory';
            isValid = false;
        } else if (!isCriteriaMet) {
            newErrors.newPassword = 'Password criteria is not met';
            isValid = false;
        } else if (!passwordCheck(password)) {
            newErrors.newPassword = 'Weak password. Check guidelines for strong passwords.';
            isValid = false;
        }

        if (confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'This field is mandatory';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Password does not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (window.location.host !== 'localhost:3000' ) {
            await reCaptchaRef.current.executeAsync();
        }

        const isValid = activeType === 'PIN'
            ? validatePin()
            : validatePassword();

        if (isValid) {
            setErrors({
                newPassword: '',
                confirmPassword: '',
                newPin: '',
                confirmPin: ''
            });
            try {
                setIsLoading(true);
                const endpoint = isWithPin ? 'admin-users/reset-unlock-password' : 'admin-users/reset-password';
                const payload = activeType === 'PIN'
                    ? { token, new_password: pin }
                    : { token, new_password: password };

                const response = await dataService.PostAPIWithoutHeader(endpoint, payload);

                if (!response.error) {
                    setIsSuccess(true);
                } else if (response?.data?.status === 401) {
                    setIsValidToken(true);
                } else if (response?.data.status === 400) {
                    const errorKey = activeType === 'PIN' ? 'newPin' : 'newPassword';
                    setErrors(prev => ({
                        ...prev,
                        [errorKey]: response?.data?.data?.message || 'An error occurred'
                    }));
                    setIsLoading(false);
                    setIsSuccess(false);
                } else {
                    setToastError('Something went wrong!');
                    setIsLoading(false);
                    setIsSuccess(false);
                }
            } catch (error) {
                setIsLoading(false);
                setToastError('Something went wrong!');
                setIsSuccess(false);
            }
        }
        if (window.location.host !== 'localhost:3000' ) {
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
                'Confirm New Pin': setConfirmPin
            },
            PASSWORD: {
                'New Password': setPassword,
                'Confirm New Password': setConfirmPassword
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
                'New Pin': setErrors.newPin,
                'Confirm Pin': setErrors.confirmPin
            },
            PASSWORD: {
                'New Password': setErrors.newPassword,
                'Confirm Password': setErrors.confirmPassword
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
                        <img src='/images/logo.svg' loading='lazy'/>
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
                            ? (
                                <NewPasswordForm
                                    type="PIN"
                                    value={pin}
                                    confirmValue={confirmPin}
                                    onChange={changeHandler}
                                    onFocus={focusHandler}
                                    errors={errors}
                                    reCaptchaRef={reCaptchaRef}
                                    handleClick={handleClick}
                                    recaptchaLoaded={recaptchaLoaded}
                                    isLoading={isLoading}
                                    setEnteredLetter={setEnteredLetter}
                                    asyncScriptOnLoad={asyncScriptOnLoad}
                                    setIsCriteriaMet={setIsCriteriaMet}
                                />
                            )
                            : (
                                <NewPasswordForm
                                    type="PASSWORD"
                                    value={password}
                                    confirmValue={confirmPassword}
                                    onChange={changeHandler}
                                    onFocus={focusHandler}
                                    errors={errors}
                                    reCaptchaRef={reCaptchaRef}
                                    handleClick={handleClick}
                                    recaptchaLoaded={recaptchaLoaded}
                                    isLoading={isLoading}
                                    setEnteredLetter={setEnteredLetter}
                                    asyncScriptOnLoad={asyncScriptOnLoad}
                                    setIsCriteriaMet={setIsCriteriaMet}
                                />
                            )
                        }
                    </div>
                </div>
                {activeType === 'PASSWORD' &&
                    <PasswordGuidelines />
                }
            </>)
            : (<div className='z-20 mt-6 relative bg-[#FFFFFF] p-8 rounded-[8px] min-w-[425px]'>
                <div className='flex justify-center items-center mb-9'>
                    <img src='/images/logo.svg' loading='lazy'/>
                </div>
                <div>
                    <div className='mb-9'>
                        <div className='text-[#000000] font-[500] text-[24px] leading-[32px]'>
                            Reset Password
                        </div>
                    </div>
                    <NewPasswordForm
                        type="PASSWORD"
                        value={password}
                        confirmValue={confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        errors={errors}
                        reCaptchaRef={reCaptchaRef}
                        handleClick={handleClick}
                        recaptchaLoaded={recaptchaLoaded}
                        isLoading={isLoading}
                        setEnteredLetter={setEnteredLetter}
                        asyncScriptOnLoad={asyncScriptOnLoad}
                        setIsCriteriaMet={setIsCriteriaMet}
                    />
                </div>
            </div>)
    );
};
export default NewPasswordSet;
