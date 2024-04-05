import React, { Fragment } from 'react';
import InputField from '../InputField/InputField';

export default function FelidDivision ({
    divisionClassName,
    divisionObject
}) {
    return (
        <>
            {Object.keys(divisionObject).map((divItem) => (
                <Fragment key={divisionObject[divItem]}>
                    {divItem !== 'nothing_to_show' &&
                    <p className='text-header-dark text-[18px] leading-[26px] font-semibold mb-6 mx-2.5'>{divItem}</p>}
                    <div className='w-full flex flex-wrap'>
                        {Object.values(divisionObject[divItem]).map((divObj) => (
                            <div className={`${divisionClassName}`} key={divObj}>
                                {/* checking the condition for type input and options */}
                                <InputField
                                    className='mb-6'
                                    divClassName='mx-2.5'
                                    value={'val'}
                                    // onChange={handleChange}
                                    // onFocus={handleFocus}
                                    id={divObj.key}
                                    testId={divObj.key}
                                    // error={formErrors.firstName}
                                    label={`${divObj.label} ${!divObj.require ? '(Optional)' : ''}`}
                                    placeholder={`Enter ${divObj.label}`}
                                    // setEnteredLetter={setEnteredLetter}
                                    maxLength="100"
                                />
                            </div>))}
                    </div>
                </Fragment>
            ))}
        </>
    );
}
