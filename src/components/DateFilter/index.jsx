/* eslint-disable max-len */
import React, { useState } from 'react';
// import SingleTickButton from '../SingleTickButton/SingleTickButton';
import Button from '../Button/Button';
import DatePickerAntd from '../DatePicker/DatePickerAntd';

export default function DateFilter ({
    filterType, setIsFilterOpen, handleClearFilter, filterOptionOne, searchParams, setSearchParams,
    isLoading
}) {
    const [dateRange, setDateRange] = useState({});
    const handleStates = () => {

    };
    return (
        <div className='relative z-[12]'>
            <div data-testid='filter-modal' className="w-[400px] absolute top-[36px] right-7 rounded-[8px] z-[999] bg-white border border-neutral-outline text-[14px] leading-[24px] text-neutral-primary">
                <div className='p-4 flex justify-between border-b border-neutral-outline'>
                    <div className='font-semibold'>
                        Filter Date Range
                    </div>
                    <button data-testid="clear-filter"
                        // onClick={() => { setIsFilterOpen(false); handleClearFilter(); } }
                        className='font-[400]'>
                        Clear
                    </button>
                </div>
                <div className='p-4'>
                    <div className='flex'>
                        <div className='px-2.5 w-[200px]'>
                            <DatePickerAntd
                                label={'Start date'}
                                testID="start_date"
                                handleStates={handleStates}
                                type='start_date'
                                value={dateRange.start_date}
                            />
                        </div>
                        <div className='px-2.5 w-[200px]'>
                            <DatePickerAntd
                                label={'End date'}
                                type='end_date'
                                testID="end_date"
                                handleStates={handleStates}
                                value={dateRange.end_date}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className='ml-6 mb-2'><ErrorMessage error={errorMessage} /></div> */}
                <Button testId="apply_filter"
                    // onClick={handleApplySearchParams}
                    text='Apply' className='!w-[164px] ml-4 mb-5 mt-2' />
            </div>
        </div>
    );
}
