import React from 'react'

const Button = ({ text, className }) => {
    return (
        <button className={`w-full text-[#fff] bg-primary-normal font-[600] text-[14px] leading-[24px] py-2 rounded-[8px]
             ${className}`}>
            {text}
        </button>
    )
}

export default Button
