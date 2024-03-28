import React, { useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import Topbar from '../../../components/Topbar/Topbar';
import AdminTable from './Onboard admin/components/AdminTable';

const initailState = {
    status: { Active: false, Inactive: false },
    Role: { 'Super admin': false, 'Finance admin': false, admin: false, 'Support admin': false }
};
const [filterValues, setFilterValues] = useState(initailState);
const Admin = () => {
    return (
        <CardHeader
            activePath='Admins'
            paths={['Users']}
            pathurls={['users/admins']}
            header='Admin list'
            minHeightRequired={true}
            buttonText='Register Admin'
            navigationPath='/users/admins/register-admin'
            table={true}
        >
            <div>
                <Topbar />
                <AdminTable />
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
