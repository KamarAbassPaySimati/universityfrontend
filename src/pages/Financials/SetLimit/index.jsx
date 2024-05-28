import React, { useEffect, useState } from 'react';
import CardHeader from '../../../components/CardHeader';
import { dataService } from '../../../services/data.services';

function SetLimit() {
    const [viewLimitData, setViewLimitData] = useState('');
    const initialToggleButtons = [
        { key: 'Agents', status: true },
        { key: 'Customers', status: false },
        { key: 'Merchants', status: false }
    ];
    const [toggleButtons, setToggleButtons] = useState(initialToggleButtons);
    const handleToggle = (updatedButtons) => {
        setToggleButtons(updatedButtons);
        // Perform API call or any other action based on the updated button values
    };

    useEffect(() => {
        const fetchViewLimitData = async () => {
            const response = await dataService.GetAPI('admin-users/view-limit');
            setViewLimitData(response);
        };

        fetchViewLimitData();
    }, []);


    return (
        <div>
            <CardHeader
                activePath='set-limit'
                paths={['financials']}
                pathurls={['finanacials/set-limit']}
                header='Set Limit'
                minHeightRequired={true}
                buttonText={'Update'}
                navigationPath='/users/admins/register-admin'
                onToggle={handleToggle}
                table={true}
                headerWithoutButton={false}
            >
                <div className='p-10'>
                    <p className='font-semibold text-lg text-[#4F5962]'>Maximum Account Balances</p>
                    <div className='mt-7 w-full flex items-start'>
                        <div className='w-1/3'>
                            <p className='font-normal text-sm text-[#A4A9AE]'>Agent</p>
                            <p className='mt-1 font-normal text-sm text-[#4F5962]'>25,000,000.00 MWK</p>
                        </div>
                        <div className='w-1/3'>
                            <p className='font-normal text-sm text-[#A4A9AE]'>Merchant</p>
                            <p className='mt-1 font-normal text-sm text-[#4F5962]'>25,000,000.00 MWK</p>
                        </div>
                        <div className='w-1/3'>
                            <p className='font-normal text-sm text-[#A4A9AE]'>Customer</p>
                            <p className='mt-1 font-normal text-sm text-[#4F5962]'>25,000,000.00 MWK</p>
                        </div>
                    </div>
                    <p className='font-semibold text-lg text-[#4F5962] mt-8'>Transaction Limit</p>
                    <div>

                    </div>
                </div>
            </CardHeader>
        </div>
    );
}

export default SetLimit;
