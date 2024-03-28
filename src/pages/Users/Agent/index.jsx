import React, { useCallback, useEffect } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import Table from './Onboard Agent/components/Table';
import Paginator from '../../../components/Paginator/Paginator';
import { useSearchParams } from 'react-router-dom';
import objectToQueryString from '../../../CommonMethods/objectToQueryString';
import { useDispatch, useSelector } from 'react-redux';
import { AgentList } from './agentSlice';

const Agent = () => {
    const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

    const dispatch = useDispatch();
    const agentUsers = useSelector(state => state.agentUsers);
    const { List, loading, error } = agentUsers;

    if (Object.keys(Object.fromEntries(searchParams)).length === 0) {
        setSearchParams({ page: 1 });
    }

    const filterOptions = {
        Status: ['Active', 'Inactive'],
        Role: ['Admin', 'Super admin', 'Support admin', 'Finance admin']
    };

    const GetList = useCallback(async () => {
        let params = Object.fromEntries(searchParams);
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
        GetList();
    }, [searchParams]);

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
                <Topbar
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    filterOptions={filterOptions}
                />
                <div className='h-tableHeight'>
                    <Table
                        error={error}
                        loading={loading}
                        List={List}
                        handleSortByName={handleSortByName}
                    />
                </div>
                {!loading && Math.ceil(List.totalRecords / 10) > 1 &&
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

export default Agent;
