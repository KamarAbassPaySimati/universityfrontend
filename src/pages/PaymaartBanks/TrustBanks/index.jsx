import React from 'react';
import CardHeader from '../../../components/CardHeader';

const TrustBanks = () => {
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
        
        </CardHeader>
    );
};

export default TrustBanks;
