import React from 'react';
import CardHeader from '../../../components/CardHeader';
import { useSelector } from 'react-redux';
import Slugify from '../../../CommonMethods/Sulgify';
const Customer = () => {
    const { user } = useSelector((state) => state.auth);
    let { user_type: CurrentUserRole } = user;
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }
    return (
        <CardHeader
            activePath='Customers'
            paths={['Users']}
            pathurls={['users/customers']}
            header='Customer list'
            minHeightRequired={true}
            buttonText={`${CurrentUserRole === 'finance-admin' ? '' : 'Register Customer'}`}
            navigationPath='/users/customers/register-customer'
            table={true}
            headerWithoutButton={false}
        >
        </CardHeader>
    );
};

export default Customer;
