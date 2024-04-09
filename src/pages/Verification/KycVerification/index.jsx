import React, { useContext, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Paginator from '../../../components/Paginator/Paginator';
import GlobalContext from '../../../components/Context/GlobalContext';
import NoDataError from '../../../components/NoDataError/NoDataError';
import KycVerificationTable from './Components/KycVerificationTable';

const KycVerification = () => {
    const [notFound, setNotFound] = useState(false);
    // const { setToastError } = useContext(GlobalContext);
    // const { List, error, loading } = useSelector(state => state.kycVerifications); // to get the api respons
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
    // const GetList = useCallback(async () => {
    //     try {
    //         // to get the data from authslice
    //         dispatch(KycVerificationList(searchParams)).then((response) => {
    //             if (response.payload.error) {
    //                 if (error.status === 400) {
    //                     setNotFound(true);
    //                 } else {
    //                     setToastError('Something went wrong!');
    //                 }
    //             } else {
    //                 if (response.payload.data.length !== 0) {
    //                     setNotFound(false);
    //                 }
    //             }
    //         });
    //     } catch (error) {
    //         console.error('geterror', error);
    //     }
    // }, [searchParams]);

    /* The `useEffect` hook in the provided code snippet is responsible for triggering a side effect
    when the component mounts or when the dependencies change. */
    // useEffect(() => {
    //     if (searchParams.get('page') === null) {
    //         setSearchParams({ page: 1 });
    //         setSearchParams({ type: 'customers' });
    //     } else {
    //         // GetList();
    //     }
    // }, []);

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
        >
            <div className={`relative ${notFound ? '' : 'thead-border-bottom'}`}>
                <div className='bg-[#fff] border-b border-[#E5E9EB]'>
                    <Topbar
                        setSearchParams={setSearchParams}// pass this as its getting updated
                        searchParams={searchParams}// pass this because its used
                        // filterOptions={filterOptions}
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
                        paymaartId= {userPaymaartId}
                    />
                </div>
                {notFound &&
                <NoDataError
                    className='h-noDataError' heading='No data found' text = "404 could not find what you are looking for."/>}
                {List?.data?.length === 0 && !loading &&
                !(searchParams.get('status') === null || searchParams.get('search') === null ||
                searchParams.get('role') === null) &&
                (<NoDataError className='h-noDataError' heading='No data found' text='Click “Register Agent ” to add agent' />)}
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
