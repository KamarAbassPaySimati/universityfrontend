import React from 'react';
import KYCRegistration from '../../../../../components/KYC/KYCRegistration';
import CardHeader from '../../../../../components/CardHeader';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';

export default function RegisterKYC () {
    return (
        <CardHeader
            activePath='Register Agent'
            paths={['Users', 'Agent']}
            pathurls={['users/agents']}
            header={false}
            ChildrenElement
        >

            {/* <KYCRegistration /> */}
            <FelidDivision />
        </CardHeader>
    );
}
