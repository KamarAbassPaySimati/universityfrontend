import React, { Fragment } from 'react';
import InputField from '../InputField/InputField';
import InputFieldWithDropDown from '../InputFieldWithDropDown/InputFieldWithDropDown';
import GoogleApi from '../InputField/GoogleApi';
import InputSearch from '../InputField/InputSearch';
import InputSearchMultiselect from '../InputField/InputSearchMultiselect';

export default function FelidDivision ({
    divisionObject,
    handleOnChange,
    states,
    submitSelected,
    handleSearchItem
}) {
    return (
        <>
            {Object.keys(divisionObject).map((divItem, index = 0) => (
                <Fragment key={divisionObject[divItem]}>
                    {divItem !== 'nothing_to_show' &&
                    <p className={`text-neutral-primary text-[14px] leading-[16px] font-medium ml-2.5
                    ${index !== 0 ? 'pt-6' : 'pt-4'}`}>{divItem}</p>}
                    <div className='flex flex-wrap'>
                        {Object.values(divisionObject[divItem]).map((divObj) => (
                            <div className={'mt-4'} key={divObj}>
                                {/* checking the condition for type input and options */}
                                {
                                    divObj.type === 'dropdown'
                                        ? (
                                            <div className='mx-[10px] w-[339px]'>
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
                                            : divObj.type === 'InputSearch'
                                                ? (
                                                    <InputSearch
                                                        testId={divObj?.key}
                                                        id={divObj?.key}
                                                        handleInput={handleOnChange}
                                                        className={'w-[339px]'}
                                                        value={states[divObj?.key]}
                                                        handleSearchItem={handleSearchItem}
                                                        label={`${divObj?.label}`}
                                                        submitSelected={submitSelected}
                                                    />)
                                                : divObj.type === 'InputSearchMuliSelect'
                                                    ? (
                                                        <InputSearchMultiselect
                                                            testId={divObj?.key}
                                                            id={divObj?.key}
                                                            handleInput={handleOnChange}
                                                            className={'w-[339px]'}
                                                            value={states[divObj?.key]}
                                                            allOptions={divObj?.options}
                                                            handleSearchItem={handleSearchItem}
                                                            label={`${divObj?.label}`}
                                                            submitSelected={submitSelected}
                                                        />)
                                                    : (
                                                        <InputField
                                                            className={!(submitSelected && (states[divObj?.key] === undefined ||
                                                        states[divObj?.key]?.trim() === ''))
                                                                ? 'w-[339px]'
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
                                                            disableInput={divObj?.disable}
                                                        />
                                                    )}
                            </div>))}
                    </div>
                </Fragment>
            ))}
        </>
    );
}
