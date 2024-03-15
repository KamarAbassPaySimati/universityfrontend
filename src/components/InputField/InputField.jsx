/* eslint-disable indent */
import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const InputField = ({ value, onChange, type, givenType, onFocus, id, error, label, placeholder, loginError, showLoginError }) => {
    const [ispasswordType, setIsPasswordType] = useState(true);
    return (
        <div className='flex flex-col gap-2 relative'>
            <label htmlFor={id} className='text-neutral-primary text-[14px] font-[500] leading-[16px]'>{label}</label>
            <input
                value={value}
                type={givenType ? ispasswordType ? 'password' : 'text' : type || 'text'}
                className={`placeholder:text-neutral-secondary text-neutral-primary bg-[#F8F8F8] px-[10px] py-[11px]
                    font-[400] text-[14px] leading-[22px] focus:outline-none border-b focus:border-primary-normal pr-[62px]
                    ${error || loginError ? 'border-error' : 'border-[#DDDDDD]'}`}
                id={id}
                placeholder={placeholder}
                onFocus={() => onFocus(id)}
                onChange={(e) => onChange(e, id)}
            />
            {/* && value.length > 0 */}
            {givenType === 'password' && value.length > 0 &&
                <div className={`absolute right-0 py-[18.79px] pl-[10px] pr-[23.77px] cursor-pointer 
                    ${error || loginError ? 'bottom-[30px]' : 'bottom-0'}`}
                    onClick={() => setIsPasswordType(prevState => !prevState)}>
                    {ispasswordType ? <img src='/images/SHOW.svg' /> : <img src='/images/HIDE.svg' />}
                </div>
            }
            {error && <ErrorMessage error={error} /> }
            {showLoginError && loginError && !error && <ErrorMessage error={loginError} />}
        </div>
    );
};

export default InputField;
