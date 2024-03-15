import React from 'react';
import { BeatLoader } from 'react-spinners';

const Button = ({ text, className, onClick, isLoading, color, smallLoader, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`w-full text-[#fff] bg-primary-normal font-[600] text-[14px] leading-[24px] py-2 rounded-[8px]
             ${className}`}>
            {!isLoading ? text : <span>{<BeatLoader color={color || '#ffff'} size={`${smallLoader ? '7px' : '10px'}`} />}</span>}
        </button>
    );
};

export default Button;
