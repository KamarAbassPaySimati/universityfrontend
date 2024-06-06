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
    console.log('loading, Data', loading, Data);
    const handleViewData = async () => {
        try {
            // Fetch data using the provided URL
            await dispatch(BankTransactionViewData(searchParams.toString()));

            // Handle setting params and checking List length
        } catch (error) {
            console.error(error);
            // Handle error
            // setToastError('Something went wrong!');
        }
    };
    useEffect(() => {
        handleViewData();
    }, []);
    return (
        <div>
            <CardHeader
                activePath='Transaction Details'
                paths={['Paymaart Banks', 'Trust Banks']}
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
                <BankViewTopHeader Name={'Trust Bank'}/>
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
