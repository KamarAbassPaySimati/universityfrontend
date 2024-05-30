import React, { useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import KYCTopWithType from '../../../components/KYC/KYCTopWithType';
import InputField from '../../../components/InputField/InputField';
import { useSearchParams } from 'react-router-dom';
import { dataService } from '../../../services/data.services';
import Button2 from '../../../components/Button2/Button2';
import Button from '../../../components/Button/Button';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import GlobalContext from '../../../components/Context/GlobalContext';
import { formatDaysWithSuffix } from '../../../CommonMethods/formatDaysWithSuffix';

export default function Commissions () {
    const [searchParams, setSearchParams] = useSearchParams({ });
    const { setToastSuccess } = useContext(GlobalContext);
    const onClickButtonFunction = () => {
        setSearchParams({ update: true });
    };
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [error, setError] = useState('');
    const [inputData, setInputData] = useState({ date1: '1', date2: '15' });
    const getViewCommission = async () => {
        try {
            const res = await dataService.GetAPI('admin-users/view-commission-date');
            setInputData({ date1: res.data.data.date1.toString(), date2: res.data.data.date2.toString() });
        // Code to handle successful response
        } catch (error) {
        // Code to handle errors
            console.error('Error occurred:', error);
        }
    };
    useEffect(() => {
        getViewCommission();
        setError('');
    }, [searchParams]);

    const handleOnChange = (event) => {
        const { id, value } = event.target;
        setError('');
        // Allow clearing the input field
        if (value === '') {
            setInputData({
                ...inputData,
                [id]: value
            });
            setError('');
            return;
        }

        // Ensure only numbers are entered
        if (!/^\d*$/.test(value)) {
            setError('Please enter only numbers.');
            return;
        }

        // Ensure the value is within the range 1-28
        const numberValue = parseInt(value, 10);
        if (numberValue < 1 || numberValue > 28) {
            setError('Enter date range between 1 to 28.');
            return;
        }
        // Update the state
        const updatedData = {
            ...inputData,
            [id]: value
        };

        // Validate date2 is greater than date1
        const date1Number = parseInt(updatedData.date1, 10);
        const date2Number = parseInt(updatedData.date2, 10);

        if (id === 'date1' && date2Number && date2Number <= date1Number) {
            setError('End Date must be greater than Start Date.');
        } else if (id === 'date2' && date2Number <= date1Number) {
            setError('End Date must be greater than Start Date.');
        } else {
            setError('');
        }

        setInputData(updatedData);
    };
    const handleSubmit = async () => {
        setError('');
        setIsLoadingButton(true);
        if (inputData.date1.trim() === '' || inputData.date2.trim() === '') {
            setError('Required field(s)');
            setIsLoadingButton(false);
        } else {
            try {
                await dataService.PatchAPI('admin-users/update-commission-date', inputData);
                setIsLoadingButton(false);
                setToastSuccess('Agent commission updated successfully');
                setSearchParams({});
                // Code to handle successful response
            } catch (error) {
                // Code to handle errors
                console.error('Error occurred:', error);
            }
        }
    };

    return (
        <div>
            <CardHeader
                activePath='Commissions'
                paths={['Financials']}
                pathurls={['finanacials/commissions']}
                minHeightRequired={true}
                UpdateIcon={true}
                navigationPath=''
                table={true}
                ChildrenElement
            >
                <div >
                    <KYCTopWithType
                        Name={'Commissions'}
                        buttonText={searchParams.get('update') === null ? 'Update' : undefined}
                        onClickButtonFunction={onClickButtonFunction}
                        TestId="UpdateCommissionSettingButton"
                    />
                    <div
                        data-testid="agentCommission"
                        className={`mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                        h-[${searchParams.get('update') ? '300px' : '250px'}]
                flex flex-col justify-between bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                        <h1 className='ml-2 font-semibold text-[#252C32] text-lg'>
                            Settle agent commission(net)</h1>
                        <div className='flex justify-start'>
                            <InputField
                                className='w-[100px] text-center'
                                divClassName='mx-2.5'
                                ViewClass={searchParams.get('update') !== null ? undefined : 'bg-[#FFFFFF]'}
                                value={searchParams.get('update') ? inputData.date1 : formatDaysWithSuffix(inputData.date1)}
                                // onFocus={handleFocus}
                                id='date1'
                                testId='firstDateField'
                                error={undefined}
                                // setEnteredLetter={setEnteredLetter}
                                maxLength="100"
                                onChange={handleOnChange}
                                inputType={'text'}
                                disableInput={searchParams.get('update') !== null ? undefined : true}
                            />
                            <p className='py-5 text-lg text-[#4F5962] font-medium'>of the month</p>
                            <InputField
                                className='w-[100px] text-center'
                                divClassName='mx-2.5'
                                value={searchParams.get('update') ? inputData.date2 : formatDaysWithSuffix(inputData.date2)}
                                ViewClass={searchParams.get('update') ? undefined : 'bg-[#FFFFFF]'}
                                // onFocus={handleFocus}
                                id='date2'
                                testId='secondDateField'
                                error={undefined}
                                // label={`${divObj?.label}`}
                                // setEnteredLetter={setEnteredLetter}
                                maxLength="100"
                                onChange={handleOnChange}
                                inputType={'text'}
                                disableInput={searchParams.get('update') ? undefined : true}
                            />
                            <p className='py-5 text-lg text-[#4F5962] font-medium'>of the month</p>
                        </div>
                        {error !== '' && <div className='ml-2'><ErrorMessage error={error} /></div>}
                        <p className='ml-2 font-normal text-[14px] text-[#A4A9AE]'>
                            Every {formatDaysWithSuffix(inputData.date1)} and {formatDaysWithSuffix(
                                inputData.date2)} of the month agent commission will be added to wallet balance</p>
                        <p className='ml-2 font-normal text-[14px] text-[#A4A9AE]'>
                            Date range is from 1st to 28th of every month
                        </p>
                        {searchParams.get('update') && <div className='flex w-[200px] mt-8 ml-2'>
                            <Button2
                                text={'Back'}
                                disabled={isLoadingButton}
                                className={'border-primary-normal text-primary-normal py-2 px-[35px] h-10'}
                                onClick={() => setSearchParams({})}
                                testId={'Back_Button'}
                            />
                            <Button
                                text={'Update'}
                                testId= 'updateSubmitButtion'
                                className = 'min-w-[227px] ml-4 px-[51px]'
                                onClick={handleSubmit}
                                isLoading={isLoadingButton}
                                disabled={isLoadingButton}
                            />
                        </div>}
                    </div>
                </div>
            </CardHeader>
        </div>
    );
}
