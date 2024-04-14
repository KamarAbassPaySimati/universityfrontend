import React from 'react';
import InputTypeRadio from '../../../../../components/InputField/InputTypeRadio';
import DatePickerAntd from '../../../../../components/DatePicker/DatePickerAntd';
import InputFieldWithDropDown from '../../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import InputTypeCheckbox from '../../../../../components/InputField/InputTypeCheckbox';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';
import InputField from '../../../../../components/InputField/InputField';
import InputSearch from '../../../../../components/InputField/InputSearch';

export default function PersonalDetails ({ handleStates, states }) {
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
        },
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
                key: 'account_number'
            },
            'Account Name': {
                label: 'Account Name',
                type: 'input',
                key: 'account_name'
            }
        }
    };
    const Gender = ['Male', 'Female', 'Undisclosed'];
    const EmployedFelids = {
        nothing_to_show: {
            'Employer Name': {
                label: 'Employer Name',
                type: 'input',
                key: 'employer_name'
            },
            'Industry Sector': {
                label: 'Industry Sector',
                type: 'dropdown',
                key: 'industry_sector',
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
                key: 'town/district'
            }
        }
    };
    const EmployedList = [
        'Administrative /Clerical',
        'Trainee/Intern/Apprentice',
        'Professionals/Technical/Managerial',
        'Executive/Director',
        'Board Level/Non-Executive Director'];
    return (
        <div className='overflow-auto scrollBar h-tabledivHeight'>
            <p className='ml-2.5 font-medium text-[14px] leading-4 text-neutral-primary py-2'>Gender</p>
            <div className='flex'>
                <div className='flex justify-between mb-6 ml-2.5 gap-6'>
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

            <div className='ml-2.5'>
                <DatePickerAntd label={'Date of Birth'} handleStates={handleStates} value={states?.DOB}/>
            </div>
            {console.log("BBBB", states)}
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
                        />
                    </div>
                </div>
                {states?.occupation === 'Employed' &&
                <div className='w-1/3 mt-6]'>
                    <div className='mx-[10px]'>
                        <InputFieldWithDropDown
                            labelName={'Employed'}
                            value={states?.employed === undefined ? '' : states.employed}
                            placeholder={'Select employed'}
                            // error={formErrors.role}
                            options={EmployedList}
                            id="employed"
                            testId="employed"
                            // information
                            handleInput={handleStates}
                        />
                    </div>

                </div>
                }
                {states?.occupation === 'In full time education' && <div className='w-1/3'>
                    <InputSearch handleSearchItem/>
                </div>}
                {(states?.occupation === 'Self Employed' || states?.occupation === 'Others') &&
                <div className='w-1/3'>
                    <InputField
                        className=''
                        divClassName='mx-2.5'
                        value={''}
                        // onFocus={handleFocus}
                        id='self_employed'
                        testId='self_employed'
                        // error={formErrors.firstName}
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
                    handleStates={handleStates}
                    states={states}
                />
            </div>
            }
            <div className='mt-6 ml-2.5'>
                <p className='text-neutral-primary font-medium text-[14px] leading-4 mb-2'>
                    Purpose and intended nature of the business relationship  (Tick all applicable)</p>
                {Purpose.map((purposeItem, index) => (
                    <InputTypeCheckbox
                        key={index}
                        id={index}
                        checkboxText={purposeItem}
                    />
                ))}
                {/* <InputTypeCheckbox id={1} checkboxText={'checkboxText'}/> */}
            </div>
            <FelidDivision
                divisionClassName = {'w-1/3'}
                divisionObject = {InputFelids}
                handleStates={handleStates}
                states={states}
            />
        </div>
    );
}
