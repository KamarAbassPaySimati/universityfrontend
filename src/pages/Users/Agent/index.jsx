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
const Agent = () => {
    const [searchParams, setSearchParams] = useSearchParams({ });
    const [notFound, setNotFound] = useState(false);

    const dispatch = useDispatch();
    const { List, loading, error } = useSelector(state => state.agentUsers);
    const { setToastError } = useContext(GlobalContext);

    const filterOptions = {
        Status: ['Active', 'Inactive']
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
        if (params.sortOrder === 'asc') {
            params.sortOrder = 'desc';
        } else {
            params.sortOrder = 'asc';
        }
        setSearchParams({ ...params });
    };

    useEffect(() => {
        console.log('first how may times');
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

    /// Dont remove the below code it is being used
    const param = Object.fromEntries(searchParams);

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
            buttonText='Register Agent'
            navigationPath='/users/agents/register-agent'
            table={true}
        >
            <div>
                {(List?.data?.length !== 0 ||
                (param.search || param.status)) && !notFound &&
                <div className='sticky z-10 top-0 left-0 bg-[#fff] h-12'>
                    <Topbar
                        setSearchParams={setSearchParams}
                        searchParams={searchParams}
                        filterOptions={filterOptions}
                    />
                </div>
                }
                {!notFound && <div className='overflow-auto scrollBar h-tableHeight'>
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
                {!loading && !error && !notFound && <Paginator
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
