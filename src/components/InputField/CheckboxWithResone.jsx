import React from 'react';
import InputTypeCheckbox from './InputTypeCheckbox';

export default function CheckboxWithReason ({ item, id, testId, handleOnChange, index, selectedIndex, type, Checked }) {
    return (
        <div className='pb-2 ml-2'>
            <InputTypeCheckbox
                id={id}
                testId={testId}
                checkboxText={item.label}
                handleOnChange={handleOnChange}
                index={index}
                type={type}
                selectedIndex={selectedIndex}
                Checked={Checked}
            />
            <p className='ml-7 text-[#4F5962] font-normal leading-5 text-[12px]'>
                {item.reason}
            </p>
        </div>
    );
}
