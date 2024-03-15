import React from 'react';
import { BeatLoader } from 'react-spinners';

const Button = ({ text, className, onClick, isLoading, color, smallLoader, disabled, testId }) => {
    return (
        <button
            data-testid={testId}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`w-full text-[#fff] bg-primary-normal font-[600] text-[14px] leading-[24px] py-2 rounded-[8px]
             disabled:opacity-50 hover:bg-primary-normal-hover active:bg-primary-normal-active ${className}`}>
            {!isLoading ? text : <span>{<BeatLoader color={color || '#ffff'} size={`${smallLoader ? '7px' : '10px'}`} />}</span>}
        </button>
    );
};

export default Button;
