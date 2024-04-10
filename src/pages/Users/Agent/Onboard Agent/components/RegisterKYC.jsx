import React from 'react';
import KYCRegistration from '../../../../../components/KYC/KYCRegistration';
import CardHeader from '../../../../../components/CardHeader';
import StatusProgressBar from '../../../../../components/StatusProgressBar/StatusProgressBar';
import KYCTopWithType from '../../../../../components/KYC/KYCTopWithType';
import Button2 from '../../../../../components/Button2/Button2';
import Button from '../../../../../components/Button/Button';
import PersonalDetails from './PersonalDetails';
import Address from './Address';
import IdentityDetails from './IdentityDetails';

export default function RegisterKYC () {
    const ProgressBar = {
        address_details: {
            status: 'current',
            label: 'Address Details'
        },
        identity_details: {
            status: 'inactive',
            label: 'Identity Details'
        },
        personal_details: {
            status: 'active',
            label: 'Personal Details'
        }
    };
    return (
        <CardHeader
            activePath='Register Agent'
            paths={['Users', 'Agent']}
            pathurls={['users/agents']}
            header={false}
            ChildrenElement
        >

            <KYCRegistration />
            <KYCTopWithType
                Name={'KYC Registration'}
                type={'Malawi Full KYC'}
            />
            <div
                data-testid="view_admin"
                className={`mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] h-noDataError
                flex flex-col justify-between bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                <div className='flex flex-col'>
                    <StatusProgressBar
                        ProgressBar={ProgressBar}
                        LineClass={'line-class'}
                    />
                    <Address />
                    <IdentityDetails />
                    <PersonalDetails />
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex'>
                        <Button2
                            text={'Back'}
                            className={'border-primary-normal text-primary-normal py-2 px-[35px] h-10'}
                        />
                        <Button
                            text={'Save and continue'}
                            testId= 'submit_button'
                            className = 'max-w-[227px] ml-4 px-[51px]'
                            // onClick={handleClick}
                            isLoading={false}
                        />
                    </div>
                    <div className='text-primary-normal font-normal text-[14px] leading-[24px] cursor-pointer'>Skip</div>
                </div>
            </div>
        </CardHeader>
    );
}
