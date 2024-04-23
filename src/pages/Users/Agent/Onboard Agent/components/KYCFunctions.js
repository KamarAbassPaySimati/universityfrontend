/* eslint-disable max-len */
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
    console.log('iddd', id, value.target.value);
    const obj = {};
    if (type === 'input') {
        if (id === 'account_number' && value.target.value.trim() !== '') {
            const regex = /^[a-zA-Z0-9]+$/;
            const currentValue = value.target.value;
            if (regex.test(currentValue) && value.target.value.length < 26) {
                obj[id] = value.target.value;
            }
        } else {
            obj[id] = value.target.value;
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
        obj.purpose = checkBoxArray;
    } else {
        if (id === 'occupation') {
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
            setStates((prevState) => ({ ...prevState, ...obj }));
        } else if (id === 'citizen_type' && value === 'Non Malawi citizen') {
            obj.citizen_type = value;
            obj.personal_customer = 'Simplified KYC';
        } else {
            obj[id] = value;
        }
    }
    setStates((prevState) => ({ ...prevState, ...obj }));
};

export const AddressDetails = ['street_name', 'town_village_ta', 'district'];
export const PersonalDetailsList = ['gender', 'dob', 'occupation', 'monthly_income', 'monthly_withdrawal', 'purpose'];
export const VerificationDocumentFull = {
    'Driver\'s Licence': ['driver\'s_licence_img_front', 'driver\'s_licence_img_back'],
    'Traffic Register Card': ['traffic_register_card_img_front', 'traffic_register_card_img_back'],
    'Birth Certificate': ['birth_certificate_img_front'],
    'Employer Letter': ['employer_letter_img_front'],
    'Institute Letter': ['institute_letter_img_front']
};
export const BankDetailsList = ['bank_name', 'account_number', 'account_name'];
export const IdDocumentSimplified = {
    'Traffic Register Card': ['traffic_register_card_img_front', 'traffic_register_card_img_back'],
    'Driver\'s Licence': ['driver\'s_licence_img_front', 'driver\'s_licence_img_back'],
    'Birth Certificate': ['birth_certificate_img_front'],
    'Student ID': ['student_id_img_front'],
    'Employee ID': ['employee_id_img_front']
};
export const VerificationDocumentSimplified = {
    'Employer Letter': ['employer_letter_img_front'],
    'Institute Letter': ['institute_letter_img_front'],
    'Religious Institution/ District Commissioner Letter': ['religious_institution/_district_commissioner_letter_img_front']
};
export const IdDocumentsFull = {
    'National ID': ['national_id_img_front', 'national_id_img_back'],
    Passport: ['passport_img_front']
};

export const GetDocumentValidation = (kycType, documentType) => {
    console.log('kycType, documentType', kycType, documentType);
    switch (documentType) {
    case 'ID Document':
        switch (kycType) {
        case 'Full KYC':
            return IdDocumentsFull;
        case 'Simplified KYC':
            return IdDocumentSimplified;
        default:
            break;
        }
        break;
    case 'Verification Document':
        switch (kycType) {
        case 'Full KYC':
            return VerificationDocumentFull;
        case 'Simplified KYC':
            console.log('nnnnnn');
            return VerificationDocumentSimplified;
        default:
            break;
        }
        break;
    default:
        break;
    }
};

