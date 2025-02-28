import React, { useContext, useState, useEffect, useCallback } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../../../components/Paginator/Paginator';
import GlobalContext from '../../../components/Context/GlobalContext';
import NoDataError from '../../../components/NoDataError/NoDataError';
import { PayOutRequestsList } from './PayOutRequestsSlice';
import PayOutTable from './Components/PayOutTable';

const PayOutRequests = () => {
    const [notFound, setNotFound] = useState(false);
    const [isStateLoading, setIsStateLoading] = useState(false);
    let url = '';
    const { setToastError } = useContext(GlobalContext);
    const { List, error, loading } = useSelector(state => state.PayOutRequests);
    // filter options
    const initialToggleButtons = [
        { key: 'Agents', status: true },
        { key: 'Merchants', status: false }
        // { key: 'Merchants', status: false }  // currently merchant isnot there so its commented
    ];
    const [toggleButtons, setToggleButtons] = useState(initialToggleButtons);

    const handleToggle = (updatedButtons) => {
        setToggleButtons(updatedButtons);
        // Perform API call or any other action based on the updated button values
    };
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    /* The `GetList` constant is a function created using the `useCallback` hook in React. It is an
    asynchronous function that is responsible for fetching data using the `dispatch` function to
    call the `AdminList` action creator with the `searchParams` as a parameter. */
    const GetList = useCallback(async () => {
        url = searchParams.get('type') === 'agents'
            ? 'payout-transactions/payout-list?user_type=agent&page_size=10&'
            : searchParams.get('type') === 'merchants'
                ? 'payout-transactions/payout-list?user_type=merchant&page_size=10&'
                : searchParams.get('type') === 'customers' ? 'admin-users/customer-kyc-list?' : 'admin-users/merchant-kyc-list?';
        if (searchParams.get('page') !== null) {
            url += `page=${searchParams.get('page')}`;
        }
        if (searchParams.get('search') !== null) {
            url += `&search=${encodeURIComponent(searchParams.get('search'))}`;
        }
        if (searchParams.get('order_by') !== null) {
            url += `&order_by=${searchParams.get('order_by')}`;
        }

        if (searchParams.get('simplifiedkyc') !== null) {
            // Get the value of 'simplifiedkyc' from the searchParams and split it by ','
            const simplifiedValues = searchParams.get('simplifiedkyc').split(',').map(value => {
                // Trim and convert the value to lowercase, removing the prefix 'simplifiedkyc_'
                const trimmedValue = value.trim().toLowerCase().replace(/^simplifiedkyc_/i, '');
                switch (trimmedValue) {
                // If the trimmedValue matches any of these cases, replace it with the corrected value
                case 'in-progress':
                    return 'in_progress';
                case 'completed':
                    return 'completed';
                case 'further information required':
                    return 'info_required';
                default:
                    // If no correction needed, use the original value
                    return trimmedValue;
                }
            });
                // Join the corrected values back into a string separated by ','
            const correctedValues = simplifiedValues.join(',');
            // Append the correctedValues directly to the URL
            url += `&simplifiedStatus=${correctedValues}`;
        }

        if (searchParams.get('fullkyc') !== null) {
            const fullKycValues = searchParams.get('fullkyc').split(',').map(value => {
                const trimmedValue = value.trim().toLowerCase();
                switch (trimmedValue) {
                case 'in-progress':
                    return 'in_progress';
                case 'completed':
                    return 'completed';
                case 'further information required':
                    return 'info_required';
                default:
                    return trimmedValue; // Use original value if no correction needed
                }
            });

            const correctedValues = fullKycValues.join(',');
            url += `&fullStatus=${correctedValues}`;
        }
        try {
            // to get the data from authslice
            dispatch(PayOutRequestsList(url));
        } catch (error) {
            setToastError('Something went wrong!');
        }
    }, [searchParams]);
    // const GetList = useCallback(async () => {
    //     try {
    //         dispatch(AdminList(searchParams));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [searchParams]);

    useEffect(() => {
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
        const updatedParams = new URLSearchParams(searchParams);

        if (!searchParams.get('type')) {
            updatedParams.set('type', 'agents');
        }

        if (!searchParams.get('page')) {
            updatedParams.set('page', '1');
        }

        // Update only if changes are needed
        if (updatedParams.toString() !== searchParams.toString()) {
            console.log('updatedParams', updatedParams);

            setSearchParams(updatedParams);
        } else {
            GetList();
        }
    }, [GetList, searchParams, setSearchParams]);

    useEffect(() => {
        if (List?.data?.length === 0 && !loading) {
            setIsStateLoading(false);
        } else {
            setIsStateLoading(true);
        }
    }, [loading]);

    return (
        <CardHeader
            activePath='Pay-out Requests'
            paths={['Transactions']}
            pathurls={['transactions/pay-out-requests']}
            header='List of Pay-out Requests'
            minHeightRequired={true}
            headerWithoutButton={true}
            toggleButtons={toggleButtons}
            onToggle={handleToggle}
            table={true}
            searchParams={searchParams}// pass this because its used
            setSearchParams={setSearchParams}
            isStateLoading={isStateLoading}
            setIsStateLoading={setIsStateLoading}
            dataLoading={loading}
        >
            <div className={`relative ${notFound || List?.records?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {
                    (!notFound && List?.records?.length === 0 &&
                        searchParams.get('page') === '1' && searchParams.get('citizen') === 'all' &&
                    searchParams.get('search') === null && searchParams.get('search') === null &&
                    searchParams.get('simplifiedkyc') === null && searchParams.get('fullkyc') === null)
                        ? (
                            <></>
                        )
                        : (!notFound && <div className='bg-[#fff] border-b border-[#E5E9EB]'>
                            <Topbar
                                setSearchParams={setSearchParams}// pass this as its getting updated
                                searchParams={searchParams}// pass this because its used
                                NoFilter
                                placeHolder= 'Paymaart ID or pay-out request ID'
                                isLoading={loading}
                                filterActive={(searchParams.get('citizen') !== null) ||
                                searchParams.get('simplifiedkyc') !== null ||
                            searchParams.get('fullkyc') !== null}
                                singleSelectFilter={true}
                            />
                        </div>)

                }
                {
                    (List?.records?.length !== 0 && !notFound) &&
                    <div className='h-tableHeight scrollBar overflow-auto'>
                        <PayOutTable
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
                                heading='No pay-out requests'
                                text='No pay-out request. Please check back later.' />
                        )
                        : (List?.records?.length === 0 &&
            (
                <NoDataError className='h-tableHeight'
                    heading='No data found'
                    text='Try adjusting your search or filter to find what you’re looking for' />)
                        )
                }

                {!loading && !error && !notFound && List?.records?.length !== 0 && <Paginator
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

export default PayOutRequests;
