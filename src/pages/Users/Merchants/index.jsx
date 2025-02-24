/* eslint-disable max-len */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { useDispatch, useSelector } from 'react-redux';
import Slugify from '../../../CommonMethods/Sulgify';
import { useSearchParams } from 'react-router-dom';
import Topbar from '../../../components/Topbar/Topbar';
import GlobalContext from '../../../components/Context/GlobalContext';
import MerchantTable from './Components/MerchantTable';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Paginator from '../../../components/Paginator/Paginator';
import { MerchantList, ReportedMerchantList } from './merchantSlice';
import ReportedMerchantTable from './Components/ReportedMerchantTable';

const Merchant = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [notFound, setNotFound] = useState(false);
    const { setToastError } = useContext(GlobalContext);
    // eslint-disable-next-line no-unused-vars
    const [isStateLoading, setIsStateLoading] = useState(false);
    const dispatch = useDispatch();
    const { List, loading, error } = useSelector(state => state.merchantUsers);
    const currentTab = searchParams.get('type') || 'all merchants';

    // Initialize toggle buttons based on searchParams
    const [toggleButtons, setToggleButtons] = useState([
        { key: 'All Merchants', status: currentTab === 'all merchants' },
        { key: 'Reported Merchants', status: currentTab === 'reported merchants' }
    ]);

    // Handle tab toggle
    const handleToggle = (selectedKey) => {
        setToggleButtons(prevButtons =>
            prevButtons.map(btn => ({
                ...btn,
                status: btn.key.toLowerCase() === selectedKey.toLowerCase()
            }))
        );

        // Update URL params to persist tab selection
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set('type', selectedKey.toLowerCase());
        setSearchParams(updatedParams);
    };

    const { user } = useSelector((state) => state.auth);
    let { user_type: CurrentUserRole } = user;
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }

    const filterOptions = {
        status: ['active', 'inactive']
    };

    /* The `GetList` constant is a function created using the `useCallback` hook in React. This
    function is responsible for fetching the list of agents based on the search parameters provided.
    Here's a breakdown of what it does: */
    const GetList = useCallback(async () => {
        try {
            if (searchParams.get('type') === 'reported merchants') {
                dispatch(ReportedMerchantList(searchParams));
            } else {
                dispatch(MerchantList(searchParams));
            }
        } catch (error) {
            console.error(error);
        }
    }, [searchParams, dispatch]);

    useEffect(() => {
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
        if (List?.data?.length !== 0) {
            setNotFound(false);
            params.page = 1;
        }
    }, [List]);

    /* This `useEffect` hook is responsible for triggering a side effect whenever the dependencies
    specified in the dependency array change. In this case, the effect will run when the `GetList`
    function changes. */
    useEffect(() => {
        const updatedParams = new URLSearchParams(searchParams);

        if (!searchParams.get('type')) {
            updatedParams.set('type', 'all merchants');
        }

        if (!searchParams.get('page')) {
            updatedParams.set('page', '1');
        }

        // Update only if changes are needed
        if (updatedParams.toString() !== searchParams.toString()) {
            setSearchParams(updatedParams);
        } else {
            GetList();
        }
    }, [searchParams, setSearchParams, GetList]);

    useEffect(() => {
        if (List?.data?.length === 0 && !loading) {
            setIsStateLoading(false);
        } else {
            setIsStateLoading(true);
        }
    }, [loading]);

    return (
        <CardHeader
            activePath='Merchants'
            paths={['Users']}
            pathurls={['users/merchants']}
            header='List of Merchants'
            minHeightRequired={true}
            buttonText={`${CurrentUserRole === 'finance-admin' ? '' : 'Register Merchant'}`}
            navigationPath='/users/merchants/register-merchant'
            table={true}
            headerWithoutButton={false}
            showTabs={true}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onToggle={handleToggle}
            toggleButtons={toggleButtons}
            dataLoading={loading}

        >
            <div className={`relative ${notFound || List?.data?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {(!notFound && List?.data?.length === 0 &&
                    searchParams.get('status') === null &&
                    searchParams.get('search') === null)
                    ? (
                        <></>
                    )
                    : (!notFound &&
                        <div className='bg-[#fff] border-b border-neutral-outline'>
                            <Topbar
                                setSearchParams={setSearchParams}
                                searchParams={searchParams}
                                filterOptions={filterOptions}
                                placeHolder={`${searchParams.get('type') === 'all merchants' ? 'Paymaart ID, name, trading name or till number' : 'Paymaart ID, name, phone number or email'} `}
                                filterType='Filter merchant list'
                                isLoading={loading}
                                filterActive={(searchParams.get('status') !== null)}
                            />
                        </div>)
                }
                {searchParams.get('type') === 'all merchants' && (!notFound && !(List?.data?.length === 0 && !loading &&
                    !(searchParams.get('status') !== null || searchParams.get('search') !== null))) &&
                    <div className='overflow-auto scrollBar h-tableHeight'>
                        <MerchantTable
                            error={error}
                            loading={loading}
                            List={List}
                            setSearchParams={setSearchParams}
                            notFound={notFound}
                            searchParams={searchParams}
                            GetList={GetList}
                        />
                    </div>}
                {searchParams.get('type') === 'reported merchants' && (!notFound && !(List?.data?.length === 0 && !loading &&
                    !(searchParams.get('status') !== null || searchParams.get('search') !== null))) &&
                    <div className='overflow-auto scrollBar h-tableHeight'>
                        <ReportedMerchantTable
                            error={error}
                            loading={loading}
                            List={List}
                            setSearchParams={setSearchParams}
                            notFound={notFound}
                            searchParams={searchParams}
                            GetList={GetList}
                        />
                    </div>}
                {notFound &&
                    <NoDataError
                        className='h-noDataError' heading='No data found' text="404 could not find what you are looking for." />}
                {List?.data?.length === 0 && !loading &&
                    !(searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                    (<NoDataError className='h-noDataError'
                        heading='No data found' text='Click “Register Merchant ” to add merchant' />)}
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

export default Merchant;
