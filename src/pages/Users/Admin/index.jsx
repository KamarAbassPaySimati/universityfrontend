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
            buttonText='Register Admin'
            navigationPath='/users/admin/register-admin'
        ><div></div>
        </CardHeader>
    );
};

export default Admin;
