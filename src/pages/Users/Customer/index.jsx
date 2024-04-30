import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import Paginator from '../../../components/Paginator/Paginator';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Slugify from '../../../CommonMethods/Sulgify';
import GlobalContext from '../../../components/Context/GlobalContext';
import { CustomerList } from './customerSlice';
import CustomerTable from './components/customerTable';

const Customer = () => {
    const [searchParams, setSearchParams] = useSearchParams({ });
    const [notFound, setNotFound] = useState(false);
    const { setToastError } = useContext(GlobalContext);
    const dispatch = useDispatch();
    const { List, loading, error } = useSelector(state => state.customerUsers);

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
            dispatch(CustomerList(searchParams));
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
        if (List?.data?.length !== 0) {
            setNotFound(false);
            params.page = 1;
        }
    }, [List]);

    /* This `useEffect` hook is responsible for triggering a side effect whenever the dependencies
    specified in the dependency array change. In this case, the effect will run when the `GetList`
    function changes. */
    useEffect(() => {
        if (searchParams.get('page') === null) {
            setSearchParams({ page: 1 });
        } else {
            GetList();
        }
    }, [GetList]);

    return (
        <CardHeader
            activePath='Customers'
            paths={['Users']}
            pathurls={['users/customers']}
            header='List of Customers'
            minHeightRequired={true}
            buttonText={`${CurrentUserRole === 'finance-admin' ? '' : 'Register Customer'}`}
            navigationPath='/users/customers/register-customer'
            table={true}
            headerWithoutButton={false}
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
                            placeHolder="Paymaart ID, name or phone number "
                            filterType='Filter customer list'
                            isLoading={loading}
                            filterActive={(searchParams.get('status') !== null)}
                        />
                    </div>)
                }
                {!notFound && !(List?.data?.length === 0 && !loading &&
                !(searchParams.get('status') !== null || searchParams.get('search') !== null)) &&
                <div className='overflow-auto scrollBar h-tableHeight'>
                    <CustomerTable
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
                    className='h-noDataError' heading='No data found' text = "404 could not find what you are looking for."/>}
                {List?.data?.length === 0 && !loading &&
                !(searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                (<NoDataError className='h-noDataError'
                    heading='No data found'
                    text='Click “Register Customer ” to add customer' />)}
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

export default Customer;
