/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react';
import KYCRegistration from '../KYCRegistration';
import CardHeader from '../../CardHeader';
import StatusProgressBar from '../../StatusProgressBar/StatusProgressBar';
import KYCTopWithType from '../KYCTopWithType';
import Button2 from '../../Button2/Button2';
import Button from '../../Button/Button';
import PersonalDetails from './PersonalDetails';
import Address from './Address';
import ConfirmationPopup from '../../ConfirmationPopup/ConfirmationPopup';
import IdentityDetails from './IdentityDetails';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { dataService } from '../../../services/data.services';
import {
    AddressDetails, BankDetailsList, GetDocumentValidation, MerchantProgressBar, PersonalDetailsList, ProgressBar,
    UpdateProgressBar,
    handleStates, occupationEduction, occupationEmployed, occupationSelfEmployed,
    updateMerchantProgressBar
} from './KYCFunctions';
import { handleSearchParamsValue } from '../../../CommonMethods/ListFunctions';
import addApostrophe from '../../../CommonMethods/textCorrection';
import KYCFinalPage from '../KYCFinalPage';
import GlobalContext from '../../Context/GlobalContext';
import TradingDetails from './TradingDetails';
import OTPpopup from '../../OTPpopup/OTPpopup';
import BasicDetails from './BasicDetails';
import Modal from 'react-responsive-modal';

