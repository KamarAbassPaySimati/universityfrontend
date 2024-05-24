import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import NotFound from '../../NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Topbar from '../../../components/Topbar/Topbar';
import DeleteAccountTable from '../DeleteAccount/components/DeleteAccountTable';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Paginator from '../../../components/Paginator/Paginator';
import GlobalContext from '../../../components/Context/GlobalContext';
import { DeleteAccountList } from './DeleteAccountSlice';

function DeleteAccount () {
    const { List, error, loading } = useSelector(state => state.DeleteteAccount);
    const [notFound, setNotFound] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('page') || 1;
    const { setToastError } = useContext(GlobalContext);
    let url = '';
    const dispatch = useDispatch();

    const filterOptions = {
        filter: ['pending', 'approved', 'rejected']
    };

    const initialToggleButtons = [
        { key: 'Agents', status: true },
        { key: 'Customers', status: false },
        { key: 'Merchants', status: false }
    ];
    const [toggleButtons, setToggleButtons] = useState(initialToggleButtons);

    const handleToggle = (updatedButtons) => {
        setToggleButtons(updatedButtons);
        // Perform API call or any other action based on the updated button values
    };

    const GetList = useCallback(async () => {
        url = searchParams.get('type') === 'agents'
            ? 'admin-users/delete-requests?'
            : searchParams.get('type') === 'customers' ? 'admin-users/customer-kyc-list?' : 'admin-users/merchant-kyc-list?';

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
            dispatch(DeleteAccountList(`${url}&${searchParams.toString()}`));
        } catch (error) {
            setToastError('Something went wrong!');
        }
    }, [searchParams]);

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
        if (List?.data?.length !== 0) {
            setNotFound(false);
            params.page_number = 1;
        }
    }, [List]);

    /* The `useEffect` hook in the provided code snippet is responsible for triggering a side effect
    when the component mounts or when the dependencies change. */
    useEffect(() => {
        if (searchParams.get('page_number') === null) {
            setSearchParams({ page_number: 1, type: 'agents' });
        } else {
            GetList();
        }
    }, [GetList]);
    return (
        <CardHeader
            activePath='Delete Account Requests'
            paths={['Verify']}
            pathurls={['verify/Delete Account']}
            header='Delete Account Requests'
            minHeightRequired={true}
            headerWithoutButton={true}
            toggleButtons={toggleButtons}
            onToggle={handleToggle}
            table={true}
            searchParams={searchParams}// pass this because its used
            setSearchParams={setSearchParams}
        >
            <div className={`relative ${NotFound || List?.data?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {
                    (!notFound && List?.data?.length === 0 &&
                        searchParams.get('page_number') === '1' && searchParams.get('citizen') === 'all' &&
                        searchParams.get('search') === null && searchParams.get('search') === null &&
                        searchParams.get('simplifiedkyc') === null && searchParams.get('fullkyc') === null)
                        ? (
                            <></>
                        )
                        : (!notFound && <div className='bg-[#fff] border-b border-[#E5E9EB]'>
                            <Topbar
                                setSearchParams={setSearchParams}// pass this as its getting updated
                                searchParams={searchParams}// pass this because its used
                                filterOptions={filterOptions}
                                filterType='Filter'
                                placeHolder='Paymaart ID or name '
                                isLoading={loading}
                                filterActive={(searchParams.get('status') !== null)}
                            />
                        </div>)
                }
                {
                    (List?.data?.length !== 0 && !notFound) &&

                    <div className='h-tableHeight scrollBar overflow-auto'>
                        <DeleteAccountTable
                            error={error}
                            loading={loading}
                            List={List}
                            setSearchParams={setSearchParams}
                            notFound={notFound}
                            searchParams={searchParams}
                        />
                    </div>
                }
                {notFound &&
                    <NoDataError
                        className='h-noDataError' heading='No Data Found'
                        text="404 could not find what you are looking for." />
                }
                {
                    (!notFound && List?.data?.length === 0 &&
                        searchParams.get('page_number') === '1' && searchParams.get('citizen') === 'all' &&
                        searchParams.get('search') === null &&
                        searchParams.get('simplifiedkyc') === null &&
                        searchParams.get('fullkyc') === null)
                        ? (

                            <NoDataError className='h-noDataError'
                                heading='No profiles for verification'
                                text='No profiles currently require verification. Please check back later.' />
                        )
                        : (List?.data?.length === 0 &&
                            (
                                <NoDataError className='h-tableHeight'
                                    heading='No data found'
                                    text='Try adjusting your search or filter to find what you’re looking for' />)
                        )
                }
                {!loading && !notFound && List?.data?.length !== 0 && <Paginator
                    currentPage={currentPage}
                    totalPages={Math.ceil(List?.total_records / 10)}
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    totalRecords={List?.total_records}
                />
                }

            </div>
        </CardHeader>
    );
}

export default DeleteAccount;
