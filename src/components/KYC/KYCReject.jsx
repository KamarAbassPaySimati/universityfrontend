/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import CheckboxWithReason from '../InputField/CheckboxWithResone';
import Button from '../Button/Button';
import { dataService } from '../../services/data.services';
import GlobalContext from '../Context/GlobalContext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function KYCReject ({ View, userDetails, setIsRejectModalOpen, id }) {
    const [selectedCheckBox, setSelectedCheckBox] = useState({});
    const [RejectReasons, setRejectReasons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setToastError, setToastSuccess } = useContext(GlobalContext);
    const [errorMessage, setErrorMessage] = useState(false);
    const MalawiInfo = {
        'National ID': 'Valid National ID Card issued by National Registration Bureau',
        Passport: 'Valid Passport issued by Department of Immigration or other appropriate authority',
        'Driver\'s Licence': 'Valid Driver\'s Licence issued by an appropriate authority',
        'Traffic Register Card': 'Valid Traffic Register Card issued by an appropriate authority',
        'Birth Certificate': 'Birth certificate',
        'Employer Letter': 'Stamped Letter with Verifiable Particulars of an employer',
        'Institute Letter': 'Stamped Letter with Verifiable Particulars of a learning institution',
        'Student ID': 'Valid Student Identification from recognised learning institution',
        'Employee ID': 'Valid Employee Identification authenticated by a Commissioner for Oaths',
        Biometrics: 'Personal Selfie',
        'Religious Institution/ District Commissioner Letter': 'Stamped Letter from a Chief, Sub-Chief, Village Headman, leader of a recognized religious institution, or District Commissioner',
        'Malawi address': View?.citizen === 'Malawian' ? userDetails.Address : userDetails['Malawi Address'],
        'International address': userDetails['International Address']

    };
    const NonMalawiInfo = {
        Passport: 'Valid Passport displaying a business or resident permit or visa',
        'Refugee ID': 'Valid Refugee Identity Card displaying a photo and proof of refugee status from an appropriate authority',
        'Asylum ID': 'Valid Asylum Seeker Identity Card displaying a photo and proof of asylum seeker status from an appropriate authority',
        'Driver\'s Licence': 'Valid Driver\'s Licence issued by an appropriate authority',
        'National ID card': 'Valid National ID Card issued by an appropriate authority',
        'Employer Letter': 'Stamped Letter with Verifiable Particulars of an employer',
        'Institute Letter': 'Stamped Letter with Verifiable Particulars of a learning institution',
        Biometrics: 'Personal Selfie',
        'Malawi address': View?.citizen === 'Malawian' ? userDetails.Address : userDetails['Malawi Address'],
        'International address': userDetails['International Address']
    };

    const handleCheckBox = (e, id, type, index, selectedIndex, checkboxText) => {
        setErrorMessage(false);
        const isChecked = e.target.checked;
        if (isChecked) {
            const newCheckBox = { reason_id: index + 1 };
            if (type === 'main') {
                RejectReasons?.forEach((reasonItem, reasonIndex) => {
                    if (reasonIndex === index && reasonItem.selectedObj) {
                        newCheckBox.placeholder = reasonItem.selectedObj;
                    }
                });
                setSelectedCheckBox({ ...selectedCheckBox, [index + 1]: newCheckBox });
            } else if (type === 'sub') {
                const value = {
                    ...selectedCheckBox[selectedIndex],
                    placeholder: selectedCheckBox[selectedIndex]?.placeholder
                        ? [...selectedCheckBox[selectedIndex].placeholder, checkboxText]
                        : [checkboxText]
                };
                setSelectedCheckBox({ ...selectedCheckBox, [selectedIndex]: value });
            }
        } else {
            if (type === 'main') {
                const updatedSelectedCheckBox = { ...selectedCheckBox };
                delete updatedSelectedCheckBox[index + 1];
                setSelectedCheckBox(updatedSelectedCheckBox);
            } else if (type === 'sub') {
                const updatedPlaceholder =
                (selectedCheckBox[selectedIndex]?.placeholder || []).filter(placeholderId => placeholderId !== checkboxText);
                const updatedValue = {
                    ...selectedCheckBox[selectedIndex],
                    placeholder: updatedPlaceholder
                };
                if (updatedPlaceholder.length === 0) {
                    const updatedSelectedCheckBox = { ...selectedCheckBox };
                    delete updatedSelectedCheckBox[selectedIndex];
                    setSelectedCheckBox(updatedSelectedCheckBox);
                } else {
                    setSelectedCheckBox({ ...selectedCheckBox, [selectedIndex]: updatedValue });
                }
            }
        }
    };
    useEffect(() => {
        const arrayValue = [];
        arrayValue.push(View.id_document);
        arrayValue.push(View.verification_document);
        arrayValue.push('Biometrics');
        arrayValue.push('Malawi address');
        if (View.intl_district !== null && View.intl_district !== '') {
            arrayValue.push('International address');
        }
        const arrayValue2 = [];
        arrayValue2.push(View.id_document);
        arrayValue2.push(View.verification_document);
        arrayValue2.push('Biometrics');
        setRejectReasons([
            {
                label: 'Incorrect or unreadable personal information',
                reason: `Your Full Name: ${`${View?.first_name || '-'} 
                ${View?.middle_name || '-'} ${View?.last_name?.toUpperCase() || '-'}`} or Date of Birth: ${View.dob === null
                    ? undefined
                    : new Date(View.dob * 1000).toLocaleDateString('en-UK', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })} on the profile is incorrect, missing, or unreadable. Please update.`
            },
            {
                label: 'Unacceptable/incomplete address',
                reason: 'Your physical address does not meet our requirements for completeness and/or traceability. Please update.'
            },
            {
                label: 'Mismatched information',
                reason: 'The information provided in your submission does not match'
            },
            {
                label: 'Incomplete or inaccurate KYC documents',
                reason: `Your submission is missing the following document and/or information: Full Name: ${`${View?.first_name || '-'} 
                ${View?.middle_name || '-'} ${View?.last_name?.toUpperCase() || '-'}`}; ${selectedCheckBox[4]?.placeholder === undefined ? '' : `${selectedCheckBox[4]?.placeholder.join('; ')}; `}`,
                selectedObj: arrayValue
            },
            {
                label: 'Original documents not provided',
                reason: `Your uploaded document ${selectedCheckBox[5]?.placeholder === undefined ? '<named document>' : `${selectedCheckBox[5]?.placeholder.join('; ')}; `} appears not to be the original. Please upload the original version of this document.`,
                selectedObj: arrayValue2
            },
            {
                label: 'Expiration of document validity period',
                reason: `Your ${selectedCheckBox[6]?.placeholder === undefined ? '<named document>' : `${selectedCheckBox[6]?.placeholder.join('; ')}; `} is expired and cannot be accepted for KYC registration. Please upload a valid document.`,
                selectedObj: arrayValue2
            },
            {
                label: 'Incomplete or inaccurate KYC documents',
                reason: `Your ${selectedCheckBox[7]?.placeholder === undefined ? '<named document>' : `${selectedCheckBox[7]?.placeholder.join('; ')}; `}  is expired and cannot be accepted for KYC registration. Please upload a valid document.`,
                selectedObj: arrayValue2
            }
        ]);
    }, [selectedCheckBox]);

    const handleSelectAll = () => {
        const obj = {};
        setErrorMessage(true);
        RejectReasons.forEach((item, index = 0) => {
            if (item.selectedObj) {
                obj[index + 1] = { reason_id: index + 1, placeholder: item.selectedObj };
            } else {
                obj[index + 1] = { reason_id: index + 1 };
            }
        });
        setSelectedCheckBox(obj);
    };

    const handleReject = async () => {
        const payload = [];
        if (Object.keys(selectedCheckBox).length === 0) {
            setErrorMessage(true);
        } else {
            Object.keys(selectedCheckBox).forEach((item) => {
                if (selectedCheckBox[item].placeholder) {
                    payload.push({ reason_id: item, placeholder: selectedCheckBox[item].placeholder });
                } else {
                    payload.push({ reason_id: item });
                }
            });
            try {
                setIsLoading(true);
                const response = await dataService.PostAPI('admin-users/reject-kyc', {
                    user_id: id,
                    rejection_reason: payload
                });
                if (!response.error) {
                    setIsLoading(false);
                    setIsRejectModalOpen(false);
                    setToastSuccess('KYC rejected successfully');
                } else {
                    setIsLoading(false);
                    setIsRejectModalOpen(false);
                    setToastError('Something went wrong!');
                }
            } catch (error) {
                setIsLoading(false);
                setIsRejectModalOpen(false);
                setToastError('Something went wrong!');
            }
        }
    };
    return (
        <Modal center open={true}
            data-testid="modal"
            styles={{ modal: { borderRadius: 10 } }}
            onClose={() => { setIsRejectModalOpen(false); }} closeIcon={<div style={{ color: 'white' }} disabled></div>}>
            <div className='p-6 min-w-[900px]' >
                <h1 className='text-[#4F5962] font-normal text-[20px] leading-7'>Confirm to Reject?</h1>
                <div className='border-t mt-2 w-[483px]'></div>
                <div className='flex justify-between mt-2'>
                    <p className='font-normal text-[#A4A9AE] text-[14px] leading-6' data-testid="modal-body">Select the reason for rejection </p>
                    <div className='flex justify-between text-[#4F5962] font-normal text-[14px] leading-6 gap-6'>
                        <button className='' onClick={handleSelectAll}>Select all</button>
                        <button className='' onClick={() => setSelectedCheckBox({})}>Clear</button>
                    </div>
                </div>
                {errorMessage && <ErrorMessage error={'Please select at least one option to proceed.'} />}
                <div className='overflow-auto mx-auto max-h-[calc(100vh-350px)] scrollBar'>
                    {RejectReasons.map((item, index = 0) => (
                        <>
                            <CheckboxWithReason
                                key={item}
                                item={item}
                                testId={item.label}
                                handleOnChange={handleCheckBox}
                                index={index}
                                id={`reject_${index}`}
                                type={'main'}
                                Checked={selectedCheckBox[index + 1]}
                            />
                            {item.selectedObj &&
                            <div className='ml-6 px-2 pt-2 flex flex-wrap'>
                                {item.selectedObj.map((reasonItem, reasonIndex = 0) => (
                                    <div key={reasonItem} className='w-1/3'>
                                        <CheckboxWithReason
                                            item={{
                                                label: reasonItem,
                                                reason: View?.citizen === 'Malawian' ? MalawiInfo[reasonItem] : NonMalawiInfo[reasonItem]
                                            }}
                                            index={reasonIndex}
                                            selectedIndex={index + 1}
                                            Checked={selectedCheckBox[index + 1]?.placeholder &&
                                            selectedCheckBox[index + 1]?.placeholder.includes(reasonItem)}
                                            testId={reasonItem}
                                            id={`reject_sub_${reasonIndex}${index}`}
                                            handleOnChange={handleCheckBox}
                                            type={'sub'}
                                        />
                                    </div>
                                ))}

                            </div>
                            }

                        </>
                    ))}
                </div>
                <div className="flex justify-end items-center w-[240px] mt-4 gap-6 mr-[24px] ml-auto">
                    <button className='min-w-[117px] text-[#3B2A6F] font-normal text-[14px] leading-6 border-[#3B2A6F] border rounded-[6px] py-2'
                        data-testid="cancel_button" onClick={() => setIsRejectModalOpen(false)}> Cancel </button>
                    <Button
                        className='min-w-[117px]'
                        onClick={handleReject}
                        isLoading={isLoading}
                        text= {'Reject'}
                        testId="confirm_button"
                        buttonColor= {'bg-primary-negative'}
                    />
                </div>
            </div>
        </Modal>
    );
}
