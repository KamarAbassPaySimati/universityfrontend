import React from 'react';
import InputTypeRadio from '../../../../../components/InputField/InputTypeRadio';
import DatePickerAntd from '../../../../../components/DatePicker/DatePickerAntd';
import InputFieldWithDropDown from '../../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import InputTypeCheckbox from '../../../../../components/InputField/InputTypeCheckbox';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';

export default function PersonalDetails () {
    const IdDocumentList = [
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
    return (
        <div className='overflow-auto scrollBar h-tabledivHeight'>
            <p className='ml-2.5 font-medium text-[14px] leading-4 text-neutral-primary py-2'>Gender</p>
            <div className='flex w-[40%] justify-between mb-6 ml-2.5'>
                <InputTypeRadio
                    label={'Male'}
                    id='male'
                />
                <InputTypeRadio
                    label={'Female'}
                    id='female'
                />
                <InputTypeRadio
                    label={'Undisclosed'}
                    id='undisclosed'
                />
            </div>
            <div className='ml-2.5'>
                <DatePickerAntd label={'Date of Birth'}/>
            </div>
            <div className='w-[339px] mt-6 ml-2.5'>
                <InputFieldWithDropDown
                    labelName={'Occupation/Source of Funds'}
                    value={''}
                    placeholder={'Select Occupation/Source of Funds'}
                    // error={formErrors.role}
                    options={IdDocumentList}
                    id="passport"
                    testId="passport"
                // information
                // handleInput={handleInput}
                />
            </div>
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
            />
        </div>
    );
}
