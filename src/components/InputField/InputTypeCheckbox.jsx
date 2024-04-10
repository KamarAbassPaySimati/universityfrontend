import React from 'react';

export default function InputTypeCheckbox ({ id, checkboxText }) {
    return (
        <div className="filter-checkbox checkbox relative py-2">
            <input
                className="checkbox"
                type="checkbox"
                value={id}
                id={id}
                // checked={filterValues?.[valueOf]?.[checkboxText]}
                // onClick={() => {
                //     setFilterValues(prevState => ({
                //         ...prevState,
                //         [valueOf]: {
                //             ...prevState?.[valueOf],
                //             [checkboxText]: !prevState?.[valueOf]?.[checkboxText]
                //         }
                //     }));
                // }}
            />
            <label
                for={id}
                className="inline-block ml-4 hover:cursor-pointer text-[14px] leading-[22px] font-[400] text-neutral-primary">
                {checkboxText}
            </label>
        </div>
    );
}
