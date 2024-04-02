import React, { useCallback, useContext, useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import Table from './Onboard Agent/components/Table';
import Paginator from '../../../components/Paginator/Paginator';
import { useSearchParams } from 'react-router-dom';
import objectToQueryString from '../../../CommonMethods/objectToQueryString';
import { useDispatch, useSelector } from 'react-redux';
import { AgentList } from './agentSlice';
import GlobalContext from '../../../components/Context/GlobalContext';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Slugify from '../../../CommonMethods/Sulgify';

const Agent = () => {
    const [searchParams, setSearchParams] = useSearchParams({ });
    const [notFound, setNotFound] = useState(false);

    const dispatch = useDispatch();
    const { List, loading, error } = useSelector(state => state.agentUsers);

    const { user } = useSelector((state) => state.auth);
    let { user_type: CurrentUserRole } = user;
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }

    const filterOptions = {
        status: ['active', 'inactive']
    };

    const GetList = useCallback(async () => {
        let params = Object.fromEntries(searchParams);
        if (Object.keys(params).length === 0) {
            return;
        }
        delete params.tab;
        try {
            params = objectToQueryString(params);
            dispatch(AgentList(params));
        } catch (error) {
            console.error(error);
        }
    }, [searchParams]);

    const handleSortByName = () => {
        const params = Object.fromEntries(searchParams);
        params.sortBy = 'name';
        params.page = 1;
        if (params.sortOrder === 'asc') {
            params.sortOrder = 'desc';
        } else {
            params.sortOrder = 'asc';
        }
        setSearchParams({ ...params });
    };

    useEffect(() => {
        GetList();
    }, [GetList]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        if (List?.data?.length !== 0) {
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

    return (
        <CardHeader
            activePath='Agents'
            paths={['Users']}
            pathurls={['users/agents']}
            header='Agent list'
            minHeightRequired={true}
            buttonText={`${CurrentUserRole === 'finance-admin' ? '' : 'Register Agent'}`}
            navigationPath='/users/agents/register-agent'
            table={true}
        >
            <div className={`relative ${notFound || List?.data?.length === 0 ? '' : 'thead-border-bottom'}`}>
                {(List?.data?.length !== 0 ||
                (searchParams.get('status') !== null || searchParams.get('search') !== null)) && !notFound &&
                <div className='bg-[#fff] border-b border-neutral-outline'>
                    <Topbar
                        setSearchParams={setSearchParams}
                        searchParams={searchParams}
                        filterOptions={filterOptions}
                        placeHolder="Paymaart ID, name or phone number "
                        filterType='Filter agent list'
                        isLoading={loading}
                        filterActive={(searchParams.get('status') !== null)}
                    />
                </div>
                }
                {!notFound && !(List?.data?.length === 0 && !loading &&
                !(searchParams.get('status') !== null || searchParams.get('search') !== null)) &&
                <div className='overflow-auto scrollBar h-tableHeight'>
                    <Table
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
                {List?.data?.length === 0 && !loading &&
                !(searchParams.get('status') !== null || searchParams.get('search') !== null) &&
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

export default Agent;
