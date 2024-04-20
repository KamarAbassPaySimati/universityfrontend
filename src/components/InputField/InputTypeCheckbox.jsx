import React from 'react';

export default function InputTypeCheckbox ({ id, checkboxText, handleOnChange, Checked, testId }) {
    return (
        <div className="label-checkbox relative my-2 flex items-center">
            <input
                className="checkbox"
                type="checkbox"
                value={id}
                id={id}
                checked={Checked}
                onClick={(e) => {
                    handleOnChange(e, id, 'checkBox');
                }}
            />
            <label
                for={id}
                data-testid={testId}
                className="inline-block ml-4 hover:cursor-pointer text-[14px] leading-[22px] font-[400] text-neutral-primary">
                {checkboxText}
            </label>
        </div>
    );
}
