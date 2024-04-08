import React, { useState } from 'react';
import KYCRegistration from '../../../../../components/KYC/KYCRegistration';
import CardHeader from '../../../../../components/CardHeader';
import FelidDivision from '../../../../../components/FelidDivision/FelidDivision';
import StatusProgressBar from '../../../../../components/StatusProgressBar/StatusProgressBar';
import KYCTopWithType from '../../../../../components/KYC/KYCTopWithType';
import Button2 from '../../../../../components/Button2/Button2';
import Button from '../../../../../components/Button/Button';
import DocumentSidebar from '../../../../../components/DocumentTab/DocumentSidebar';
import InputFieldWithDropDown from '../../../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import { Tooltip } from 'react-tooltip';

export default function RegisterKYC () {
    const [onHover, setOnHover] = useState(false);
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
    const documentTypes = {
        'ID Document': 'clear',
        'Verification Document': 'pending'
    };
    const IdDocumentList = ['National ID', 'Passport'];

    const Infomation = {
        List1: {
            text: 'List 1',
            insideList1: {
                text: 'insideList1',
                insideList1: {
                    text: ' insideList1.1'
                },
                insideList2: {
                    text: ' insideList1.2'
                }
            },
            insideList2: {
                text: 'insideList2',
                insideList1: {
                    text: ' insideList2'
                }
            }
        },
        List2: {
            text: 'List 2',
            insideList1: {
                text: 'insideList1',
                insideList1: {
                    text: ' insideList2'
                }
            }
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
                    {/* <FelidDivision
                        divisionClassName = {'w-1/3'}
                        divisionObject = {AddressDetails}
                    /> */}
                    <div className='flex'>
                        <DocumentSidebar
                            documentTypes={documentTypes}
                        />
                        <div className='ml-[60px]'>
                            <div className="w-[339px] relative">
                                <InputFieldWithDropDown
                                    labelName="ID Document"
                                    value={''}
                                    placeholder="Select ID document"
                                    // error={formErrors.role}
                                    options={IdDocumentList}
                                    id="passport"
                                    testId="passport"
                                    information
                                // handleInput={handleInput}
                                />
                                <Tooltip
                                    className='info-tooltip'
                                    anchorSelect=".info-icon"
                                    place='right-start'
                                    effect="solid"
                                    arrowColor="transparent"
                                >
                                    <h1 className='mb-2 font-normal text-[16px] leading-6'>Your ID Verification Document Options</h1>

                                    <ol class="space-y-4 lower-alpha list-inside text-[14px] font-normal leading-6 text-[#FFF]">
                                        { Object.keys(Infomation).map((itemText, itemIndex = 0) => (<li key={itemIndex}>
                                            {Infomation[itemText].text}
                                            {Object.keys(Infomation[itemText]).map((insideText, insideIndex = 0) => (
                                                <ul class="ps-5 mt-2 space-y-1 list-disc list-inside"
                                                    key={insideIndex}>
                                                    {console.log('Infomation[itemText][insideText]', Infomation[itemText][insideText].text)}
                                                    <li>{Infomation[itemText][insideText].text}</li>
                                                    {Object.keys(Infomation[itemText][insideText]).map((liText, liIndex = 0) => (<ul class="ps-5 mt-2 space-y-1 list-circle list-inside">
                                                        <li>You might feel like you are being really "organized" o</li>
                                                    </ul>))}
                                                </ul>))}
                                        </li>))}
                                        <li>
                                            List item one
                                            <ul class="ps-5 mt-2 space-y-1 list-disc list-inside">
                                                <li>You might feel like you are being really "organized" </li>
                                                <ul class="ps-5 mt-2 space-y-1 list-circle list-inside">
                                                    <li>You might feel like you are being really "organized" o</li>
                                                    <li>Nested navigation in UIs is a bad idea too, keep things as flat as possible.</li>
                                                    <li>Nesting tons of folders in your source code is also not helpful.</li>
                                                </ul>
                                                <li>Nested navigation in UIs is a bad idea too, keep things as flat as possible.</li>
                                                <li>Nesting tons of folders in your source code is also not helpful.</li>
                                            </ul>
                                        </li>
                                    </ol>

                                </Tooltip>
                            </div>
                        </div>
                    </div>
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
