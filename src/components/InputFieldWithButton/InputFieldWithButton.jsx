import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const InputFieldWithButton = ({
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
    setEnteredLetter
}) => {
    const handleKeyDown = (e) => {
        if (setEnteredLetter) {
            setEnteredLetter(e.key);
        }
    };
    return (
        <div className='flex flex-col gap-2 relative'>
            <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>{label}</label>
            <div className='bg-[#F8F8F8] relative w-fit'>
                <input
                    autoComplete={autoComplete || 'off'}
                    data-testid={testId}
                    value={value}
                    type={type || 'text'}
                    className={`placeholder:text-neutral-secondary bg-[#F8F8F8] text-neutral-primary px-[10px] py-[11px]
                    font-[400] text-[14px] leading-[22px] focus:outline-none border-b focus:border-primary-normal pr-[62px]
                    ${error || loginError ? 'border-error' : 'border-[#DDDDDD]'}`}
                    id={id}
                    placeholder={placeholder}
                    onFocus={() => onFocus(id)}
                    onChange={(e) => onChange(e, id)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className='absolute top-0 right-0 bg-[#FFFFFF] w-[95px] h-[34px] rounded-[8px] text-primary-normal
                    disabled:text-neutral-secondary font-[400] text-[14px] leading-[22px] my-[5px] mr-3 disabled:border-[#F5F5F5]
                        border-neutral-secondary border'
                    disabled={buttonDisabled}
                >
                    {buttonText}
                </button>
            </div>
            {error && <ErrorMessage error={error} />}
            {showLoginError && loginError && !error && <ErrorMessage error={loginError} />}
        </div>
    );
};

export default InputFieldWithButton;
