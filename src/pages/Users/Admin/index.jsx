import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import AdminTable from './Components/AdminTable';
import { useSearchParams } from 'react-router-dom';
import { AdminList } from './AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import Slugify from '../../../CommonMethods/Sulgify';
import Paginator from '../../../components/Paginator/Paginator';
import GlobalContext from '../../../components/Context/GlobalContext';
import NoDataError from '../../../components/NoDataError/NoDataError';

const Admin = () => {
    // to gte the current user role
    const { user } = useSelector((state) => state.auth);
    const [notFound, setNotFound] = useState(false);
    const { setToastError } = useContext(GlobalContext);
    let { user_type: CurrentUserRole } = user;
    const { paymaart_id: userPaymaartId } = user;
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }
    const { List, error, loading } = useSelector(state => state.adminUsers); // to get the api respons
    // filter options
    const filterOptions = {
        role: ['Super admin', 'Finance admin', 'Admin', 'Support admin'],
        status: ['active', 'inactive']
    };
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    /* The `GetList` constant is a function created using the `useCallback` hook in React. It is an
    asynchronous function that is responsible for fetching data using the `dispatch` function to
    call the `AdminList` action creator with the `searchParams` as a parameter. */
    // const GetList = useCallback(async () => {
    //     try {
    //         // to get the data from authslice
    //         dispatch(AdminList(searchParams)).then((response) => {
    //             console.log(response, 'respinse');
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

    const GetList = useCallback(async () => {
        try {
            dispatch(AdminList(searchParams));
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

    /* The `useEffect` hook in the provided code snippet is responsible for triggering a side effect
    when the component mounts or when the dependencies change. */
    useEffect(() => {
        if (searchParams.get('page') === null) {
            setSearchParams({ page: 1 });
        } else {
            GetList();
        }
    }, [GetList]);

    return (
        <CardHeader
            activePath='Admins'
            paths={['Users']}
            pathurls={['users/admins']}
            header='List of Admins'
            minHeightRequired={true}
            buttonText={CurrentUserRole === 'Super admin' ? 'Register Admin' : null}
            navigationPath='/users/admins/register-admin'
            table={true}
            headerWithoutButton={false}
        >
            <div className={`relative ${notFound || List?.data?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {(!notFound && List?.data?.length === 0 &&
                        searchParams.get('status') === null &&
                    searchParams.get('search') === null && searchParams.get('role') === null)
                    ? (
                        <>
                        </>
                    )
                    : (!notFound &&
                    <div className='bg-[#fff] border-b border-neutral-outline'>
                        <Topbar
                            setSearchParams={setSearchParams}// pass this as its getting updated
                            searchParams={searchParams}// pass this because its used
                            filterOptions={filterOptions}
                            filterType= 'Filter admin list'
                            placeHolder= 'Paymaart ID, name, email or phone number'
                            isLoading={loading}
                            filterActive={(searchParams.get('status') !== null) || searchParams.get('role') !== null}
                        />
                    </div>)
                }

                { (List?.data?.length !== 0 && !notFound) &&
                <div className='h-tableHeight scrollBar overflow-auto'>
                    <AdminTable
                        // error={error}
                        // loading={loading}
                        // List={List}
                        // handleSortByName={handleSortByName}
                        CurrentUserRole={CurrentUserRole}
                        error={error}
                        loading={loading}
                        List={List}
                        setSearchParams={setSearchParams}
                        notFound={notFound}
                        searchParams={searchParams}
                        paymaartId= {userPaymaartId}
                    />
                </div>}

                {notFound &&
                <NoDataError
                    className='h-noDataError' heading='No data found' text = "404 could not find what you are looking for."/>}
                {
                    (!notFound && List?.data?.length === 0 &&

        searchParams.get('search') === null &&
       searchParams.get('role') === null &&
        searchParams.get('status') === null)
                        ? (

                            <NoDataError className='h-noDataError'
                                heading='There are no admins added yet'
                                text='Click “Register Admin ” to add admin' />
                        )
                        : (List?.data?.length === 0 &&
            (
                <NoDataError className='h-tableHeight'
                    heading='No data found'
                    text='Try adjusting your search or filter to find what you’re looking for' />)
                        )
                }

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

export default Admin;
