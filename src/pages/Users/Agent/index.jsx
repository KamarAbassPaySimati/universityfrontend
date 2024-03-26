import React from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import Table from './Onboard Agent/components/Table';
import Paginator from '../../../components/Paginator/Paginator';
import { useSearchParams } from 'react-router-dom';

const Agent = () => {
    const [searchParams, setSearchParams] = useSearchParams({ page_number: 1 });
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
                <Table />
                <Paginator currentPage={1} totalPages={10} setSearchParams={setSearchParams} searchParams={searchParams}
                />
            </div>
        </CardHeader>
    );
};

export default Agent;
