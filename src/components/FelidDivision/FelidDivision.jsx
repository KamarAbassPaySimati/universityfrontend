import React from 'react';
import InputField from '../InputField/InputField';

export default function FelidDivision () {
    return (
        <InputField
            className='w-[339px]'
            value={'val'}
            // onChange={handleChange}
            // onFocus={handleFocus}
            id='firstName'
            testId='first_name'
            // error={formErrors.firstName}
            label='First Name'
            placeholder='Enter first name'
            // setEnteredLetter={setEnteredLetter}
            maxLength="100"
        />
    );
}
