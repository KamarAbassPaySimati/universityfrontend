/* eslint-disable max-len */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import ProfileName from '../../../components/ProfileName/ProfileName';
import Button from '../../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import GlobalContext from '../../../components/Context/GlobalContext';
import Topbar from '../../../components/Topbar/Topbar';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Paginator from '../../../components/Paginator/Paginator';
import { TransactionHistoryList } from './transactionHistorySlice';
import { dataService } from '../../../services/data.services';
import TransactionHistoryTable from './components/TransactionHistoryTable';

const TransactionHistory = () => {
    const [searchParams, setSearchParams] = useSearchParams({ });
    const [notFound, setNotFound] = useState(false);
    const [exportLoading, setExportloading] = useState(false);

    const initailState = {
        'transaction-type': { 'Pay-Out': false, 'Pay-In': false, G2P: false, Others: false }
    };
    const [appliedFilter, setAppliedFilter] = useState(initailState);

    const { user } = useSelector(state => state.auth);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const dispatch = useDispatch();
    const { List, loading, error } = useSelector(state => state.transactionHistory);

    const handleExport = async () => {
        try {
            setExportloading(true);
            const res = await dataService.GetAPI(`admin-users/export-user-transactions?${searchParams.toString()}`);
            if (!res.error) {
                window.open(
                    res.data.s3_url,
                    '_blank'
                );
                setToastSuccess('Transaction details exported successfully');
                setExportloading(false);
            } else {
                setToastError('An Error Occured!');
                setExportloading(false);
            }
        } catch (error) {
            setToastError('An Error Occured!');
            setExportloading(false);
        }
    };

    const filterOptions = {
        'Transaction Type': ['Pay-out', 'Pay-in', 'G2P', 'Others']
    };

    const GetList = useCallback(async () => {
        try {
            dispatch(TransactionHistoryList(searchParams));
        } catch (error) {
            console.error(error);
        }
    }, [searchParams]);

    useEffect(() => {
        console.log(error, 'error');
        if (error) {
            if (error.status === 400) {
                setNotFound(true);
            } else {
                setToastError('Something went wrong!');
            }
        }
    }, [error]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        if (List?.transactions?.length !== 0) {
            setNotFound(false);
            params.page_number = 1;
        }
    }, [List]);

    /* This `useEffect` hook is responsible for triggering a side effect whenever the dependencies
    specified in the dependency array change. In this case, the effect will run when the `GetList`
    function changes. */
    useEffect(() => {
        if (searchParams.get('page_number') === null) {
            setSearchParams({ page_number: 1 });
        } else {
            GetList();
        }
    }, [GetList]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        if (params.transaction_type) {
            setAppliedFilter(prevState => {
                return updateFilterValueBasedOnInput(params?.transaction_type, prevState, 'transaction-type');
            });
        }
    }, []);

    const originalKeyMapping = {
        pay_out: 'Pay-out',
        pay_in: 'Pay-in',
        g2p: 'G2P',
        others: 'Others'
    };

    function revertKey (transformedKey) {
        return originalKeyMapping[transformedKey] || transformedKey;
    }

    function updateFilterValueBasedOnInput (input, currentState, type) {
        // Split the input string by commas and convert it to an array
        const arr = input.split(',');

        // Create a copy of the current state
        const newState = { ...currentState };

        // Loop through the statuses array
        arr.forEach(value => {
            // Revert the transformation
            const originalValue = revertKey(value);
            // Update the corresponding status property in the newState object
            newState[type][originalValue] = true;
        });

        return newState;
    }

    return (
        <CardHeader
            activePath={'Transaction History'}
            paths={['Financials']}
            pathurls={['financials/transaction-history']}
            header=''
            g2pHeight='true'
            minHeightRequired={true}
            ChildrenElement
            table={true}
        >
            <div className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 mt-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]`}>
                <div className='flex justify-between items-center' data-testid="transaction-history">
                    <ProfileName
                        userButtonName={`${user?.first_name?.[0] || ''}${user?.middle_name?.[0] || ''}${user?.last_name?.[0] || ''}`}
                        UserName={`${user?.first_name || '-'} ${user?.middle_name || '-'} ${user?.last_name.toUpperCase() || '-'}`}
                        payMaartID={user.paymaart_id}
                    />
                    <div>
                        <div className="flex items-start">
                            <Button testId='export-transaction-button' isLoading={exportLoading} onClick={handleExport} type='button' text='Export' className='!w-[117px]' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`max-h-[calc(100vh-240px)] min-h-[calc(100vh-260px)] relative z-[9] scrollBar overflow-auto mx-10 my-8 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]`}
            >
                <div className={`relative ${notFound || List?.transactions?.length === 0 ? '' : 'thead-border-bottom'}`}>
                    {(!notFound && List?.transactions?.length === 0 &&
                        searchParams.get('transaction_type') === null &&
                    searchParams.get('search') === null && searchParams.get('start_date') === null && searchParams.get('end_date') === null)
                        ? (
                            <></>
                        )
                        : (!notFound &&
                        <div className='bg-[#fff] border-b border-neutral-outline'>
                            <Topbar
                                setSearchParams={setSearchParams}
                                searchParams={searchParams}
                                filterOptions={filterOptions}
                                placeHolder="Beneficiary Paymaart ID or transaction ID"
                                filterType='Filter Transaction History'
                                isLoading={loading}
                                filterActive={(searchParams.get('transaction_type') !== null) && searchParams.get('start_date') !== null && searchParams.get('end_date') !== null}
                                multiFilter={true}
                                setAppliedFilter={setAppliedFilter}
                                appliedFilter={appliedFilter}
                                pageNumber={true}
                                initialState={initailState}
                            />
                        </div>)
                    }
                    {!notFound && !(List?.transactions?.length === 0 && !loading &&
                !(searchParams.get('transaction_type') !== null || searchParams.get('search') !== null || searchParams.get('start_date') !== null || searchParams.get('end_date') !== null)) &&
                <div className='overflow-auto scrollBar h-tableHeight'>
                    <TransactionHistoryTable
                        error={error}
                        loading={loading}
                        List={List}
                        setSearchParams={setSearchParams}
                        notFound={notFound}
                        searchParams={searchParams}
                    />
                </div>}
                    {notFound &&
                    <NoDataError
                        className='h-noDataError1' heading='No data found' text = "404 could not find what you are looking for."/>}
                    {List?.transactions?.length === 0 && !loading &&
                !(searchParams.get('transaction_type') !== null || searchParams.get('search') !== null || searchParams.get('start_date') !== null || searchParams.get('end_date') !== null) &&
                (<NoDataError className='h-noDataError1' heading='No transaction history to view yet' text='Please check back later' />)}
                    {!loading && !error && !notFound && List?.transactions?.length !== 0 && <Paginator
                        currentPage={searchParams.get('page_number')}
                        totalPages={Math.ceil(List?.total_count / 10)}
                        setSearchParams={setSearchParams}
                        searchParams={searchParams}
                        totalRecords={List?.total_count}
                        type='page_number'
                    />}
                </div>
            </div>
        </CardHeader>
    );
};

export default TransactionHistory;
