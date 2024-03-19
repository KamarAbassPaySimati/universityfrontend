import React from 'react';
import Image from '../Image/Image';

const Button2 = ({ className, text, type, onClick, testId, icon }) => {
    return (
        <button
            data-testid={testId}
            onClick={onClick}
            type={type || 'button'}
            className={`w-full bg-[#fff] text-neutral-primary border border-neutral-outline font-[400] text-[14px] 
                leading-[24px] py-2 rounded-[8px] ${className}`}>
            <div className='flex justify-center items-center gap-2'>
                {icon && <Image src={icon} />}
                {text}
            </div>
        </button>
    );
};

export default Button2;
