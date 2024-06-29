/* eslint-disable max-len */
import React, { useEffect } from 'react';
import BankViewTopHeader from './BankViewTopHeader';
import CardHeader from '../../../components/CardHeader';
import BankDetails from './BankDetails';
import TransactionList from './TransactionList';
import { useDispatch, useSelector } from 'react-redux';
import { BankTransactionViewData } from './BankTransactionViewSlice';
import { useParams, useSearchParams } from 'react-router-dom';
import formatTimestamp from '../../../CommonMethods/formatTimestamp';

export default function BankTransactionView ({ type }) {
    const { id } = useParams();
    let accountTypeName;
    let path;
    let endpointType;
    let initialParams = { bank_code: id, page_number: 1 };

    switch (type) {
    case 'trust-bank':
        accountTypeName = 'Trust Bank';
        path = 'Trust Banks';
        endpointType = 'specific-bank';
        break;
    case 'suspense-account':
        accountTypeName = 'Suspense Account';
        path = 'Suspense Account';
        endpointType = 'suspense-transactions';
        break;
    case 'main-capital':
        accountTypeName = 'Main Capital Account';
        path = 'Main Capital';
        endpointType = 'capital-transactions';
        break;
    case 'transaction-fees-and-commissions':
        accountTypeName = 'Transaction fees & Commissions Account';
        path = 'Transaction fees & Commissions';
        endpointType = 'transaction-commission-transactions';
        initialParams = { page_number: 1 };
        break;
    case 'taxes':
        accountTypeName = 'Tax Account';
        path = 'Taxes';
        endpointType = 'tax-account-transactions';
        initialParams = { page_number: 1 };
        break;
    default:
        accountTypeName = 'Main Capital Account';
        path = 'Main Capital';
        endpointType = 'capital-transactions';
        break;
    }

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams(initialParams);
    const { loading, Data } = useSelector((state) => state.BankTransactionViewData);
    const handleViewData = async () => {
        try {
            // Fetch data using the provided URL
            const endPoint = `${endpointType}?${searchParams.toString()}`;
            await dispatch(BankTransactionViewData(endPoint));

            // Handle setting params and checking List length
        } catch (error) {
            console.error(error);
            // Handle error
            // setToastError('Something went wrong!');
        }
    };
    useEffect(() => {
        handleViewData();
    }, [searchParams]);

    const formattedAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MWK',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div>
            <CardHeader
                activePath='Transaction Details'
                paths={['Paymaart Banks', path]}
                pathurls={[`paymaart-banks?type=${type}`]}
                minHeightRequired={true}
                // buttonText={isEditing ? '' : 'Update'}
                // onClickButtonFunction={handleUpdateClick}
                UpdateIcon={true}
                navigationPath=''
                table={true}
                // headerWithoutButton={isEditing}
                ChildrenElement
            >
                <BankViewTopHeader
                    Name={accountTypeName}
                    Balance={
                        (((type === 'trust-bank') && id !== 'PTBAT') || type === 'suspense-account' ||
                            type === 'transaction-fees-and-commissions' || type === 'taxes')
                            ? undefined
                            : <div className='flex items-center mt-2'>
                                <p className='text-[#4F5962] text-sm font-semibold'>
                                    {`${type === 'trust-bank' ? 'RM' : 'EM'} balance, Total: `}
                                </p>
                                <span className='text-black text-lg font-bold ml-2'>
                                    {Data?.amount || '0'} CR
                                </span>

                            </div>
                    }
                />
                <div className='h-noDataError overflow-auto scrollBar'>
                    <BankDetails
                        loading={loading}
                        bankDetails={
                            {
                                'Ref No.': Data?.ref_no,
                                Name: (type === 'suspense-account' || type === 'transaction-fees-and-commissions' || type === 'taxes')
                                    ? Data?.name
                                    : Data?.bank_name,
                                'Account Number': (type === 'suspense-account' || type === 'transaction-fees-and-commissions')
                                    ? undefined
                                    : Data?.account_no,
                                Purpose: Data?.purpose,
                                'Last Update Date / Time': formatTimestamp(Data?.updated_at),
                                Balance: `${formattedAmount(Data?.amount)} MWK`
                            }
                        } />
                    <TransactionList
                        type={type}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                </div>
            </CardHeader>
        </div>
    );
}