export const GetIdDocumentList = (kycType, documentType) => {
    switch (documentType) {
    case 'ID Document':
        switch (kycType) {
        case 'Full KYC':
            return ['National ID', 'Passport'];
        case 'Simplified KYC':
            return [
                'Driver\'s Licence',
                'Traffic Register Card',
                'Birth Certificate',
                'Student ID',
                'Employee ID'];
        default:
            break;
        }
        break;
    case 'Verification Document':
        switch (kycType) {
        case 'Full KYC':
            return [
                'Driver\'s Licence',
                'Traffic Register Card',
                'Birth Certificate',
                'Employer Letter',
                'Institute Letter'];
        case 'Simplified KYC':
            return [
                'Employer Letter',
                'Institute Letter',
                'Religious Institution/ District Commissioner Letter'];
        default:
            break;
        }
        break;
    default:
        break;
    }
};
export const IdInfomationFull = {
    List1: {
        text: 'Please provide one of these documents plus a selfie (Biometric ID)',
        insideList1: {
            text: 'Valid National ID Card issued by National Registration Bureau',
            insideList1: {
                text: 'Front and back'
            }
        },
        insideList2: {
            text: 'Valid Passport issued by Department of Immigration'
        }
    }
};
export const VerificationInfomationFull = {
    List1: {
        text: 'Please provide one of these documents for additional verification of your primary ID:',
        insideList1: {
            text: 'Valid Driver\'s Licence issued by an appropriate authority',
            insideList1: {
                text: 'Front and back'
            }
        },
        insideList2: {
            text: 'Valid Traffic Register Card issued by an appropriate authority',
            insideList1: {
                text: 'Front and back'
            }
        },
        insideList3: {
            text: 'Birth certificate'
        },
        insideList4: {
            text: 'Stamped Letter with Verifiable Particulars of an employer',
            insideList1: {
                text: 'Signed by Head of the employer'
            }
        },
        insideList5: {
            text: 'Stamped Letter with Verifiable Particulars of a learning institution',
            insideList1: {
                text: 'Signed by Head of the institution'
            }
        }
    }
};
export const IdInfomationSimplified = {
    List1: {
        text: 'Please provide one of these documents plus a selfie (Biometric ID)',
        insideList1: {
            text: 'Valid Driver\'s Licence issued by an appropriate authority',
            insideList1: {
                text: 'Front and back'
            }
        },
        insideList2: {
            text: 'Valid Traffic Register Card issued by an appropriate authority',
            insideList1: {
                text: 'Front and back'
            }
        },
        insideList3: {
            text: 'Birth certificate (for minors only)'
        },
        insideList4: {
            text: 'Valid Student Identification from recognised learning institution'
        },
        insideList5: {
            text: 'Valid Employee Identification authenticated by a Commissioner for Oaths'
        }
    }
};
export const VerificationInfomationSimplified = {
    List1: {
        text: 'Please provide one of these documents for additional verification of your primary ID:',
        insideList1: {
            text: 'Stamped Letter with Verifiable Particulars of an employer',
            insideList1: {
                text: 'Signed by Head of the employer'
            }
        },
        insideList2: {
            text: 'Stamped Letter with Verifiable Particulars of a learning institution',
            insideList1: {
                text: 'Signed by Head of the institution'
            }
        },
        insideList3: {
            text: 'Stamped Letter from a Chief, Sub-Chief, Village Headman, leader of a recognized religious institution, or District Commissioner'
        }
    }
};
export const GetDocumentInfomation = (kycType, documentType) => {
    switch (documentType) {
    case 'ID Document':
        switch (kycType) {
        case 'Full KYC':
            return {
                information: IdInfomationFull,
                heading: 'Your ID Document Options'
            };
        case 'Simplified KYC':
            return {
                information: IdInfomationSimplified,
                heading: 'Your ID Document Options'
            };
        default:
            break;
        }
        break;
    case 'Verification Document':
        switch (kycType) {
        case 'Full KYC':
            return {
                information: VerificationInfomationFull,
                heading: 'Your ID Verification Document Options'
            };
        case 'Simplified KYC':
            return {
                information: VerificationInfomationFull,
                heading: 'Your ID Verification Document Options'
            };
        default:
            break;
        }
        break;
    default:
        break;
    }
};

export const SelfieRules = {
    List1: {
        text: 'Your digital selfie must be',
        insideList1: {
            text: 'clear and in focus'
        },
        insideList2: {
            text: 'in colour'
        },
        insideList3: {
            text: 'unaltered by computer software'
        },
        insideList4: {
            text: 'at least 600 pixels wide and 750 pixels tall'
        },
        insideList5: {
            text: 'at least 50KB and no more than 10MB'
        },
        insideList6: {
            text: 'contain no other objects or people'
        },
        insideList7: {
            text: 'be taken against a plain light-coloured background'
        },
        insideList8: {
            text: 'be in clear contrast to the background'
        }
    },
    List2: {
        text: 'In your selfie, you must',
        insideList1: {
            text: 'include your head, shoulders and upper body'
        },
        insideList2: {
            text: 'be facing forwards and looking straight at the camera'
        },
        insideList3: {
            text: 'have a plain expression and your mouth closed'
        },
        insideList4: {
            text: 'have your eyes open and visible'
        },
        insideList5: {
            text: 'not have ‘red eye’'
        },
        insideList6: {
            text: 'not have hair in front of your eyes'
        },
        insideList7: {
            text: 'not have a head covering (unless it’s for religious or medical reasons)'
        },
        insideList8: {
            text: 'not have anything covering your face'
        },
        insideList9: {
            text: 'not have any shadows on your face or behind you'
        }
    }
};

export const InputFelidsMonthFull = {
    'Income status': {
        'Monthly Income': {
            label: 'Monthly Income',
            type: 'dropdown',
            key: 'monthly_income',
            require: true,
            options: [
                'Up to 300,000.00 MWK',
                '300,000.00 to 1,000,000.00 MWK',
                '1,000,000.00 to 2,500,000.00 MWK',
                '2,500,000.00 to 5,000,000.00 MWK', '5,000,000.00 to 10,000,000.00 MWK', 'Over 10 Million MWK']
        },
        'Monthly Withdrawal': {
            label: 'Monthly Withdrawal',
            type: 'dropdown',
            key: 'monthly_withdrawal',
            require: true,
            options: [
                'Up to 300,000.00 MWK',
                '300,000.00 to 1,000,000.00 MWK',
                '1,000,000.00 to 2,500,000.00 MWK',
                '2,500,000.00 to 5,000,000.00 MWK',
                '5,000,000.00 to 10,000,000.00 MWK',
                'Over 10 Million MWK'
            ]
        }
    }
};
export const InputFelidsMonthSimplified = {
    'Income status': {
        'Monthly Income': {
            label: 'Monthly Income',
            type: 'input',
            key: 'monthly_income',
            disable: true
        },
        'Monthly Withdrawal': {
            label: 'Monthly Withdrawal',
            type: 'input',
            key: 'monthly_withdrawal',
            disable: true
        }
    }
};

export const getMonthInputFelid = (kycType) => {
    switch (kycType) {
    case 'Full KYC':
        return InputFelidsMonthFull;
    case 'Simplified KYC':
        return InputFelidsMonthSimplified;
    default:
        break;
    }
};
