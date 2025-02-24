/* eslint-disable max-len */
import React from 'react';

export default function FilterCheckbox2 ({
    id,
    valueOf,
    checkboxText,
    setAppliedFilter,
    appliedFilter,
    customClass,
    merchant
}) {
    const toggleFilter = () => {
        setAppliedFilter(prevState => ({
            ...prevState,
            [valueOf]: {
                ...prevState?.[valueOf],
                [checkboxText]: !prevState?.[valueOf]?.[checkboxText]
            }
        }));
    };

    return (
        <div className={`filter-checkbox checkbox relative ${customClass && !merchant ? 'w-[148px]' : merchant ? 'w-[40%] merchant-checkbox' : ''}`}>
            <input
                className=''
                type="checkbox"
                value={id}
                id={id}
                onChange={toggleFilter}
                checked={appliedFilter?.[valueOf]?.[checkboxText]}
            />
            <label
                htmlFor={id}
                className='inline-block pl-4 hover:cursor-pointer text-base font-normal text-neutral-primary'
            >
                {checkboxText}
            </label>
        </div>
    );
}
