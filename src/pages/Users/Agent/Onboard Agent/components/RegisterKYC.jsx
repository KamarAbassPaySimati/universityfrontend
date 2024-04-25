/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react';
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
    AddressDetails, BankDetailsList, GetDocumentValidation, PersonalDetailsList, ProgressBar,
    handleStates, occupationEduction, occupationEmployed, occupationSelfEmployed
} from './KYCFunctions';
import { handleSearchParamsValue } from '../../../../../CommonMethods/ListFunctions';
import addApostrophe from '../../../../../CommonMethods/textCorrection';
import KYCFinalPage from '../../../../../components/KYC/KYCFinalPage';
import GlobalContext from '../../../../../components/Context/GlobalContext';

export default function RegisterKYC () {
    const { id } = useParams();
    const [submitSelected, setSubmitSelected] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [submitPayload, setSubmitPayload] = useState({});
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const [oldStateValue, setOldStateValue] = useState({
        citizen_type: '',
        kyc_type: ''
    });
    const [bankSelected, setBankSelected] = useState(false);
    const [states, setStates] = useState({
        citizen_type: 'Malawi citizen',
        personal_customer: 'Full KYC',
        po_box_no: '',
        landmark: '',
        house_number: '',
        monthly_income: 'Up to 300,000.00 MWK',
        monthly_withdrawal: 'Up to 300,00.000 MWK'
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
        handleSearchParamsValue('tab', nextTab, searchParams, setSearchParams);
    };

    const handleAPICall = async (body, tab) => {
        try {
            const res = await dataService.PostAPIAgent('create-kyc-secure', body);
            if (res.error) {
                setToastError(res.data.data.message);
            } else {
                getKYCView();
                setToastSuccess(res.data.message);
                handleSearchParamsValue('tab', tab, searchParams, setSearchParams);
                setSubmitPayload({});
            }
            setIsLoadingButton(false);
        } catch (error) {
            setIsLoadingButton(false);
            setToastError(error.data.message);
        }
    };

    const handleValidation = (type, key) => {
        let count = 0;
        const sideBarStatus = documentSideBarData.documentTypes;
        const body = submitPayload;
        switch (type) {
        case 'address_details':
            AddressDetails.map((item) => {
                if (states[item] === undefined || states[item]?.trim() === '') {
                    if (key !== 'skip') {
                        setSubmitSelected(true);
                    }
                    count = count + 1;
                }
            }
            );
            if ((states.nationality === undefined || states.nationality === '') && states.citizen_type === 'Non Malawi citizen') {
                if (key !== 'skip') {
                    setSubmitSelected(true);
                }
                count = count + 1;
            }
            if (!((states.intl_street_name === '' || states.intl_street_name === undefined) &&
            (states.intl_district === '' || states.intl_district === undefined) &&
            (states.intl_landmark === '' || states.intl_landmark === undefined) &&
            (states.intl_town_village_ta === '' || states.intl_town_village_ta === undefined))) {
                const intlData = ['intl_street_name', 'intl_town_village_ta', 'intl_district', 'intl_landmark'];
                intlData.map((bank) => {
                    if (states[bank] === '' || states[bank] === undefined) {
                        if (key !== 'skip') {
                            setBankSelected(true);
                        }
                        count = count + 1;
                    }
                });
            }
            return count === 0;
        case 'identity_details':
            if (states['ID Document'] !== '' && states['ID Document'] !== undefined) {
                GetDocumentValidation(states.personal_customer, 'ID Document')[states['ID Document']].map((selectedItem) => {
                    if (states[selectedItem] === undefined || states[selectedItem]?.trim() === '') {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                            setToastError('Upload the required document');
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
                    setToastError('Upload the required document');
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
                GetDocumentValidation(states.personal_customer, 'Verification Document')[states['Verification Document']].map(
                    (selectedItem) => {
                        if (states[selectedItem] === undefined || states[selectedItem]?.trim() === '') {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                                setToastError('Upload the required document');
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
                    setToastError('Upload the required document');
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
                        count = count + 1;
                    }
                } else {
                    if (item !== 'dob') {
                        if (states[item] === undefined || states[item]?.trim() === '') {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            count = count + 1;
                        }
                    } else {
                        if (states[item] === undefined || Object.keys(states[item]).length === 0) {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            count = count + 1;
                        }
                    }
                }
            }
            );
            if (states?.occupation?.trim() !== '' || states.occupation !== undefined) {
                switch (states.occupation) {
                case 'Employed':
                    occupationEmployed.map((item) => {
                        if (states[item] === undefined || states[item]?.trim() === '') {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            count = count + 1;
                        } else {
                            body[item] = states[item];
                        }
                    }
                    );
                    break;
                case 'Others':
                    if (states.occupation_specify === undefined || states.occupation_specify.trim() === '') {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        count = count + 1;
                    } else {
                        body.occupation_specify = states.occupation_specify;
                    }
                    break;
                case 'Self Employed':
                    occupationSelfEmployed.map((item) => {
                        if (states[item] === undefined || states[item]?.trim() === '') {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            count = count + 1;
                        } else {
                            body[item] = states[item];
                        }
                    }
                    );
                    break;
                case 'In Full-time Education':
                    occupationEduction.map((item) => {
                        if (states[item] === undefined || states[item]?.trim() === '') {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            count = count + 1;
                        } else {
                            body[item] = states[item];
                        }
                    }
                    );
                    if ((states.institute === undefined || states?.institute?.trim() === '') &&
                    (states?.institute_specify?.trim() === '' || states.institute_specify === undefined)) {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        count = count + 1;
                    } else {
                        body.institute_specify = states.institute_specify;
                    }
                    break;

                default:
                    break;
                }
            }
            if (!((states.bank_name === '' || states.bank_name === undefined) &&
            (states.account_number === '' || states.account_number === undefined) &&
            (states.account_name === '' || states.account_name === undefined))) {
                BankDetailsList.map((bank) => {
                    if (states[bank] === '' || states[bank] === undefined) {
                        if (key !== 'skip') {
                            setBankSelected(true);
                        }
                        count = count + 1;
                    } else {
                        body[bank] = states[bank];
                    }
                });
            }
            setSubmitPayload({ ...body });
            return count === 0;
        default:
            break;
        }
    };

    const handleSubmit = (type) => {
        setIsLoadingButton(true);
        if (type === 'proceed') {
            if (oldStateValue.citizen_type !== states.citizen_type || oldStateValue.kyc_type !== states.personal_customer) {
                handleAPICall({
                    kyc_type: states.personal_customer === 'Full KYC' ? 'full' : 'simplified',
                    citizen: states.citizen_type === 'Malawi citizen' ? 'Malawian' : 'Non Malawi citizen',
                    paymaart_id: id
                }, 'address_details');
            } else {
                setTimeout(() => {
                    handleSearchParamsValue('tab', 'address_details', searchParams, setSearchParams);
                    setIsLoadingButton(false);
                }, 500);
            }
        } else {
            switch (searchParams.get('tab')) {
            case 'address_details':
                if (!handleValidation('address_details')) {
                    setIsLoadingButton(false);
                } else {
                    const body = {
                        po_box_no: states?.po_box_no,
                        house_number: states?.house_number,
                        street_name: states?.street_name,
                        landmark: states?.landmark,
                        town_village_ta: states?.town_village_ta,
                        district: states?.district,
                        paymaart_id: id,
                        address_details_status: 'completed',
                        intl_po_box_no: states?.intl_po_box_no,
                        intl_house_number: states?.intl_house_number,
                        intl_street_name: states?.intl_street_name,
                        intl_landmark: states?.intl_landmark,
                        intl_town_village_ta: states?.intl_town_village_ta,
                        intl_district: states?.intl_district
                    };
                    if (states.citizen_type !== 'Malawi citizen') {
                        body.citizen = states.nationality;
                    }
                    handleAPICall(body, 'identity_details'
                    );
                }
                break;
            case 'identity_details':
                if (!handleValidation('identity_details')) {
                    setIsLoadingButton(false);
                } else {
                    const body = {
                        id_document_front: submitPayload.id_document_front,
                        id_document_back: submitPayload.id_document_back,
                        verification_document_front: submitPayload.verification_document_front,
                        verification_document_back: submitPayload.verification_document_back,
                        selfie: submitPayload.capture,
                        id_document: addApostrophe(states['ID Document']),
                        verification_document: addApostrophe(states['Verification Document']),
                        paymaart_id: id,
                        id_details_status: 'completed'
                    };
                    handleAPICall(body, 'personal_details');
                }
                break;
            case 'personal_details':
                if (!handleValidation('personal_details')) {
                    setIsLoadingButton(false);
                } else {
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
                    handleAPICall({ ...body, ...submitPayload }, 'success');
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
            if (res.data.data !== '') {
                const object = {};
                const statusObject = {};
                Object.keys(res.data.data).map((item) => {
                    setOldStateValue({
                        citizen_type: res.data.data.citizen === 'Malawian' ? 'Malawi citizen' : 'Non Malawi citizen',
                        kyc_type: res.data.data.kyc_type === 'full' ? 'Full KYC' : 'Simplified KYC'
                    });
                    if (res.data.data[item] !== null) {
                        switch (item) {
                        case 'citizen':
                            object.citizen_type = res.data.data[item] === 'Malawian' ? 'Malawi citizen' : 'Non Malawi citizen';
                            if (res.data.data[item] !== 'Malawian' && res.data.data[item] !== 'Non Malawi citizen') {
                                object.nationality = res.data.data[item];
                            }
                            break;
                        case 'kyc_type':
                            object.personal_customer = res.data.data[item] === 'full' ? 'Full KYC' : 'Simplified KYC';
                            if (res.data.data.kyc_type !== 'full') {
                                object.monthly_income = 'Up to 300,000.00 MWK';
                                object.monthly_withdrawal = 'Up to 300,00.000 MWK';
                            }
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
                                status: res.data.data[item],
                                label: 'Address Details'
                            };
                            break;
                        case 'id_details_status':
                            statusObject.identity_details = {
                                status: res.data.data[item],
                                label: 'Identity Details'
                            };
                            break;
                        case 'info_details_status':
                            statusObject.personal_details = {
                                status: res.data.data[item],
                                label: 'Personal Details'
                            };
                            break;
                        case 'dob':
                            object.dob = new Date(parseInt(res.data.data[item]) * 1000);
                            break;
                        case 'purpose_of_relation':
                            object.purpose = res.data.data[item].split('\n');
                            break;
                        default:
                            object[item] = res.data.data[item];
                            break;
                        }
                    }
                }
                );
                setProgressBarStatus(statusObject);
                setStates(object);
            }
        } catch (error) {
            // Log error or send notification
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        if (searchParams.get('tab') !== null) {
            if (searchParams.get('tab') !== 'address_details' &&
                searchParams.get('tab') !== 'identity_details' &&
                searchParams.get('tab') !== 'personal_details') {
                handleSearchParamsValue('tab', null, searchParams, setSearchParams);
            }
        }
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
                        isLoading={isLoadingButton}
                    />
                )
                : searchParams.get('tab') === 'success'

                    ? <KYCFinalPage />
                    : <>
                        <KYCTopWithType
                            Name={'KYC Registration'}
                            type={states.citizen_type === 'Malawi citizen'
                                ? states.personal_customer === 'Full KYC' ? 'Malawi Full KYC' : 'Malawi Simplified KYC'
                                : 'Non - Malawi Full KYC'
                            }
                        />
                        <div
                            data-testid="KYC_Registration"
                            className={`mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] h-noDataError
                flex flex-col justify-between bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                            <div className='flex flex-col'>
                                <StatusProgressBar
                                    ProgressBar={progressBarStatus}
                                    LineClass={'line-class'}
                                    currentTab={searchParams.get('tab')}
                                />
                                <div className='overflow-auto scrollBar h-tabledivHeight'>
                                    {searchParams.get('tab') === 'address_details' &&
                                    <Address
                                        handleStates={handleInputFelids}
                                        states={states}
                                        submitSelected={submitSelected}
                                        bankSelected={bankSelected}
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
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex'>
                                    <Button2
                                        text={'Back'}
                                        disabled={isLoadingButton}
                                        className={'border-primary-normal text-primary-normal py-2 px-[35px] h-10'}
                                        onClick={() => handleTabChange('back')}
                                        testId={'Back_Button'}
                                    />
                                    <Button
                                        text={'Save and continue'}
                                        testId= 'submit_button'
                                        className = 'min-w-[227px] ml-4 px-[51px]'
                                        onClick={handleSubmit}
                                        isLoading={isLoadingButton}
                                        disabled={isLoadingButton}
                                    />
                                </div>
                                <div
                                    onClick={() => handleTabChange('skip')}
                                    data-testid="skip_button"
                                    disabled={isLoadingButton}
                                    className='text-primary-normal font-normal text-[14px] leading-[24px] cursor-pointer'>
                                    Skip</div>
                            </div>
                        </div></>}
        </CardHeader>
    );
}
