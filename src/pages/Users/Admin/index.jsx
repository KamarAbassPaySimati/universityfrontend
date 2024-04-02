import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import AdminTable from './Components/AdminTable';
import { useSearchParams } from 'react-router-dom';
import objectToQueryString from '../../../CommonMethods/objectToQueryString';
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
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }
    // to get the data from authslice
    const { List, error, loading } = useSelector(state => state.adminUsers); // to get the api respons
    // filter options
    const filterOptions = {
        role: ['Super admin', 'Finance admin', 'Admin', 'Support admin'],
        status: ['active', 'inactive']
    };
    // initially with page 1 as search params
    const [searchParams, setSearchParams] = useSearchParams();
    if (Object.keys(Object.fromEntries(searchParams)).length === 0) {
        setSearchParams({ page: 1 });
    }
    const dispatch = useDispatch();
    // const GetList = useCallback(async () => {
    //     let params = Object.fromEntries(searchParams);
    //     delete params.tab;
    //     try {
    //         params = objectToQueryString(params);// convert the param object into string
    //         dispatch(AdminList(params));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [searchParams]);

    const GetList = useCallback(async () => {
        let params = Object.fromEntries(searchParams);
        if (Object.keys(params).length === 0) {
            return;
        }
        delete params.tab;
        try {
            params = objectToQueryString(params);
            dispatch(AdminList(params));
        } catch (error) {
            console.error(error);
            console.log('first hello');
        }
    }, [searchParams]);

    // as soon as the search params changes getlist gets called
    // useEffect(() => {
    //     GetList();
    // }, [searchParams]);

    useEffect(() => {
        GetList();
    }, [GetList]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        if (List?.data?.length !== 0) {
            console.log('i am here');
            setNotFound(false);
            params.page = 1;
        }
    }, [List]);

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
        if (Object.keys(Object.fromEntries(searchParams)).length === 0) {
            setSearchParams({ page: 1 });
        }
    }, []);

    // In the table as soon as the button tapped of the sort this function will be triggered
    const handleSortByName = () => {
        const params = Object.fromEntries(searchParams);
        params.sortBy = 'name';
        if (params.sortOrder === 'asc') {
            params.sortOrder = 'desc';
        } else {
            params.sortOrder = 'asc';
        }
        console.log('test');
        setSearchParams({ ...params });
    };

    return (
        <CardHeader
            activePath='Admins'
            paths={['Users']}
            pathurls={['users/admins']}
            header='Admin list'
            minHeightRequired={true}
            buttonText={CurrentUserRole === 'super-admin' ? 'Register Admin' : null}
            navigationPath='/users/admins/register-admin'
            table={true}
        >
            <div className={`relative ${notFound || List?.data?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {(List?.data?.length !== 0 ||
                (searchParams.get('status') !== null || searchParams.get('search') !== null ||
                searchParams.get('role') !== null)) && !notFound &&
                <div className='bg-[#fff] border-b border-[#E5E9EB]'>
                    <Topbar
                        setSearchParams={setSearchParams}// pass this as its getting updated
                        searchParams={searchParams}// pass this because its used
                        filterOptions={filterOptions}
                        filterType= 'Filter admin list'
                        placeHolder= 'Paymaart ID, name, email or phone number'
                        isLoading={loading}
                        filterColor={searchParams.get('role') === null && searchParams.get('status') === null}
                    />
                </div>
                }
                {!notFound && !(List?.data?.length === 0 && !loading && (searchParams.get('status') !== null ||
                searchParams.get('search') !== null || searchParams.get('role') !== null)) &&
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
                        handleSortByName={handleSortByName}
                        notFound={notFound}
                        searchParams={searchParams}
                    />
                </div>}
                {notFound &&
                <NoDataError
                    className='h-noDataError' heading='No data found' text = "404 could not find what you are looking for."/>}
                {List?.data?.length === 0 && !loading && (searchParams.get('status') !== null ||
                searchParams.get('search') !== null || searchParams.get('role') !== null) &&
                (<NoDataError className='h-noDataError' heading='No data found' text='Click “Register Admin ” to add admin' />)}
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
