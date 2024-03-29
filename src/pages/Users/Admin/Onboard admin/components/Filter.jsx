/* eslint-disable max-len */
/* eslint-disable security/detect-object-injection */

import React, { useRef, useState, useEffect } from 'react';
import { useOnClickOutside } from '../../CommonMethods/outsideClick';
import { Tooltip } from 'react-tooltip';
import FilterCheckbox from './FilterCheckbox';

const OrdersFilter = ({
    FilterData,
    setFilterCheckBox,
    handleApplyFilter,
    isFilterOpen,
    setIsFilterOpen,
    handleOnClickSearch,
    handleSetDate,
    productFilter,
    filterValues
}) => {
    const ref = useRef();

    // const [active, setActive] = useState('status');

    useOnClickOutside(ref, () => {
        setIsFilterOpen(false);
    });

    useEffect(() => {

    }, []);

    // const [statusKey, setSatusKey] = useState('');

    // const initailState = {
    //     status: { Completed: false, Pending: false, Failed: false, Partial: false }
    //     // paymentType: { 'Card Based Payment': false, 'Crypto Based Payment': false },
    //     // dataRange: { create_start : '', create_end: '' },
    // };

    // const checkTrueProperties = (obj) => {
    //     const trueProperties = [];

    //     for (const key in obj) {
    //         if (obj[key] === true) {
    //             trueProperties.push(key);
    //         }
    //     }

    //     return trueProperties.join(',');
    // };

    return (
        <div className="relative">
            {/* <img
                src="/assets/images/filter.svg"
                className="cursor-pointer p-3 hover:bg-[#ECD2E0] rounded-full"
                alt=""
                data-testid="filter-btn"
                data-tooltip-id="my-tooltip-14"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            /> */}
            <Tooltip
                id="my-tooltip-14"
                place="top"
                content="Filter admin list"
            />
            {isFilterOpen && <>
                <div ref={ref} className="p-4 absolute top-[40px] right-0 rounded-[4px] flex space-x-3 z-10 bg-white border border-[#F7D7E8]">
                    <div className={'flex flex-col justify-between pb-[2px]'}>
                        <div className="flex flex-row gap-2">
                            <h1 className={'font-[400] text-base text-[#000000B1] mb-1'}>
                                Role
                            </h1>
                            <FilterCheckbox id="completed" valueOf='status' checkboxText='Completed' setFilterValues={setFilterValues} filterValues={filterValues} />
                            <FilterCheckbox id="failed" valueOf='status' checkboxText='Failed' setFilterValues={setFilterValues} filterValues={filterValues} />
                            <FilterCheckbox id="partial" valueOf='status' checkboxText='Partial' setFilterValues={setFilterValues} filterValues={filterValues} />
                            <FilterCheckbox id="pending" valueOf='status' checkboxText='Pending' setFilterValues={setFilterValues} filterValues={filterValues} />
                        </div>
                        <div className="flex flex-row gap-2">
                            <h1 className={'font-[400] text-base text-[#000000B1] mb-1'}>
                                Status
                            </h1>
                            <FilterCheckbox id="completed" valueOf='status' checkboxText='Completed' setFilterValues={setFilterValues} filterValues={filterValues} />
                            <FilterCheckbox id="failed" valueOf='status' checkboxText='Failed' setFilterValues={setFilterValues} filterValues={filterValues} />
                        </div>
                        <div className='mt-3'>
                            <button data-testid="clear-btn" className="text-[14px] font-[400] leading-[22px] text-[#731748] whitespace-nowrap mt-3 w-full" onClick={() => {
                                handleApplyFilter('all', 'clear');
                                setFilterValues(initailState);
                                setIsFilterOpen(false);
                            }}>
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    );
};

export default OrdersFilter;
