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
    const OccupationList = [
        'Employed', 'Self Employed', 'In Full-time Education', 'Seeking Employment', 'Retired/Pensioner', 'Others'];
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
                    'Education Services',
                    'Transport & Storage Services',
                    'FDH Bank',
                    'Real Estate Activities',
                    'Information & Communication',
                    'Healthcare Services']
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
        'Admin/Administrative/Clerical',
        'Trainee/Intern/Apprentice',
        'Professionals/Technical',
        'Professionals/Technical/Manager',
        'Board Level/Non-Executive'
    ];

    const handleSearchItem = async (id, newValue) => {
        const res = await dataService.GetAPI(`list-institution?search=${newValue}`);
        return res?.data?.institutionNames.length === 0 ? ['Others (Please Specify)'] : res?.data?.institutionNames;
    };

    return (
        <div data-testid="kyc_personal_details_screen" className='overflow-auto scrollBar h-tabledivHeight'>
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
                            checkedState={states.gender === item}
                            name='gender'
                            handleRadioButton={() => handleStates(item, 'gender')}
                        />))}
                </div>
            </div>
            {(submitSelected && (states.gender === undefined || states.gender === '')) &&
            <div className='mb-4 ml-2'><ErrorMessage error={'Required field'} /></div>}
            <div className='px-2.5 w-[339px]'>
                <DatePickerAntd
                    label={'Date of Birth'}
                    handleStates={handleStates}
                    value={states.dob === undefined ? '' : states.dob}
                    error={(states.dob === undefined && submitSelected) ? 'Required field' : undefined}
                />
            </div>
            <div className='flex w-full flex-wrap'>
                <div className='mt-7 ml-2.5 '>
                    <div className='pr-[20px] w-[339px]'>
                        <InputFieldWithDropDown
                            labelName={'Occupation/Source of Funds'}
                            className={'w-[339px]'}
                            value={states?.occupation === undefined ? '' : states.occupation}
                            placeholder={'Select Occupation/Source of Funds'}
                            // error={formErrors.role}
                            options={OccupationList}
                            id="occupation"
                            testId="occupation_dropdown"
                            // information
                            handleInput={handleStates}
                            error={(submitSelected && (states.occupation === undefined || states.occupation === ''))
                                ? 'Required field'
                                : undefined}
                        />
                    </div>
                </div>
                {states?.occupation === 'Employed' &&
                <div className='w-[339px] mt-7'>
                    <div className='mx-[10px] w-[339px]'>
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
                {states?.occupation === 'In Full-time Education' && <div className='mt-6 w-[339px]'>
                    <InputSearch
                        testId='institute'
                        id='institute'
                        handleInput={handleStates}
                        className={'w-[339px]'}
                        value={states?.institute === undefined ? '' : states.institute}
                        handleSearchItem={handleSearchItem}
                        label={'Search Institute'}
                        submitSelected={submitSelected}
                    />
                </div>}
                {(states?.occupation === 'Self Employed' || states?.occupation === 'Others' ||
                (states?.institute === 'Others (Please Specify)' && states?.occupation === 'In Full-time Education')) &&
                <div className='mt-7 w-[339px]'>
                    <InputField
                        className=''
                        divClassName='mx-2.5'
                        value={states?.occupation === 'Others'
                            ? (states.occupation_specify === undefined ? '' : states.occupation_specify)
                            : states?.occupation === 'Self Employed'
                                ? (states.self_employed_specify === undefined ? '' : states.self_employed_specify)
                                : (states.institute_specify === undefined ? '' : states.institute_specify) }
                        // onFocus={handleFocus}
                        id={states?.occupation === 'Self Employed'
                            ? 'self_employed_specify'
                            : states?.occupation === 'Others' ? 'occupation_specify' : 'institute_specify'}
                        testId={states?.occupation === 'Self Employed'
                            ? 'self_employed_specify'
                            : states?.occupation === 'Others' ? 'occupation_specify' : 'institute_specify'}
                        error={(submitSelected && (states?.occupation === 'Self Employed'
                            ? (states.self_employed_specify === undefined || states.self_employed_specify === '')
                            : states?.occupation === 'Others'
                                ? (states.occupation_specify === undefined || states.occupation_specify === '')
                                : (states.institute_specify === undefined || states.institute_specify === '')))
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
                        testId={`purpose_${index}`}
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
                divisionObject = {InputFelids}
                handleOnChange={handleStates}
                states={states}
                submitSelected={submitSelected}
            />
            <FelidDivision
                divisionObject = {bankInputFelid}
                handleOnChange={handleStates}
                states={states}
                submitSelected={bankSelected}
            />
        </div>
    );
}
