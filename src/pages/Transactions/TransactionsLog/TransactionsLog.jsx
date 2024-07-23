import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { useSearchParams } from 'react-router-dom';
import GlobalContext from '../../../components/Context/GlobalContext';
import { useDispatch, useSelector } from 'react-redux';
import Topbar from '../../../components/Topbar/Topbar';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Paginator from '../../../components/Paginator/Paginator';
import { TransactionLogList } from './TransactionLogSlice';
import TransactionLogTable from './components/TransactionLogTable';

const TransactionsLog = () => {
    const [notFound, setNotFound] = useState(false);
    const { setToastError } = useContext(GlobalContext);
    const { List, error, loading } = useSelector(state => state.kycVerifications);
    const initialToggleButtons = [
        { key: 'Pay-in', status: true },
        { key: 'Pay-out', status: false }
    ];
    const [toggleButtons, setToggleButtons] = useState(initialToggleButtons);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const handleToggle = (updatedButtons) => {
        setToggleButtons(updatedButtons);
        // Perform API call or any other action based on the updated button values
    };

    let url = '';
    const GetList = useCallback(async () => {
        url = searchParams.get('type') === 'pay-in'
            ? 'transactions-log/payin'
            : searchParams.get('type') === 'pay-out' ? 'transactions-log/payout' : 'transactions-log/payin';
        if (searchParams.get('page') !== null) {
            url += `page=${searchParams.get('page')}`;
        }
        if (searchParams.get('search') !== null) {
            url += `&search=${searchParams.get('search')}`;
        }
        if (searchParams.get('order_by') !== null) {
            url += `&order_by=${searchParams.get('order_by')}`;
        }

        try {
            // to get the data from authslice
            dispatch(TransactionLogList(url));
        } catch (error) {
            setToastError('Something went wrong!');
        }
    }, [searchParams]);

    useEffect(() => {
        console.log(error, 'error');
        if (error) {
            if (error.status === 400 || error.status === 404) {
                setNotFound(true);
            } else {
                setToastError('Something went wrong!');
            }
        }
    }, [error]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        if (List?.records?.length !== 0) {
            setNotFound(false);
            params.page = 1;
        }
    }, [List]);

    /* The `useEffect` hook in the provided code snippet is responsible for triggering a side effect
    when the component mounts or when the dependencies change. */
    useEffect(() => {
        if (searchParams.get('page') === null && searchParams.get('type') === null) {
            setSearchParams({ page: 1, type: 'pay-in' });
        } else if (searchParams.get('page') === null) {
            const params = Object.fromEntries(searchParams);
            params.page = 1;
            setSearchParams({ ...params });
        } else if (searchParams.get('type') === null) {
            const params = Object.fromEntries(searchParams);
            params.type = 'pay-in';
            setSearchParams({ ...params });
        } else {
            GetList();
        }
    }, [GetList]);

    return (
        <CardHeader
            activePath='Transactions Log'
            paths={['Transactions']}
            pathurls={['transactions/pay-out-requests']}
            header='Transactions Log'
            minHeightRequired={true}
            headerWithoutButton={true}
            toggleButtons={toggleButtons}
            onToggle={handleToggle}
            table={true}
            searchParams={searchParams}// pass this because its used
            setSearchParams={setSearchParams}
        >
            <div className={`relative ${notFound || List?.records?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {
                    (!notFound && List?.records?.length === 0 &&
                    searchParams.get('page') === '1' &&
                    searchParams.get('search') === null &&
                    searchParams.get('search') === null)
                        ? (
                            <></>
                        )
                        : (!notFound && <div className='bg-[#fff] border-b border-[#E5E9EB]'>
                            <Topbar
                                setSearchParams={setSearchParams}// pass this as its getting updated
                                searchParams={searchParams}// pass this because its used
                                NoFilter
                                placeHolder= 'Transaction ID'
                                isLoading={loading}
                            />
                        </div>)
                }
                {
                    (List?.records?.length !== 0 && !notFound) &&
                    <div className='h-tableHeight scrollBar overflow-auto'>
                        <TransactionLogTable
                            error={error}
                            loading={loading}
                            List={List}
                            setSearchParams={setSearchParams}
                            notFound={notFound}
                            searchParams={searchParams}
                        />
                    </div> }
                {notFound &&
                <NoDataError
                    className='h-noDataError' heading='No Data Found'
                    text = "404 could not find what you are looking for."/>}

                {
                    (!notFound && List?.records?.length === 0 &&
                        searchParams.get('page') === '1' &&
                        searchParams.get('search') === null)
                        ? (

                            <NoDataError className='h-noDataError'
                                heading='No profiles for verification'
                                text='No profiles currently require verification. Please check back later.' />
                        )
                        : (List?.records?.length === 0 &&
                            (<NoDataError
                                className='h-tableHeight'
                                heading='No data found'
                                text='Try adjusting your search or filter to find what you’re looking for' />))}
                {!loading && !error && !notFound && List?.recodes?.length !== 0 && <Paginator
                    currentPage={searchParams.get('page')}
                    totalPages={Math.ceil(List?.total_count / 10)}
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    totalRecords={List?.total_count}
                />}
            </div>
        </CardHeader>
    );
};

export default TransactionsLog;
