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
    const [searchParams, setSearchParams] = useSearchParams({ page_number: 1 });

    const dispatch = useDispatch();
    const agentUsers = useSelector(state => state.agentUsers);
    const { List, loading, error } = agentUsers;

    const GetList = useCallback(async () => {
        let params = Object.fromEntries(searchParams);
        delete params.tab;
        try {
            params = objectToQueryString(params);
            dispatch(AgentList(params));
        } catch (error) {
            // handleLoadData()
            console.error(error);
        }
    }, [searchParams]);

    useEffect(() => {
        GetList();
    }, []);

    return (
        <CardHeader
            activePath='Agents'
            paths={['Users']}
            pathurls={['users/agents']}
            header='Agent list'
            minHeightRequired={true}
            buttonText='Register Agent'
            navigationPath='/users/agents/onboard-agent'
            table={true}
        >
            <div>
                <Topbar />
                <Table
                    error={error}
                    loading={loading}
                    List={List}
                />
                <Paginator currentPage={1} totalPages={10} setSearchParams={setSearchParams} searchParams={searchParams}
                />
            </div>
        </CardHeader>
    );
};

export default Agent;
