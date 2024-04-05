import React from 'react';
import { BeatLoader } from 'react-spinners';

const Button = ({ text, className, onClick, isLoading, color, smallLoader, disabled, testId, buttonColor }) => {
    console.log(disabled, 'color');
    return (
        <button
            data-testid={testId}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`w-full ${buttonColor ? `${buttonColor}` : 'bg-primary-normal'} text-[#fff]  font-[600] text-[14px] 
            leading-[24px] py-2 rounded-[6px] 
            ${disabled ? 'cursor-not-allowed disabled:opacity-50' : 'cursor-pointer'}  text-center

              ${className}`}>
            {!isLoading ? text : <span>{<BeatLoader color={color || '#ffff'} size={`${smallLoader ? '7px' : '10px'}`} />}</span>}
        </button>
    );
};

export default Button;
