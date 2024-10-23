/* eslint-disable max-len */
import React, { Fragment } from 'react';
import InputField from '../InputField/InputField';
import InputFieldWithSataicValue from '../InputField/InputFieldWithSataicValue';
import InputFieldWithDropDown from '../InputFieldWithDropDown/InputFieldWithDropDown';
import GoogleApi from '../InputField/GoogleApi';
import InputSearch from '../InputField/InputSearch';
import InputSearchMultiselect from '../InputField/InputSearchMultiselect';
import formatID from '../../CommonMethods/formatId';

export default function FelidDivision ({
    divisionObject,
    handleOnChange,
    states,
    submitSelected,
    handleSearchItem,
    noHeader,
    noLabel
}) {
    return (
        <>
            {Object.keys(divisionObject).map((divItem, index = 0) => (
                divisionObject[divItem] !== undefined &&
                <Fragment key={divisionObject[divItem]}>
                    {divItem !== 'nothing_to_show' && !noHeader &&
                    <p className={`text-[#252C32] text-[18px] leading-[16px] font-semibold ml-2.5
                    ${index !== 0 ? 'pt-7 pb-3' : 'pt-7 pb-3'}`}>{divItem}</p>}
                    <div className='flex flex-wrap'>
                        {Object.values(divisionObject[divItem]).map((divObj, index = 0) => (
                            divObj !== undefined &&
                            <div className={'mt-4'} key={index}>
                                {/* checking the condition for type input and options */}
                                {
                                    divObj.type === 'dropdown'
                                        ? (
                                            <div className='mx-[10px] w-[339px]'>
                                                <InputFieldWithDropDown
                                                    noLabel={noLabel}
                                                    labelName={`${divObj?.label}`}
                                                    value={states[divObj?.key] === undefined ? '' : states[divObj?.key]}
                                                    placeholder={divObj?.placeHolder
                                                        ? divObj?.placeHolder
                                                        : `Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                    error={divObj?.require &&
                                                        (submitSelected && (states[divObj?.key] === undefined ||
                                                        states[divObj?.key]?.trim() === ''))
                                                        ? 'Required field'
                                                        : undefined}
                                                    options={divObj?.options}
                                                    disable={divObj?.disable}
                                                    id={divObj?.key}
                                                    testId={divObj?.key}
                                                    // information
                                                    handleInput={handleOnChange}
                                                    // type={divObj.type}
                                                />
                                            </div>)
                                        : divObj.type === 'googleAPI'
                                            ? (
                                                divObj?.disable
                                                    ? (
                                                        <InputField
                                                            noLabel={noLabel}
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
                                                            placeholder={divObj?.placeHolder
                                                                ? divObj?.placeHolder
                                                                : `Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                            // setEnteredLetter={setEnteredLetter}
                                                            maxLength="100"
                                                            onChange={handleOnChange}
                                                            inputType={divObj?.type}
                                                            disableInput={divObj?.disable}
                                                        />)
                                                    : (
                                                        <GoogleApi
                                                            id={divObj?.key}
                                                            submitSelected={submitSelected}
                                                            value={states[divObj?.key]}
                                                            placeholder={divObj?.placeHolder
                                                                ? divObj?.placeHolder
                                                                : `Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                            testId={divObj?.key}
                                                            handleOnChange={handleOnChange}
                                                            states={states}
                                                            labelName={`${divObj?.label}`} />)
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
                                                    ? (divObj?.disable
                                                        ? (
                                                            <InputField
                                                                noLabel={noLabel}
                                                                className={!(submitSelected &&
                                                                    (states[divObj?.key] === undefined ||
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
                                                                placeholder={divObj?.placeHolder
                                                                    ? divObj?.placeHolder
                                                                    : `Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                                // setEnteredLetter={setEnteredLetter}
                                                                maxLength="100"
                                                                onChange={handleOnChange}
                                                                inputType={divObj?.type}
                                                                disableInput={divObj?.disable}
                                                            />)
                                                        : (
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
                                                            />))
                                                    : divObj.type === 'inputStaticText'
                                                        ? (
                                                            <InputFieldWithSataicValue
                                                                className={!(submitSelected && (states[divObj?.key] === undefined ||
                                                    states[divObj?.key]?.trim() === ''))
                                                                    ? 'w-[339px]'
                                                                    : 'w-[339px]'}
                                                                divClassName='mx-2.5'
                                                                value={states[divObj?.key]}
                                                                staticText={divObj?.staticText}
                                                                // onFocus={handleFocus}
                                                                id={divObj?.key}
                                                                testId={divObj?.key}
                                                                error={divObj?.require &&
                                                    (submitSelected && (states[divObj?.key] === undefined ||
                                                    states[divObj?.key]?.trim() === ''))
                                                                    ? 'Required field'
                                                                    : undefined}
                                                                label={`${divObj?.label}`}
                                                                placeholder={divObj?.placeHolder
                                                                    ? divObj?.placeHolder
                                                                    : `Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                                // setEnteredLetter={setEnteredLetter}
                                                                maxLength="100"
                                                                onChange={handleOnChange}
                                                                inputType={divObj?.type}
                                                                disableInput={divObj?.disable}
                                                            />)
                                                        : (
                                                            <InputField
                                                                noLabel={noLabel}
                                                                className={!(submitSelected && (states[divObj?.key] === undefined ||
                                                        states[divObj?.key]?.trim() === ''))
                                                                    ? 'w-[339px]'
                                                                    : 'w-[339px]'}
                                                                divClassName='mx-2.5'
                                                                value={divObj?.label === 'Entry by' ? formatID(states[divObj?.key]) : states[divObj?.key]}
                                                                staticText={divObj?.staticText}
                                                                // onFocus={handleFocus}
                                                                id={divObj?.key}
                                                                testId={divObj?.key}
                                                                error={divObj?.require &&
                                                        (submitSelected && (states[divObj?.key] === undefined ||
                                                        states[divObj?.key]?.trim() === ''))
                                                                    ? 'Required field'
                                                                    : undefined}
                                                                label={`${divObj?.label}`}
                                                                placeholder={divObj?.placeHolder
                                                                    ? divObj?.placeHolder
                                                                    : `Enter ${divObj?.label.split('(Optional)')[0]}`}
                                                                // setEnteredLetter={setEnteredLetter}
                                                                maxLength="100"
                                                                onChange={handleOnChange}
                                                                inputType={divObj?.type}
                                                                disableInput={divObj?.disable}
                                                            />
                                                        )
                                }
                            </div>))}
                    </div>
                </Fragment>
            ))}
        </>
    );
}
