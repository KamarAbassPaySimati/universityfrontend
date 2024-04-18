import React from 'react';
import CardHeader from '../../../components/CardHeader';
import { useSelector } from 'react-redux';
import Slugify from '../../../CommonMethods/Sulgify';

const Merchant = () => {
    const { user } = useSelector((state) => state.auth);
    let { user_type: CurrentUserRole } = user;
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }

    return (
        <CardHeader
            activePath='Merchants'
            paths={['Users']}
            pathurls={['users/merchants']}
            header='Merchant list'
            minHeightRequired={true}
            buttonText={`${CurrentUserRole === 'finance-admin' ? '' : 'Register Merchant'}`}
            navigationPath='/users/merchants/register-merchant'
            table={true}
            headerWithoutButton={false}
        >
        </CardHeader>
    );
};

export default Merchant;
