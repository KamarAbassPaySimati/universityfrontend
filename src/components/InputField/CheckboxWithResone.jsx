import React from 'react';
import InputTypeCheckbox from './InputTypeCheckbox';

export default function CheckboxWithReason ({ item, id, testId, handleOnChange, flag, index, selectedIndex, type, Checked }) {
    return (
        <div className={`${flag ? '' : 'pb-2'}`}>
            <InputTypeCheckbox
                id={id}
                testId={testId}
                checkboxText={flag ? item : item.label}
                handleOnChange={handleOnChange}
                index={index}
                type={type}
                selectedIndex={selectedIndex}
                Checked={Checked}
            />
            {flag === undefined && <p className='ml-7 text-[#4F5962] font-normal leading-4 text-[12px]'>
                {item.reason}
            </p>}
        </div>
    );
}
