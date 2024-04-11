import React, { useContext, useState, useEffect, useCallback } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../../../components/Paginator/Paginator';
import GlobalContext from '../../../components/Context/GlobalContext';
import NoDataError from '../../../components/NoDataError/NoDataError';
import KycVerificationTable from './Components/KycVerificationTable';
import { KycVerificationList } from './KycVerificationSlice';

const KycVerification = () => {
    const [notFound, setNotFound] = useState(false);
    let url = '';
    const { setToastError } = useContext(GlobalContext);
    const { List, error, loading } = useSelector(state => state.kycVerifications); // to get the api respons
    // filter options
    const initialToggleButtons = [
        { key: 'Agents', status: true },
        { key: 'Customers', status: false },
        { key: 'Merchants', status: false }
    ];
    const [toggleButtons, setToggleButtons] = useState(initialToggleButtons);
    const filterOptions = {
        role: ['Super admin', 'Finance admin', 'Admin', 'Support admin'],
        status: ['active', 'inactive']
    };
    const handleToggle = (updatedButtons) => {
        setToggleButtons(updatedButtons);
        // Perform API call or any other action based on the updated button values
        console.log(updatedButtons);
    };
    const singleCheckOptions = {
        citizen: ['All', 'Malawi Citizen', 'Non Malawi Citizen']
    };
    const fullKycOptions = {
        fullkyc: ['Completed', 'In-progress', 'Further Information Required']
    };
    const simplifedKycOptions = {
        simplifiedkyc: ['Completed', 'In-progress', 'Further Information Required']
    };

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    /* The `GetList` constant is a function created using the `useCallback` hook in React. It is an
    asynchronous function that is responsible for fetching data using the `dispatch` function to
    call the `AdminList` action creator with the `searchParams` as a parameter. */
    const GetList = useCallback(async () => {
        console.log('got trigger');
        if (searchParams.get('type') === 'agents') {
            url = 'get-agent-kyc-list?';
            if (searchParams.get('page') !== null) {
                url += `page=${searchParams.get('page')}`;
            }
            if (searchParams.get('search') !== null) {
                url += `&search=${searchParams.get('search')}`;
            }
            if (searchParams.get('sortOrder') !== null) {
                url += `&sortOrder=${searchParams.get('sortOrder')}`;
            }
            if (searchParams.get('citizen') !== null) {
                const citizenValue = searchParams.get('citizen').replace('citizen', '').trim();
                url += `&citizenship=${citizenValue}`;
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
        } else if (searchParams.get('type') === 'customers') {
            url = 'get-agent-kyc';
        } else if (searchParams.get('type') === 'merchants') {
            url = 'get-agent-kyc';
        }
        console.log(url, 'urllll');
        console.log(searchParams.get('citizen'), 'citi');

        try {
            // to get the data from authslice
            console.log('heree2');
            dispatch(KycVerificationList(url)).then((response) => {
                console.log(response, 'response');
                if (response.payload.error) {
                    if (error.status === 400) {
                        setNotFound(true);
                    } else {
                        setToastError('Something went wrong!');
                    }
                } else {
                    if (response.payload.data.length !== 0) {
                        setNotFound(false);
                    }
                }
            });
        } catch (error) {
            setToastError('Something went wrong!');
        }
    }, [searchParams]);

    /* The `useEffect` hook in the provided code snippet is responsible for triggering a side effect
    when the component mounts or when the dependencies change. */
    useEffect(() => {
        if (searchParams.get('page') === null) {
            setSearchParams({ page: 1, type: 'agents', citizen: 'all' });
        } else {
            GetList();
        }
    }, [GetList]);

    return (
        <CardHeader
            activePath='KYC Verification'
            paths={['Verification']}
            pathurls={['verification/kyc-verification']}
            header='KYC Verification'
            minHeightRequired={true}
            headerWithoutButton={true}
            toggleButtons={toggleButtons}
            onToggle={handleToggle}
            table={true}
            searchParams={searchParams}// pass this because its used
            setSearchParams={setSearchParams}
        >
            <div className={`relative ${notFound ? '' : 'thead-border-bottom'}`}>
                {(List?.data?.length !== 0 ||
                (searchParams.get('citizen') !== null || searchParams.get('search') !== null ||
                searchParams.get('fullkyc') !== null ||
                searchParams.get('simplifiedkyc') !== null)) && !notFound &&
                <div className='bg-[#fff] border-b border-[#E5E9EB]'>
                    <Topbar
                        setSearchParams={setSearchParams}// pass this as its getting updated
                        searchParams={searchParams}// pass this because its used
                        filterOptions={filterOptions}
                        filter1={singleCheckOptions}
                        filter2={fullKycOptions}
                        filter3={simplifedKycOptions}
                        filterType= 'Filter KYC Status'
                        placeHolder= 'Paymaart ID or name '
                        isLoading={loading}
                        filterActive={true}
                        singleSelectFilter={true}
                    />
                </div>
                }

                {
                    !notFound && !(List?.data?.length === 0 && !loading && !(searchParams.get('citizen') !== null ||
                searchParams.get('search') !== null || searchParams.get('simplifiedkyc') !== null ||
                searchParams.get('fullkyc') !== null)) &&

                <div className='h-tableHeight scrollBar overflow-auto'>
                    <KycVerificationTable
                        // error={error}
                        // loading={loading}
                        // List={List}
                        // handleSortByName={handleSortByName}
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
                    text = "No profiles currently require verification. Please check back later."/>}
                {List?.data?.length === 0 && !loading &&
                !(searchParams.get('fullkyc') === null || searchParams.get('search') === null ||
                searchParams.get('simplifiedkyc') === null) &&
                (<NoDataError className='h-noDataError'
                    heading='No profiles for verification'
                    text='No profiles currently require verification. Please check back later.' />)}
                {!loading && !error && !notFound && List?.data?.length !== 0 && <Paginator
                    currentPage={searchParams.get('page')}
                    totalPages={Math.ceil(List?.totalRecords / 10)}
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    totalRecords={List?.totalRecords}
                />}
            </div>
        </CardHeader>
    );
};

export default KycVerification;
