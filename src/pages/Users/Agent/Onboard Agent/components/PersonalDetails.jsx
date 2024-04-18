import React from 'react';
import InputTypeRadio from '../../../../../components/InputField/InputTypeRadio';
import DatePickerAntd from '../../../../../components/DatePicker/DatePickerAntd';
import InputFieldWithDropDown from '../../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import InputTypeCheckbox from '../../../../../components/InputField/InputTypeCheckbox';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';
import InputField from '../../../../../components/InputField/InputField';
import InputSearch from '../../../../../components/InputField/InputSearch';
import { dataService } from '../../../../../services/data.services';
import ErrorMessage from '../../../../../components/ErrorMessage/ErrorMessage';

export default function PersonalDetails ({ handleStates, states, submitSelected, bankSelected }) {
    console.log('bank_name', bankSelected)
    const OccupationList = [
        'Employed', 'Self Employed', 'In full time education', 'Seeking employment', 'Ritired/Pensioner', 'Others'];
    const Purpose = [
        'Send and/or receive e-payments to/from individuals and enterprises and/or groups of individuals and/or enterprises',
        'Accept e-payment/s in connection with the sale of goods and/or services',
        'Distribute e-payments to third party individuals and/or enterprises',
        'Recruit customers/end users, agents and merchants to enrol on the e-payments platform'
    ];
    const InputFelids = {
        'Income status': {
            'Monthly Income': {
                label: 'Monthly Income',
                type: 'dropdown',
                key: 'monthly_income',
                require: true,
                options: [
                    'Up to 300,000.00 MWK',
                    '300,000.00 to 1,000,000.00 MWK',
                    '1,000,000.00 to 2,500,000.00 MWK',
                    '2,500,000.00 to 5,000,000.00 MWK', '5,000,000.00 to 10,000,000.00 MWK', 'Over 10 Million MWK']
            },
            'Monthly Withdrawal': {
                label: 'Monthly Withdrawal',
                type: 'dropdown',
                key: 'monthly_withdrawal',
                require: true,
                options: [
                    'Up to 300,000.00 MWK',
                    '300,000.00 to 1,000,000.00 MWK',
                    '1,000,000.00 to 2,500,000.00 MWK',
                    '2,500,000.00 to 5,000,000.00 MWK',
                    '5,000,000.00 to 10,000,000.00 MWK',
                    'Over 10 Million MWK'
                ]
            }
        }
    };
    const bankInputFelid = {
        'Banking  Information for Payouts (Optional)': {
            'Bank Name': {
                label: 'Bank Name',
                type: 'dropdown',
                key: 'bank_name',
                require: true,
                options: [
                    'CDH Investment Bank',
                    'Ecobank',
                    'FDH Bank',
                    'First Capital Bank',
                    'National Bank',
                    'NBS Bank',
                    'Standard Bank',
                    'Centenary Bank'
                ]
            },
            'Account Number': {
                label: 'Account Number',
                type: 'input',
                key: 'account_number',
                require: true
            },
            'Account Name': {
                label: 'Account Name',
                type: 'input',
                key: 'account_name',
                require: true
            }
        }
    };
    const Gender = ['Male', 'Female', 'Undisclosed'];
    const EmployedFelids = {
        nothing_to_show: {
            'Employer Name': {
                label: 'Employer Name',
                type: 'input',
                key: 'employer_name',
                require: true
            },
            'Industry Sector': {
                label: 'Industry Sector',
                type: 'dropdown',
                key: 'industry',
                require: true,
                options: [
                    'CDH Investment Bank',
                    'Ecobank',
                    'FDH Bank',
                    'First Capital Bank',
                    'National Bank',
                    'NBS Bank',
                    'Standard Bank',
                    'Centenary Bank'
                ]
            },
            'Town/District': {
                label: 'Town/District',
                type: 'googleAPI',
                key: 'occupation_town',
                require: true

            }
        }
    };
    const EmployedList = [
        'Administrative /Clerical',
        'Trainee/Intern/Apprentice',
        'Professionals/Technical/Managerial',
        'Executive/Director',
        'Board Level/Non-Executive Director'];

    const handleSearchItem = async (id, newValue) => {
        const res = await dataService.GetAPI(`list-institution?search=${newValue}`);
        return res?.data?.institutionNames;
    };
    return (
        <div className='overflow-auto scrollBar h-tabledivHeight'>
            <p className={`ml-2.5 font-medium text-[14px] leading-4 text-neutral-primary
            ${(submitSelected && (states.gender === undefined || states.gender === '')) ? 'pt-2' : 'py-2'}`}>Gender</p>
            <div className='flex'>
                <div className={`flex justify-between ml-2.5 gap-6 
                ${(submitSelected && (states.gender === undefined || states.gender === '')) ? '' : 'mb-6'}`}>
                    {Gender.map((item) => (
                        <InputTypeRadio
                            label={item}
                            id={item}
                            key={item}
                            name='gender'
                            handleRadioButton={() => handleStates(item, 'gender')}
                        />))}
                </div>
            </div>
            {(submitSelected && (states.gender === undefined || states.gender === '')) &&
            <div className='mb-4 ml-2'><ErrorMessage error={'Required field'} /></div>}
            <div className='px-2.5 w-1/3'>
                <DatePickerAntd
                    label={'Date of Birth'}
                    handleStates={handleStates}
                    value={states?.dob}
                    error={(states.dob === undefined && submitSelected) ? 'Required field' : undefined}
                />
            </div>
            <div className='flex w-full items-end'>
                <div className='w-1/3 mt-6 ml-2.5 '>
                    <div className='pr-[20px]'>
                        <InputFieldWithDropDown
                            labelName={'Occupation/Source of Funds'}
                            value={states?.occupation === undefined ? '' : states.occupation}
                            placeholder={'Select Occupation/Source of Funds'}
                            // error={formErrors.role}
                            options={OccupationList}
                            id="occupation"
                            testId="occupation"
                            // information
                            handleInput={handleStates}
                            error={(submitSelected && (states.occupation === undefined || states.occupation === ''))
                                ? 'Required field'
                                : undefined}
                        />
                    </div>
                </div>
                {states?.occupation === 'Employed' &&
                <div className='w-1/3 mt-6'>
                    <div className='mx-[10px]'>
                        <InputFieldWithDropDown
                            labelName={'Employed'}
                            value={states?.employed_role === undefined ? '' : states.employed_role}
                            placeholder={'Select employed'}
                            // error={formErrors.role}
                            options={EmployedList}
                            id="employed_role"
                            testId="employed_role"
                            // information
                            handleInput={handleStates}
                            error={(submitSelected && (states.employed_role === undefined || states.employed_role === ''))
                                ? 'Required field'
                                : undefined}
                        />
                    </div>

                </div>
                }
                {states?.occupation === 'In full time education' && <div className='w-1/3'>
                    <InputSearch
                        testId='institute'
                        id='institute'
                        handleInput={handleStates}
                        value={states?.institute === undefined ? '' : states.institute}
                        handleSearchItem={handleSearchItem}
                        label={'Search Institute'}
                        submitSelected={submitSelected}
                    />
                </div>}
                {(states?.occupation === 'Self Employed' || states?.occupation === 'Others' ||
                (states?.institute === 'Others (Please Specify)' && states?.occupation === 'In full time education')) &&
                <div className='w-1/3'>
                    <InputField
                        className=''
                        divClassName='mx-2.5'
                        value={states?.self_employed === undefined ? '' : states.self_employed}
                        // onFocus={handleFocus}
                        id='self_employed'
                        testId='self_employed'
                        error={(submitSelected && (states.self_employed === undefined || states.self_employed === ''))
                            ? 'Required field'
                            : undefined}
                        label={'Please Specify'}
                        placeholder={'Enter here'}
                        // setEnteredLetter={setEnteredLetter}
                        maxLength="100"
                        onChange={handleStates}
                        inputType={'input'}
                    />
                </div>
                }
            </div>
            {states?.occupation === 'Employed' &&
            <div>
                <p className='text-neutral-primary text-[14px] font-[500] leading-[16px] mr-4 py-6 ml-2'>
                    Nature and detailed description of the location of business activities or place of employment,
                    whichever is applicable
                </p>
                <FelidDivision
                    divisionClassName = {'w-1/3'}
                    divisionObject = {EmployedFelids}
                    handleOnChange={handleStates}
                    states={states}
                    submitSelected={submitSelected}
                />
            </div>
            }
            <div className='mt-6 ml-2.5'>
                <p className='text-neutral-primary font-medium text-[14px] leading-4 mb-2'>
                    Purpose and intended nature of the business relationship  (Tick all applicable)</p>
                {Purpose.map((purposeItem, index) => (
                    <InputTypeCheckbox
                        key={purposeItem}
                        id={purposeItem}
                        checkboxText={purposeItem}
                        handleOnChange={handleStates}
                        Checked={states?.purpose !== undefined ? states?.purpose.includes(purposeItem) : false}
                    />
                ))}
                {(submitSelected && (states.purpose === undefined || states.purpose.length === 0)) &&
                <ErrorMessage error={'Required field'} />}
                {/* <InputTypeCheckbox id={1} checkboxText={'checkboxText'}/> */}
            </div>
            <FelidDivision
                divisionClassName = {'w-1/3'}
                divisionObject = {InputFelids}
                handleOnChange={handleStates}
                states={states}
                submitSelected={submitSelected}
            />
            <FelidDivision
                divisionClassName = {'w-1/3'}
                divisionObject = {bankInputFelid}
                handleOnChange={handleStates}
                states={states}
                submitSelected={bankSelected}
            />
        </div>
    );
}
