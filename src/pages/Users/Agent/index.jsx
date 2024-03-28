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
                <Paginator Pagination={{
                    total_pages: 3,
                    limit: 10,
                    total_records: 21,
                    next_page: 2,
                    current_page: 1
                }} setSearchParams={setSearchParams} searchParams={searchParams}
                />
            </div>
        </CardHeader>
    );
};

export default Agent;
