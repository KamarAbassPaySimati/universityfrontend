import React from 'react';
import CardHeader from '../../../components/CardHeader';

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
        ><div></div>
        </CardHeader>
    );
};

export default Admin;
