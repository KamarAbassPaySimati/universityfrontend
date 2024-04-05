import React from 'react';
import KYCRegistration from '../../../../../components/KYC/KYCRegistration';
import CardHeader from '../../../../../components/CardHeader';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';
import StatusProgressBar from '../../../../../components/StatusProgressBar/StatusProgressBar';
import KYCTopWithType from '../../../../../components/KYC/KYCTopWithType';
import Button2 from '../../../../../components/Button2/Button2';
import Button from '../../../../../components/Button/Button';

export default function RegisterKYC () {
    const AddressDetails = {
        nothing_to_show: {
            po_box_no: {
                label: 'P.O Box NO',
                type: 'input',
                key: 'po_box_no',
                require: false
            },
            street_name: {
                label: 'Street Name',
                type: 'input',
                key: 'street_name',
                require: true
            },
            house_number: {
                label: 'House Name/Number ',
                type: 'input',
                key: 'house_number',
                require: false
            },
            landmark: {
                label: 'Landmark',
                type: 'input',
                key: 'landmark',
                require: false
            },
            town_village_ta: {
                label: 'Town/Village/TA',
                type: 'input',
                key: 'town_village_ta',
                require: true
            },
            district: {
                label: 'District',
                type: 'input',
                key: 'district',
                require: true
            }
        }
    };
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

            {/* <KYCRegistration /> */}
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
                    <FelidDivision
                        divisionClassName = {'w-1/3'}
                        divisionObject = {AddressDetails}

                    />
                </div>
                <div className='flex'>

                    <Button2
                        text={'Back'}
                        className={'border-primary-normal text-primary-normal py-2 px-[35px] '}
                    />
                    <Button2
                        text={'Save and continue'}
                        className={'bg-primary-normal font-semibold  py-2 px-[35px] ml-6'}
                    />
                    <Button
                        text={'Save and continue'}
                        testId= 'submit_button'
                        className = 'max-w-[200px] mt-[15px]'
                        // onClick={handleClick}
                        isLoading={false}
                    />
                </div>
            </div>
        </CardHeader>
    );
}
