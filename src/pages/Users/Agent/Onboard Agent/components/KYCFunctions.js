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
export const occupationEmployed = ['employed_role', 'employer_name', 'industry', 'occupation_town'];
export const occupationSelfEmployed = ['self_employed_specify'];
export const occupationEduction = ['institute'];

export const handleStates = (value, id, type, setStates, states) => {
    if (type === 'input') {
        if (id === 'account_number' && value.target.value.trim() !== '') {
            const regex = /^[a-zA-Z0-9]{1,25}$/;
            if (regex.test(value.target.value)) {
                setStates((prevState) => ({ ...prevState, [id]: value.target.value }));
            }
        } else {
            setStates((prevState) => ({ ...prevState, [id]: value.target.value }));
        }
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
        if (id === 'occupation') {
            const obj = {};
            if (states.occupation !== value) {
                occupationEmployed.forEach((item) => {
                    obj[item] = '';
                });
                occupationSelfEmployed.forEach((item) => {
                    obj[item] = '';
                });
                occupationEduction.forEach((item) => {
                    obj[item] = '';
                });
            }
            obj[id] = value;
            console.log('obj111111111', obj);
            setStates((prevState) => ({ ...prevState, ...obj }));
        } else {
            setStates((prevState) => ({ ...prevState, [id]: value }));
        }
    }
};

export const AddressDetails = ['street_name', 'town_village_ta', 'district'];
export const PersonalDetailsList = ['gender', 'dob', 'occupation', 'monthly_income', 'monthly_withdrawal', 'purpose'];
export const VerificationDocument = {
    'Driver\'s Licence': ['driver\'s_licence_img_front', 'driver\'s_licence_img_back'],
    'Traffic Register Card': ['traffic_register_card_img_front', 'traffic_register_card_img_back'],
    'Birth Certificate': ['birth_certificate_img_front'],
    'Employer letter': ['employer_letter_img_front'],
    'Institute letter': ['institute_letter_img_front']
};
export const BankDetailsList = ['bank_name', 'account_number', 'account_name'];
export const IdDocuments = {
    'National ID': ['national_id_img_front', 'national_id_img_back'],
    Passport: ['passport_img_front']
};
