import React from 'react';
import InputField from '../../../components/InputField/InputField';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../../../components/Button/Button';
import { siteKey } from '../../../config';
import PasswordValidator from '../../../components/PasswordValidator/PasswordValidator';

const NewPasswordForm = ({
    type,
    value,
    confirmValue,
    onChange,
    onFocus,
    errors,
    reCaptchaRef,
    handleClick,
    recaptchaLoaded,
    isLoading,
    setEnteredLetter,
    setIsCriteriaMet,
    asyncScriptOnLoad
}) => {
    const isPin = type === 'PIN';
    const inputConfigs = {
        PIN: {
            firstInput: {
                id: 'New Pin',
                testId: 'new_pin',
                error: errors.newPin,
                label: 'New Pin',
                placeholder: 'Enter new pin',
                givenType: 'pin'
            },
            secondInput: {
                id: 'Confirm New Pin',
                testId: 'new_confirm_pin',
                error: errors.confirmPin,
                label: 'Confirm New Pin',
                placeholder: 'Re-enter new pin',
                givenType: 'pin'
            }
        },
        PASSWORD: {
            firstInput: {
                id: 'New Password',
                testId: 'new_password',
                error: errors.newPassword,
                label: 'New Password',
                placeholder: 'Enter new password',
                givenType: 'password'
            },
            secondInput: {
                id: 'Confirm New Password',
                testId: 'new_confirm_password',
                error: errors.confirmPassword,
                label: 'Confirm New Password',
                placeholder: 'Re-enter new password',
                givenType: 'password'
            }
        }
    };

    const firstInputConfig = inputConfigs[type].firstInput;
    const secondInputConfig = inputConfigs[type].secondInput;
    return (
        <form className='flex flex-col gap-[12px]'>
            <InputField
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                {...firstInputConfig}
                setEnteredLetter={setEnteredLetter}
            />

            {!isPin && (
                <div className='ml-[1px] mt-[0.5px] mb-[4px]'>
                    <PasswordValidator
                        newPassword={value}
                        setIsCriteriaMet={setIsCriteriaMet}
                    />
                </div>
            )}

            <InputField
                value={confirmValue}
                onChange={onChange}
                onFocus={onFocus}
                {...secondInputConfig}
                setEnteredLetter={setEnteredLetter}
            />
            {(window.location.host !== 'localhost:3000' && window.location.host !== 'pre-production-admin.paymaart.net' && window.location.host !== 'pre-production-admin.paymaart.net') && (
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
                    disabled={!recaptchaLoaded && window.location.host !== 'localhost:3000' && window.location.host !== 'pre-production-admin.paymaart.net' && window.location.host !== 'pre-production-admin.paymaart.net'}
                    isLoading={isLoading}
                />
            </div>
        </form>
    );
};

export default NewPasswordForm;
