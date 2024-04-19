import React from 'react';
import CardHeader from '../../../components/CardHeader';
import { useSelector } from 'react-redux';
import Slugify from '../../../CommonMethods/Sulgify';
import { useSearchParams } from 'react-router-dom';
import Topbar from '../../../components/Topbar/Topbar';

const Merchant = () => {
    const { user } = useSelector((state) => state.auth);
    const [searchParams, setSearchParams] = useSearchParams({ });
    let { user_type: CurrentUserRole } = user;
    if (CurrentUserRole) {
        CurrentUserRole = Slugify(CurrentUserRole);
    }
    const filterOptions = {
        status: ['active', 'inactive']
    };

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
            <div className='bg-[#fff] border-b border-neutral-outline'>
                <Topbar
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    filterOptions={filterOptions}
                    placeHolder="Paymaart ID, name, trading name or till number"
                    filterType='Filter merchant list'
                    filterActive={(searchParams.get('status') !== null)}
                />
            </div>

        </CardHeader>
    );
};

export default Merchant;
