import React, { useState } from 'react';
import KYCRegistration from '../../../../../components/KYC/KYCRegistration';
import CardHeader from '../../../../../components/CardHeader';
import StatusProgressBar from '../../../../../components/StatusProgressBar/StatusProgressBar';
import KYCTopWithType from '../../../../../components/KYC/KYCTopWithType';
import Button2 from '../../../../../components/Button2/Button2';
import Button from '../../../../../components/Button/Button';
import PersonalDetails from './PersonalDetails';
import Address from './Address';
import IdentityDetails from './IdentityDetails';
import { useSearchParams } from 'react-router-dom';

export default function RegisterKYC () {
    const [states, setStates] = useState({
        citizen_type: 'Malawi citizen',
        personal_customer: 'Full KYC'
    });
    const [searchParams, setSearchParams] = useSearchParams();
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
    const handleStates = (id, value) => {
        setStates((prevState) => ({ ...prevState, [id]: value }));
    };

    const handleSearchParams = (id, value) => {
        const params = Object.fromEntries(searchParams);
        params[id] = value;
        if (value === null) delete params[id];
        setSearchParams({ ...params });
    };
    const handleTabChange = (buttonType) => {
        let nextTab = searchParams.get('tab');
        switch (buttonType) {
        case 'back':
            switch (searchParams.get('tab')) {
            case 'address_details':
                nextTab = null;
                break;
            case 'identity_details':
                nextTab = 'address_details';
                break;
            case 'personal_details':
                nextTab = 'identity_details';
                break;
            default:
                break;
            }
            break;
        case 'skip':
            switch (searchParams.get('tab')) {
            case 'address_details':
                nextTab = 'identity_details';
                break;
            case 'identity_details':
                nextTab = 'personal_details';
                break;
            case 'personal_details':
                nextTab = 'success';
                break;
            default:
                break;
            }
            break;

        default:
            break;
        }
        handleSearchParams('tab', nextTab);
    };
    const handleSubmit = (key) => {
        switch (key) {
        case 'proceed':
            handleSearchParams('tab', 'address_details');
            break;
        case 'save_button':
            handleTabChange('identity_details');
            break;

        default:
            break;
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

            {searchParams.get('tab') === null
                ? (
                    <KYCRegistration
                        states={states}
                        handleStates={handleStates}
                        handleSubmit={handleSubmit}
                    />
                )
                : <>
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
                            {searchParams.get('tab') === 'address_details' && <Address />}
                            {searchParams.get('tab') === 'identity_details' && <IdentityDetails />}
                            {searchParams.get('tab') === 'personal_details' && <PersonalDetails />}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex'>
                                <Button2
                                    text={'Back'}
                                    className={'border-primary-normal text-primary-normal py-2 px-[35px] h-10'}
                                    onClick={() => handleTabChange('back')}
                                />
                                <Button
                                    text={'Save and continue'}
                                    testId= 'submit_button'
                                    className = 'max-w-[227px] ml-4 px-[51px]'
                                    // onClick={handleClick}
                                    isLoading={false}
                                />
                            </div>
                            <div
                                onClick={() => handleTabChange('skip')}
                                className='text-primary-normal font-normal text-[14px] leading-[24px] cursor-pointer'>Skip</div>
                        </div>
                    </div></>}
        </CardHeader>
    );
}
