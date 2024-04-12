import React from 'react';
import CardHeader from '../../../components/CardHeader';
import DocumentSidebar from '../../../components/DocumentTab/DocumentSidebar';

const TrustBanks = () => {
    const bankTypes = {
        'Trust Banks': 'clear',
        'Main Capital': 'clear',
        Suspense: 'clear',
        'Transaction fees & Commissions': 'clear',
        Taxes: 'clear'

    };
    return (
        <CardHeader
            activePath='Trust Banks'
            paths={['Paymaart Banks']}
            pathurls={['paymaart-banks/trust-banks']}
            header='Banks'
            minHeightRequired={true}
            headerWithoutButton={false}
            table={false}
        >
            <div className='flex'>
                <div className='mt-[52px] ml-[8px] w-full'>
                <DocumentSidebar
                    documentTypes={bankTypes}
                   
                />
                </div>
                <div className='mt-[50px] mb-[100px] w-[1px] ml-[10px] bg-[#000000]'></div>
              
                <div>
                    Empty
                </div>
            </div>

        </CardHeader>
    );
};

export default TrustBanks;
