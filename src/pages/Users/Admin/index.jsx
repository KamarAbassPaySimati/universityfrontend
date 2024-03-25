import React from 'react';
import CardHeader from '../../../components/CardHeader';

const Admin = () => {
    return (
        <CardHeader
            activePath='Admin'
            paths={['Users']}
            pathurls={['users/admin']}
            header='Admin list'
            minHeightRequired={true}
            buttonText='Register'
            navigationPath='/users/admin/onboard-admin'
            >
            <div></div>
        </CardHeader>
    );
};

export default Admin;
