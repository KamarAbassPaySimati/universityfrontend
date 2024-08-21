/* eslint-disable max-len */
import React, { useState } from 'react';
// import SingleTickButton from '../SingleTickButton/SingleTickButton';
import Button from '../Button/Button';
import DatePickerAntd from '../DatePicker/DatePickerAntd';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import moment from 'moment';

export default function DateFilter ({
    dateRange, setDateRange, handleApply, handleClearFilter
}) {
    const handleStates = (value, id, type) => {
        setDateRange((prevState) => ({ ...prevState, [id]: value }));
    };
    const [errorMessage, setErrorMessage] = useState('');
    const handleApplyClick = () => {
        const startdate = new Date(dateRange.start_date).getTime();
        const enddate = new Date(dateRange.end_date).getTime();

        const startDate = moment(startdate).startOf('day').unix() * 1000;
        const endDate = moment(enddate).endOf('day').subtract(0, 'minute').unix() * 1000;

        if (!dateRange.start_date && !dateRange.end_date) {
            setErrorMessage('Both start date and end date are required.');
        } else if (dateRange.start_date && dateRange.end_date) {
            if (startDate > endDate) {
                setErrorMessage('Start date cannot be greater than end date');
            } else {
                setErrorMessage('');
                handleApply();
            }
        } else {
            setErrorMessage('');
            handleApply();
        }
    };
    return (
        <div className='relative z-[12]'>
            <div data-testid='filter-modal' className="w-[400px] absolute top-[36px] right-7 rounded-[8px] z-[999] bg-white border border-neutral-outline text-[14px] leading-[24px] text-neutral-primary">
                <div className='p-3 flex justify-between border-b border-neutral-outline'>
                    <div className='font-semibold'>
                        Filter Date Range
                    </div>
                    <button data-testid="clear-filter"
                        onClick={handleClearFilter}
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
                                type='dashBoard'
                                value={dateRange.start_date}
                                error={errorMessage !== ''}
                            />
                        </div>
                        <div className='px-2.5 w-[200px]'>
                            <DatePickerAntd
                                label={'End date'}
                                type='dashBoard'
                                testID="end_date"
                                handleStates={handleStates}
                                value={dateRange.end_date}
                                error={errorMessage !== ''}
                            />
                        </div>
                    </div>
                </div>
                <div className='ml-7 mb-2'><ErrorMessage error={errorMessage} /></div>
                <Button testId="apply_filter"
                    onClick={handleApplyClick}
                    text='Apply' className='!w-[164px] ml-6 mb-5 mt-2 ' />
            </div>
        </div>
    );
}
