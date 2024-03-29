import React, { useCallback, useEffect } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import AdminTable from './Onboard admin/components/AdminTable';
import { useSearchParams } from 'react-router-dom';
import objectToQueryString from '../../../CommonMethods/objectToQueryString';
import { AdminList } from './AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import Slugify from '../../../CommonMethods/Sulgify';
import Paginator from '../../../components/Paginator/Paginator';

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
    const [searchParams, setSearchParams] = useSearchParams();
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
        console.log(searchParams, 'searchParams');
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
            <div className='relative thead-border-bottom'>
                <div className='bg-[#fff] h-12  border-b border-[#E5E9EB]'>
                    <Topbar
                        setSearchParams={setSearchParams}// pass this as its getting updated
                        searchParams={searchParams}// pass this because its used
                        filterOptions={filterOptions}
                        filterType= 'Filter admin list'
                        placeHolder= 'Paymaart ID, name, email or phone number '
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

                {!loading && Math.ceil(List?.totalRecords / 10) > 1 &&
                    <Paginator
                        currentPage={searchParams.get('page')}
                        totalPages={Math.ceil(List.totalRecords / 10)}
                        setSearchParams={setSearchParams}
                        searchParams={searchParams}
                    />}
            </div>
        </CardHeader>
    );
};

export default Admin;
