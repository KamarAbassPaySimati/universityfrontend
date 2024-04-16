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

export default function RegisterKYC () {
    const [submitSelected, setSubmitSelected] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const IdDocuments = {
        'National ID': ['national_id_img_front', 'national_id_img_back'],
        Passport: ['passport_img_front']
    };
    const [submitPayload, setSubmitPayload] = useState({});
    const VerificationDocument = {
        'Driver\'s Licence': ['driver\'s_licence_img_front', 'driver\'s_licence_img_back'],
        'Traffic Register Card': ['traffic_register_card_img_front', 'traffic_register_card_img_back'],
        'Birth Certificate': ['birth_cert_img_front', 'birth_cert_img_back'],
        'Employer letter': ['employer_letter_img_front', 'employer_letter_img_back'],
        'Institute letter': ['institute_letter_img_front', 'institute_letter_img_back']
    };
    const { id } = useParams();
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
            status: 'inactive',
            label: 'Personal Details'
        }
    };
    const [progressBarStatus, setProgressBarStatus] = useState(ProgressBar);
    const handleStates = (value, id, type) => {
        setSubmitSelected(false);
        if (type === 'input') {
            setStates((prevState) => ({ ...prevState, [id]: value.target.value }));
        } else if (type === 'checkBox') {
            let checkBoxArray = states.purpose === undefined ? [] : states.purpose;
            if (value.target.checked) {
                // If checkbox is checked, add the value to checkedItems array
                checkBoxArray = [...checkBoxArray, value.target.value];
            } else {
                // If checkbox is unchecked, remove the value from checkedItems array
                checkBoxArray = checkBoxArray.filter(item => item !== value.target.value);
            }
            setStates((prevState) => ({
                ...prevState,
                purpose: checkBoxArray
            }));
        } else {
            setStates((prevState) => ({ ...prevState, [id]: value }));
        }
    };

    const handleSearchParams = (id, value) => {
        const params = Object.fromEntries(searchParams);
        params[id] = value;
        if (value === null) delete params[id];
        setSearchParams({ ...params });
    };
    const handleTabChange = (buttonType) => {
        setSubmitSelected(false);
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
                    handleStatusBar('address_details', 'current');
                } else {
                    handleAPICall({
                        kyc_type: states.personal_customer === 'Full KYC' ? 'full' : states.personal_customer,
                        citizen: states.citizen_type,
                        paymaart_id: id
                    });
                    handleStatusBar('identity_details', 'active');
                }
                break;
            case 'personal_details':
                nextTab = 'identity_details';
                if (!handleValidation('personal_details', 'skip')) {
                    console.log('error');
                    handleStatusBar('personal_details', 'current', 'back');
                } else {
                    // handleStatusBar('identity_details', 'current');
                    // handleStatusBar('personal_details', 'active');
                }
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
                    handleStatusBar('identity_details', 'inactive');
                } else {
                    handleStatusBar('identity_details', 'active');
                }
                break;
            case 'identity_details':
                nextTab = 'personal_details';
                if (!handleValidation('identity_details', 'skip')) {
                    console.log('error');
                    handleStatusBar('personal_details', 'inactive');
                } else {
                    handleStatusBar('personal_details', 'active');
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
        handleSearchParams('tab', nextTab);
    };
    const handleAPICall = async (body) => {
        console.log('api calll', body);
        const response = await dataService.PostAPIAgent('create-kyc-secure', body);
        console.log(response, 'response');
    };
    const handleSubmit = (key) => {
        setIsLoadingButton(true);
        switch (key) {
        case 'proceed':
            handleSearchParams('tab', 'address_details');
            handleAPICall({
                kyc_type: states.personal_customer === 'Full KYC' ? 'full' : states.personal_customer,
                citizen: states.citizen_type,
                paymaart_id: id
            });
            setIsLoadingButton(false);
            break;
        case 'save_button':
            handleTabChange('identity_details');
            break;

        default:
            break;
        }
    };
    const handleValidation = (type, key) => {
        let count = 0;
        const AddressDetails = ['street_name', 'town_village_ta', 'district'];
        const PersonalDetails = ['gender', 'DOB', 'occupation', 'monthly_income', 'monthly_withdrawal', 'purpose'];
        const occupationEmployed = ['employed', 'employer_name', 'industry_sector', 'town/district'];
        const occupationSelfEmployed = ['please_specify'];
        const occupationEduction = ['education'];
        const sideBarStatus = documentSideBarData.documentTypes;
        const body = {};
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
                console.log('statesmmwjjjjjjjjjjj', states);
                VerificationDocument[states['Verification Document']].map((selectedItem) => {
                    console.log('selectedItem', selectedItem);
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
            console.log('sideBarStatus', sideBarStatus, body);
            setDocumentSidebarData({ ...documentSideBarData, documentTypes: sideBarStatus });
            setSubmitPayload(body);
            return count === 0;
        case 'personal_details':
            PersonalDetails.map((item) => {
                if (item === 'purpose') {
                    if (states[item] === '' || states[item].length === 0) {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        count = count + 1;
                    }
                } else {
                    if (states[item] === '' || states[item] === undefined) {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
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
                            count = count + 1;
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
                            count = count + 1;
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
                            count = count + 1;
                        }
                    }
                    );
                    if ((states.education === undefined || states.education === '') &&
                    (states.please_specify === '' || states.please_specify === undefined)) {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        count = count + 1;
                    }
                    break;

                default:
                    break;
                }
            }
            // if(states.)
            return count === 0;
        default:
            break;
        }
    };
    console.log('subjxnne', submitPayload);
    const handleStatusBar = (key, value, type) => {
        console.log('value', value);
        switch (key) {
        case 'address_details':
            setProgressBarStatus((prevState) => ({
                ...prevState,
                address_details: {
                    status: value,
                    label: 'Address Details'
                },
                identity_details: {
                    status: 'inactive',
                    label: 'Identity Details'
                }
            }));
            break;
        case 'identity_details':
            setProgressBarStatus((prevState) => ({
                ...prevState,
                address_details: {
                    status: value,
                    label: 'Address Details'
                },
                identity_details: {
                    status: 'current',
                    label: 'Identity Details'
                }
            }));
            break;
        case 'personal_details':
            if (type === 'back') {
                setProgressBarStatus((prevState) => ({
                    ...prevState,
                    identity_details: {
                        status: 'current',
                        label: 'Identity Details'
                    },
                    personal_details: {
                        status: 'inactive',
                        label: 'Personal Details'
                    }
                }));
            } else {
                setProgressBarStatus((prevState) => ({
                    ...prevState,
                    identity_details: {
                        status: value,
                        label: 'Identity Details'
                    },
                    personal_details: {
                        status: 'current',
                        label: 'Personal Details'
                    }
                }));
            }

            break;

        default:
            break;
        }
    };
    const handleSaveAndContinue = () => {
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
                    kyc_type: 'full'
                }
                );
                handleStatusBar('identity_details', 'active');
                handleSearchParams('tab', 'identity_details');
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
                    paymaart_id: id
                };
                handleAPICall(body);
                handleStatusBar('personal_details', 'active');
                handleSearchParams('tab', 'personal_details');
            }
            break;
        case 'personal_details':
            if (!handleValidation('identity_details')) {
                console.log('error');
            } else {
                handleStatusBar('personal_details', 'active');
                handleSearchParams('tab', 'success');
            }
            break;
        default:
            break;
        }
    };
    const getKYCView = async () => {
        try {
            const res = await dataService.GetAPI(`view-kyc-secure?paymaart_id=${id}`, 'agent');
            console.log('resdnxhjxsxhjja', res);
            return res;
        } catch (error) {
            // Log error or send notification
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        getKYCView();
    }, [searchParams]);
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
                                ProgressBar={progressBarStatus}
                                LineClass={'line-class'}
                            />
                            {searchParams.get('tab') === 'address_details' &&
                            <Address
                                handleStates={handleStates}
                                states={states}
                                submitSelected={submitSelected}
                            />}
                            {searchParams.get('tab') === 'identity_details' && <IdentityDetails
                                handleStates={handleStates}
                                states={states}
                                documentSideBarData={documentSideBarData}
                                setDocumentSidebarData={setDocumentSidebarData}
                                submitSelected={submitSelected}
                            />}
                            {searchParams.get('tab') === 'personal_details' &&
                            <PersonalDetails
                                handleStates={handleStates}
                                states={states}
                                submitSelected={submitSelected}
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
                                    onClick={handleSaveAndContinue}
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
