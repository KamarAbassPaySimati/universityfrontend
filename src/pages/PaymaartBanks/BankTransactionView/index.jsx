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
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams({ bank_code: id, page_number: 1 });
    const { loading, Data } = useSelector((state) => state.BankTransactionViewData);
    const handleViewData = async () => {
        try {
            // Fetch data using the provided URL
            const endPoint = `${type === 'trust-bank' ? 'specific-bank' : 'capital-transactions'}?${searchParams.toString()}`;
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
    return (
        <div>
            <CardHeader
                activePath='Transaction Details'
                paths={['Paymaart Banks', type === 'trust-bank' ? 'Trust Banks' : 'Main Capital']}
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
                    Name={type === 'trust-bank' ? 'Trust Bank' : 'Main Capital Account '}
                    Balance={type === 'trust-bank' ? 'RM balance, Total: 0 CR' : 'EM balance, Total : 0 CR'}
                />
                <div className='h-noDataError overflow-auto scrollBar'>
                    <BankDetails
                        loading={loading}
                        bankDetails={
                            {
                                'Ref No.': Data?.ref_no,
                                Name: Data?.bank_name,
                                'Account Number': Data?.account_no,
                                Purpose: Data?.purpose,
                                'Last Update Date / Time': formatTimestamp(Data?.updated_at),
                                Balance: `${Data?.amount} MWK`
                            }
                        }/>
                    <TransactionList
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                </div>
            </CardHeader>
        </div>
    );
}
