/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import Image from '../Image/Image';
import { Tooltip } from 'react-tooltip';
import { useOnClickOutside } from '../../CommonMethods/outsideClick';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const Filter = ({ setFilterValues, filterValues, filterOptions, handleClearFilter }) => {
    const filterDiv = useRef();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useOnClickOutside(filterDiv, () => {
        setIsFilterOpen(false);
    });

    return (
        <div ref={filterDiv} className="">
            <Image
                src="filter_icon"
                data-testid='filter-btn'
                className="filter_icon absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer"
                onClick={() => setIsFilterOpen(prevState => !prevState)}
            />
            <Tooltip
                className='my-tooltip'
                anchorSelect=".filter_icon"
                place="left"
                content="Filter"
            />
            {isFilterOpen && <div className=''>
                <div className="absolute top-[35px] right-1 rounded-[8px] bg-white border border-neutral-outline text-[14px] leading-[24px] text-neutral-primary">
                    <div className='p-4 flex justify-between border-b border-neutral-outline'>
                        <div className='font-[600]'>
                            Filter agent list
                        </div>
                        <button onClick={handleClearFilter} className='font-[400]'>
                            Clear
                        </button>
                    </div>
                    <div className='p-4 flex flex-col gap-4'>
                        { Object.keys(filterOptions).map((key) => (
                            <div key={key}>
                                <div className='font-[600] mb-2'>
                                    {key}
                                </div>
                                <div className='flex gap-10'>
                                    {filterOptions[key].map((option) => (
                                        <FilterCheckbox
                                            key={option}
                                            id={option.toLowerCase()}
                                            valueOf={key.toLowerCase()}
                                            checkboxText={option}
                                            setFilterValues={setFilterValues}
                                            filterValues={filterValues}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Filter;
