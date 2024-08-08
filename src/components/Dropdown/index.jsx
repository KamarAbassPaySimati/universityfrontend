/* eslint-disable max-len */
// CustomDropdown.js
import React, { useState } from 'react';
import { countyCode } from '../JsonLists/countryCode';

const Dropdown = ({ selectedCode, onChange, error, isFocused }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (code, codeAlpha) => {
        onChange(code, codeAlpha);
        setIsOpen(false);
    };

    return (
        <div className='relative'>
            <div
                data-testid='change_code'
                onClick={handleDropdownClick}
                className={`pl-2 thin-scrollBar outline-none w-[68px] font-[400] pr-[5px] text-[14px] leading-[22px] bg-[#F8F8F8] text-primary-normal py-[10px] border-b cursor-pointer flex items-center justify-between ${isFocused ? 'border-primary-normal' : 'border-[#DDDDDD]'} ${error ? 'border-error' : 'border-[#DDDDDD]'}`}
            >
                {selectedCode}
                <img src='/images/chevron-down.svg' className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && (
                <div className='absolute z-10 mt-1 w-fit thin-scrollBar max-h-52 overflow-y-auto  bg-white border border-gray-300 rounded-md shadow-lg'>
                    {countyCode.map((country) => (
                        <div
                            key={country.code}
                            onClick={() => handleOptionClick(country.dial_code, country.code)}
                            className='px-2 py-2 text-[14px] hover:bg-gray-200 cursor-pointer text-primary-normal'
                        >
                            {country.dial_code}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
