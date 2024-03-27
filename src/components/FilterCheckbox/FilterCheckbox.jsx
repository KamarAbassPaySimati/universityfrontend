import React from 'react';

export default function FilterCheckbox ({ id, filterValues, setFilterValues, valueOf, checkboxText }) {
    return (
        <div className="filter-checkbox checkbox relative">
            <input
                className=''
                type="checkbox"
                value={id}
                id={id}
                checked={filterValues?.[valueOf]?.[id]}
                onChange={() => {
                    setFilterValues(prevState => ({
                        ...prevState,
                        [valueOf]: {
                            ...prevState?.[valueOf],
                            [id]: !prevState?.[valueOf]?.[id]
                        }
                    }));
                }}
            />
            <label
                htmlFor={id}
                className="inline-block pl-4 hover:cursor-pointer text-base font-normal text-[#1F1F1F]"
            >
                {checkboxText}
            </label>
        </div>
    );
}
