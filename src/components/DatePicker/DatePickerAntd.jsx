import React from 'react';
import { DatePicker } from 'antd';
import Image from '../Image/Image';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const CustomDatePicker = ({ label, handleStates, value, error }) => {
    const getDisabledDate = (current) => {
        return current && current > Date.now();
    };
    return (
        <div className=''>
            <p className='text-neutral-primary font-medium text-[14px] leading-4 mb-2'>{label}</p>
            <DatePicker
                className={`${error ? 'custom-datepicker-error' : 'custom-datepicker'} w-full`}
                autoComplete="off"
                data-testid="date_picker"
                placeholder="DD-MMM-YYYY"
                format={'DD-MMM-YYYY'}
                value={value}
                suffixIcon={<Image src='calendar'/>}
                disabledDate={getDisabledDate}
                onChange={(date, dateString) => handleStates(date, 'dob')}
            />
            {error && <ErrorMessage error={error} />}
        </div>
    );
};

export default CustomDatePicker;
