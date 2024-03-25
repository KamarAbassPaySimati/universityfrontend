import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const InputFieldWithPhoneNumber = ({
    value,
    onChange,
    type,
    onFocus,
    id,
    error,
    label,
    placeholder,
    loginError,
    showLoginError,
    testId,
    autoComplete,
    buttonText,
    buttonDisabled,
    setEnteredLetter,
    className,
    maxLength
}) => {
    const handleKeyDown = (e) => {
        if (setEnteredLetter) {
            setEnteredLetter(e.key);
        }
    };

    return (
        <div className='flex flex-col gap-2 relative'>
            <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>{label}</label>
            <div className={` bg-[#F8F8F8] text-neutral-primary px-[10px] py-[11px]
                     leading-[22px] focus:outline-none border-b focus:border-primary-normal flex justify-center items-center
                    ${error || loginError ? 'border-error' : 'border-[#DDDDDD]'} ${className} rounded-tl rounded-tr`}>
                <p
                    className=' top-0 left-0  text-primary-normal font-[400] text-[14px]
                    leading-[22px]  mr-2'
                >
                    +256
                </p>
                <input
                    maxLength={maxLength}
                    autoComplete={autoComplete || 'off'}
                    data-testid={testId}
                    value={value}
                    type={type || 'text'}
                    className={` text-neutral-primary 
                    font-[400] text-[14px] leading-[22px] bg-transparent
                    ${className}`}
                    id={id}
                    placeholder={placeholder}
                    onFocus={() => onFocus(id)}
                    onChange={(e) => onChange(e, id)}
                    onKeyDown={handleKeyDown}
                    style={{ outline: 'none' }}
                />
            </div>
            {error && <ErrorMessage error={error} />}
            {showLoginError && loginError && !error && <ErrorMessage error={loginError} />}
        </div>
    );
};

export default InputFieldWithPhoneNumber;