export default function RegisterKYC ({ role, type }) {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [submitSelected, setSubmitSelected] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [submitPayload, setSubmitPayload] = useState({});
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const [countryCode, setCountryCode] = useState('+265');
    const [saveCount, setSaveCount] = useState(true);
    const [isFullKYC, setIsFullKYC] = useState(false);
    const [oldStateValue, setOldStateValue] = useState({
        citizen_type: '',
        kyc_type: '',
        trading_name: ''
    });
    const [verified, setVerified] = useState({
        email: true,
        phoneNumber: true
    });
    const [isFullKycPopup, setIsFullKycPopup] = useState(false);
    const [formData, setFormData] = useState({});
    const [isOtpPopup, setIsOtpPopup] = useState(type === 'update');
    const [buttonStatus, setButtonStatus] = useState('Not Started');
    const [bankSelected, setBankSelected] = useState(false);
    const [encryptedCode, setEncryptedCode] = useState('');
    const [basicViewDetails, setBasicVieDetails] = useState({});
    const [states, setStates] = useState({
        citizen_type: 'Malawi citizen',
        personal_customer: 'Full KYC',
        po_box_no: '',
        landmark: '',
        house_number: '',
        monthly_income: 'Up to 300,000.00 MWK',
        monthly_withdrawal: 'Up to 300,000.00 MWK'
    });
    const initialDocumentSideBarData = {
        documentTypes: {
            'ID Document': 'clear',
            'Verification Document': 'clear'
        },
        selectedData: 'ID Document'
    };
    const [documentSideBarData, setDocumentSidebarData] = useState(initialDocumentSideBarData);
    const [searchParams, setSearchParams] = useSearchParams();
    const [progressBarStatus, setProgressBarStatus] = useState((type === 'update' && role !== 'merchant')
        ? UpdateProgressBar
        : role === 'merchant' ? type === 'update' ? updateMerchantProgressBar : MerchantProgressBar : ProgressBar);

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
            case 'basic_details':
                Navigate(`/users/${role}s/register-${role}/specific-view/${id}`);
                return;
            case 'address_details':
                if (type === 'update') {
                    nextTab = 'basic_details';
                } else {
                    nextTab = null;
                }
                break;
            case 'identity_details':
                nextTab = 'address_details';
                break;
            case 'trading_details':
                nextTab = 'identity_details';
                break;
            case 'personal_details':
                if (role === 'merchant') {
                    nextTab = 'trading_details';
                } else {
                    nextTab = 'identity_details';
                }
                break;
            default:
                break;
            }
            break;
        case 'skip':
            switch (searchParams.get('tab')) {
            case 'basic_details':
                nextTab = 'address_details';
                break;
            case 'address_details':
                nextTab = 'identity_details';
                break;
            case 'identity_details':
                if (role === 'merchant') {
                    nextTab = 'trading_details';
                } else {
                    nextTab = 'personal_details';
                }
                break;
            case 'trading_details':
                nextTab = 'personal_details';
                break;
            case 'personal_details':
                if (type === 'update') {
                    Navigate(`/users/${role}s/register-${role}/specific-view/${id}`);
                    return;
                } else {
                    nextTab = 'success';
                }
                break;
            default:
                break;
            }
            break;
        default:
            break;
        }
        setDocumentSidebarData(initialDocumentSideBarData);
        handleSearchParamsValue('tab', nextTab, searchParams, setSearchParams);
    };

    const handleAPICall = async (body, tab, givenEndPoint) => {
        try {
            const endPoint = role === 'agent' ? 'agent-users' : role === 'merchant' ? 'merchant-users' : 'customer-user';
            const res = await dataService.PostAPI(givenEndPoint || `${endPoint}/create-kyc-secure`, body);
            if (res.error) {
                setToastError(res.data.data.message);
            } else {
                getKYCView();
                setTimeout(() => {
                    setToastSuccess(res.data.message);
                    if (type === 'update' && tab !== 'address_details') {
                        setSaveCount(false);
                    }
                    if (type === 'update' && tab === 'success') {
                        Navigate(`/users/${role}s/register-${role}/specific-view/${id}`);
                    } else {
                        handleSearchParamsValue('tab', tab, searchParams, setSearchParams);
                    }
                    setSubmitPayload({});
                }, 1000);
            }
            setIsLoadingButton(false);
        } catch (error) {
            setIsLoadingButton(false);
            setToastError(error.data.message);
        }
    };

    const handleValidation = (KYCValidationType, key) => {
        let count = 0;
        const sideBarStatus = documentSideBarData.documentTypes;
        const body = submitPayload;
        switch (KYCValidationType) {
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
            if ((
                // (states.intl_address === '' || states.intl_address === undefined) &&
            // (states.intl_district === '' || states.intl_district === undefined) &&
            // (states.intl_landmark === '' || states.intl_landmark === undefined) &&
            // (states.intl_house_number === '' || states.intl_house_number === undefined) &&
            // (states.intl_po_box_no === '' || states.intl_po_box_no === undefined) &&
                states.citizen_type === 'Non Malawi citizen' &&
                (states.intl_address === '' || states.intl_address === undefined))) {
                if (key !== 'skip') {
                    setBankSelected(true);
                }
                count = count + 1;
            }
            return count === 0;
        case 'trading_details':
            ['trading_type', 'trading_street_name', 'trading_town_village_ta', 'trading_district'].map((item) => {
                if (item === 'trading_type') {
                    if (states[item] === undefined || states[item].length === 0) {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        count = count + 1;
                    }
                } else {
                    if (states[item] === undefined || states[item]?.trim() === '') {
                        if (key !== 'skip') {
                            setSubmitSelected(true);
                        }
                        count = count + 1;
                    }
                }
            }
            );
            return count === 0;
        case 'identity_details':
            if (states['ID Document'] !== '' && states['ID Document'] !== undefined) {
                GetDocumentValidation(states.citizen_type === 'Malawi citizen'
                    ? states.personal_customer
                    : 'Non Malawi citizen', 'ID Document')[states['ID Document']].map((selectedItem) => {
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
                GetDocumentValidation(states.citizen_type === 'Malawi citizen'
                    ? states.personal_customer
                    : 'Non Malawi citizen', 'Verification Document')[states['Verification Document']].map(
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
            if (states.citizen_type === 'Non Malawi citizen' && states['ID Document'] === 'Passport') {
                if (states.nature_of_permit === '' || states.nature_of_permit === undefined) {
                    if (key !== 'skip') {
                        setSubmitSelected(true);
                        sideBarStatus['ID Document'] = 'pending';
                    }
                    count = count + 1;
                } else {
                    body.nature_of_permit = states.nature_of_permit;
                }
                if (states.ref_no === '' || states.ref_no === undefined) {
                    if (key !== 'skip') {
                        setSubmitSelected(true);
                        sideBarStatus['ID Document'] = 'pending';
                    }
                    count = count + 1;
                } else {
                    body.ref_no = states.ref_no;
                }
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
                        if (states[item] === undefined || isNaN(new Date(states[item]).getTime() / 1000)) {
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
                    if (states.institute === 'Others (Please Specify)') {
                        if ((states.institute === undefined || states?.institute?.trim() === '') &&
                    (states?.institute_specify?.trim() === '' || states.institute_specify === undefined)) {
                            if (key !== 'skip') {
                                setSubmitSelected(true);
                            }
                            count = count + 1;
                        } else {
                            body.institute_specify = states.institute_specify;
                        }
                    } else {
                        body.institute_specify = '';
                    }
                    break;

                default:
                    break;
                }
            }
            if (type !== 'update') {
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
            }
            setSubmitPayload({ ...body });
            return count === 0;
        default:
            break;
        }
    };

    const handleSimplifiedToFull = () => {
        setIsFullKycPopup(false);
        setIsFullKYC(true);
        const payload = {
            email: formData.email,
            phone_number: formData.phoneNumber,
            country_code: countryCode,
            paymaart_id: id,
            profile_pic: basicViewDetails.profile_pic,
            public_profile: basicViewDetails.public_profile
        };
        handleAPICall(payload, 'address_details', 'kyc-update/update/convertkyc');
    };
    const handleSubmit = (KycSelectedType) => {
        setIsLoadingButton(true);
        if (KycSelectedType === 'proceed') {
            if (oldStateValue.citizen_type !== states.citizen_type || oldStateValue.kyc_type !== states.personal_customer) {
                handleAPICall({
                    kyc_type: states.personal_customer === 'Full KYC' ? 'full' : 'simplified',
                    citizen: states.citizen_type === 'Malawi citizen' ? 'Malawian' : 'Non Malawian',
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
            case 'basic_details' :
                if (!verified.email || !verified.phoneNumber) {
                    setSubmitSelected(true);
                    setIsLoadingButton(false);
                } else if (states.personal_customer === 'Simplified KYC' && !isFullKycPopup &&
                basicViewDetails.user_kyc_status === 'completed') {
                    setIsFullKycPopup(true);
                    setIsLoadingButton(false);
                } else {
                    setIsFullKycPopup(false);
                    const payload = {
                        email: formData.email,
                        phone_number: formData.phoneNumber,
                        country_code: countryCode,
                        paymaart_id: id,
                        profile_pic: basicViewDetails.profile_pic,
                        public_profile: basicViewDetails.public_profile
                    };
                    handleAPICall(payload, 'address_details', 'kyc-update/update/basicDetails');
                }
                break;
            case 'address_details':
                if (!handleValidation('address_details')) {
                    setIsLoadingButton(false);
                } else {
                    console.log(states, 'states');
                    const body = {
                        po_box_no: states?.po_box_no,
                        house_number: states?.house_number,
                        street_name: states?.street_name,
                        landmark: states?.landmark,
                        town_village_ta: states?.town_village_ta,
                        district: states?.district,
                        paymaart_id: id,
                        address_details_status: 'completed',
                        intl_address: states?.intl_address
                        // intl_house_number: states?.intl_house_number,
                        // intl_street_name: states?.intl_street_name,
                        // intl_landmark: states?.intl_landmark,
                        // intl_town_village_ta: states?.intl_town_village_ta,
                        // intl_district: states?.intl_district
                    };
                    if (states.citizen_type !== 'Malawi citizen') {
                        body.citizen = states.nationality;
                    }
                    if (type === 'update' && saveCount) {
                        body.sent_email = true;
                    }
                    handleAPICall(body, 'identity_details', type === 'update'
                        ? 'kyc-update/update/addressDetails'
                        : undefined);
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
                    if (states.citizen_type === 'Non Malawi citizen' && states['ID Document'] === 'Passport') {
                        body.nature_of_permit = submitPayload.nature_of_permit;
                        body.ref_no = submitPayload.ref_no;
                    }
                    if (type === 'update' && saveCount) {
                        body.sent_email = true;
                    }
                    handleAPICall(body, role === 'merchant' ? 'trading_details' : 'personal_details', type === 'update'
                        ? 'kyc-update/update/documentsDetails'
                        : undefined);
                }
                break;
            case 'trading_details':
                if (!handleValidation('trading_details')) {
                    setIsLoadingButton(false);
                } else {
                    const body = {
                        trading_type: states.trading_type,
                        trading_house_name: states.trading_house_name,
                        trading_street_name: states.trading_street_name,
                        trading_town_village_ta: states.trading_town_village_ta,
                        trading_district: states.trading_district,
                        trading_images: states.trading_images,
                        public_images: states.public_images === undefined ? false : states.public_images,
                        paymaart_id: id,
                        trading_details_status: 'completed'
                    };
                    if (oldStateValue.trading_name !== states.trading_name) {
                        body.trading_name = states.trading_name;
                    }
                    if (type === 'update' && saveCount) {
                        body.sent_email = true;
                    }
                    handleAPICall(body, 'personal_details', type === 'update'
                        ? 'kyc-update/update/tradingDetails'
                        : undefined);
                }
                break;
            case 'personal_details':
                if (!handleValidation('personal_details')) {
                    setIsLoadingButton(false);
                } else {
                    setButtonStatus('In review');
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
                    if (type === 'update' && saveCount) {
                        body.sent_email = true;
                    }
                    handleAPICall({ ...body, ...submitPayload }, 'success', type === 'update'
                        ? 'kyc-update/update/infoDetails'
                        : undefined);
                }
                break;
            default:
                break;
            }
        }
    };

    const getKYCView = async () => {
        try {
            const endPoint = role === 'agent' ? 'agent-users' : role === 'merchant' ? 'merchant-users' : 'customer-user';
            const res = await dataService.GetAPI(`${endPoint}/view-kyc-secure?paymaart_id=${id}`);
            const object = {};
            if (res.data.data !== '') {
                const statusObject = progressBarStatus;
                if (type === 'update') {
                    statusObject.basic_details = {
                        status: 'completed',
                        label: 'Basic Details'
                    };
                }
                Object.keys(res.data.data).map((item) => {
                    setOldStateValue({
                        citizen_type: res.data.data.citizen === 'Malawian' ? 'Malawi citizen' : 'Non Malawi citizen',
                        kyc_type: res.data.data.kyc_type === 'full' ? 'Full KYC' : 'Simplified KYC',
                        trading_name: res.data.data.trading_name
                    });
                    const buttonText = role === 'merchant'
                        ? ['address_details_status', 'id_details_status', 'trading_details_status', 'info_details_status']
                        : ['address_details_status', 'id_details_status', 'info_details_status'];
                    let count = 0;
                    buttonText.forEach((text) => {
                        if (res.data.data[text] === 'completed') {
                            count = count + 1;
                        }
                    });
                    setButtonStatus(count === buttonText.length ? 'In review' : count === 0 ? 'Not Started' : 'In-progress');
                    if (res.data.data[item] !== null) {
                        switch (item) {
                        case 'citizen':
                            object.citizen_type = res.data.data[item] === 'Malawian' ? 'Malawi citizen' : 'Non Malawi citizen';
                            if (res.data.data[item] !== 'Malawian' && res.data.data[item] !== 'Non Malawian') {
                                object.nationality = res.data.data[item];
                            } else {
                                object.nationality = '';
                            }
                            break;
                        case 'kyc_type':
                            object.personal_customer = res.data.data[item] === 'full' ? 'Full KYC' : 'Simplified KYC';
                            break;
                        case 'id_document_back':
                            if (res.data.data.id_document === 'Driver’s Licence') {
                                object['driver\'s_licence_img_back'] = res.data.data[item];
                            } else {
                                object[`${res.data.data.id_document.replaceAll(' ', '_').toLowerCase()}_img_back`] =
                                res.data.data[item];
                            }
                            break;
                        case 'id_document_front':
                            if (res.data.data.id_document === 'Driver’s Licence') {
                                object['driver\'s_licence_img_front'] =
                                res.data.data[item];
                            } else {
                                object[`${res.data.data.id_document.replaceAll(' ', '_').toLowerCase()}_img_front`] =
                                res.data.data[item];
                            }
                            break;
                        case 'verification_document_back':
                            if (res.data.data.verification_document === 'Driver’s Licence') {
                                object['driver\'s_licence_img_back'] = res.data.data[item];
                            } else {
                                object[`${res.data.data.verification_document.replaceAll(' ', '_').toLowerCase()}_img_back`] =
                                res.data.data[item];
                            }
                            break;
                        case 'verification_document_front':
                            if (res.data.data.verification_document === 'Driver’s Licence') {
                                object['driver\'s_licence_img_front'] = res.data.data[item];
                            } else {
                                object[`${res.data.data.verification_document.replaceAll(' ', '_').toLowerCase()}_img_front`] =
                                res.data.data[item];
                            }
                            break;
                        case 'selfie':
                            object.capture = res.data.data[item];
                            break;
                        case 'id_document':
                            if (res.data.data[item] === 'Driver’s Licence') {
                                object['ID Document'] = 'Driver\'s Licence';
                            } else {
                                object['ID Document'] = res.data.data[item];
                            }
                            break;
                        case 'verification_document':
                            if (res.data.data[item] === 'Driver’s Licence') {
                                object['Verification Document'] = 'Driver\'s Licence';
                            } else {
                                object['Verification Document'] = res.data.data[item];
                            }
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
                        case 'trading_details_status' :
                            statusObject.trading_details = {
                                status: res.data.data[item],
                                label: 'Trading Details'
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
                setProgressBarStatus({ ...statusObject });
            }
            object.bank_details = [];
            if (res.data.bank_details) {
                res.data.bank_details.forEach(bankDetail => {
                    const sideObject = {
                        bank_name: bankDetail.bank_name,
                        account_number: bankDetail.account_number,
                        account_name: bankDetail.account_name
                    };
                    object.bank_details.push(sideObject); // Push each bank detail object into the bank_details array
                });
            }
            setStates({ ...object });
        } catch (error) {
            // Log error or send notification
            console.error('Error fetching orders:', error);
        }
    };
    const basicDetailsView = async () => {
        const res = await dataService.GetAPI(`admin-users/view-specific-${role}?paymaart_id=${id}`);
        setBasicVieDetails(res.data.data);
        const otp = await dataService.PostAPI('kyc-update/send-otp', {
            paymaart_id: id,
            phone_number: res.data.data.phone_number,
            country_code: res.data.data.country_code
        });
        setFormData({
            email: res.data.data.email,
            phoneNumber: res.data.data.phone_number
        });
        setCountryCode(res.data.data.country_code);
        setEncryptedCode(otp.data.encryptedOTP);
    };
    const handleBasicDetails = (id, value) => {
        setBasicVieDetails((prevState) => ({ ...prevState, [id]: value }));
    };
    useEffect(() => {
        if (searchParams.get('tab') !== null) {
            if (searchParams.get('tab') !== 'address_details' &&
                searchParams.get('tab') !== 'identity_details' &&
                searchParams.get('tab') !== 'trading_details' &&
                searchParams.get('tab') !== 'basic_details' &&
                searchParams.get('tab') !== 'personal_details') {
                handleSearchParamsValue('tab', null, searchParams, setSearchParams);
            }
            getKYCView();
        }
        if (type === 'update') {
            basicDetailsView();
        }
    }, []);
    const handleTabChangeOtp = () => {
        if (searchParams.get('tab') === null) {
            handleSearchParamsValue('tab', 'basic_details', searchParams, setSearchParams);
        }
        getKYCView();
    };
    return (
        <CardHeader
            activePath={role === 'agent'
                ? `
            ${type === 'update' ? 'Update' : 'Register'} Agent`
                : role === 'merchant'
                    ? ` ${type === 'update' ? 'Update' : 'Register'} Merchant`
                    : `${type === 'update' ? 'Update' : 'Register'} Customer`}
            paths={role === 'agent' ? ['Users', 'Agents'] : role === 'merchant' ? ['Users', 'Merchants'] : ['Users', 'Customers']}
            pathurls={role === 'agent' ? ['users/agents'] : role === 'merchant' ? ['users/merchants'] : ['users/customers']}
            header={false}
            ChildrenElement
        >

            {searchParams.get('tab') === null && type !== 'update'
                ? (
                    <KYCRegistration
                        states={states}
                        handleStates={handleInputFelids}
                        handleSubmit={handleSubmit}
                        isLoading={isLoadingButton}
                        buttonText={buttonStatus}
                    />
                )
                : searchParams.get('tab') === 'success'

                    ? (
                        <KYCFinalPage
                            states={states}
                            handleBackPage={() => handleSearchParamsValue('tab', null, searchParams, setSearchParams)}
                            buttonText={buttonStatus}
                            role={role}
                        />)
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
                                    LineClass={(role === 'merchant' && type === 'update')
                                        ? 'line-class-merchant-update'
                                        : (role === 'merchant' || type === 'update')
                                            ? 'line-class-merchant'
                                            : 'line-class'}
                                    currentTab={searchParams.get('tab')}
                                />
                                <div className='overflow-auto scrollBar h-tabledivHeight'>
                                    {searchParams.get('tab') === 'basic_details' &&
                                    <BasicDetails
                                        handleStates={handleBasicDetails}
                                        states={basicViewDetails}
                                        submitSelected={submitSelected}
                                        bankSelected={bankSelected}
                                        setFormData={setFormData}
                                        formData={formData}
                                        role={role}
                                        verified={verified}
                                        setVerified={setVerified}
                                        countryCode={countryCode}
                                        setCountryCode={setCountryCode}
                                        setSubmitSelected={setSubmitSelected}
                                    />
                                    }
                                    {searchParams.get('tab') === 'address_details' &&
                                    <Address
                                        handleStates={handleInputFelids}
                                        states={states}
                                        submitSelected={submitSelected}
                                        bankSelected={bankSelected}
                                        isFullKYC={isFullKYC}
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
                                        role={role}
                                        type={type}
                                        isFullKYC={isFullKYC}
                                    />}
                                    {
                                        searchParams.get('tab') === 'trading_details' &&
                                        <TradingDetails
                                            handleStates={handleInputFelids}
                                            states={states}
                                            submitSelected={submitSelected}
                                            bankSelected={bankSelected}
                                            isFullKYC={isFullKYC}
                                        />
                                    }
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
            <OTPpopup
                isOpen={isOtpPopup}
                handleClose={() => setIsOtpPopup(false)}
                encryptedCode={encryptedCode}
                basicViewDetails={basicViewDetails}
                handleTabChangeOtp={handleTabChangeOtp}
                navigationPath={() => Navigate(`/users/${role}s/register-${role}/specific-view/${id}`)}
            />
            <Modal
                center
                open={isFullKycPopup}
                onClose={() => { setIsFullKycPopup(false); }} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
                <div className='customModal'>
                    <ConfirmationPopup
                        title={'Confirm'}
                        message={`'Upgrade to Full KYC' requires additional documentation 
                        for verification.  Select 'Edit Simplified KYC' to modify existing details`}
                        handleSubmit={handleSimplifiedToFull}
                        isLoading={false}
                        handleClose={handleSubmit}
                        buttonText={'Upgrade to Full KYC'}
                        buttonColor={'bg-[#3B2A6F]'}
                        buttonWidth='w-[155px]'
                        CancelButtonText={'Edit Simplified KYC'}
                    />
                </div>
            </Modal>
        </CardHeader>
    );
}
