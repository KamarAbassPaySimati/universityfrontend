import React, { Fragment } from 'react';
import InputField from '../InputField/InputField';
import InputFieldWithDropDown from '../InputFieldWithDropDown/InputFieldWithDropDown';
import GoogleApi from '../InputField/GoogleApi';

export default function FelidDivision ({
    divisionClassName,
    divisionObject,
    handleOnChange,
    states,
    submitSelected
}) {
    return (
        <>
            {Object.keys(divisionObject).map((divItem, index = 0) => (
                <Fragment key={divisionObject[divItem]}>
                    {divItem !== 'nothing_to_show' &&
                    <p className={`text-neutral-primary text-[14px] leading-[16px] font-medium mb-6 ml-2.5
                    ${index !== 0 ? 'pt-6' : 'pt-4'}`}>{divItem}</p>}
                    <div className='flex flex-wrap'>
                        {Object.values(divisionObject[divItem]).map((divObj) => (
                            <div className={''} key={divObj}>
                                {/* checking the condition for type input and options */}
                                {
                                    divObj.type === 'dropdown'
                                        ? (
                                            <div className='mx-[10px]'>
                                                {console.log(divObj.key)}
                                                <InputFieldWithDropDown
                                                    labelName={`${divObj?.label}`}
                                                    value={states[divObj?.key] === undefined ? '' : states[divObj?.key]}
                                                    placeholder={`Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                    error={divObj?.require &&
                                                        (submitSelected && (states[divObj?.key] === undefined ||
                                                        states[divObj?.key]?.trim() === ''))
                                                        ? 'Required field'
                                                        : undefined}
                                                    options={divObj?.options}
                                                    id={divObj?.key}
                                                    testId={divObj?.key}
                                                    // information
                                                    handleInput={handleOnChange}
                                                    // type={divObj.type}
                                                />
                                            </div>)
                                        : divObj.type === 'googleAPI'
                                            ? (
                                                <GoogleApi
                                                    id={divObj?.key}
                                                    submitSelected={submitSelected}
                                                    value={states[divObj?.key]}
                                                    placeholder={`Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                    testId={divObj?.key}
                                                    handleOnChange={handleOnChange}
                                                    states={states}
                                                    labelName={`${divObj?.label}`} />
                                            )
                                            : (
                                                <InputField
                                                    className={!(submitSelected && (states[divObj?.key] === undefined ||
                                                        states[divObj?.key]?.trim() === ''))
                                                        ? 'mb-6 w-[339px]'
                                                        : 'w-[339px]'}
                                                    divClassName='mx-2.5'
                                                    value={states[divObj?.key]}
                                                    // onFocus={handleFocus}
                                                    id={divObj?.key}
                                                    testId={divObj?.key}
                                                    error={divObj?.require &&
                                                        (submitSelected && (states[divObj?.key] === undefined ||
                                                        states[divObj?.key]?.trim() === ''))
                                                        ? 'Required field'
                                                        : undefined}
                                                    label={`${divObj?.label}`}
                                                    placeholder={`Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                    // setEnteredLetter={setEnteredLetter}
                                                    maxLength="100"
                                                    onChange={handleOnChange}
                                                    inputType={divObj?.type}
                                                />)}
                            </div>))}
                    </div>
                </Fragment>
            ))}
        </>
    );
}
