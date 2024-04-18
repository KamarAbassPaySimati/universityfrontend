/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import KYCRegistration from '../../../../../components/KYC/KYCRegistration';
import CardHeader from '../../../../../components/CardHeader';
import StatusProgressBar from '../../../../../components/StatusProgressBar/StatusProgressBar';
import KYCTopWithType from '../../../../../components/KYC/KYCTopWithType';
import Button2 from '../../../../../components/Button2/Button2';
import Button from '../../../../../components/Button/Button';
import PersonalDetails from './PersonalDetails';
import Address from './Address';
import IdentityDetails from './IdentityDetails';
import { useSearchParams, useParams } from 'react-router-dom';
import { dataService } from '../../../../../services/data.services';
import {
    AddressDetails, BankDetailsList, IdDocuments, PersonalDetailsList, ProgressBar, VerificationDocument,
    handleStates, handleStatusBar, occupationEduction, occupationEmployed, occupationSelfEmployed
} from './KYCFunctions';
import { handleSearchParams } from '../../../../../CommonMethods/ListFunctions';
import addApostrophe from '../../../../../CommonMethods/textCorrection';

export default function RegisterKYC () {
    const { id } = useParams();
    const [submitSelected, setSubmitSelected] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [submitPayload, setSubmitPayload] = useState({});
    const [bankSelected, setBankSelected] = useState(false);
    const [states, setStates] = useState({
        citizen_type: 'Malawi citizen',
        personal_customer: 'Full KYC',
        po_box_no: '',
        landmark: '',
        house_number: ''
    });
    const [documentSideBarData, setDocumentSidebarData] = useState({
        documentTypes: {
            'ID Document': 'clear',
            'Verification Document': 'clear'
        },
        selectedData: 'ID Document'
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const [progressBarStatus, setProgressBarStatus] = useState(ProgressBar);

    const handleInputFelids = (value, id, type) => {
        setSubmitSelected(false);
        setBankSelected(false);
        handleStates(value, id, type, setStates, states);
    };

    const handleTabChange = (buttonType) => {
        setSubmitSelected(false);
        setBankSelected(false);
        let nextTab = searchParams.get('tab');
        switch (buttonType) {
        case 'back':
            switch (searchParams.get('tab')) {
            case 'address_details':
                setProgressBarStatus(ProgressBar);
                nextTab = null;
                break;
            case 'identity_details':
                nextTab = 'address_details';
                if (!handleValidation('identity_details', 'skip')) {
                    console.log('error');
                    handleStatusBar('address_details', 'current', '', setProgressBarStatus);
                } else {
                    handleAPICall({
                        kyc_type: states.personal_customer === 'Full KYC' ? 'full' : states.personal_customer,
                        citizen: states.citizen_type === 'Malawi citizen' ? 'Malawian' : 'Non Malawi citizen',
                        paymaart_id: id
                    });
                    handleStatusBar('identity_details', 'active', '', setProgressBarStatus);
                }
                break;
            case 'personal_details':
                nextTab = 'identity_details';
                handleStatusBar('personal_details', 'current', 'back', setProgressBarStatus);
                break;
            default:
                break;
            }
            break;
        case 'skip':
            switch (searchParams.get('tab')) {
            case 'address_details':
                nextTab = 'identity_details';
                if (!handleValidation('address_details', 'skip')) {
                    console.log('error');
                    handleStatusBar('identity_details', 'inactive', '', setProgressBarStatus);
                } else {
                    handleStatusBar('identity_details', 'active', '', setProgressBarStatus);
                }
                break;
            case 'identity_details':
                nextTab = 'personal_details';
                if (!handleValidation('identity_details', 'skip')) {
                    console.log('error');
                    handleStatusBar('personal_details', 'inactive', '', setProgressBarStatus);
                } else {
                    handleStatusBar('personal_details', 'active', '', setProgressBarStatus);
                }
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
        handleSearchParams('tab', nextTab, searchParams, setSearchParams);
    };

    const handleAPICall = async (body) => {
        try {
            await dataService.PostAPIAgent('create-kyc-secure', body);
            getKYCView();
            setIsLoadingButton(false);
            setSubmitPayload({});
        } catch (error) {
            setIsLoadingButton(false);
            console.log('error', error);
        }
    };

    const handleValidation = (type, key) => {
        let count = 0;
        const sideBarStatus = documentSideBarData.documentTypes;
        const body = submitPayload;
        switch (type) {
        case 'address_details':
            AddressDetails.map((item) => {
                if (states[item] === '' || states[item] === undefined) {
                    if (key !== 'skip') {
                        setSubmitSelected(true);
                    }
                    count = count + 1;
                }
            }
            );
            return count === 0;
        case 'identity_details':
            if (states['ID Document'] !== '' && states['ID Document'] !== undefined) {
                IdDocuments[states['ID Document']].map((selectedItem) => {
                    if (states[selectedItem] === undefined || states[selectedItem] === '') {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                            sideBarStatus['ID Document'] = 'pending';
                        }
                        count = count + 1;
                    } else {
                        if (selectedItem.split('_')[selectedItem.split('_').length - 1] === 'front') {
                            body.id_document_front = states[selectedItem];
                        } else {
                            body.id_document_back = states[selectedItem];
                        }
                        // body[selectedItem] = states[selectedItem];
                        sideBarStatus['ID Document'] = 'filled';
                    }
                });
            } else {
                if (key !== 'skip') {
                    sideBarStatus['ID Document'] = 'pending';
                    setSubmitSelected(true);
                }
                count = count + 1;
            }
            if (states.capture === undefined || states.capture === '') {
                if (key !== 'skip') {
                    sideBarStatus['ID Document'] = 'pending';
                    setSubmitSelected(true);
                }
                count = count + 1;
            } else {
                if (count === 0) {
                    sideBarStatus['ID Document'] = 'filled';
                }
                body.capture = states.capture;
            }
            if (states['Verification Document'] !== '' && states['Verification Document'] !== undefined) {
                VerificationDocument[states['Verification Document']].map((selectedItem) => {
                    if (states[selectedItem] === undefined || states[selectedItem] === '') {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                            sideBarStatus['Verification Document'] = 'pending';
                        }
                        count = count + 1;
                    } else {
                        sideBarStatus['Verification Document'] = 'filled';
                        if (selectedItem.split('_')[selectedItem.split('_').length - 1] === 'front') {
                            body.verification_document_front = states[selectedItem];
                        } else {
                            body.verification_document_back = states[selectedItem];
                        }
                    }
                });
            } else {
                if (key !== 'skip') {
                    sideBarStatus['Verification Document'] = 'pending';
                    setSubmitSelected(true);
                }
                count = count + 1;
            }

            setDocumentSidebarData({ ...documentSideBarData, documentTypes: sideBarStatus });
            setSubmitPayload({ ...body });
            return count === 0;
        case 'personal_details':
            PersonalDetailsList.map((item) => {
                if (item === 'purpose') {
                    if (states[item] === undefined || states[item].length === 0) {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        console.log('count', count, item);
                        count = count + 1;
                    }
                } else {
                    if (states[item] === '' || states[item] === undefined) {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        console.log('count1', count, item);
                        count = count + 1;
                    }
                }
            }
            );
            if (states.occupation !== '' || states.occupation !== undefined) {
                switch (states.occupation) {
                case 'Employed':
                    occupationEmployed.map((item) => {
                        if (states[item] === '' || states[item] === undefined) {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            console.log('count2', count, item);
                            count = count + 1;
                        } else {
                            body[item] = states[item];
                        }
                    }
                    );
                    break;
                case 'Self Employed':
                    occupationSelfEmployed.map((item) => {
                        if (states[item] === '' || states[item] === undefined) {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            console.log('count3', count);
                            count = count + 1;
                        } else {
                            body[item] = states[item];
                        }
                    }
                    );
                    break;
                case 'In full time education':
                    occupationEduction.map((item) => {
                        if (states[item] === '' || states[item] === undefined) {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            console.log('count4', count);
                            count = count + 1;
                        } else {
                            body[item] = states[item];
                        }
                    }
                    );
                    if ((states.institute === undefined || states.institute === '') &&
                    (states.institute_specify === '' || states.institute_specify === undefined)) {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        console.log('count5', count);
                        count = count + 1;
                    } else {
                        body.institute_specify = states.institute_specify;
                    }
                    break;

                default:
                    break;
                }
            }
            console.log('stateejdxjhbhxje', states);
            if (!((states.bank_name === '' || states.bank_name === undefined) &&
            (states.account_number === '' || states.account_number === undefined) &&
            (states.account_name === '' || states.account_name === undefined))) {
                console.log('banckkkbanckkkbanckkk')
                BankDetailsList.map((bank) => {
                    console.log('banckkk', bank);
                    if (states[bank] === '' || states[bank] === undefined) {
                        if (key !== 'skip') {
                            setBankSelected(true);
                        }
                        console.log('count6', count);
                        count = count + 1;
                    } else {
                        body[bank] = states[bank];
                    }
                });
            }
            setSubmitPayload({ ...body });
            console.log('bwcwcuwuwc', count);
            return count === 0;
        default:
            break;
        }
    };

    const handleSubmit = (type) => {
        if (type === 'proceed') {
            handleAPICall({
                kyc_type: states.personal_customer === 'Full KYC' ? 'full' : states.personal_customer,
                citizen: states.citizen_type === 'Malawi citizen' ? 'Malawian' : 'Non Malawi citizen',
                paymaart_id: id
            });
            handleSearchParams('tab', 'address_details', searchParams, setSearchParams);
        } else {
            switch (searchParams.get('tab')) {
            case 'address_details':
                if (!handleValidation('address_details')) {
                    console.log('error');
                } else {
                    handleAPICall({
                        po_box_no: states?.po_box_no,
                        house_number: states?.house_number,
                        street_name: states?.street_name,
                        landmark: states?.landmark,
                        town_village_ta: states?.town_village_ta,
                        district: states?.district,
                        paymaart_id: id,
                        address_details_status: 'completed'
                    }
                    );
                    handleStatusBar('identity_details', 'active', '', setProgressBarStatus);
                    handleSearchParams('tab', 'identity_details', searchParams, setSearchParams);
                }
                break;
            case 'identity_details':
                if (!handleValidation('identity_details')) {
                    console.log('error');
                } else {
                    console.log('submitPayload', submitPayload);
                    const body = {
                        id_document_front: submitPayload.id_document_front,
                        id_document_back: submitPayload.id_document_back,
                        verification_document_front: submitPayload.verification_document_front,
                        verification_document_back: submitPayload.verification_document_back,
                        selfie: submitPayload.capture,
                        id_document: states['ID Document'],
                        verification_document: addApostrophe(states['Verification Document']),
                        paymaart_id: id,
                        id_details_status: 'completed'
                    };
                    handleAPICall(body);
                    handleStatusBar('personal_details', 'active', '', setProgressBarStatus);
                    handleSearchParams('tab', 'personal_details', searchParams, setSearchParams);
                }
                break;
            case 'personal_details':
                if (!handleValidation('personal_details')) {
                    console.log('error identttt');
                } else {
                    console.log('mothly_incomee', states, submitPayload);
                    const body = {
                        gender: states.gender,
                        dob: (new Date(states.dob).getTime() / 1000).toString(),
                        occupation: states.occupation,
                        purpose_of_relation: states.purpose.join('\n'),
                        monthly_income: states.monthly_income,
                        monthly_withdrawal: states.monthly_withdrawal,
                        paymaart_id: id,
                        info_details_status: 'completed'
                    };
                    console.log('nwncnicqniociqnwoc', body, submitPayload)
                    handleAPICall({ ...body, ...submitPayload });
                    handleStatusBar('personal_details', 'active', '', setProgressBarStatus);
                    handleSearchParams('tab', 'success', searchParams, setSearchParams);
                }
                break;
            default:
                break;
            }
        }
    };

    const getKYCView = async () => {
        try {
            const res = await dataService.GetAPI(`view-kyc-secure?paymaart_id=${id}`, 'agent');
            console.log(res.data.data, 'res.data.data');
            if (res.data.data !== '') {
                const object = {};
                const statusObject = {};
                Object.keys(res.data.data).map((item) => {
                    if (res.data.data[item] !== null) {
                        switch (item) {
                        case 'citizen':
                            object.citizen_type = res.data.data[item] === 'Malawian' ? 'Malawi citizen' : 'Non Malawi citizen';
                            break;
                        case 'kyc_type':
                            object.personal_customer = res.data.data[item] === 'full' ? 'Full KYC' : 'Simplified KYC';
                            break;
                        case 'id_document_back':
                            object[`${res.data.data.id_document.replaceAll(' ', '_').toLowerCase()}_img_back`] =
                            res.data.data[item];
                            break;
                        case 'id_document_front':
                            object[`${res.data.data.id_document.replaceAll(' ', '_').toLowerCase()}_img_front`] =
                            res.data.data[item];
                            break;
                        case 'verification_document_back':
                            object[`${res.data.data.verification_document.replaceAll(' ', '_').toLowerCase()}_img_back`] =
                                res.data.data[item];
                            break;
                        case 'verification_document_front':
                            object[`${res.data.data.verification_document.replaceAll(' ', '_').toLowerCase()}_img_front`] =
                                res.data.data[item];
                            break;
                        case 'selfie':
                            object.capture = res.data.data[item];
                            break;
                        case 'id_document':
                            object['ID Document'] = res.data.data[item];
                            break;
                        case 'verification_document':
                            object['Verification Document'] = res.data.data[item];
                            break;
                        case 'address_details_status':
                            statusObject.address_details = {
                                status: searchParams.get('tab') === 'address_details' ? 'current' : res.data.data[item],
                                label: 'Address Details'
                            };
                            break;
                        case 'id_details_status':
                            statusObject.identity_details = {
                                status: searchParams.get('tab') === 'identity_details' ? 'current' : res.data.data[item],
                                label: 'Identity Details'
                            };
                            break;
                        case 'info_details_status':
                            statusObject.personal_details = {
                                status: searchParams.get('tab') === 'personal_details' ? 'current' : res.data.data[item],
                                label: 'Personal Details'
                            };
                            break;
                        case 'dob':
                            object.dob = new Date(parseInt(res.data.data[item]) * 1000).toISOString();
                            break;
                        default:
                            object[item] = res.data.data[item];
                            break;
                        }
                    }
                }
                );
                console.log('object', object, statusObject);
                setProgressBarStatus(statusObject);
                setStates(object);
            }
        } catch (error) {
            // Log error or send notification
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        getKYCView();
    }, []);
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
                        handleStates={handleInputFelids}
                        handleSubmit={handleSubmit}
                        isLoadingButton={isLoadingButton}
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
                                ProgressBar={progressBarStatus}
                                LineClass={'line-class'}
                            />
                            {searchParams.get('tab') === 'address_details' &&
                            <Address
                                handleStates={handleInputFelids}
                                states={states}
                                submitSelected={submitSelected}
                            />}
                            {searchParams.get('tab') === 'identity_details' && <IdentityDetails
                                handleStates={handleInputFelids}
                                states={states}
                                documentSideBarData={documentSideBarData}
                                setDocumentSidebarData={setDocumentSidebarData}
                                submitSelected={submitSelected}
                            />}
                            {searchParams.get('tab') === 'personal_details' &&
                            <PersonalDetails
                                handleStates={handleInputFelids}
                                states={states}
                                submitSelected={submitSelected}
                                bankSelected={bankSelected}
                            />}
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
                                    onClick={handleSubmit}
                                    isLoading={isLoadingButton}
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
