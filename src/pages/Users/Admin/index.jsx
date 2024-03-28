import React, { useCallback, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import AdminTable from './Onboard admin/components/AdminTable';
import { useSearchParams } from 'react-router-dom';
import objectToQueryString from '../../../CommonMethods/objectToQueryString';
import { AdminList } from './AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import Slugify from '../../../CommonMethods/Sulgify';

const Admin = () => {
    // to gte the current user role
    const { user } = useSelector((state) => state.auth);
    let { user_type: CurrentUserRole } = user;
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }
    // to get the data from authslice
    const { List, error, loading } = useSelector(state => state.adminUsers); // to get the api respons
    // filter options
    const filterOptions = {
        Role: ['Super admin', 'Finance admin', 'Admin', 'Support admin'],
        Status: ['Active', 'Inactive']
    };
    // initially with page 1 as search params
    const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
    if (Object.keys(Object.fromEntries(searchParams)).length === 0) {
        setSearchParams({ page: 1 });
    }
    const dispatch = useDispatch();
    const GetList = useCallback(async () => {
        let params = Object.fromEntries(searchParams);
        delete params.tab;
        try {
            params = objectToQueryString(params);// convert the param object into string
            dispatch(AdminList(params));
        } catch (error) {
            console.error(error);
        }
    }, [searchParams]);

    // as soon as the search params changes getlist gets called
    useEffect(() => {
        GetList();
    }, [searchParams]);
    // In the table as soon as the button tapped of the sort this function will be triggered
    const handleSortByName = () => {
        const params = Object.fromEntries(searchParams);
        params.sortBy = 'name';
        if (params.sortOrder === 'asc') {
            params.sortOrder = 'desc';
        } else {
            params.sortOrder = 'asc';
        }
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
            <div>
                <div className='sticky top-0 left-0 bg-[#fff] h-12 '>
                    <Topbar
                        setSearchParams={setSearchParams}// pass this as its getting updated
                        searchParams={searchParams}// pass this because its used
                        filterOptions={filterOptions}
                        filterType= 'Filter admin list'
                    />
                </div>
                <div className='h-tableHeight scrollBar overflow-auto'>
                    <AdminTable
                        error={error}
                        loading={loading}
                        List={List}
                        handleSortByName={handleSortByName}
                    />
                </div>

                {/* <Paginator Pagination={{
                    total_pages: 3,
                    limit: 10,
                    total_records: 21,
                    next_page: 2,
                    current_page: 1
                }} setSearchParams={setSearchParams} searchParams={searchParams}
                /> */}
            </div>
        </CardHeader>
    );
};

export default Admin;
