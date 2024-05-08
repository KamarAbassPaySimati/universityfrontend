import React from 'react';
import InputTypeCheckbox from './InputTypeCheckbox';

export default function CheckboxWithReason ({ item, id, testId, handleOnChange, index, selectedIndex, type }) {
    return (
        <div className='pb-2'>
            <InputTypeCheckbox
                id={id}
                testId={testId}
                checkboxText={item.label}
                handleOnChange={handleOnChange}
                index={index}
                type={type}
                selectedIndex={selectedIndex}
            />
            <p className='ml-7 text-[#4F5962] font-normal leading-3 text-[12px]'>
                {item.reason}
            </p>
        </div>
    );
}
