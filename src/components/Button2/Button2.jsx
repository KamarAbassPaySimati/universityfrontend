import React from 'react';

const Button2 = ({ className, text, type, onClick, testId }) => {
    return (
        <button
            data-testid={testId}
            onClick={onClick}
            type={type || 'button'}
            className={`w-full bg-[#fff] text-neutral-primary border border-neutral-outline font-[400] text-[14px] 
                leading-[24px] py-2 rounded-[6px]
    ${className}`}>
            {text}
        </button>
    );
};

export default Button2;
