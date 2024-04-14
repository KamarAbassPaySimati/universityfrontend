import React from 'react';
import { DatePicker } from 'antd';
import Image from '../Image/Image';

const CustomDatePicker = ({ label, handleStates, value }) => {
    const getDisabledDate = (current) => {
        return current && current > Date.now();
    };
    return (
        <div className=''>
            <p className='text-neutral-primary font-medium text-[14px] leading-4 mb-2'>{label}</p>
            <DatePicker
                className="custom-datepicker"
                autoComplete="off"
                data-testid="date_picker"
                placeholder="DD-MMM-YYYY"
                value={value}
                suffixIcon={<Image src='calendar'/>}
                disabledDate={getDisabledDate}
                onChange={(date, dateString) => handleStates(date, 'DOB')}
            />
        </div>
    );
};

export default CustomDatePicker;
