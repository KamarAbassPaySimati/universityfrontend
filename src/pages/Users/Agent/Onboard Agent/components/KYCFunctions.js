export const handleStatusBar = (key, value, type, setProgressBarStatus) => {
    // switch (key) {
    // case 'address_details':
    //     setProgressBarStatus((prevState) => ({
    //         ...prevState,
    //         address_details: {
    //             status: value,
    //             label: 'Address Details'
    //         },
    //         identity_details: {
    //             status: 'inactive',
    //             label: 'Identity Details'
    //         }
    //     }));
    //     break;
    // case 'identity_details':
    //     setProgressBarStatus((prevState) => ({
    //         ...prevState,
    //         address_details: {
    //             status: value,
    //             label: 'Address Details'
    //         },
    //         identity_details: {
    //             status: 'current',
    //             label: 'Identity Details'
    //         }
    //     }));
    //     break;
    // case 'personal_details':
    //     if (type === 'back') {
    //         setProgressBarStatus((prevState) => ({
    //             ...prevState,
    //             identity_details: {
    //                 status: 'current',
    //                 label: 'Identity Details'
    //             },
    //             personal_details: {
    //                 status: 'inactive',
    //                 label: 'Personal Details'
    //             }
    //         }));
    //     } else {
    //         setProgressBarStatus((prevState) => ({
    //             ...prevState,
    //             identity_details: {
    //                 status: value,
    //                 label: 'Identity Details'
    //             },
    //             personal_details: {
    //                 status: 'current',
    //                 label: 'Personal Details'
    //             }
    //         }));
    //     }
    //     break;
    // default:
    //     break;
    // }
};

export const ProgressBar = {
    address_details: {
        status: 'current',
        label: 'Address Details'
    },
    identity_details: {
        status: 'skip',
        label: 'Identity Details'
    },
    personal_details: {
        status: 'skip',
        label: 'Personal Details'
    }
};

export const handleStates = (value, id, type, setStates, states) => {
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

export const AddressDetails = ['street_name', 'town_village_ta', 'district'];
export const PersonalDetailsList = ['gender', 'dob', 'occupation', 'monthly_income', 'monthly_withdrawal', 'purpose'];
export const occupationEmployed = ['employed_role', 'employer_name', 'industry', 'occupation_town'];
export const occupationSelfEmployed = ['occupation_specify'];
export const occupationEduction = ['institute'];
export const VerificationDocument = {
    'Driver\'s Licence': ['driver\'s_licence_img_front', 'driver\'s_licence_img_back'],
    'Traffic Register Card': ['traffic_register_card_img_front', 'traffic_register_card_img_back'],
    'Birth Certificate': ['birth_cert_img_front', 'birth_cert_img_back'],
    'Employer letter': ['employer_letter_img_front', 'employer_letter_img_back'],
    'Institute letter': ['institute_letter_img_front', 'institute_letter_img_back']
};
export const BankDetailsList = ['bank_name', 'account_number', 'account_name'];
export const IdDocuments = {
    'National ID': ['national_id_img_front', 'national_id_img_back'],
    Passport: ['passport_img_front']
};
